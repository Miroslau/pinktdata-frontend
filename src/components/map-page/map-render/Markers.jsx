import L from 'leaflet';
import {
  Popup, Tooltip, useMap, Marker,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import PropTypes from 'prop-types';
import pointMarker from '../../../assets/svg/pointMarker.svg';
import MapCard from '../../section-components/map-card/MapCard';

const markerIcon = new L.Icon({
  iconUrl: pointMarker,
  iconSize: new L.Point(32, 32),
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
});

const dynamicSize = (count) => {
  if (count / 100 >= 100) return 50;
  if (count / 100 >= 10) return 45;
  return 40;
};

const createClusterCustomIcon = (cluster) => {
  const size = dynamicSize(cluster.getChildCount());
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: 'marker-cluster-custom',
    iconSize: L.point(size, size, true),
  });
};

const createCustomClusterIcon = (count) => {
  const size = dynamicSize(count);
  return L.divIcon({
    html: `<span>${count}</span>`,
    className: 'marker-cluster-custom',
    iconSize: L.point(size, size, true),
  });
};

const Markers = function ({ apart, isFetchAll }) {
  const map = useMap();

  if (isFetchAll) {
    return (
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
      </MarkerClusterGroup>
    );
  }

  return apart.map((data) => {
    if (data.totalCount > 1) {
      return (
        <Marker
          key={data._id}
          center={[data.location.lat, data.location.lon]}
          position={[data.location.lat, data.location.lon]}
          icon={createCustomClusterIcon(data.totalCount)}
          eventHandlers={{
            click: (e) => {
              map.setView(e.latlng, map.getZoom() + 2);
            },
          }}
        />
      );
    }
    return (
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
    );
  });
};

Markers.propTypes = {
  apart: PropTypes.instanceOf(Array).isRequired,
  isFetchAll: PropTypes.bool.isRequired,
};

export default Markers;
