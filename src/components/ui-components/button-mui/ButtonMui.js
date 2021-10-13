import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

const ButtonMui = (props) => {
  const {
    variant,
    title,
    color,
    disabled,
    clickButton,
    ...other
  } = props;
  return (
    <Button
      variant={variant}
      disabled={disabled}
      color={color}
      onClick={clickButton}
      {...other}
    >
      {title}
    </Button>
  );
};

ButtonMui.defaultProps = {
  variant: 'contained',
  title: '',
  color: 'primary',
  disabled: false,
};

ButtonMui.propTypes = {
  variant: PropTypes.string,
  title: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  clickButton: PropTypes.func.isRequired,
};

export default React.memo(ButtonMui);
