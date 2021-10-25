import { useEffect, useState } from 'react';
import {
  MapContainer, TileLayer, CircleMarker, Popup, Tooltip,
} from 'react-leaflet';

import { get } from 'lodash';

import MapAPI from '../../../api/map/mapPageAPI';

import useStyles from '../../../style/mapStyle';

const MapRender = () => {
  const classes = useStyles();
  const [apart, setApart] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [location, setLocation] = useState([39.94977, -75.28529]);

  useEffect(() => {
    MapAPI
      .searchApartments('Philadelphia, PA, United States', currentPage)
      .then(({ data }) => {
        setApart(data);
        setCurrentPage((prevState) => prevState + 1);
        const currApart = data.find((item) => item.address === 'Philadelphia, PA, United States');
        const locationApart = get(currApart, 'location', {});
        setLocation(locationApart);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={classes.map}>
      <MapContainer
        center={location}
        zoom={18}
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
      </MapContainer>
    </div>

  );
};

export default MapRender;
