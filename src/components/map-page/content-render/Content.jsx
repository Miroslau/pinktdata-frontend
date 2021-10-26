import { useEffect, useState } from 'react';

import Divider from '@mui/material/Divider';
import TypographyMui from '../../ui-components/typography-mui/TypographyMui';
import useStyles from '../../../style/style';

import Tabs from '../tabs/Tabs';
import Card from '../card/Card';
import { TEXT } from '../../../constants/map_page';
import MapAPI from '../../../api/map/mapPageAPI';

const Content = () => {
  const classes = useStyles();

  const [apart, setApart] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    MapAPI.searchApartments('Los Angeles', currentPage)
      .then((response) => {
        setApart(response.data);
        setCurrentPage((prevState) => prevState + 1);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className={classes.mapContentWrapper}>
      <div className={classes.mapContent}>
        <TypographyMui
          variant="h4"
          text={`${TEXT.TITLE} ${'Philadelphia, PA, United States'}`}
          className={classes.title}
        />
        <Tabs />
        <TypographyMui variant="h6" text={TEXT.SUBTITLE} />
      </div>
      <Divider />
      <div className={classes.mapWrapper}>
        {apart.map((data) => (
          <Card
            key={data._id}
            id={data._id}
            name={data.name}
            img={data.img}
            rating={data.rating}
            reviews={data.reviews}
            city={data.city}
            address={data.address}
            price={data.price}
            homeDetails={data.guestLabel}
          />
        ))}
      </div>
    </div>
  );
};

export default Content;
