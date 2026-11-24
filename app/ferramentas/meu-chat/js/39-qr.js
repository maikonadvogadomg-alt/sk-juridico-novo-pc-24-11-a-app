/* Meu Chat — 39-qr.js · 🔳 LER QR CODE (17/11)
   Aponta a câmera (ou escolhe um print) e o texto do QR vai para a caixa de mensagem.
   Entende os QR em sequência do Colecionador ("1 de 5, 2 de 5…"): junta sozinho, em qualquer ordem. */
(function (MC) {
  'use strict';
  const E = MC.esc;
  let fluxo = null, rodando = false, seq = null;
  const carregar = (src) => new Promise((ok, erro) => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = () => erro(new Error('precisa de internet na primeira vez')); document.head.appendChild(s); });
  async function descompactar(s) {
    const bin = atob(s.slice(1)); const u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
    if (s[0] === 't') return new TextDecoder().decode(u);
    return new Response(new Blob([u]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).text();
  }
  async function detector() {
    if ('BarcodeDetector' in window) { try { const bd = new window.BarcodeDetector({ formats: ['qr_code'] }); return async (fonte) => { const r = await bd.detect(fonte); return r[0] && r[0].rawValue; }; } catch (e) {} }
    if (!window.jsQR) await carregar('https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js');
    const c = document.createElement('canvas'), g = c.getContext('2d', { willReadFrequently: true });
    return async (fonte) => { const w = fonte.videoWidth || fonte.width, h = fonte.videoHeight || fonte.height; if (!w) return null; c.width = w; c.height = h; g.drawImage(fonte, 0, 0); const r = window.jsQR(g.getImageData(0, 0, w, h).data, w, h); return r && r.data; };
  }
  function parar() { rodando = false; if (fluxo) { fluxo.getTracks().forEach((t) => t.stop()); fluxo = null; } }
  function entregar(t, w) {
    parar(); if (w) w.remove();
    const ent = MC.$('#entrada'); ent.value += (ent.value ? '\n\n' : '') + t; ent.dispatchEvent(new Event('input'));
    MC.aviso('🔳 Li o QR (' + t.length + ' letras): está na caixa de texto.', 'ok');
  }
  // devolve true se ainda faltam pedaços
  async function juntar(t, st, w) {
    const m = /^CQR1\|(\w+)\|(\d+)\|(\d+)\|([\s\S]*)$/.exec(t); if (!m) return false;
    const [, id, i, n] = m; if (!seq || seq.id !== id) seq = { id, n: +n, partes: {} };
    seq.partes[+i] = m[4];
    const tem = Object.keys(seq.partes).length;
    st.innerHTML = '✅ Li <b>' + tem + ' de ' + seq.n + '</b>. ' + (tem < seq.n ? 'Vá para o próximo QR…' : 'Juntando…');
    if (tem < seq.n) return true;
    const z = Array.from({ length: seq.n }, (_, k) => seq.partes[k + 1]).join(''); seq = null;
    try { entregar(await descompactar(z), w); } catch (e) { st.textContent = '⚠ Não consegui juntar: ' + e.message; }
    return true;
  }
  async function abrir() {
    const w = document.createElement('div'); w.className = 'janela-fundo';
    w.innerHTML = '<div class="janela" role="dialog" aria-modal="true" aria-label="Ler QR"><div class="cab"><b>🔳 Ler QR Code</b><button class="ic" data-q="fechar" aria-label="Fechar">✕</button></div>' +
      '<p class="mudo pequeno">Aponte para o QR (do Colecionador, de um comando, de um código). O texto vai para a caixa de mensagem.</p>' +
      '<video playsinline muted style="width:100%;border-radius:12px;background:#000;max-height:50vh"></video><p class="q-st pequeno"></p>' +
      '<div class="linha"><label class="bt">🖼 Ler de um print<input type="file" accept="image/*" multiple hidden data-q="img"></label><button class="bt" data-q="fechar">Fechar</button></div></div>';
    document.body.appendChild(w);
    const st = w.querySelector('.q-st'), v = w.querySelector('video');
    w.addEventListener('click', (e) => { const b = e.target.closest('[data-q="fechar"]'); if (b || e.target === w) { parar(); w.remove(); } });
    const det = await detector().catch((e) => { st.textContent = '⚠ ' + e.message; return null; });
    w.querySelector('[data-q="img"]').onchange = async (e) => {
      for (const f of e.target.files) {
        try { const img = await createImageBitmap(f); const t = det && await det(img); if (!t) { st.textContent = '⚠ Não achei QR em ' + f.name; continue; } if (await juntar(t, st, w)) continue; return entregar(t, w); }
        catch (err) { st.textContent = '⚠ ' + err.message; }
      }
    };
    if (!det) return;
    try {
      fluxo = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      v.srcObject = fluxo; await v.play(); rodando = true; st.textContent = '📷 Procurando QR…';
      const laco = async () => {
        if (!rodando || !document.body.contains(w)) return parar();
        try { const t = await det(v); if (t) { if (await juntar(t, st, w)) { if (rodando) setTimeout(laco, 250); return; } return entregar(t, w); } } catch (e) {}
        setTimeout(laco, 300);
      };
      laco();
    } catch (e) { st.textContent = '⚠ Não consegui abrir a câmera (' + e.message + '). Permita a câmera para este app, ou use 🖼 Ler de um print.'; }
  }
  document.addEventListener('DOMContentLoaded', () => { const b = MC.$('#bt-qr'); if (b) b.onclick = () => abrir(); });
  MC.qr = { abrir };
})(window.MC);
