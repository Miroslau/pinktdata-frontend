import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import StarIcon from '@mui/icons-material/Star';
import getRoom from '../../../api/get-room-by-id/getRoomById';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';
import './MapCard.scss';
import AlertError from '../../ui-components/alert-error/AlertError';
import SkeletonForMapCard from './SkeletonForMapCard';

const MapCard = ({ id }) => {
  const history = useHistory();
  const [roomData, setRoomData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(async () => {
    let cleanupFunction = false;
    try {
      const { data } = await getRoom.getRoomById(id);
      if (!cleanupFunction) setRoomData(data);
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
    <>
      {isLoading && <SkeletonForMapCard />}

      <div className="map-card">

        {!isLoading && (
        <Splide
          options={{
            arrowPath: 'M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.568 18.005l-1.414-1.415 4.574-4.59-4.574-4.579 1.414-1.416 5.988 5.995-5.988 6.005z',
            perPage: 1,
            perMove: 1,
            rewind: true,
            width: '100%',
            pagination: true,
          }}
        >
          {roomData.images.map(({ id: imageId, picture }, index) => {
            if (index < 5) {
              return (
                <SplideSlide key={imageId} onClick={() => history.push(`/apartments/${id}`)}>
                  <img
                    className="slider-image"
                    src={picture}
                    alt="slider"
                  />
                </SplideSlide>
              );
            }
            return null;
          })}
        </Splide>
        )}

        {!isLoading && (
        <div className="room-info">
          <div className="room-score">
            <StarIcon className="star-icon" />
            <div className="room-rating">
              {roomData.rating}
              {' '}
              <span className="room-reviews">
                (
                {roomData.reviews}
                )
              </span>
            </div>
          </div>
          <span className="room-type">
            {roomData.spaceType}
          </span>
          <span className="room-city">
            {roomData.city}
          </span>
          <div className="room-name">{roomData.name}</div>
          <span className="room-price">{roomData.price}</span>
          /
          <span className="room-rateType">{roomData.rateType}</span>
        </div>
        )}

      </div>
    </>
  );
};

MapCard.propTypes = {
  id: PropTypes.string.isRequired,
};

export default MapCard;
