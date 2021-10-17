import * as React from 'react';
// import { useSelector } from 'react-redux';

import Divider from '@mui/material/Divider';
import TypographyMui from '../../ui-components/typography-mui/TypographyMui';
import useStyles from '../../../style/mapStyle';

import Tabs from '../tabs/Tabs';
import Table from '../card/Card';
import { TEXT } from '../../../constants/map_page';
import MapAPI from '../../../api/Map/MapAPI';
// import { getData } from '../../../store/slice/thunk';
// import { mapPageActions } from '../../../store/slice/mapPageSlice';

const Content = () => {
  const classes = useStyles();
  const [apart, setApart] = React.useState([]);

  // const dispatch = useDispatch();
  // const allData = React.useCallback(() => {
  //   dispatch(getData(mapPageActions.getAllData));
  // }, [dispatch]);

  React.useEffect(() => {
    MapAPI
      .getAllData()
      .then(({ data }) => setApart(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={classes.mapContentWrapper}>
      <div className={classes.mapContent}>
        <TypographyMui variant="h4" text={TEXT.TITLE} />
        <Tabs />
        <TypographyMui variant="subtitle1" text={TEXT.SUBTITLE} />
      </div>
      <Divider />
      <Table apart={apart} />
    </div>
  );
};

export default Content;
