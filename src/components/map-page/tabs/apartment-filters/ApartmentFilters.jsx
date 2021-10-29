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

const ApartmentFilters = ({ apartmentFilter }) => {
  const [isMinInput, setMinInput] = useState(false);
  const [isMaxInput, setMaxInput] = useState(false);
  const [filtersParams, setFilterParams] = useState({
    priceRange: [10, 1000],
    bedrooms: 0,
    isMax: true,
  });

  useEffect(() => {
    let isMax = true;
    if (!isMaxInput && filtersParams.priceRange[1] === 1000) isMax = false;
    setFilterParams(((prevState) => ({ ...prevState, isMax })));
  }, [filtersParams.priceRange]);

  const openInput = () => {
    setMaxInput(false);
    setMinInput(true);
  };

  const openInputTwo = () => {
    setMinInput(false);
    setMaxInput(true);
  };

  const rangeChange = (event, newValue) => {
    setMinInput(false);
    setMaxInput(false);
    setFilterParams(((prevState) => ({ ...prevState, priceRange: newValue })));
  };

  // eslint-disable-next-line max-len
  const addRoom = () => setFilterParams(((prevState) => ({ ...prevState, bedrooms: prevState.bedrooms + 1 })));

  // eslint-disable-next-line max-len
  const removeRoom = () => setFilterParams(((prevState) => ({ ...prevState, bedrooms: prevState.bedrooms - 1 })));

  const clearState = () => {
    setFilterParams({
      priceRange: [10, 1000],
      bedrooms: 0,
      isMax: true,
    });
  };

  const handleInputChange = (event) => {
    const value = Number(event.target.value);
    const priceRangeValue = [...filtersParams.priceRange];
    if (isMinInput) {
      priceRangeValue[0] = value;
    }
    if (isMaxInput) {
      priceRangeValue[1] = value;
    }
    setFilterParams(((prevState) => ({ ...prevState, priceRange: priceRangeValue })));
  };

  const filterApartment = () => {
    apartmentFilter(filtersParams);
  };

  return (
    <div className="apartment-filters">
      <div className="apartment-filters-price-range">
        <div className="apartment-filters__title">
          Price range
        </div>
        <div className="apartment-filters-price-range__slider">
          <div className="apartment-filters-price-range__label">
            {
              !isMinInput ? (
                <span
                  className="apartment-filters-price-range__item"
                  onClick={openInput}
                  role="presentation"
                >
                  {`Min price: ${filtersParams.priceRange[0]}`}
                </span>
              ) : (
                <Input
                  value={filtersParams.priceRange[0]}
                  size="small"
                  onChange={handleInputChange}
                  inputProps={{
                    step: 10,
                    min: 10,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />
              )
            }
            {
              !isMaxInput ? (
                <span
                  className="apartment-filters-price-range__item"
                  onClick={openInputTwo}
                  role="presentation"
                >
                  {`Max price: ${(filtersParams.priceRange[1] === 1000 ? `${filtersParams.priceRange[1]}+` : filtersParams.priceRange[1])}`}
                </span>
              ) : (
                <Input
                  value={filtersParams.priceRange[1]}
                  size="small"
                  onChange={handleInputChange}
                  inputProps={{
                    step: 10,
                    min: 10,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />
              )
            }
          </div>
          <RangeSliderMui
            value={filtersParams.priceRange}
            handleChange={rangeChange}
            valueLabelDisplay="auto"
            step={10}
            min={10}
            max={1000}
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
              disabled={filtersParams.bedrooms === 0}
              className="apartment-filters__button"
            >
              <RemoveIcon />
            </ButtonMui>
            <div>{filtersParams.bedrooms}</div>
            <ButtonMui
              aria-label="add"
              clickButton={addRoom}
              disabled={filtersParams.bedrooms === 5}
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
  apartmentFilter: PropTypes.func.isRequired,
};

export default ApartmentFilters;
