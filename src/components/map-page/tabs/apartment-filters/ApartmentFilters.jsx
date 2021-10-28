import React, { useState } from 'react';
import './ApartmentFilters.scss';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import RangeSliderMui from '../../../ui-components/range-slider-mui/RangeSliderMui';
import ButtonMui from '../../../ui-components/button-mui/ButtonMui';

const ApartmentFilters = () => {
  const [rangeValue, setRangeValue] = useState([0, 16000]);
  const [countRooms, setCountRooms] = useState(0);

  const rangeChange = (event, newValue) => {
    setRangeValue(newValue);
  };

  const valueText = (value) => `${value}`;

  const addRoom = () => setCountRooms((prevCount) => prevCount + 1);

  const removeRoom = () => setCountRooms((prevCount) => prevCount - 1);

  return (
    <div className="apartment-filters">
      <div className="apartment-filters-price-range">
        <div className="apartment-filters__title">
          Price range
        </div>
        <div className="apartment-filters-price-range__slider">
          <RangeSliderMui
            value={rangeValue}
            handleChange={rangeChange}
            valueLabelDisplay="auto"
            valuetext={valueText}
            min={0}
            max={16000}
          />
        </div>
      </div>
      <div className="apartment-filters-number-of-bedrooms">
        <div className="apartment-filters__title">
          Rooms and beds
        </div>
        <div className="apartment-filters-number-of-bedrooms-settings">
          <div className="apartment-filters-number-of-bedrooms-settings__title">
            Bedrooms
          </div>
          <div className="apartment-filters-number-of-bedrooms-settings__buttons">
            <ButtonMui
              aria-label="remove"
              clickButton={removeRoom}
              size="small"
              disabled={countRooms === 0}
              className="apartment-filters__button"
            >
              <RemoveIcon />
            </ButtonMui>
            <div>{countRooms}</div>
            <ButtonMui
              aria-label="add"
              clickButton={addRoom}
              size="small"
              className="apartment-filters__button"
            >
              <AddIcon />
            </ButtonMui>
          </div>
        </div>
      </div>
      <div className="apartment-filters-footer">
        <div>2</div>
        <div>4</div>
      </div>
    </div>
  );
};

export default ApartmentFilters;
