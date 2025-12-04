// src/components/SEO.jsx
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
    title = 'Samu Pico | Portafolio',
    description = 'Diseñador y productor audiovisual en Bogotá, Colombia. Especializado en redes sociales, diseño gráfico, video y fotografía.',
    image = '/og-image.jpg',
    url = 'https://samupico.com',
    type = 'website'
}) => {
    const fullTitle = title === 'Samu Pico | Portafolio' ? title : `${title} | Samu Pico`;
    
    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="title" content={fullTitle} />
            <meta name="description" content={description} />
            <meta name="author" content="Samuel Pico" />
            <meta name="keywords" content="diseño gráfico, producción audiovisual, redes sociales, fotografía, video, Bogotá, Colombia, portafolio, creativo" />
            
            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:locale" content="es_CO" />
            <meta property="og:site_name" content="Samu Pico" />
            
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            
            {/* Canonical */}
            <link rel="canonical" href={url} />
        </Helmet>
    );
};

export default SEO;
