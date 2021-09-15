importScripts("assets/workbox-v6.3.0/workbox-sw.js");

if (workbox) {
  console.log(`Yay! Workbox is loaded -`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

// SETTINGS

workbox.setConfig({
  modulePathPrefix: "assets/workbox-v6.3.0/"
});

// Verbose logging even for the production
workbox.setConfig({ debug: false });

new workbox.precaching.precacheAndRoute(self.__WB_MANIFEST, {
  // Ignore all URL parameters.
  ignoreURLParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
  "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json",
  new workbox.strategies.NetworkFirst({
    networkTimeoutSeconds: 5
  })
);

workbox.routing.registerRoute(
  new RegExp(/^http:\/\/www\.serebii\.net\/pokemongo\/pokemon\/[\d]+.png/),
  new workbox.strategies.CacheFirst({
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200]
      })
    ]
  })
);

workbox.routing.registerRoute(
  ({ request }) => request.destination === "image",
  new workbox.strategies.CacheFirst({
    cacheName: "images",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 160,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
      })
    ]
  })
);
