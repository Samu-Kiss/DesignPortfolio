// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('⚠️ Faltan las variables de entorno de Supabase');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helpers para el storage (bucket de imágenes/videos)
export const getPublicUrl = (bucket, path) => {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
};

// Helper para listar archivos de un bucket
export const listFiles = async (bucket, folder = '') => {
    const { data, error } = await supabase.storage
        .from(bucket)
        .list(folder, {
            limit: 100,
            sortBy: { column: 'name', order: 'asc' }
        });
    
    if (error) {
        console.error('Error listando archivos:', error);
        return [];
    }
    return data;
};
