import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../../components/section-components/main-screen/navigation/Navigation';
import './RoomPage.scss';
import RoomMain from '../../components/section-components/room-main/RoomMain';
import getRoom from '../../api/get-room-by-id/getRoomById';
import { roomContext } from '../../store/context/roomContext';
import roomPreviewLocalization from '../../constants/roomPreviewLocalization';

const RoomPage = () => {
  const { id } = useParams();
  const [roomData, setRoomData] = useState();

  useEffect(async () => {
    const response = await getRoom.getRoomById(id);
    setRoomData(response);
  }, []);

  if (!roomData) {
    return <h1>{roomPreviewLocalization.dataLoading}</h1>;
  }

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
