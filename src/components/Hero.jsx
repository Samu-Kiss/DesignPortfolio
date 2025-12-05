// src/components/Hero.jsx
import React from 'react';
import Spline from '@splinetool/react-spline';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import './Hero/Hero.css';

const Hero = () => {
    const { t } = useLanguage();
    
    return (
        <section className="hero" id="inicio">
            <div className="hero-background">
                <Spline scene="https://prod.spline.design/v6saoAQrgDCZyu4j/scene.splinecode"/>
                <div className="hero-gradient"></div>
            </div>

            <div className="hero-content">
                <motion.div 
                    className="hero-left"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                >
                    <h1 className="hero-title">
                        <span className="luxurious">E</span>
                        <span className="lexend">XP</span>
                        <span className="luxurious">R</span>
                        <span className="lexend">ESI</span>
                        <span className="luxurious">Ó</span>
                        <span className="lexend">N</span>
                    </h1>
                    <motion.div 
                        className="hero-accent-line"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
                    />
                </motion.div>
                <motion.div 
                    className="hero-right"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
                >
                    <div className="hero-text">
                        <h4 className="hero-subtitle">{t('hero.subtitle')}</h4>
                        <p className="hero-description">{t('hero.description')}</p>
                    </div>
                </motion.div>
            </div>

            {/* Indicador de scroll */}
            <motion.div 
                className="hero-scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <span>SCROLL</span>
                <div className="hero-scroll-line">
                    <motion.div 
                        className="hero-scroll-dot"
                        animate={{ y: [0, 15, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;