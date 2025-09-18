self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open('khg-fleet-v1').then(cache => cache.addAll([
      './',
      './index.html',
      './manifest.json',
      './icon-256.svg'
    ]))
  );
});
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
