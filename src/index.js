import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.scss';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';

const persistor = persistStore(store);

if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_IS_MOCKING) {
  const { worker } = require('./mocks/browser');
  worker.start();
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
