import { useEffect, useState } from 'react';
import { Checkbox } from '@mui/material';
import L from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Popup,
  Tooltip,
  useMap,
  Marker, useMapEvents,
} from 'react-leaflet';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import PropTypes from 'prop-types';
import pointMarker from '../../../assets/svg/pointMarker.svg';
import useStyles from '../../../style/style';
import MapCard from '../../section-components/map-card/MapCard';
import { mapRenderLocalization } from '../../../constants/Localizations/mapRenderLocalization';

const markerIcon = new L.Icon({
  iconUrl: pointMarker,
  iconSize: new L.Point(32, 32),
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
});

const createClusterCustomIcon = (cluster) => L.divIcon({
  html: `<span>${cluster.getChildCount()}</span>`,
  className: 'marker-cluster-custom',
  iconSize: L.point(40, 40, true),
});

const MapRender = ({
  // eslint-disable-next-line no-unused-vars
  apart, isFetching, handleDragAndZoomMap, isFetchOnMapEvents, setIsFetchOnMapEvents,
}) => {
  const classes = useStyles();
  const [location, setLocation] = useState([39.94977, -75.28529]);

  useEffect(() => {
    if (apart.length) {
      setLocation([apart[0].location.lat, apart[0].location.lon]);
    }
  }, [apart]);

  const getLocation = (mapEvent) => {
    const cords = mapEvent.target.getBounds().pad(-0.1);
    handleDragAndZoomMap(cords);
  };

  const handleChange = (event) => {
    setIsFetchOnMapEvents(event.target.checked);
  };

  const HandlerEventsMap = () => {
    // eslint-disable-next-line no-unused-vars
    const map = useMapEvents({
      dragend: (e) => getLocation(e),
      zoomend: (e) => getLocation(e),
    });

    return null;
  };

  // eslint-disable-next-line no-unused-vars
  const SetViewOnFetch = ({ coords }) => {
    const map = useMap();
    if (!isFetchOnMapEvents) {
      map.setView(coords, map.getZoom());
    }

    return null;
  };

  return (
    <div className={classes.map}>
      <Box className={classes.mapLoader}>
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
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup
          iconCreateFunction={createClusterCustomIcon}
          showCoverageOnHover={false}
          spiderLegPolylineOptions={{ opacity: 0 }}
        >
          {apart.map((data) => (
            <Marker
              key={data._id}
              center={[data.location.lat, data.location.lon]}
              position={[data.location.lat, data.location.lon]}
              icon={markerIcon}
            >
              <Tooltip direction="top" offset={[0, -5]} permanent>
                {data.price}
              </Tooltip>
              <Popup>
                <MapCard id={data._id} />
              </Popup>
            </Marker>
          ))}
          <SetViewOnFetch coords={location} />
          <HandlerEventsMap />
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

MapRender.propTypes = {
  apart: PropTypes.instanceOf(Array).isRequired,
  isFetching: PropTypes.bool.isRequired,
  handleDragAndZoomMap: PropTypes.func.isRequired,
  isFetchOnMapEvents: PropTypes.bool.isRequired,
  setIsFetchOnMapEvents: PropTypes.func.isRequired,
};

export default MapRender;
