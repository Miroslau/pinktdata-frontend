import { useEffect, useState } from 'react';
import { Checkbox } from '@mui/material';
import {
  MapContainer, TileLayer, useMap, useMapEvents,
} from 'react-leaflet';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import useStyles from '../../../style/style';
import { mapRenderLocalization } from '../../../constants/Localizations/mapRenderLocalization';
import Markers from './Markers';

const HandlerEventsMap = function ({ getLocation }) {
  // eslint-disable-next-line no-unused-vars
  const map = useMapEvents({
    dragend: (e) => getLocation(e),
    zoomend: (e) => getLocation(e),
  });

  return null;
};

const SetViewOnFetch = function ({ coords, isFetchOnMapEvents }) {
  const map = useMap();
  if (!isFetchOnMapEvents) {
    map.setView(coords, map.getZoom());
  }

  return null;
};

const MapRender = function ({
  // eslint-disable-next-line no-unused-vars
  apart,
  isFetching,
  isFetchAll,
  handleDragAndZoomMap,
  isFetchOnMapEvents,
  setIsFetchOnMapEvents,
}) {
  const classes = useStyles();
  const [location, setLocation] = useState([39.94977, -75.28529]);

  useEffect(() => {
    if (apart.length) {
      setLocation([apart[0].location.lat, apart[0].location.lon]);
    }
  }, [apart]);

  const getLocation = (mapEvent) => {
    const cords = mapEvent.target.getBounds();
    cords.zoom = mapEvent.target.getZoom();
    cords.size = {
      x: 800,
      y: 800,
    };
    handleDragAndZoomMap(cords);
  };

    return null;
  };

  return (
    <div className={classes.map}>
      <Box className={classes.mapLoader}>
        {isFetching ? <LinearProgress className={classes.linear} /> : <></>}
      </Box>
      <MapContainer
        className={classes.lContainer}
        center={location}
        zoom={11}
        scrollWheelZoom
        on
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Markers apart={apart} isFetchAll={isFetchAll} />
        <SetViewOnFetch
          coords={location}
          isFetchOnMapEvents={isFetchOnMapEvents}
        />
        <HandlerEventsMap getLocation={getLocation} />
      </MapContainer>
    </div>
  );
};

MapRender.propTypes = {
  apart: PropTypes.instanceOf(Array).isRequired,
  isFetching: PropTypes.bool.isRequired,
  isFetchAll: PropTypes.bool.isRequired,
  handleDragAndZoomMap: PropTypes.func.isRequired,
  isFetchOnMapEvents: PropTypes.bool.isRequired,
  setIsFetchOnMapEvents: PropTypes.func.isRequired,
};

export default MapRender;
