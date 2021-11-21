import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import AppRouter from './components/app-router/AppRouter';

const App = function () {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
