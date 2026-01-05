// src/hooks/useSupabaseStorage.js
import { useState, useEffect, useCallback } from 'react';
import { BUCKET_NAME, getObjectUrl, listPrefix } from '../lib/supabase';

// ==========================================
// IMAGE CACHE - Cache de imágenes en memoria
// ==========================================
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

// Precargar múltiples imágenes (exportar para uso externo)
export const preloadImages = async (images) => {
    if (!images || images.length === 0) return;
    await Promise.all(images.map(src => preloadImage(src)));
};

// Verificar si una imagen está en cache
export const isImageCached = (src) => imageCache.has(src);

// Hook para obtener archivos de una carpeta del bucket
export const useStorageFiles = (folder) => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFiles = async () => {
            setLoading(true);
            try {
                const { files } = await listPrefix(BUCKET_NAME, folder);

                const filesWithUrls = await Promise.all(
                    files
                        .filter(file => file.name !== '.emptyFolderPlaceholder')
                        .map(async (file) => ({
                            ...file,
                            url: await getObjectUrl(`${folder}/${file.name}`)
                        }))
                );

                setFiles(filesWithUrls);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching files:', err);
            } finally {
                setLoading(false);
            }
        };

        if (folder) {
            fetchFiles();
        }
    }, [folder]);

    return { files, loading, error };
};

// Hook para obtener todas las carpetas (proyectos) de una sección
export const useStorageFolders = (section) => {
    const [folders, setFolders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFolders = async () => {
            setLoading(true);
            try {
                const { folders } = await listPrefix(BUCKET_NAME, section);
                const folderList = folders;
                setFolders(folderList);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching folders:', err);
            } finally {
                setLoading(false);
            }
        };

        if (section) {
            fetchFolders();
        }
    }, [section]);

    return { folders, loading, error };
};

// Hook para obtener proyecto completo con todas sus imágenes e info.json
export const useProject = (section, projectName) => {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            setLoading(true);
            try {
                const folderPath = `${section}/${projectName}`;

                const { files } = await listPrefix(BUCKET_NAME, folderPath);

                const infoFile = files.find(file => file.name === 'info.json');
                const mediaFiles = files.filter(file => 
                    file.name !== '.emptyFolderPlaceholder' && 
                    file.name !== 'info.json'
                );

                // Cargar info.json si existe
                let info = {};
                if (infoFile) {
                    const infoUrl = await getObjectUrl(`${folderPath}/info.json`);
                    try {
                        const response = await fetch(infoUrl);
                        if (response.ok) {
                            info = await response.json();
                        }
                    } catch (e) {
                        console.warn('Could not load info.json:', e);
                    }
                }

                const images = await Promise.all(
                    mediaFiles.map(async (file) => ({
                        name: file.name,
                        url: await getObjectUrl(`${folderPath}/${file.name}`)
                    }))
                );

                setProject({
                    name: projectName,
                    images,
                    ...info  // Spread info.json data
                });
            } catch (err) {
                setError(err.message);
                console.error('Error fetching project:', err);
            } finally {
                setLoading(false);
            }
        };

        if (section && projectName) {
            fetchProject();
        }
    }, [section, projectName]);

    return { project, loading, error };
};

// Hook para cargar todos los proyectos de una sección con sus imágenes
export const useProjects = (section) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función para precargar imágenes de todos los proyectos (1 click de profundidad)
    const preloadAllProjectImages = useCallback((projectsList) => {
        // Precargar todas las imágenes de todos los proyectos en background
        const allImages = projectsList.flatMap(p => p.images || []);
        // Precargar en lotes para no saturar
        const batchSize = 5;
        const preloadBatch = async (startIdx) => {
            const batch = allImages.slice(startIdx, startIdx + batchSize);
            if (batch.length === 0) return;
            await preloadImages(batch);
            // Continuar con el siguiente lote después de un pequeño delay
            setTimeout(() => preloadBatch(startIdx + batchSize), 100);
        };
        // Iniciar preloading después de que la UI se renderice
        setTimeout(() => preloadBatch(0), 500);
    }, []);

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            try {
                // Primero obtener las carpetas (proyectos)
                const { folders } = await listPrefix(BUCKET_NAME, section);
                const projectFolders = folders;

                // Para cada carpeta, obtener sus archivos e info.json
                const projectsWithImages = await Promise.all(
                    projectFolders.map(async (folder) => {
                        const folderPath = `${section}/${folder.name}`;
                        const { files } = await listPrefix(BUCKET_NAME, folderPath);

                        // Filtrar archivos de imagen/video (excluir info.json y archivos ocultos)
                        const mediaFiles = files.filter(file => 
                            file.name !== '.emptyFolderPlaceholder' && 
                            file.name !== 'info.json' &&
                            !file.name.startsWith('.')
                        );

                        // FILTRAR CARPETAS VACÍAS - Si no hay archivos multimedia, retornar null
                        if (mediaFiles.length === 0) {
                            return null;
                        }

                        // Cargar info.json si existe
                        let info = {};
                        const hasInfoJson = files.some(f => f.name === 'info.json');
                        if (hasInfoJson) {
                            const infoUrl = await getObjectUrl(`${folderPath}/info.json`);
                            try {
                                const response = await fetch(infoUrl);
                                if (response.ok) {
                                    info = await response.json();
                                }
                            } catch (e) {
                                console.warn(`Could not load info.json for ${folder.name}:`, e);
                            }
                        }

                        const images = (await Promise.all(
                            mediaFiles.map(async (file) => await getObjectUrl(`${folderPath}/${file.name}`))
                        )).filter(url => url && url.startsWith('http'));

                        // Determinar imagen de cover para preview
                        let coverImage = images.length > 0 ? images[0] : null;
                        if (info.coverImage) {
                            // Buscar el archivo que coincida con coverImage (puede o no tener extensión)
                            const coverFile = mediaFiles.find(f => {
                                const fileName = f.name.toLowerCase();
                                const coverName = info.coverImage.toLowerCase();
                                return fileName === coverName || fileName.startsWith(coverName + '.');
                            });
                            if (coverFile) {
                                const url = await getObjectUrl(`${folderPath}/${coverFile.name}`);
                                if (url && url.startsWith('http')) {
                                    coverImage = url;
                                }
                            }
                        }

                        // Desestructurar info para evitar que coverImage del JSON sobrescriba la URL
                        const { coverImage: _, bannerImage: __, ...restInfo } = info;

                        return {
                            id: folder.name,
                            client: info.title || folder.name.replace(/-/g, ' ').replace(/_/g, ' '),
                            images,
                            coverImage,
                            hasInfoJson,
                            ...restInfo
                        };
                    })
                );

                // Filtrar proyectos nulos (carpetas vacías o con errores)
                const validProjects = projectsWithImages.filter(Boolean);
                setProjects(validProjects);

                // Precargar imágenes de cover primero, luego todas las demás
                const coverImages = validProjects.map(p => p.coverImage).filter(Boolean);
                await preloadImages(coverImages);
                
                // Precargar todas las imágenes en background (1 click de profundidad)
                preloadAllProjectImages(validProjects);

            } catch (err) {
                setError(err.message);
                console.error('Error fetching projects:', err);
            } finally {
                setLoading(false);
            }
        };

        if (section) {
            fetchProjects();
        }
    }, [section, preloadAllProjectImages]);

    return { projects, loading, error };
};

// Obtener información de YouTube via oEmbed (título, thumbnail, etc.)
const fetchYoutubeInfo = async (url) => {
    try {
        const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
        const response = await fetch(oembedUrl);
        if (!response.ok) return null;
        return await response.json();
    } catch {
        return null;
    }
};

// Hook para cargar videos desde un JSON en Supabase Storage
export const useVideosJson = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            setLoading(true);
            try {
                // El JSON está en la raíz del bucket o en una carpeta específica
                const jsonUrl = await getObjectUrl('video/videos.json');
                
                const response = await fetch(jsonUrl);
                if (!response.ok) {
                    throw new Error('No se pudo cargar el archivo de videos');
                }
                
                const data = await response.json();
                
                // Procesar videos: extraer info de YouTube si falta título o thumbnail
                const processedVideos = await Promise.all(
                    (data.videos || []).map(async (video) => {
                        const needsYoutubeInfo = !video.title || !video.thumbnail;
                        const youtubeId = getYoutubeId(video.videoUrl);
                        
                        // Si es YouTube y falta info, obtenerla via oEmbed
                        if (needsYoutubeInfo && youtubeId) {
                            const ytInfo = await fetchYoutubeInfo(video.videoUrl);
                            // Usar thumbnail del oEmbed o fallback a hqdefault
                            const ytThumbnail = ytInfo?.thumbnail_url || 
                                `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
                            return {
                                ...video,
                                title: video.title || ytInfo?.title || 'Sin título',
                                thumbnail: video.thumbnail || ytThumbnail
                            };
                        }
                        
                        // Fallback para YouTube sin oEmbed
                        if (!video.thumbnail && youtubeId) {
                            return {
                                ...video,
                                thumbnail: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
                            };
                        }
                        
                        return video;
                    })
                );
                
                setVideos(processedVideos);
                
                // Precargar thumbnails
                const thumbnails = processedVideos.map(v => v.thumbnail).filter(Boolean);
                await preloadImages(thumbnails);
                
            } catch (err) {
                setError(err.message);
                console.error('Error fetching videos JSON:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    return { videos, loading, error };
};

// Extraer ID de YouTube de una URL
const getYoutubeId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
};

// Obtener thumbnail de YouTube automáticamente
export const getYoutubeThumbnail = (url, quality = 'maxresdefault') => {
    const videoId = getYoutubeId(url);
    if (!videoId) return null;
    // Opciones: maxresdefault (1280x720), sddefault (640x480), hqdefault (480x360), mqdefault (320x180)
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
};

// Utilidad para extraer ID de video de YouTube o Vimeo y generar URL de embed
export const getVideoEmbedUrl = (url) => {
    if (!url) return null;
    
    // YouTube
    const youtubeId = getYoutubeId(url);
    if (youtubeId) {
        return `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;
    }
    
    // Vimeo
    const vimeoMatch = url.match(/(?:vimeo\.com\/)(\d+)/);
    if (vimeoMatch) {
        return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
    }
    
    return url; // Retornar URL original si no se reconoce
};

