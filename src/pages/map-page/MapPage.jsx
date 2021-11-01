import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { apartmentSelector } from '../../store/slice/apartmentSlice';
import useStyles from '../../style/style';
import MapRender from '../../components/map-page/map-render/MapRender';
import Content from '../../components/map-page/content-render/Content';
import useMountedState from '../../hooks/useMountedState';
import MapAPI from '../../api/map/mapPageAPI';

const Map = () => {
  const hasMounted = useMountedState();
  const listRoomBlock = useRef();
  const { publicAddress, count } = useSelector(apartmentSelector);
  const [currentPage, setCurrentPage] = useState(1);
  const [apart, setApart] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isActiveModal, setModalActive] = useState(false);

  const handleModal = (value) => {
    setModalActive(value);
  };

  const handlerFilter = (filterParams = null) => {
    const { bedrooms, priceRange, isMax } = filterParams;
    const priceFrom = priceRange[0];
    const priceTo = priceRange[1];
    MapAPI.searchApartments(publicAddress, currentPage, priceFrom, priceTo, bedrooms, isMax)
      .then(({ data }) => {
        if (hasMounted()) {
          setApart(data);
          setCurrentPage((prevState) => prevState + 1);
          handleModal(false);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  useEffect(() => {
    if (isFetching) {
      MapAPI.searchApartments(publicAddress, currentPage)
        .then(({ data }) => {
          if (hasMounted()) {
            setApart(data);
            setCurrentPage((prevState) => prevState + 1);
          }
        })
        .catch((err) => {
          console.err(err.message);
        })
        .finally(() => {
          if (hasMounted()) {
            setIsFetching(false);
          }
        });
    }
  }, [hasMounted, isFetching]);

  const scrollHandler = () => {
    const el = listRoomBlock.current;

    const scrollPosition = el.scrollHeight
        - (el.scrollTop + window.innerHeight)
        < 100 && apart.length < count;

    if (scrollPosition) {
      setIsFetching(true);
    }
  };

  const classes = useStyles();
  return (
    <section className={classes.wrapper}>
      <Content
        apart={apart}
        count={count}
        scrollHandler={scrollHandler}
        listRoomBlock={listRoomBlock}
        publicAddress={publicAddress}
        isActiveModal={isActiveModal}
        setModalActive={handleModal}
        apartmentFilter={handlerFilter}
      />
      <MapRender apart={apart} />
    </section>
  );
};

export default Map;
