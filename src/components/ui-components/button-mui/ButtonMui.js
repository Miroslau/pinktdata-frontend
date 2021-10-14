import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

const ButtonMui = ({
  variant,
  title,
  color,
  disabled,
  className,
  children,
  type,
  startIcon,
  ariaLabel,

}) => (
  <Button
    variant={variant}
    disabled={disabled}
    color={color}
    className={className}
    type={type}
    startIcon={startIcon}
    aria-label={ariaLabel}
  >
    {title}
    {children || ''}
  </Button>
);

ButtonMui.defaultProps = {
  variant: 'contained',
  title: '',
  color: 'primary',
  disabled: false,
  className: '',
  children: null,
  startIcon: null,
  type: '',
  ariaLabel: '',
};

ButtonMui.propTypes = {
  variant: PropTypes.string,
  title: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.element,
  type: PropTypes.string,
  startIcon: PropTypes.element,
  ariaLabel: PropTypes.string,
};

export default ButtonMui;
