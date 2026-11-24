/* Meu Chat — 43-links.js · 🔗 LINKS E NAVEGADOR INTERNO (18/11)
   Um "colador de links" aqui dentro, que NÃO gasta nada da IA:
   - guarde os seus links (versões dos apps, repositórios, sites de tribunal…);
   - 🌐 Abrir aqui: abre o site numa janela dentro do Meu Chat (alguns sites não deixam: aí use ↗ Abrir fora);
   - 📥 Trazer o texto: pega o texto da página (leitor grátis) e coloca na caixa — VOCÊ decide se manda para a IA;
   - 📋 Copiar o link. Só gasta IA quando você enviar a mensagem. */
(function (MC) {
  'use strict';
  const E = MC.esc;
  const todos = async () => (await MC.banco.kv('links', [])) || [];
  const salvar = (l) => MC.banco.kvSet('links', l);
  const normal = (u) => { u = String(u || '').trim(); if (!u) return ''; if (!/^https?:\/\//i.test(u)) u = 'https://' + u; try { return new URL(u).href; } catch (e) { return ''; } };
  async function pintar() {
    const el = MC.$('#links-corpo'); if (!el) return;
    const l = await todos();
    el.innerHTML = l.length ? l.map((x, i) => '<div class="cod-item" data-i="' + i + '"><div style="flex:1;min-width:0"><b>' + E(x.nome || x.url) + '</b><div class="pequeno mudo" style="word-break:break-all">' + E(x.url) + '</div></div>' +
      '<button class="ic" data-l="abrir" title="Abrir aqui dentro">🌐</button><button class="ic" data-l="texto" title="Trazer o texto da página para a caixa (não gasta IA)">📥</button><button class="ic" data-l="fora" title="Abrir fora (no navegador)">↗</button><button class="ic" data-l="copiar" title="Copiar o link">📋</button><button class="ic" data-l="tirar" title="Tirar da lista">🗑</button></div>').join('')
      : '<p class="mudo pequeno">Nenhum link guardado. Cole um endereço acima e toque em ➕.</p>';
  }
  function navegador(url) {
    const w = document.createElement('div'); w.className = 'janela-fundo';
    w.innerHTML = '<div class="janela nav-janela" role="dialog" aria-modal="true" aria-label="Navegador"><div class="cab" style="gap:6px"><input class="campo" id="nav-url" value="' + E(url) + '" style="margin:0;flex:1;min-width:0" inputmode="url" autocomplete="off"><button class="ic" data-n="ir" title="Ir">➜</button><button class="ic" data-n="fechar" aria-label="Fechar">✕</button></div>' +
      '<iframe class="nav-quadro" src="' + E(url) + '" referrerpolicy="no-referrer" sandbox="allow-scripts allow-same-origin allow-forms allow-popups"></iframe>' +
      '<p class="pequeno mudo">Ficou em branco? Esse site não deixa abrir dentro de outro app. Use ↗ ou 📥.</p>' +
      '<div class="linha"><button class="bt primario" data-n="texto">📥 Trazer o texto para a caixa</button><button class="bt" data-n="fora">↗ Abrir fora</button><button class="bt" data-n="guardar">➕ Guardar o link</button></div></div>';
    document.body.appendChild(w);
    const atual = () => normal(w.querySelector('#nav-url').value);
    w.addEventListener('click', async (e) => {
      const b = e.target.closest('[data-n]'); if (!b && e.target !== w) return; const a = b ? b.dataset.n : 'fechar';
      if (a === 'fechar') w.remove();
      if (a === 'ir') { const u = atual(); if (u) w.querySelector('.nav-quadro').src = u; }
      if (a === 'fora') window.open(atual(), '_blank', 'noopener');
      if (a === 'guardar') await guardar(atual());
      if (a === 'texto') { await trazer(atual()); w.remove(); }
    });
    w.querySelector('#nav-url').addEventListener('keydown', (e) => { if (e.key === 'Enter') w.querySelector('[data-n="ir"]').click(); });
  }
  async function trazer(url) {
    if (!url) return;
    MC.aviso('📥 Pegando o texto da página…');
    try {
      const t = await MC.internet.lerLink(url);
      if (!t || !t.trim()) throw new Error('a página veio vazia');
      const ent = MC.$('#entrada'); ent.value += (ent.value ? '\n\n' : '') + 'Texto da página ' + url + ':\n"""\n' + t.slice(0, 40000) + '\n"""\n';
      ent.dispatchEvent(new Event('input')); MC.fecharPaineis();
      MC.aviso('📥 O texto está na caixa (' + Math.round(Math.min(t.length, 40000) / 4) + ' tokens se você mandar). Apague o que não precisa antes de enviar.', 'ok');
    } catch (e) { MC.aviso('⚠ Não consegui ler essa página (' + e.message + '). Abra em 🌐 ou ↗ e copie o pedaço que interessa.', 'erro'); }
  }
  async function guardar(url, nome) {
    url = normal(url); if (!url) { MC.aviso('Endereço inválido.', 'erro'); return; }
    const l = await todos(); if (l.some((x) => x.url === url)) { MC.aviso('Esse link já está guardado.'); return; }
    const n = nome != null ? nome : prompt('Nome para este link (opcional):', new URL(url).hostname.replace(/^www\./, ''));
    l.unshift({ url, nome: (n || '').trim(), quando: Date.now() }); await salvar(l); pintar(); MC.aviso('🔗 Link guardado.', 'ok');
  }
  async function clique(e) {
    const b = e.target.closest('[data-l]'); if (!b) return;
    const i = +b.closest('[data-i]').dataset.i, l = await todos(), x = l[i]; if (!x) return;
    const a = b.dataset.l;
    if (a === 'abrir') navegador(x.url);
    if (a === 'texto') trazer(x.url);
    if (a === 'fora') window.open(x.url, '_blank', 'noopener');
    if (a === 'copiar') MC.copiar(x.url);
    if (a === 'tirar' && confirm('Tirar "' + (x.nome || x.url) + '" da lista?')) { l.splice(i, 1); await salvar(l); pintar(); }
  }
  async function abrir() { await pintar(); MC.abrirPainel('painel-links'); }
  document.addEventListener('DOMContentLoaded', () => {
    const b = MC.$('#bt-links'); if (b) b.onclick = abrir;
    const c = MC.$('#links-corpo'); if (c) c.onclick = clique;
    const add = MC.$('#link-add'), abrirAqui = MC.$('#link-abrir'), campo = MC.$('#link-novo');
    if (add) add.onclick = async () => { await guardar(campo.value); campo.value = ''; };
    if (abrirAqui) abrirAqui.onclick = () => { const u = normal(campo.value); if (u) navegador(u); else MC.aviso('Cole um endereço primeiro.'); };
  });
  MC.links = { abrir, navegador, trazer, guardar };
})(window.MC);
