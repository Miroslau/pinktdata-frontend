import * as React from 'react';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FilterListIcon from '@mui/icons-material/FilterList';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import useStyles from '../../style/mapStyle';

const Map = () => {
  const classes = useStyles();

  return (
    <section className={classes.wrapper}>
      <div className={classes.mapContentWrapper}>
        <div className={classes.mapContent}>
          <Typography variant="h4">Places to buy near you</Typography>
          <div className={classes.mapTabs}>
            <Stack direction="row" spacing={1}>
              <Button variant="contained">All</Button>
              <Button variant="outlined">Available</Button>
              <Button variant="contained">3 Star</Button>
              <Button variant="outlined">Price</Button>
              <Button variant="outlined">Top Rated</Button>
              <Divider className={classes.divider} />
              <Button variant="contained">
                <FilterListIcon />
                Filters
              </Button>
            </Stack>
          </div>
          <Typography variant="subtitle1">Explore all 300+ stays</Typography>
        </div>
        <Divider />
        <div className={classes.mapContent}>
          <div className={classes.content}>
            <div className={classes.contentImg}>img</div>
            <div className={classes.contentData}>
              <div className={classes.dataLeft}>
                <div className={classes.dataText}>
                  <Typography variant="body2">
                    PATH trains and lower Manhattan
                  </Typography>
                  <Typography variant="subtitle2">
                    DoubleTree by Hilton Hotel
                  </Typography>
                  <Typography variant="body2" color="green">
                    Available
                  </Typography>
                  <Typography variant="body2">Air Conditioned</Typography>
                </div>
                <div>rating</div>
              </div>
              <div className={classes.dataRight}>
                <div><FavoriteBorderIcon htmlColor="pink" /></div>
                <div>price</div>
              </div>
            </div>
          </div>
        </div>
        <Divider />
      </div>
      <div className={classes.map}>
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup.
              {' '}
              <br />
              {' '}
              Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </section>
  );
};

export default Map;
