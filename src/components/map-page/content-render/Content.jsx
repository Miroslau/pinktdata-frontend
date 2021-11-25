import React from 'react';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TypographyMui from '../../ui-components/typography-mui/TypographyMui';
import useStyles from '../../../style/style';
import Tabs from '../tabs/Tabs';
import Card from '../card/Card';
import { TEXT } from '../../../constants/map_page';

const Content = function ({
  apart,
  count,
  inViewRef,
  publicAddress,
  isActiveModal,
  setModalActive,
  apartmentFilter,
  isFetching,
}) {
  const classes = useStyles();

  const MAX_COUNT = 300;

  return (
    <div className={classes.mapContentWrapper}>
      <div className={classes.mapContent}>
        <TypographyMui
          variant="h5"
          text={`${TEXT.TITLE} ${publicAddress || TEXT.TEXT_ADDRESS}`}
          className={classes.title}
        />
        <Tabs
          isActiveModal={isActiveModal}
          setModalActive={setModalActive}
          apartmentFilter={apartmentFilter}
        />
        <TypographyMui
          variant="h6"
          text={`${TEXT.SUBTITLE} ${count > MAX_COUNT ? TEXT.TEXT_COUNT : count} ${TEXT.STAYS}`}
        />
        {isFetching && (
          <Box className={classes.contentLoader}>
            <LinearProgress className={classes.linear} />
          </Box>
        )}
      </div>
      <Divider />
      <div className={classes.mapWrapper}>
        {!isFetching && !apart.length && (
          <div className={classes.emptyData}>
            <FormatListBulletedIcon className={classes.iconSize} />
            <div>{TEXT.EMPTY_TEXT}</div>
          </div>
        )}
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
        {apart.length < count && (
          <div className={classes.loadDivider} ref={inViewRef} />
        )}
      </div>
    </div>
  );
};

Content.defaultProps = {
  isActiveModal: false,
  setModalActive: null,
  apartmentFilter: null,
  publicAddress: null,
  inViewRef: () => {},
  isFetching: null,
};

Content.propTypes = {
  apart: PropTypes.instanceOf(Array).isRequired,
  count: PropTypes.number.isRequired,
  inViewRef: PropTypes.func,
  publicAddress: PropTypes.string,
  isActiveModal: PropTypes.bool,
  setModalActive: PropTypes.func,
  apartmentFilter: PropTypes.func,
  isFetching: PropTypes.bool,
};

export default Content;
