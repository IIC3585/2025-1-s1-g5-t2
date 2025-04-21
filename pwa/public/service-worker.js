const CACHE_NAME = 'app-cache-v1';
const urlsToCache = [
  '/', // Página principal
  '/index.html', // Archivo HTML principal
  '/src/index.css', // Estilos
  '/src/App.css', // Estilos de la app
  '/vite.svg', // Ícono
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