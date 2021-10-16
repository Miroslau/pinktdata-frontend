import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Divider from '@mui/material/Divider';
import TypographyMui from '../../ui-components/typography-mui/TypographyMui';
import useStyles from '../../../style/mapStyle';

import Tabs from '../tabs/Tabs';
import Table from '../table/Table';
import { TEXT } from '../../../constants/map_page';
import { getData } from '../../../store/slice/thunk';
import { mapPageActions } from '../../../store/slice/mapPageSlice';

const Content = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const allData = React.useCallback(() => {
    dispatch(getData(mapPageActions.getAllData));
  }, [dispatch]);
  React.useEffect(() => allData(), [allData, dispatch]);
  const rooms = useSelector((state) => state.mapPage.rooms);

  return (
    <div className={classes.mapContentWrapper}>
      <div className={classes.mapContent}>
        <TypographyMui variant="h4" text={TEXT.TITLE} />
        <Tabs />
        <TypographyMui variant="subtitle1" text={TEXT.SUBTITLE} />
      </div>
      <Divider />
      {rooms.map((data) => (
        <Table
          key={data.id}
          id={data.id}
          avgRating={data.avgRating}
        />
      ))}
    </div>
  );
};

export default Content;
