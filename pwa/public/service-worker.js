const CACHE_NAME = 'app-cache-v1';
const BASE_PATH = '/2025-1-s1-g5-t2';

const urlsToCache = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/vite.svg`,
  `${BASE_PATH}/manifest.json`,
  `${BASE_PATH}/src/index.css`,      // si es necesario
  `${BASE_PATH}/src/App.css`,        // si es necesario
];

// Evento de instalación: Cachear los recursos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Evento de fetch: Interceptar solicitudes y servir desde la caché
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Evento de activación: Limpiar cachés antiguas
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