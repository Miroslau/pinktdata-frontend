import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Splide, SplideSlide } from '@splidejs/react-splide';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import SaveIcon from '@mui/icons-material/Save';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Button } from '@material-ui/core';
import useStyles from '../Profile.style';
import './RoomCard.scss';

import rentRoomsLocalization from '../../../constants/Localizations/rentRoomsLocalization';
import defaultImage from '../../../assets/default-image.webp';
import useCreateRoomForm from '../../../hooks/useCreateRoomForm';
import { validateAddRoomErrors } from '../../../mixins/validateAddRoomErrors';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const RoomCard = function ({ room, isEditCard, submitForm }) {
  const [editName, setEditName] = useState(room.name);
  const [editAddress, setEditAddress] = useState(room.address);
  const [editCity, setEditCity] = useState(room.city);
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

  const { handleChange, handleSubmit } = useCreateRoomForm(
    validateAddRoomErrors,
    submitForm,
  );

  const nameRef = useRef('');
  const cityRef = useRef('');
  const addressRef = useRef('');
  const amountRef = useRef('');
  const bedroomsCountRef = useRef('');

  const editCardHandler = (event) => {
    event.preventDefault();
    bedroomsCountRef.current.focus();
    amountRef.current.focus();
    cityRef.current.focus();
    addressRef.current.focus();
    nameRef.current.focus();
  };

  return (
    <Item className="room-card">
      <div className="room-card__img">
        {images.length > 1 ? (
          <Splide options={splideOptions}>
            {images
              .map((image) => (
                <SplideSlide key={image.id}>
                  <img src={image.picture} alt={name} />
                </SplideSlide>
              ))
              .splice(0, 10)}
          </Splide>
        ) : (
          <img
            className="room-card__img"
            src={room.images.length ? room.images[0].picture : defaultImage}
            alt={name}
          />
        )}
      </div>
      <form className="room-card-info" onChange={handleChange}>
        <textarea
          ref={nameRef}
          type="text"
          value={editName}
          onChange={(event) => setEditName(event.target.value)}
          disabled={isEditCard ? '' : 'disabled'}
          cols={3}
          rows={3}
          className="room-card-info__title"
        />
        <textarea
          ref={addressRef}
          type="text"
          value={editAddress}
          onChange={(event) => setEditAddress(event.target.value)}
          disabled={isEditCard ? '' : 'disabled'}
          className="room-card-info__subtitle"
        />
        <textarea
          ref={cityRef}
          type="text"
          value={editCity}
          onChange={(event) => setEditCity(event.target.value)}
          disabled={isEditCard ? '' : 'disabled'}
          className="room-card-info__city"
        />
        <div className="room-card-info__amount">
          <input
            ref={amountRef}
            value={room.amount}
            disabled={isEditCard ? '' : 'disabled'}
            className="room-card-info__amount"
          />
          {' '}
          {room.currency}
        </div>
        <div className="room-card-info__bedroom">
          {rentRoomsLocalization.CARD_COUNT}
          {' '}
          {room.bedrooms}
          <input
            ref={bedroomsCountRef}
            value={room.bedroomCount}
            disabled={isEditCard ? '' : 'disabled'}
            className="room-card-info__bedroom"
          />
        </div>
      </form>
      {isEditCard && (
        <div className={classes.additionalBtn}>
          <Button
            variant="text"
            className={classes.rentCardEdit}
            onClick={editCardHandler}
          >
            <ModeEditIcon />
          </Button>
          <Button
            variant="text"
            className={classes.rentCardEdit}
            onClick={handleSubmit}
          >
            <SaveIcon />
          </Button>
        </div>
      )}
    </Item>
  );
};

RoomCard.defaultProps = {
  isEditCard: true,
  submitForm: () => {},
};

RoomCard.propTypes = {
  room: PropTypes.instanceOf(Object).isRequired,
  isEditCard: PropTypes.bool,
  submitForm: PropTypes.func,
};

export default RoomCard;
