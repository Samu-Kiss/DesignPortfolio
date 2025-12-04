// src/pages/Redes.jsx
import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import NavbarInternal from '../components/NavbarInternal';
import { useProjects } from '../hooks/useSupabaseStorage';

const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
    }
};

// Componente de carrusel infinito con CSS animation
const InfiniteCarousel = ({ images, client, direction }) => {
    const [isPaused, setIsPaused] = useState(false);
    
    // Duplicar imágenes para efecto infinito seamless
    const extendedImages = [...images, ...images];
    
    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);

    return (
        <div 
            className="redes-carousel-wrapper"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleMouseEnter}
            onTouchEnd={handleMouseLeave}
        >
            <div 
                className={`redes-carousel-track-infinite ${direction === 'left' ? 'scroll-left' : 'scroll-right'}`}
                style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
            >
                {extendedImages.map((image, imgIndex) => (
                    <div key={imgIndex} className="redes-carousel-item">
                        <img 
                            src={image} 
                            alt={`${client} - Proyecto ${(imgIndex % images.length) + 1}`}
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

const Redes = () => {
    const navigate = useNavigate();
    const { projects: clientProjects, loading, error } = useProjects('redes');
    
    // Generar direcciones aleatorias una sola vez
    const directions = useMemo(() => 
        clientProjects.map(() => Math.random() > 0.5 ? 'left' : 'right'),
        [clientProjects]
    );

    const handleBack = (e) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <motion.div 
            className="page-redes"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <NavbarInternal />
            
            {/* Header */}
            <header className="project-page-header">
                <button onClick={handleBack} className="project-back-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                </button>
                
                <motion.div 
                    className="project-title-wrapper"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                >
                    <h4 className="project-page-subtitle">Creación de contenido para</h4>
                    <h1 className="project-page-title">
                        <span className="luxurious">R</span>
                        <span className="lexend">ED</span>
                        <span className="luxurious">E</span>
                        <span className="lexend">S </span>
                        <span className="luxurious">S</span>
                        <span className="lexend">OCI</span>
                        <span className="luxurious">A</span>
                        <span className="lexend">LES</span>
                    </h1>
                </motion.div>

                <div className="project-header-line"></div>
            </header>

            {/* Loading state */}
            {loading && (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Cargando proyectos...</p>
                </div>
            )}

            {/* Error state */}
            {error && (
                <div className="error-container">
                    <p>Error al cargar: {error}</p>
                </div>
            )}

            {/* Carruseles por cliente */}
            {!loading && !error && (
                <motion.section 
                    className="redes-carousels"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {clientProjects.map((client, index) => (
                        <motion.div 
                            key={client.id} 
                            className="redes-carousel-section"
                            variants={itemVariants}
                            onClick={() => navigate(`/proyecto/redes/${client.id}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="redes-carousel-header">
                                <h2 className="redes-carousel-client">{client.client}</h2>
                                <span className="redes-carousel-link">Ver caso de estudio →</span>
                            </div>
                            
                            <InfiniteCarousel 
                                images={client.images}
                                client={client.client}
                                direction={directions[index]}
                            />
                        </motion.div>
                    ))}
                </motion.section>
            )}
        </motion.div>
    );
};

export default Redes;