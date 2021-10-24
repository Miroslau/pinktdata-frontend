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
  const listRoomBlock = useRef();

  const [apart, setApart] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isError, setIsError] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const scrollPosition = listRoomBlock.current.scrollHeight
      - (listRoomBlock.current.scrollTop + listRoomBlock.current.innerHeight)
      < 100 && apart.length < totalCount;

  useEffect(() => {
    if (isFetching && isError) {
      MapAPI.searchApartments('Philadelphia, PA, United States', currentPage)
        .then((response) => {
          setApart([...apart, ...response.data]);
          setCurrentPage((prevState) => prevState + 1);
          setTotalCount(response.headers['x-total-count']);
        })
        .finally(() => setIsFetching(false))
        .catch(() => setIsError(true));
    }
  }, [currentPage]);

  const scrollHandler = () => {
    if (scrollPosition) setIsFetching(true);
  };

  useEffect(() => {
    const el = listRoomBlock.current;
    el.addEventListener('scroll', scrollHandler);
    return () => el.removeEventListener('scroll', scrollHandler);
  }, []);

  return (
    <div className={classes.mapContentWrapper}>
      <div className={classes.mapContent}>
        <TypographyMui
          variant="h4"
          text={`${TEXT.TITLE} ${'Philadelphia, PA, United States'}`}
          className={classes.title}
        />
        <Tabs />
        <TypographyMui variant="h6" text={TEXT.SUBTITLE} />
      </div>
      <Divider />
      <div className={classes.mapWrapper} onChange={scrollHandler} ref={listRoomBlock}>
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
