import React, { useEffect, useState } from 'react';
import './Rent.scss';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useStyles from '../Profile.style';
import newRoomApi from '../../../api/add-new-room/NewRoomAPI';
import useMountedState from '../../../hooks/useMountedState';
import rentRoomsLocalization from '../../../constants/Localizations/rentRoomsLocalization';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Rent = function () {
  const classes = useStyles();
  const [rentRooms, setRentRooms] = useState([]);
  const hasMounted = useMountedState();

  useEffect(() => {
    newRoomApi.getRoomsForRent()
      .then(({ data }) => {
        if (hasMounted()) setRentRooms(data);
      })
      .catch((err) => err.message);
  }, [hasMounted]);

  return (
    <Box sx={{ width: '100%' }} className={classes.box}>
      <Typography variant="subtitle1" gutterBottom component="div" className={classes.subtitle}>
        {rentRoomsLocalization.TITLE}
      </Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {
            rentRooms.map((room) => (
              <Grid item xs={6} key={room._id}>
                <Item className="rent-card">
                  <img className="rent-card__img" src={room.img} alt="img" />
                  <div className="rent-card-info">
                    <div className="rent-card-info__title">{room.name}</div>
                    <div className="rent-card-info__subtitle">{room.address}</div>
                    <div className="rent-card-info__city">{room.city}</div>
                    <div className="rent-card-info__amount">
                      {room.amount}
                      {' '}
                      {room.currency}
                    </div>
                    <div className="rent-card-info__bedroom">
                      {rentRoomsLocalization.CARD_COUNT}
                      {' '}
                      {room.bedroomCount}
                    </div>
                  </div>
                </Item>
              </Grid>
            ))
        }
      </Grid>
    </Box>
  );
};

export default Rent;
