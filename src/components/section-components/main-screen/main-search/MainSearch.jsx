import React, { useState } from 'react';
import { TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import FormControl from '@mui/material/FormControl';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import InputLabel from '@mui/material/InputLabel';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import RoomIcon from '@mui/icons-material/Room';
import SearchIcon from '@mui/icons-material/Search';
import ButtonMui from '../../../ui-components/button-mui/ButtonMui';
import TextFieldMui from '../../../ui-components/text-field-mui/TextFieldMui';
import TEXT from '../../../../constants/mainScreen';
import searchByLocation from '../../../../api/main-search/main-searchAPI';

import useStyles from './MainSearch.style';

const MainSearch = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  // const [personName, setPersonName] = React.useState([]);
  // const [bedroomData, setBedroomData] = React.useState([]);
  // const handleBedroomChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setPersonName(
  //     typeof value === 'string' ? value.split(',') : value,
  //   );
  // };

  const dateNow = new Date();
  const dateNowPlusOneDay = new Date();
  dateNowPlusOneDay.setDate(dateNow.getDate() + 1);
  dateNowPlusOneDay.toLocaleDateString();
  const classes = useStyles();
  const [location, setLocation] = useState('');
  const [startDateValue, setStartDateValue] = useState(dateNow);
  const [endDateValue, setEndDateValue] = useState(dateNowPlusOneDay);

  // useEffect(async () => {
  //   let cleanupFunction = false;
  //
  //   const getArrBedroom = async () => {
  //     try {
  //       const { data } = await searchByBedroom.bedroom();
  //       if (!cleanupFunction) {
  //         setBedroomData(data.bedroom);
  //       }
  //     } catch (err) {
  //       console.error(err.message);
  //     }
  //   };
  //   getArrBedroom();
  //   // eslint-disable-next-line no-return-assign
  //   return () => cleanupFunction = true;
  // }, []);

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
            <InputLabel aria-describedby={id} variant="contained" onClick={handleClick} id="input-search-bedrooms">{TEXT.MAIN_SEARCH.LABEL_PLACEMENT}</InputLabel>
            <div>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
              </Popover>
            </div>
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
