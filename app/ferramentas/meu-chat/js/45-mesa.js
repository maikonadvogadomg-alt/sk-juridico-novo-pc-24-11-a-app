/* Meu Chat — 45-mesa.js · 🧰 MESA DO LADO (18/11) — para tela grande (computador, .exe, tablet deitado)
   No celular (20/11) a mesa abre por cima, na tela toda; o playground fica guardado; aba 🧰 com as ferramentas sem IA.
   O chat fica à esquerda, igual. À direita, uma MESA separada que NÃO gasta nada da IA:
   ▶ Playground  — o código que a IA fez vai para cá (botão ➡ Mesa nos blocos de código): mexa e veja funcionando.
   🔗 Links       — seus links guardados, abrindo aqui do lado (o "colador de links" dentro do chat).
   🧪 Códigos     — os códigos guardados (💾); tocar = abre no playground.
   Só entra na IA o que VOCÊ mandar de volta (↩ Mandar para o chat). */
(function (MC) {
  'use strict';
  const E = MC.esc;
  const LARGA = () => window.matchMedia('(min-width: 1000px)').matches;
  const ligada = () => MC.pref.get('mesa', !!window.miniskPC) && LARGA();
  let aba = MC.pref.get('mesaAba', 'play'), atual = { ling: 'html', cod: '', id: null };
  function montar() {
    if (MC.$('#mesa')) return;
    const m = document.createElement('aside'); m.id = 'mesa'; m.setAttribute('aria-label', 'Mesa');
    m.innerHTML = '<div class="mesa-abas" role="tablist">' +
      '<button role="tab" data-aba="play">▶ Playground</button><button role="tab" data-aba="links">🔗 Links</button><button role="tab" data-aba="cods">🧪 Códigos</button><button role="tab" data-aba="ferr">🧰</button>' +
      '<span class="mudo pequeno" style="margin-left:auto">não gasta IA</span><button class="ic" data-m="fechar" title="Esconder a mesa" aria-label="Esconder a mesa">✕</button></div>' +
      // playground
      '<section class="mesa-sec" data-sec="play"><div class="linha mesa-barra"><select id="mesa-ling" aria-label="Tipo do código"><option value="html">HTML</option><option value="js">JavaScript</option><option value="python">Python</option><option value="css">CSS</option><option value="tsx">TSX/JSX</option></select>' +
        '<button class="bt peq primario" data-m="rodar">▶ Rodar</button><button class="bt peq" data-m="copiar">📋</button><button class="bt peq" data-m="guardar" title="Guardar em 🧪">💾</button><button class="bt peq" data-m="baixar" title="Baixar">⤓</button><button class="bt peq" data-m="chat" title="Coloca este código na caixa do chat">↩ Mandar para o chat</button><button class="bt peq" data-m="completo" title="Abre o Playground completo (igual ao da Replit)">⛶ Completo</button></div>' +
        '<textarea id="mesa-cod" spellcheck="false" autocapitalize="off" placeholder="Cole um código aqui, ou toque em ➡ Mesa num bloco de código da conversa."></textarea>' +
        '<iframe id="mesa-quadro" title="Prévia" sandbox="allow-scripts allow-forms allow-modals allow-popups"></iframe><div id="mesa-erros" class="pequeno"></div></section>' +
      // links
      '<section class="mesa-sec" data-sec="links"><div class="linha mesa-barra"><input class="campo" id="mesa-url" placeholder="https://…" inputmode="url" autocomplete="off" style="flex:1;margin:0"><button class="bt peq primario" data-m="ir">🌐 Abrir</button><button class="bt peq" data-m="guardarlink">➕</button><button class="bt peq" data-m="texto" title="Texto da página para a caixa do chat">📥</button><button class="bt peq" data-m="fora">↗</button></div>' +
        '<div id="mesa-links" class="mesa-lista"></div><iframe id="mesa-nav" title="Navegador" referrerpolicy="no-referrer" sandbox="allow-scripts allow-same-origin allow-forms allow-popups"></iframe><p class="pequeno mudo">Em branco? O site não deixa abrir dentro: use ↗ ou 📥.</p></section>' +
      // códigos
      '<section class="mesa-sec" data-sec="ferr"><p class="pequeno mudo" style="margin:0">Ferramentas que não gastam IA. Toque para abrir aqui.</p><div id="mesa-ferr" class="mesa-lista"></div><iframe id="mesa-ferr-q" title="Ferramenta" hidden></iframe></section>' +
      '<section class="mesa-sec" data-sec="cods"><input class="campo" id="mesa-busca" placeholder="Procurar nos códigos…" autocomplete="off"><div id="mesa-cods" class="mesa-lista"></div></section>';
    document.body.appendChild(m);
    m.addEventListener('click', clique);
    MC.$('#mesa-busca').oninput = pintarCodigos;
    MC.$('#mesa-url').addEventListener('keydown', (e) => { if (e.key === 'Enter') m.querySelector('[data-m="ir"]').click(); });
    MC.$('#mesa-cod').addEventListener('keydown', (e) => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') rodar(); if (e.key === 'Tab') { e.preventDefault(); const t = e.target, i = t.selectionStart; t.setRangeText('  ', i, t.selectionEnd, 'end'); } });
    window.addEventListener('message', (e) => { if (e.data && e.data.mesaErro) { const d = document.createElement('div'); d.textContent = '⚠ ' + e.data.mesaErro; MC.$('#mesa-erros').appendChild(d); } });
    // 20/11: o playground fica guardado — fechou, abriu de novo, o código está lá
    const g = MC.pref.get('mesaAtual', null); if (g && g.cod) { MC.$('#mesa-ling').value = g.ling || 'html'; MC.$('#mesa-cod').value = g.cod; atual = { ling: g.ling || 'html', cod: g.cod, id: g.id || null }; }
    let tg = null; MC.$('#mesa-cod').addEventListener('input', () => { clearTimeout(tg); tg = setTimeout(guardarAtual, 700); });
    MC.$('#mesa-ling').addEventListener('change', guardarAtual);
    trocarAba(aba);
  }
  function guardarAtual() { const c = MC.$('#mesa-cod'); if (!c) return; atual.cod = c.value; atual.ling = MC.$('#mesa-ling').value; MC.pref.set('mesaAtual', { ling: atual.ling, cod: atual.cod.length > 400000 ? '' : atual.cod, id: atual.id }); }
  function trocarAba(a) {
    aba = a; MC.pref.set('mesaAba', a);
    document.querySelectorAll('#mesa [data-aba]').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.aba === a)));
    document.querySelectorAll('#mesa .mesa-sec').forEach((s) => { s.hidden = s.dataset.sec !== a; });
    if (a === 'links') pintarLinks(); if (a === 'cods') pintarCodigos(); if (a === 'ferr') pintarFerr();
  }
  function aplicar() {
    const on = ligada();
    document.body.classList.toggle('com-mesa', on);
    if (on) { montar(); document.body.classList.remove('mesa-cheia'); }
    const b = MC.$('#bt-mesa'); if (b) { b.hidden = false; b.setAttribute('aria-pressed', String(on || document.body.classList.contains('mesa-cheia'))); }
  }
  // 20/11: no CELULAR a mesa abre por cima, na tela toda (antes só existia em tela grande)
  function cheia(abrir) { montar(); document.body.classList.toggle('mesa-cheia', abrir); const b = MC.$('#bt-mesa'); if (b) b.setAttribute('aria-pressed', String(abrir)); }
  function alternar() { if (LARGA()) { MC.pref.set('mesa', !ligada()); aplicar(); } else cheia(!document.body.classList.contains('mesa-cheia')); }
  function pintarFerr() {
    const l = window.FERRAMENTAS_SEM_IA || [];
    MC.$('#mesa-ferr').innerHTML = l.map((t) => '<button class="mesa-item" data-ferr="' + t[0] + '"><b>' + t[1] + ' ' + E(t[2]) + '</b><small>' + E(t[3]) + '</small></button>').join('');
  }
  // ▶ playground
  const CAPTURA = '<script>window.onerror=function(m,s,l){parent.postMessage({mesaErro:m+(l?" (linha "+l+")":"")},"*")};window.addEventListener("unhandledrejection",function(e){parent.postMessage({mesaErro:String(e.reason)},"*")});var _l=console.error;console.error=function(){parent.postMessage({mesaErro:[].join.call(arguments," ")},"*");_l.apply(console,arguments)};<\/script>';
  function rodar() {
    const ling = MC.$('#mesa-ling').value, cod = MC.$('#mesa-cod').value; atual.ling = ling; atual.cod = cod;
    MC.$('#mesa-erros').innerHTML = '';
    if (ling === 'tsx') { MC.previa.abrir('tsx', cod, atual.id); return; }
    if (ling === 'js' || ling === 'python') { if (MC.testar) MC.testar.testar(ling, cod); return; }
    const doc = ling === 'css' ? '<!doctype html><style>' + cod + '</style><h1>Título</h1><p>Texto de exemplo <a href="#">link</a></p><button>Botão</button>' : (/<html|<!doctype/i.test(cod) ? cod : '<!doctype html><meta charset="utf-8">' + cod);
    MC.$('#mesa-quadro').srcdoc = doc.replace(/<head[^>]*>/i, (h) => h + CAPTURA).replace(/^(?![\s\S]*<head)/, CAPTURA);
  }
  function receber(ling, cod) {
    if (!LARGA()) cheia(true);
    else if (!ligada()) { MC.pref.set('mesa', true); aplicar(); }
    trocarAba('play');
    const l = /^(js|javascript|mjs)$/i.test(ling) ? 'js' : /^(py|python)$/i.test(ling) ? 'python' : /^(tsx|jsx)$/i.test(ling) ? 'tsx' : /^css$/i.test(ling) ? 'css' : 'html';
    MC.$('#mesa-ling').value = l; MC.$('#mesa-cod').value = cod; atual = { ling: l, cod, id: null };
    guardarAtual();
    if (l === 'html' || l === 'css') rodar();
  }
  // 🔗 links
  async function pintarLinks() {
    const l = (await MC.banco.kv('links', [])) || [];
    MC.$('#mesa-links').innerHTML = l.length ? l.map((x, i) => '<button class="mesa-item" data-link="' + i + '"><b>' + E(x.nome || x.url) + '</b><small>' + E(x.url) + '</small></button>').join('') : '<p class="pequeno mudo">Nenhum link guardado. Cole um endereço e toque em ➕.</p>';
  }
  const urlBoa = (u) => { u = String(u || '').trim(); if (!u) return ''; if (!/^https?:\/\//i.test(u)) u = 'https://' + u; try { return new URL(u).href; } catch (e) { return ''; } };
  // 🧪 códigos
  async function pintarCodigos() {
    if (!MC.codigos) return;
    const b = (MC.$('#mesa-busca').value || '').toLowerCase();
    const l = Object.values(await MC.codigos.todos()).filter((c) => !b || (c.nome + ' ' + c.codigo).toLowerCase().includes(b)).sort((x, y) => (y.atualizado || 0) - (x.atualizado || 0));
    MC.$('#mesa-cods').innerHTML = l.length ? l.map((c) => '<button class="mesa-item" data-cod="' + E(c.id) + '"><b>' + E(c.nome) + '</b><small>' + E(c.lang || 'texto') + ' · ' + String(c.codigo || '').split('\n').length + ' linhas</small></button>').join('') : '<p class="pequeno mudo">Nenhum código guardado (💾 nos blocos de código).</p>';
  }
  async function clique(e) {
    const t = e.target.closest('[data-aba]'); if (t) { trocarAba(t.dataset.aba); return; }
    const lk = e.target.closest('[data-link]'); if (lk) { const l = (await MC.banco.kv('links', [])) || []; const x = l[+lk.dataset.link]; if (x) { MC.$('#mesa-url').value = x.url; MC.$('#mesa-nav').src = x.url; } return; }
    const cd = e.target.closest('[data-cod]'); if (cd) { const c = (await MC.codigos.todos())[cd.dataset.cod]; if (c) { receber(c.lang, c.codigo); atual.id = c.id; } return; }
    const fr = e.target.closest('[data-ferr]'); if (fr) { const q = MC.$('#mesa-ferr-q'); q.hidden = false; q.src = 'ferramentas/' + fr.dataset.ferr + '.html'; MC.$('#mesa-ferr').style.maxHeight = '30%'; return; }
    const b = e.target.closest('[data-m]'); if (!b) return;
    const a = b.dataset.m, cod = MC.$('#mesa-cod') ? MC.$('#mesa-cod').value : '';
    if (a === 'fechar') { if (document.body.classList.contains('mesa-cheia')) cheia(false); else { MC.pref.set('mesa', false); aplicar(); } }
    if (a === 'rodar') rodar();
    if (a === 'completo' && MC.codigos && MC.codigos.playground) { guardarAtual(); MC.codigos.playground({ nome: 'Da mesa', lang: MC.$('#mesa-ling').value === 'python' ? 'python' : MC.$('#mesa-ling').value === 'tsx' ? 'tsx' : 'html', codigo: cod, id: atual.id }); }
    if (a === 'copiar') MC.copiar(cod);
    if (a === 'baixar') MC.baixar('codigo.' + ({ html: 'html', js: 'js', python: 'py', css: 'css', tsx: 'tsx' })[MC.$('#mesa-ling').value], cod);
    if (a === 'guardar' && MC.codigos) { if (atual.id && await MC.codigos.atualizar(atual.id, cod)) MC.aviso('💾 Atualizado em 🧪', 'ok'); else { const id = await MC.codigos.guardar(MC.$('#mesa-ling').value, cod); if (id) atual.id = id; } guardarAtual(); }
    if (a === 'chat') { if (document.body.classList.contains('mesa-cheia')) cheia(false); const ent = MC.$('#entrada'); ent.value += (ent.value ? '\n\n' : '') + '```' + MC.$('#mesa-ling').value + '\n' + cod + '\n```\n'; ent.dispatchEvent(new Event('input')); ent.focus(); }
    const u = urlBoa(MC.$('#mesa-url') && MC.$('#mesa-url').value);
    if (a === 'ir') { if (u) MC.$('#mesa-nav').src = u; else MC.aviso('Cole um endereço primeiro.'); }
    if (a === 'guardarlink' && u && MC.links) { await MC.links.guardar(u); pintarLinks(); }
    if (a === 'texto' && u && MC.links) MC.links.trazer(u);
    if (a === 'fora' && u) window.open(u, '_blank', 'noopener');
  }
  document.addEventListener('DOMContentLoaded', () => {
    const top = MC.$('#topo');
    if (top && !MC.$('#bt-mesa')) { const b = document.createElement('button'); b.className = 'ic'; b.id = 'bt-mesa'; b.title = 'Mesa do lado: playground, links e códigos (não gasta IA)'; b.setAttribute('aria-label', 'Mesa'); b.textContent = '🧰'; b.onclick = alternar; top.appendChild(b); }
    aplicar();
    window.matchMedia('(min-width: 1000px)').addEventListener('change', aplicar);
  });
  MC.mesa = { receber, aplicar, ligada, alternar };
})(window.MC);
