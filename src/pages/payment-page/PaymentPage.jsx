import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './PaymentPage.scss';
import CheckoutForm from '../../components/payment-page/CheckoutForm';
import paymentLocalization from '../../constants/Localizations/paymentLocalization';

const PUBLISH_KEY = 'pk_test_51JxVpqCT7Fslrnfy5oMdCzvVfHdxOGfTgjgfe7L7sz3wADpV3SpEnP3tZ45eolX7tJbZ255XOGWlAFnShb4fa8pi00EBQ0fzKh';

const stripePromise = loadStripe(PUBLISH_KEY);

const PaymentPage = function () {
  return (
    <div className="payment payment-bg">
      <div className="payment-container">
        <h1 className="payment-text">
          {paymentLocalization.ENTER_CARD_DETAILS}
        </h1>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;
