import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TITLE_TOPRATED } from '../../../constants/mainPageConst';
import popularRooms from '../../../api/popular-rooms/popularRooms';
import './TopRated.scss';

export default function TopRated() {
  const history = useHistory();
  const [arrayOfPopularRooms, setArrayOfPopularRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await popularRooms.popularRooms();
      setArrayOfPopularRooms(response);
    };
    fetchRooms();
  }, []);

  const handleCLick = (id) => {
    history.push(`apartments/getApartment/${id}`);
  };

  const handleKeyDown = (event, id) => {
    if (event.code === 'Enter') history.push(`apartments/getApartment/${id}`);
  };

  return (
    <div className="wrapper">
      <h3>{TITLE_TOPRATED}</h3>
      <div className="cards-container">
        {arrayOfPopularRooms.length > 0
          ? arrayOfPopularRooms.map(({ image, _id }) => (
            <div key={_id} className="image-container" onClick={handleCLick} onKeyDown={(event) => handleKeyDown(event, _id)} role="button" tabIndex={0}>
              <img src={image} alt="room" />
            </div>
          ))
          : 'Rooms loading...'}
      </div>
    </div>
  );
}
