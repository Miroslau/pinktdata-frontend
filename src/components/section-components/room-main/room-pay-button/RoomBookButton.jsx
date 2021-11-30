import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ButtonMui from '../../../ui-components/button-mui/ButtonMui';
import { roomContext } from '../../../../store/context/roomContext';
import roomPreviewLocalization from '../../../../constants/roomPreviewLocalization';
import { userSelector } from '../../../../store/slice/userSlice';

const RoomBookButton = () => {
  const history = useNavigate();
  const [error, setError] = useState();

  const roomCtx = useContext(roomContext);
  const { price, isBooked } = roomCtx;
  const parsedPrice = price.slice(1);
  const startDate = useSelector((state) => state.apartment.startDate);
  const endDate = useSelector((state) => state.apartment.endDate);
  const differenceDatesInTime = new Date(endDate).getTime() - new Date(startDate).getTime();
  const differenceDatesInDays = differenceDatesInTime / (1000 * 3600 * 24);
  const totalPrice = Math.round(differenceDatesInDays * parsedPrice);

  const redirectToPaymentPage = () => history(`/payment/${totalPrice}/${roomCtx.id}`);

  const { token } = useSelector(userSelector);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    token ? setError(null) : setError(roomPreviewLocalization.need_auth);
  }, [token]);

  return (
    <div className="room-pay">
      {token && !isBooked && (
        <>
          <p className="room-price">
            {roomPreviewLocalization.total_price}
            $
            {totalPrice}
          </p>
          <ButtonMui
            title={roomPreviewLocalization.book_now}
            data-testid="payment-button"
            variant="contained"
            color="secondary"
            className="room-button"
            clickButton={redirectToPaymentPage}
          />
        </>
      )}

      {error && <p className="book-button-error">{error}</p>}
      {isBooked && token && <p className="book-button-booked">{roomPreviewLocalization.isBooked}</p>}
    </div>
  );
};

export default RoomBookButton;
