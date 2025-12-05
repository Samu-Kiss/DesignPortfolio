// src/pages/Proyecto.jsx
import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import CaseStudy from '../components/CaseStudy';
import { useProject, useStorageFolders } from '../hooks/useSupabaseStorage';
import { useLanguage } from '../context/LanguageContext';
import './Proyecto/Proyecto.css';

const Proyecto = () => {
    const { section, projectId } = useParams();
    const navigate = useNavigate();
    const { language } = useLanguage();
    const { project, loading, error } = useProject(section, projectId);
    const { folders } = useStorageFolders(section);

    // Mapear sección a tipo para CaseStudy
    const typeMap = {
        'redes': 'design',
        'diseno': 'design',
        'video': 'video',
        'foto': 'photo'
    };

    // Formatear nombre del proyecto (quitar guiones/guiones bajos)
    const formatName = (name) => {
        return name
            .replace(/-/g, ' ')
            .replace(/_/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
    };

    // Calcular siguiente proyecto
    const nextProject = useMemo(() => {
        if (!folders.length || !projectId) return null;
        
        const currentIndex = folders.findIndex(f => f.name === projectId);
        const nextIndex = (currentIndex + 1) % folders.length;
        const next = folders[nextIndex];
        
        if (next && next.name !== projectId) {
            return {
                title: formatName(next.name),
                path: `/proyecto/${section}/${next.name}`
            };
        }
        return null;
    }, [folders, projectId, section]);

    // Transformar datos de Supabase al formato de CaseStudy
    const projectData = useMemo(() => {
        if (!project) return null;

        const images = project.images || [];
        
        // Buscar bannerImage del info.json o usar fallback
        let bannerImage = null;
        let bannerVideo = null;
        
        if (project.bannerImage) {
            const banner = images.find(img => img.name.toLowerCase() === project.bannerImage.toLowerCase());
            if (banner) {
                if (banner.name.endsWith('.mp4') || banner.name.endsWith('.webm')) {
                    bannerVideo = banner.url;
                } else {
                    bannerImage = banner.url;
                }
            }
        }
        
        // Fallback: buscar por nombre hero/cover/portada
        if (!bannerImage && !bannerVideo) {
            const heroImg = images.find(img => 
                img.name.toLowerCase().includes('hero') || 
                img.name.toLowerCase().includes('banner') ||
                img.name.toLowerCase().includes('portada')
            );
            if (heroImg) {
                if (heroImg.name.endsWith('.mp4') || heroImg.name.endsWith('.webm')) {
                    bannerVideo = heroImg.url;
                } else {
                    bannerImage = heroImg.url;
                }
            } else if (images[0]) {
                bannerImage = images[0].url;
            }
        }

        // Nombres a excluir de la galería
        const excludeNames = ['info.json'];
        if (project.coverImage) excludeNames.push(project.coverImage.toLowerCase());
        if (project.bannerImage) excludeNames.push(project.bannerImage.toLowerCase());
        
        // Galería (todas las imágenes excepto cover, banner, hero)
        const gallery = images
            .filter(img => {
                const name = img.name.toLowerCase();
                return !excludeNames.includes(name) && 
                       !name.includes('hero') && 
                       !name.includes('banner') &&
                       !name.includes('cover');
            })
            .map(img => ({
                type: img.name.endsWith('.mp4') || img.name.endsWith('.webm') ? 'video' : 'image',
                src: img.url,
                alt: formatName(img.name.replace(/\.[^/.]+$/, ''))
            }));

        // Datos base del proyecto
        const baseData = {
            title: project.title || formatName(project.name),
            category: project.category || formatName(section),
            tagline: project.tagline || (language === 'es' ? 'Proyecto de portafolio' : 'Portfolio project'),
            heroImage: bannerVideo ? null : bannerImage,
            heroVideo: bannerVideo,
            gallery: gallery.length > 0 ? gallery : null,
            nextProject
        };

        // Agregar campos opcionales del info.json si existen
        if (project.client) baseData.client = project.client;
        if (project.year) baseData.year = project.year;
        if (project.duration) baseData.duration = project.duration;
        if (project.role) baseData.role = project.role;
        if (project.overview) baseData.overview = project.overview;
        if (project.challenge) baseData.challenge = project.challenge;
        if (project.process) baseData.process = project.process;
        if (project.solution) baseData.solution = project.solution;
        if (project.results) baseData.results = project.results;
        if (project.tools) baseData.tools = project.tools;
        
        // Imágenes específicas de secciones
        if (project.challengeImage) {
            const challengeImg = images.find(img => img.name.toLowerCase().includes(project.challengeImage));
            if (challengeImg) baseData.challengeImage = challengeImg.url;
        }
        if (project.solutionImage) {
            const solutionImg = images.find(img => img.name.toLowerCase().includes(project.solutionImage));
            if (solutionImg) baseData.solutionImage = solutionImg.url;
        }

        return baseData;
    }, [project, section, language, nextProject]);

    // Loading state
    if (loading) {
        return (
            <motion.div 
                className="proyecto-loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>{language === 'es' ? 'Cargando proyecto...' : 'Loading project...'}</p>
                </div>
            </motion.div>
        );
    }

    // Error state
    if (error || !projectData) {
        return (
            <motion.div 
                className="proyecto-error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div className="error-container">
                    <h2>{language === 'es' ? 'Proyecto no encontrado' : 'Project not found'}</h2>
                    <p>{error || (language === 'es' ? 'No se pudo cargar el proyecto' : 'Could not load project')}</p>
                    <button 
                        onClick={() => navigate(`/${section}`)}
                        className="error-back-btn"
                    >
                        {language === 'es' ? 'Volver' : 'Go back'}
                    </button>
                </div>
            </motion.div>
        );
    }

    return (
        <CaseStudy 
            project={projectData}
            type={typeMap[section] || 'design'}
        />
    );
};

export default Proyecto;
