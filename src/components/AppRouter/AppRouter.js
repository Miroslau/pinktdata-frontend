import React from 'react';
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

export default AppRouter;