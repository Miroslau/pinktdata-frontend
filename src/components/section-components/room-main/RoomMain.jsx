import React, { useContext } from 'react';
import RoomAbout from './room-about/RoomAbout';
import RoomLocation from './room-location/RoomLocation';
import '../../../index.scss';
import MainInfo from './main-info/MainInfo';
import RoomReviews from './room-reviews/RoomReviews';
import MapCard from '../map-card/MapCard';
import { roomContext } from '../../../store/context/roomContext';

const RoomMain = () => {
  const roomCtx = useContext(roomContext);

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
          <MapCard id={roomCtx.id} />
        </nav>

      </div>
    </div>
  );
};

export default RoomMain;
