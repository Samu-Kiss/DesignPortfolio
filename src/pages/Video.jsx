// src/pages/Video.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';

// Datos de ejemplo - reemplaza con tus proyectos reales
const videos = [
    {
        id: 1,
        title: 'Documental Corto',
        tags: ['Documental', 'Storytelling'],
        duration: '5:30',
        year: '2024',
        thumbnail: 'https://picsum.photos/seed/video1/800/450',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
    },
    {
        id: 2,
        title: 'Comercial TV',
        tags: ['Publicidad', 'Branding'],
        duration: '0:30',
        year: '2024',
        thumbnail: 'https://picsum.photos/seed/video2/800/450',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
    },
    {
        id: 3,
        title: 'Video Musical',
        tags: ['Música', 'Creatividad'],
        duration: '3:45',
        year: '2024',
        thumbnail: 'https://picsum.photos/seed/video3/800/450',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
    },
    {
        id: 4,
        title: 'Corporativo',
        tags: ['Institucional', 'Empresarial'],
        duration: '2:15',
        year: '2023',
        thumbnail: 'https://picsum.photos/seed/video4/800/450',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
    },
    {
        id: 5,
        title: 'Behind the Scenes',
        tags: ['BTS', 'Producción'],
        duration: '4:00',
        year: '2023',
        thumbnail: 'https://picsum.photos/seed/video5/800/450',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
    },
    {
        id: 6,
        title: 'Motion Graphics',
        tags: ['Animación', 'Motion'],
        duration: '1:00',
        year: '2024',
        thumbnail: 'https://picsum.photos/seed/video6/800/450',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
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

// Componente Modal con Portal para centrar en viewport
const VideoModal = ({ video, onClose }) => {
    if (!video) return null;
    
    return ReactDOM.createPortal(
        <motion.div
            className="video-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
        >
            <motion.div
                className="video-modal-container"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                onClick={(e) => e.stopPropagation()}
            >
                <button className="video-modal-close" onClick={onClose}>
                    <i className="fi fi-rr-cross"></i>
                </button>
                
                <div className="video-modal-player-wrapper">
                    <video 
                        controls 
                        autoPlay
                        className="video-modal-player"
                    >
                        <source src={video.videoUrl} type="video/mp4" />
                        Tu navegador no soporta video.
                    </video>
                </div>
                
                <div className="video-modal-details">
                    <h2 className="video-modal-title">{video.title}</h2>
                    <div className="video-modal-tags">
                        {video.tags.map((tag, i) => (
                            <span key={i} className="video-modal-tag">{tag}</span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>,
        document.body
    );
};

const Video = () => {
    const [activeVideo, setActiveVideo] = useState(null);
    const navigate = useNavigate();

    const handleBack = (e) => {
        e.preventDefault();
        navigate('/');
    };

    const openVideo = (video) => {
        setActiveVideo(video);
        document.body.style.overflow = 'hidden';
    };

    const closeVideo = () => {
        setActiveVideo(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <motion.div 
            className="page-video"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {/* Header */}
            <header className="project-page-header">
                <button onClick={handleBack} className="project-back-btn">
                    <i className="fi fi-rr-arrow-left"></i>
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

            {/* Video Grid */}
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
                        onClick={() => openVideo(video)}
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
                            <span className="video-card-duration">{video.duration}</span>
                        </div>
                        
                        <div className="video-card-info">
                            <div className="video-card-meta">
                                <h3 className="video-card-title">{video.title}</h3>
                                <span className="video-card-year">{video.year}</span>
                            </div>
                            <div className="video-card-tags">
                                {video.tags.map((tag, i) => (
                                    <span key={i} className="video-card-tag">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </motion.article>
                ))}
            </motion.section>

            {/* Video Modal con Portal */}
            <AnimatePresence>
                {activeVideo && <VideoModal video={activeVideo} onClose={closeVideo} />}
            </AnimatePresence>
        </motion.div>
    );
};

export default Video;