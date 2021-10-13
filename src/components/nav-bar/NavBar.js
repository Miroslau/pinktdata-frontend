import React from 'react';
import './NavBar.scss';
import ButtonMui from '../ui-components/button-mui/ButtonMui';

const NavBar = () => (
  <div className="nav-bar">
    <div className="nav-bar-buttons">
      <ButtonMui
        title="Sign up"
        variant="outlined"
      />
      <ButtonMui
        title="Sign in"
        variant="outlined"
      />
    </div>
  </div>
);

export default NavBar;
