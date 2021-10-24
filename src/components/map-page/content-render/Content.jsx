import { useEffect, useState, useRef } from 'react';

import Divider from '@mui/material/Divider';
import TypographyMui from '../../ui-components/typography-mui/TypographyMui';
import useStyles from '../../../style/mapStyle';

import Tabs from '../tabs/Tabs';
import Card from '../card/Card';
import { TEXT } from '../../../constants/map_page';
import MapAPI from '../../../api/map/mapPageAPI';

const Content = () => {
  const classes = useStyles();
  const ref = useRef();
  const [apart, setApart] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (fetching) {
      console.log('fetching');
      MapAPI
        .searchApartments('Philadelphia, PA, United States', currentPage)
        .then((response) => {
          setApart([...apart, ...response.data]);
          setCurrentPage((prevState) => prevState + 1);
          setTotalCount(response.headers['x-total-count']);
        })
        .finally(() => setFetching(false))
        .catch((err) => console.error(err));
    }
  }, [currentPage]);

  const scrollHandler = () => {
    if (
      ref.current.scrollHeight
      - (ref.current.scrollTop
        + ref.current.innerHeight) < 100 && apart.length < totalCount) {
      setFetching(true);
    }
    // if (
    //   e.target.documentElement.scrollHeight
    //   - (e.target.documentElement.scrollTop
    //     + window.innerHeight) < 100 && apart.length < totalCount) {
    //   setFetching(true);
    // }
    console.log('scroll');
  };

  useEffect(() => {
    const el = ref.current;
    el.addEventListener('scroll', scrollHandler);
    return () => el.removeEventListener('scroll', scrollHandler);
  }, []);

  return (
    <div className={classes.mapContentWrapper}>
      <div className={classes.mapContent}>
        <TypographyMui variant="h4" text={`${TEXT.TITLE} ${'Philadelphia, PA, United States'}`} className={classes.title} />
        <Tabs />
        <TypographyMui variant="h6" text={TEXT.SUBTITLE} />
      </div>
      <Divider />
      <div className={classes.mapWrapper} onChange={scrollHandler} ref={ref}>
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
            homeDetails={data.guestLabel}
          />
        ))}
      </div>
    </div>
  );
};

export default Content;
