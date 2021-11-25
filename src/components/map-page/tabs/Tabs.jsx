import React from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import FilterListIcon from '@mui/icons-material/FilterList';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';
import ModalWindowMui from '../../ui-components/modal-window-mui/ModalWindowMui';
import useStyles from '../../../style/style';

import ApartmentFilters from './apartment-filters/ApartmentFilters';
import { TABS } from '../../../constants/map_page';

const Tabs = function ({ isActiveModal, setModalActive, apartmentFilter }) {
  const classes = useStyles();

  const handleClick = () => {
    setModalActive(true);
  };

  const closeModal = () => {
    setModalActive(false);
  };

  const handlerBtn = () => {};

  return (
    <div className={classes.mapTabs}>
      <Stack direction="row" spacing={1}>
        <Button id="all" variant="contained" onClick={handlerBtn}>{TABS.ALL}</Button>
        <Button id="available" variant="outlined" title={TABS.AVAILABLE} onClick={handlerBtn}>{TABS.AVAILABLE}</Button>
        <Button id="star" variant="contained">{TABS.STAR}</Button>
        <Button id="price" variant="outlined" onClick={handlerBtn}>{TABS.PRICE}</Button>
        <Button id="rated" variant="outlined" onClick={handlerBtn}>{TABS.TOP_RATED}</Button>

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
          {TABS.FILTERS}
        </Button>
        <ModalWindowMui
          clickButton={closeModal}
          title={TABS.MORE_FILTERS}
          isActiveModal={isActiveModal}
          sx={classes.filter}
        >
          <ApartmentFilters apartmentFilter={apartmentFilter} />
        </ModalWindowMui>
      </Stack>
    </div>
  );
};

Tabs.defaultProps = {
  isActiveModal: false,
  setModalActive: null,
  apartmentFilter: null,
};

Tabs.propTypes = {
  isActiveModal: PropTypes.bool,
  setModalActive: PropTypes.func,
  apartmentFilter: PropTypes.func,
};

export default Tabs;
