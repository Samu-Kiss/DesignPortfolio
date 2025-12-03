// src/pages/Redes.jsx
import React from 'react';
import { motion } from 'motion/react';
import Masonry from 'react-masonry-css';
import PageWrapper from '../components/shared/PageWrapper';

// Datos de ejemplo - reemplaza con tus proyectos reales
// Las URLs serán de Supabase: https://[PROJECT-ID].supabase.co/storage/v1/object/public/portfolio/redes/...
const projects = [
    {
        id: 1,
        title: 'Campaña Instagram',
        platform: 'Instagram',
        client: 'Cliente Ejemplo',
        image: 'https://picsum.photos/seed/redes1/400/500',
        metrics: '+150% engagement'
    },
    {
        id: 2,
        title: 'Contenido TikTok',
        platform: 'TikTok',
        client: 'Marca XYZ',
        image: 'https://picsum.photos/seed/redes2/400/600',
        metrics: '500K views'
    },
    {
        id: 3,
        title: 'Feed Corporativo',
        platform: 'Instagram',
        client: 'Empresa ABC',
        image: 'https://picsum.photos/seed/redes3/400/400',
        metrics: '10K nuevos seguidores'
    },
    {
        id: 4,
        title: 'Stories Destacados',
        platform: 'Instagram',
        client: 'Restaurante Local',
        image: 'https://picsum.photos/seed/redes4/400/550',
        metrics: '+200% alcance'
    },
    {
        id: 5,
        title: 'Reels Virales',
        platform: 'Instagram',
        client: 'Startup Tech',
        image: 'https://picsum.photos/seed/redes5/400/480',
        metrics: '1M reproducciones'
    },
    {
        id: 6,
        title: 'Carrusel Educativo',
        platform: 'Instagram',
        client: 'Academia Online',
        image: 'https://picsum.photos/seed/redes6/400/520',
        metrics: '5K guardados'
    },
];

const breakpointColumns = {
    default: 4,
    1200: 3,
    900: 2,
    600: 1
};

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
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
};

const Redes = () => {
    return (
        <PageWrapper title="Redes">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <Masonry
                    breakpointCols={breakpointColumns}
                    className="masonry-grid"
                    columnClassName="masonry-column"
                >
                    {projects.map((project) => (
                        <motion.article
                            key={project.id}
                            className="masonry-item"
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        >
                            <img 
                                src={project.image} 
                                alt={project.title}
                                loading="lazy"
                            />
                            <div className="masonry-overlay">
                                <span className="masonry-platform">{project.platform}</span>
                                <h3 className="masonry-title">{project.title}</h3>
                                <p className="masonry-client">{project.client}</p>
                                <span className="masonry-metrics">{project.metrics}</span>
                            </div>
                        </motion.article>
                    ))}
                </Masonry>
            </motion.div>
        </PageWrapper>
    );
};

export default Redes;