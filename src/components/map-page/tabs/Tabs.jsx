import React from 'react';

import Stack from '@mui/material/Stack';
import FilterListIcon from '@mui/icons-material/FilterList';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import useStyles from '../../../style/style';
import ApartmentFilters from './apartment-filters/ApartmentFilters';
import ModalWindowMui from '../../ui-components/modal-window-mui/ModalWindowMui';

import { TABS } from '../../../constants/map_page';

const TITLE_FILTERS = TABS.find((item) => item === 'More filters');

const Tabs = ({ isActiveModal, setModalActive }) => {
  const classes = useStyles();

  const handleClick = () => {
    setModalActive(true);
  };

  const closeModal = () => {
    setModalActive(false);
  };

  const filterData = (data) => {
    console.log('data: ', data);
  };

  const handlerBtn = () => {};

  return (
    <div className={classes.mapTabs}>
      <Stack direction="row" spacing={1}>

        <Button data-testid="all" variant="contained" onClick={handlerBtn}>{TABS[0]}</Button>
        <Button data-testid="available" variant="outlined" title={TABS[1]} onClick={handlerBtn}>{TABS[1]}</Button>
        <Button data-testid="star" variant="contained">{TABS[2]}</Button>
        <Button data-testid="price" variant="outlined" onClick={handlerBtn}>{TABS[3]}</Button>
        <Button data-testid="rated" variant="outlined" onClick={handlerBtn}>{TABS[4]}</Button>

        <Divider className={classes.divider} />

        <Button
          id="filters"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={isActiveModal ? 'true' : undefined}
          onClick={handleClick}
          variant="contained"
        >
          <FilterListIcon />
          {TABS[5]}
        </Button>
        <ModalWindowMui
          clickButton={closeModal}
          title={TITLE_FILTERS}
          isActiveModal={isActiveModal}
          sx={classes.filter}
        >
          <ApartmentFilters myFilter={filterData} />
        </ModalWindowMui>
      </Stack>

    </div>
  );
};

Tabs.defaultProps = {
  isActiveModal: false,
  setModalActive: null,
};

Tabs.propTypes = {
  isActiveModal: PropTypes.bool,
  setModalActive: PropTypes.func,
};

export default Tabs;
