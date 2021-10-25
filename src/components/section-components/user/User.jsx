import React, { useState } from 'react';
import './User.scss';
import PropTypes from 'prop-types';
import userIcon from '../../../assets/user.webp';
import MenuMui from '../../ui-components/menu-mui/MenuMui';
import ButtonMui from '../../ui-components/button-mui/ButtonMui';
import useStyle from '../../../style/mapStyle';

const User = ({ userName, logOut }) => {
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
        logOutUser={logOut}
      />
    </div>
  );
};

User.defaultProps = {
  userName: 'userName',
  logOut: null,
};

User.propTypes = {
  userName: PropTypes.string,
  logOut: PropTypes.func,
};

export default User;
