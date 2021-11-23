import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import PropTypes from 'prop-types';

import MenuItem from '@mui/material/MenuItem';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useStyles from '../Profile.style';

import ButtonMui from '../../ui-components/button-mui/ButtonMui';
import TextFieldMui from '../../ui-components/text-field-mui/TextFieldMui';
import { newRoomAmountField, newRoomTextField } from '../../../constants/newRoom/newRoom';
import { fileTypes } from '../../../constants/newRoom/fileTypes';
import { currencies } from '../../../constants/newRoom/currency';
import { validateAddRoomErrors } from '../../../mixins/validateAddRoomErrors';
import useCreateRoomForm from '../../../hooks/useCreateRoomForm';

const NewRoom = function ({ submitForm }) {
  const {
    handleChange, errors, handleSubmit,
  } = useCreateRoomForm(
    validateAddRoomErrors,
    submitForm,
  );
  const classes = useStyles();
  const [currency, setCurrency] = useState('USD');
  const [file, setFile] = useState(null);

  const currencyHandler = (event) => {
    setCurrency(event.target.value);
  };

  const fileHandler = () => {
    setFile(file);
  };

  console.log('errors: ', errors);

  return (
    <div>
      <Card>
        <CardContent>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={6} md={8}>
                <Box>
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
                            margin="dense"
                          />
                        ))
                      }
                  </div>
                </Box>
              </Grid>
              <Grid item xs={6} md={4} className={classes.textField}>
                <Box>
                  <div>
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="select"
                      value={currency}
                      onChange={currencyHandler}
                      helperText="Please select your currency"
                      size="small"
                      margin="dense"
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
                              margin="dense"
                            />
                          ))
                        }
                  </div>
                </Box>
              </Grid>
            </Grid>
            <FileUploader
              handleChange={fileHandler}
              name="file"
              types={fileTypes}
              classes="file-upload"
            />
          </form>
        </CardContent>
        <CardActions className={classes.buttonForm}>
          <ButtonMui title="save" size="large" clickButton={handleSubmit} />
        </CardActions>
      </Card>
    </div>
  );
};

NewRoom.propTypes = {
  submitForm: PropTypes.func.isRequired,
};

export default NewRoom;
