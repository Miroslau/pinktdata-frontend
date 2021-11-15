import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';

const menuListProps = {
  'aria-labelledby': 'basic-button',
};

const MenuMui = function (props) {
  const {
    id, isOpen, handleClick, anchorEl, handleClose, items, ...other
  } = props;

  return (
    <Menu
      open={isOpen}
      id={id}
      anchorEl={anchorEl}
      {...other}
      MenuListProps={menuListProps}
    >
      <div onMouseLeave={handleClose}>
        {
          // eslint-disable-next-line max-len
          items.map((item) => <MenuItem onClick={() => handleClick(item)} key={item.id}>{item.title}</MenuItem>)
        }
      </div>
    </Menu>
  );
};

MenuMui.defaultProps = {
  id: '',
  isOpen: false,
  anchorEl: null,
  handleClose: null,
  handleClick: null,
};

MenuMui.propTypes = {
  id: PropTypes.string,
  isOpen: PropTypes.bool,
  anchorEl: PropTypes.instanceOf(Object),
  items: PropTypes.instanceOf(Array).isRequired,
  handleClose: PropTypes.func,
  handleClick: PropTypes.func,
};

export default MenuMui;
