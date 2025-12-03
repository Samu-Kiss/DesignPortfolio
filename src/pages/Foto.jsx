// src/pages/Foto.jsx
import React from 'react';
import { motion } from 'motion/react';
import PageWrapper from '../components/shared/PageWrapper';

// Datos de ejemplo - reemplaza con tus proyectos reales
// Las URLs serán de Supabase: https://[PROJECT-ID].supabase.co/storage/v1/object/public/portfolio/foto/...
const photos = [
    {
        id: 1,
        title: 'Retrato Urbano',
        location: 'Bogotá, Colombia',
        date: '2024',
        image: 'https://picsum.photos/seed/foto1/400/400'
    },
    {
        id: 2,
        title: 'Paisaje Natural',
        location: 'Villa de Leyva',
        date: '2024',
        image: 'https://picsum.photos/seed/foto2/400/400'
    },
    {
        id: 3,
        title: 'Arquitectura Colonial',
        location: 'Cartagena',
        date: '2023',
        image: 'https://picsum.photos/seed/foto3/400/400'
    },
    {
        id: 4,
        title: 'Street Photography',
        location: 'Medellín',
        date: '2024',
        image: 'https://picsum.photos/seed/foto4/400/400'
    },
    {
        id: 5,
        title: 'Producto Editorial',
        location: 'Estudio',
        date: '2024',
        image: 'https://picsum.photos/seed/foto5/400/400'
    },
    {
        id: 6,
        title: 'Evento Social',
        location: 'Bogotá',
        date: '2023',
        image: 'https://picsum.photos/seed/foto6/400/400'
    },
    {
        id: 7,
        title: 'Moda Editorial',
        location: 'Estudio',
        date: '2024',
        image: 'https://picsum.photos/seed/foto7/400/400'
    },
    {
        id: 8,
        title: 'Naturaleza',
        location: 'Amazonas',
        date: '2023',
        image: 'https://picsum.photos/seed/foto8/400/400'
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.3
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, rotate: 0 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { type: 'spring', stiffness: 200, damping: 20 }
    }
};

const Foto = () => {
    return (
        <PageWrapper title="Foto">
            <motion.div
                className="polaroid-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {photos.map((photo, index) => (
                    <motion.article
                        key={photo.id}
                        className="polaroid"
                        variants={itemVariants}
                        style={{
                            '--rotation': `${(index % 5 - 2) * 2}deg`
                        }}
                        whileHover={{ 
                            rotate: 0, 
                            scale: 1.05,
                            zIndex: 10,
                            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                        <div className="polaroid-image">
                            <img 
                                src={photo.image} 
                                alt={photo.title}
                                loading="lazy"
                            />
                        </div>
                        <div className="polaroid-caption">
                            <p className="polaroid-title">{photo.title}</p>
                            <span className="polaroid-meta">
                                {photo.location} • {photo.date}
                            </span>
                        </div>
                    </motion.article>
                ))}
            </motion.div>
        </PageWrapper>
    );
};

export default Foto;