// src/components/shared/ImageWithSkeleton.jsx
import React, { useState } from 'react';
import { motion } from 'motion/react';
import './ImageWithSkeleton.css';

const ImageWithSkeleton = ({ 
    src, 
    alt, 
    className = '', 
    aspectRatio = null,
    onClick = null 
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const handleError = () => {
        setHasError(true);
        setIsLoaded(true);
    };

    return (
        <div 
            className={`image-skeleton-wrapper ${className}`}
            style={aspectRatio ? { aspectRatio } : undefined}
            onClick={onClick}
        >
            {/* Skeleton loader */}
            {!isLoaded && (
                <div className="skeleton-loader">
                    <div className="skeleton-shimmer" />
                </div>
            )}
            
            {/* Actual image */}
            {!hasError ? (
                <motion.img
                    src={src}
                    alt={alt}
                    onLoad={handleLoad}
                    onError={handleError}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoaded ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    loading="lazy"
                />
            ) : (
                <div className="image-error">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <path d="M21 15l-5-5L5 21"/>
                    </svg>
                </div>
            )}
        </div>
    );
};

export default ImageWithSkeleton;
