// src/components/shared/VideoModal.jsx
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './VideoModal.css';

const VideoModal = ({ video, isOpen, onClose }) => {
    if (!isOpen || !video) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="video-modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="video-modal-content"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className="video-modal-close" onClick={onClose}>
                        <i className="fi fi-rr-cross"></i>
                    </button>
                    <video 
                        controls 
                        autoPlay 
                        src={video.url}
                        className="video-modal-player"
                    />
                    <div className="video-modal-info">
                        <h3>{video.title}</h3>
                        <p>{video.description}</p>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default VideoModal;
