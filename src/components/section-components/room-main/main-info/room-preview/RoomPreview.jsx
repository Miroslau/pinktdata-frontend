import React, { useContext } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useSelector } from 'react-redux';
import { roomContext } from '../../../../../store/context/roomContext';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';
import ButtonMui from '../../../../ui-components/button-mui/ButtonMui';

const RoomPreview = function () {
  const roomCtx = useContext(roomContext);
  const { price } = roomCtx;
  const parsedPrice = price.slice(1);
  const startDate = useSelector((state) => state.apartment.startDate);
  const endDate = useSelector((state) => state.apartment.endDate);
  const differenceDatesInTime = new Date(endDate).getTime() - new Date(startDate).getTime();
  const differenceDatesInDays = differenceDatesInTime / (1000 * 3600 * 24);
  const totalPrice = Math.round(differenceDatesInDays * parsedPrice);

  return (
    <div className="room-preview">
      <img src={roomCtx.img} alt="room-preview" className="main-image" />

      <footer>

        <Splide
          options={{
            perPage: 4,
            perMove: 2,
            rewind: true,
            gap: '.3rem',
            width: '85%',
            pagination: false,
          }}
        >
          {roomCtx.images.map(({ id, picture }) => (
            <SplideSlide key={id}>
              <img className="slider-image" src={picture} alt="slider" />
            </SplideSlide>
          ))}
        </Splide>

        <div className="room-pay">
          <ButtonMui
            title="Book now"
            data-testid="search-button"
            ariaLabel="search-button"
            variant="contained"
            color="secondary"
            className="room-button"
            clickButton={() => {
              console.log('Buy');
            }}
          />
          <p className="room-price">
            Total price:
            $
            {totalPrice}
          </p>
        </div>

      </footer>
    </div>
  );
};

export default RoomPreview;
