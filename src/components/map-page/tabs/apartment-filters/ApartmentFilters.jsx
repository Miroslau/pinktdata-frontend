import React, { useEffect, useState } from 'react';
import './ApartmentFilters.scss';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import InputMui from '../../../ui-components/input-mui/InputMui';
import RangeSliderMui from '../../../ui-components/range-slider-mui/RangeSliderMui';
import ButtonMui from '../../../ui-components/button-mui/ButtonMui';
import { apartmentFilterLocalization } from '../../../../constants/Localizations/apartmentFilterLocalization';

const Input = styled(InputMui)`
  width: 70px;
`;

const MIN_BEDROOMS = 0;
const MAX_BEDROOMS = 8;

const MIN_PRICE = 10;
const MAX_PRICE = 1000;
const STEP = 10;

const inputProps = {
  step: STEP,
  min: MIN_PRICE,
  type: 'number',
  'aria-labelledby': 'input-slider',
};

const ApartmentFilters = function ({ apartmentFilter }) {
  const [filtersParams, setFilterParams] = useState({
    priceRange: [10, 1000],
    bedrooms: 0,
    isMax: true,
    isMinInput: false,
    isMaxInput: false,
  });

  useEffect(() => {
    let isMax = true;
    if (!filtersParams.isMaxInput && filtersParams.priceRange[1] === MAX_PRICE) { isMax = false; }
    setFilterParams((prevState) => ({ ...prevState, isMax }));
  }, [filtersParams.priceRange]);

  const openInputLeft = () => {
    setFilterParams((prevState) => ({
      ...prevState,
      isMinInput: true,
      isMaxInput: false,
    }));
  };

  const openInputRight = () => {
    setFilterParams((prevState) => ({
      ...prevState,
      isMinInput: false,
      isMaxInput: true,
    }));
  };

  const rangeChange = (event, newValue) => {
    // eslint-disable-next-line max-len
    setFilterParams((prevState) => ({
      ...prevState,
      priceRange: newValue,
      isMinInput: false,
      isMaxInput: false,
    }));
  };

  // eslint-disable-next-line max-len
  const addRoom = () => setFilterParams((prevState) => ({
    ...prevState,
    bedrooms: prevState.bedrooms + 1,
  }));

  // eslint-disable-next-line max-len
  const removeRoom = () => setFilterParams((prevState) => ({
    ...prevState,
    bedrooms: prevState.bedrooms - 1,
  }));

  const clearState = () => {
    setFilterParams({
      priceRange: [10, 1000],
      bedrooms: 0,
      isMax: true,
      isMinInput: false,
      isMaxInput: false,
    });
  };

  const handleInputChange = (event) => {
    const value = Number(event.target.value);
    const priceRangeValue = [...filtersParams.priceRange];
    if (filtersParams.isMinInput) {
      priceRangeValue[0] = value;
    }
    if (filtersParams.isMaxInput) {
      priceRangeValue[1] = value;
    }
    setFilterParams((prevState) => ({
      ...prevState,
      priceRange: priceRangeValue,
    }));
  };

  const filterApartment = () => {
    apartmentFilter(filtersParams);
  };

  return (
    <div className="apartment-filters">
      <div className="apartment-filters-price-range">
        <div className="apartment-filters__title">
          {apartmentFilterLocalization.PRICE_RANGE}
        </div>
        <div className="apartment-filters-price-range__slider">
          <div className="apartment-filters-price-range__label">
            {!filtersParams.isMinInput ? (
              <span
                className="apartment-filters-price-range__item"
                onClick={openInputLeft}
                role="presentation"
              >
                {`Min price: ${filtersParams.priceRange[0]}`}
              </span>
            ) : (
              <Input
                value={filtersParams.priceRange[0]}
                size="small"
                onChange={handleInputChange}
                inputProps={inputProps}
              />
            )}
            {!filtersParams.isMaxInput ? (
              <span
                className="apartment-filters-price-range__item"
                onClick={openInputRight}
                role="presentation"
              >
                {`Max price: ${
                  filtersParams.priceRange[1] === MAX_PRICE
                    ? `${filtersParams.priceRange[1]}+`
                    : filtersParams.priceRange[1]
                }`}
              </span>
            ) : (
              <Input
                value={filtersParams.priceRange[1]}
                size="small"
                onChange={handleInputChange}
                inputProps={inputProps}
              />
            )}
          </div>
          <RangeSliderMui
            value={filtersParams.priceRange}
            handleChange={rangeChange}
            valueLabelDisplay="auto"
            step={STEP}
            min={MIN_PRICE}
            max={MAX_PRICE}
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
              disabled={filtersParams.bedrooms === MIN_BEDROOMS}
              className="apartment-filters__button"
            >
              <RemoveIcon />
            </ButtonMui>
            <div>{filtersParams.bedrooms}</div>
            <ButtonMui
              aria-label="add"
              clickButton={addRoom}
              disabled={filtersParams.bedrooms === MAX_BEDROOMS}
              size="small"
              className="apartment-filters__button"
            >
              <AddIcon />
            </ButtonMui>
          </div>
        </div>
      </div>
      <div className="apartment-filters-footer">
        <ButtonMui
          title={apartmentFilterLocalization.CLEAR}
          clickButton={clearState}
        />
        <ButtonMui
          title={apartmentFilterLocalization.APPLY}
          clickButton={filterApartment}
        />
      </div>
    </div>
  );
};

ApartmentFilters.propTypes = {
  apartmentFilter: PropTypes.func.isRequired,
};

export default ApartmentFilters;
