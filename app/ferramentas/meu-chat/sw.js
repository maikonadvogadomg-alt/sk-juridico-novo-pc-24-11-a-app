/* Meu Chat — guarda a tela para abrir sem internet (a IA continua precisando de internet). */
const CACHE = 'meuchat-v2011c';
const ARQS = ['./', 'index.html', 'css/app.css', 'manifest.json', 'icons/icon-192.png', 'icons/icon-512.png',
  'js/00-base.js', 'js/10-banco.js', 'js/11-online.js', 'js/nuvem-embutida.js', 'js/lib/nuvem-neon.js', 'js/12-nuvem.js', 'js/14-entrada.js', 'js/20-provedores.js', 'js/30-memoria.js', 'js/33-contextos.js', 'js/34-guia.js', 'js/35-jeito.js', 'js/36-gasto.js', 'js/37-arquivos.js', 'js/lib/playground-replit.js', 'js/38-codigos.js', 'js/39-qr.js', 'js/41-pronto.js', 'js/42-testar.js', 'js/43-links.js', 'js/44-docs.js', 'js/lib/ferramentas-lista.js', 'js/45-mesa.js', 'ferramentas/analisador-v2.html', 'ferramentas/analisador.html', 'ferramentas/caca-sql.html', 'ferramentas/cofre-config.html', 'ferramentas/colecionador-codigo.html', 'ferramentas/comandos-termux.html', 'ferramentas/conversor-imagem.html', 'ferramentas/detector-api.html', 'ferramentas/divisor-html.html', 'ferramentas/juntador.html', 'ferramentas/leitor-universal.html', 'ferramentas/monica-guia.html', 'ferramentas/monica-passo.html', 'ferramentas/montador-modulos.html', 'ferramentas/procurar-substituir.html', 'js/janela-pc.js', 'docs/meuchat.md', 'docs/sk-juridico-html.md', 'docs/minisk.md', 'docs/laboratorio.md', 'docs/cacabug.md', 'js/40-voz.js', 'js/50-internet.js', 'js/60-previa.js', 'js/70-texto.js', 'js/80-chat.js', 'js/lib/cofre-arquivo.js', 'js/lib/guia-versoes.js', 'js/lib/guia-maikon.js', 'js/lib/jszip.min.js', 'js/85-config.js', 'js/87-cofre.js', 'js/lib/reconhecer.js', 'js/90-backup.js', 'js/91-restaurar.js', 'js/95-ponte-lab.js', 'js/99-app.js', 'voz-francisco.py'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ARQS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith('meuchat-') && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return; // IAs e internet: direto
  e.respondWith(fetch(e.request).then((r) => { const c = r.clone(); caches.open(CACHE).then((k) => k.put(e.request, c)); return r; }).catch(() => caches.match(e.request)));
});

// 🔔 18/11: tocar na notificação "resposta pronta" abre o Meu Chat
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((l) => { for (const c of l) { if ('focus' in c) return c.focus(); } return self.clients.openWindow('./'); }));
});
