import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Dialog, DialogContent, DialogTitle, IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Authorization from '../../../authorization/Authorization';
import {
  clearState, signupUser, logoutUser, userSelector,
} from '../../../../store/userSlice';
import './Navigation.scss';

const Navigation = () => {
  const dispatch = useDispatch();
  const [isActiveModal, setModalActive] = useState(false);
  const [isSignIn, setSignIn] = useState(false);

  const {
    isSuccess, isError, firstName,
  } = useSelector(
    userSelector,
  );

  const token = localStorage.getItem('token');

  const authorizationUser = (user) => dispatch(signupUser(user));

  const logOut = () => dispatch(logoutUser());

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
        {token ? firstName : 'Sign in'}
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
          {isSignIn ? 'Sign in' : 'Sign Up'}
          <IconButton
            onClick={() => {
              setModalActive(false);
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
