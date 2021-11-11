import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import {
  apartmentSelector, setParams,
  // eslint-disable-next-line import/named
  setBounds, setPublicAddress,
} from '../../store/slice/apartmentSlice';
import { searchApartments } from '../../store/actions/apartmentAction';
import useStyles from '../../style/style';
import MapRender from '../../components/map-page/map-render/MapRender';
import Content from '../../components/map-page/content-render/Content';

const Map = () => {
  const dispatch = useDispatch();
  const {
    publicAddress, searchParams, apartments, currentPage, isFetching, count, bounds,
  } = useSelector(apartmentSelector);
  const {
    priceRange, bedrooms, isMax,
  } = searchParams;
  const [isActiveModal, setModalActive] = useState(false);
  const [isFetchOnMapEvents, setIsFetchOnMapEvents] = useState(false);

  const { ref, inView } = useInView();

  const handleModal = (value) => {
    setModalActive(value);
  };

  const handlerFilter = (filtersParams) => {
    handleModal(false);
    dispatch(setParams(filtersParams));
    dispatch(
      searchApartments({
        publicAddress,
        currentPage: 0,
        ...filtersParams,
        isFilter: true,
        bounds,
      }),
    );
  };

  const handleDragAndZoomMap = (cords) => {
    if (isFetchOnMapEvents) {
      dispatch(setBounds(cords));
      dispatch(setPublicAddress(''));
      dispatch(searchApartments({
        currentPage: 0,
        ...searchParams,
        isFilter: true,
        bounds: cords,
      }));
    }
  };

  useEffect(() => {
    if (inView) {
      dispatch(
        searchApartments({
          publicAddress,
          currentPage,
          priceRange,
          bedrooms,
          isMax,
          bounds,
        }),
      );
    }
  }, [inView]);

  useEffect(() => {
    dispatch(
      searchApartments({
        publicAddress,
        currentPage,
        priceRange,
        bedrooms,
        isMax,
        bounds,
      }),
    );
  }, []);

  const classes = useStyles();
  return (
    <section className={classes.wrapper}>
      <>
        <Content
          apart={apartments}
          count={count}
          inViewRef={ref}
          publicAddress={publicAddress}
          isActiveModal={isActiveModal}
          setModalActive={handleModal}
          apartmentFilter={handlerFilter}
          isFetching={isFetching}
        />
        <MapRender
          apart={apartments}
          isFetching={isFetching}
          handleDragAndZoomMap={handleDragAndZoomMap}
          isFetchOnMapEvents={isFetchOnMapEvents}
          setIsFetchOnMapEvents={setIsFetchOnMapEvents}
        />
      </>
    </section>
  );
};

export default Map;
