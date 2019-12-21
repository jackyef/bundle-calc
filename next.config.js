// next.config.js
const withCSS = require('@zeit/next-css');
const withOffline = require('next-offline'); // https://github.com/hanford/next-offline

module.exports = withCSS(withOffline({ 
  dontAutoRegisterSw: true,
  // generateInDevMode: true,
  generateSw: false,
  workboxOpts: {
    swSrc: './src/serviceWorker/base.js',
    swDest: 'static/service-worker.js',
  },
}));
