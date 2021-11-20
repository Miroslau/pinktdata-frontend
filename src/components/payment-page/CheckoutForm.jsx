import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { PINK_COLOR } from '../../constants/colors';

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

const CheckoutForm = function () {
  const [cardError, setCardError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const cardChangeHandler = () => {
    setCardError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    console.log(error);
    console.log(paymentMethod);

    if (!error) {
      try {
        const { id } = paymentMethod;
        console.log(id);
      } catch (err) {
        console.log('Error', err);
        setCardError(err);
      }
    } else {
      setCardError(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className="form_wrapper">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={CARD_OPTIONS}
          onChange={cardChangeHandler}
          onFocus={cardChangeHandler}
        />
        {/* eslint-disable-next-line react/button-has-type */}
        <button disabled={!stripe}>Submit</button>
      </form>
      {cardError && (
      <h4 className="card-error">
        {' '}
        {cardError}
      </h4>
      )}
    </div>
  );
};

export default CheckoutForm;
