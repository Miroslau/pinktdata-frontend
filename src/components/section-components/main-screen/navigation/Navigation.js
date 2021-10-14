import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ModalWindowMui from '../../../ui-components/modal-window-mui/ModalWindowMui';
import { authorizationLocalization } from '../../../../constants/authorizationLocalization';
import Authorization from '../../../authorization/Authorization';
import useStyles from '../../../../style/style';
import {
  clearState, userSelector,
} from '../../../../store/slice/userSlice';
import { signupUser, logoutUser, loginUser } from '../../../../store/actions/userAction';
import './Navigation.scss';

const {
  titleSiginUp, titleSiginIn,
} = authorizationLocalization;

const Navigation = () => {
  const dispatch = useDispatch();
  const [isActiveModal, setModalActive] = useState(false);
  const [isSignIn, setSignIn] = useState(false);

  const useStyle = useStyles();

  const {
    isSuccess, isError, firstName, errorMessage, token,
  } = useSelector(
    userSelector,
  );

  const closeModal = () => {
    setModalActive(false);
    if (isError) {
      dispatch(clearState());
    }
  };

  // eslint-disable-next-line max-len
  const authorizationUser = (user) => (isSignIn ? dispatch(loginUser(user)) : dispatch(signupUser(user)));

  const logOut = () => dispatch(logoutUser());

  useEffect(() => () => {
    dispatch(clearState());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setModalActive(false);
      dispatch(clearState());
    }
  }, [isSuccess]);

  const openRegisterForm = () => {
    dispatch(clearState());
    setSignIn(false);
  };
  return (
    <div className="navigation">
      <ul className="link-container">
        <Link className="link-item" to="/">MainScreen</Link>
        <Link className="link-item" to="/buy">Buy</Link>
        <Link className="link-item" to="/forSale">ForSale</Link>
        <Link className="link-item" to="/insight">Insight</Link>
        <Link className="link-item" to="/contact">Contact</Link>
      </ul>
      <button type="button" className="button btn-find">Find Nearby</button>
      <button
        type="button"
        className="button"
        onClick={() => {
          setSignIn(true);
          setModalActive(true);
        }}
      >
        {token ? firstName : titleSiginIn}
      </button>
      {
            token && <button onClick={logOut} type="button" className="button">Log out</button>
      }
      <ModalWindowMui
        clickButton={closeModal}
        title={isSignIn ? titleSiginIn : titleSiginUp}
        isActiveModal={isActiveModal}
        sx={useStyle.dialog}
      >
        {
              isError && <div className="navigation-error">{errorMessage}</div>
        }
        <Authorization
          isSignIn={isSignIn}
          submitForm={authorizationUser}
          openForm={openRegisterForm}
        />
      </ModalWindowMui>
    </div>
  );
};

export default Navigation;
