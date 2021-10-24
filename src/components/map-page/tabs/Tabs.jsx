import React from 'react';

import Stack from '@mui/material/Stack';
import FilterListIcon from '@mui/icons-material/FilterList';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import ButtonMui from '../../ui-components/button-mui/ButtonMui';
import useStyles from '../../../style/mapStyle';

import { TABS } from '../../../constants/map_page';

const Tabs = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlerBtn = () => console.log('click');

  return (
    <div className={classes.mapTabs}>
      <Stack direction="row" spacing={1}>

        <Button id="all" variant="contained" onClick={handlerBtn}>{TABS[0]}</Button>
        <Button id="available" variant="outlined" title={TABS[1]} onClick={handlerBtn}>{TABS[1]}</Button>
        <Button id="star" variant="contained">{TABS[2]}</Button>
        <Button id="price" variant="outlined" onClick={handlerBtn}>{TABS[3]}</Button>
        <Button id="rated" variant="outlined" onClick={handlerBtn}>{TABS[4]}</Button>

        <Divider className={classes.divider} />

        <Button
          id="filters"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          variant="contained"
        >
          <FilterListIcon />
          {TABS[5]}
        </Button>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClick={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>{TABS[6]}</MenuItem>
          <MenuItem onClick={handleClose}>{TABS[7]}</MenuItem>
        </Menu>

      </Stack>

    </div>
  );
};

export default Tabs;
