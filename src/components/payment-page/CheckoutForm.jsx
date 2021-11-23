import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PINK_COLOR } from '../../constants/colors';
import { paymentIntentAPI, paymentRetrieveAPI } from '../../api/payment/paymentIntent';
import useRedirectToMainPage from '../../hooks/useRedirectToMainPage';

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

const ONE_SEC = 1000;

const CheckoutForm = () => {
  // eslint-disable-next-line no-unused-vars
  const { price, id: roomId } = useParams();
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [redirectMessage, setRedirectMessage] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(10);
  const stripe = useStripe();
  const elements = useElements();
  // console.log(roomId);
  const redirectToMainPage = useRedirectToMainPage();

  const cardChangeHandler = () => {
    setErrorMessage(null);
    setMessage(null);
  };

  // setSecondsLeft(secondsLeft - 1);
  // setRedirectMessage(`You will redirect to main page after (${secondsLeft}) seconds`);

  useEffect(() => {
    let interval;
    if (isStart) {
      interval = setInterval(() => {
        if (secondsLeft === 0) {
          clearInterval(interval);
          redirectToMainPage();
          return;
        }
        setRedirectMessage(`You will redirect to main page after (${secondsLeft}) seconds`);
        setSecondsLeft(secondsLeft - 1);
      }, ONE_SEC);
    }

    return () => clearInterval(interval);
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { data: clientSecret } = await paymentIntentAPI({
          amount: price,
        });

        const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

        console.log(paymentIntent);

        const { data: retrieveIntent } = await paymentRetrieveAPI({
          id: paymentIntent.id,
        });

        setMessage(retrieveIntent.status);

        switch (retrieveIntent.status) {
          case 'succeeded':
            setSecondsLeft(10);
            setIsStart(true);
            break;
          default:
            setRedirectMessage('');
            break;
        }

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
      {errorMessage ? (
        <h4 className="card-error">
          {' '}
          {errorMessage}
        </h4>
      ) : ''}
      {message ? (
        <h4 className="card-message">
          {' '}
          {message}
        </h4>
      ) : ''}
      {redirectMessage ? (
        <h5 className="card-message">
          {' '}
          {redirectMessage}
        </h5>
      ) : ''}
    </div>
  );
};

export default CheckoutForm;
