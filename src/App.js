import { Switch, Route } from 'react-router-dom';
import React from 'react';
import MainPage from './components/main-page/MainPage';
import Buy from './components/Pages/Buy/Buy';
import ForSale from './components/Pages/ForSale/ForSale';
import Insight from './components/Pages/Insight/Insight';

function App() {
  return (
    <div className="App">
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
