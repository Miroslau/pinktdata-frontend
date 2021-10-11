import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

const ButtonComponent = ({
  variant,
  title,
  color,
  disabled,
  clickButton,
}) => (
  <Button
    variant={variant}
    disabled={disabled}
    color={color}
    onClick={() => clickButton()}
  >
    {title}
  </Button>
);

ButtonComponent.defaultProps = {
  variant: 'contained',
  title: '',
  color: 'primary',
  disabled: false,
};

ButtonComponent.propTypes = {
  variant: PropTypes.string,
  title: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  clickButton: PropTypes.func.isRequired,
};

export default ButtonComponent;
