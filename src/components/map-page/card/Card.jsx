import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@mui/material/Divider';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import TypographyMui from '../../ui-components/typography-mui/TypographyMui';
import useStyles from '../../../style/style';

import '@splidejs/splide/dist/css/splide.min.css';
import './Slider.scss';

import { DATA } from '../../../constants/map_page';

const Card = (props) => {
  const classes = useStyles();

  const {
    name, rating, images, reviews, city, address, price, homeDetails,
  } = props;

  return (
    <>
      <div className={classes.mapContent}>
        <div className={classes.content}>
          <div className={classes.contentImgSlider}>
            <Splide
              options={{
                perPage: 1,
                perMove: 1,
                rewind: true,
                fixedWidth: '350px',
                fixedHeight: '250px',
                cover: 'true',
                pagination: true,
              }}
            >
              {images.map((image) => (
                <SplideSlide key={image.id}>
                  <img src={image.picture} alt={name} />
                </SplideSlide>
              ))}
            </Splide>
          </div>
          <div className={classes.contentData}>
            <div className={classes.dataLeft}>
              <div className={classes.dataText}>
                <TypographyMui text={city} className={classes.city} />
                <TypographyMui
                  variant="h5"
                  className={classes.name}
                  text={name}
                />
                <TypographyMui
                  color="#32CD32"
                  text={DATA[0]}
                  className={classes.available}
                />
                <TypographyMui
                  text={`${homeDetails}.${address}`}
                  className={classes.address}
                />
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
            <div className={classes.heart}>
              <FavoriteBorderIcon htmlColor="pink" />
            </div>
            <div className={classes.price}>{price}</div>
          </div>
          <div className={classes.contentData}>
            <div className={classes.dataLeft}>
              <div className={classes.dataText}>
                <TypographyMui text={city} />
                <TypographyMui variant="subtitle2" text={name} />
                <TypographyMui color="green" text={DATA[3]} />
                <TypographyMui text={`${homeDetails}.${address}`} />
              </div>
              <div>
                {rating}
                (
                {reviews}
                )
              </div>
            </div>
            <div className={classes.dataRight}>
              <div>
                <FavoriteBorderIcon htmlColor="pink" />
              </div>
              <div>{price}</div>
            </div>
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
  images: [],
  reviews: '',
  price: '',
  city: '',
  address: '',
  homeDetails: '',
};

Card.propTypes = {
  name: PropTypes.string,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      picture: PropTypes.string,
    }),
  ),
  rating: PropTypes.number,
  reviews: PropTypes.number,
  city: PropTypes.string,
  address: PropTypes.string,
  price: PropTypes.string,
  homeDetails: PropTypes.string,
};

export default Card;
