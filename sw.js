importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js','https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');
try{firebase.initializeApp({"apiKey":"AIzaSyB4S6ps5qJofmnjdjr1sYevf-BKMnY9OLc","authDomain":"hst-live-yard.firebaseapp.com","projectId":"hst-live-yard","storageBucket":"hst-live-yard.firebasestorage.app","messagingSenderId":"229728292239","appId":"1:229728292239:web:d3f39b7cef6a8820738ffa"});firebase.messaging();}catch(e){}
const C='hst-yard-v18';
const FILES=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','maskable-512.png','apple-touch-icon.png','favicon-32.png','badge-96.png','logo-mark.png','logo-full.png','logo-full-white.png','install/'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(u.origin!==location.origin) return;
  e.respondWith(fetch(e.request,{cache:'no-cache'}).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r;}).catch(()=>caches.match(e.request,{ignoreSearch:true})));
});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(L=>{for(const c of L){if(c.url.startsWith(self.registration.scope)&&'focus' in c)return c.focus()}return clients.openWindow('./')}))});
