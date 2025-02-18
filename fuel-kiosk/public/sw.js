// self.addEventListener("install", (event) => {
//     event.waitUntil(
//       caches.open("auth-cache").then((cache) => {
//         return cache.addAll(["/api/auth/session"]);
//       })
//     );
//   });
  
//   self.addEventListener("fetch", (event) => {
//     if (event.request.url.includes("/api/auth/session")) {
//       event.respondWith(
//         caches.match(event.request).then((response) => {
//           return response || fetch(event.request);
//         })
//       );
//     }
//   });

self.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    if (event.request.url.includes("/api/auth/session")) {
      event.respondWith(
        (async () => {
          const db = await indexedDB.open("authDB", 1);
          const tx = db.transaction("sessions", "readonly");
          const store = tx.objectStore("sessions");
          const sessionData = await store.get("sessionData");
          return new Response(JSON.stringify(sessionData), { headers: { "Content-Type": "application/json" } });
        })()
      );
    }
  }
});