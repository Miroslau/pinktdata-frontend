import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TITLE_TOPRATED } from '../../../constants/mainPageConst';
import popularRooms from '../../../api/popular-rooms/popularRooms';
import './TopRated.scss';
import AlertError from '../../ui-components/alert-error/AlertError';
import SkeletonForTopRated from './SkeletonForTopRated';
import useMountedState from '../../../hooks/useMountedState';

export default function TopRated() {
  const [arrayOfPopularRooms, setArrayOfPopularRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMounted = useMountedState();

  useEffect(async () => {
    setIsLoading(true);
    try {
      const { data } = await popularRooms.popularRooms();
      if (isMounted()) setArrayOfPopularRooms(data);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [isMounted]);

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
