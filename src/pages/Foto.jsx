// src/pages/Foto.jsx
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import NavbarInternal from '../components/NavbarInternal';
import PhotoGallery from '../components/shared/PhotoGallery';
import { useProjects } from '../hooks/useSupabaseStorage';
import './Foto/Foto.css';

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

const Foto = () => {
    const navigate = useNavigate();
    const { projects: photoSets, loading, error } = useProjects('foto');
    
    // Estado para la galería
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [selectedPhotoSet, setSelectedPhotoSet] = useState(null);

    const handleBack = (e) => {
        e.preventDefault();
        navigate('/');
    };

    const handlePhotoSetClick = (photoSet) => {
        setSelectedPhotoSet(photoSet);
        setGalleryOpen(true);
    };

    const handleCloseGallery = () => {
        setGalleryOpen(false);
        setSelectedPhotoSet(null);
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

            {/* Loading state */}
            {loading && (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Cargando fotos...</p>
                </div>
            )}

            {/* Error state */}
            {error && (
                <div className="error-container">
                    <p>Error al cargar: {error}</p>
                </div>
            )}

            {/* Photo Grid */}
            {!loading && !error && (
                <motion.section 
                    className="foto-masonry"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {photoSets.map((photoSet) => (
                        <motion.article
                            key={photoSet.id}
                            className="foto-item foto-item-project"
                            variants={itemVariants}
                            onClick={() => handlePhotoSetClick(photoSet)}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            style={{ cursor: 'pointer' }}
                        >
                            <img 
                                src={photoSet.coverImage || photoSet.images[0]} 
                                alt={photoSet.client}
                                loading="lazy"
                            />
                            <div className="foto-item-overlay">
                                <h3 className="foto-item-title">{photoSet.client}</h3>
                                <span className="foto-item-count">{photoSet.images.length} fotos</span>
                                <span className="foto-view-link">Ver galería →</span>
                            </div>
                        </motion.article>
                    ))}
                </motion.section>
            )}

            {/* Photo Gallery Modal */}
            <PhotoGallery
                images={selectedPhotoSet?.images || []}
                title={selectedPhotoSet?.client || ''}
                isOpen={galleryOpen}
                onClose={handleCloseGallery}
            />
        </motion.div>
    );
};

export default Foto;
