import React, { useEffect, useState } from 'react';
import './NavBar.scss';
import { useSelector, useDispatch } from 'react-redux';
import ButtonMui from '../ui-components/button-mui/ButtonMui';
import ModalWindow from '../ui-components/modal-window/ModalWindow';
import Loader from '../ui-components/loader/Loader';
import Authorization from '../authorization/Authorization';
import { signupUser, userSelector, clearState } from '../../store/userSlice';

const NavBar = () => {
  const dispatch = useDispatch();
  const [isActiveModal, setModalActive] = useState(false);
  const [isAuth, setAuth] = useState('signIn');

  const {
    isSuccess, isError, isFetching,
  } = useSelector(
    userSelector,
  );

  const authUser = (user) => {
    dispatch(signupUser(user));
  };

  useEffect(() => () => {
    dispatch(clearState());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setModalActive(false);
      dispatch(clearState());
    }

    if (isError) {
      setModalActive(false);
    }
  }, [isSuccess, isError]);

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
        isFetching && <Loader />
      }
    </div>
  );
};

export default NavBar;
