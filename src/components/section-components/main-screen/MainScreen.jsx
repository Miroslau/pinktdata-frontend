import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navigation from './navigation/Navigation';
import './MainScreen.scss';
import MainSearch from './main-search/MainSearch';
import { TITLE_MAINSCREEN, TITLE_SPAN_MAINSCREEN, BTN_MAINSCREEN } from '../../../constants/mainPageConst';
import { clearState } from '../../../store/slice/apartmentSlice';

const MainScreen = function () {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearState());
  }, []);

  return (
    <div className="main-screen">
      <div className="wrapper">
        <Navigation />
        <MainSearch />
        <h2>
          {TITLE_MAINSCREEN}
          <span>{TITLE_SPAN_MAINSCREEN}</span>
        </h2>
        <button type="button" className="button button-seller">{BTN_MAINSCREEN}</button>
      </div>
    </div>
  );
};

export default MainScreen;
