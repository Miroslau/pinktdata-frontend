import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TITLE_TOPRATED } from '../../../constants/mainPageConst';
import popularRooms from '../../../api/popular-rooms/popularRooms';
import './TopRated.scss';
import AlertError from '../../ui-components/alert-error/AlertError';
import SkeletonForTopRated from './SkeletonForTopRated';
import useFetch from '../../../hooks/useFetch';

export default function TopRated() {
  const [arrayOfPopularRooms, setArrayOfPopularRooms] = useState([]);
  const { isLoading, error } = useFetch(popularRooms.popularRooms, setArrayOfPopularRooms);

  if (error) return <AlertError />;

  return (
    <div className="wrapper">
      {isLoading && <SkeletonForTopRated />}
      {!isLoading && <h3>{TITLE_TOPRATED}</h3>}
      {!isLoading
        && (
        <div className="cards-container">
          {arrayOfPopularRooms.map(({ image, _id }) => (
            <Link to={`/apartments/${_id}`} key={_id} className="image-container">
              <img src={image} alt="room" />
            </Link>
          ))}
        </div>
        )}
    </div>
  );
}
