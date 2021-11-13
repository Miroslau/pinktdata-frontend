import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

const ButtonMui = function (props) {
  const {
    variant,
    title,
    color,
    disabled,
    className,
    children,
    ariaLabel,
    startIcon,
    clickButton,
    ...other
  } = props;
  return (
    <Button
      variant={variant}
      disabled={disabled}
      color={color}
      className={className}
      onClick={clickButton}
      startIcon={startIcon}
      aria-label={ariaLabel}
      {...other}
    >
      {title}
      {children || ''}
    </Button>
  );
};

ButtonMui.defaultProps = {
  variant: 'contained',
  title: '',
  color: 'primary',
  disabled: false,
  className: '',
  children: null,
  startIcon: null,
  ariaLabel: '',
};

ButtonMui.propTypes = {
  variant: PropTypes.string,
  title: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  clickButton: PropTypes.func.isRequired,
  children: PropTypes.element,
  startIcon: PropTypes.element,
  ariaLabel: PropTypes.string,
};

export default React.memo(ButtonMui);
