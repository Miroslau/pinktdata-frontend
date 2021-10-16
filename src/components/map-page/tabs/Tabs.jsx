import * as React from 'react';

import Stack from '@mui/material/Stack';
import FilterListIcon from '@mui/icons-material/FilterList';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';
import ButtonMui from '../../ui-components/button-mui/ButtonMui';
import useStyles from '../../../style/mapStyle';

import { TABS } from '../../../constants/map_page';

const Tabs = () => {
  const classes = useStyles();
  return (
    <div className={classes.mapTabs}>
      <Stack direction="row" spacing={1}>
        <ButtonMui title={TABS[0]} />
        <ButtonMui variant="outlined" title={TABS[1]} />
        <ButtonMui title={TABS[2]} />
        <ButtonMui variant="outlined" title={TABS[3]} />
        <ButtonMui variant="outlined" title={TABS[4]} />
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
