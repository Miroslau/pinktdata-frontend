import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

const SkeletonForTopRated = function () {
  return (
    <Box
      data-testid="Skeleton"
      sx={{
        display: 'flex', justifyContent: 'space-between', width: '1400px', margin: '2rem auto',
      }}
    >
      <Skeleton
        variant="rectangular"
        width={290}
        height={390}
      />
      <Skeleton
        variant="rectangular"
        width={290}
        height={390}
      />
      <Skeleton
        variant="rectangular"
        width={290}
        height={390}
      />
      <Skeleton
        variant="rectangular"
        width={290}
        height={390}
      />
    </Box>
  );
};

export default SkeletonForTopRated;
