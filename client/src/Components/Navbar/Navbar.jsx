import React, { useState } from 'react';
import { NavData } from './Navdata';
import './Navbar.css'

const NavBar = () => {
    const [state = { clicked : false}, setState] = useState();
    const handleClick = () => {
        setState({ clicked: !state.clicked})
    }
  return (
    <nav>
        <nav className="NavbarItems">
                <h1 className="logo1">Internee <br />
                </h1>
                <div className="menu-icons" onClick={handleClick}>
                    <i className={state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
                <ul className={state.clicked ? "nav-menu active" : "nav-menu"}>
                    {NavData.map((item, index) => {
                        return (
                                <li key={index}>
                                    <a href={item.url} className={item.cName}>
                                        <i className={item.icon}></i>
                                        {item.title}
                                    </a>
                                </li>
                        )
                    }
                    )}
                </ul>
            </nav>
    </nav>
  )
}

export default NavBar