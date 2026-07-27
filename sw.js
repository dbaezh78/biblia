const CACHE_NAME = 'biblia-digital-cache-v28';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './src/css/cssgral.css',
  './src/js/jsgral.js',
  './src/js/setting.js',
  './src/js/googlefirebase.js',
  './src/js/tiempoliturgico.js',
  './src/js/liturgia_data.js',
  './src/js/liturgia.js',
  './src/js/promesas.js',
  './src/js/annotation.js',
  './src/img/ico.ico',
  './src/img/icon-192.png',
  './src/img/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0'
];

// Instalar: precachear recursos base de la interfaz
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Precachando recursos esenciales');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activar: limpiar cachés obsoletos
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Eliminando caché obsoleto:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: servir desde caché y actualizar en background (Stale-While-Revalidate)
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  
  // Ignorar peticiones externas que no sean HTTP/HTTPS (por ejemplo, extensiones de Chrome)
  if (!url.protocol.startsWith('http')) return;
  
  // No interferir con las peticiones de Firebase/Firestore/Google Auth
  if (url.hostname.includes('firebase') || url.hostname.includes('firestore') || url.hostname.includes('googleapis')) {
    return;
  }

  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Devolver el recurso en caché inmediatamente, pero actualizar la caché en segundo plano
        fetch(e.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(e.request, networkResponse);
            });
          }
        }).catch(() => {
          // Ignorar errores de red en background al estar offline
        });
        return cachedResponse;
      }

      // Si el recurso no está en caché, buscarlo en la red y agregarlo a la caché dinámica si es de origen local
      return fetch(e.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        // Cachear dinámicamente archivos locales (como los JSON de libros o archivos estáticos no precacheados)
        const isLocalAsset = url.origin === self.location.origin;
        if (isLocalAsset) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseToCache);
          });
        }

        return networkResponse;
      }).catch((err) => {
        console.log('[Service Worker] Falló el fetch y no hay respuesta en caché:', err);
      });
    })
  );
});
