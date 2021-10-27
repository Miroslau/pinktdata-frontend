import React from 'react';
import {
  Redirect, Route, Switch, useLocation,
} from 'react-router-dom';
import publicRoutes from '../../routes';
import { LANDING_ROUTE } from '../../constants/routes';
import Navigation from '../section-components/main-screen/navigation/Navigation';

const AppRouter = () => {
  const currentLocation = useLocation();

  return (
    <div className="app-router">
      {
        currentLocation.pathname !== LANDING_ROUTE ? <Navigation /> : null
      }
      <Switch>
        {
            publicRoutes.map(({ path, Component }) => (
              <Route key={path} path={path} component={Component} exact />
            ))
        }
        <Redirect to={LANDING_ROUTE} />
      </Switch>
    </div>
  );
};

export default AppRouter;
