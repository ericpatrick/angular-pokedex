// prettier-ignore
module.exports = {
  globDirectory: "dist/",
  globPatterns: [
    "index.html",
    "manifest.json",
    "favicon.ico",
    "*.js",
    "*.css",
    "assets/icons/pokebola-*.png",
    "assets/workbox-v6.3.0/workbox-sw.js",
    "assets/workbox-v6.3.0/workbox-precaching.prod.js",
    "assets/workbox-v6.3.0/workbox-core.prod.js",
    "assets/workbox-v6.3.0/workbox-routing.prod.js",
    "assets/workbox-v6.3.0/workbox-strategies.prod.js",
    "assets/workbox-v6.3.0/workbox-cacheable-response.prod",
  ],
  maximumFileSizeToCacheInBytes: 50 * 1024 * 1024,
  swSrc: "src/sw-custom.js",
  swDest: "dist/sw-custom.js"
};
