// src/components/shared/PhotoGallery.jsx
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
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
        img.onerror = () => resolve();
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
    
    // Refs para evitar problemas de closures stale
    const currentIndexRef = useRef(currentIndex);
    const touchStartRef = useRef({ x: 0, y: 0 });
    const scrollCooldownRef = useRef(false);
    
    // Mantener ref sincronizado
    useEffect(() => {
        currentIndexRef.current = currentIndex;
    }, [currentIndex]);

    // Reset index cuando se abre
    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(initialIndex);
            currentIndexRef.current = initialIndex;
            setIsLoading(true);
        }
    }, [isOpen, initialIndex]);

    // Precargar imagen actual y adyacentes
    useEffect(() => {
        if (!isOpen || !images.length) return;
        
        const idx = currentIndex;
        const toPreload = [idx];
        if (idx + 1 < images.length) toPreload.push(idx + 1);
        if (idx - 1 >= 0) toPreload.push(idx - 1);
        
        toPreload.forEach(i => preloadImage(images[i]));
    }, [isOpen, currentIndex, images]);

    // Funciones de navegación usando refs
    const goNext = () => {
        const idx = currentIndexRef.current;
        if (idx < images.length - 1) {
            setIsLoading(true);
            setCurrentIndex(idx + 1);
            currentIndexRef.current = idx + 1;
        } else {
            onClose();
        }
    };

    const goPrev = () => {
        const idx = currentIndexRef.current;
        if (idx > 0) {
            setIsLoading(true);
            setCurrentIndex(idx - 1);
            currentIndexRef.current = idx - 1;
        }
    };

    // Event listeners
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                goPrev();
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                goNext();
            } else if (e.key === 'Escape') {
                onClose();
            }
        };

        const handleWheel = (e) => {
            e.preventDefault();
            if (scrollCooldownRef.current) return;
            
            scrollCooldownRef.current = true;
            setTimeout(() => { scrollCooldownRef.current = false; }, 250);
            
            if (e.deltaY > 0) {
                goNext();
            } else if (e.deltaY < 0) {
                goPrev();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('wheel', handleWheel, { passive: false });
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('wheel', handleWheel);
            document.body.style.overflow = '';
        };
    }, [isOpen, images.length, onClose]);

    // Touch handlers
    const handleTouchStart = (e) => {
        touchStartRef.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
    };

    const handleTouchEnd = (e) => {
        const startX = touchStartRef.current.x;
        const startY = touchStartRef.current.y;
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        
        const diffX = startX - endX;
        const diffY = startY - endY;
        const threshold = 40;

        // Horizontal tiene prioridad
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                goNext();
            } else {
                goPrev();
            }
        } else if (Math.abs(diffY) > threshold) {
            if (diffY > 0) {
                goNext();
            } else {
                goPrev();
            }
        }
    };

    if (!images.length || !isOpen) return null;

    // Usar portal para renderizar fuera del árbol de componentes
    // Esto evita problemas con transforms de padres que rompen position: fixed
    return createPortal(
        <div
            className="photo-gallery-overlay"
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
                            onClick={(e) => { e.stopPropagation(); goPrev(); }}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>
                    )}
                    <button 
                        className="photo-gallery-nav photo-gallery-next"
                        onClick={(e) => { e.stopPropagation(); goNext(); }}
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
        </div>,
        document.body
    );
};

export default PhotoGallery;
