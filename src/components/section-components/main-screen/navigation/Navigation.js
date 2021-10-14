import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Dialog, DialogContent, DialogTitle, IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { authorizationLocalization } from '../../../../constants/authorizationLocalization';
import Authorization from '../../../authorization/Authorization';
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

  const {
    isSuccess, isError, firstName, errorMessage, token,
  } = useSelector(
    userSelector,
  );

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
      <Dialog open={isActiveModal}>
        <DialogTitle
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'center',
          }}
        >
          {isSignIn ? titleSiginIn : titleSiginUp}
          <IconButton
            onClick={() => {
              setModalActive(false);
              if (isError) {
                dispatch(clearState());
              }
            }}
            aria-label="close"
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {
              isError && <div className="navigation-error">{errorMessage}</div>
          }
          <Authorization
            isSignIn={isSignIn}
            submitForm={authorizationUser}
            openForm={openRegisterForm}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Navigation;
