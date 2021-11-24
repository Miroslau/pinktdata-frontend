import React from 'react';
import { config } from 'dotenv';
import {
  Elements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './PaymentPage.scss';
import CheckoutForm from '../../components/payment-page/CheckoutForm';
import paymentLocalization from '../../constants/Localizations/paymentLocalization';

config();

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISH_KEY);

const PaymentPage = function () {
  return (
    <div className="payment payment-bg">
      <div className="payment-container">
        <h1 className="payment-text">{paymentLocalization.ENTER_CARD_DETAILS}</h1>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;
