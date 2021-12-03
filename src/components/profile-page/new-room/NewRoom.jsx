import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useStyles from '../Profile.style';

import ButtonMui from '../../ui-components/button-mui/ButtonMui';
import TextFieldMui from '../../ui-components/text-field-mui/TextFieldMui';
import { newRoomAmountField, newRoomTextField } from '../../../constants/newRoom/newRoom';
import { fileTypes } from '../../../constants/newRoom/fileTypes';
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
  const [file, setFile] = useState(null);

  const fileHandler = () => {
    setFile(file);
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
