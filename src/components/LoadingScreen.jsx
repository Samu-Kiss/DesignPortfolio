// src/components/LoadingScreen.jsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const LoadingScreen = ({ onLoadingComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Simular carga progresiva
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsComplete(true);
                        setTimeout(onLoadingComplete, 800);
                    }, 400);
                    return 100;
                }
                // Velocidad variable para efecto más natural
                const increment = Math.random() * 15 + 5;
                return Math.min(prev + increment, 100);
            });
        }, 150);

        return () => clearInterval(interval);
    }, [onLoadingComplete]);

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    className="loading-screen"
                    initial={{ opacity: 1 }}
                    exit={{ 
                        opacity: 0,
                        transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
                    }}
                >
                    {/* Fondo con patrón */}
                    <div className="loading-pattern"></div>
                    
                    {/* Contenido central */}
                    <div className="loading-content">
                        {/* Logo animado */}
                        <motion.div 
                            className="loading-logo"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                        >
                            <div className="loading-logo-text">
                                <motion.span 
                                    className="loading-letter luxurious"
                                    initial={{ y: 60, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1, duration: 0.5 }}
                                >
                                    S
                                </motion.span>
                                <motion.span 
                                    className="loading-letter lexend"
                                    initial={{ y: 60, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.15, duration: 0.5 }}
                                >
                                    A
                                </motion.span>
                                <motion.span 
                                    className="loading-letter luxurious"
                                    initial={{ y: 60, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                >
                                    M
                                </motion.span>
                                <motion.span 
                                    className="loading-letter lexend"
                                    initial={{ y: 60, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.25, duration: 0.5 }}
                                >
                                    U
                                </motion.span>
                            </div>
                            <motion.div 
                                className="loading-subtitle"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                <span>DISEÑO</span>
                                <span className="loading-dot"></span>
                                <span>VIDEO</span>
                                <span className="loading-dot"></span>
                                <span>FOTO</span>
                            </motion.div>
                        </motion.div>

                        {/* Barra de progreso */}
                        <motion.div 
                            className="loading-progress-container"
                            initial={{ opacity: 0, scaleX: 0.8 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <div className="loading-progress-track">
                                <motion.div 
                                    className="loading-progress-bar"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                />
                            </div>
                            <div className="loading-progress-info">
                                <span className="loading-progress-text">CARGANDO</span>
                                <span className="loading-progress-number">{Math.round(progress)}%</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Líneas decorativas animadas */}
                    <div className="loading-lines">
                        <motion.div 
                            className="loading-line loading-line--1"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.2, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                        />
                        <motion.div 
                            className="loading-line loading-line--2"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.3, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                        />
                        <motion.div 
                            className="loading-line loading-line--3"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: 0.4, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                        />
                    </div>

                    {/* Esquinas decorativas */}
                    <div className="loading-corners">
                        <div className="loading-corner loading-corner--tl"></div>
                        <div className="loading-corner loading-corner--tr"></div>
                        <div className="loading-corner loading-corner--bl"></div>
                        <div className="loading-corner loading-corner--br"></div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
