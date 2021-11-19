import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ButtonMui from '../../ui-components/button-mui/ButtonMui';
import useStyles from '../Profile.style';
import './NewRoom.modify.css';
import { newRoomAmountField, newRoomTextField } from '../../../constants/newRoom/newRoom';
import TextFieldMui from '../../ui-components/text-field-mui/TextFieldMui';
import useForm from '../../../hooks/useForm';
import { validateErrors } from '../../../mixins/validateErrors';
import TypographyMui from '../../ui-components/typography-mui/TypographyMui';
import { currencies } from '../../../constants/newRoom/currency';

const Input = styled('input')({
  display: 'none',
});

const NewRoom = function ({ active, setActive }) {
  const {
    handleChange, errors,
  } = useForm(
    validateErrors,
  );
  const classes = useStyles();
  const [currency, setCurrency] = React.useState('USD');

  const currencyHandler = (event) => {
    setCurrency(event.target.value);
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
              <Grid container spacing={2}>
                <Grid item xs={6} md={6}>
                  <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '60ch' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div>
                      {
                        newRoomTextField.map((field) => (
                          <TextFieldMui
                            variant="outlined"
                            key={field.id}
                            value={field.model}
                            name={field.model}
                            required={field.required}
                            type={field.type}
                            helperText={errors[`${field.model}`]}
                            label={field.title}
                            placeholder={field.placeholder}
                            inputText={handleChange}
                          />
                        ))
                      }
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={4} md={4} className={classes.textField}>
                  <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '38ch' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div>
                      <TextField
                        id="outlined-select-currency"
                        select
                        label="select"
                        value={currency}
                        onChange={currencyHandler}
                        helperText="Please select your currency"
                        size="small"
                      >
                        {currencies.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      {
                          newRoomAmountField.map((field) => (
                            <TextFieldMui
                              variant="outlined"
                              key={field.id}
                              value={field.model}
                              name={field.model}
                              required={field.required}
                              type={field.type}
                              helperText={errors[`${field.model}`]}
                              label={field.title}
                              placeholder={field.placeholder}
                              inputText={handleChange}
                              size="small"
                            />
                          ))
                        }
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={2} md={2}>
                  <div className={classes.uploadBtn}>
                    <TypographyMui variant="h6" text="Upload your files here:" />
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label htmlFor="contained-button-file">
                      <Input accept="image/*" id="contained-button-file" multiple type="file" />
                      <ButtonMui variant="contained" component="span">
                        Browse
                      </ButtonMui>
                    </label>
                  </div>
                </Grid>
              </Grid>
            </form>
          </CardContent>
          <CardActions className={classes.buttonForm}>
            <ButtonMui title="save" size="large" clickButton={() => setActive(false)} />
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
