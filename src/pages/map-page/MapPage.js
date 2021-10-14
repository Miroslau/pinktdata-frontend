import * as React from 'react';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FilterListIcon from '@mui/icons-material/FilterList';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import useStyles from '../../style/style';

const Map = () => {
  const classes = useStyles();
  const [alignment, setAlignment] = React.useState('all');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <section className={classes.wrapper}>
      <div className={classes.mapContentWrapper}>
        <div className={classes.mapContent} />
        <div className={classes.mapContent}>
          <Typography variant="h3">Places to buy near you</Typography>
          <div className={classes.mapTabs}>
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              className={classes.contentButton}
            >
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="available">Available</ToggleButton>
              <ToggleButton value="star">3 Star</ToggleButton>
              <ToggleButton value="price">Price</ToggleButton>
              <ToggleButton value="rated">Top Rated</ToggleButton>
              <Divider className={classes.divider} />
              <ToggleButton value="filter">
                <FilterListIcon />
                Filters
              </ToggleButton>
            </ToggleButtonGroup>
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
                <div>heartImg</div>
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