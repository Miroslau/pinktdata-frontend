import React, { useState } from 'react';
import './ApartmentFilters.scss';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PropTypes from 'prop-types';
import RangeSliderMui from '../../../ui-components/range-slider-mui/RangeSliderMui';
import ButtonMui from '../../../ui-components/button-mui/ButtonMui';
import { apartmentFilterLocalization } from '../../../../constants/Localizations/apartmentFilterLocalization';

const ApartmentFilters = ({ myFilter }) => {
  const [rangeValue, setRangeValue] = useState([0, 16000]);
  const [countRooms, setCountRooms] = useState(1);

  const rangeChange = (event, newValue) => {
    setRangeValue(newValue);
  };

  const addRoom = () => setCountRooms((prevCount) => prevCount + 1);

  const removeRoom = () => setCountRooms((prevCount) => prevCount - 1);

  const clearState = () => {
    setRangeValue([0, 16000]);
    setCountRooms(1);
  };

  const filterApartment = () => {
    const filtersParams = {
      priceRange: rangeValue,
      countRoom: countRooms,
    };
    myFilter(filtersParams);
  };

  return (
    <div className="apartment-filters">
      <div className="apartment-filters-price-range">
        <div className="apartment-filters__title">
          Price range
        </div>
        <div className="apartment-filters-price-range__slider">
          <div className="apartment-filters-price-range__label">
            <span>{`Min price: ${rangeValue[0]}`}</span>
            <span>{`Max price: ${rangeValue[1]}`}</span>
          </div>
          <RangeSliderMui
            value={rangeValue}
            handleChange={rangeChange}
            valueLabelDisplay="auto"
            min={0}
            max={16000}
          />
        </div>
      </div>
      <div className="apartment-filters-number-of-bedrooms">
        <div className="apartment-filters__title">
          {apartmentFilterLocalization.ROOMS_AND_BEDS}
        </div>
        <div className="apartment-filters-number-of-bedrooms-settings">
          <div className="apartment-filters-number-of-bedrooms-settings__title">
            {apartmentFilterLocalization.BEDROOMS}
          </div>
          <div className="apartment-filters-number-of-bedrooms-settings__buttons">
            <ButtonMui
              aria-label="remove"
              clickButton={removeRoom}
              size="small"
              disabled={countRooms === 1}
              className="apartment-filters__button"
            >
              <RemoveIcon />
            </ButtonMui>
            <div>{countRooms}</div>
            <ButtonMui
              aria-label="add"
              clickButton={addRoom}
              disabled={countRooms === 5}
              size="small"
              className="apartment-filters__button"
            >
              <AddIcon />
            </ButtonMui>
          </div>
        </div>
      </div>
      <div className="apartment-filters-footer">
        <ButtonMui title={apartmentFilterLocalization.CLEAR} clickButton={clearState} />
        <ButtonMui title={apartmentFilterLocalization.APPLY} clickButton={filterApartment} />
      </div>
    </div>
  );
};

ApartmentFilters.propTypes = {
  myFilter: PropTypes.func.isRequired,
};

export default ApartmentFilters;
