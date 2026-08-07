const CACHE_NAME = 'gmail-clone-v56';
const urlsToCache = [
  './',
  './index.html',
  './index_v38.css?v=3',
  './advanced_features.css?v=7',
  './app_v42.js?v=4',
  './icon-192.png',
  './icon-512.png',
  './manifest.json',
  './pwa.js?v=10'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// NETWORK FIRST - always try network, fall back to cache
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // If we got a valid response, cache it and return
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(event.request).then(response => {
          return response || caches.match('./index.html');
        });
      })
  );
});
