import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from 'react-redux';
import getRoom from '../../../api/get-room-by-id/getRoomById';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';
import './MapCard.scss';
import { apartmentSelector } from '../../../store/slice/apartmentSlice';
import AlertError from '../../ui-components/alert-error/AlertError';
import SkeletonForMapCard from './SkeletonForMapCard';
import useFetch from '../../../hooks/useFetch';
import useRedirectToPreviewPageById from '../../../hooks/useRedirectToPreviewPageById';
import handleEnterPress from '../../../utils/handleEnterPress';

const splideOptions = {
  perPage: 1,
  perMove: 1,
  rewind: true,
  width: '100%',
  pagination: true,
  drag: false,
  keyboard: false,
};

const MapCard = function ({ id }) {
  const { searchParams } = useSelector(apartmentSelector);
  const { startDate, endDate } = searchParams;
  const [roomData, setRoomData] = useState();
  const getData = () => getRoom.getRoomById(id, startDate, endDate);
  const { isLoading, error } = useFetch(getData, setRoomData);
  const redirectToPreviewPageById = useRedirectToPreviewPageById(id);

  if (error) return <AlertError />;

  return (
    <>
      {isLoading && <SkeletonForMapCard />}

      <div className="map-card">
        <div className="heart-icon">
          <FavoriteIcon htmlColor="pink" />
        </div>

        {!isLoading && (
          <Splide options={splideOptions}>
            {roomData.images
              .map(({ id: imageId, picture }) => (
                <SplideSlide
                  data-testid="map-card-slider"
                  key={imageId}
                  onClick={redirectToPreviewPageById}
                >
                  <img
                    className="slider-image"
                    src={picture}
                    alt="map-card-slider"
                  />
                </SplideSlide>
              ))
              .splice(0, 10)}
          </Splide>
        )}

        {!isLoading && (
          <div
            className="room-info"
            onClick={redirectToPreviewPageById}
            onKeyDown={handleEnterPress(redirectToPreviewPageById)}
            role="button"
            tabIndex="0"
          >
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
            <span className="room-type">{roomData.spaceType}</span>
            <span className="room-city">{roomData.city}</span>
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
