import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import FormControl from '@mui/material/FormControl';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import RoomIcon from '@mui/icons-material/Room';
import SearchIcon from '@mui/icons-material/Search';
import ButtonMui from '../../../ui-components/button-mui/ButtonMui';
import TextFieldMui from '../../../ui-components/text-field-mui/TextFieldMui';
import TEXT from '../../../../constants/mainScreen';
import searchByLocation from '../../../../api/main-search/main-searchAPI';
import searchByBedroom from '../../../../api/search-bedroom/search-bedroomAPI';
import useStyles from './MainSearch.style';

const MainSearch = () => {
  const [personName, setPersonName] = React.useState([]);
  const [bedroomData, setBedroomData] = React.useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const dateNow = new Date();
  const dateNowPlusOneDay = new Date();
  dateNowPlusOneDay.setDate(dateNow.getDate() + 1);
  dateNowPlusOneDay.toLocaleDateString();
  const classes = useStyles();
  const [location, setLocation] = useState('');
  const [startDateValue, setStartDateValue] = useState(dateNow);
  const [endDateValue, setEndDateValue] = useState(dateNowPlusOneDay);

  useEffect(async () => {
    const { data } = await searchByBedroom.bedroom();
    setBedroomData(data.bedroom);
  }, []);

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
        <div>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="input-search-bedrooms">Label placement</InputLabel>
            <Select
              labelId="multiple-search-bedrooms"
              id="search-bedrooms"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput label="Name" />}
              MenuProps={{
                classes: {
                  paper: classes.PaperProps,
                },
              }}
            >
              {bedroomData && bedroomData.map((name) => (
                <MenuItem
                  key={name.value}
                  value={name.value}
                >
                  {name.type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
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
