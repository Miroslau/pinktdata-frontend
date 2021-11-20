import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Typography from '@mui/material/Typography';
import useStyles from '../../style/style';

import History from '../../components/profile-page/History';
import FutureVisits from '../../components/profile-page/FutureVisits';
import Rent from '../../components/profile-page/Rent';
import ButtonMui from '../../components/ui-components/button-mui/ButtonMui';
import NewRoom from '../../components/profile-page/NewRoom/NewRoom';
import ModalWindowMui from '../../components/ui-components/modal-window-mui/ModalWindowMui';
import { userSelector } from '../../store/slice/userSlice';

const ProfilePage = function () {
  const classes = useStyles();
  const [isActiveModal, setModalActive] = useState(false);

  const {
    isError, errorMessage,
  } = useSelector(
    userSelector,
  );

  return (
    <div className={classes.modalWrapper}>
      <div className={classes.header}>
        <Typography variant="body1" gutterBottom className={classes.title}>
          Dashboard
        </Typography>
        <ButtonMui title="Add new room" variant="outlined" onClick={() => setModalActive(true)} />
      </div>
      <History />
      <FutureVisits />
      <Rent />
      <ModalWindowMui
        clickButton={() => setModalActive(false)}
        title="Add New Room"
        isActiveModal={isActiveModal}
        sx={classes.dialog}
      >
        {
          isError && <div className="navigation-landing-error">{errorMessage}</div>
        }
        <NewRoom setActive={setModalActive} />
      </ModalWindowMui>
    </div>
  );
};

export default ProfilePage;
