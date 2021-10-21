import * as React from 'react';
import {
  MapContainer, TileLayer, CircleMarker, Popup, Tooltip,
} from 'react-leaflet';

import MapAPI from '../../../api/map/mapPageAPI';

import useStyles from '../../../style/mapStyle';

const MapRender = () => {
  const classes = useStyles();
  const [apart, setApart] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(0);

  React.useEffect(() => {
    MapAPI
      .searchApartments('Philadelphia, PA, United States', currentPage)
      .then(({ data }) => {
        setApart(data);
        // setMapCenter(apart[0].location.lat, apart[0].location.lon);
        setCurrentPage((prevState) => prevState + 1);
      })
      .catch((err) => console.error(err));
  }, []);

  // const coordinates = { lat: apart[0].location.lat, lng: apart[0].location.lon };

  return (
    <div className={classes.map}>
      <MapContainer
        center={apart.length
          ? [apart[0].location.lat, apart[0].location.lon]
          : [38.70189, -78.20361]}
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
