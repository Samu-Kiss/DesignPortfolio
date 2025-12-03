// src/pages/Diseno.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import useModal from '../hooks/useModal';
import NavbarInternal from '../components/NavbarInternal';

// Datos de ejemplo - reemplaza con tus proyectos reales
const projects = [
    {
        id: 1,
        title: 'Identidad Visual',
        category: 'Branding',
        client: 'Startup Tech',
        description: 'Desarrollo completo de marca incluyendo logo, paleta de colores y aplicaciones.',
        images: [
            'https://picsum.photos/seed/diseno1a/800/600',
            'https://picsum.photos/seed/diseno1b/800/600',
            'https://picsum.photos/seed/diseno1c/800/600'
        ],
        tags: ['Logo', 'Brand Guidelines', 'Papelería']
    },
    {
        id: 2,
        title: 'Packaging Producto',
        category: 'Packaging',
        client: 'Café Artesanal',
        description: 'Diseño de empaque para línea premium de café de origen.',
        images: [
            'https://picsum.photos/seed/diseno2a/800/600',
            'https://picsum.photos/seed/diseno2b/800/600'
        ],
        tags: ['Packaging', 'Ilustración', 'Print']
    },
    {
        id: 3,
        title: 'Campaña Publicitaria',
        category: 'Publicidad',
        client: 'Marca de Moda',
        description: 'Piezas gráficas para campaña de temporada en medios digitales e impresos.',
        images: [
            'https://picsum.photos/seed/diseno3a/800/600',
            'https://picsum.photos/seed/diseno3b/800/600',
            'https://picsum.photos/seed/diseno3c/800/600',
            'https://picsum.photos/seed/diseno3d/800/600'
        ],
        tags: ['Digital', 'Print', 'Social Media']
    },
    {
        id: 4,
        title: 'Editorial Magazine',
        category: 'Editorial',
        client: 'Revista Cultural',
        description: 'Diseño editorial para revista trimestral de arte y cultura.',
        images: [
            'https://picsum.photos/seed/diseno4a/800/600',
            'https://picsum.photos/seed/diseno4b/800/600'
        ],
        tags: ['Editorial', 'Tipografía', 'Layout']
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
    const [selectedProject, setSelectedProject] = useState(null);
    
    // Hook para cerrar modal con Escape
    const closeProject = useCallback(() => {
        setSelectedProject(null);
    }, []);
    
    useModal(!!selectedProject, closeProject);

    const handleBack = (e) => {
        e.preventDefault();
        navigate('/');
    };

    const openProject = (project) => {
        setSelectedProject(project);
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

            {/* Projects List */}
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
                        onClick={() => openProject(project)}
                    >
                        <div className="diseno-project-image">
                            <img 
                                src={project.images[0]} 
                                alt={project.title}
                                loading="lazy"
                            />
                            <div className="diseno-project-overlay">
                                <span className="diseno-view-btn">Ver proyecto</span>
                            </div>
                        </div>
                        
                        <div className="diseno-project-info">
                            <span className="diseno-project-category">{project.category}</span>
                            <h3 className="diseno-project-title">{project.title}</h3>
                            <p className="diseno-project-client">{project.client}</p>
                            <div className="diseno-project-tags">
                                {project.tags.map((tag, i) => (
                                    <span key={i} className="diseno-tag">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </motion.article>
                ))}
            </motion.section>

            {/* Modal de proyecto */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className="diseno-modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeProject}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="diseno-modal-title"
                    >
                        <motion.div
                            className="diseno-modal-content"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                className="diseno-modal-close" 
                                onClick={closeProject}
                                aria-label="Cerrar proyecto"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 6L6 18M6 6l12 12"/>
                                </svg>
                            </button>
                            
                            <div className="diseno-modal-header">
                                <span className="diseno-modal-category">{selectedProject.category}</span>
                                <h2 id="diseno-modal-title" className="diseno-modal-title">{selectedProject.title}</h2>
                                <p className="diseno-modal-client">{selectedProject.client}</p>
                            </div>
                            
                            <div className="diseno-modal-gallery">
                                {selectedProject.images.map((img, i) => (
                                    <img key={i} src={img} alt={`${selectedProject.title} ${i + 1}`} />
                                ))}
                            </div>
                            
                            <div className="diseno-modal-footer">
                                <p className="diseno-modal-description">{selectedProject.description}</p>
                                <div className="diseno-modal-tags">
                                    {selectedProject.tags.map((tag, i) => (
                                        <span key={i} className="diseno-tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Diseno;