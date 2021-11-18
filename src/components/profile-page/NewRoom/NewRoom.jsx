import { useState } from 'react';
import PropTypes from 'prop-types';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@mui/material/Box';
import ButtonMui from '../../ui-components/button-mui/ButtonMui';
import useStyles from '../Profile.style';
import './NewRoom.modify.css';

const Input = styled('input')({
  display: 'none',
});

const NewRoom = function ({ active, setActive }) {
  const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];
  const classes = useStyles();
  const [currency, setCurrency] = React.useState('EUR');
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredContent, setEnteredContent] = useState('');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const addRoomHandler = (event) => {
    event.preventDefault();
    if (enteredTitle.length === 0 || enteredContent.length === 0) {
      return;
    }
    setActive(false);
    setEnteredTitle('');
    setEnteredContent('');
  };

  const nameChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const addressChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
    <div
      className={active ? 'modal active' : 'modal'}
      onClick={() => setActive(false)}
    >
      {/* eslint-disable-next-line max-len */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        className={active ? 'modal__content active' : 'modal__content'}
        onClick={(event) => event.stopPropagation()}
      >
        <Typography
          className={classes.modalTitle}
          variant="h5"
          gutterBottom
        >
          Add New Room
        </Typography>
        <Card>
          <CardContent>
            <form
              className={classes.modalForm}
              noValidate
              autoComplete="off"
            >
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '60ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    id="standard-basic"
                    label="Name"
                    placeholder="write room's title"
                    color="primary"
                    value={enteredTitle}
                    onChange={nameChangeHandler}
                  />
                  <TextField
                    id="standard-basic"
                    label="Address"
                    placeholder="write room's address"
                    color="primary"
                    value={enteredTitle}
                    onChange={addressChangeHandler}
                  />
                  <TextField
                    id="standard-basic"
                    label="City"
                    placeholder="write city"
                    color="primary"
                    value={enteredTitle}
                    onChange={addressChangeHandler}
                  />
                </div>
              </Box>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Select"
                    value={currency}
                    onChange={handleChange}
                    helperText="Please select your currency"
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id="standard-basic"
                    label="Amount"
                    placeholder="write room's price"
                    color="primary"
                    value={enteredTitle}
                    onChange={addressChangeHandler}
                  />
                  <TextField
                    id="standard-basic"
                    label="Bedrooms count"
                    placeholder="write room's bedrooms"
                    color="primary"
                    value={enteredTitle}
                    onChange={addressChangeHandler}
                  />
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor="contained-button-file">
                    <Input accept="image/*" id="contained-button-file" multiple type="file" />
                    <ButtonMui variant="contained" component="span">
                      Upload
                    </ButtonMui>
                  </label>
                </div>
              </Box>
            </form>
          </CardContent>
          <CardActions className={classes.buttonForm}>
            <ButtonMui title="save" size="large" onClick={addRoomHandler} />
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

NewRoom.defaultProps = {
  active: false,
  setActive: null,
};

NewRoom.propTypes = {
  active: PropTypes.bool,
  setActive: PropTypes.func,
};

export default NewRoom;
