import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PINK_COLOR } from '../../constants/colors';
import { paymentIntentAPI, paymentRetrieveAPI } from '../../api/payment/paymentIntent';
import useRedirectToMainPage from '../../hooks/useRedirectToMainPage';
import paymentLocalization from '../../constants/Localizations/paymentLocalization';

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

const ONE_SECONDS = 1000;
const FIVE_SECONDS = 5;

const CheckoutForm = () => {
  const { price, id: roomId } = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const startDate = useSelector((state) => state.apartment.startDate);
  const endDate = useSelector((state) => state.apartment.endDate);
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(false);
  const [redirectMessage, setRedirectMessage] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(FIVE_SECONDS);
  const redirectToMainPage = useRedirectToMainPage();

  const cardChangeHandler = () => {
    setErrorMessage(null);
    setMessage(null);
  };

  useEffect(() => {
    let interval;
    if (isFirstRender) {
      interval = setInterval(() => {
        setSecondsLeft((prevState) => prevState - 1);
      }, ONE_SECONDS);
    }
    return () => clearInterval(interval);
  }, [isFirstRender]);

  useEffect(() => {
    if (isFirstRender) {
      setRedirectMessage(`${paymentLocalization.YOU_WILL_REDIRECT} (${secondsLeft}) ${paymentLocalization.SECONDS}`);
    }
    if (secondsLeft === 0) {
      redirectToMainPage();
    }
  }, [secondsLeft, isFirstRender]);

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

        const { data: retrieveIntent } = await paymentRetrieveAPI({
          id: paymentIntent.id,
          roomId,
          dates: {
            startDate,
            endDate,
          },
        });

        if (retrieveIntent.status === 'succeeded') {
          setSecondsLeft(FIVE_SECONDS);
          setIsFirstRender(true);
          setIsSuccess(true);
          setMessage(paymentLocalization.PAYMENT_SUCCESS);
        } else {
          setRedirectMessage('');
          setMessage(paymentLocalization.PAYMENT_FAILED);
        }
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
        <button type="submit" disabled={isProcessing || !stripe || isSuccess}>
          {paymentLocalization.PAY}
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
      {redirectMessage && (
      <h5 className="card-redirect">
        {' '}
        {redirectMessage}
      </h5>
      )}
    </div>
  );
};

export default CheckoutForm;
