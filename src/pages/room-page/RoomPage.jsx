import React from 'react';
import { useParams } from 'react-router-dom';

const RoomPage = () => {
  const { id } = useParams();
  return (
    <div className="room-page">
      <h1>{id}</h1>
      <div>Room container</div>
    </div>
  );
};

export default RoomPage;
