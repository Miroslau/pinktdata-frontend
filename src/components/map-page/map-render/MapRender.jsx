import * as React from 'react';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';

import { MARKER } from '../../../constants/map_page';

import useStyles from '../../../style/mapStyle';

const MapRender = () => {
  const classes = useStyles();
  return (
    <div className={classes.map}>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            {MARKER[0]}
            {' '}
            <br />
            {' '}
            {MARKER[1]}
          </Popup>
        </Marker>
      </MapContainer>
    </div>

  );
};

export default MapRender;
