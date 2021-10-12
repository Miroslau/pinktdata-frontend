import { LANDING_ROUTE, MAP_ROUTE } from '../constants/routes';
import LandingPage from '../pages/landing-page/LandingPage';
import MapPage from '../pages/map-page/MapPage';

const publicRoutes = [
  {
    path: LANDING_ROUTE,
    Component: LandingPage,
  },
  {
    path: MAP_ROUTE,
    Component: MapPage,
  },
];

export default publicRoutes;
