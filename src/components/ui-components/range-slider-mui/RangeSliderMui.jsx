import React from 'react';
import { Slider } from '@mui/material';
import PropTypes from 'prop-types';

const RangeSliderMui = function (props) {
  const {
    value, handleChange, valueLabelDisplay, ...other
  } = props;
  return (
    <Slider
      value={value}
      onChange={handleChange}
      valueLabelDisplay={valueLabelDisplay}
      {...other}
    />
  );
};

RangeSliderMui.defaultProps = {
  value: [] || null,
  valueLabelDisplay: null,
};

RangeSliderMui.propTypes = {
  value: PropTypes.instanceOf(Array) || PropTypes.number,
  handleChange: PropTypes.func.isRequired,
  valueLabelDisplay: PropTypes.string,
};

export default RangeSliderMui;
