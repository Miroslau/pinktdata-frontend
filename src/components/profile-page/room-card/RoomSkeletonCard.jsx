import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

const ROW_SPACING = 1;
const COLUMN_SPACING = { xs: 1, sm: 2, md: 3 };
const GRID_ITEM_XS = 6;
const SKELETON_HEIGHT = 216;

const RoomSkeletonCard = function () {
  return (
    <Grid
      container
      rowSpacing={ROW_SPACING}
      columnSpacing={COLUMN_SPACING}
      data-testid="Skeleton"
    >
      <Grid item xs={GRID_ITEM_XS}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={SKELETON_HEIGHT}
        />
      </Grid>
      <Grid item xs={GRID_ITEM_XS}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={SKELETON_HEIGHT}
        />
      </Grid>
      <Grid item xs={GRID_ITEM_XS}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={SKELETON_HEIGHT}
        />
      </Grid>
      <Grid item xs={GRID_ITEM_XS}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={SKELETON_HEIGHT}
        />
      </Grid>
    </Grid>
  );
};

export default RoomSkeletonCard;
