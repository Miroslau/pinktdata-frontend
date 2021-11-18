import React from 'react';
import {
  Route, Routes, useLocation,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { publicRoutes, privateRoutes } from '../../routes';
import { LANDING_ROUTE } from '../../constants/routes';
import Navigation from '../section-components/main-screen/navigation/Navigation';
import { userSelector } from '../../store/slice/userSlice';

const AppRouter = function () {
  const currentLocation = useLocation();
  const { token } = useSelector(userSelector);

  return (
    <div className="app-router">
      {
        currentLocation.pathname !== LANDING_ROUTE ? <Navigation /> : null
      }
      <Routes>
        {
          token && privateRoutes.map(
            ({ path, Component }) => <Route key={path} path={path} element={<Component />} exact />,
          )
        }
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
