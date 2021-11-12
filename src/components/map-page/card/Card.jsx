import React from 'react';
import PropTypes from 'prop-types';
import { Splide, SplideSlide } from '@splidejs/react-splide';

import Divider from '@mui/material/Divider';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import TypographyMui from '../../ui-components/typography-mui/TypographyMui';
import useStyles from '../../../style/style';
import '@splidejs/splide/dist/css/splide.min.css';
import './Slider.scss';

import { DATA } from '../../../constants/map_page';
import useRedirectToPreviewPageById from '../../../hooks/useRedirectToPreviewPageById';
import handleEnterPress from '../../../utils/handleEnterPress';

const Card = function (props) {
  const classes = useStyles();

  const {
    name, rating, images, reviews, city, address, price, homeDetails, id,
  } = props;
  const redirectToPreviewPageById = useRedirectToPreviewPageById(id);

  return (
    <>
      <div className={classes.cardContent}>
        <div className={classes.content}>
          <div className={classes.contentImgSlider}>
            <Splide
              options={{
                perPage: 1,
                perMove: 1,
                rewind: true,
                fixedWidth: '300px',
                fixedHeight: '200px',
                cover: 'true',
                pagination: true,
                drag: false,
                keyboard: false,
              }}
            >
              {images.map((image) => (
                <SplideSlide key={image.id} onClick={redirectToPreviewPageById}>
                  <img src={image.picture} alt={name} />
                </SplideSlide>
              )).splice(0, 10)}
            </Splide>
          </div>
          <div
            className={classes.contentData}
            onClick={redirectToPreviewPageById}
            onKeyDown={handleEnterPress(redirectToPreviewPageById)}
            role="button"
            tabIndex="0"
          >
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
        </div>
      </div>
      <Divider />
    </>
  );
};

Card.defaultProps = {
  id: '',
  rating: 0,
  name: '',
  images: [],
  reviews: null,
  price: '',
  city: '',
  address: '',
  homeDetails: '',
};

Card.propTypes = {
  id: PropTypes.string,
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
