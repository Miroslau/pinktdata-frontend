import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { roomContext } from '../../store/context/roomContext';
import './RoomPage.scss';
import RoomMain from '../../components/section-components/room-main/RoomMain';
import getRoom from '../../api/get-room-by-id/getRoomById';
import SkeletonForRoomPage from './SkeletonForRoomPage';
import AlertError from '../../components/ui-components/alert-error/AlertError';

const RoomPage = () => {
  const { id } = useParams();
  const [roomData, setRoomData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(async () => {
    let cleanupFunction = false;
    setError(null);
    try {
      const { data } = await getRoom.getRoomById(id);

      if (!cleanupFunction) setRoomData(data);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);

    return () => {
      cleanupFunction = true;
    };
  }, []);

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
