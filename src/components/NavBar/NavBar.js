import React from 'react';
import './NavBar.scss';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const NavBar = () => (
  <div className="nav-bar">
    <div className="nav-bar-buttons">
      <ButtonComponent
        title="Sign up"
        variant="outlined"
      />
      <ButtonComponent
        title="Sign in"
        variant="outlined"
      />
    </div>
  </div>
);

export default NavBar;
