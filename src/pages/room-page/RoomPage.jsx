import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { roomContext } from '../../store/context/roomContext';
import './RoomPage.scss';
import RoomMain from '../../components/section-components/room-main/RoomMain';
import getRoom from '../../api/get-room-by-id/getRoomById';
import SkeletonForRoomPage from './SkeletonForRoomPage';
import AlertError from '../../components/ui-components/alert-error/AlertError';
import useMountedState from '../../hooks/useMountedState';

const RoomPage = () => {
  const { id } = useParams();
  const [roomData, setRoomData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMounted = useMountedState();

  useEffect(async () => {
    setIsLoading(true);
    try {
      const { data } = await getRoom.getRoomById(id);
      if (isMounted()) setRoomData(data);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [isMounted]);

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
