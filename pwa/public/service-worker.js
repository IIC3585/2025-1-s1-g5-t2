const CACHE_NAME = 'app-cache-v1';
const BASE_PATH = '/2025-1-s1-g5-t2';

const urlsToCache = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/icons/icon.png`,
  `${BASE_PATH}/manifest.json`
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch((error) => {
        console.error('[Service Worker] Falló cache.addAll. Detalles:', error);
        console.warn('[Service Worker] Verifica si las URLs existen realmente en producción:');
        urlsToCache.forEach(url => {
          fetch(url).then(res => {
            if (!res.ok) console.warn(`${url} devolvió ${res.status}`);
          }).catch(() => {
            console.warn(`${url} no se pudo acceder`);
          });
        });
      });
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});