import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TITLE_TOPRATED, ROOMS_LOADING } from '../../../constants/mainPageConst';
import popularRooms from '../../../api/popular-rooms/popularRooms';
import handleEnterPress from '../../../utils/handleEnterPress';
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

  const handleKeyDown = () => handleEnterPress(() => {}, true);

  return (
    <div className="wrapper">
      <h3>{TITLE_TOPRATED}</h3>
      <div className="cards-container">
        {arrayOfPopularRooms.length > 0
          ? arrayOfPopularRooms.map(({ image, _id }) => (
            <Link to={`apartments/getApartment/${_id}`} key={_id} className="image-container" onKeyDown={handleKeyDown} data-testid="room-link">
              <img src={image} alt="room" />
            </Link>
          ))
          : ROOMS_LOADING}
      </div>
    </div>
  );
}
