// src/components/Contact.jsx
import React from 'react';

const Contact = () => {
    return (
        <section className="contact" id="contacto">
            <h2 className="contact-title">
                <span className="luxurious">T </span>
                <span className="lexend">RA</span>
                <span className="luxurious">B</span>
                <span className="lexend">AJEM</span>
                <span className="luxurious">O</span>
                <span className="lexend">S</span>
            </h2>
            <h4 className="contact-subtitle">Juntos en tu próximo proyeto.</h4>
            <div className="contact-links">
                <a className="contact-link" href="https://wa.me/573028444146">
                    <i className="fi fi-brands-whatsapp"></i>
                    WhatsApp
                </a>
                <a className="contact-link" href="https://instagram.com/samupico.ai">
                    <i className="fi fi-brands-instagram"></i>
                    Instagram
                </a>
                <a className="contact-link" href="mailto:samuel.pico@pm.me?subject=%C2%A1Hola!%20Quisiera%20realizar%20mi%20proyecto%20contigo.">
                    <i className="fi fi-rr-envelope"></i>
                    Correo
                </a>
            </div>
        </section>
    );
};

export default Contact;
