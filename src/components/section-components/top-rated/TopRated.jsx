import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TITLE_TOPRATED } from '../../../constants/mainPageConst';
import popularRooms from '../../../api/popular-rooms/popularRooms';
import './TopRated.scss';
import { apartmentSelector } from '../../../store/slice/apartmentSlice';
import AlertError from '../../ui-components/alert-error/AlertError';
import SkeletonForTopRated from './SkeletonForTopRated';
import useMountedState from '../../../hooks/useMountedState';

const TopRated = function () {
  const { startDate, endDate } = useSelector(apartmentSelector);
  const [arrayOfPopularRooms, setArrayOfPopularRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasMounted = useMountedState();

  if (error) return <AlertError />;

  useEffect(() => {
    popularRooms.popularRooms(startDate, endDate)
      .then(({ data }) => {
        if (hasMounted()) {
          setArrayOfPopularRooms(data);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => {
        if (hasMounted()) setIsLoading(false);
      });
  }, [hasMounted, startDate, endDate]);

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
};

export default TopRated;
