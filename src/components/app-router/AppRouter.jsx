import React from 'react';
import {
  Route, Routes, useLocation,
} from 'react-router-dom';
import publicRoutes from '../../routes';
import { LANDING_ROUTE } from '../../constants/routes';
import Navigation from '../section-components/main-screen/navigation/Navigation';

const AppRouter = function () {
  const currentLocation = useLocation();

  return (
    <div className="app-router">
      {
        currentLocation.pathname !== LANDING_ROUTE ? <Navigation /> : null
      }
      <Routes>
        {
            publicRoutes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} exact />
            ))
        }
        <Route path="*" to={LANDING_ROUTE} />
      </Routes>
    </div>
  );
};

export default AppRouter;
