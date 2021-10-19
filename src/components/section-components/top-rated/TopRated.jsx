import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TITLE_TOPRATED, ROOMS_LOADING } from '../../../constants/mainPageConst';
import popularRooms from '../../../api/popular-rooms/popularRooms';
import './TopRated.scss';

export default function TopRated() {
  const [arrayOfPopularRooms, setArrayOfPopularRooms] = useState([]);

  useEffect(async () => {
    const response = await popularRooms.popularRooms();
    setArrayOfPopularRooms(response);
  }, []);

  return (
    <div className="wrapper">
      <h3>{TITLE_TOPRATED}</h3>
      <div className="cards-container">
        {arrayOfPopularRooms.map(({ image, _id }) => (
          <Link to={`/apartments/getApartment/${_id}`} key={_id} className="image-container">
            <img src={image} alt="room" />
          </Link>
        ))}
        {!arrayOfPopularRooms.length && ROOMS_LOADING}
      </div>
    </div>
  );
}
