// src/pages/NotFound.jsx
import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './NotFound/NotFound.css';

const NotFound = () => {
    const { language } = useLanguage();

    return (
        <motion.div 
            className="page-404"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="error-content">
                <motion.h1 
                    className="error-code"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                >
                    <span className="luxurious">4</span>
                    <span className="lexend">0</span>
                    <span className="luxurious">4</span>
                </motion.h1>

                <motion.div 
                    className="error-decoration"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <span className="error-line"></span>
                    <span className="error-dot"></span>
                    <span className="error-line"></span>
                </motion.div>
                
                <motion.p 
                    className="error-message"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {language === 'es' 
                        ? '¡Oops! Página no encontrada' 
                        : "Oops! Page not found"
                    }
                </motion.p>

                <motion.p 
                    className="error-submessage"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    {language === 'es' 
                        ? 'La página que buscas no existe o ha sido movida.' 
                        : "The page you're looking for doesn't exist or has been moved."
                    }
                </motion.p>
                
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <Link to="/" className="error-link">
                        {language === 'es' ? 'Volver al inicio' : 'Back to home'}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </Link>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default NotFound;
