// next.config.js
const withCSS = require('@zeit/next-css');
const withOffline = require('next-offline'); // https://github.com/hanford/next-offline

module.exports = withCSS(withOffline({ 
  dontAutoRegisterSw: true,
  // generateInDevMode: true,
  transformManifest: manifest => ['/'].concat(manifest), // add the homepage to the cache
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
}));
