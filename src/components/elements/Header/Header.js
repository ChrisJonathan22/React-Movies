import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import Logo from './images/reactMovie_logo.png';
import TMDBLogo from './images/tmdb_logo.png';

const Header = () => {
    return (
        <div className='rmdb-header'>
            <div className='rmdb-header-content'>
                <Link to='/'>
                    <img className='rmdb-logo' src='./images/reactMovie_logo.png' alt='rmdb-logo' />
                </Link>
                <img className='rmdb-tmdb-logo' src='./images/tmdb_logo.png' alt='tmdb-logo' />
            </div>
        </ div>
    );
};

export default Header;
