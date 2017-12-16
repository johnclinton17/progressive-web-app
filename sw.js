var cacheName = 'pwa-commits-v3';

var filesToCache = [
    './',
    './css/style.css',
    './images/books.png',
    './images/push-off.png',
    './js/app.js',
    './js/menu.js',
    './js/offline.js',
    './js/toast.js',
    './sw.js'
];

// Install Service Worker
self.addEventListener('install', function(event) {

    console.log('Service Worker: Installing....');

    event.waitUntil(

        // Open the Cache
        caches.open(cacheName).then(function(cache) {
            console.log('Service Worker: Caching App Shell at the moment......');

            // Add Files to the Cache
            return cache.addAll(filesToCache);
        })
    );
});


// Fired when the Service Worker starts up
self.addEventListener('activate', function(event) {

    console.log('Service Worker: Activating....');

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(cacheNames.map(function(key) {
                if( key !== cacheName) {
                    console.log('Service Worker: Removing Old Cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});


self.addEventListener('fetch', function(event) {

    console.log('Service Worker: Fetch', event.request.url);

    console.log("Url", event.request.url);

    event.respondWith(cacheFirst(event.request));
});

function cacheFirst(request) {
  const cacheName = getCacheName(request.url)
  return caches.open(cacheName)
    .then(cache => cache.match(request.url))
    .then(response => {
      return response || fetchAndCache(request, cacheName)
    })
}

function fetchAndCache(request, cacheName) {
  return fetch(request).then(response => {
    const copy = response.clone()
    caches.open(cacheName)
      .then(cache => cache.put(request, copy))
    return response
  })
}

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'JOHN CLINTON SAYS HI!!!!!';
  const options = {
    body: 'Yay it works.',
    icon: 'images/email-active.png',
    badge: 'images/website-active.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('http://johnclinton.me/pwa')
  );
});

