/* eslint-disable no-unused-vars */
import * as React from 'react';
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
  const [currentPage, setCurrentPage] = React.useState(0);
  // const [fetching, setFetching] = React.useState(true);
  // const [totalCount, setTotalCount] = React.useState(0);

  // const dispatch = useDispatch();
  // const allData = React.useCallback(() => {
  //   dispatch(getData(mapPageActions.getAllData));
  // }, [dispatch]);

  React.useEffect(() => {
    MapAPI
      .searchApartments('Philadelphia, PA, United States', currentPage)
      .then((response) => {
        setApart(response.data);
        // setCurrentPage((prevState) => prevState + 1);
        // setTotalCount(response.headers['x-total-count']);
      })
      // .finally(() => setFetching(false))
      .catch((err) => console.error(err));
  }, []);

  const scrollHandler = (e) => {
    // if (
    //   e.target.documentElement.scrollHeight
    //   - (e.target.documentElement.scrollTop
    //   + window.innerHeight) < 100 && apart.length < totalCount) {
    //   setFetching(true);
    // }
    console.log('scroll');
  };

  React.useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <div className={classes.mapContentWrapper}>
      <div className={classes.mapContent}>
        <TypographyMui variant="h4" text={TEXT.TITLE} className={classes.title} />
        <Tabs />
        <TypographyMui variant="h6" text={TEXT.SUBTITLE} />
      </div>
      <Divider />
      <div className={classes.mapWrapper} onChange={scrollHandler}>
        {apart.map((data) => (
          <Card
            key={data._id}
            id={data._id}
            name={data.name}
            img={data.img}
            rating={data.rating}
            reviews={data.reviews}
            city={data.city}
            address={data.address}
            price={data.price}
          />
        ))}
      </div>

    </div>
  );
};

export default Content;
