import React, { useContext } from 'react';
import roomPreviewLocalization from '../../../../constants/roomPreviewLocalization';
import { roomContext } from '../../../../store/context/roomContext';

const RoomLocation = function () {
  const roomCtx = useContext(roomContext);

  return (
    <div className="room-component">
      <h1>{roomPreviewLocalization.location}</h1>
      <p>{roomCtx.address}</p>
    </div>
  );
};

export default RoomLocation;
