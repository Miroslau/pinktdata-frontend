import * as React from 'react';

import Divider from '@mui/material/Divider';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PropTypes from 'prop-types';
import StarIcon from '@mui/icons-material/Star';
import TypographyMui from '../../ui-components/typography-mui/TypographyMui';
import useStyles from '../../../style/mapStyle';

import { DATA } from '../../../constants/map_page';

const Card = (props) => {
  const classes = useStyles();
  const {
    name, img, rating, reviews, city, address, price,
  } = props;

  return (
    <>
      <div className={classes.mapContent}>
        <div className={classes.content}>
          <div className={classes.contentImg}>
            <img className={classes.img} src={img} alt={name} />
          </div>
          <div className={classes.contentData}>
            <div className={classes.dataLeft}>
              <div className={classes.dataText}>
                <TypographyMui text={city} className={classes.city} />
                <TypographyMui variant="h5" text={name} />
                <TypographyMui color="#32CD32" text={DATA[0]} className={classes.available} />
                <TypographyMui text={`${DATA[1]}.${address}`} className={classes.address} />
              </div>
              <div className={classes.rating}>
                <StarIcon className={classes.starIcon} />
                {rating}
                <div className={classes.reviews}>
                  (
                  {reviews}
                  )
                </div>
              </div>
            </div>

          </div>
          <div className={classes.dataRight}>
            <div className={classes.heart}><FavoriteBorderIcon htmlColor="pink" /></div>
            <div className={classes.price}>{price}</div>
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
  rating: PropTypes.number.isRequired,
  reviews: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default Card;
