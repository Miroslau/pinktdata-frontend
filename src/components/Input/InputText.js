import React from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

const InputText = ({
  error,
  id,
  label,
  helperText,
  variant,
  value,
  name,
  inputText,
}) => (
  <TextField
    error={error}
    id={id}
    label={label}
    value={value}
    helperText={helperText}
    variant={variant}
    name={name}
    onChange={inputText}
  />
);

InputText.defaultProps = {
  id: null,
  error: null,
  label: null,
  helperText: null,
  variant: null,
  inputText: null,
  value: null,
  name: null,
};

InputText.propTypes = {
  id: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.string,
  variant: PropTypes.string,
  inputText: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string,
};

export default InputText;
