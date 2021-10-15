import React from 'react';
import Filter from './filter/Filter';
import Navigation from './navigation/Navigation';
import './MainScreen.scss';
import { TITLE_MAINSCREEN, TITLE_SPAN_MAINSCREEN, BTN_MAINSCREEN } from '../../../constants/mainPageConst';

export default function MainScreen() {
  return (
    <div className="main-screen">
      <div className="wrapper">
        <Navigation />
        <Filter />
        <h2>
          {TITLE_MAINSCREEN}
          <span>{TITLE_SPAN_MAINSCREEN}</span>
        </h2>
        <button type="button" className="button">{BTN_MAINSCREEN}</button>
      </div>
    </div>
  );
}
