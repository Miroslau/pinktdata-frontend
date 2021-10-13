import * as React from 'react';

import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import useStyles from '../../../style/mapStyle';

import Tabs from '../tabs/Tabs';
import Table from '../table/Table';
import { TEXT } from '../../../constants/map_page';

const Content = () => {
  const classes = useStyles();
  return (
    <div className={classes.mapContentWrapper}>
      <div className={classes.mapContent}>
        <Typography variant="h4">{TEXT.TITLE}</Typography>
        <Tabs />
        <Typography variant="subtitle1">{TEXT.SUBTITLE}</Typography>
      </div>
      <Divider />
      <Table />
    </div>
  );
};

export default Content;
