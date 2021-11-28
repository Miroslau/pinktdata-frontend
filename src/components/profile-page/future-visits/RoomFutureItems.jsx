import React from 'react';
import { styled } from '@mui/material/styles';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import './RoomCard.scss';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';
import rentRoomsLocalization from '../../../constants/Localizations/rentRoomsLocalization';
import defaultImage from '../../../assets/default-image.webp';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const RoomFutureItems = function ({ room, isEditCard }) {
  const splideOptions = {
    perPage: 1,
    perMove: 1,
    rewind: true,
    fixedWidth: '300px',
    fixedHeight: '200px',
    cover: 'true',
    pagination: true,
    drag: false,
    keyboard: false,
  };

  const history = useNavigate();
  const useRedirectToPreviewPageById = (pageId) => {
    const redirectFunction = () => history(`/apartments/${pageId}`);
    return redirectFunction;
  };
  const { images, name } = room;

  return (
    <Item className="room-card">
      <div className="room-card__img">
        {
          images.length > 1
            ? (
              <Splide options={splideOptions}>
                {
                      images.map((image) => (
                        <SplideSlide key={image.id}>
                          <img src={image.picture} alt={name} />
                        </SplideSlide>
                      )).splice(0, 10)
                    }
              </Splide>
            )
            : (
              <img
                className="room-card__img"
                src={room.images.length ? room.images[0].picture : defaultImage}
                alt={name}
              />
            )
        }
      </div>

      <div className="room-card">

        <div className="room-card-info">
          <div
            data-testid="future-visits-click"
            className="room-card-info__name"
            aria-hidden="true"
            onClick={useRedirectToPreviewPageById(room.id)}
          >
            {room.name}
          </div>
          <div className="room-card-info__subtitle">{room.address}</div>
          <div className="room-card-info__city">{room.city}</div>
          <div className="room-card-info__data">{room.data}</div>
          <div className="room-card-info__bedroom">
            {rentRoomsLocalization.CARD_COUNT}
            {' '}
            {room.bedroomCount}
          </div>

        </div>
        <div className="room-card__icon">
          {
        isEditCard && <InfoIcon onClick={useRedirectToPreviewPageById(room.id)} />
      }
        </div>
      </div>
    </Item>
  );
};

RoomFutureItems.defaultProps = {
  room: null,
  isEditCard: true,
};

RoomFutureItems.propTypes = {
  room: PropTypes.instanceOf(Object),
  isEditCard: PropTypes.bool,
};

export default RoomFutureItems;
