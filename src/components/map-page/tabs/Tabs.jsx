import * as React from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FilterListIcon from '@mui/icons-material/FilterList';
import Divider from '@mui/material/Divider';
import useStyles from '../../../style/mapStyle';

import { TABS } from '../../../constants/map_page';

const Tabs = () => {
  const classes = useStyles();
  return (
    <div className={classes.mapTabs}>
      <Stack direction="row" spacing={1}>
        <Button variant="contained">{TABS[0]}</Button>
        <Button variant="outlined">{TABS[1]}</Button>
        <Button variant="contained">{TABS[2]}</Button>
        <Button variant="outlined">{TABS[3]}</Button>
        <Button variant="outlined">{TABS[4]}</Button>
        <Divider className={classes.divider} />
        <Button variant="contained">
          <FilterListIcon />
          {TABS[5]}
        </Button>
      </Stack>
    </div>
  );
};

export default Tabs;
