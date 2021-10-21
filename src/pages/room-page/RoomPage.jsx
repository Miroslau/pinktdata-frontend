import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../../components/section-components/main-screen/navigation/Navigation';
import './RoomPage.scss';
import RoomMain from '../../components/section-components/room-main/RoomMain';
import getRoom from '../../api/get-room-by-id/getRoomById';
import { roomContext } from '../../store/context/roomContext';

const RoomPage = () => {
  const { id } = useParams();
  const [roomData, setRoomData] = useState();

  useEffect(async () => {
    const response = await getRoom.getRoomById(id);
    setRoomData(response);
  }, []);

  return (
    <roomContext.Provider value={roomData}>
      <div className="room">
        <Navigation className="room-component" />
        <RoomMain />
      </div>
    </roomContext.Provider>
  );
};
export default RoomPage;
