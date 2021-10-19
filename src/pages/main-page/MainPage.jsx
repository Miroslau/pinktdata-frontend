import React from 'react';
import MainScreen from '../../components/section-components/main-screen/MainScreen';
import TopRated from '../../components/section-components/top-rated/TopRated';
import MajorCity from '../../components/section-components/major-city/MajorCity';
import Footer from '../../components/section-components/footer/Footer';

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
