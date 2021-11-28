import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { roomContext } from '../../store/context/roomContext';
import './RoomPage.scss';
import RoomMain from '../../components/section-components/room-main/RoomMain';
import getRoom from '../../api/get-room-by-id/getRoomById';
import SkeletonForRoomPage from './SkeletonForRoomPage';
import AlertError from '../../components/ui-components/alert-error/AlertError';
import useFetch from '../../hooks/useFetch';

const RoomPage = function () {
  const { id } = useParams();
  const [roomData, setRoomData] = useState({});
  const getData = () => getRoom.getRoomById(id);
  const { isLoading, error } = useFetch(getData, setRoomData);
  if (error) return <AlertError />;
  return (
    <roomContext.Provider value={roomData}>
      <div className="room">
        {isLoading && <SkeletonForRoomPage />}
        {!isLoading && <RoomMain />}
      </div>
    </roomContext.Provider>

  );
};
export default RoomPage;
