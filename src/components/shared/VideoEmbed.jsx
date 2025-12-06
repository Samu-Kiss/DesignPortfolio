// src/components/shared/VideoEmbed.jsx
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { getVideoEmbedUrl } from '../../hooks/useSupabaseStorage';
import './VideoEmbed.css';

const VideoEmbed = ({ video, isOpen, onClose }) => {
    // Manejar ESC para cerrar
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !video) return null;

    const embedUrl = getVideoEmbedUrl(video.videoUrl);

    return createPortal(
        <div className="video-embed-overlay" onClick={onClose}>
            {/* Close button */}
            <button 
                className="video-embed-close" 
                onClick={(e) => { e.stopPropagation(); onClose(); }}
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                </svg>
            </button>

            {/* Video container */}
            <div 
                className="video-embed-content"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="video-embed-wrapper">
                    <iframe
                        src={embedUrl}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>
                
                {/* Video info */}
                <div className="video-embed-info">
                    {video.category && (
                        <span className="video-embed-category">{video.category}</span>
                    )}
                    <h3 className="video-embed-title">{video.title}</h3>
                    {video.client && (
                        <p className="video-embed-client">{video.client}</p>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default VideoEmbed;
