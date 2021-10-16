import * as React from 'react';

import Divider from '@mui/material/Divider';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TypographyMui from '../../ui-components/typography-mui/TypographyMui';
import useStyles from '../../../style/mapStyle';

import { DATA } from '../../../constants/map_page';

// import { mapPageActions } from '../../../store/slice/mapPageSlice';

const Table = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.mapContent}>
        <div className={classes.content}>
          <div className={classes.contentImg}>ujli</div>
          <div className={classes.contentData}>
            <div className={classes.dataLeft}>
              <div className={classes.dataText}>
                <TypographyMui text="{text}" />
                <TypographyMui variant="subtitle2" text="{text}" />
                <TypographyMui color="green" text="{text}" />
                <TypographyMui text="text}" />
              </div>
              <div>{DATA[5]}</div>
            </div>
            <div className={classes.dataRight}>
              <div><FavoriteBorderIcon htmlColor="pink" /></div>
              <div>{DATA[6]}</div>
            </div>
          </div>
        </div>
      </div>
      <Divider />
    </>
  );
};

export default Table;
