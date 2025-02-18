import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';

const Navbar = () => {
    const [navbarHeight, setNavbarHeight] = useState(0);
    const navbarRef = useRef(null);

    useEffect(() => {
        if (navbarRef.current) {
            setNavbarHeight(navbarRef.current.offsetHeight);
        }
    }, []);

    return (
        <nav className="navbar" ref={navbarRef}>
            <div className="logo">SAMU PICO</div>
            <ul className="nav-links">
                <li>
                    <Link to="inicio" smooth={true} duration={500} offset={-navbarHeight}>
                        Inicio
                    </Link>
                </li>
                <li>
                    <Link to="acerca" smooth={true} duration={500} offset={-navbarHeight}>
                        Acerca
                    </Link>
                </li>
                <li>
                    <Link to="proyectos" smooth={true} duration={500} offset={-navbarHeight}>
                        Proyectos
                    </Link>
                </li>
                <li>
                    <Link to="contacto" smooth={true} duration={500} offset={0}>
                        Contacto
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;