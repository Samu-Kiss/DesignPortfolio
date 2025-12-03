// src/context/LanguageContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
    es: {
        // Navbar
        navbar: {
            home: 'Inicio',
            about: 'Acerca',
            projects: 'Proyectos',
            contact: 'Contacto'
        },
        // Hero
        hero: {
            subtitle: 'Por medio de luz, forma, color y movimiento',
            description: 'Lo que hago va más allá de solo transmitir algo, se trata de sumergirse en el contexto de la pieza hasta llegar a su esencia y origen.'
        },
        // About
        about: {
            sectionTitle: 'ACERCA DE MÍ',
            location: 'BOGOTÁ, COLOMBIA',
            title: 'Sobre mí',
            description: 'Mi nombre es Samuel Pico, soy un diseñador y productor audiovisual apasionado por crear experiencias visuales que conecten y comuniquen.',
            tools: 'Herramientas'
        },
        // Projects
        projects: {
            title: 'Proyectos',
            intro: 'Explora mi trabajo en diferentes áreas creativas',
            redes: {
                subtitle: 'Creación de contenido para'
            },
            video: {
                subtitle: 'Producción y edición de'
            }
        },
        // Contact
        contact: {
            title: 'Hablemos',
            subtitle: 'Juntos en tu próximo proyecto.',
            email: 'Correo'
        },
        // 404
        notFound: {
            title: 'Página no encontrada',
            description: 'Lo sentimos, la página que buscas no existe o ha sido movida.',
            backHome: 'Volver al inicio'
        },
        // Common
        common: {
            back: 'Volver',
            viewProject: 'Ver proyecto',
            close: 'Cerrar',
            loading: 'Cargando'
        },
        // Settings
        settings: {
            theme: 'Tema',
            language: 'Idioma'
        }
    },
    en: {
        // Navbar
        navbar: {
            home: 'Home',
            about: 'About',
            projects: 'Projects',
            contact: 'Contact'
        },
        // Hero
        hero: {
            subtitle: 'Through light, shape, color and movement',
            description: 'What I do goes beyond just conveying something, it is about immersing yourself in the context of the piece to reach its essence and origin.'
        },
        // About
        about: {
            sectionTitle: 'ABOUT ME',
            location: 'BOGOTÁ, COLOMBIA',
            title: 'About me',
            description: "My name is Samuel Pico, I'm a designer and audiovisual producer passionate about creating visual experiences that connect and communicate.",
            tools: 'Tools'
        },
        // Projects
        projects: {
            title: 'Projects',
            intro: 'Explore my work in different creative areas',
            redes: {
                subtitle: 'Content creation for'
            },
            video: {
                subtitle: 'Production and editing of'
            }
        },
        // Contact
        contact: {
            title: "Let's talk",
            subtitle: 'Together on your next project.',
            email: 'Email'
        },
        // 404
        notFound: {
            title: 'Page not found',
            description: "Sorry, the page you're looking for doesn't exist or has been moved.",
            backHome: 'Back to home'
        },
        // Common
        common: {
            back: 'Back',
            viewProject: 'View project',
            close: 'Close',
            loading: 'Loading'
        },
        // Settings
        settings: {
            theme: 'Theme',
            language: 'Language'
        }
    }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        const saved = localStorage.getItem('portfolio-language');
        return saved || 'es';
    });

    useEffect(() => {
        localStorage.setItem('portfolio-language', language);
        document.documentElement.lang = language;
    }, [language]);

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'es' ? 'en' : 'es');
    };

    const t = (key) => {
        const keys = key.split('.');
        let value = translations[language];
        for (const k of keys) {
            value = value?.[k];
        }
        return value || key;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
