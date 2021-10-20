import * as React from 'react';
import {
  MapContainer, TileLayer, CircleMarker, Popup, Tooltip,
} from 'react-leaflet';

import MapAPI from '../../../api/map/mapPageAPI';

import useStyles from '../../../style/mapStyle';

const MapRender = () => {
  const classes = useStyles();
  const [apart, setApart] = React.useState([]);

  React.useEffect(() => {
    MapAPI
      .renderOnTheMap()
      .then(({ data }) => setApart(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={classes.map}>
      <MapContainer center={[38.70079, -78.20479]} zoom={18} scrollWheelZoom>
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
            <Tooltip permanent>{data.pricingQuote.priceString}</Tooltip>
            <Popup>
              {data.listing.publicAddress}
              {' '}
              <br />
              {' '}
              {data.pricingQuote.priceString}
            </Popup>
            {/* {markerOptions} */}
          </CircleMarker>
        ))}
      </MapContainer>

    </div>

  );
};

export default MapRender;
