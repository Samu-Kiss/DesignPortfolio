// src/components/CaseStudy.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import NavbarInternal from './NavbarInternal';

const CaseStudy = ({ 
    project,
    type = 'video' // 'video', 'design', 'photo', 'redes'
}) => {
    const navigate = useNavigate();
    const { language } = useLanguage();
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Filter only images for lightbox navigation
    const galleryImages = project.gallery?.filter(item => item.type !== 'video') || [];

    const labels = {
        es: {
            overview: 'Resumen',
            challenge: 'El Reto',
            process: 'El Proceso',
            solution: 'La Solución',
            results: 'Resultados',
            tools: 'Herramientas',
            client: 'Cliente',
            year: 'Año',
            duration: 'Duración',
            role: 'Rol',
            back: 'Volver',
            gallery: 'Galería',
            nextProject: 'Ver siguiente'
        },
        en: {
            overview: 'Overview',
            challenge: 'The Challenge',
            process: 'The Process',
            solution: 'The Solution',
            results: 'Results',
            tools: 'Tools',
            client: 'Client',
            year: 'Year',
            duration: 'Duration',
            role: 'Role',
            back: 'Back',
            gallery: 'Gallery',
            nextProject: 'View next'
        }
    };

    const t = labels[language];

    const handleBack = () => {
        const routes = {
            design: 'diseno',
            photo: 'foto',
            video: 'video',
            redes: 'redes'
        };
        navigate(`/${routes[type] || type}`);
    };

    // Lightbox functions
    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = '';
    };

    const goToPrevious = useCallback(() => {
        setCurrentImageIndex((prev) => 
            prev === 0 ? galleryImages.length - 1 : prev - 1
        );
    }, [galleryImages.length]);

    const goToNext = useCallback(() => {
        setCurrentImageIndex((prev) => 
            prev === galleryImages.length - 1 ? 0 : prev + 1
        );
    }, [galleryImages.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!lightboxOpen) return;
            
            switch (e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    goToPrevious();
                    break;
                case 'ArrowRight':
                    goToNext();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxOpen, goToPrevious, goToNext]);

    // Animation variants
    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div 
            className="case-study"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <NavbarInternal />

            {/* Hero Section */}
            <section className="case-hero">
                <div className="case-hero-overlay"></div>
                {project.heroImage && (
                    <img 
                        src={project.heroImage} 
                        alt={project.title} 
                        className="case-hero-image"
                    />
                )}
                {project.heroVideo && (
                    <video 
                        src={project.heroVideo} 
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                        className="case-hero-video"
                    />
                )}
                <motion.div 
                    className="case-hero-content"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: { transition: { staggerChildren: 0.15 } }
                    }}
                >
                    <motion.span 
                        className="case-category"
                        variants={fadeUp}
                    >
                        {project.category}
                    </motion.span>
                    <motion.h1 
                        className="case-title"
                        variants={fadeUp}
                    >
                        {project.title}
                    </motion.h1>
                    {project.tagline && (
                        <motion.p 
                            className="case-tagline"
                            variants={fadeUp}
                        >
                            {project.tagline}
                        </motion.p>
                    )}
                </motion.div>
            </section>

            {/* Project Meta */}
            <motion.section 
                className="case-meta"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
            >
                <div className="case-meta-grid">
                    {project.client && (
                        <div className="case-meta-item">
                            <span className="case-meta-label">{t.client}</span>
                            <span className="case-meta-value">{project.client}</span>
                        </div>
                    )}
                    {project.year && (
                        <div className="case-meta-item">
                            <span className="case-meta-label">{t.year}</span>
                            <span className="case-meta-value">{project.year}</span>
                        </div>
                    )}
                    {project.duration && (
                        <div className="case-meta-item">
                            <span className="case-meta-label">{t.duration}</span>
                            <span className="case-meta-value">{project.duration}</span>
                        </div>
                    )}
                    {project.role && (
                        <div className="case-meta-item">
                            <span className="case-meta-label">{t.role}</span>
                            <span className="case-meta-value">{project.role}</span>
                        </div>
                    )}
                </div>
            </motion.section>

            {/* Overview */}
            {project.overview && (
                <motion.section 
                    className="case-section case-overview"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="case-section-content">
                        <p className="case-section-text">{project.overview}</p>
                    </div>
                </motion.section>
            )}

            {/* Challenge */}
            {project.challenge && (
                <motion.section 
                    className="case-section case-challenge"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="case-section-content">
                        <div className="case-section-header">
                            <span className="case-section-number">01</span>
                            <h2 className="case-section-title">{t.challenge}</h2>
                        </div>
                        <p className="case-section-text">{project.challenge}</p>
                    </div>
                    {project.challengeImage && (
                        <motion.div 
                            className="case-section-media"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <img src={project.challengeImage} alt={t.challenge} />
                        </motion.div>
                    )}
                </motion.section>
            )}

            {/* Process */}
            {project.process && (
                <motion.section 
                    className="case-section case-process"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="case-section-content">
                        <div className="case-section-header">
                            <span className="case-section-number">02</span>
                            <h2 className="case-section-title">{t.process}</h2>
                        </div>
                        {typeof project.process === 'string' ? (
                            <p className="case-section-text">{project.process}</p>
                        ) : (
                            <div className="case-process-steps">
                                {project.process.map((step, index) => (
                                    <motion.div 
                                        key={index} 
                                        className="case-process-step"
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <span className="case-step-number">{index + 1}</span>
                                        <div className="case-step-content">
                                            <h3>{step.title}</h3>
                                            <p>{step.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.section>
            )}

            {/* Solution */}
            {project.solution && (
                <motion.section 
                    className="case-section case-solution"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="case-section-content">
                        <div className="case-section-header">
                            <span className="case-section-number">03</span>
                            <h2 className="case-section-title">{t.solution}</h2>
                        </div>
                        <p className="case-section-text">{project.solution}</p>
                    </div>
                    {project.solutionImage && (
                        <motion.div 
                            className="case-section-media"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <img src={project.solutionImage} alt={t.solution} />
                        </motion.div>
                    )}
                </motion.section>
            )}

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
                <section className="case-gallery">
                    <motion.h2 
                        className="case-section-title center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        {t.gallery}
                    </motion.h2>
                    <div className="case-gallery-grid">
                        {project.gallery.map((item, index) => {
                            // Get the index in galleryImages array for lightbox
                            const imageIndex = item.type !== 'video' 
                                ? galleryImages.findIndex(img => img.src === item.src)
                                : -1;
                            
                            return (
                                <motion.div 
                                    key={index} 
                                    className={`case-gallery-item ${item.type !== 'video' ? 'clickable' : ''}`}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08 }}
                                    onClick={() => item.type !== 'video' && openLightbox(imageIndex)}
                                >
                                    {item.type === 'video' ? (
                                        <video src={item.src} controls playsInline />
                                    ) : (
                                        <>
                                            <img src={item.src} alt={item.alt || `Gallery ${index + 1}`} />
                                            <div className="case-gallery-zoom">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <circle cx="11" cy="11" r="8"/>
                                                    <path d="M21 21l-4.35-4.35"/>
                                                    <path d="M11 8v6M8 11h6"/>
                                                </svg>
                                            </div>
                                        </>
                                    )}
                                    {item.caption && (
                                        <p className="case-gallery-caption">{item.caption}</p>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Lightbox - rendered via portal to avoid transform issues */}
            {createPortal(
                <AnimatePresence>
                    {lightboxOpen && galleryImages.length > 0 && (
                        <motion.div 
                            className="lightbox"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeLightbox}
                        >
                            <button className="lightbox-close" onClick={closeLightbox}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 6L6 18M6 6l12 12"/>
                                </svg>
                            </button>

                            <button 
                                className="lightbox-nav lightbox-prev" 
                                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 18l-6-6 6-6"/>
                                </svg>
                            </button>

                            <motion.div 
                                className="lightbox-content"
                                onClick={(e) => e.stopPropagation()}
                                key={currentImageIndex}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                <img 
                                    src={galleryImages[currentImageIndex]?.src} 
                                    alt={galleryImages[currentImageIndex]?.alt || `Image ${currentImageIndex + 1}`} 
                                />
                                {galleryImages[currentImageIndex]?.caption && (
                                    <p className="lightbox-caption">
                                        {galleryImages[currentImageIndex].caption}
                                    </p>
                                )}
                            </motion.div>

                            <button 
                                className="lightbox-nav lightbox-next" 
                                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 18l6-6-6-6"/>
                                </svg>
                            </button>

                            <div className="lightbox-counter">
                                {currentImageIndex + 1} / {galleryImages.length}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}

            {/* Results */}
            {project.results && (
                <motion.section 
                    className="case-section case-results"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="case-section-content">
                        <div className="case-section-header">
                            <span className="case-section-number">04</span>
                            <h2 className="case-section-title">{t.results}</h2>
                        </div>
                        {typeof project.results === 'string' ? (
                            <p className="case-section-text">{project.results}</p>
                        ) : (
                            <div className="case-results-stats">
                                {project.results.map((stat, index) => (
                                    <motion.div 
                                        key={index} 
                                        className="case-stat"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <span className="case-stat-value">{stat.value}</span>
                                        <span className="case-stat-label">{stat.label}</span>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.section>
            )}

            {/* Tools */}
            {project.tools && project.tools.length > 0 && (
                <motion.section 
                    className="case-section case-tools"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="case-section-title center">{t.tools}</h2>
                    <div className="case-tools-list">
                        {project.tools.map((tool, index) => (
                            <motion.span 
                                key={index} 
                                className="case-tool-tag"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                {tool}
                            </motion.span>
                        ))}
                    </div>
                </motion.section>
            )}

            {/* Navigation */}
            <section className="case-navigation">
                <motion.button 
                    onClick={handleBack} 
                    className="case-nav-btn case-nav-back"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    {t.back}
                </motion.button>
                {project.nextProject && (
                    <motion.button 
                        onClick={() => navigate(project.nextProject.path)} 
                        className="case-nav-btn case-nav-next"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {t.nextProject}: {project.nextProject.title}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </motion.button>
                )}
            </section>
        </motion.div>
    );
};

export default CaseStudy;
