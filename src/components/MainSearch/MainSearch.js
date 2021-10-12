import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import FormControl from '@mui/material/FormControl';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import RoomIcon from '@mui/icons-material/Room';
import SearchIcon from '@mui/icons-material/Search';
import useStyles from './MainSearch.style';

const MainSearch = () => {
  const classes = useStyles();
  const [location, setLocation] = useState('');
  const [startDateValue, setStartDateValue] = useState(new Date('2021-10-10T11:11:11'));
  const [endDateValue, setEndDateValue] = useState(new Date('2021-12-10T11:11:11'));

  const [bedroomValue, setBedroomValue] = useState('');

  const handleBedroomValue = (event) => {
    setBedroomValue(event.target.value);
  };

  return (
    <form className={classes.form}>
      <div className={classes.locationWrapper}>
        <RoomIcon className={classes.roomIcon} />
        <TextField
          className={classes.location}
          label="Location"
          variant="standard"
          placeholder="Enter location"
          value={location}
          onChange={(event) => {
            setLocation(event.target.value);
          }}
        />
      </div>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Start Date"
          value={startDateValue}
          onChange={setStartDateValue}
          renderInput={(params) => <TextField {...params} className={classes.date} />}
        />

        <DatePicker
          label="End Date"
          value={endDateValue}
          onChange={setEndDateValue}
          min={startDateValue}
          renderInput={(params) => <TextField {...params} className={classes.date} />}
        />
      </LocalizationProvider>

      <FormControl className={classes.bedroom}>
        <InputLabel id="bedroomValue">Bedroom type</InputLabel>
        <Select
          labelId="bedroomValue"
          value={bedroomValue}
          label="Bedroom type"
          onChange={handleBedroomValue}
        >
          <MenuItem value={1}>One</MenuItem>
          <MenuItem value={2}>Two</MenuItem>
          <MenuItem value={3}>Three</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" color="secondary" type="submit" className={classes.searchButton}>
        <SearchIcon fontSize="large" />
      </Button>

    </form>
  );
};

export default MainSearch;
