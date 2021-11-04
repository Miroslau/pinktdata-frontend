import React, { useEffect, useRef, useState } from 'react';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import FormControl from '@mui/material/FormControl';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import InputLabel from '@mui/material/InputLabel';
import RoomIcon from '@mui/icons-material/Room';
import SearchIcon from '@mui/icons-material/Search';
import Popover from '@mui/material/Popover';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';
import { doWithUserDelay } from '../../../../utils/doWithUserDelay';
import LocationAPI from '../../../../api/main-search/LocationAPI';
import useStyles from './MainSearch.style';
import TEXT from '../../../../constants/mainScreen';
import ButtonMui from '../../../ui-components/button-mui/ButtonMui';

const MAX_BEDROOM = 8;
const MIN_BEDROOMS = 0;

const MainSearch = () => {
  const [bedroom, setBedroom] = React.useState(0);

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
  const isMounted = useRef(null);
  const [location, setLocation] = useState('');
  const [dataLocation, setDataLocation] = useState([]);
  const [startDateValue, setStartDateValue] = useState(dateNow);
  const [endDateValue, setEndDateValue] = useState(dateNowPlusOneDay);
  const [isError, setIsError] = useState(false);
  let userDelay;

  const defaultProps = {
    options: dataLocation,
  };

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      if (userDelay) {
        clearTimeout(userDelay);
      }
    };
  }, []);

  useEffect(async () => {
    if (location) {
      try {
        const response = await LocationAPI.search(location);
        if (isMounted.current) {
          setDataLocation(response);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [location]);

  const handleChange = (e) => {
    const { value } = e.target;
    if (!value) {
      setDataLocation([]);
      setIsError(true);
    } else {
      setIsError(false);
      setLocation(value);
    }
  };

  const searchChangeHandler = (e) => {
    userDelay = doWithUserDelay(() => handleChange(e), userDelay);
  };

  return (
    <form className={classes.form}>
      <div className={classes.locationWrapper}>
        <RoomIcon className={classes.roomIcon} />
        <Autocomplete
          style={{ width: '300px' }}
          {...defaultProps}
          id="disable-close-on-select"
          disableClearable
          renderInput={(params) => (
            <TextField
              data-testid="Location"
              placeholder="Location"
              {...params}
              onChange={searchChangeHandler}
              value={location}
              label={TEXT.MAIN_SEARCH.LOCATION}
              variant="standard"
              error={isError}
            />
          )}
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
          <InputLabel aria-describedby={id} variant="standard" onClick={handleClick} id="input-search-bedrooms">
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
                <Fab size="small" color="primary" disabled={bedroom >= MAX_BEDROOM} aria-label="add" name="add" onClick={() => setBedroom(bedroom + 1)}>
                  <AddIcon />
                </Fab>
              </Grid>
              <Grid item>
                <Typography>
                  {bedroom}
                </Typography>
              </Grid>
              <Grid item>
                <Fab size="small" color="primary" disabled={bedroom === MIN_BEDROOMS} aria-label="remove" name="remove" onClick={() => setBedroom(bedroom - 1)}>
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
