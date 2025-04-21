import { openDB } from 'idb';

const DB_NAME = 'image-filter-db';
const STORE_NAME = 'images';

// Abrir o crear la base de datos
const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
    }
  },
});

// Guardar una imagen en IndexedDB
export async function saveImage(imageData: string) {
  const db = await dbPromise;
  await db.add(STORE_NAME, { data: imageData, timestamp: Date.now() });
  console.log('Imagen guardada en IndexedDB');
}

// Recuperar todas las imágenes de IndexedDB
export async function getImages() {
  const db = await dbPromise;
  return await db.getAll(STORE_NAME);
}