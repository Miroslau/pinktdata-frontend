import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import React from 'react';
import AppRouter from './components/app-router/AppRouter';
import NavBar from './components/nav-bar/NavBar';
import MainPage from './components/main-page/MainPage';
import Buy from './components/Pages/Buy/Buy';
import ForSale from './components/Pages/ForSale/ForSale';
import Insight from './components/Pages/Insight/Insight';

function App() {
  return (
    <div className="App">
        <NavBar />
        <AppRouter />
      <Switch>
      <Route exact path="/" render={(props) => <MainPage {...props} />} />

        <Route exact path="/buy" render={(props) => <Buy {...props} />} />
        <Route path="/forSale" render={(props) => <ForSale {...props} />} />
        <Route path="/insight" render={(props) => <Insight {...props} />} />
        {/* <Route path = "/contact" render = {(props) => <Contact   {...props} />} /> */}
        {/* <Route path = '*' component = {NotFoundPage} /> */}

      </Switch>
    </div>
  );
}

export default App;
