import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { getObjectUrl } from '../lib/supabase';
import { useLanguage } from '../context/LanguageContext';
import './About/About.css';

const About = () => {
    const { t } = useLanguage();
    const [pfpImage, setPfpImage] = useState(null);

    useEffect(() => {
        const loadImage = async () => {
            try {
                const url = await getObjectUrl('PFP.png');
                setPfpImage(url);
            } catch (e) {
                console.warn('Error getting PFP image URL:', e);
            }
        };
        loadImage();
    }, []);
    
    const programas = [
        'Photoshop',
        'Illustrator',
        'Premiere Pro',
        'After Effects',
        'Lightroom',
        'Figma',
        'Blender',
    ];

    return (
        <section className="about" id="acerca">
            {/* Línea decorativa superior */}
            <div className="about-divider">
                <span className="about-divider-text">{t('about.sectionTitle')}</span>
            </div>

            <div className="about-container">
                <motion.div 
                    className="about-img-wrapper"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                >
                    <img src={pfpImage} alt="Samuel Pico - Diseñador y productor audiovisual" className="about-img"/>
                </motion.div>

                <motion.div 
                    className="about-content"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                >
                    <div className="about-tag">
                        <span className="about-tag-dot"></span>
                        <span>{t('about.location')}</span>
                    </div>
                    
                    <h1 className="about-title">
                        <span className="lexend">¡H</span>
                        <span className="luxurious">O</span>
                        <span className="lexend">LA!</span>
                    </h1>
                    
                    <p className="about-description">
                        {t('about.description')}
                    </p>
                    
                    <div className="about-programs">
                        <span className="about-programs-label">{t('about.tools')}</span>
                        <div className="about-programs-list">
                            {programas.map((programa, index) => (
                                <span key={index} className="about-program-tag">{programa}</span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
