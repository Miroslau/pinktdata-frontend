import React, { useState } from 'react';
import './NavBar.scss';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import ModalWindow from '../ModalWindow/ModalWindow';
import Auth from '../Auth/Auth';

const NavBar = () => {
  const [isActiveModal, setModalActive] = useState(false);
  const [isAuth, setAuth] = useState(null);
  return (
    <div className="nav-bar">
      <div className="nav-bar-buttons">
        <ButtonComponent
          title="Sign up"
          variant="outlined"
          clickButton={() => {
            setModalActive(true);
            setAuth('signUp');
          }}
        />
        <ButtonComponent
          title="Sign in"
          variant="outlined"
          clickButton={() => {
            setModalActive(true);
            setAuth('signIn');
          }}
        />
      </div>
      {
            isActiveModal && (
            <ModalWindow
              active={isActiveModal}
              closeModal={() => setModalActive(false)}
            >
              <Auth auth={isAuth} />
            </ModalWindow>
            )
      }
    </div>
  );
};

export default NavBar;
