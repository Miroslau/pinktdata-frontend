import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import getRoom from '../../../api/get-room-by-id/getRoomById';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';
import './MapCard.scss';
import AlertError from '../../ui-components/alert-error/AlertError';
import SkeletonForMapCard from './SkeletonForMapCard';
import useFetch from '../../../hooks/useFetch';

const MapCard = ({ id }) => {
  const history = useHistory();
  const [roomData, setRoomData] = useState();
  const getData = () => getRoom.getRoomById(id);
  const { isLoading, error } = useFetch(getData, setRoomData);

  if (error) return <AlertError />;

  return (
    <>
      {isLoading && <SkeletonForMapCard />}

      <div className="map-card">

        <div className="heart-icon">
          <FavoriteIcon htmlColor="pink" />
        </div>

        {!isLoading && (
        <Splide
          options={{
            perPage: 1,
            perMove: 1,
            rewind: true,
            width: '100%',
            pagination: true,
            drag: false,
          }}
        >
          {roomData.images.map(({ id: imageId, picture }) => (
            <SplideSlide data-testid="map-card-slider" key={imageId} onClick={() => history.push(`/apartments/${id}`)}>
              <img
                className="slider-image"
                src={picture}
                alt="map-card-slider"
              />
            </SplideSlide>
          )).splice(0, 5)}
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
