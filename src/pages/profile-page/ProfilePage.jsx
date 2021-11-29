import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Typography from '@mui/material/Typography';
import useStyles from '../../style/style';

import History from '../../components/profile-page/history-vists/History';
import FutureVisits from '../../components/profile-page/future-visits/FutureVisits';
import Rent from '../../components/profile-page/rent-rooms/Rent';
import ButtonMui from '../../components/ui-components/button-mui/ButtonMui';
import NewRoom from '../../components/profile-page/new-room/NewRoom';
import ModalWindowMui from '../../components/ui-components/modal-window-mui/ModalWindowMui';
import { clearState, rentSelector } from '../../store/slice/rentSlice';
import { addNewRoom } from '../../store/actions/rentAction';

const ProfilePage = function () {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isActiveModal, setModalActive] = useState(false);

  const {
    isSuccess, isError, errorMessage,
  } = useSelector(
    rentSelector,
  );

  const closeModal = () => {
    setModalActive(false);
    if (isError) {
      dispatch(clearState());
    }
  };

  const addRoom = (room) => { dispatch(addNewRoom(room)); };

  useEffect(() => () => {
    dispatch(clearState());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setModalActive(false);
      dispatch(clearState());
    }
  }, [isSuccess]);

  return (
    <div className={classes.modalWrapper}>
      <div className={classes.header}>
        <Typography variant="body1" gutterBottom className={classes.title}>
          Dashboard
        </Typography>
        <ButtonMui title="Add new room" variant="outlined" clickButton={() => setModalActive(true)} />
      </div>
      <History />
      <FutureVisits />
      <Rent submitForm={addRoom} />
      <ModalWindowMui
        clickButton={closeModal}
        title="Add New Room"
        isActiveModal={isActiveModal}
        sx={classes.dialog}
      >
        {
          isError && <div className="navigation-landing-error">{errorMessage}</div>
        }
        <NewRoom
          setActive={setModalActive}
          submitForm={addRoom}
        />
      </ModalWindowMui>
    </div>
  );
};

export default ProfilePage;
