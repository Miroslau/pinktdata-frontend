import * as React from 'react';

import Divider from '@mui/material/Divider';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PropTypes from 'prop-types';
import StarIcon from '@mui/icons-material/Star';
import TypographyMui from '../../ui-components/typography-mui/TypographyMui';
import useStyles from '../../../style/mapStyle';

import { DATA } from '../../../constants/map_page';
// import MapAPI from '../../../api/map/mapPageAPI';

const Card = (props) => {
  const classes = useStyles();
  // const [apart, setApart] = React.useState([]);
  // const [currentPage, setCurrentPage] = React.useState(0);
  // const [fetching, setFetching] = React.useState(true);
  // const [totalCount, setTotalCount] = React.useState(0);

  const {
    name, rating, img, reviews, city, address, price,
  } = props;

  // React.useEffect(() => {
  //   MapAPI
  //     .searchApartments('Philadelphia, PA, United States', currentPage)
  //     .then((response) => {
  //       setApart(response.data);
  //       setCurrentPage((prevState) => prevState + 1);
  //       // setTotalCount(response.headers['x-total-count']);
  //     })
  //     // .finally(() => setFetching(false))
  //     .catch((err) => console.error(err));
  // }, []);

  // const scrollHandler = () => {
  //   // if (
  //   //   e.target.documentElement.scrollHeight
  //   //   - (e.target.documentElement.scrollTop
  //   //   + window.innerHeight) < 100 && apart.length < totalCount) {
  //   //   setFetching(true);
  //   // }
  //   console.log('scroll');
  // };

  // React.useEffect(() => {
  //   document.addEventListener('scroll', scrollHandler);
  //   return function () {
  //     document.removeEventListener('scroll', scrollHandler);
  //   };
  // }, []);

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
