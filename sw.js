importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js','https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');
function hstPlate(s){const m=/\b(T\d{4,5}LA|[A-Z]{3}\d{2,3}[A-Z]{2})\b/.exec(String(s||'').toUpperCase());return m?m[1]:''}
self.addEventListener('notificationclick',e=>{let p='';try{const n=e.notification,d=(n.data&&n.data.FCM_MSG&&n.data.FCM_MSG.notification)||{};p=hstPlate((n.title||d.title||'')+' '+(n.body||d.body||''))}catch(x){}e.stopImmediatePropagation();e.notification.close();e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(L=>{for(const c of L){if(c.url.startsWith(self.registration.scope)&&'focus' in c){if(p)c.postMessage({hstOpen:p});return c.focus()}}return clients.openWindow('./'+(p?'?t='+p:''))}))});
try{firebase.initializeApp({"apiKey":"AIzaSyB4S6ps5qJofmnjdjr1sYevf-BKMnY9OLc","authDomain":"hst-live-yard.firebaseapp.com","projectId":"hst-live-yard","storageBucket":"hst-live-yard.firebasestorage.app","messagingSenderId":"229728292239","appId":"1:229728292239:web:d3f39b7cef6a8820738ffa"});firebase.messaging();}catch(e){}
const C='hst-yard-v28';
const FILES=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','maskable-512.png','apple-touch-icon.png','favicon-32.png','badge-96.png','logo-mark.png','logo-full.png','logo-full-white.png','f/bc600.woff2','f/bc700.woff2','install/'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(u.origin!==location.origin||e.request.method!=='GET') return;
  const put=r=>{if(r&&r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));}return r;};
  const saved=()=>caches.match(e.request,{ignoreSearch:true});
  // pictures and fonts: the saved copy at once, refreshed behind – a slow line must not leave the logo or the font empty
  if(/\.(png|woff2|ico|webmanifest)$/.test(u.pathname)){
    e.respondWith(saved().then(h=>{const n=fetch(e.request,{cache:'no-cache'}).then(put);if(h){e.waitUntil(n.catch(()=>{}));return h;}return n;}));
    return;
  }
  // the page: fresh from the network; after 3 s without an answer, or with no network, the saved page
  e.respondWith(new Promise((res,rej)=>{
    let done=false;const fin=r=>{if(!done){done=true;res(r);}};
    const t=setTimeout(()=>{saved().then(h=>{if(h)fin(h);});},3000);
    fetch(e.request,{cache:'no-cache'}).then(put).then(r=>{clearTimeout(t);fin(r);},()=>{clearTimeout(t);saved().then(h=>{if(h)fin(h);else if(!done){done=true;rej(new TypeError('offline'));}});});
  }));
});
