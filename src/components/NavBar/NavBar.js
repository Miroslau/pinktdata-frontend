import React, { useState } from 'react';
import './NavBar.scss';
import { get } from 'lodash';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import ModalWindow from '../ModalWindow/ModalWindow';
import Loader from '../Loader/Loader';
import Auth from '../Auth/Auth';

const NavBar = () => {
  const [isActiveModal, setModalActive] = useState(false);
  const [isAuth, setAuth] = useState(null);
  const [loaderRun, setLoaderRun] = useState(false);

  const authUser = (user) => {
    setLoaderRun(true);
    if (isAuth === 'signIn') {
      const email = get(user, 'email', '');
      const password = get(user, 'password', '');
      const body = { email, password };
      console.log('successfully login');
      console.log('user: ', body);
      setModalActive(false);
      setLoaderRun(false);
      return;
    }
    console.log('successfully');
    console.log('user: ', user);
    setTimeout(() => {
      setModalActive(false);
      setLoaderRun(false);
    }, 3000);
  };

  const openRegisterForm = () => {
    setAuth('signUp');
  };

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
              <Auth
                auth={isAuth}
                submitForm={authUser}
                openForm={openRegisterForm}
              />
            </ModalWindow>
            )
      }
      {
            loaderRun && <Loader />
      }
    </div>
  );
};

export default NavBar;
