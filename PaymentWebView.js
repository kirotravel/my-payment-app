// src/PaymentWebView.js
import React from 'react';
import { useParams } from 'react-router-dom';

const PaymentWebView = () => {
  const { paymentIntent } = useParams(); // Get paymentIntent from URL param
const stripeCheckoutUrl = `https://${window.location.hostname}/checkout/${paymentIntent}`;

  return (
    <iframe
      src={stripeCheckoutUrl}
      title="Payment"
      style={{ width: '100%', height: '100vh', border: 'none' }}
    />
  );
};

export default PaymentWebView;
