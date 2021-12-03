import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import FormControl from '@mui/material/FormControl';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import InputLabel from '@mui/material/InputLabel';
import RoomIcon from '@mui/icons-material/Room';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import Popover from '@mui/material/Popover';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';
import {
  setPublicAddress,
  setParams,
  setDate,
  setDateParams,
} from '../../../../store/slice/apartmentSlice';
import { doWithUserDelay } from '../../../../utils/doWithUserDelay';
import { MAP_ROUTE } from '../../../../constants/routes';
import LocationAPI from '../../../../api/main-search/LocationAPI';
import useStyles from './MainSearch.style';
import TEXT from '../../../../constants/mainScreen';
import ButtonMui from '../../../ui-components/button-mui/ButtonMui';

const MAX_BEDROOM = 8;
const MIN_BEDROOMS = 0;

const MainSearch = function () {
  const dispatch = useDispatch();
  const history = useNavigate();
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

  const MIN_DATE = new Date();

  const classes = useStyles();
  const isMounted = useRef(null);
  const [searchLocation, setSearchLocation] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const [dataLocation, setDataLocation] = useState([]);
  const [startDateValue, setStartDateValue] = useState(new Date());
  // eslint-disable-next-line max-len
  const [endDateValue, setEndDateValue] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
  const [isError, setIsError] = useState({
    locationError: false,
    dateError: false,
  });
  let userDelay;

  const defaultProps = {
    options: dataLocation,
  };

  const inputProps = {
    readOnly: true,
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

  const fillDataLocations = async (value) => {
    if (value) {
      try {
        const response = await LocationAPI.search(value);
        if (isMounted.current) {
          setDataLocation(response);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setDataLocation([]);
    }
  };

  const inputHandler = (e) => {
    const { value } = e.target;
    setIsSelected(false);
    setSearchLocation(value);
    userDelay = doWithUserDelay(() => fillDataLocations(value), userDelay);
  };

  const changeOptionHandler = (e, newValue) => {
    // eslint-disable-next-line no-unused-expressions
    startDateValue.getTime() > endDateValue.getTime() ? setIsSelected(false)
      : setIsSelected(true);
    setSearchLocation(newValue);
  };

  const handleFocus = () => {
    setIsError({ ...isError, locationError: false });
    fillDataLocations(searchLocation);
  };

  const handleBlur = () => {
    if (!searchLocation) setIsError({ ...isError, locationError: true });
    if (!isSelected) {
      if (dataLocation.length) {
        setSearchLocation(dataLocation[0]);
        // eslint-disable-next-line no-unused-expressions
        startDateValue.getTime() > endDateValue.getTime() ? setIsSelected(false)
          : setIsSelected(true);
      }
    }
    setDataLocation([]);
  };

  const clickSearchHandler = () => {
    dispatch(setPublicAddress({ publicAddress: searchLocation }));
    dispatch(setParams({ bedrooms: bedroom }));
    history(MAP_ROUTE);
  };

  const setStartDate = (newDate) => {
    setStartDateValue(newDate);
    if (newDate.getTime() > endDateValue.getTime()) {
      setIsSelected(false);
      setIsError({ ...isError, dateError: true });
      return;
    }
    if (searchLocation) setIsSelected(true);
    setIsError({ ...isError, dateError: false });
    dispatch(setDate({ startDate: newDate, endDate: endDateValue }));
    dispatch(setDateParams({ startDate: newDate, endDate: endDateValue }));
  };

  const setEndDate = (newDate) => {
    setEndDateValue(newDate);
    if (startDateValue.getTime() > newDate.getTime()) {
      setIsSelected(false);
      setIsError({ ...isError, dateError: true });
      return;
    }
    if (searchLocation) setIsSelected(true);
    setIsError({ ...isError, dateError: false });
    dispatch(setDate({ startDate: startDateValue, endDate: newDate }));
    dispatch(setDateParams({ startDate: startDateValue, endDate: newDate }));
  };

  return (
    <form className={classes.form}>
      <div className={classes.locationWrapper}>
        <RoomIcon className={classes.roomIcon} />
        <Autocomplete
          data-testid="autocomplete"
          isOptionEqualToValue={(option, value) => option.id === value.id}
          style={{ width: '300px' }}
          {...defaultProps}
          id="disable-close-on-select"
          disableClearable
          onChange={changeOptionHandler}
          onBlur={handleBlur}
          onFocus={handleFocus}
          value={searchLocation}
          renderInput={(params) => (
            <TextField
              data-testid="Location"
              placeholder="Location"
              {...params}
              onChange={inputHandler}
              value={searchLocation}
              label={TEXT.MAIN_SEARCH.LOCATION}
              variant="standard"
              error={isError.locationError}
              helperText={isError.locationError && TEXT.MAIN_SEARCH.ERROR_LOCATION}
            />
          )}
        />
      </div>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label={TEXT.MAIN_SEARCH.START_DATE}
          minDate={MIN_DATE}
          value={startDateValue}
          onChange={setStartDate}
          inputProps={inputProps}
          renderInput={(params) => (
            <TextField
              {...params}
              className={classes.date}
              error={isError.dateError}
              helperText={isError.dateError && TEXT.MAIN_SEARCH.ERROR_DATE}
            />
          )}
        />

        <DatePicker
          label={TEXT.MAIN_SEARCH.END_DATE}
          value={endDateValue}
          minDate={MIN_DATE}
          onChange={setEndDate}
          inputProps={inputProps}
          renderInput={(params) => (
            <TextField
              {...params}
              className={classes.date}
            />
          )}
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
                <Fab size="small" color="primary" disabled={bedroom === MAX_BEDROOM} aria-label="add" name="add" onClick={() => setBedroom(bedroom + 1)}>
                  <AddIcon />
                </Fab>
              </Grid>
              <Grid item>
                <Typography>
                  {bedroom}
                </Typography>
              </Grid>
              <Grid item>
                <Fab
                  size="small"
                  color="primary"
                  disabled={bedroom === MIN_BEDROOMS}
                  aria-label="remove"
                  name="remove"
                  onClick={() => setBedroom(bedroom - 1)}
                >
                  <RemoveSharpIcon />
                </Fab>
              </Grid>
            </Grid>
          </Popover>

        </FormControl>

      </FormControl>

      <ButtonMui
        data-testid="search-button"
        disabled={!isSelected}
        ariaLabel="search-button"
        variant="contained"
        color="secondary"
        className={`${classes.searchButton} ${!isSelected && classes.searchButtonDisabled}`}
        clickButton={clickSearchHandler}
      >
        <SearchIcon color="action" fontSize="large" />
      </ButtonMui>

    </form>
  );
};

export default MainSearch;
