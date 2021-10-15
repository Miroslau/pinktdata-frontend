import React, { useEffect, useState } from 'react';
import { TITLE_TOPRATED } from '../../../constants/mainPageConst';
import popularRooms from '../../../api/popular-rooms/popularRooms';
import './TopRated.scss';

export default function TopRated() {
  const [arrayOfPopularRooms, setArrayOfPopularRooms] = useState([]);
  useEffect(() => {
    const fetchRooms = async () => {
      const response = await popularRooms.popularRooms();
      setArrayOfPopularRooms(response);
    };
    fetchRooms();
  }, []);

  return (
    <div>
      <div className="wrapper">
        <h3>{TITLE_TOPRATED}</h3>
        <div className="cards-container">
          {arrayOfPopularRooms.length > 0
            ? arrayOfPopularRooms.map(({ image, id }) => (
              <div key={id} className="image-container">
                <img src={image} alt="room" />
              </div>
            ))
            : 'Rooms loading...'}
        </div>
      </div>
    </div>
  );
}
