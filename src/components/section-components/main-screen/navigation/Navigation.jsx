import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { get } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import ModalWindowMui from '../../../ui-components/modal-window-mui/ModalWindowMui';
import { authorizationLocalization } from '../../../../constants/Localizations/authorizationLocalization';
import Authorization from '../../../authorization/Authorization';
import User from '../../user/User';
import SearchBar from './search-bar/SearchBar';
import useStyles from '../../../../style/style';
import { LANDING_ROUTE } from '../../../../constants/routes';
import { userMenuLocalization } from '../../../../constants/Localizations/userMenuLocalization';
import {
  clearState, userSelector,
} from '../../../../store/slice/userSlice';
import { signupUser, logoutUser, loginUser } from '../../../../store/actions/userAction';
import './Navigation.scss';
import MainBar from './main-bar/MainBar';

const {
  TITLE_SIGN_UP, TITLE_SIGN_IN,
} = authorizationLocalization;

const Navigation = function () {
  const dispatch = useDispatch();
  const [isActiveModal, setModalActive] = useState(false);
  const [isSignIn, setSignIn] = useState(false);
  const location = useLocation();

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

  const itemClick = (item) => {
    const title = get(item, 'title', '');
    switch (title) {
      case userMenuLocalization.TITLE_TWO:
        dispatch(logoutUser());
        break;
      default: break;
    }
  };

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
    <div className={location.pathname === LANDING_ROUTE ? 'navigation-landing' : 'navigation'}>
      {
        location.pathname === LANDING_ROUTE ? <MainBar /> : <SearchBar />
      }
      {
            token ? <User userName={firstName} itemClick={itemClick} />
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
              isError && <div className="navigation-landing-error">{errorMessage}</div>
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
