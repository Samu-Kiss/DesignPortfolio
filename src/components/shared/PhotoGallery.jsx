// src/components/shared/PhotoGallery.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './PhotoGallery.css';

// Cache de imágenes precargadas
const imageCache = new Map();

// Precargar una imagen y guardarla en cache
const preloadImage = (src) => {
    if (!src || imageCache.has(src)) return Promise.resolve();
    
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            imageCache.set(src, true);
            resolve();
        };
        img.onerror = () => resolve(); // No fallar si una imagen no carga
        img.src = src;
    });
};

// Precargar múltiples imágenes
export const preloadImages = async (images) => {
    if (!images || images.length === 0) return;
    await Promise.all(images.map(src => preloadImage(src)));
};

const PhotoGallery = ({ images, title, isOpen, onClose, initialIndex = 0 }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isLoading, setIsLoading] = useState(true);
    const [touchStart, setTouchStart] = useState(null);
    const [touchStartY, setTouchStartY] = useState(null);
    const [scrollCooldown, setScrollCooldown] = useState(false);

    // Reset index cuando se abre con nuevo initialIndex
    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(initialIndex);
            setIsLoading(true);
        }
    }, [isOpen, initialIndex]);

    // Precargar imagen actual y adyacentes
    useEffect(() => {
        if (!isOpen || !images.length) return;

        const preloadAdjacent = async () => {
            const indicesToPreload = [
                currentIndex,
                (currentIndex + 1) % images.length,
                (currentIndex - 1 + images.length) % images.length
            ];
            
            await Promise.all(
                indicesToPreload.map(idx => preloadImage(images[idx]))
            );
        };

        preloadAdjacent();
    }, [isOpen, currentIndex, images]);

    // Manejar teclas de navegación y scroll con rueda
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    goToPrevious();
                    break;
                case 'ArrowRight':
                case 'ArrowDown':
                    e.preventDefault();
                    handleNextOrClose();
                    break;
                case 'Escape':
                    onClose();
                    break;
                default:
                    break;
            }
        };

        const handleWheel = (e) => {
            e.preventDefault();
            if (scrollCooldown) return;
            
            // Activar cooldown para evitar scroll muy rápido
            setScrollCooldown(true);
            setTimeout(() => setScrollCooldown(false), 300);
            
            if (e.deltaY > 0) {
                // Scroll hacia abajo - siguiente imagen o cerrar
                handleNextOrClose();
            } else if (e.deltaY < 0) {
                // Scroll hacia arriba - imagen anterior
                goToPrevious();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('wheel', handleWheel, { passive: false });
        // Bloquear scroll del body
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('wheel', handleWheel);
            document.body.style.overflow = '';
        };
    }, [isOpen, currentIndex, images.length, scrollCooldown]);

    const goToNext = useCallback(() => {
        if (currentIndex < images.length - 1) {
            setIsLoading(true);
            setCurrentIndex((prev) => prev + 1);
        }
    }, [currentIndex, images.length]);

    const goToPrevious = useCallback(() => {
        if (currentIndex > 0) {
            setIsLoading(true);
            setCurrentIndex((prev) => prev - 1);
        }
    }, [currentIndex]);

    // Ir a siguiente o cerrar si es la última
    const handleNextOrClose = useCallback(() => {
        if (currentIndex >= images.length - 1) {
            onClose();
        } else {
            goToNext();
        }
    }, [currentIndex, images.length, onClose, goToNext]);

    // Touch handlers para swipe en móvil (horizontal y vertical)
    const handleTouchStart = (e) => {
        setTouchStart(e.touches[0].clientX);
        setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchEnd = (e) => {
        if (touchStart === null && touchStartY === null) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const diffX = touchStart - touchEndX;
        const diffY = touchStartY - touchEndY;

        // Determinar si es swipe horizontal o vertical
        if (Math.abs(diffX) > Math.abs(diffY)) {
            // Swipe horizontal
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    handleNextOrClose();
                } else {
                    goToPrevious();
                }
            }
        } else {
            // Swipe vertical
            if (Math.abs(diffY) > 50) {
                if (diffY > 0) {
                    // Swipe hacia arriba - siguiente o cerrar
                    handleNextOrClose();
                } else {
                    // Swipe hacia abajo - anterior
                    goToPrevious();
                }
            }
        }
        setTouchStart(null);
        setTouchStartY(null);
    };

    if (!images.length) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="photo-gallery-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={onClose}
                >
                    {/* Close button */}
                    <button 
                        className="photo-gallery-close" 
                        onClick={(e) => { e.stopPropagation(); onClose(); }}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Navigation buttons */}
                    {images.length > 1 && (
                        <>
                            {currentIndex > 0 && (
                                <button 
                                    className="photo-gallery-nav photo-gallery-prev"
                                    onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M15 18l-6-6 6-6" />
                                    </svg>
                                </button>
                            )}
                            <button 
                                className="photo-gallery-nav photo-gallery-next"
                                onClick={(e) => { e.stopPropagation(); handleNextOrClose(); }}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </>
                    )}

                    {/* Main image container */}
                    <div
                        className="photo-gallery-content"
                        onClick={(e) => e.stopPropagation()}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        {isLoading && (
                            <div className="photo-gallery-loader">
                                <div className="photo-gallery-spinner"></div>
                            </div>
                        )}
                        <img
                            key={currentIndex}
                            src={images[currentIndex]}
                            alt={`${title} - Foto ${currentIndex + 1}`}
                            className={`photo-gallery-image ${isLoading ? 'loading' : 'loaded'}`}
                            onLoad={() => setIsLoading(false)}
                            draggable={false}
                        />
                    </div>

                    {/* Footer info */}
                    <div className="photo-gallery-footer">
                        <span className="photo-gallery-title">{title}</span>
                        <span className="photo-gallery-counter">
                            {currentIndex + 1} / {images.length}
                        </span>
                    </div>

                    {/* Thumbnail strip */}
                    {images.length > 1 && images.length <= 20 && (
                        <div className="photo-gallery-thumbnails">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    className={`photo-gallery-thumb ${idx === currentIndex ? 'active' : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsLoading(true);
                                        setCurrentIndex(idx);
                                    }}
                                >
                                    <img src={img} alt="" loading="lazy" />
                                </button>
                            ))}
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PhotoGallery;
