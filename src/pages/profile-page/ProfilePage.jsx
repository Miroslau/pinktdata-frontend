import React from 'react';
import Typography from '@mui/material/Typography';
import useStyles from '../../components/profile-page/Profile.style';
import History from '../../components/profile-page/History';
import FutureVisits from '../../components/profile-page/FutureVisits';
import Rent from '../../components/profile-page/Rent';
import ButtonMui from '../../components/ui-components/button-mui/ButtonMui';

const ProfilePage = function () {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <Typography variant="body1" gutterBottom className={classes.title}>
          Dashboard
        </Typography>
        <ButtonMui title="Add new room" variant="outlined" />
      </div>
      <History />
      <FutureVisits />
      <Rent />
    </div>
  );
};

export default ProfilePage;
