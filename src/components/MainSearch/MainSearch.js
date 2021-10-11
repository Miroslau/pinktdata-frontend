import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import FormControl from '@mui/material/FormControl';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import './MainSearch.scss';

const MainSearch = () => {
  const [location, setLocation] = useState('');
  const [startDateValue, setStartDateValue] = useState(new Date('2021-10-10T11:11:11'));
  const [endDateValue, setEndDateValue] = useState(new Date('2021-12-10T11:11:11'));

  const [bedroomValue, setBedroomValue] = useState('');

  const handleBedroomValue = (event) => {
    setBedroomValue(event.target.value);
  };

  return (
    <form
      className="searchForm"
      sx={{
        width: '65%',
        display: 'flex',
        padding: '2rem',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        boxShadow: '1px 1px 25px 13px rgba(34, 60, 80, 0.14)',
        borderRadius: '1rem',
        margin: '0 auto',
      }}
    >
      <TextField
        sx={{
          '& .MuiInput-root': {
            '& MuiInput-root input:before': {
              border: 'none',
            },
          },
        }}
        label="Location"
        variant="standard"
        placeholder="Enter location"
        value={location}
        onChange={(event) => {
          setLocation(event.target.value);
        }}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Start Date"
          value={startDateValue}
          onChange={setStartDateValue}
          renderInput={(params) => <TextField {...params} />}
        />

        <DatePicker
          label="End Date"
          value={endDateValue}
          onChange={setEndDateValue}
          min={startDateValue}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <FormControl sx={{ width: 250 }}>
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

      <Button variant="contained" color="secondary" type="submit">Search</Button>

    </form>
  );
};

export default MainSearch;
