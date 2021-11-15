import React from 'react';
import RoomStars from './room-stars/RoomStars';
import RoomPreview from './room-preview/RoomPreview';
import RoomScore from './room-score/RoomScore';
import RoomPrice from './room-price/RoomPrice';
import RoomAmenities from './room-amenities/RoomAmenities';
import RoomStyle from './room-style/RoomStyle';
import RoomOthers from './room-others/RoomOthers';

const MainInfo = function () {
  return (
    <div className="main-info">
      <div className="nav">
        <RoomStars />
        <RoomScore />
        <RoomPrice />
        <RoomAmenities />
        <RoomStyle />
        <RoomOthers />
      </div>
      <div className="main">
        <RoomPreview />
      </div>
    </div>
  );
};

export default MainInfo;
