// src/pages/Diseno.jsx
import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import NavbarInternal from '../components/NavbarInternal';
import { useProjects } from '../hooks/useSupabaseStorage';

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
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    }
};

const Diseno = () => {
    const navigate = useNavigate();
    const { projects, loading, error } = useProjects('diseno');

    const handleBack = (e) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <motion.div 
            className="page-diseno"
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
                        <span className="luxurious">D</span>
                        <span className="lexend">ISE</span>
                        <span className="luxurious">Ñ</span>
                        <span className="lexend">O</span>
                    </h1>
                </motion.div>

                <div className="project-header-line"></div>
            </header>

            {/* Loading state */}
            {loading && (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Cargando proyectos...</p>
                </div>
            )}

            {/* Error state */}
            {error && (
                <div className="error-container">
                    <p>Error al cargar: {error}</p>
                </div>
            )}

            {/* Projects List */}
            {!loading && !error && (
                <motion.section 
                    className="diseno-projects"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {projects.map((project, index) => (
                    <motion.article
                        key={project.id}
                        className={`diseno-project ${index % 2 === 0 ? 'diseno-project--left' : 'diseno-project--right'}`}
                        variants={itemVariants}
                        onClick={() => navigate(`/proyecto/diseno/${project.id}`)}
                    >
                        <div className="diseno-project-image">
                            <img 
                                src={project.coverImage || project.images[0]} 
                                alt={project.title || project.client}
                                loading="lazy"
                            />
                            <div className="diseno-project-overlay">
                                <span className="diseno-view-btn">Ver proyecto</span>
                            </div>
                        </div>
                        
                        <div className="diseno-project-info">
                            <h3 className="diseno-project-title">{project.client}</h3>
                            <p className="diseno-project-client">{project.images.length} imágenes</p>
                            <span className="diseno-view-link">Ver caso de estudio →</span>
                        </div>
                    </motion.article>
                ))}
                </motion.section>
            )}
        </motion.div>
    );
};

export default Diseno;