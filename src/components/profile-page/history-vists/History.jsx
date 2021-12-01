import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
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

const History = function () {
  const classes = useStyles();
  const [visitHistory, setVisitHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const hasMounted = useMountedState();

  useEffect(() => {
    newRoomApi
      .getVisitHistory()
      .then(({ data }) => {
        if (hasMounted()) {
          setVisitHistory(data);
          setIsLoading(false);
        }
      })
      .catch((err) => err.message);
  }, [hasMounted]);

  return (
    <Box sx={BOX_SETTINGS} className={classes.box}>
      <Typography
        variant="subtitle1"
        gutterBottom
        component="div"
        className={classes.subtitle}
      >
        {rentRoomsLocalization.TITLE_HISTORY}
      </Typography>
      {isLoading && <RoomSkeletonCard />}
      {!isLoading && (
        <Grid container rowSpacing={ROW_SPACING} columnSpacing={COLUMN_SPACING}>
          {visitHistory.map((visit) => (
            <Grid item xs={GRID_ITEM_XS} key={visit.room._id}>
              <RoomCard room={visit.room} isEditIconCard={false} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default History;
