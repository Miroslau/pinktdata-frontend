import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { userMenuLocalization } from '../../../constants/userMenuLocalization';

const ACCOUNT_ITEM = get(userMenuLocalization, 'TITLE_ONE', '');
const LOGUOT_ITEM = get(userMenuLocalization, 'TITLE_TWO', '');

const menuListProps = {
  'aria-labelledby': 'basic-button',
};

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
      MenuListProps={menuListProps}
    >
      <div onMouseLeave={handleClose}>
        <MenuItem>{ACCOUNT_ITEM}</MenuItem>
        <MenuItem onClick={logOutUser}>{LOGUOT_ITEM}</MenuItem>
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
