import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TITLE_TOPRATED, ROOMS_LOADING } from '../../../constants/mainPageConst';
import popularRooms from '../../../api/popular-rooms/popularRooms';
import './TopRated.scss';

export default function TopRated() {
  const [arrayOfPopularRooms, setArrayOfPopularRooms] = useState([]);

  useEffect(async () => {
    let cleanupFunction = false;
    const getPopularRooms = async () => {
      try {
        const { data } = await popularRooms.popularRooms();

        if (!cleanupFunction) setArrayOfPopularRooms(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    getPopularRooms();

    // eslint-disable-next-line no-return-assign
    return () => cleanupFunction = true;
  }, []);

  return (
    <div className="wrapper">
      <h3>{TITLE_TOPRATED}</h3>
      <div className="cards-container">
        {arrayOfPopularRooms.map(({ image, _id }) => (
          <Link to={`/apartments/${_id}`} key={_id} className="image-container">
            <img src={image} alt="room" />
          </Link>
        ))}
        {!arrayOfPopularRooms.length && ROOMS_LOADING}
      </div>
    </div>
  );
}
