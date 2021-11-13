import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

const SkeletonForRoomPage = function () {
  return (
    <Box
      data-testid="Skeleton"
      sx={{
        display: 'flex', justifyContent: 'space-between', width: '1400px', margin: '0 auto', paddingTop: '8rem',
      }}
    >
      <Skeleton
        variant="rectangular"
        width="70%"
        height={60}
      >
        <Box sx={{
          display: 'flex', justifyContent: 'space-between', width: '100%', margin: '6rem auto', visibility: 'visible',
        }}
        >
          <Skeleton
            variant="rectangular"
            width="20%"
            height={600}
          />
          <Skeleton
            variant="rectangular"
            width="70%"
            height={600}
          />
        </Box>
      </Skeleton>
      <Skeleton
        variant="rectangular"
        width="26%"
        height={60}
      />
    </Box>
  );
};

export default SkeletonForRoomPage;
