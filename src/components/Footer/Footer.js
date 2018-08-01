import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const year = (new Date()).getFullYear();

class Footer extends Component {
    render() {
        return(
            <footer className='footer'>
                <span className='footer__content'>
                   ©{year} RustMQ All rights reserved. <Link to='/'>Privacy</Link> and <Link to='/'>Terms</Link>
                </span>
            </footer>
        )
    }
}

export default Footer;