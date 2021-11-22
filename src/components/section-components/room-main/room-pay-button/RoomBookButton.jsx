import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ButtonMui from '../../../ui-components/button-mui/ButtonMui';
import { roomContext } from '../../../../store/context/roomContext';

const RoomBookButton = () => {
  const history = useNavigate();

  const roomCtx = useContext(roomContext);
  const { price } = roomCtx;
  const parsedPrice = price.slice(1);
  const startDate = useSelector((state) => state.apartment.startDate);
  const endDate = useSelector((state) => state.apartment.endDate);
  const differenceDatesInTime = new Date(endDate).getTime() - new Date(startDate).getTime();
  const differenceDatesInDays = differenceDatesInTime / (1000 * 3600 * 24);
  const totalPrice = Math.round(differenceDatesInDays * parsedPrice);

  const redirectToPaymentPage = () => history(`/payment/${totalPrice}/${roomCtx.id}`);

  return (
    <div className="room-pay">
      <p className="room-price">
        Total price:
        $
        {totalPrice}
      </p>
      <ButtonMui
        title="Book now"
        data-testid="payment-button"
        ariaLabel="search-button"
        variant="contained"
        color="secondary"
        className="room-button"
        clickButton={redirectToPaymentPage}
      />
    </div>
  );
};

export default RoomBookButton;
