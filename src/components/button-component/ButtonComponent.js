import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

const ButtonComponent = ({
  variant,
  title,
  color,
  disabled,
  className,
  children,
  type,
}) => (
  <Button
    variant={variant}
    disabled={disabled}
    color={color}
    className={className}
    type={type}
  >
    {title || children}
  </Button>
);

ButtonComponent.defaultProps = {
  variant: 'contained',
  title: '',
  color: 'primary',
  disabled: false,
  className: '',
  children: null,
  type: '',
};

ButtonComponent.propTypes = {
  variant: PropTypes.string,
  title: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.func,
  type: PropTypes.string,
};

export default ButtonComponent;
