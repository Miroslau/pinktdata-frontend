import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMountedState from '../../../hooks/useMountedState';
import newRoomApi from '../../../api/add-new-room/NewRoomAPI';
import rentRoomsLocalization from '../../../constants/Localizations/rentRoomsLocalization';
import RoomSkeletonCard from '../room-card/RoomSkeletonCard';
import useStyles from '../Profile.style';
import RoomFutureItems from './RoomFutureItems';

const COLUMN_SPACING = { xs: 1, sm: 2, md: 3 };
const ROW_SPACING = 1;
const GRID_ITEM_XS = 6;
const BOX_SETTINGS = { width: '100%' };

const FutureVisits = function () {
  const classes = useStyles();
  const [futureVisits, setFutureVisits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const hasMounted = useMountedState();

  useEffect(() => {
    newRoomApi.futureRooms()
      .then(({ data }) => {
        if (hasMounted()) {
          setFutureVisits(data);
          setIsLoading(false);
        }
      })
      .catch((err) => err.message);
  }, [hasMounted]);

  return (
    <Box sx={BOX_SETTINGS} className={classes.box}>
      <Typography variant="subtitle1" gutterBottom component="div" className={classes.subtitle}>
        {rentRoomsLocalization.TITLE_VISITS}
      </Typography>
      {isLoading && <RoomSkeletonCard />}
      {!isLoading && (
        <Grid container rowSpacing={ROW_SPACING} columnSpacing={COLUMN_SPACING}>
          {
            futureVisits.map((visit) => (
              <Grid item xs={GRID_ITEM_XS} key={visit.room.id}>
                <RoomFutureItems visit={visit} isEditCard />
              </Grid>
            ))
          }
        </Grid>
      )}
    </Box>
  );
};

export default FutureVisits;
