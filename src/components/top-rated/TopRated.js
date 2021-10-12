import React from 'react';
import './TopRated.scss';
import pict from '../../assets/mainBG.jpg';

export default function TopRated() {
  return (
    <div>
      <div className="wrapper">
        <h3>Top Rated</h3>
        <div className="cards-container">
          <img src={pict} alt="pict" />
          <img src={pict} alt="pict" />
          <img src={pict} alt="pict" />
          <img src={pict} alt="pict" />
        </div>
      </div>
    </div>
  );
}
