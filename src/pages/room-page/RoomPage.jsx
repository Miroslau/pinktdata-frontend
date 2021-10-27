import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RoomPage.scss';
import RoomMain from '../../components/section-components/room-main/RoomMain';
import getRoom from '../../api/get-room-by-id/getRoomById';
import { roomContext } from '../../store/context/roomContext';
import roomPreviewLocalization from '../../constants/roomPreviewLocalization';

const RoomPage = () => {
  const { id } = useParams();
  const [roomData, setRoomData] = useState();

  useEffect(async () => {
    let cleanupFunction = false;
    const fetchRoom = async () => {
      try {
        const { data } = await getRoom.getRoomById(id);

        if (!cleanupFunction) setRoomData(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchRoom();

    // eslint-disable-next-line no-return-assign
    return () => cleanupFunction = true;
  }, []);

  if (!roomData) {
    return <h1>{roomPreviewLocalization.dataLoading}</h1>;
  }

  return (
    <roomContext.Provider value={roomData}>
      <div className="room">
        <RoomMain />
      </div>
    </roomContext.Provider>
  );
};
export default RoomPage;
