// Ejemplo de cómo usar el componente CaseStudy
// Este archivo es solo documentación - no es necesario importarlo

/*
ESTRUCTURA DE DATOS PARA UN CASO DE ESTUDIO:

const projectData = {
    // Información básica (requerido)
    title: "Nombre del Proyecto",
    category: "Branding / Comercial / Documental / etc",
    tagline: "Una frase corta que describe el proyecto",
    
    // Hero (elige uno)
    heroImage: "/ruta/a/imagen-hero.jpg",
    heroVideo: "/ruta/a/video-hero.mp4",
    
    // Metadatos (todos opcionales)
    client: "Nombre del Cliente",
    year: "2024",
    duration: "3 semanas",
    role: "Director / Diseñador / Fotógrafo",
    
    // Contenido (todos opcionales)
    overview: "Descripción general del proyecto...",
    
    challenge: "Descripción del reto o problema a resolver...",
    challengeImage: "/ruta/a/imagen-reto.jpg",
    
    // Process puede ser string o array de pasos
    process: "Descripción del proceso...",
    // O:
    process: [
        {
            title: "Investigación",
            description: "Descripción del paso..."
        },
        {
            title: "Conceptualización",
            description: "Descripción del paso..."
        },
        {
            title: "Producción",
            description: "Descripción del paso..."
        }
    ],
    
    solution: "Descripción de la solución final...",
    solutionImage: "/ruta/a/imagen-solucion.jpg",
    
    // Galería de imágenes/videos
    gallery: [
        { type: "image", src: "/ruta/imagen1.jpg", alt: "Descripción", caption: "Pie de foto" },
        { type: "image", src: "/ruta/imagen2.jpg", alt: "Descripción" },
        { type: "video", src: "/ruta/video.mp4", caption: "Pie de video" }
    ],
    
    // Results puede ser string o array de estadísticas
    results: "Descripción de los resultados...",
    // O:
    results: [
        { value: "+150%", label: "Engagement" },
        { value: "50K", label: "Visualizaciones" },
        { value: "1er", label: "Lugar Festival" }
    ],
    
    // Herramientas usadas
    tools: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    
    // Navegación al siguiente proyecto (opcional)
    nextProject: {
        title: "Nombre Siguiente Proyecto",
        path: "/video/siguiente-proyecto"
    }
};

EJEMPLO DE USO EN UNA PÁGINA:

import CaseStudy from '../components/CaseStudy';

const MiProyecto = () => {
    const project = {
        title: "Documental Bogotá",
        category: "Documental",
        tagline: "Una mirada íntima a la ciudad",
        heroImage: "https://example.com/hero.jpg",
        client: "Canal Capital",
        year: "2024",
        duration: "2 meses",
        role: "Director y Editor",
        overview: "Este documental explora las calles de Bogotá...",
        challenge: "El reto principal fue capturar la esencia...",
        process: [
            { title: "Pre-producción", description: "Investigación y planificación..." },
            { title: "Rodaje", description: "15 días de grabación..." },
            { title: "Post-producción", description: "Edición y color grading..." }
        ],
        solution: "Creamos una narrativa visual que...",
        gallery: [
            { type: "image", src: "/img1.jpg", caption: "Escena principal" },
            { type: "video", src: "/trailer.mp4", caption: "Tráiler oficial" }
        ],
        results: [
            { value: "100K", label: "Vistas" },
            { value: "4.8", label: "Rating" }
        ],
        tools: ["Sony FX3", "Premiere Pro", "DaVinci Resolve"],
        nextProject: {
            title: "Comercial Nike",
            path: "/video/comercial-nike"
        }
    };

    return <CaseStudy project={project} type="video" />;
};

TIPOS DISPONIBLES:
- "video" (redirige a /video)
- "design" (redirige a /diseno)  
- "photo" (redirige a /foto)

*/
