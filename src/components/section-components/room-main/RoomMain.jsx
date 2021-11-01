import React from 'react';
import RoomAbout from './room-about/RoomAbout';
import RoomLocation from './room-location/RoomLocation';
import '../../../index.scss';
import MainInfo from './main-info/MainInfo';
import RoomReviews from './room-reviews/RoomReviews';

const RoomMain = () => (
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

export default RoomMain;
