import * as React from 'react';
// import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux';

import Divider from '@mui/material/Divider';
import TypographyMui from '../../ui-components/typography-mui/TypographyMui';
import useStyles from '../../../style/mapStyle';

import Tabs from '../tabs/Tabs';
import Card from '../card/Card';
import { TEXT } from '../../../constants/map_page';
import MapAPI from '../../../api/map/mapPageAPI';
// import { getData } from '../../../store/slice/thunk';
// import { mapPageActions } from '../../../store/slice/mapPageSlice';

const Content = () => {
  const classes = useStyles();
  const [apart, setApart] = React.useState([]);

  // const dispatch = useDispatch();
  // const allData = React.useCallback(() => {
  //   dispatch(getData(mapPageActions.getAllData));
  // }, [dispatch]);

  React.useEffect(() => {
    MapAPI
      .getAllData()
      .then(({ data }) => setApart(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={classes.mapContentWrapper}>
      <div className={classes.mapContent}>
        <TypographyMui variant="h4" text={TEXT[0]} />
        <Tabs />
        <TypographyMui variant="subtitle1" text={TEXT[1]} />
      </div>
      <Divider />
      {apart.map((data) => (
        <Card
          key={data._id}
          id={data._id}
          name={data.listing.name}
          img={data.listing.pictureUrl}
          rating={data.listing.avgRating}
          reviews={data.listing.reviewsCount}
          city={data.listing.city}
          address={data.listing.publicAddress}
          price={data.pricingQuote.priceString}
        />
      ))}

    </div>
  );
};

// Content.propTypes = {
//   apart: PropTypes.instanceOf(Array).isRequired,
// };

export default Content;
