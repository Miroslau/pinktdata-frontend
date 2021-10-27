import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TITLE_TOPRATED } from '../../../constants/mainPageConst';
import popularRooms from '../../../api/popular-rooms/popularRooms';
import './TopRated.scss';
import AlertError from '../../ui-components/alert-error/AlertError';
import SkeletonForTopRated from './SkeletonForTopRated';

export default function TopRated() {
  const [arrayOfPopularRooms, setArrayOfPopularRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(async () => {
    let cleanupFunction = false;
    setIsLoading(true);
    try {
      const { data } = await popularRooms.popularRooms();

      if (!cleanupFunction) setArrayOfPopularRooms(data);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }

    setIsLoading(false);

    // eslint-disable-next-line no-return-assign
    return () => cleanupFunction = true;
  }, []);

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
