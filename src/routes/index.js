import {
  LANDING_ROUTE, MAP_ROUTE, BUY_PAGE, SALE_PAGE, INSIGHT_PAGE, ROOM_PAGE, PAYMENT_PAGE,
} from '../constants/routes';
import MapPage from '../pages/map-page/MapPage';
import MainPage from '../pages/main-page/MainPage';
import BuyPage from '../pages/buy-page/BuyPage';
import ForSalePage from '../pages/for-sale-page/ForSalePage';
import InsightPage from '../pages/insight-page/InsightPage';
import RoomPage from '../pages/room-page/RoomPage';
import PaymentPage from '../pages/payment-page/PaymentPage';

const publicRoutes = [
  {
    path: LANDING_ROUTE,
    Component: MainPage,
  },
  {
    path: MAP_ROUTE,
    Component: MapPage,
  },
  {
    path: BUY_PAGE,
    Component: BuyPage,
  },
  {
    path: SALE_PAGE,
    Component: ForSalePage,
  },
  {
    path: INSIGHT_PAGE,
    Component: InsightPage,
  },
  {
    path: ROOM_PAGE,
    Component: RoomPage,
  },
  {
    path: PAYMENT_PAGE,
    Component: PaymentPage,
  },
];

export default publicRoutes;
