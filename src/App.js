import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import AppRouter from './components/app-router/AppRouter';
import NavBar from './components/nav-bar/NavBar';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
