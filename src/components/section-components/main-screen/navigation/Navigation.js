/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Dialog, DialogContent, DialogTitle, IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Authorization from '../../../authorization/Authorization';
import { clearState, signupUser, userSelector } from '../../../../store/userSlice';
import './Navigation.scss';
import Loader from '../../../ui-components/loader/Loader';

const Navigation = () => {
  const dispatch = useDispatch();
  const [isActiveModal, setModalActive] = useState(false);
  const [isSignIn, setSignIn] = useState(false);

  const {
    isSuccess, isError, isFetching,
  } = useSelector(
    userSelector,
  );

  const authorizationUser = (user) => (isSignIn ? console.log('sign') : dispatch(signupUser(user)));

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
        Sign in
      </button>
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
      {
          isFetching && <Loader />
      }
    </div>
  );
};

export default Navigation;
