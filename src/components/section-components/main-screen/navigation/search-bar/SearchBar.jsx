import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import RoomIcon from '@mui/icons-material/Room';
import { useHistory } from 'react-router-dom';
import { apartmentSelector } from '../../../../../store/slice/apartmentSlice';
import useStyles from '../../../../../style/style';
import { searchApartments } from '../../../../../store/actions/apartmentAction';
import './SearchBar.scss';
import ButtonMui from '../../../../ui-components/button-mui/ButtonMui';
import { searchLocalizationt } from '../../../../../constants/Localizations/searchLocalizationt';
import handleEnterPress from '../../../../../utils/handleEnterPress';

const SearchBar = () => {
  const dispatch = useDispatch();
  const { publicAddress, searchParams } = useSelector(apartmentSelector);
  const { bedrooms } = searchParams;
  const history = useHistory();

  const classes = useStyles();

  const clickSearchHandler = () => {
    const filtersParams = { bedrooms };
    dispatch(searchApartments({ publicAddress, currentPage: 0, ...filtersParams }));
  };

  return (
    <div className="search-bar">
      <div
        className="search-bar__logo"
        onClick={() => history.push('/')}
        onKeyDown={handleEnterPress(() => history.push('/'))}
        role="button"
        tabIndex="0"
        data-testid="logo"
      >
        <RoomIcon className={classes.logoIcon} />
        <span className="search-bar__text">pinktada</span>
      </div>
      <div className="search-bar-form">
        <div className="search-bar-form__text">
          {publicAddress || searchLocalizationt.EMPTY}
        </div>
        <div className="search-bar-form__text">
          {bedrooms}
          {' '}
          {searchLocalizationt.TITLE_BEDROOMS}
        </div>
        <ButtonMui
          data-testid="search-button"
          ariaLabel="search-button"
          variant="contained"
          color="secondary"
          className="search-bar-form__button"
          clickButton={clickSearchHandler}
        >
          <SearchIcon className={classes.searchSize} />
        </ButtonMui>
      </div>
    </div>
  );
};

export default SearchBar;
