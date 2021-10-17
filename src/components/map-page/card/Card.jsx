import * as React from 'react';

// import Divider from '@mui/material/Divider';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PropTypes from 'prop-types';
// import { nanoid } from '@reduxjs/toolkit';
// import TypographyMui from '../../ui-components/typography-mui/TypographyMui';
// import useStyles from '../../../style/mapStyle';

// import { DATA } from '../../../constants/map_page';

// import { mapPageActions } from '../../../store/slice/mapPageSlice';

const Card = ({ apart }) => (
  <div>
    {apart.map((data) => (
      <div key={data._id}>
        <div>{data.listing.avgRating}</div>
      </div>
    ))}
  </div>
);

Card.propTypes = {
  apart: PropTypes.instanceOf(Array).isRequired,
};
export default Card;
