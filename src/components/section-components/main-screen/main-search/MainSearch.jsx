import React, { useCallback, useState } from 'react';
import { TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import FormControl from '@mui/material/FormControl';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import InputLabel from '@mui/material/InputLabel';
import Popover from '@mui/material/Popover';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RoomIcon from '@mui/icons-material/Room';
import SearchIcon from '@mui/icons-material/Search';
import ButtonMui from '../../../ui-components/button-mui/ButtonMui';
import TextFieldMui from '../../../ui-components/text-field-mui/TextFieldMui';
import TEXT from '../../../../constants/mainScreen';
import searchByLocation from '../../../../api/main-search/main-searchAPI';
import useStyles from './MainSearch.style';

const MAX_BEDROOM = 5;

const MainSearch = () => {
  const [bedroom, setBedroom] = React.useState(0);

  const handleAddBedroom = useCallback(() => {
    setBedroom((bedroomValue) => (bedroomValue < MAX_BEDROOM ? bedroomValue + 1 : bedroomValue));
  },
  []);
  const handleRemoveBedroom = useCallback(() => {
    setBedroom((bedroomValue) => (bedroomValue > 0 ? bedroomValue - 1 : bedroomValue));
  },
  []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const dateNow = new Date();
  const dateNowPlusOneDay = new Date();
  dateNowPlusOneDay.setDate(dateNow.getDate() + 1);
  dateNowPlusOneDay.toLocaleDateString();
  const classes = useStyles();
  const [location, setLocation] = useState('');
  const [startDateValue, setStartDateValue] = useState(dateNow);
  const [endDateValue, setEndDateValue] = useState(dateNowPlusOneDay);

  return (
    <form className={classes.form}>
      <div className={classes.locationWrapper}>
        <RoomIcon className={classes.roomIcon} />
        <TextFieldMui
          className={classes.location}
          label={TEXT.MAIN_SEARCH.LOCATION}
          variant="standard"
          placeholder={TEXT.MAIN_SEARCH.ENTER_LOCATION}
          value={location}
          onChange={(event) => {
            setLocation(event.target.value);
            searchByLocation.location();
          }}
        />
      </div>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label={TEXT.MAIN_SEARCH.START_DATE}
          value={startDateValue}
          onChange={setStartDateValue}
          renderInput={(params) => <TextField {...params} className={classes.date} />}
        />

        <DatePicker
          label={TEXT.MAIN_SEARCH.END_DATE}
          value={endDateValue}
          onChange={setEndDateValue}
          min={startDateValue}
          renderInput={(params) => <TextField {...params} className={classes.date} />}
        />
      </LocalizationProvider>

      <FormControl className={classes.bedroom}>

        <FormControl sx={{ width: 400 }}>
          <InputLabel aria-describedby={id} variant="contained" onClick={handleClick} id="input-search-bedrooms">
            {TEXT.MAIN_SEARCH.BEDROOM_TYPE}
            {bedroom > 0 ? `: ${bedroom}` : ''}
          </InputLabel>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Grid
              p={2}
              container
              spacing={2}
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="body2" gutterBottom>
                  {TEXT.MAIN_SEARCH.BEDROOM_COUNT}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {TEXT.MAIN_SEARCH.SELECT_NUMBER}
                </Typography>
              </Grid>
              <Grid item>
                <Fab size="small" color="primary" aria-label="add" onClick={handleAddBedroom}>
                  <AddIcon />
                </Fab>
              </Grid>
              <Grid item>
                <Typography>
                  {bedroom}
                </Typography>
              </Grid>
              <Grid item>
                <Fab size="small" color="primary" aria-label="remove" onClick={handleRemoveBedroom}>
                  <RemoveSharpIcon />
                </Fab>
              </Grid>
            </Grid>
          </Popover>

        </FormControl>

      </FormControl>

      <ButtonMui
        ariaLabel="search-button"
        variant="contained"
        color="secondary"
        className={classes.searchButton}
        clickButton={() => console.log('Search...')}
      >
        <SearchIcon fontSize="large" />
      </ButtonMui>

    </form>
  );
};

export default MainSearch;
