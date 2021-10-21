import React, { useContext } from 'react';
import { roomContext } from '../../../../store/context/roomContext';

const RoomAbout = () => {
  const roomCtx = useContext(roomContext);
  console.log('context');
  console.log(roomCtx);

  return (
    <div className="room-component">
      <h1>{roomCtx.name}</h1>
    </div>
  );
};

export default RoomAbout;
