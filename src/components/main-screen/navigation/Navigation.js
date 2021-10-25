import React from 'react'
import { Link } from 'react-router-dom'
// import Button from '@mui/material/Button';
// import SearchIcon from "@material-ui/icons/Search";
import './Navigation.scss'

const Navigation = () => {
    return (
        <div className='navigation'>
            <ul className='link-container'>
                <Link className='link-item' to='/'>MainScreen</Link>
                <Link className='link-item' to='/buy'>Buy</Link>
                <Link className='link-item' to='/forSale'>ForSale</Link>
                <Link className='link-item' to='/insight'>Insight</Link>
                <Link className='link-item' to='/contact'>Contact</Link>
            </ul>
                {/* <Button style={{marginRight:'10px', background:'#e57373'}} variant="contained" >    <SearchIcon /> Find Nearby</Button> */}
                <button className='button btn-find'>Find Nearby</button>
                <button className='button '>Sign in</button>
                {/* <Button style={{background:'#e57373'}} variant="contained" >Sign in</Button> */}
        </div>
    )
}

export default Navigation
