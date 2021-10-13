import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.scss';
import App from './App';

import store from './store/store';

if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_IS_MOCKING) {
  // console.log('mocking');
  const { worker } = require('./mocks/browser');
  worker.start();
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
