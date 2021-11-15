import React from 'react';
import MuiInput from '@mui/material/Input';
import PropTypes from 'prop-types';

const InputMui = function (props) {
  const {
    value, size, onChange, inputProps, ...other
  } = props;
  return (
    <MuiInput
      value={value}
      size={size}
      onChange={onChange}
      inputProps={inputProps}
      {...other}
    />
  );
};

InputMui.defaultProps = {
  value: null,
  size: null,
  inputProps: null,
};

InputMui.propTypes = {
  value: PropTypes.number,
  size: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  inputProps: PropTypes.instanceOf(Object),
};

export default InputMui;
