// src/hooks/useSupabaseStorage.js
import { useState, useEffect } from 'react';
import { supabase, getPublicUrl } from '../lib/supabase';

const BUCKET = 'Portfolio';

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

                        // Filtrar archivos de imagen/video (excluir info.json y archivos ocultos)
                        const mediaFiles = files.filter(file => 
                            file.name !== '.emptyFolderPlaceholder' && 
                            file.name !== 'info.json' &&
                            !file.name.startsWith('.')
                        );

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

                setProjects(projectsWithImages.filter(Boolean));
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
    }, [section]);

    return { projects, loading, error };
};

// Exportar el nombre del bucket por si se necesita
export const BUCKET_NAME = BUCKET;
