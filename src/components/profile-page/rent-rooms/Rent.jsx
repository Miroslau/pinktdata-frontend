import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import useStyles from '../Profile.style';
import newRoomApi from '../../../api/add-new-room/NewRoomAPI';
import useMountedState from '../../../hooks/useMountedState';
import rentRoomsLocalization from '../../../constants/Localizations/rentRoomsLocalization';
import RoomCard from '../room-card/RoomCard';
import RoomSkeletonCard from '../room-card/RoomSkeletonCard';

const COLUMN_SPACING = { xs: 1, sm: 2, md: 3 };
const ROW_SPACING = 1;
const GRID_ITEM_XS = 6;
const BOX_SETTINGS = { width: '100%' };

const Rent = function ({ submitForm }) {
  const classes = useStyles();
  const [rentRooms, setRentRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const hasMounted = useMountedState();

  useEffect(() => {
    newRoomApi.getRoomsForRent()
      .then(({ data }) => {
        if (hasMounted()) {
          setRentRooms(data);
          setIsLoading(false);
        }
      })
      .catch((err) => err.message);
  }, [hasMounted]);

  return (
    <Box sx={BOX_SETTINGS} className={classes.box}>
      <Typography variant="subtitle1" gutterBottom component="div" className={classes.subtitle}>
        {rentRoomsLocalization.TITLE}
      </Typography>
      {isLoading && <RoomSkeletonCard />}
      {!isLoading && (
      <Grid container rowSpacing={ROW_SPACING} columnSpacing={COLUMN_SPACING}>
        {
                  rentRooms.map((room) => (
                    <Grid item xs={GRID_ITEM_XS} key={room._id}>
                      <RoomCard
                        room={room}
                        isEditIconCard
                        submitForm={submitForm}
                      />
                    </Grid>
                  ))
              }
      </Grid>
      )}
    </Box>
  );
};

Rent.propTypes = {
  submitForm: PropTypes.func.isRequired,
};

export default Rent;
