import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';

const MenuMui = (props) => {
  const {
    id, isOpen, logOutUser, anchorEl, handleClose, ...other
  } = props;
  return (
    <Menu
      open={isOpen}
      id={id}
      anchorEl={anchorEl}
      {...other}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <div onMouseLeave={handleClose}>
        <MenuItem>My account</MenuItem>
        <MenuItem onClick={logOutUser}>Logout</MenuItem>
      </div>
    </Menu>
  );
};

MenuMui.defaultProps = {
  id: '',
  isOpen: false,
  anchorEl: null,
  handleClose: null,
  logOutUser: null,
};

MenuMui.propTypes = {
  id: PropTypes.string,
  isOpen: PropTypes.bool,
  anchorEl: PropTypes.instanceOf(Object),
  handleClose: PropTypes.func,
  logOutUser: PropTypes.func,
};

export default MenuMui;
