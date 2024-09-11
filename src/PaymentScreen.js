// src/PaymentScreen.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';


const stripePromise = loadStripe('pk_test_51Jjf92KGWZdTPiUJdwSd6FP8n6y7EjakUwZe9VvIVUZdetlSqTSGuaaLmPlOgEOoyT0J6zucFkvHAci9swhdjdW200VnOszg7Q');

const PaymentScreen = () => {
  const { paymentIntent } = useParams(); 
  const stripe = useStripe();
  const elements = useElements();
  const [paymentStatus, setPaymentStatus] = useState('');

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    try {
      const { error, paymentIntent: confirmedPaymentIntent } = await stripe.confirmCardPayment(paymentIntent, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: 'customer@example.com',
          },
        },
      });

      if (error) {
        setPaymentStatus(`Payment failed: ${error.message}`);
      } else if (confirmedPaymentIntent.status === 'succeeded') {
        setPaymentStatus('Payment successful!');
      }
    } catch (error) {
      setPaymentStatus(`Payment failed: ${error.message}`);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Complete Payment</h2>
      <Elements stripe={stripePromise}>
        <CardElement />
        <button onClick={handlePayment} style={{ marginTop: '20px' }}>
          Pay
        </button>
      </Elements>
      {paymentStatus && <div style={{ marginTop: '20px' }}>{paymentStatus}</div>}
    </div>
  );
};

export default PaymentScreen;
