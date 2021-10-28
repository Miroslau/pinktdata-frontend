import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { apartmentSelector } from '../../store/slice/apartmentSlice';
import useStyles from '../../style/style';
import MapRender from '../../components/map-page/map-render/MapRender';
import Content from '../../components/map-page/content-render/Content';
import useMountedState from '../../hooks/useMountedState';
import MapAPI from '../../api/map/mapPageAPI';

const Map = () => {
  const isMounted = useMountedState();
  const listRoomBlock = useRef();
  const { publicAddress, count } = useSelector(apartmentSelector);
  const [currentPage, setCurrentPage] = useState(1);
  const [apart, setApart] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isActiveModal, setModalActive] = useState(false);

  const handleModal = (value) => {
    setModalActive(value);
  };

  useEffect(() => {
    if (isFetching) {
      MapAPI.searchApartments(publicAddress, currentPage)
        .then(({ data }) => {
          if (isMounted()) {
            setApart(data);
            setCurrentPage((prevState) => prevState + 1);
          }
        })
        .catch((err) => {
          console.err(err.message);
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
      />
      <MapRender apart={apart} />
    </section>
  );
};

export default Map;
