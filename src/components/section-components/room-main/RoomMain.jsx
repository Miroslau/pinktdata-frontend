import React, { useContext } from 'react';
import RoomAbout from './room-about/RoomAbout';
import RoomLocation from './room-location/RoomLocation';
import '../../../index.scss';
import MainInfo from './main-info/MainInfo';
import RoomReviews from './room-reviews/RoomReviews';
import { roomContext } from '../../../store/context/roomContext';
import roomPreviewLocalization from '../../../constants/roomPreviewLocalization';

const RoomMain = () => {
  const roomCtx = useContext(roomContext);

  if (!roomCtx) {
    return roomPreviewLocalization.dataLoading;
  }

  return (
    <div className="room-bg">
      <div className="room-container">

        <main>
          <RoomAbout />
          <MainInfo />
        </main>

        <nav>
          <RoomLocation />
          <RoomReviews />
        </nav>

      </div>
    </div>
  );
};

export default RoomMain;
