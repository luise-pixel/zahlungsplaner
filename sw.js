const C='zahlungsplaner-v4-cache';
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./manifest.json','./icons/apple-touch-icon.png','./icons/icon-192.png','./icons/icon-512.png']))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
self.addEventListener('push',e=>{
  let d={title:'Zahlungsplaner',body:'Eine Zahlung ist bald fällig.'};
  try{if(e.data)d=e.data.json()}catch(_){}
  e.waitUntil(self.registration.showNotification(d.title||'Zahlungsplaner',{body:d.body||'',tag:d.tag||'zahlungsplaner-reminder',data:{url:'./index.html'}}));
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{
    for(const c of cs){if('focus'in c)return c.focus()}
    return clients.openWindow(e.notification.data?.url||'./index.html');
  }));
});