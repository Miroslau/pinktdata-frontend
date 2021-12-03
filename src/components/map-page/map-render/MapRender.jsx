import React, { useEffect, useState } from 'react';
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

const getCords = (map) => {
  const VIEW_SIZE = 800;
  const cords = map.getBounds();
  cords.zoom = map.getZoom();
  cords.size = {
    x: VIEW_SIZE,
    y: VIEW_SIZE,
  };

  return cords;
};

const HandlerEventsMap = function ({ getLocation }) {
  // eslint-disable-next-line no-unused-vars
  const map = useMapEvents({
    dragend: (e) => getLocation(e),
    zoomend: (e) => getLocation(e),
  });

  return null;
};

const SetViewOnFetch = function ({
  coords,
  isFetchOnMapEvents,
  handleDragAndZoomMap,
}) {
  const map = useMap();
  if (!isFetchOnMapEvents) {
    map.setView(coords, map.getZoom());
  }

  useEffect(() => {
    if (isFetchOnMapEvents) {
      const cords = getCords(map);
      handleDragAndZoomMap(cords);
    }
  }, [isFetchOnMapEvents]);

  return null;
};

const MapRender = function ({
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
    const cords = getCords(mapEvent.target);
    handleDragAndZoomMap(cords);
  };

  const handleChange = (event) => {
    setIsFetchOnMapEvents(event.target.checked);
  };

  return (
    <div className={classes.map}>
      <Box className={classes.mapLoader}>
        {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
        {isFetching ? <LinearProgress className={classes.linear} /> : <></>}
      </Box>
      <div className={classes.fetchBar}>
        <Checkbox
          checked={isFetchOnMapEvents}
          onChange={handleChange}
          className={classes.checkbox}
        />
        <span>{mapRenderLocalization.TITLE_SEARCH}</span>
      </div>
      <MapContainer
        className={classes.lContainer}
        center={location}
        zoom={11}
        scrollWheelZoom
        on
      >
        <HandlerEventsMap getLocation={getLocation} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Markers
          apart={apart}
          isFetchAll={isFetchAll}
          isFetching={isFetching}
          isFetchOnMapEvents={isFetchOnMapEvents}
        />
        <SetViewOnFetch
          coords={location}
          isFetchOnMapEvents={isFetchOnMapEvents}
          handleDragAndZoomMap={handleDragAndZoomMap}
        />
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
