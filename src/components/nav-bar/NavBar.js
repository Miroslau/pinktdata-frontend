import React, { useState } from 'react';
import './NavBar.scss';
import { get } from 'lodash';
import ButtonMui from '../ui-components/button-mui/ButtonMui';
import ModalWindow from '../ui-components/modal-window/ModalWindow';
import Loader from '../ui-components/loader/Loader';
import Authorization from '../authorization/Authorization';

const NavBar = () => {
  const [isActiveModal, setModalActive] = useState(false);
  const [isAuth, setAuth] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const authUser = (user) => {
    setLoading(true);
    if (isAuth === 'signIn') {
      const email = get(user, 'email', '');
      const password = get(user, 'password', '');
      const body = { email, password };
      console.log('successfully login');
      console.log('user: ', body);
      setModalActive(false);
      setLoading(false);
      return;
    }
    console.log('successfully');
    console.log('user: ', user);
    setTimeout(() => {
      setModalActive(false);
      setLoading(false);
    }, 3000);
  };

  const openRegisterForm = () => {
    setAuth('signUp');
  };

  return (
    <div className="nav-bar">
      <div className="nav-bar-buttons">
        <ButtonMui
          title="Sign in"
          variant="outlined"
          clickButton={() => {
            setModalActive(true);
            setAuth('signIn');
          }}
        />
      </div>
      <ModalWindow
        active={isActiveModal}
        closeModal={() => setModalActive(false)}
      >
        <Authorization
          auth={isAuth}
          submitForm={authUser}
          openForm={openRegisterForm}
        />
      </ModalWindow>
      {
        isLoading && <Loader />
      }
    </div>
  );
};

export default NavBar;
