import React, { useState } from 'react';
import './User.scss';
import PropTypes from 'prop-types';
import userIcon from '../../../assets/user.webp';
import MenuMui from '../../ui-components/menu-mui/MenuMui';
import ButtonMui from '../../ui-components/button-mui/ButtonMui';
import useStyle from '../../../style/style';
import { userMenu } from '../../../constants/menu/userMenu';

// eslint-disable-next-line no-unused-vars
const User = function ({ userName, itemClick }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpenMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyle();

  return (
    <div className="user">
      <div className="user-logo">
        <img className="user-logo__image" src={userIcon} alt="logo" />
      </div>
      <ButtonMui
        title={userName}
        clickButton={handleClick}
        className={classes.userBlock}
      />
      <MenuMui
        id="basic-menu"
        isOpen={isOpenMenu}
        anchorEl={anchorEl}
        handleClose={handleClose}
        handleClick={itemClick}
        items={userMenu}
      />
    </div>
  );
};

User.defaultProps = {
  userName: 'userName',
  itemClick: null,
};

User.propTypes = {
  userName: PropTypes.string,
  itemClick: PropTypes.func,
};

export default User;
