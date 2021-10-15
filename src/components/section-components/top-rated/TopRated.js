import React from 'react';
import './TopRated.scss';
import pict from '../../../assets/mainBG.jpg';
import { TITLE_TOPRATED } from '../../../constants/mainPageConst';

export default function TopRated() {
  return (
    <div>
      <div className="wrapper">
        <h3>{TITLE_TOPRATED}</h3>
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
