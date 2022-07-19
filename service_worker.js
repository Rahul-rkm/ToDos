const rkmTodos = "rkm-todos-app-v1";
const assets = [
    "/",
    "/index.html",
    "/style.css",
    "/script.js",
    "/images/logo.png",
    "/icons/apple-icon-180.png"
];

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(rkmTodos).then(cache => {
            cache.addAll(assets);
        })
    );
});

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request);
        })
    );
});