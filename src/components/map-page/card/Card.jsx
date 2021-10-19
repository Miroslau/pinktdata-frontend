import * as React from 'react';

import Divider from '@mui/material/Divider';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PropTypes from 'prop-types';
// import { nanoid } from '@reduxjs/toolkit';
import TypographyMui from '../../ui-components/typography-mui/TypographyMui';
import useStyles from '../../../style/mapStyle';

import { DATA } from '../../../constants/map_page';

// import { mapPageActions } from '../../../store/slice/mapPageSlice';

// const Card = ({ apart }) => (
//   <div>
//     {apart.map((data) => (
//       <div key={data._id}>
//         <div>{data.listing.avgRating}</div>
//       </div>
//     ))}
//   </div>
// );

// Card.propTypes = {
//   apart: PropTypes.instanceOf(Array).isRequired,
// };
// export default Card;

const Card = (props) => {
  const classes = useStyles();
  const {
    name, img, rating, reviews, city, address, price,
  } = props;

  return (
    <>
      <div className={classes.mapContent}>
        <div className={classes.content}>
          <div className={classes.contentImg}>{img}</div>
          <div className={classes.contentData}>
            <div className={classes.dataLeft}>
              <div className={classes.dataText}>
                <TypographyMui text={city} />
                <TypographyMui variant="subtitle2" text={name} />
                <TypographyMui color="green" text={DATA[3]} />
                <TypographyMui text={`${DATA[4]}.${address}`} />
              </div>
              <div>
                {rating}
                (
                {reviews}
                )
              </div>
            </div>
            <div className={classes.dataRight}>
              <div><FavoriteBorderIcon htmlColor="pink" /></div>
              <div>{price}</div>
            </div>
          </div>
        </div>
      </div>
      <Divider />
    </>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  reviews: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default Card;
