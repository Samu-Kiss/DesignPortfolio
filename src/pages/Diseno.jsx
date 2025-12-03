// src/pages/Diseno.jsx
import React from 'react';
import { motion } from 'motion/react';
import PageWrapper from '../components/shared/PageWrapper';

// Datos de ejemplo - reemplaza con tus proyectos reales
// Las URLs serán de Supabase: https://[PROJECT-ID].supabase.co/storage/v1/object/public/portfolio/diseno/...
const projects = [
    {
        id: 1,
        title: 'Identidad Visual',
        category: 'Branding',
        client: 'Startup Tech',
        description: 'Desarrollo completo de marca incluyendo logo, paleta de colores y aplicaciones.',
        image: 'https://picsum.photos/seed/diseno1/800/600',
        tags: ['Logo', 'Brand Guidelines', 'Papelería']
    },
    {
        id: 2,
        title: 'Packaging Producto',
        category: 'Packaging',
        client: 'Café Artesanal',
        description: 'Diseño de empaque para línea premium de café de origen.',
        image: 'https://picsum.photos/seed/diseno2/800/600',
        tags: ['Packaging', 'Ilustración', 'Print']
    },
    {
        id: 3,
        title: 'Campaña Publicitaria',
        category: 'Publicidad',
        client: 'Marca de Moda',
        description: 'Piezas gráficas para campaña de temporada en medios digitales e impresos.',
        image: 'https://picsum.photos/seed/diseno3/800/600',
        tags: ['Digital', 'Print', 'Social Media']
    },
    {
        id: 4,
        title: 'Editorial Magazine',
        category: 'Editorial',
        client: 'Revista Cultural',
        description: 'Diseño editorial para revista trimestral de arte y cultura.',
        image: 'https://picsum.photos/seed/diseno4/800/600',
        tags: ['Editorial', 'Tipografía', 'Layout']
    },
    {
        id: 5,
        title: 'UI/UX App Móvil',
        category: 'Digital',
        client: 'Fintech',
        description: 'Interfaz de usuario para aplicación de gestión financiera personal.',
        image: 'https://picsum.photos/seed/diseno5/800/600',
        tags: ['UI Design', 'UX', 'Prototipo']
    },
    {
        id: 6,
        title: 'Señalética Espacio',
        category: 'Ambiental',
        client: 'Centro Comercial',
        description: 'Sistema de señalización y wayfinding para espacio comercial.',
        image: 'https://picsum.photos/seed/diseno6/800/600',
        tags: ['Señalética', 'Environmental', '3D']
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { type: 'spring', stiffness: 200, damping: 20 }
    }
};

const Diseno = () => {
    return (
        <PageWrapper title="Diseño">
            <motion.div
                className="design-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {projects.map((project, index) => (
                    <motion.article
                        key={project.id}
                        className={`design-card ${index % 2 === 0 ? 'design-card--left' : 'design-card--right'}`}
                        variants={itemVariants}
                        whileHover={{ y: -10 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                        <div className="design-card-image">
                            <img 
                                src={project.image} 
                                alt={project.title}
                                loading="lazy"
                            />
                            <div className="design-card-overlay">
                                <span className="design-card-category">{project.category}</span>
                            </div>
                        </div>
                        <div className="design-card-content">
                            <h3 className="design-card-title">{project.title}</h3>
                            <p className="design-card-client">{project.client}</p>
                            <p className="design-card-description">{project.description}</p>
                            <div className="design-card-tags">
                                {project.tags.map((tag, i) => (
                                    <span key={i} className="design-tag">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </motion.article>
                ))}
            </motion.div>
        </PageWrapper>
    );
};

export default Diseno;