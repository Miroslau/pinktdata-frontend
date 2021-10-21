import React, { useContext } from 'react';
import { roomContext } from '../../../../../store/context/roomContext';

const RoomPreview = () => {
  const roomCtx = useContext(roomContext);

  return (
    <div className="room-preview">
      <h1>Room Preview</h1>
      <img src={roomCtx.img} alt="room-preview" className="main-image" />

      <footer>
        <p className="room-info">Room Info</p>
        <div className="room-photos">
          {roomCtx.images.map((img) => (
            <img src={img} alt="slider" className="slider-image" />
          ))}
        </div>
      </footer>
    </div>
  );
};

export default RoomPreview;
