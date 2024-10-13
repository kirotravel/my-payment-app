import React, { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PaymentScreen = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const { clientSecret } = useParams();
  const [paymentStatus, setPaymentStatus] = useState("");
  const handlePayment = async () => {
    if (!stripe || !elements) {
      console.error("Stripe.js has not loaded yet.");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error("CardElement not found.");
      return;
    }

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              email: "customer@example.com",
            },
          },
        }
      );

      if (error) {
        console.error("Payment failed:", error.message);
        setPaymentStatus(`Payment failed: ${error.message}`);
      } else if (paymentIntent.status === "succeeded") {
        setPaymentStatus("Payment successful!");
        Swal.fire({
          text: "Payment successful!",
          confirmButtonText: "Ok",
          showConfirmButton: true,
          icon: "success",
        }).then((res) => {
          if (res.isConfirmed) {
            navigate("/success");
          }
        });
      }
    } catch (error) {
      Swal.fire({
        text: error.message,
        confirmButtonText: "Ok",
        confirmButtonColor: "#BA2532",
        icon: "error",
        iconColor: "#BA2532",
      });
      console.error("Error during payment:", error);
      setPaymentStatus(`Payment failed: ${error.message}`);
    }
  };
  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        fontSize: "16px",
        color: "#32325d",
        fontFamily: '"Poppins", sans-serif',
        "::placeholder": {
          color: "#aab7c4",
        },
        // Add your border and border-radius here
        border: "2px solid #404a59",
        borderRadius: "10px",
        padding: "10px", // Ensure proper padding
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
      complete: {
        color: "#4caf50",
      },
    },
  };

  return (
    <div>
      <section class="main_Wrapper">
        <h1>Payment Methods</h1>
        <p class="desc">All fields are required unless marked otherwise.</p>
        <div class="pay_methods">
          <button onclick="">
            <img src="/assets/visa.svg" alt="Visa" />
          </button>
          <button onclick="">
            <img src="/assets/masterCard.svg" alt="Master Card" />
          </button>
          <button onclick="">
            <img src="/assets/paypall.svg" alt="Paypall" />
          </button>
          <button onclick="">
            <img src="/assets/applePay.svg" alt="Apple Pay" />
          </button>
          <button onclick="">
            <img src="/assets/googlePay.svg" alt="Google Pay" />
          </button>
        </div>
        <div className="payment-form">
          <div className="input-group">
            <label htmlFor="card-number">
              <i className="icon-card"></i>
              Card Number
            </label>
            {/* <CardElement id="card-number" options={CARD_ELEMENT_OPTIONS} /> */}
            <div className="card-input-container">
              <CardElement options={CARD_ELEMENT_OPTIONS} />
            </div>
          </div>
          {/* <p class="price">
            <span>Total Price</span>
            <span>€325.00</span>
          </p> */}
          <div className="button-row">
            <button
              onClick={handlePayment}
              className="confirm-btn"
              disabled={!stripe || !elements}
            >
              Confirm
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaymentScreen;
