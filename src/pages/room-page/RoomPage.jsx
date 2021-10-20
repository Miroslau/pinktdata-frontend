import React from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../../components/section-components/main-screen/navigation/Navigation';

const RoomPage = () => {
  const { id } = useParams();
  return (
    <div className="room-page">
      <Navigation />
      <h1>{id}</h1>
      <div>Room container</div>
    </div>
  );
};

export default RoomPage;
