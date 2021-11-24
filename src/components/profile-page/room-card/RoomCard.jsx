import React from 'react';
import { styled } from '@mui/material/styles';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import './RoomCard.scss';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import rentRoomsLocalization from '../../../constants/Localizations/rentRoomsLocalization';
import useStyles from '../Profile.style';
import defaultImage from '../../../assets/default-image.webp';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const RoomCard = function ({ room, isEditCard }) {
  const classes = useStyles();

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
      <div className="room-card-info">
        <div className="room-card-info__title">{room.name}</div>
        <div className="room-card-info__subtitle">{room.address}</div>
        <div className="room-card-info__city">{room.city}</div>
        <div className="room-card-info__amount">
          {room.amount}
          {' '}
          {room.currency}
        </div>
        <div className="room-card-info__bedroom">
          {rentRoomsLocalization.CARD_COUNT}
          {' '}
          {room.bedroomCount}
        </div>
      </div>
      {
        isEditCard && <ModeEditIcon className={classes.rentCardEdit} />
      }
    </Item>
  );
};

RoomCard.defaultProps = {
  room: null,
  isEditCard: true,
};

RoomCard.propTypes = {
  room: PropTypes.instanceOf(Object),
  isEditCard: PropTypes.bool,
};

export default RoomCard;
