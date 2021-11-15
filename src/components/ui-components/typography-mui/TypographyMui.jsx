import React from 'react';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const TypographyMui = function (props) {
  const {
    variant,
    text,
    color,
    ...other
  } = props;
  return (
    <Typography
      variant={variant}
      color={color}
      {...other}
    >
      {text}
    </Typography>
  );
};

TypographyMui.defaultProps = {
  variant: 'body2',
  text: '',
  color: 'default',
};

TypographyMui.propTypes = {
  variant: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string,
};

export default React.memo(TypographyMui);
