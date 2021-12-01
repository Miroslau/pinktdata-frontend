import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';

import { styled } from '@mui/material/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import axios from 'axios';
import useStyles from '../Profile.style';

import ButtonMui from '../../ui-components/button-mui/ButtonMui';
import TextFieldMui from '../../ui-components/text-field-mui/TextFieldMui';
import {
  newRoomAmountField,
  newRoomTextField,
  publicAddress,
} from '../../../constants/newRoom/newRoom';
import { validateAddRoomErrors } from '../../../mixins/validateAddRoomErrors';
import useCreateRoomForm from '../../../hooks/useCreateRoomForm';

const NewRoom = function ({ submitForm }) {
  const {
    handleChange, handleSubmit, room, errors,
  } = useCreateRoomForm(
    validateAddRoomErrors,
    submitForm,
  );

  const classes = useStyles();

  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) => Object.assign(file, {
          preview: URL.createObjectURL(file),
        })),
      );
    },
  });

  const images = files.map((file) => (
    <div key={file.name}>
      <div>
        <img src={file.preview} style={{ width: '200px' }} alt="preview" />
      </div>
    </div>
  ));

  const Input = styled('input')({
    display: 'none',
  });

  const addressHandler = () => {
    console.log(`${room.publicAddress}`);
    axios.post(`http://api.positionstack.com/v1/forward'
      + '    ? access_key = 56ec5078b08845dc77b04f1357b21b90'
      + '    & query = ${room.publicAddress}`, `${room.publicAddress}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  };

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
                            value={room[`${field.model}`]}
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
                    {
                      publicAddress.map((field) => (
                        <div className={classes.public}>
                          <TextFieldMui
                            variant="outlined"
                            key={field.id}
                            value={room[`${field.model}`]}
                            name={field.model}
                            required={field.required}
                            type={field.type}
                            helperText={errors[`${field.model}`]}
                            label={field.title}
                            placeholder={field.placeholder}
                            inputText={handleChange}
                            margin="dense"
                          />
                          <FormControlLabel
                            control={<Checkbox required />}
                            label="Check"
                            onClick={addressHandler}
                          />
                        </div>
                      ))
                    }
                  </div>
                </Box>
              </Grid>
              <Grid item xs={6} md={4} className={classes.textField}>
                <Box>
                  <div>
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
                              margin="dense"
                            />
                          ))
                        }
                  </div>
                </Box>
              </Grid>
            </Grid>
            <Stack direction="row" alignItems="center" spacing={8}>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" multiple type="file" />
                <ButtonMui variant="contained" component="span" title="Upload" />
              </label>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p className={classes.dropTitle}>Drop files here</p>
              </div>
              <div>{images}</div>
            </Stack>
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
