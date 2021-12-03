import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Splide, SplideSlide } from '@splidejs/react-splide';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import SaveIcon from '@mui/icons-material/Save';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Button } from '@material-ui/core';
import TextFieldMui from '../../ui-components/text-field-mui/TextFieldMui';
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

const RoomCard = function ({
  room, isEditIconCard, submitForm,
}) {
  const [editName] = useState(room.name);
  const [isEditCard, setEditCard] = useState(true);
  const [editAddress] = useState(room.address);
  const [editCity] = useState(room.city);
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

  // eslint-disable-next-line no-unused-vars
  const { handleChange, handleSubmit } = useCreateRoomForm(
    validateAddRoomErrors,
    submitForm,
  );

  const editCardHandler = (event) => {
    event.preventDefault();
    setEditCard(false);
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
      <div className="room-card-info">
        <TextFieldMui
          variant="standard"
          value={editName}
          className="room-card-info__title"
          disabled={isEditCard}
        />
        <TextFieldMui
          variant="standard"
          value={editAddress}
          className="room-card-info__description"
          disabled={isEditCard}
        />
        <TextFieldMui
          variant="standard"
          value={editCity}
          className="room-card-info__description"
          disabled={isEditCard}
        />
        <div className="room-card-info__amount room-card-info__amount_width">
          <TextFieldMui
            variant="standard"
            value={room.amount}
            className="room-card-info__description"
            disabled={isEditCard}
          />
          <span>{room.currency}</span>
        </div>
        <div className="room-card-info__bedroom">
          <span>{rentRoomsLocalization.CARD_COUNT}</span>
          <TextFieldMui
            variant="standard"
            value={room.bedrooms}
            className="room-card-info__description"
            disabled={isEditCard}
          />
        </div>
      </div>
      {isEditIconCard && (
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
  isEditIconCard: true,
  submitForm: () => {},
};

RoomCard.propTypes = {
  room: PropTypes.instanceOf(Object).isRequired,
  isEditIconCard: PropTypes.bool,
  submitForm: PropTypes.func,
};

export default RoomCard;
