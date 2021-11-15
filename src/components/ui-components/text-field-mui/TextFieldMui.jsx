import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

const TextFieldMui = function (props) {
  const {
    className,
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
    ...other
  } = props;

  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    if (value !== currentValue) {
      setCurrentValue(value);
    }
  }, [value]);

  const onChangeHandler = (e) => {
    setCurrentValue(e.target.value);
  };

  return (
    <TextField
      className={className}
      error={!!helperText}
      id={id}
      label={label}
      value={currentValue}
      helperText={helperText}
      variant={variant}
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      onBlur={inputText}
      onChange={onChangeHandler}
      {...other}
    />
  );
};

TextFieldMui.defaultProps = {
  className: '',
  id: null,
  label: null,
  helperText: '',
  variant: null,
  inputText: null,
  value: null,
  name: null,
  required: false,
  placeholder: '',
  type: 'text',
};

TextFieldMui.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.string,
  variant: PropTypes.string,
  inputText: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default React.memo(TextFieldMui);
