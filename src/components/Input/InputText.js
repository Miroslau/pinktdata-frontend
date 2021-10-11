import React from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

const InputText = ({
  id,
  label,
  helperText,
  variant,
  value,
  name,
  type,
  required,
  placeholder,
  inputText,
}) => (
  <TextField
    error={!!helperText}
    id={id}
    label={label}
    value={value}
    helperText={helperText}
    variant={variant}
    name={name}
    type={type}
    placeholder={placeholder}
    required={required}
    onChange={inputText}
  />
);

InputText.defaultProps = {
  id: null,
  label: null,
  helperText: '',
  variant: null,
  inputText: null,
  value: null,
  name: null,
  required: false,
  placeholder: '',
};

InputText.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.string,
  variant: PropTypes.string,
  inputText: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string.isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default InputText;
