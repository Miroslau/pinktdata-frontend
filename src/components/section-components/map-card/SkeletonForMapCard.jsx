import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const SkeletonForMapCard = function () {
  return (
    <Skeleton
      data-testid="Skeleton"
      variant="rectangular"
      width={300}
      height={300}
    />
  );
};

export default SkeletonForMapCard;
