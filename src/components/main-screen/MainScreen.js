import React from 'react'
import Filter from './filter/Filter'
import Navigation from './navigation/Navigation'
import './MainScreen.scss'

export default function MainScreen() {
    return (
        <div className='main-screen'>
            <div className="wrapper">
            <Navigation />
            <Filter/>
            <h2>Diacover rooms, <span>hotels & make assets!</span></h2>
            <button className='button'>Become a Seller</button>
            </div>
        </div>
    )
}
