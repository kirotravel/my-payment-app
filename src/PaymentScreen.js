import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PaymentScreen = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate(); 

  const { clientSecret } = useParams();  
  const [paymentStatus, setPaymentStatus] = useState('');
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
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: 'customer@example.com',
          },
          
        },
      });

      if (error) {
        console.error("Payment failed:", error.message);
        setPaymentStatus(`Payment failed: ${error.message}`);
      } else if (paymentIntent.status === 'succeeded') {
        setPaymentStatus('Payment successful!');
        navigate('/success');
      }
    } catch (error) {
      console.error("Error during payment:", error);
      setPaymentStatus(`Payment failed: ${error.message}`);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Complete Payment</h2>
      <CardElement />
      <button onClick={handlePayment} style={{ marginTop: '20px' }}>
        Pay
      </button>
      {paymentStatus && <div style={{ marginTop: '20px' }}>{paymentStatus}</div>}
    </div>
  );
};

export default PaymentScreen;
