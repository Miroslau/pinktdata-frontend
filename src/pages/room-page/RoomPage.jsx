import React from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../../components/section-components/main-screen/navigation/Navigation';
import './RoomPage.scss';
import RoomMain from '../../components/section-components/room-main/RoomMain';

const RoomPage = () => {
  const { id } = useParams();

  console.log(id);

  return (
    <div className="room">
      <Navigation className="room-component" />
      <RoomMain />
    </div>
  );
};
export default RoomPage;
