import React from 'react';
import { Slider } from '@mui/material';
import PropTypes from 'prop-types';

const RangeSliderMui = (props) => {
  const {
    value, handleChange, valueLabelDisplay, valuetext, ...other
  } = props;
  return (
    <Slider
      value={value}
      onChange={handleChange}
      valueLabelDisplay={valueLabelDisplay}
      getAriaValueText={valuetext}
      {...other}
    />
  );
};

RangeSliderMui.defaultProps = {
  value: [] || null,
  valueLabelDisplay: null,
  valuetext: null,
};

RangeSliderMui.propTypes = {
  value: PropTypes.instanceOf(Array) || PropTypes.number,
  handleChange: PropTypes.func.isRequired,
  valueLabelDisplay: PropTypes.string,
  valuetext: PropTypes.func,
};

export default RangeSliderMui;
