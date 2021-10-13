import * as React from 'react';

import useStyles from '../../style/mapStyle';

import MapRender from '../../components/map-page/map-render/MapRender';
import Content from '../../components/map-page/content-render/Content';

const Map = () => {
  const classes = useStyles();

  return (
    <section className={classes.wrapper}>
      <Content />
      <MapRender />
    </section>
  );
};

export default Map;
