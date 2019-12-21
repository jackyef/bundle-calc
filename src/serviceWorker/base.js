self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
workbox.precaching.cleanupOutdatedCaches();

workbox.routing.registerRoute(
  /^https?.*/,
  new workbox.strategies.NetworkFirst({
    cacheName: 'https-calls',
    networkTimeoutSeconds: 15,
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 150,
        maxAgeSeconds: 2592000,
        purgeOnQuotaError: false,
      }),
      new workbox.cacheableResponse.Plugin({ statuses: [0, 200] }),
    ],
  }),
  'GET',
);
