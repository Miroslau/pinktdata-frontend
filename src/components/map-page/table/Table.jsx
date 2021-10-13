import * as React from 'react';

import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import useStyles from '../../../style/mapStyle';

import { DATA } from '../../../constants/map_page';

const Table = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.mapContent}>
        <div className={classes.content}>
          <div className={classes.contentImg}>img</div>
          <div className={classes.contentData}>
            <div className={classes.dataLeft}>
              <div className={classes.dataText}>
                <Typography variant="body2">{DATA[0]}</Typography>
                <Typography variant="subtitle2">{DATA[1]}</Typography>
                <Typography variant="body2" color="green">{DATA[2]}</Typography>
                <Typography variant="body2">{DATA[3]}</Typography>
              </div>
              <div>{DATA[4]}</div>
            </div>
            <div className={classes.dataRight}>
              <div><FavoriteBorderIcon htmlColor="pink" /></div>
              <div>{DATA[5]}</div>
            </div>
          </div>
        </div>
      </div>
      <Divider />
    </>
  );
};

export default Table;
