// The create-react-app build registered a caching service worker at this URL. Vite registers none, so this one
// takes its place once, unregisters itself and reloads open tabs, so earlier visitors stop getting the cached old app.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.registration.unregister()
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then((clients) => clients.forEach((client) => client.navigate(client.url)))
  );
});
