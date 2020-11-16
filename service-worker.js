// Fungsi importScripts() adalah untuk memuat library JavaScript ke dalam service worker.
// Karena kita memuat library Workbox dari CDN,
// Anda akan memerlukan koneksi internet untuk menjalankan workbox ini.
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

if (workbox) {
  console.log(`Workbox berhasil dimuat`);
} else {
  console.log(`Workbox gagal dimuat`);
}

// mendaftarkan aset yang digunakan untuk application shell ke dalam cache sebelum aplikasi ditampilkan.
workbox.precaching.precacheAndRoute(
  [
    { url: "index.html", revision: "1" },
    { url: "manifest.json", revision: "1" },
    { url: "pages/nav.html", revision: "1" },
    { url: "push.js", revision: "1" },
    { url: "sw-reg.js", revision: "1" },
    { url: "js/api.js", revision: "1" },
    { url: "js/db.js", revision: "1" },
    { url: "js/favorite.js", revision: "1" },
    { url: "js/idb.js", revision: "1" },
    { url: "js/materialize.min.js", revision: "1" },
    { url: "js/nav.js", revision: "1" },
    { url: "css/materialize.css", revision: "1" },
    { url: "css/materialize.min.css", revision: "1" },
    { url: "css/style.css", revision: "1" },
  ],
  {
    ignoreUrlParametersMatching: [/.*/],
  }
);

/*untuk menyimpan semua berkas halaman yang ada di dalam folder pages/ ke dalam cache
 dengan strategi stale while revalidate */
workbox.routing.registerRoute(
  new RegExp("pages/"),
  workbox.strategies.staleWhileRevalidate({
    // mengganti nama objek cache dengan menambahkan opsi cacheName pada parameter method staleWhileRevalidate()
    cacheName: "pages",
  })
);

// Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.cacheFirst({
    cacheName: "google-fonts-stylesheets",
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /^https:\/\/code\.jquery\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "code-jquery",
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: "images",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
      }),
    ],
  })
);

workbox.routing.registerRoute(
  ({ url }) => url.origin === "https://api.football-data.org",
  workbox.strategies.staleWhileRevalidate({
    cacheName: "base_url",
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 30,
      }),
    ],
  })
);

// push notification
self.addEventListener("push", function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: body,
    icon: "img/notification.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
