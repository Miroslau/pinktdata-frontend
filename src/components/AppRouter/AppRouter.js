import React from 'react';
<<<<<<< HEAD
import {Redirect, Route, Switch} from "react-router-dom";
import {publicRoutes} from "../../routes";
import {LANDING_ROUTE, MAP_ROUTE} from "../../constants/routes";

const AppRouter = () => {
    return (
        <Switch>
            {
                publicRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} component={Component} exact/>
                )
            }
            <Redirect to={LANDING_ROUTE}/>
            <Redirect to={MAP_ROUTE}/>
        </Switch>
    );
};
=======
import { Redirect, Route, Switch } from 'react-router-dom';
import publicRoutes from '../../routes';
import { LANDING_ROUTE, MAP_ROUTE } from '../../constants/routes';

const AppRouter = () => (
  <Switch>
    {
     publicRoutes.map(({ path, Component }) => (
       <Route key={path} path={path} component={Component} exact />
     ))
    }
    <Redirect to={LANDING_ROUTE} />
    <Redirect to={MAP_ROUTE} />
  </Switch>
);
>>>>>>> c4fe8ae2fe6d4f83a227a4dc19cae58c1f3b94e8

export default AppRouter;
