import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { apartmentSelector, setParams } from '../../store/slice/apartmentSlice';
import { searchApartments } from '../../store/actions/apartmentAction';
import useStyles from '../../style/style';
import MapRender from '../../components/map-page/map-render/MapRender';
import Content from '../../components/map-page/content-render/Content';

const Map = () => {
  const dispatch = useDispatch();
  const {
    publicAddress, searchParams, apartments, currentPage, isFetching, count,
  } = useSelector(apartmentSelector);
  const {
    priceRange, bedrooms, isMax,
  } = searchParams;
  const [isActiveModal, setModalActive] = useState(false);

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
      }),
    );
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
        <MapRender apart={apartments} isFetching={isFetching} />
      </>
    </section>
  );
};

export default Map;
