// src/components/Projects.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

const Projects = () => {
    const { t } = useLanguage();
    
    const projectItems = [
        {
            path: '/redes',
            className: 'redes',
            subtitleKey: 'projects.redes.subtitle',
            title: [
                { text: 'R', style: 'luxurious' },
                { text: 'ED', style: 'lexend' },
                { text: 'E', style: 'luxurious' },
                { text: 'S ', style: 'lexend' },
                { text: 'S', style: 'luxurious' },
                { text: 'OCI', style: 'lexend' },
                { text: 'A', style: 'luxurious' },
                { text: 'LES', style: 'lexend' },
            ],
            number: '01'
        },
        {
            path: '/diseno',
            className: 'diseno',
            subtitleKey: null,
            title: [
                { text: 'D', style: 'luxurious' },
                { text: 'ISE', style: 'lexend' },
                { text: 'Ñ', style: 'luxurious' },
                { text: 'O', style: 'lexend' },
            ],
            number: '02'
        },
        {
            path: '/video',
            className: 'video',
            subtitleKey: 'projects.video.subtitle',
            title: [
                { text: 'V', style: 'luxurious' },
                { text: 'IDE', style: 'lexend' },
                { text: 'O', style: 'luxurious' },
            ],
            number: '03'
        },
        {
            path: '/foto',
            className: 'foto',
            subtitleKey: null,
            title: [
                { text: 'F', style: 'luxurious' },
                { text: 'OTO', style: 'lexend' },
                { text: 'G', style: 'luxurious' },
                { text: 'RA', style: 'lexend' },
                { text: 'F', style: 'luxurious' },
                { text: 'ÍA', style: 'lexend' },
            ],
            number: '04'
        }
    ];

    return (
        <section className="projects" id="proyectos">
            <motion.div 
                className="projects-header"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="projects-title">
                    <span className="luxurious">P</span>
                    <span className="lexend">RO</span>
                    <span className="luxurious">Y</span>
                    <span className="lexend">ECT</span>
                    <span className="luxurious">O</span>
                    <span className="lexend">S</span>
                </h2>
                <p className="projects-intro">{t('projects.intro')}</p>
            </motion.div>
            
            <div className="projects-list">
                {projectItems.map((item, index) => (
                    <motion.div
                        key={item.path}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Link to={item.path} className={`project-item ${item.className}`}>
                            <span className="project-number">{item.number}</span>
                            <div className="project-content">
                                {item.subtitleKey && <h4>{t(item.subtitleKey)}</h4>}
                                <h3 className="type-title">
                                    {item.title.map((part, i) => (
                                        <span key={i} className={part.style}>{part.text}</span>
                                    ))}
                                </h3>
                            </div>
                            <div className="project-arrow">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </div>
                            <div className="project-hover-bg"></div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Projects;