import React, { useContext } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { roomContext } from '../../../../../store/context/roomContext';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';

const RoomPreview = function () {
  const roomCtx = useContext(roomContext);

  return (
    <div className="room-preview">
      <img src={roomCtx.img} alt="room-preview" className="main-image" />

      <footer>

        <Splide
          options={{
            perPage: 4,
            perMove: 1,
            rewind: true,
            gap: '.5rem',
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

      </footer>
    </div>
  );
};

export default RoomPreview;
