/* Meu Chat — 38-codigos.js · 🧪 MEUS CÓDIGOS (17/11)
   Igual ao playground do jurídico original: cada código que a IA fizer tem o botão 💾 Guardar.
   Ficam aqui, com nome, e vão para a nuvem (com o login, aparecem em qualquer aparelho).
   Abrir = abre no ▶ playground (ver funcionando e mexer). Nada some sem você confirmar. */
(function (MC) {
  'use strict';
  const E = MC.esc;
  const EXT = { html: 'html', htm: 'html', tsx: 'tsx', jsx: 'jsx', js: 'js', javascript: 'js', ts: 'ts', css: 'css', python: 'py', py: 'py', json: 'json', md: 'md', sh: 'sh', bash: 'sh', sql: 'sql' };
  const todos = async () => (await MC.banco.kv('codigos', {})) || {};
  async function gravar(m, id) { await MC.banco.kvSet('codigos', m); if (MC.nuvem && MC.nuvem.marcar) MC.nuvem.marcar('codigo', id); }
  function tituloDe(lang, cod) {
    const t = (/<title>([^<]{2,80})<\/title>/i.exec(cod) || /^\s*(?:\/\/|#|<!--)\s*(.{3,60})/m.exec(cod) || [])[1];
    return (t || ('Código ' + (lang || '') + ' de ' + new Date().toLocaleDateString('pt-BR'))).trim();
  }
  const igual = (a, b) => String(a || '').replace(/\r/g, '').trim() === String(b || '').replace(/\r/g, '').trim();
  async function guardar(lang, cod, sugestao) {
    const ja = Object.values(await todos()).find((c) => igual(c.codigo, cod)); if (ja) { MC.aviso('Esse código já está em 🧪 Meus códigos como "' + ja.nome + '" — não guardei de novo.'); return ja.id; } // 20/11: sem repetidos
    const nome = prompt('💾 Nome para guardar este código:', sugestao || tituloDe(lang, cod)); if (nome == null) return null;
    const m = await todos(), id = MC.uid();
    m[id] = { id, nome: nome.trim() || 'Código', lang: lang || '', codigo: cod, criado: Date.now(), atualizado: Date.now() };
    await gravar(m, id); MC.aviso('💾 Guardado em 🧪 Meus códigos' + (MC.nuvem && MC.nuvem.logado && MC.nuvem.logado() ? ' (e vai para a nuvem)' : ''), 'ok');
    return id;
  }
  async function pintar() {
    const el = MC.$('#codigos-corpo'); if (!el) return;
    const busca = (MC.$('#cod-busca') && MC.$('#cod-busca').value || '').toLowerCase();
    const l = Object.values(await todos()).filter((c) => !busca || (c.nome + ' ' + c.codigo).toLowerCase().includes(busca)).sort((a, b) => (b.atualizado || 0) - (a.atualizado || 0));
    el.innerHTML = l.length ? l.map((c) => '<div class="cod-item" data-id="' + E(c.id) + '"><div style="flex:1;min-width:0"><b>' + E(c.nome) + '</b><div class="pequeno mudo">' + E(c.lang || 'texto') + ' · ' + String(c.codigo || '').split('\n').length + ' linhas · ' + new Date(c.atualizado || c.criado).toLocaleDateString('pt-BR') + '</div></div>' +
      '<button class="ic" data-c="abrir" title="Abrir no playground">▶</button><button class="ic" data-c="chat" title="Colocar na caixa para a IA continuar">💬</button><button class="ic" data-c="copiar" title="Copiar">📋</button><button class="ic" data-c="baixar" title="Baixar">⤓</button><button class="ic" data-c="nome" title="Mudar o nome">✏️</button><button class="ic" data-c="apagar" title="Apagar">🗑</button></div>').join('')
      : '<p class="mudo pequeno">' + (busca ? 'Nada com "' + E(busca) + '".' : 'Nenhum código guardado ainda. Nos blocos de código das respostas, toque em 💾 Guardar.') + '</p>';
  }
  async function clique(e) {
    const b = e.target.closest('[data-c]'); if (!b) return;
    const id = b.closest('[data-id]').dataset.id, m = await todos(), c = m[id]; if (!c) return;
    const a = b.dataset.c;
    if (a === 'abrir') { MC.fecharPaineis(); playground(c); }
    if (a === 'chat') { MC.fecharPaineis(); const ent = MC.$('#entrada'); ent.value += (ent.value ? '\n\n' : '') + 'Este é o meu código "' + c.nome + '":\n```' + (c.lang || '') + '\n' + c.codigo + '\n```\n'; ent.dispatchEvent(new Event('input')); ent.focus(); }
    if (a === 'copiar') MC.copiar(c.codigo);
    if (a === 'baixar') MC.baixar(c.nome.replace(/[^\wÀ-ÿ.-]+/g, '-') + '.' + (EXT[c.lang] || 'txt'), c.codigo);
    if (a === 'nome') { const n = prompt('Novo nome:', c.nome); if (n && n.trim()) { c.nome = n.trim(); c.atualizado = Date.now(); await gravar(m, id); pintar(); } }
    if (a === 'apagar') { if (!confirm('Apagar "' + c.nome + '" dos seus códigos (aqui e na nuvem)?\n\nDica: antes, toque em ⤓ para baixar uma cópia.')) return; delete m[id]; await gravar(m, id); pintar(); }
  }
  // o playground salvou uma mudança: atualiza o código guardado
  async function atualizar(id, codigo) { const m = await todos(); if (!m[id]) return false; m[id].codigo = codigo; m[id].atualizado = Date.now(); await gravar(m, id); return true; }
  async function abrir() { await pintar(); MC.abrirPainel('painel-codigos'); }
  document.addEventListener('DOMContentLoaded', () => {
    const b = MC.$('#bt-codigos'); if (b) b.onclick = abrir;
    const c = MC.$('#codigos-corpo'); if (c) c.onclick = clique;
    const s = MC.$('#cod-busca'); if (s) s.oninput = pintar;
    MC.on && MC.on('codigos', pintar);
  });
  // ▶ 20/11: o Playground igual ao da Replit (roda aqui dentro, salva em Meus códigos → nuvem)
  const armazem = {
    listar: async () => Object.values(await todos()),
    nuvem: () => !!(MC.nuvem && MC.nuvem.logado && MC.nuvem.logado()),
    async guardar(g) {
      const m = await todos();
      const dup = Object.values(m).find((c) => c.id !== g.id && igual(c.codigo, g.codigo)); if (dup) return 'repetido';
      const id = g.id && m[g.id] ? g.id : MC.uid(); const ant = m[id] || { criado: Date.now() };
      m[id] = Object.assign({}, ant, { id, nome: g.nome, lang: g.lang, codigo: g.codigo, pg: g.pg, atualizado: Date.now() });
      await gravar(m, id); return id;
    },
  };
  function playground(item) {
    if (!window.PlaygroundReplit) return MC.previa.abrir((item && item.lang) || 'html', (item && item.codigo) || '', item && item.id);
    return PlaygroundReplit.abrir({ armazem, item, chave: 'meuchat', mandarProChat: (g) => { const ent = MC.$('#entrada'); ent.value += (ent.value ? '\n\n' : '') + '```' + ({ python: 'python', tsx: 'tsx' }[g.lang] || 'html') + '\n' + g.codigo + '\n```\n'; ent.dispatchEvent(new Event('input')); ent.focus(); } });
  }
  document.addEventListener('DOMContentLoaded', () => { const corpo = MC.$('#codigos-corpo'); if (corpo && !MC.$('#cod-play')) { const b = document.createElement('button'); b.id = 'cod-play'; b.className = 'bt primario'; b.style.cssText = 'width:100%;margin:6px 0'; b.textContent = '▶ Abrir o Playground (igual ao da Replit)'; b.onclick = () => { MC.fecharPaineis(); playground(null); }; corpo.before(b); } });
  MC.codigos = { guardar, abrir, pintar, atualizar, todos, playground, armazem };
})(window.MC);
