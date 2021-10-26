import {
  useEffect, useState,
} from 'react';
import {
  MapContainer, TileLayer, CircleMarker, Popup, Tooltip, useMap,
} from 'react-leaflet';
import { useSelector } from 'react-redux';
import { apartmentSelector } from '../../../store/slice/apartmentSlice';
import useMountedState from '../../../hooks/useMountedState';

import MapAPI from '../../../api/map/mapPageAPI';

import useStyles from '../../../style/style';

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
        {apart.map((data) => (
          <CircleMarker
            key={data._id}
            center={[data.location.lat, data.location.lon]}
            pathOptions={{
              color: 'blue',
              fillColor: ' blue',
              weight: 1,
              opacity: 1,
              fillOpacity: 0.2,
            }}
            radius={10}
          >
            <Tooltip permanent>{data.price}</Tooltip>
            <Popup>
              {data.address}
              {' '}
              <br />
              {' '}
              {data.price}
            </Popup>
          </CircleMarker>
        ))}
        <SetViewOnFetch coords={location} />
      </MapContainer>
    </div>
  );
};

export default MapRender;
