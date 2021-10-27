import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const SkeletonForMapCard = () => (
  <Skeleton
    data-testid="Skeleton"
    variant="rectangular"
    width={290}
    height={390}
  />
);

export default SkeletonForMapCard;
