'use strict';

// Bump VERSION whenever an essential asset changes. A new worker waits until every
// old game tab closes: no skipWaiting, forced reload, or interruption of a live run.
const VERSION = 'v8';
const CACHE_PREFIX = `coin-dodge:${self.registration.scope}:`;
const CACHE_NAME = CACHE_PREFIX + VERSION;
const ESSENTIAL_ASSETS = [
  './', './index.html', './manifest.webmanifest',
  './icons/icon.svg', './icons/icon-192.png', './icons/icon-512.png'
].map(path => new URL(path, self.registration.scope).href);

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache =>
    cache.addAll(ESSENTIAL_ASSETS.map(url => new Request(url, { cache: 'reload' })))
  ));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME).map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  url.search = '';
  // Only our precached URLs are intercepted; other apps and requests are untouched.
  if (!ESSENTIAL_ASSETS.includes(url.href)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(url.href);
    return cached || fetch(event.request);
  })());
});
