import React, { useState } from 'react';
import { TextField } from '@mui/material';
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
import ButtonMui from '../../../ui-components/button-mui/ButtonMui';
import TextFieldMui from '../../../ui-components/text-field-mui/TextFieldMui';
import { text } from '../../../../constants/mainScreen';

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
        <TextFieldMui
          className={classes.location}
          label={text.mainSearch.location}
          variant="standard"
          placeholder={text.mainSearch.enterLocation}
          value={location}
          onChange={(event) => {
            setLocation(event.target.value);
          }}
        />
      </div>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label={text.mainSearch.startDate}
          value={startDateValue}
          onChange={setStartDateValue}
          renderInput={(params) => <TextField {...params} className={classes.date} />}
        />

        <DatePicker
          label={text.mainSearch.endDate}
          value={endDateValue}
          onChange={setEndDateValue}
          min={startDateValue}
          renderInput={(params) => <TextField {...params} className={classes.date} />}
        />
      </LocalizationProvider>

      <FormControl className={classes.bedroom}>
        <InputLabel id="bedroomValue">{text.mainSearch.bedroomType}</InputLabel>
        <Select
          labelId="bedroomValue"
          value={bedroomValue}
          label={text.mainSearch.bedroomType}
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

      <ButtonMui variant="contained" color="secondary" type="submit" className={classes.searchButton}>
        <SearchIcon fontSize="large" />
      </ButtonMui>

    </form>
  );
};

export default MainSearch;
