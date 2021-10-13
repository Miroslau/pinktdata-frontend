import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/store';

if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_IS_MOCKING) {
  console.log('mocking');
  const { worker } = require('./mocks/browser');
  worker.start();
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
