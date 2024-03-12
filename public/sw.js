importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

const VERSION = "v1";

const CACHE_NAME = `candy-app-${VERSION}`;

const filesToCache = [
    '/',
    '/index.html',
    '/public/manifest.json',
  ];

  self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
            .catch(error => {
                console.error('Fetch error:', error);
                throw error;
            })
    );
});