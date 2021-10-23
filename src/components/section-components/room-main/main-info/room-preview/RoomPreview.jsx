import React, { useContext } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { roomContext } from '../../../../../store/context/roomContext';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';
import roomPreviewLocalization from '../../../../../constants/roomPreviewLocalization';

const RoomPreview = () => {
  const roomCtx = useContext(roomContext);

  return (
    <div className="room-preview">
      <img src={roomCtx.img} alt="room-preview" className="main-image" />

      <footer>
        <p className="room-info">{roomPreviewLocalization.roomInfo}</p>
        <Splide
          options={{
            arrowPath: 'M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z',
            perPage: 4,
            perMove: 2,
            rewind: true,
            gap: '.3rem',
            width: '85%',
            pagination: false,
          }}
        >
          {roomCtx.images.map(({ id, picture }) => (
            <SplideSlide>
              <img className="slider-image" src={picture} alt="slider" key={id} />
            </SplideSlide>
          ))}
        </Splide>

      </footer>
    </div>
  );
};

export default RoomPreview;
