import React from 'react';
import './MajorCity.scss';

import NewYork from '../../../assets/New-York.webp';
import Miami from '../../../assets/Miami.webp';
import SanFrancisco from '../../../assets/San-Francisco.webp';
import Houston from '../../../assets/Houston.webp';
import LosAngeles from '../../../assets/Los-Angeles.webp';

import {
  TITLE_MAJORCITY, BTN_MAJORCITY, LOSANGELES_CITY_MAJORCITY,
  MIAMI_CITY_MAJORCITY, SAN_FRANCISCO_CITY_MAJORCITY,
  HOUSTON_CITY_MAJORCITY, NEW_YOURK_CITY_MAJORCITY,
}
from '../../../constants/mainPageConst';

export default function MajorCity() {
  return (
    <div className="major-city">
      <div className="wrapper">
        <div className="major-city-header">
          <h3>{TITLE_MAJORCITY}</h3>
          <button type="button" className="button ">{BTN_MAJORCITY}</button>
        </div>
        <div className="major-city-hotels-containet">
          <div className="major-city-hotels-containet-left">
            <div className="major-city-hotels-containet-up">
              <div className="major-city-hotels-xs img-container">
                <img src={LosAngeles} alt="Los Angeles" />
                <h4>{LOSANGELES_CITY_MAJORCITY}</h4>
              </div>
              <div className="major-city-hotels-xs img-container">
                <img src={Miami} alt="Miami" />
                <h4>{MIAMI_CITY_MAJORCITY}</h4>
              </div>
            </div>
            <div className="major-city-hotels-m img-container">
              <img src={SanFrancisco} alt="San Francisco" />
              <h4>{SAN_FRANCISCO_CITY_MAJORCITY}</h4>
            </div>
          </div>
          <div className="major-city-hotels-big img-container">
            <img src={Houston} alt="Houston" />
            <h4>{HOUSTON_CITY_MAJORCITY}</h4>
          </div>
          <div className="major-city-hotels-big img-container">
            <img src={NewYork} alt="New York" />
            <h4>{NEW_YOURK_CITY_MAJORCITY}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
