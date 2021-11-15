import React from 'react';
import { Link } from 'react-router-dom';
import './MainBar.scss';
import {
  FIND_BTN_NAV,
  LINK_BUY,
  LINK_CONTACT,
  LINK_FOR_SALE,
  LINK_INSIGHT,
  LINK_MAIN_SCREEN,
} from '../../../../../constants/mainPageConst';

const MainBar = function () {
  return (
    <div className="main-bar">
      <ul className="link-container">
        <Link className="link-item" to="/">{LINK_MAIN_SCREEN}</Link>
        <Link className="link-item" to="/buy">{LINK_BUY}</Link>
        <Link className="link-item" to="/forSale">{LINK_FOR_SALE}</Link>
        <Link className="link-item" to="/insight">{LINK_INSIGHT}</Link>
        <Link className="link-item" to="/contact">{LINK_CONTACT}</Link>
      </ul>
      <button type="button" className="button btn-find">{FIND_BTN_NAV}</button>
    </div>
  );
};

export default MainBar;
