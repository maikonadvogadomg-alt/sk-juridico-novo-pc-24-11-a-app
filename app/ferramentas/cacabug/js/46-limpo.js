/* =========================================================================
   Caça-Bug 1.4 — 46-limpo.js · 🧼 ZIP LIMPO (16/11)
   Projeto baixado da Replit vem com tudo: node_modules, .git, .cache, .local,
   .upm, restos da Replit, logs… e às vezes senhas (.env). Aqui você escolhe o
   que tirar e o Caça-Bug guarda uma CÓPIA limpa. O original NUNCA muda.
   Não precisa do terminal: roda aqui mesmo, no aparelho.
   ========================================================================= */
(function (SK) {
  'use strict';
  // [id, nome, explicação, teste(caminho sem a pasta raiz), marcado por padrão]
  const GRUPOS = [
    ['deps', '📦 node_modules / .pythonlibs', 'Os pacotes baixados. Voltam com npm install (ou pip install). É o que mais pesa.', (p) => /(^|\/)(node_modules|\.pythonlibs|bower_components|vendor\/bundle)\//.test(p), true],
    ['git', '🐙 .git', 'O histórico do git. Pesa e não precisa para rodar. (Tire se não for continuar o histórico.)', (p) => /(^|\/)\.git\//.test(p), true],
    ['replit', '🌀 Restos da Replit', '.replit, replit.nix, .upm, .cache, .local, .config, .breakpoints — coisas que só a Replit usa.', (p) => /(^|\/)(\.replit|replit\.nix|\.breakpoints|\.upm\/|\.cache\/|\.local\/|\.config\/)/.test(p), true],
    ['build', '🏗 Pastas geradas (dist, build, .next)', 'Saem de novo com npm run build. Tire se for publicar pelo GitHub (ele gera de novo).', (p) => /(^|\/)(dist|build|\.next|\.nuxt|\.vite|\.turbo|out|coverage)\//.test(p), true],
    ['lixo', '🧾 Logs e temporários', '*.log, *.tmp, .DS_Store, Thumbs.db, __pycache__, *.pyc.', (p) => /(\.log|\.tmp|\.pyc)$|(^|\/)(\.DS_Store|Thumbs\.db|desktop\.ini)$|(^|\/)__pycache__\//i.test(p), true],
    ['segredo', '🔑 Senhas (.env, local.config.json)', 'Arquivos que costumam ter chave de API ou senha do banco. NUNCA mande para o GitHub nem para a IA. (O .env.example fica.)', (p) => /(^|\/)(\.env(\.[\w-]+)?|local\.config\.json|\.npmrc|\.pypirc|id_rsa[^/]*|.*\.pem|.*\.key)$/i.test(p) && !/\.env\.(example|exemplo|sample)$/i.test(p), true],
    ['anexos', '🖼 attached_assets', 'Prints e arquivos que você colou no chat da Replit. Às vezes o projeto usa algum: deixe desmarcado se não tiver certeza.', (p) => /(^|\/)attached_assets\//.test(p), false],
  ];

  function raizDe(nomes) { const p = nomes.map((n) => n.split('/')); if (!p.length || p.some((x) => x.length < 2)) return ''; const r = p[0][0]; return p.every((x) => x[0] === r) ? r + '/' : ''; }

  async function medir(P) {
    const ent = await SK.projeto.entradasDe(P.id);
    const raiz = raizDe(ent.map((e) => e.name));
    const soma = {}; GRUPOS.forEach((g) => { soma[g[0]] = { n: 0, b: 0, ex: [] }; });
    let total = 0;
    for (const e of ent) {
      total += e.data.length;
      const p = e.name.slice(raiz.length);
      const g = GRUPOS.find((x) => x[3](p));
      if (g) { const s = soma[g[0]]; s.n++; s.b += e.data.length; if (s.ex.length < 4) s.ex.push(p); }
    }
    return { ent, raiz, soma, total };
  }

  async function abrir() {
    const P = SK.projeto.ativo;
    if (!P) { SK.toast('Escolha um projeto em 📁 Projetos primeiro.', 'error'); return; }
    SK.toast('Medindo o projeto…');
    const m = await medir(P);
    const wrap = document.createElement('div');
    wrap.className = 'modal-wrap';
    const linhas = GRUPOS.map((g) => {
      const s = m.soma[g[0]];
      return '<label class="limpo-item' + (s.n ? '' : ' vazio') + '"><input type="checkbox" data-g="' + g[0] + '"' + (s.n && g[4] ? ' checked' : '') + (s.n ? '' : ' disabled') + '>' +
        '<span><b>' + g[1] + '</b> — ' + (s.n ? SK.fmt(s.n) + ' arquivo(s), ' + SK.bytes(s.b) : 'nada') + '<br><small>' + SK.esc(g[2]) + '</small>' +
        (s.ex.length ? '<br><small class="lab-mut">ex.: ' + s.ex.map(SK.esc).join(' · ') + '</small>' : '') + '</span></label>';
    }).join('');
    wrap.innerHTML = '<div class="modal" role="dialog" aria-modal="true" style="width:min(560px,100%);max-height:90vh;overflow:auto">' +
      '<h3>🧼 Zip limpo — ' + SK.esc(P.nome) + '</h3>' +
      '<p>O projeto tem <b>' + SK.fmt(m.ent.length) + '</b> arquivos (' + SK.bytes(m.total) + '). Marque o que tirar. Vai para uma <b>cópia</b>; o original não muda.</p>' +
      linhas + '<p id="limpo-conta" class="lab-mut"></p>' +
      '<div class="row end"><button class="btn" data-x="no">Cancelar</button><button class="btn primary" data-x="ok">🧼 Gerar a cópia limpa</button></div></div>';
    document.body.appendChild(wrap);
    const marcados = () => SK.$$('input[data-g]:checked', wrap).map((i) => i.dataset.g);
    const conta = () => { const b = marcados().reduce((t, g) => t + m.soma[g].b, 0); SK.$('#limpo-conta', wrap).textContent = 'Vai ficar com uns ' + SK.bytes(m.total - b) + ' (tira ' + SK.bytes(b) + ').'; };
    conta();
    wrap.addEventListener('change', conta);
    wrap.addEventListener('click', async (e) => {
      const x = e.target.closest('[data-x]');
      if (!x && e.target !== wrap) return;
      if (!x || x.dataset.x === 'no') { wrap.remove(); return; }
      const tirar = GRUPOS.filter((g) => marcados().includes(g[0]));
      x.disabled = true; x.textContent = '⏳ Gerando…';
      try { await gerar(P, m, tirar); wrap.remove(); }
      catch (err) { x.disabled = false; x.textContent = '🧼 Gerar a cópia limpa'; SK.toast('⚠ ' + err.message, 'error'); }
    });
  }

  async function gerar(P, m, tirar) {
    const fica = [], saiu = {};
    for (const e of m.ent) {
      const p = e.name.slice(m.raiz.length);
      const g = tirar.find((x) => x[3](p));
      if (g) { saiu[g[1]] = (saiu[g[1]] || 0) + 1; continue; }
      fica.push(e);
    }
    if (!fica.length) throw new Error('Assim não sobra nada. Desmarque alguma coisa.');
    const relatorio = '# 🧼 Zip limpo — ' + P.nome + '\n\nFeito pelo Caça-Bug em ' + new Date().toLocaleString('pt-BR') + '.\n\n' +
      '- Antes: ' + m.ent.length + ' arquivos (' + SK.bytes(m.total) + ')\n- Depois: ' + fica.length + ' arquivos (' + SK.bytes(fica.reduce((t, e) => t + e.data.length, 0)) + ')\n\n## O que saiu\n' +
      Object.keys(saiu).map((k) => '- ' + k + ': ' + saiu[k] + ' arquivo(s)').join('\n') +
      '\n\n## Para rodar de novo\n1. `npm install` (volta o node_modules)\n2. Se tinha `.env`: crie de novo com as SUAS chaves (nunca mande para o GitHub).\n3. `npm run dev` ou `npm start`.\n';
    fica.push({ name: m.raiz + 'LIMPEZA.md', data: new TextEncoder().encode(relatorio) });
    const zip = await SK.zip.write(fica);
    await SK.projeto.guardarCopia(P.nome + ' (limpo)', zip, 'limpo', { de: P.id });
    SK.toast('🧼 Pronto: cópia limpa com ' + SK.fmt(fica.length) + ' arquivos (' + SK.bytes(zip.size) + '). Ela já é o projeto em uso.', 'ok');
  }

  SK.limpo = { abrir, GRUPOS };
})(window.SK);
