import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './Header.css'
import logo from './rustmq-logomark.png';

class Header extends Component {
    render() {
        return (
            <header className='header'>
                <nav className='header__hav'>
                    <Link to="/" className='header__nav__link'>
                        <img src={logo} />
                    </Link>
                </nav>
            </header>
        )
    }
}

export default Header;