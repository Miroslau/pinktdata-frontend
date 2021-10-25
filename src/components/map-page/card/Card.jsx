import React from 'react';

import Divider from '@mui/material/Divider';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PropTypes from 'prop-types';
import StarIcon from '@mui/icons-material/Star';
import TypographyMui from '../../ui-components/typography-mui/TypographyMui';
import useStyles from '../../../style/style';

import { DATA } from '../../../constants/map_page';

const Card = (props) => {
  const classes = useStyles();

  const {
    name, rating, img, reviews, city, address, price, homeDetails,
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
                <TypographyMui variant="h5" className={classes.name} text={name} />
                <TypographyMui color="#32CD32" text={DATA[0]} className={classes.available} />
                <TypographyMui text={`${homeDetails}.${address}`} className={classes.address} />
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

Card.defaultProps = {
  rating: '',
  name: '',
  img: '',
  reviews: '',
  city: '',
  address: '',
  price: '',
  homeDetails: '',
};

Card.propTypes = {
  name: PropTypes.string,
  img: PropTypes.string,
  rating: PropTypes.number,
  reviews: PropTypes.number,
  city: PropTypes.string,
  address: PropTypes.string,
  price: PropTypes.string,
  homeDetails: PropTypes.string,
};

export default Card;
