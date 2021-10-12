import React from 'react';
import MainScreen from '../main-screen/MainScreen';
import TopRated from '../top-rated/TopRated';
import MajorCity from '../major-city/MajorCity';
import Footer from '../footer/Footer';

export default function MainPage() {
  return (
    <div>
      <MainScreen />
      <TopRated />
      <MajorCity />
      <Footer />
    </div>
  );
}
