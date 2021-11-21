import React, { useEffect, useState } from 'react';
import './MajorCity.scss';
import { uniqueId } from 'lodash';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPublicAddress } from '../../../store/slice/apartmentSlice';
import majorCitiesAPI from '../../../api/major-cities/majorCitiesAPI';
import useMountedState from '../../../hooks/useMountedState';

import {
  TITLE_MAJORCITY, BTN_MAJORCITY,
}
from '../../../constants/mainPageConst';
import { MAP_ROUTE } from '../../../constants/routes';

const PREFIX = 'major_cities_';

const MajorCity = function () {
  const dispatch = useDispatch();
  const [majorCities, setMajorCities] = useState([]);
  const history = useNavigate();
  const hasMounted = useMountedState();

  useEffect(() => {
    majorCitiesAPI.getMajorCities()
      .then(({ data }) => {
        if (hasMounted()) {
          const cities = data.map((city) => {
            city.id = uniqueId(PREFIX);
            return city;
          });
          setMajorCities(cities);
        }
      })
      .catch((err) => err.message);
  }, [hasMounted]);

  const openMapPageWithCity = (city) => {
    dispatch(setPublicAddress(city));
    history(MAP_ROUTE);
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
