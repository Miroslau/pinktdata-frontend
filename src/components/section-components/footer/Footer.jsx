import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';
import instagram from '../../../assets/instagram 1.svg';
import youtube from '../../../assets/youtub.svg';
import twitter from '../../../assets/twitter.svg';
import facebook from '../../../assets/icons8-facebook-новый.svg';

import {
  TEXT_FOOTER,
  NAV_L_FOOTER, NAV_R_FOOTER, NEWSLETTER_FOOTER,
  SUBSCRIBE_BTN_FOOTER, ALLRIGHT_FOOTER, TERMS_FOOTER,
  POLICY_FOOTER, SUBSCRIBE_PARAGRAF_FOOTER,
} from '../../../constants/mainPageConst';

const icons = [instagram, youtube, twitter, facebook];

const Footer = function () {
  return (
    <div className="wrapper">
      <div className="footer-content">
        <div className="footer-text">
          <p>
            {TEXT_FOOTER}
          </p>
          <div className="icons">
            {icons.map((icon) => (
              <object
                key={icon}
                aria-label="this object has text"
                className="object"
                type="image/svg+xml"
                data={icon}
              />
            ))}
          </div>
        </div>
        <div className="footer-nav">
          {NAV_L_FOOTER.map((link) => <Link key={link} to="/">{link}</Link>)}
          {NAV_L_FOOTER.map((link) => <Link key={link} to="/">{link}</Link>)}
        </div>
        <div className="footer-nav">
          {NAV_R_FOOTER.map((link) => <Link key={link} to="/">{link}</Link>)}
        </div>
        <div className="footer-input">
          <h4>{NEWSLETTER_FOOTER}</h4>
          <p>{SUBSCRIBE_PARAGRAF_FOOTER}</p>
          <input type="email" placeholder="Enter Email" />
          <button type="button" className="button">{SUBSCRIBE_BTN_FOOTER}</button>
        </div>
      </div>
      <div className="footer-policy">
        <div>{ALLRIGHT_FOOTER}</div>
        <div>
          <Link to="/">{TERMS_FOOTER}</Link>
          <Link to="/">{POLICY_FOOTER}</Link>
          USA
        </div>
      </div>
    </div>
  );
};

export default Footer;
