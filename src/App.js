// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaymentScreen from './PaymentScreen';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SuccessPage from './success';

const stripePromise = loadStripe('pk_test_51Jjf92KGWZdTPiUJdwSd6FP8n6y7EjakUwZe9VvIVUZdetlSqTSGuaaLmPlOgEOoyT0J6zucFkvHAci9swhdjdW200VnOszg7Q');

function App() {
  return (
    <Router>
      <Elements stripe={stripePromise}>
        <Routes>
          <Route path="/payment/:clientSecret" element={<PaymentScreen />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </Elements>
    </Router>
  );
}

export default App;
