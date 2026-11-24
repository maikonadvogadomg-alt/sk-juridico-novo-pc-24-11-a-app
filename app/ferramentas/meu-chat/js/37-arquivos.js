/* Meu Chat — 37-arquivos.js · 📎 ARQUIVOS, 📦 ZIP e 🔤 ACENTOS (17/11)
   - 🔤 Lê qualquer texto com os acentos certos: tenta UTF-8 e, se não for, Windows-1252/Latin-1
     (era o "negócio de UTF-8" que fazia outros sites não lerem o arquivo).
   - 📦 Projeto .zip: abre AQUI DENTRO, mostra a árvore, deixa ver cada arquivo e você marca
     só o que vai para a IA (mostra quanto vai custar em tokens). Antes ia tudo e saía caro. */
(function (MC) {
  'use strict';
  const E = MC.esc;
  const TXT = /\.(html?|css|js|mjs|cjs|jsx|ts|tsx|json|md|txt|py|php|sql|xml|ya?ml|csv|ini|env\.example|sh|bat|ps1|java|kt|c|h|cpp|cs|go|rs|vue|svelte|toml|gitignore|htaccess)$/i;
  const LIXO = /(^|\/)(node_modules|dist|build|\.git|\.next|\.cache|\.local|\.upm|coverage|__pycache__)\//;
  const SEGREDO = /(^|\/)(\.env(\.[\w-]+)?|local\.config\.json|id_rsa[^/]*|.*\.pem|.*\.key)$/i;
  // 🔤 bytes → texto com acento certo
  function lerTexto(u8) {
    let b = u8 instanceof Uint8Array ? u8 : new Uint8Array(u8);
    if (b[0] === 0xEF && b[1] === 0xBB && b[2] === 0xBF) b = b.subarray(3);                       // BOM UTF-8
    if (b[0] === 0xFF && b[1] === 0xFE) return new TextDecoder('utf-16le').decode(b.subarray(2)); // UTF-16 (Bloco de Notas antigo)
    if (b[0] === 0xFE && b[1] === 0xFF) return new TextDecoder('utf-16be').decode(b.subarray(2));
    try { return new TextDecoder('utf-8', { fatal: true }).decode(b); }
    catch (e) { return new TextDecoder('windows-1252').decode(b); }
  }
  async function textoDoArquivo(f) { return lerTexto(new Uint8Array(await f.arrayBuffer())); }
  const tokens = (n) => Math.round(n / 4);
  const mil = (n) => (n >= 1000 ? (n / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + ' mil' : String(n));

  // 📦 abre o zip numa janela
  const item = (nome, tam, ler) => ({ nome, tam, ler, texto: TXT.test(nome) || /(^|\/)[^./]+$/.test(nome), lixo: LIXO.test(nome) || /\.min\.|package-lock|yarn\.lock|pnpm-lock/.test(nome), segredo: SEGREDO.test(nome) && !/\.example$/i.test(nome) });
  async function abrirZip(f) {
    if (!window.JSZip) throw new Error('leitor de zip não carregou');
    const z = await JSZip.loadAsync(f);
    const todos = Object.values(z.files).filter((x) => !x.dir);
    janela(f.name, todos.map((x) => item(x.name, (x._data && x._data.uncompressedSize) || 0, () => x.async('uint8array'))), 'Projeto .zip');
  }
  // 🐙 18/11: repositório PÚBLICO do GitHub pelo link — mostra a árvore e baixa SÓ os arquivos que você marcar
  // (mais leve que mandar o zip inteiro; a IA lê só o que precisa)
  async function abrirRepo(link) {
    const m = /github\.com\/([\w.-]+)\/([\w.-]+?)(?:\.git)?(?:\/tree\/([^/\s]+)(?:\/([^\s?#]*))?)?(?:[\s?#]|$)/i.exec(String(link || ''));
    if (!m) throw new Error('Não entendi o link. Tem que ser assim: https://github.com/dono/repositorio');
    const [, dono, repo, ramo0, pasta] = m;
    MC.aviso('🐙 Lendo o repositório ' + dono + '/' + repo + '…');
    const api = (p) => fetch('https://api.github.com/repos/' + dono + '/' + repo + p, { headers: { Accept: 'application/vnd.github+json' } }).then(async (r) => { if (r.status === 404) throw new Error('Não achei: o repositório é PRIVADO ou o link está errado (só os públicos abrem assim; privado → baixe o .zip).'); if (r.status === 403) throw new Error('O GitHub limitou as consultas por agora (60 por hora sem login). Tente daqui a pouco ou use o .zip.'); if (!r.ok) throw new Error('GitHub respondeu ' + r.status); return r.json(); });
    const ramo = ramo0 || (await api('')).default_branch || 'main';
    const arv = await api('/git/trees/' + encodeURIComponent(ramo) + '?recursive=1');
    let l = (arv.tree || []).filter((x) => x.type === 'blob');
    if (pasta) l = l.filter((x) => x.path.startsWith(pasta.replace(/\/$/, '') + '/'));
    if (!l.length) throw new Error('O repositório está vazio (ou a pasta não existe).');
    const raw = (p) => 'https://raw.githubusercontent.com/' + dono + '/' + repo + '/' + encodeURIComponent(ramo) + '/' + p.split('/').map(encodeURIComponent).join('/');
    janela(dono + '/' + repo + (pasta ? '/' + pasta : '') + ' (' + ramo + ')', l.map((x) => item(x.path, x.size || 0, async () => { const r = await fetch(raw(x.path)); if (!r.ok) throw new Error('não consegui baixar ' + x.path); return new Uint8Array(await r.arrayBuffer()); })), 'Repositório GitHub' + (arv.truncated ? ' (⚠ muito grande: a lista veio cortada)' : ''));
  }
  function janela(titulo, itens, rotulo) {
    const todos = itens;
    // marcados no começo: os de texto que importam (sem lixo, sem segredo), até ~60 mil tokens
    let soma = 0;
    itens.forEach((i) => { i.marcado = i.texto && !i.lixo && !i.segredo && i.tam < 300000 && (soma + i.tam) < 240000; if (i.marcado) soma += i.tam; });
    const w = document.createElement('div'); w.className = 'janela-fundo';
    w.innerHTML = '<div class="janela" role="dialog" aria-modal="true" aria-label="Projeto zip"><div class="cab"><b>' + (/GitHub/.test(rotulo) ? '🐙 ' : '📦 ') + E(titulo) + '</b><button class="ic" data-z="fechar" aria-label="Fechar">✕</button></div>' +
      '<p class="mudo pequeno">' + rotulo + ' · ' + todos.length + ' arquivos. Marque só o que a IA precisa ver — <b>menos arquivos = mais barato e ela se perde menos</b>. Toque no nome para ver o arquivo. 🔑 = parece senha (nunca vai marcado).</p>' +
      '<div class="linha"><button class="bt peq" data-z="todos">☑ Marcar os de texto</button><button class="bt peq" data-z="nenhum">☐ Desmarcar tudo</button><input class="campo" data-z="filtro" placeholder="Procurar…" style="flex:1;min-width:120px;margin:0"></div>' +
      '<div class="z-lista"></div><pre class="z-ver" hidden></pre>' +
      '<p class="z-conta pequeno"></p><div class="linha"><button class="bt primario" data-z="mandar">📎 Mandar os marcados</button><button class="bt" data-z="arvore">🌳 Mandar só a árvore</button></div></div>';
    document.body.appendChild(w);
    const lista = w.querySelector('.z-lista'), ver = w.querySelector('.z-ver');
    let filtro = '';
    const conta = () => { const m = itens.filter((i) => i.marcado), t = m.reduce((s, i) => s + i.tam, 0); w.querySelector('.z-conta').innerHTML = '<b>' + m.length + '</b> marcados · ≈ <b>' + mil(tokens(t)) + ' tokens</b> (vão junto nesta pergunta e nas próximas desta conversa)' + (tokens(t) > 100000 ? ' — ⚠ muito: marque menos' : ''); };
    const pintar = () => {
      lista.innerHTML = itens.map((i, k) => (filtro && !i.nome.toLowerCase().includes(filtro) ? '' : '<label class="z-item' + (i.lixo ? ' z-lixo' : '') + '"><input type="checkbox" data-k="' + k + '"' + (i.marcado ? ' checked' : '') + (i.texto ? '' : ' disabled') + '><span data-ver="' + k + '">' + (i.segredo ? '🔑 ' : '') + E(i.nome) + '</span><small>' + (i.tam ? mil(i.tam) + ' letras' : '') + '</small></label>')).join('');
      conta();
    };
    pintar();
    w.addEventListener('change', (e) => { const k = e.target.dataset.k; if (k != null) { itens[+k].marcado = e.target.checked; conta(); } });
    w.addEventListener('input', (e) => { if (e.target.dataset.z === 'filtro') { filtro = e.target.value.toLowerCase(); pintar(); } });
    w.addEventListener('click', async (e) => {
      const v = e.target.closest('[data-ver]');
      if (v) { e.preventDefault(); const i = itens[+v.dataset.ver]; if (!i.texto) { ver.hidden = false; ver.textContent = '(arquivo que não é texto: ' + i.nome + ')'; return; } ver.hidden = false; ver.textContent = '⏳'; try { ver.textContent = (await lerTexto(await i.ler())).slice(0, 20000); } catch (er) { ver.textContent = '⚠ ' + er.message; } ver.scrollIntoView({ block: 'nearest' }); return; }
      const b = e.target.closest('[data-z]'); if (!b || b.tagName === 'INPUT') return;
      const a = b.dataset.z;
      if (a === 'fechar') { w.remove(); return; }
      if (a === 'todos') { itens.forEach((i) => { i.marcado = i.texto && !i.lixo && !i.segredo; }); pintar(); }
      if (a === 'nenhum') { itens.forEach((i) => { i.marcado = false; }); pintar(); }
      if (a === 'mandar' || a === 'arvore') {
        b.disabled = true; b.textContent = '⏳ Pegando os arquivos…';
        let t = rotulo + ': ' + titulo + ' (' + todos.length + ' arquivos)\nÁrvore:\n' + todos.slice(0, 400).map((x) => '- ' + x.nome).join('\n') + (todos.length > 400 ? '\n- …' : '') + '\n';
        if (a === 'mandar') for (const i of itens.filter((x) => x.marcado)) { try { t += '\nArquivo: ' + i.nome + '\n```\n' + lerTexto(await i.ler()) + '\n```\n'; } catch (er) { t += '\n(⚠ ' + i.nome + ': ' + er.message + ')\n'; } }
        const ent = MC.$('#entrada'); ent.value += (ent.value ? '\n\n' : '') + t; ent.dispatchEvent(new Event('input'));
        MC.aviso('📦 ' + (a === 'mandar' ? itens.filter((x) => x.marcado).length + ' arquivo(s)' : 'a árvore') + ' na caixa de texto. Escreva o que quer e envie.', 'ok');
        w.remove();
      }
    });
  }
  // colou um link de repositório na caixa? aparece o botão 🐙
  document.addEventListener('DOMContentLoaded', () => {
    const ent = MC.$('#entrada'); if (!ent) return;
    const chip = document.createElement('button'); chip.type = 'button'; chip.className = 'bt peq primario'; chip.id = 'bt-repo'; chip.hidden = true; chip.textContent = '🐙 Abrir o repositório e escolher os arquivos';
    chip.style.margin = '4px 8px'; MC.$('#barra').prepend(chip);
    let link = '';
    ent.addEventListener('input', () => { const m = /https?:\/\/github\.com\/[\w.-]+\/[\w.-]+[^\s]*/i.exec(ent.value); link = m ? m[0] : ''; chip.hidden = !link; });
    chip.onclick = async () => { try { await abrirRepo(link); ent.value = ent.value.replace(link, '').trim(); chip.hidden = true; } catch (e) { MC.aviso('⚠ ' + e.message, 'erro'); } };
  });
  MC.arquivos = { lerTexto, textoDoArquivo, abrirZip, abrirRepo };
})(window.MC);
