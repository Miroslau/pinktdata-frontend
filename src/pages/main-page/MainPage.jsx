import React from 'react';
import MainScreen from '../../components/section-components/main-screen/MainScreen';
import TopRated from '../../components/section-components/top-rated/TopRated';
import MajorCity from '../../components/section-components/major-city/MajorCity';
import Footer from '../../components/section-components/footer/Footer';

const MainPage = function () {
  return (
    <div>
      <MainScreen />
      <TopRated />
      <MajorCity />
      <Footer />
    </div>
  );
};

export default MainPage;
