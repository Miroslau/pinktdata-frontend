import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import Divider from '@mui/material/Divider';
import { apartmentSelector } from '../../../store/slice/apartmentSlice';
import TypographyMui from '../../ui-components/typography-mui/TypographyMui';
import useStyles from '../../../style/style';

import Tabs from '../tabs/Tabs';
import Card from '../card/Card';
import { TEXT } from '../../../constants/map_page';
import MapAPI from '../../../api/map/mapPageAPI';
import useMountedState from '../../../hooks/useMountedState';

const Content = () => {
  const classes = useStyles();
  const listRoomBlock = useRef();
  const [apart, setApart] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(true);
  const { publicAddress, count } = useSelector(apartmentSelector);
  const isMounted = useMountedState();

  useEffect(() => {
    if (isFetching) {
      MapAPI.searchApartments(publicAddress, currentPage)
        .then((response) => {
          if (isMounted()) {
            setApart(response.data);
            setCurrentPage((prevState) => prevState + 1);
          }
        })
        .finally(() => setIsFetching(false));
    }
  }, [isMounted, isFetching]);

  const scrollHandler = () => {
    const el = listRoomBlock.current;

    const scrollPosition = el.scrollHeight
    - (el.scrollTop + window.innerHeight)
    < 100 && apart.length < count;

    if (scrollPosition) {
      setIsFetching(true);
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => document.removeEventListener('scroll', scrollHandler);
  }, []);

  return (
    <div className={classes.mapContentWrapper}>
      <div className={classes.mapContent}>
        <TypographyMui
          variant="h4"
          text={`${TEXT.TITLE} ${publicAddress}`}
          className={classes.title}
        />
        <Tabs />
        <TypographyMui variant="h6" text={`${TEXT.SUBTITLE} ${count} ${TEXT.STAYS}`} />
      </div>
      <Divider />
      <div className={classes.mapWrapper} ref={listRoomBlock}>
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
