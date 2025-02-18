// src/components/Hero.jsx
import React from 'react';
import Spline from '@splinetool/react-spline';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Hero = () => {
    return (
        <section className="hero" id="inicio">
            <div className="hero-background">
                <Spline scene="https://prod.spline.design/v6saoAQrgDCZyu4j/scene.splinecode"/>
                <div className="hero-gradient"></div>
            </div>
            <div className="hero-content">
                <div className="hero-left">
                    <h1 className="hero-title">
                        <span className="luxurious">E</span>
                        <span className="lexend">XP</span>
                        <span className="luxurious">R</span>
                        <span className="lexend">ESI</span>
                        <span className="luxurious">Ó</span>
                        <span className="lexend">N</span>
                    </h1>
                </div>
                <div className="hero-right">
                    <div className="hero-text">
                        <h4 className="hero-subtitle">Por medio de luz, forma, color y movimiento</h4>
                        <p className="hero-description">Lo que hago va más allá de solo transmitir algo, se trata de
                            sumergirse en el contexto de la pieza hasta llegar a su esencia y origen.</p>
                    </div>
                </div>
            </div>
            <div className="hero-lottie">
                <DotLottieReact
                    src="https://lottie.host/898e86da-6ce4-4601-9e3f-20a61ce2ee7e/kcjaa6BerZ.lottie"
                    loop
                    autoplay
                />
            </div>
        </section>
    );
};

export default Hero;