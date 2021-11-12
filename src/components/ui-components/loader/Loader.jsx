import React from 'react';
import './Loader.scss';

const Loader = function () {
  return (
    <div className="loader">
      <div className="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Loader;
