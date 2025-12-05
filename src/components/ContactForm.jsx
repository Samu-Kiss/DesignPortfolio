// src/components/ContactForm.jsx
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import './ContactForm/ContactForm.css';

const ContactForm = () => {
    const { language } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const labels = {
        es: {
            name: 'Nombre',
            email: 'Correo electrónico',
            message: 'Cuéntame sobre tu proyecto',
            send: 'Enviar mensaje',
            namePlaceholder: 'Tu nombre',
            emailPlaceholder: 'tu@email.com',
            messagePlaceholder: '¿En qué puedo ayudarte?'
        },
        en: {
            name: 'Name',
            email: 'Email',
            message: 'Tell me about your project',
            send: 'Send message',
            namePlaceholder: 'Your name',
            emailPlaceholder: 'your@email.com',
            messagePlaceholder: 'How can I help you?'
        }
    };

    const t = labels[language];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const subject = `Nuevo proyecto de ${formData.name}`;
        const body = `Nombre: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMensaje:%0D%0A${formData.message}`;
        
        window.location.href = `mailto:design.samup@pm.me?subject=${encodeURIComponent(subject)}&body=${body}`;
    };

    return (
        <motion.form 
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <div className="contact-form-group">
                <label htmlFor="name">{t.name}</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t.namePlaceholder}
                    required
                />
            </div>
            
            <div className="contact-form-group">
                <label htmlFor="email">{t.email}</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.emailPlaceholder}
                    required
                />
            </div>
            
            <div className="contact-form-group">
                <label htmlFor="message">{t.message}</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t.messagePlaceholder}
                    rows="4"
                    required
                />
            </div>
            
            <motion.button
                type="submit"
                className="contact-form-submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                {t.send}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
            </motion.button>
        </motion.form>
    );
};

export default ContactForm;
