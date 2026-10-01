// Satzbuch offline cache. Bump VERSION when files change.
const VERSION = "satzbuch-v1";
const CORE = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "icon-180.png"];
const FONTS = "satzbuch-fonts";

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  // Nur eigene, alte Caches löschen. Andere Apps auf derselben Adresse (z. B. MyHabits) bleiben unberührt.
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith("satzbuch-") && k !== VERSION && k !== FONTS).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Google Fonts: cache on first online visit, then serve offline
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(caches.open(FONTS).then((c) => c.match(req).then((hit) => hit || fetch(req).then((res) => { c.put(req, res.clone()); return res; }))));
    return;
  }
  if (url.origin !== self.location.origin) return;
  // App files: answer from cache instantly, refresh the cache in the background
  e.respondWith(caches.open(VERSION).then((c) => c.match(req, { ignoreSearch: true }).then((hit) => {
    const net = fetch(req).then((res) => { if (res.ok) c.put(req, res.clone()); return res; }).catch(() => hit || c.match("index.html"));
    return hit || net;
  })));
});
