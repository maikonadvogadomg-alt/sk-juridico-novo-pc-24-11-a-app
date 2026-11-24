/* =========================================================================
   SK Jurídico HTML — 56-restaurar.js · ♻️ RESTAURAR QUALQUER BACKUP (18/11)
   Escolha QUALQUER arquivo dos seus apps (backup do SK Jurídico, do Meu Chat, o ⬇ backup do
   🗄 Banco/Neon, o banco antigo do SK Jurídico 1.7 da Replit…). Ele RECONHECE sozinho o formato,
   mostra o que achou e traz para o lugar certo. Sempre JUNTA (não apaga nada do que já está aqui).
   O que é do Meu Chat sai num arquivo pronto para restaurar lá.
   ========================================================================= */
(function (J) {
  'use strict';
  const E = J.esc;
  async function lerArquivo(f) {
    if (/\.zip$/i.test(f.name)) {
      const z = await JSZip.loadAsync(f); const js = Object.values(z.files).filter((x) => !x.dir && /\.json$/i.test(x.name));
      if (!js.length) throw new Error('o zip não tem nenhum .json dentro');
      if (js.length === 1) return JSON.parse(await js[0].async('string'));
      const tabelas = {}; for (const x of js) { try { const v = JSON.parse(await x.async('string')); tabelas[x.name.replace(/^.*\//, '').replace(/\.json$/i, '')] = Array.isArray(v) ? v : (v.tabelas || v); } catch (e) {} }
      return { tabelas };
    }
    const t = await f.text();
    try { return JSON.parse(t); } catch (e) { throw new Error('este arquivo não é JSON (backup). Se for CSV, abra no 🗄 Banco.'); }
  }
  function janela(r, nome) {
    const p = r.pacote, L = p.juridico.lojas;
    const w = document.createElement('div'); w.className = 'modal-fundo'; w.setAttribute('role', 'dialog'); w.setAttribute('aria-modal', 'true');
    w.style.cssText = 'position:fixed;inset:0;z-index:9500;background:rgba(0,0,0,.5);display:flex;align-items:flex-end;justify-content:center';
    w.innerHTML = '<div style="background:var(--papel);color:var(--fg);width:min(640px,100%);max-height:92vh;overflow:auto;border-radius:16px 16px 0 0;padding:16px">' +
      '<div style="display:flex;justify-content:space-between;align-items:center"><b>♻️ ' + E(nome || 'Restaurar') + '</b><button class="bt" data-r="fechar" aria-label="Fechar">✕</button></div>' +
      '<p><b>Reconheci:</b> ' + E(r.formato) + '</p>' +
      '<ul class="peq">' + r.achados.map((a) => '<li>' + (a.reconhecido ? '✅' : '❔') + ' <b>' + E(a.nome) + '</b> — ' + E(a.detalhe) + '</li>').join('') + '</ul>' +
      (r.nJur ? '<p><b>Para o SK Jurídico (aqui):</b></p><div class="peq">' + J.db.LOJAS.map((l) => L[l] && L[l].length ? '<label style="display:block"><input type="checkbox" data-loja="' + l + '" checked> ' + L[l].length + ' ' + l + '</label>' : '').join('') + '</div>' +
        '<button class="bt forte" data-r="trazer" style="margin-top:8px">📥 Trazer para o SK Jurídico (juntar)</button>' : '<p class="peq" style="color:var(--mut)">Nada aqui é do SK Jurídico.</p>') +
      (r.nMC ? '<p style="margin-top:10px"><b>Do Meu Chat:</b> ' + p.meuchat.conversas.length + ' conversa(s), ' + Object.keys(p.meuchat.codigos).length + ' código(s)' + (p.meuchat.memoria ? ', a memória' : '') + '.</p><button class="bt" data-r="mc">⬇ Baixar a parte do Meu Chat (restaure lá em ⚙️ → ⤒ Restaurar)</button>' : '') +
      (p.outros.length ? '<p style="margin-top:10px"><b>Outras tabelas (não reconhecidas):</b></p>' + p.outros.map((o, i) => '<button class="bt" data-out="' + i + '" style="margin:2px">⬇ ' + E(o.nome) + ' (' + o.linhas.length + ')</button>').join('') : '') +
      '<p id="rs-st" class="peq" style="margin-top:8px"></p></div>';
    document.body.appendChild(w);
    const st = (t) => { w.querySelector('#rs-st').textContent = t; };
    w.addEventListener('click', async (e) => {
      const b = e.target.closest('[data-r],[data-out]'); if (!b && e.target !== w) return;
      if (!b || b.dataset.r === 'fechar') { w.remove(); return; }
      if (b.dataset.out != null) { const o = p.outros[+b.dataset.out]; J.baixar(o.nome + '.json', JSON.stringify(o.linhas, null, 1), 'application/json'); return; }
      if (b.dataset.r === 'mc') { J.baixar('para-o-meu-chat-' + new Date().toISOString().slice(0, 10) + '.json', JSON.stringify({ app: 'meu-chat', versao: 1, data: new Date().toISOString(), conversas: p.meuchat.conversas, memoria: p.meuchat.memoria, prefs: {}, codigos: p.meuchat.codigos }), 'application/json'); return; }
      if (b.dataset.r === 'trazer') {
        b.disabled = true; let n = 0;
        const quais = [...w.querySelectorAll('[data-loja]:checked')].map((x) => x.dataset.loja);
        for (const l of quais) for (const it of L[l]) { try { await J.db.guardar(l, it); n++; if (n % 50 === 0) st('⏳ ' + n + '…'); } catch (er) {} }
        for (const [k, v] of Object.entries(p.juridico.prefs || {})) { try { if (k.startsWith('jur:')) { if (k !== 'jur:ia' || !localStorage.getItem(k)) localStorage.setItem(k, v); } else if (k !== 'ia') J.pref.set(k, v); } catch (er) {} }
        st('✅ Trouxe ' + n + ' item(ns). Recarregando…'); J.aviso('♻️ Restaurado: ' + n + ' item(ns) juntados.', 'ok');
        setTimeout(() => location.reload(), 1500);
      }
    });
  }
  async function abrirArquivo(f) { const obj = await lerArquivo(f); janela(Reconhecer.detectar(obj, f.name), f.name); }
  J.restaurar = { abrirArquivo, janela, lerArquivo };
})(window.J);
