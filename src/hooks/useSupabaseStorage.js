// src/hooks/useSupabaseStorage.js
import { useState, useEffect, useCallback } from 'react';
import { supabase, getPublicUrl } from '../lib/supabase';

const BUCKET = 'Portfolio';

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
                const { data, error } = await supabase.storage
                    .from(BUCKET)
                    .list(folder, {
                        limit: 100,
                        sortBy: { column: 'created_at', order: 'desc' }
                    });

                if (error) throw error;

                // Agregar URL pública a cada archivo
                const filesWithUrls = data
                    .filter(file => file.name !== '.emptyFolderPlaceholder')
                    .map(file => ({
                        ...file,
                        url: getPublicUrl(BUCKET, `${folder}/${file.name}`)
                    }));

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
                const { data, error } = await supabase.storage
                    .from(BUCKET)
                    .list(section, {
                        limit: 100,
                    });

                if (error) throw error;

                // Filtrar solo carpetas (no tienen metadata de archivo)
                const folderList = data.filter(item => item.id === null);
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
                
                // Obtener lista de archivos
                const { data, error } = await supabase.storage
                    .from(BUCKET)
                    .list(folderPath, {
                        limit: 100,
                        sortBy: { column: 'name', order: 'asc' }
                    });

                if (error) throw error;

                // Separar info.json de las imágenes/videos
                const infoFile = data.find(file => file.name === 'info.json');
                const mediaFiles = data.filter(file => 
                    file.name !== '.emptyFolderPlaceholder' && 
                    file.name !== 'info.json'
                );

                // Cargar info.json si existe
                let info = {};
                if (infoFile) {
                    const infoUrl = getPublicUrl(BUCKET, `${folderPath}/info.json`);
                    try {
                        const response = await fetch(infoUrl);
                        if (response.ok) {
                            info = await response.json();
                        }
                    } catch (e) {
                        console.warn('Could not load info.json:', e);
                    }
                }

                const images = mediaFiles.map(file => ({
                    name: file.name,
                    url: getPublicUrl(BUCKET, `${folderPath}/${file.name}`)
                }));

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
                const { data: folders, error: foldersError } = await supabase.storage
                    .from(BUCKET)
                    .list(section, { limit: 100 });

                if (foldersError) throw foldersError;

                // Filtrar solo carpetas
                const projectFolders = folders.filter(item => item.id === null);

                // Para cada carpeta, obtener sus archivos e info.json
                const projectsWithImages = await Promise.all(
                    projectFolders.map(async (folder) => {
                        const folderPath = `${section}/${folder.name}`;
                        const { data: files, error: filesError } = await supabase.storage
                            .from(BUCKET)
                            .list(folderPath, { limit: 100 });

                        if (filesError) {
                            console.error(`Error loading ${folder.name}:`, filesError);
                            return null;
                        }

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
                            const infoUrl = getPublicUrl(BUCKET, `${folderPath}/info.json`);
                            try {
                                const response = await fetch(infoUrl);
                                if (response.ok) {
                                    info = await response.json();
                                }
                            } catch (e) {
                                console.warn(`Could not load info.json for ${folder.name}:`, e);
                            }
                        }

                        const images = mediaFiles
                            .map(file => getPublicUrl(BUCKET, `${folderPath}/${file.name}`))
                            .filter(url => url && url.startsWith('http'));

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
                                const url = getPublicUrl(BUCKET, `${folderPath}/${coverFile.name}`);
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

// Exportar el nombre del bucket por si se necesita
export const BUCKET_NAME = BUCKET;
