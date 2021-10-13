import React from 'react';
import Navigation from './navigation/Navigation';
import './MainScreen.scss';
import MainSearch from './main-search/MainSearch';

export default function MainScreen() {
  return (
    <div className="main-screen">
      <div className="wrapper">
        <Navigation />
        <MainSearch />
        <h2>
          Discover rooms,
          <span>hotels & make assets!</span>
        </h2>
        <button type="button" className="button button-seller">Become a Seller</button>
      </div>
    </div>
  );
}
