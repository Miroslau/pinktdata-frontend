/* eslint-disable import/no-unresolved */
import {
  useEffect, useState,
} from 'react';
import L from 'leaflet';
import {
  MapContainer, TileLayer, Popup, Tooltip, useMap, Marker,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster/src/react-leaflet-markercluster';
import { useSelector } from 'react-redux';
import { apartmentSelector } from '../../../store/slice/apartmentSlice';
import useMountedState from '../../../hooks/useMountedState';
import pointMarker from '../../../assets/svg/pointMarker.svg';

import MapAPI from '../../../api/map/mapPageAPI';

import useStyles from '../../../style/style';

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

const MapRender = () => {
  const classes = useStyles();
  const [apart, setApart] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [location, setLocation] = useState([39.94977, -75.28529]);
  const isMounted = useMountedState();

  const { publicAddress } = useSelector(apartmentSelector);

  useEffect(() => {
    MapAPI
      .searchApartments(publicAddress, currentPage)
      .then(({ data }) => {
        if (isMounted()) {
          if (data.length) setLocation([data[0].location.lat, data[0].location.lon]);
          setApart(data);
          setCurrentPage((prevState) => prevState + 1);
        }
      })
      .catch((err) => console.error(err));
  }, [isMounted]);

  const SetViewOnFetch = ({ coords }) => {
    const map = useMap();
    map.setView(coords, map.getZoom());

    return null;
  };

  return (
    <div className={classes.map}>
      <MapContainer
        center={location}
        zoom={11}
        scrollWheelZoom
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
              <Tooltip direction="top" offset={[0, -5]} permanent>{data.price}</Tooltip>
              <Popup>
                {data.address}
                {' '}
                <br />
                {' '}
                {data.price}
              </Popup>
            </Marker>
          ))}
          <SetViewOnFetch coords={location} />
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default MapRender;
