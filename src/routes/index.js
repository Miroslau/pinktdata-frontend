import {LANDING_ROUTE, MAP_ROUTE} from "../constants/routes";
import LandingPage from "../pages/LandingPage";
import MapPage from '../pages/Map/MapPage';

export const publicRoutes = [
    {
        path: LANDING_ROUTE,
        Component: LandingPage
    },
    {
        path: MAP_ROUTE,
        Component: MapPage
    }
]