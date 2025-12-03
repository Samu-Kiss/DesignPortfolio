// src/pages/Video.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import PageWrapper from '../components/shared/PageWrapper';

// Datos de ejemplo - reemplaza con tus proyectos reales
// Las URLs serán de Supabase: https://[PROJECT-ID].supabase.co/storage/v1/object/public/portfolio/video/...
const videos = [
    {
        id: 1,
        title: 'Documental Corto',
        category: 'Documental',
        duration: '5:30',
        description: 'Pieza documental sobre artesanos locales y sus tradiciones.',
        thumbnail: 'https://picsum.photos/seed/video1/600/400',
        url: 'https://example.com/video1.mp4' // Reemplazar con URL real de Supabase
    },
    {
        id: 2,
        title: 'Comercial TV',
        category: 'Publicidad',
        duration: '0:30',
        description: 'Spot publicitario para campaña de marca nacional.',
        thumbnail: 'https://picsum.photos/seed/video2/600/400',
        url: 'https://example.com/video2.mp4'
    },
    {
        id: 3,
        title: 'Video Musical',
        category: 'Música',
        duration: '3:45',
        description: 'Videoclip para artista emergente de música urbana.',
        thumbnail: 'https://picsum.photos/seed/video3/600/400',
        url: 'https://example.com/video3.mp4'
    },
    {
        id: 4,
        title: 'Corporativo',
        category: 'Corporativo',
        duration: '2:15',
        description: 'Video institucional para empresa tecnológica.',
        thumbnail: 'https://picsum.photos/seed/video4/600/400',
        url: 'https://example.com/video4.mp4'
    },
    {
        id: 5,
        title: 'Behind the Scenes',
        category: 'BTS',
        duration: '4:00',
        description: 'Detrás de cámaras de producción cinematográfica.',
        thumbnail: 'https://picsum.photos/seed/video5/600/400',
        url: 'https://example.com/video5.mp4'
    },
    {
        id: 6,
        title: 'Motion Graphics',
        category: 'Animación',
        duration: '1:00',
        description: 'Piezas de motion graphics para redes sociales.',
        thumbnail: 'https://picsum.photos/seed/video6/600/400',
        url: 'https://example.com/video6.mp4'
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
        opacity: 1, 
        scale: 1,
        transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
};

const Video = () => {
    const [activeVideo, setActiveVideo] = useState(null);

    return (
        <PageWrapper title="Video">
            <motion.div
                className="video-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {videos.map((video) => (
                    <motion.article
                        key={video.id}
                        className="video-card"
                        variants={itemVariants}
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        onClick={() => setActiveVideo(video)}
                    >
                        <div className="video-thumbnail">
                            <img 
                                src={video.thumbnail} 
                                alt={video.title}
                                loading="lazy"
                            />
                            <div className="video-play-overlay">
                                <div className="video-play-button">
                                    <i className="fi fi-rr-play"></i>
                                </div>
                            </div>
                            <span className="video-duration">{video.duration}</span>
                            <span className="video-category-badge">{video.category}</span>
                        </div>
                        <div className="video-info">
                            <h3 className="video-title">{video.title}</h3>
                            <p className="video-description">{video.description}</p>
                        </div>
                    </motion.article>
                ))}
            </motion.div>

            {/* Modal de Video */}
            <AnimatePresence>
                {activeVideo && (
                    <motion.div
                        className="video-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveVideo(null)}
                    >
                        <motion.div
                            className="video-modal-content"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                className="video-modal-close" 
                                onClick={() => setActiveVideo(null)}
                            >
                                <i className="fi fi-rr-cross"></i>
                            </button>
                            <video 
                                controls 
                                autoPlay 
                                src={activeVideo.url}
                                className="video-modal-player"
                            >
                                Tu navegador no soporta el elemento video.
                            </video>
                            <div className="video-modal-info">
                                <h3>{activeVideo.title}</h3>
                                <span className="video-modal-category">{activeVideo.category}</span>
                                <p>{activeVideo.description}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </PageWrapper>
    );
};

export default Video;