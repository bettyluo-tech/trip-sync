var V="tripsync-v1",FILES=["./","./index.html","./manifest.json","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(FILES)}));self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V}).map(function(x){return caches.delete(x)}))}));self.clients.claim()});
self.addEventListener("fetch",function(e){if(e.request.method!=="GET")return;
e.respondWith(fetch(e.request).then(function(r){if(r&&r.ok&&new URL(e.request.url).origin===location.origin){var c=r.clone();caches.open(V).then(function(x){x.put(e.request,c)})}return r}).catch(function(){return caches.match(e.request).then(function(m){return m||caches.match("./index.html")})}))});
