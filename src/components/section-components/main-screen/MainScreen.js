import React from 'react';
import Navigation from './navigation/Navigation';
import './MainScreen.scss';
import MainSearch from './main-search/MainSearch';
import { TITLE_MAINSCREEN, TITLE_SPAN_MAINSCREEN, BTN_MAINSCREEN } from '../../../constants/mainPageConst';

export default function MainScreen() {
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
}
