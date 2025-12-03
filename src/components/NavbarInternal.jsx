import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const NavbarInternal = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    const handleHomeClick = () => {
        navigate('/');
    };

    return (
        <nav className="navbar navbar-internal">
            <div className="logo" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                SAMU PICO
            </div>
            <button 
                className="nav-home-btn"
                onClick={handleHomeClick}
                aria-label={t('navbar.home')}
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                <span>{t('navbar.home')}</span>
            </button>
        </nav>
    );
};

export default NavbarInternal;
