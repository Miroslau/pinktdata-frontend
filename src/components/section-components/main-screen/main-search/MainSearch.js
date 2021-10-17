import React, { useCallback, useState } from 'react';
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
import debounce from 'lodash.debounce';
import ButtonMui from '../../../ui-components/button-mui/ButtonMui';
// import TextFieldMui from '../../../ui-components/text-field-mui/TextFieldMui';
import TEXT from '../../../../constants/mainScreen';
// import searchByLocation from '../../../../api/main-search/main-searchAPI';
import useStyles from './MainSearch.style';

const city = ['minsk', 'gomel'];

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
  const dateNow = new Date();
  const dateNowPlusOneDay = new Date();
  dateNowPlusOneDay.setDate(dateNow.getDate() + 1);
  dateNowPlusOneDay.toLocaleDateString();

  const classes = useStyles();

  const defaultProps = {
    options: city,
    // getOptionLabel: (option) => option.city,
  };

  const [location, setLocation] = useState('');
  const [startDateValue, setStartDateValue] = useState(dateNow);
  const [endDateValue, setEndDateValue] = useState(dateNowPlusOneDay);

  const [bedroomValue, setBedroomValue] = useState('');

  const handleBedroomValue = (event) => {
    setBedroomValue(event.target.value);
  };

  const getCities = (e) => {
    setLocation(e.target.value);
    // searchByLocation.location();
    console.log(e.target.value);
    // axios.get(url, {
    //   params: {
    //     location: sdfsg
    //   }
    // })
  };
  const debouncedChangeHandler = useCallback(
    debounce(getCities, 500),
    [],
  );

  return (
    <form className={classes.form}>
      <div className={classes.locationWrapper}>
        <RoomIcon className={classes.roomIcon} />
        <Autocomplete
          style={{ width: '300px' }}
          {...defaultProps}
          id="disable-close-on-select"
          disableCloseOnSelect
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={debouncedChangeHandler}
              value={location}
              label={TEXT.MAIN_SEARCH.LOCATION}
              variant="standard"
            />
          )}
        />
        {/* <TextFieldMui
          className={classes.location}
          label={TEXT.MAIN_SEARCH.LOCATION}
          variant="standard"
          placeholder={TEXT.MAIN_SEARCH.ENTER_LOCATION}
          value={location}
          onChange={getCities}
        /> */}
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
        <InputLabel id="bedroomValue">{TEXT.MAIN_SEARCH.BEDROOM_TYPE}</InputLabel>
        <Select
          labelId="bedroomValue"
          value={bedroomValue}
          label={TEXT.MAIN_SEARCH.BEDROOM_TYPE}
          onChange={handleBedroomValue}
        >

          {bedroomItems.map(({ id, value, title }) => (
            <MenuItem
              key={id}
              value={value}
            >
              {title}
            </MenuItem>
          ))}
        </Select>
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
