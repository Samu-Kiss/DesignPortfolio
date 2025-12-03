// src/pages/Foto.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import useModal from '../hooks/useModal';
import NavbarInternal from '../components/NavbarInternal';

// Datos de ejemplo - reemplaza con tus proyectos reales
const photos = [
    {
        id: 1,
        title: 'Retrato Urbano',
        category: 'Retrato',
        location: 'Bogotá, Colombia',
        image: 'https://picsum.photos/seed/foto1/600/800'
    },
    {
        id: 2,
        title: 'Paisaje Natural',
        category: 'Paisaje',
        location: 'Villa de Leyva',
        image: 'https://picsum.photos/seed/foto2/800/600'
    },
    {
        id: 3,
        title: 'Arquitectura Colonial',
        category: 'Arquitectura',
        location: 'Cartagena',
        image: 'https://picsum.photos/seed/foto3/600/900'
    },
    {
        id: 4,
        title: 'Street Photography',
        category: 'Street',
        location: 'Medellín',
        image: 'https://picsum.photos/seed/foto4/800/800'
    },
    {
        id: 5,
        title: 'Producto Editorial',
        category: 'Producto',
        location: 'Estudio',
        image: 'https://picsum.photos/seed/foto5/700/500'
    },
    {
        id: 6,
        title: 'Evento Social',
        category: 'Eventos',
        location: 'Bogotá',
        image: 'https://picsum.photos/seed/foto6/600/800'
    },
    {
        id: 7,
        title: 'Moda Editorial',
        category: 'Moda',
        location: 'Estudio',
        image: 'https://picsum.photos/seed/foto7/500/750'
    },
    {
        id: 8,
        title: 'Naturaleza',
        category: 'Paisaje',
        location: 'Amazonas',
        image: 'https://picsum.photos/seed/foto8/900/600'
    },
    {
        id: 9,
        title: 'Retrato Artístico',
        category: 'Retrato',
        location: 'Estudio',
        image: 'https://picsum.photos/seed/foto9/600/850'
    },
    {
        id: 10,
        title: 'Documental',
        category: 'Street',
        location: 'Cali',
        image: 'https://picsum.photos/seed/foto10/800/600'
    },
];

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
            staggerChildren: 0.08,
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

// Lightbox Modal
const Lightbox = ({ photo, photos, onClose, onNavigate }) => {
    // Hook para cerrar con Escape
    useModal(!!photo, onClose);
    
    // Navegación con flechas del teclado
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!photo) return;
            const currentIndex = photos.findIndex(p => p.id === photo.id);
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                onNavigate(photos[currentIndex - 1]);
            } else if (e.key === 'ArrowRight' && currentIndex < photos.length - 1) {
                onNavigate(photos[currentIndex + 1]);
            }
        };
        
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [photo, photos, onNavigate]);
    
    if (!photo) return null;
    
    const currentIndex = photos.findIndex(p => p.id === photo.id);
    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex < photos.length - 1;

    return ReactDOM.createPortal(
        <motion.div
            className="foto-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={`Foto: ${photo.title}`}
        >
            <button 
                className="foto-lightbox-close" 
                onClick={onClose}
                aria-label="Cerrar galería"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
            </button>
            
            {hasPrev && (
                <button 
                    className="foto-lightbox-nav foto-lightbox-prev"
                    onClick={(e) => { e.stopPropagation(); onNavigate(photos[currentIndex - 1]); }}
                    aria-label="Foto anterior"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6"/>
                    </svg>
                </button>
            )}
            
            <motion.div
                className="foto-lightbox-content"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
            >
                <img src={photo.image} alt={photo.title} />
                <div className="foto-lightbox-info">
                    <h3>{photo.title}</h3>
                    <p>{photo.category} • {photo.location}</p>
                </div>
            </motion.div>
            
            {hasNext && (
                <button 
                    className="foto-lightbox-nav foto-lightbox-next"
                    onClick={(e) => { e.stopPropagation(); onNavigate(photos[currentIndex + 1]); }}
                    aria-label="Foto siguiente"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            )}
        </motion.div>,
        document.body
    );
};

const Foto = () => {
    const navigate = useNavigate();
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const handleBack = (e) => {
        e.preventDefault();
        navigate('/');
    };

    const openLightbox = (photo) => {
        setSelectedPhoto(photo);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedPhoto(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <motion.div 
            className="page-foto"
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
                    <h1 className="project-page-title">
                        <span className="luxurious">F</span>
                        <span className="lexend">OTO</span>
                        <span className="luxurious">G</span>
                        <span className="lexend">RA</span>
                        <span className="luxurious">F</span>
                        <span className="lexend">ÍA</span>
                    </h1>
                </motion.div>

                <div className="project-header-line"></div>
            </header>

            {/* Masonry Gallery */}
            <motion.section 
                className="foto-masonry"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {photos.map((photo) => (
                    <motion.article
                        key={photo.id}
                        className="foto-item"
                        variants={itemVariants}
                        onClick={() => openLightbox(photo)}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <img 
                            src={photo.image} 
                            alt={photo.title}
                            loading="lazy"
                        />
                        <div className="foto-item-overlay">
                            <span className="foto-item-category">{photo.category}</span>
                            <h3 className="foto-item-title">{photo.title}</h3>
                        </div>
                    </motion.article>
                ))}
            </motion.section>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedPhoto && (
                    <Lightbox 
                        photo={selectedPhoto} 
                        photos={photos}
                        onClose={closeLightbox}
                        onNavigate={setSelectedPhoto}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Foto;