// src/lib/supabase.js
import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const endpoint = import.meta.env.VITE_R2_ENDPOINT;
const accessKeyId = import.meta.env.VITE_R2_ACCESS_KEY_ID;
const secretAccessKey = import.meta.env.VITE_R2_SECRET_ACCESS_KEY;
export const BUCKET_NAME = import.meta.env.VITE_R2_BUCKET || 'Portfolio';
const publicBase = (import.meta.env.VITE_R2_PUBLIC_BASE_URL || endpoint || '').replace(/\/$/, '');
const forceSigned = (import.meta.env.VITE_R2_FORCE_SIGNED || 'true').toLowerCase() === 'true';

if (!endpoint || !accessKeyId || !secretAccessKey) {
    console.error('⚠️ Faltan variables de entorno para R2 (VITE_R2_ENDPOINT, VITE_R2_ACCESS_KEY_ID, VITE_R2_SECRET_ACCESS_KEY)');
}

// Cliente S3 apuntando a R2
export const r2Client = new S3Client({
    region: 'auto',
    endpoint,
    credentials: { accessKeyId, secretAccessKey },
    forcePathStyle: true
});

// Construir URL pública (bucket ya está mapeado en el endpoint)
// Si publicBase ya apunta al bucket (recomendado), no agregamos bucket nuevamente
export const getObjectUrl = async (path, expiresIn = 900) => {
    const cleanPath = path?.replace(/^\//, '') || '';
    // Si no se fuerza firmado y hay base pública, usarla
    if (!forceSigned && publicBase) {
        const baseHasBucket = publicBase.toLowerCase().includes(`/${BUCKET_NAME.toLowerCase()}`);
        const pathHasBucket = cleanPath.toLowerCase().startsWith(`${BUCKET_NAME.toLowerCase()}/`);
        const publicUrl = (baseHasBucket || pathHasBucket)
            ? `${publicBase}/${cleanPath}`
            : `${publicBase}/${BUCKET_NAME}/${cleanPath}`;
        return publicUrl;
    }

    // Si es privado, generamos URL firmada
    const command = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: cleanPath
    });
    try {
        return await getSignedUrl(r2Client, command, { expiresIn });
    } catch (error) {
        console.error('Error generando URL firmada:', error);
        return null;
    }
};

// Compat: versión síncrona para cuando hay base pública; si no, retorna una Promise firmada
export const getPublicUrl = (bucket, path) => {
    const cleanPath = path?.replace(/^\//, '') || '';
    if (!forceSigned && publicBase) {
        const baseHasBucket = publicBase.toLowerCase().includes(`/${BUCKET_NAME.toLowerCase()}`);
        const pathHasBucket = cleanPath.toLowerCase().startsWith(`${BUCKET_NAME.toLowerCase()}/`);
        return (baseHasBucket || pathHasBucket)
            ? `${publicBase}/${cleanPath}`
            : `${publicBase}/${BUCKET_NAME}/${cleanPath}`;
    }
    // sin base pública, devolvemos la Promise de la URL firmada (caller puede await)
    return getObjectUrl(cleanPath);
};

// Listar sólo el primer nivel de un prefijo
export const listPrefix = async (bucket, prefix = '') => {
    const normalizedPrefix = prefix ? `${prefix.replace(/\/$/, '')}/` : '';
    const command = new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: normalizedPrefix || undefined,
        Delimiter: '/'
    });

    try {
        const result = await r2Client.send(command);
        const folders = (result.CommonPrefixes || []).map(({ Prefix }) => ({
            id: null, // compat con Supabase folders
            name: Prefix.replace(normalizedPrefix, '').replace(/\/$/, '')
        }));

        const files = (result.Contents || [])
            .filter(({ Key }) => Key !== normalizedPrefix) // excluir la carpeta como objeto
            .map(({ Key, LastModified, Size }) => ({
                id: Key,
                name: Key.replace(normalizedPrefix, ''),
                created_at: LastModified,
                updated_at: LastModified,
                metadata: { size: Size }
            }));

        return { folders, files };
    } catch (error) {
        console.error('Error listando prefijo en R2:', error);
        return { folders: [], files: [] };
    }
};
