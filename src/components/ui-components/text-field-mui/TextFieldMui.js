import React from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

const TextFieldMui = ({
  id,
  label,
  helperText,
  variant,
  value,
  name,
  type,
  required,
  placeholder,
  onChange,
  className,
}) => (
  <TextField
    className={className}
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
    onChange={onChange}
  />
);

TextFieldMui.defaultProps = {
  id: '',
  label: '',
  helperText: '',
  variant: '',
  onChange: () => {},
  value: '',
  name: '',
  required: false,
  placeholder: '',
  type: 'text',
  className: '',
};

TextFieldMui.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.string,
  variant: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default TextFieldMui;
