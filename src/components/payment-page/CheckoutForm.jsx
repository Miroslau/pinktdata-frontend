import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PINK_COLOR } from '../../constants/colors';
import api from '../../api/payment/paymentIntent';
// import useRedirectToMainPage from '../../hooks/useRedirectToMainPage';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: PINK_COLOR,
      color: '#000',
      fontWeight: 'bold',
      fontSize: '16px',
    },
    invalid: {
      iconColor: '#ff0000',
      color: 'ffc7ee',
    },
  },
};

const CheckoutForm = () => {
  const { price, id: roomid } = useParams();
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  console.log(roomid);
  // const redirectToMainPage = useRedirectToMainPage();

  const cardChangeHandler = () => {
    setErrorMessage(null);
    setMessage(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { data } = await api.paymentIntent({
          amount: price,
        });
        const clientSecret = data;
        console.log(clientSecret);

        const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

        console.log(paymentIntent);

        // eslint-disable-next-line max-len
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent: retrievePaymentIntent }) => {
          switch (retrievePaymentIntent.status) {
            case 'succeeded':
              setMessage('Payment succeeded!');
              break;
            case 'processing':
              setMessage('Your payment is processing.');
              break;
            case 'requires_payment_method':
              setMessage('Your payment was not successful, please try again.');
              break;
            default:
              setMessage('Something went wrong.');
              break;
          }
        });

        // redirectToMainPage();
      } catch (err) {
        console.log('Error', err);
        setErrorMessage(err);
        setIsProcessing(false);
      }
    } else {
      setErrorMessage(error.message);
      console.log(error.message);
      setIsProcessing(false);
    }

    setIsProcessing(false);
  };

  return (
    <div className="form_wrapper">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={CARD_OPTIONS}
          onChange={cardChangeHandler}
          onFocus={cardChangeHandler}
        />
        <button type="submit" disabled={isProcessing || !stripe}>
          Pay
          {' '}
          $
          {price}
        </button>
      </form>
      {errorMessage && (
      <h4 className="card-error">
        {' '}
        {errorMessage}
      </h4>
      )}
      {message && (
      <h4 className="card-message">
        {' '}
        {message}
      </h4>
      )}
    </div>
  );
};

export default CheckoutForm;
