import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
    const [navbarHeight, setNavbarHeight] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('inicio');
    const navbarRef = useRef(null);
    const { t } = useLanguage();

    useEffect(() => {
        if (navbarRef.current) {
            setNavbarHeight(navbarRef.current.offsetHeight);
        }
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleSetActive = (to) => {
        setActiveSection(to);
    };

    return (
        <nav className="navbar" ref={navbarRef}>
            <div className="logo">SAMU PICO</div>
            <button 
                className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                onClick={toggleMenu}
                aria-label="Menú de navegación"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
            <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                <li>
                    <Link 
                        to="inicio" 
                        smooth={true} 
                        duration={500} 
                        offset={-navbarHeight}
                        onClick={closeMenu}
                        spy={true}
                        onSetActive={handleSetActive}
                        className={activeSection === 'inicio' ? 'active' : ''}
                    >
                        {t('navbar.home')}
                    </Link>
                </li>
                <li>
                    <Link 
                        to="acerca" 
                        smooth={true} 
                        duration={500} 
                        offset={-navbarHeight}
                        onClick={closeMenu}
                        spy={true}
                        onSetActive={handleSetActive}
                        className={activeSection === 'acerca' ? 'active' : ''}
                    >
                        {t('navbar.about')}
                    </Link>
                </li>
                <li>
                    <Link 
                        to="proyectos" 
                        smooth={true} 
                        duration={500} 
                        offset={-navbarHeight}
                        onClick={closeMenu}
                        spy={true}
                        onSetActive={handleSetActive}
                        className={activeSection === 'proyectos' ? 'active' : ''}
                    >
                        {t('navbar.projects')}
                    </Link>
                </li>
                <li>
                    <Link 
                        to="contacto" 
                        smooth={true} 
                        duration={500} 
                        offset={0}
                        onClick={closeMenu}
                        spy={true}
                        onSetActive={handleSetActive}
                        className={activeSection === 'contacto' ? 'active' : ''}
                    >
                        {t('navbar.contact')}
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;