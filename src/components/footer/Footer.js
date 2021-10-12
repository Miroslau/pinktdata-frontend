import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.scss'

export default function Footer() {
    return (
        <div className='wrapper'>
            <div className="footer-content">
                <div className="footer-text">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting</p>
                    <div className="icons"></div>
                </div>
                <div className="footer-nav">
                    <Link to='#'>Home</Link>
                    <Link to='#'>Buy Room</Link>
                    <Link to='#'>Sell Room</Link>
                    <Link to='#'>Help</Link>
                    <Link to='#'>Contact</Link>
                </div>
                <div className="footer-nav">
                    <Link to='#'>About</Link>
                    <Link to='#'>Explore Rooms</Link>
                    <Link to='#'>Insight</Link>
                    <Link to='#'>Blog</Link>
                </div>
                <div className="footer-input">
                    <h4>Newsletter</h4>
                    <p>Subscribe to the newsletter</p>
                    <input type='email' placeholder='Enter Email' />
                    <button className='button'>Subscribe</button>
                </div>
            </div>
            <div className="footer-policy">
<div>All right Revserved@2020</div>
<div>
<Link to='#'>Terms & Conditions</Link>
<Link to='#'>Privacy Policy</Link>
USA

</div>

            </div>

        </div>
    )
}
