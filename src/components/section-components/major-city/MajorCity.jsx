import React, { useEffect, useState } from 'react';
import './MajorCity.scss';
import { uniqueId } from 'lodash';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setMajorCity } from '../../../store/slice/majorCitySlice';
import majorCitiesAPI from '../../../api/major-cities/majorCitiesAPI';

import {
  TITLE_MAJORCITY, BTN_MAJORCITY,
}
from '../../../constants/mainPageConst';
import { MAP_ROUTE } from '../../../constants/routes';

const PREFIX = 'major_cities_';

const MajorCity = () => {
  const dispatch = useDispatch();
  const [majorCities, setMajorCities] = useState([]);
  const history = useHistory();

  useEffect(() => {
    let cleanupFunction = false;
    const getMajorCities = async () => {
      try {
        const response = await majorCitiesAPI.getMajorCities();
        const { data } = response;
        const cities = data.map((city) => {
          city.id = uniqueId(PREFIX);
          return city;
        });

        if (!cleanupFunction) setMajorCities(cities);
      } catch (err) {
        console.error(err.message);
      }
    };

    getMajorCities();

    // eslint-disable-next-line no-return-assign
    return () => cleanupFunction = true;
  }, []);

  const openMapPageWithCity = (city) => {
    dispatch(setMajorCity(city));
    history.push(MAP_ROUTE);
  };

  return (
    <div className="major-city">
      <div className="wrapper">
        <div className="major-city-header">
          <h3>{TITLE_MAJORCITY}</h3>
          <button type="button" className="button ">{BTN_MAJORCITY}</button>
        </div>
        <div className="major-city-container">
          <div className="major-city-container__item major-city-container__item_left">
            {
              majorCities.map((city) => (
                <div
                  key={city.id}
                  className="major-city-container__left"
                  onClick={() => openMapPageWithCity(city)}
                  role="presentation"
                >
                  <img className="major-city-container__img" src={city.imageUrl} alt={city.city} />
                  <h4 className="major-city-container__title">{city.city}</h4>
                </div>
              )).slice(0, 3)
             }
          </div>
          <div className="major-city-container__right">
            {
              majorCities.map((city) => (
                <div
                  key={city.id}
                  onClick={() => openMapPageWithCity(city)}
                  role="presentation"
                >
                  <img
                    className="major-city-container__img
                               major-city-container__img_big"
                    src={city.imageUrl}
                    alt={city.city}
                  />
                  <h4 className="major-city-container__title">{city.city}</h4>
                </div>
              )).slice(3, 5)
             }
          </div>
        </div>
      </div>
    </div>
  );
};

export default MajorCity;
