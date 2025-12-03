// src/components/shared/PageWrapper.jsx
import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
};

const PageWrapper = ({ children, title }) => {
    return (
        <motion.div
            className="page-wrapper"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: 'easeOut' }}
        >
            <header className="page-header">
                <Link to="/" className="back-button">
                    <i className="fi fi-rr-arrow-left"></i>
                    <span>Volver</span>
                </Link>
                <h1 className="page-title">
                    <span className="luxurious">{title.charAt(0)}</span>
                    <span className="lexend">{title.slice(1).toUpperCase()}</span>
                </h1>
            </header>
            <main className="page-content">
                {children}
            </main>
        </motion.div>
    );
};

export default PageWrapper;
