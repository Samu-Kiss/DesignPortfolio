// src/pages/Video.jsx
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import NavbarInternal from '../components/NavbarInternal';
import VideoEmbed from '../components/shared/VideoEmbed';
import { useVideosJson } from '../hooks/useSupabaseStorage';
import './Video/Video.css';

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
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
    }
};

const Video = () => {
    const navigate = useNavigate();
    const { videos, loading, error } = useVideosJson();
    const [selectedVideo, setSelectedVideo] = useState(null);

    const handleBack = (e) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <motion.div 
            className="page-video"
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
                    <h4 className="project-page-subtitle">Producción y edición de</h4>
                    <h1 className="project-page-title">
                        <span className="luxurious">V</span>
                        <span className="lexend">IDE</span>
                        <span className="luxurious">O</span>
                    </h1>
                </motion.div>

                <div className="project-header-line"></div>
            </header>

            {/* Loading state */}
            {loading && (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Cargando videos...</p>
                </div>
            )}

            {/* Error state */}
            {error && (
                <div className="error-container">
                    <p>Error al cargar: {error}</p>
                </div>
            )}

            {/* Empty state */}
            {!loading && !error && videos.length === 0 && (
                <div className="empty-container">
                    <p>No hay videos disponibles</p>
                </div>
            )}

            {/* Video Grid */}
            {!loading && !error && videos.length > 0 && (
                <motion.section 
                    className="video-grid-new"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {videos.map((video) => (
                        <motion.article
                            key={video.id}
                            className="video-card-new"
                            variants={itemVariants}
                            onClick={() => setSelectedVideo(video)}
                        >
                            <div className="video-card-thumbnail">
                                <img 
                                    src={video.thumbnail} 
                                    alt={video.title}
                                    loading="lazy"
                                />
                                <div className="video-card-overlay">
                                    <div className="video-card-play">
                                        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                            <path d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="video-card-info">
                                {video.category && (
                                    <span className="video-card-category">{video.category}</span>
                                )}
                                <h3 className="video-card-title">{video.title}</h3>
                                {video.client && (
                                    <span className="video-card-client">{video.client}</span>
                                )}
                            </div>
                        </motion.article>
                    ))}
                </motion.section>
            )}

            {/* Video Modal */}
            <VideoEmbed 
                video={selectedVideo}
                isOpen={!!selectedVideo}
                onClose={() => setSelectedVideo(null)}
            />
        </motion.div>
    );
};

export default Video;
