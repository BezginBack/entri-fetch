
self.addEventListener('install', function(evet) {
  event.registerForeignFetch({
    scopes: [self.registration.scope], 
    origins: ['*']
  });
});

self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
