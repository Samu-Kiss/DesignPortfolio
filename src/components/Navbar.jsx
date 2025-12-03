import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';

const Navbar = () => {
    const [navbarHeight, setNavbarHeight] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navbarRef = useRef(null);

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
                    >
                        Inicio
                    </Link>
                </li>
                <li>
                    <Link 
                        to="acerca" 
                        smooth={true} 
                        duration={500} 
                        offset={-navbarHeight}
                        onClick={closeMenu}
                    >
                        Acerca
                    </Link>
                </li>
                <li>
                    <Link 
                        to="proyectos" 
                        smooth={true} 
                        duration={500} 
                        offset={-navbarHeight}
                        onClick={closeMenu}
                    >
                        Proyectos
                    </Link>
                </li>
                <li>
                    <Link 
                        to="contacto" 
                        smooth={true} 
                        duration={500} 
                        offset={0}
                        onClick={closeMenu}
                    >
                        Contacto
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;