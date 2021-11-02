import React from 'react';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import TypographyMui from '../../ui-components/typography-mui/TypographyMui';
import useStyles from '../../../style/style';
import Tabs from '../tabs/Tabs';
import Card from '../card/Card';
import { TEXT } from '../../../constants/map_page';

const Content = ({
  apart,
  count,
  inViewRef,
  listRoomBlock,
  publicAddress,
  isActiveModal,
  setModalActive,
  apartmentFilter,
}) => {
  const classes = useStyles();

  // useEffect(() => {
  //   document.addEventListener('scroll', scrollHandler);
  //   return () => document.removeEventListener('scroll', scrollHandler);
  // }, []);

  return (
    <div className={classes.mapContentWrapper}>
      <div className={classes.mapContent}>
        <TypographyMui
          variant="h5"
          text={`${TEXT.TITLE} ${publicAddress}`}
          className={classes.title}
        />
        <Tabs
          isActiveModal={isActiveModal}
          setModalActive={setModalActive}
          apartmentFilter={apartmentFilter}
        />
        <TypographyMui
          variant="h6"
          text={`${TEXT.SUBTITLE} ${count} ${TEXT.STAYS}`}
        />
      </div>
      <Divider />
      <div className={classes.mapWrapper} ref={listRoomBlock}>
        <>
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
              images={data.images}
            />
          ))}
          <div className={classes.loadDivider} ref={inViewRef} />
        </>
      </div>
    </div>
  );
};

Content.defaultProps = {
  isActiveModal: false,
  setModalActive: null,
  apartmentFilter: null,
  inViewRef: () => {},
};

Content.propTypes = {
  apart: PropTypes.instanceOf(Array).isRequired,
  count: PropTypes.number.isRequired,
  inViewRef: PropTypes.func,
  listRoomBlock: PropTypes.instanceOf(Object).isRequired,
  publicAddress: PropTypes.string.isRequired,
  isActiveModal: PropTypes.bool,
  setModalActive: PropTypes.func,
  apartmentFilter: PropTypes.func,
};

export default Content;
