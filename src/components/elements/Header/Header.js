import React from 'react';
import './Header.scss';
import Logo from './images/reactMovie_logo.png';
import TMDBLogo from './images/tmdb_logo.png';

const Header = () => {
    return (
        <div className='rmdb-header'>
            Header
            <div className='rmdb-header-content'>
                <img className='rmdb-logo' src={Logo} alt='rmdb-logo' />
                <img className='rmdb-tmdb-logo' src={TMDBLogo} alt='tmdb-logo' />
            </div>
        </ div>
    );
}

export default Header;
