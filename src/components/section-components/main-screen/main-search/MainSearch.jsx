import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import FormControl from '@mui/material/FormControl';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import RoomIcon from '@mui/icons-material/Room';
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from 'react-router-dom';
import {
  setPublicAddress,
  setParams,
} from '../../../../store/slice/apartmentSlice';
import ButtonMui from '../../../ui-components/button-mui/ButtonMui';
import TEXT from '../../../../constants/mainScreen';
import useStyles from './MainSearch.style';
import LocationAPI from '../../../../api/main-search/LocationAPI';
import { doWithUserDelay } from '../../../../utils/doWithUserDelay';
import { MAP_ROUTE } from '../../../../constants/routes';

const bedroomItems = [
  {
    id: 1,
    value: 1,
    title: 'One',
  },
  {
    id: 2,
    value: 2,
    title: 'Two',
  },
  {
    id: 3,
    value: 3,
    title: 'Three',
  },
];

const MainSearch = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const dateNow = new Date();
  const dateNowPlusOneDay = new Date();
  dateNowPlusOneDay.setDate(dateNow.getDate() + 1);
  dateNowPlusOneDay.toLocaleDateString();

  const classes = useStyles();
  const isMounted = useRef(null);
  const [searchLocation, setSearchLocation] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const [dataLocation, setDataLocation] = useState([]);
  const [startDateValue, setStartDateValue] = useState(dateNow);
  const [endDateValue, setEndDateValue] = useState(dateNowPlusOneDay);
  const [bedroomValue, setBedroomValue] = useState('');
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

  const handleBedroomValue = (event) => {
    setBedroomValue(event.target.value);
  };

  const inputHandler = (e) => {
    const { value } = e.target;
    setIsSelected(false);
    setSearchLocation(value);
    userDelay = doWithUserDelay(() => fillDataLocations(value), userDelay);
  };

  const changeOptionHandler = (e, newValue) => {
    setIsSelected(true);
    setSearchLocation(newValue);
  };

  const handleFocus = () => {
    setIsError(false);
    fillDataLocations(searchLocation);
  };

  const handleBlur = () => {
    if (!searchLocation) setIsError(true);
    if (!isSelected) {
      if (dataLocation.length) {
        setSearchLocation(dataLocation[0]);
        setIsSelected(true);
      }
    }
    setDataLocation([]);
  };

  const clickSearchHandler = () => {
    dispatch(setPublicAddress({ publicAddress: searchLocation }));
    dispatch(setParams({ bedrooms: bedroomValue }));
    history.push(MAP_ROUTE);
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
          renderInput={(params) => (
            <TextField {...params} className={classes.date} />
          )}
        />

        <DatePicker
          label={TEXT.MAIN_SEARCH.END_DATE}
          value={endDateValue}
          onChange={setEndDateValue}
          min={startDateValue}
          renderInput={(params) => (
            <TextField {...params} className={classes.date} />
          )}
        />
      </LocalizationProvider>

      <FormControl className={classes.bedroom}>
        <InputLabel id="bedroomValue">
          {TEXT.MAIN_SEARCH.BEDROOM_TYPE}
        </InputLabel>
        <Select
          labelId="bedroomValue"
          value={bedroomValue}
          label={TEXT.MAIN_SEARCH.BEDROOM_TYPE}
          onChange={handleBedroomValue}
        >
          {bedroomItems.map(({ id, value, title }) => (
            <MenuItem key={id} value={value}>
              {title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <ButtonMui
        data-testid="search-button"
        disabled={!isSelected}
        ariaLabel="search-button"
        variant="contained"
        color="secondary"
        className={classes.searchButton}
        clickButton={clickSearchHandler}
      >
        <SearchIcon fontSize="large" />
      </ButtonMui>
    </form>
  );
};

export default MainSearch;
