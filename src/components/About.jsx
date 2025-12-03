import React from 'react';
import pfpImage from '../assets/PFP.png';

const About = () => {
    return (
        <section className="about" id="acerca">
            <div className="about-img-wrapper">
                <img src={pfpImage} alt="Samuel Pico - Diseñador y productor audiovisual" className="about-img"/>
                <div className="about-img-gradient"></div>
            </div>
            <div className="about-content">
                <h1 className="about-title">
                    <span className="lexend">¡</span>
                    <span className="luxurious">H</span>
                    <span className="lexend">OLA!</span>
                </h1>
                <p>
                    Mi nombre es Samuel Pico, soy un diseñador y productor audiovisual, ubicado en Bogotá,
                    Colombia.
                </p>
            </div>
        </section>
    );
};

export default About;
