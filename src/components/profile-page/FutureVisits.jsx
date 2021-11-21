import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import useStyles from './Profile.style';

const arrRooms = [
  {
    id: 1,
    name: 'Venture',
    data: '11/11/2021',
  },
  {
    id: 2,
    name: 'Close to Everything the Poconos has to Offer',
    data: '11/09/2021',
  },
  {
    id: 3,
    name: 'Cottage by the Water',
    data: '11/10/2021',
  },
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const style2 = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};

const FutureVisits = function () {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const classes = useStyles();
  return (
    <Box sx={{ width: '100%' }} className={classes.box}>
      <Typography variant="subtitle1" gutterBottom component="div" className={classes.subtitle}>
        Upcoming Trips
      </Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Item>

            <List sx={style2} component="nav" aria-label="mailbox folders">
              <ListItem button onClick={handleOpen}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <img src="https://cdn.shopify.com/s/files/1/1765/3959/collections/Screen_Shot_2021-06-30_at_9.24.07_AM_0af7c44d-82f5-4497-a242-67ef3c78e9e6_700x.png?w=14&h=14&fit=crop&auto=format&dpr=2 2x" alt="room" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                </ListItem>
              </ListItem>
              <Divider />
            </List>

            <div>
              <Button onClick={handleOpen}>List of future visits</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    List of future visits
                  </Typography>
                  <Divider />
                  <List sx={style2} component="nav" aria-label="mailbox folders">
                    {arrRooms.map((room) => (
                      <ListItem value={room.id} button divider>
                        <ListItemText primary={room.name} secondary={room.data} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Modal>
            </div>

          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>2</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>3</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>4</Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FutureVisits;
