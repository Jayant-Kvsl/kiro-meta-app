import React from 'react'
import classes from '../App.css'
import {Link} from 'react-router-dom';

function Nav(){
    const navStyle = {
        color: 'white'
    }
    return (
        <nav>
            <h3>Logo</h3>
            <ul className={classes.nl}>
            <Link to="/" style={navStyle}><li>Home-Page</li></Link> 
              <Link to="/store"  style={navStyle}><li>Store Data</li></Link> 
              {/* <Link to="/Product1"style={navStyle}><li>Product 1 </li></Link>  
              <Link to="/Product2"style={navStyle}><li>Product 2 </li></Link>
              <Link to="/Product3"style={navStyle}><li>Product 3 </li></Link> */}
            </ul>
        </nav>
    )
}

export default Nav;