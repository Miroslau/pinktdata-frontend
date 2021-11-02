import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { apartmentSelector } from '../../store/slice/apartmentSlice';
import useStyles from '../../style/style';
import MapRender from '../../components/map-page/map-render/MapRender';
import Content from '../../components/map-page/content-render/Content';
// import useMountedState from '../../hooks/useMountedState';
import { searchApartments } from '../../store/actions/apartmentAction';

const Map = () => {
  const dispatch = useDispatch();
  // const hasMounted = useMountedState();
  const listRoomBlock = useRef();
  const { publicAddress, searchParams, apartments } = useSelector(apartmentSelector);
  const {
    count, priceRange, currentPage, bedrooms, isMax,
  } = searchParams;
  const [isActiveModal, setModalActive] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const { ref, inView } = useInView();

  const handleModal = (value) => {
    setModalActive(value);
  };

  const handlerFilter = () => {
    handleModal(true);
    dispatch(searchApartments({
      publicAddress, currentPage, count, priceRange, bedrooms, isMax, isFilter: true,
    }));
  };

  useEffect(() => {
    if (inView) {
      dispatch(searchApartments({
        publicAddress, currentPage, count, priceRange, bedrooms, isMax,
      }));
    }
  }, [inView]);

  useEffect(() => {
    dispatch(searchApartments({
      publicAddress, currentPage, count, priceRange, bedrooms, isMax,
    }));
  }, []);

  const classes = useStyles();
  return (
    <section className={classes.wrapper}>
      <Content
        apart={apartments}
        count={count}
        inViewRef={ref}
        listRoomBlock={listRoomBlock}
        publicAddress={publicAddress}
        isActiveModal={isActiveModal}
        setModalActive={handleModal}
        apartmentFilter={handlerFilter}
      />
      <MapRender apart={apartments} />
    </section>
  );
};

export default Map;
