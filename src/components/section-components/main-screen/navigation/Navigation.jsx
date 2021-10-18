import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ModalWindowMui from '../../../ui-components/modal-window-mui/ModalWindowMui';
import { authorizationLocalization } from '../../../../constants/authorizationLocalization';
import Authorization from '../../../authorization/Authorization';
import User from '../../user/User';
import useStyles from '../../../../style/style';
import {
  clearState, userSelector,
} from '../../../../store/slice/userSlice';
import { signupUser, logoutUser, loginUser } from '../../../../store/actions/userAction';
import './Navigation.scss';
import {
  FIND_BTN_NAV, LINK_MAIN_SCREEN, LINK_BUY, LINK_FOR_SALE, LINK_INSIGHT, LINK_CONTACT,
} from '../../../../constants/mainPageConst';

const {
  TITLE_SIGN_UP, TITLE_SIGN_IN,
} = authorizationLocalization;

const Navigation = () => {
  const dispatch = useDispatch();
  const [isActiveModal, setModalActive] = useState(false);
  const [isSignIn, setSignIn] = useState(false);

  const useStyle = useStyles();

  const {
    isSuccess, isError, errorMessage, token, firstName,
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
        <Link className="link-item" to="/">{LINK_MAIN_SCREEN}</Link>
        <Link className="link-item" to="/buy">{LINK_BUY}</Link>
        <Link className="link-item" to="/forSale">{LINK_FOR_SALE}</Link>
        <Link className="link-item" to="/insight">{LINK_INSIGHT}</Link>
        <Link className="link-item" to="/contact">{LINK_CONTACT}</Link>
      </ul>
      <button type="button" className="button btn-find">{FIND_BTN_NAV}</button>
      {
            token ? <User userName={firstName} logOut={logOut} />
              : (
                <button
                  type="button"
                  className="button"
                  onClick={() => {
                    setSignIn(true);
                    setModalActive(true);
                  }}
                >
                  {TITLE_SIGN_IN}
                </button>
              )
        }
      <ModalWindowMui
        clickButton={closeModal}
        title={isSignIn ? TITLE_SIGN_IN : TITLE_SIGN_UP}
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
