self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open("auth-cache").then((cache) => {
        return cache.addAll(["/api/auth/session"]);
      })
    );
  });
  
  self.addEventListener("fetch", (event) => {
    if (event.request.url.includes("/api/auth/session")) {
      event.respondWith(
        caches.match(event.request).then((response) => {
          return response || fetch(event.request);
        })
      );
    }
  });