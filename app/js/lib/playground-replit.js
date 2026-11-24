/* ▶ PLAYGROUND IGUAL AO DA REPLIT (20/11) — usado pelo Meu Chat e pelo SK Jurídico HTML.
   Feito a partir do playground do seu jurídico da Replit (o que funcionava no celular e no PC):
   • modos HTML / React / Python · abas HTML, CSS e JS · "Documento completo" detectado sozinho;
   • 👁 Auto = resultado AO VIVO enquanto digita (roda AQUI DENTRO, não precisa baixar);
   • no celular em pé: botão </> (código) e 👁 (resultado), igual ao da Replit;
   • ⬆ importar arquivo (sem limite de 2 MB) ou .zip (junta index + css + js sozinho);
   • 💾 salvar e 📂 abrir os salvos — vão para "Meus códigos", que sobem para a nuvem
     (com o Modo online/login, abriu no PC, está lá). Código igual NÃO é guardado duas vezes;
   • ⛶ tela cheia · 📋 copiar · ⤓ baixar · ↺ exemplo · 🗑 limpar · 🌙 tema.
   Uso: PlaygroundReplit.abrir({ armazem, item, mandarProChat }) — o "armazem" é quem guarda
   (Meu Chat ou SK Jurídico), com listar(), guardar(o), apagar(id). */
(function () {
  'use strict';
  const ESC = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const EXEMPLO = '<div style="max-width:600px;margin:40px auto;padding:20px;font-family:sans-serif">\n  <h1 style="color:#333">Bem-vindo ao Playground</h1>\n  <p style="color:#666;margin:16px 0">Cole seu código HTML aqui e veja o resultado ao vivo!</p>\n  <button onclick="this.textContent=\'Funcionou! ✅\'" style="padding:10px 24px;font-size:16px;background:#2563eb;color:#fff;border:0;border-radius:6px">Clique aqui</button>\n</div>';
  const EX_REACT = 'function App() {\n  const [n, setN] = useState(0);\n  return (\n    <div style={{ padding: 24, fontFamily: "sans-serif" }}>\n      <h1>React ao vivo</h1>\n      <button onClick={() => setN(n + 1)}>Cliquei {n} vez(es)</button>\n    </div>\n  );\n}';
  const EX_PY = 'nome = "Maikon"\nfor i in range(3):\n    print("Olá,", nome, i + 1)';
  const completo = (c) => { const l = String(c || '').toLowerCase(); return l.includes('<!doctype') || (l.includes('<html') && l.includes('</html>')); };
  const limparDoc = (c) => { const l = c.toLowerCase(); const i = Math.max(0, l.indexOf('<!doctype') >= 0 ? l.indexOf('<!doctype') : l.indexOf('<html')); return c.slice(i); };
  function detectar(c) {
    c = String(c || '').trim();
    if (/import\s+React/i.test(c) || /from ['"]react['"]/i.test(c) || (/useState|useEffect/.test(c) && !/<html/i.test(c))) return 'react';
    if (!c.includes('<') && (/^(def |class |import |from |print\()/m.test(c) || /^\s*if __name__/m.test(c))) return 'python';
    return null;
  }
  const preJSX = (c) => c.replace(/^import\s+React[^;\n]*;?\s*$/gm, '').replace(/^import\s+ReactDOM[^;\n]*;?\s*$/gm, '').replace(/^import\s+\{[^}]*\}\s+from\s+['"]react(-dom)?(\/client)?['"];?\s*$/gm, '').replace(/^export\s+default\s+function\s+(\w+)/gm, 'function $1').replace(/^export\s+default\s+(\w+)\s*;?\s*$/gm, '').replace(/^export\s+\{[^}]*\}\s*;?\s*$/gm, '').replace(/^export\s+(const|function|class)\s/gm, '$1 ');
  const ERROS = '<script>window.onerror=function(m,s,l){var d=document.createElement("div");d.style.cssText="position:fixed;left:0;right:0;bottom:0;background:#b91c1c;color:#fff;font:12px monospace;padding:6px;z-index:99999;white-space:pre-wrap";d.textContent="⚠ "+m+(l?" (linha "+l+")":"");document.body&&document.body.appendChild(d)};<\/script>';
  function docHTML(s) {
    if (completo(s.html)) { const h = limparDoc(s.html); return /<head[^>]*>/i.test(h) ? h.replace(/<head[^>]*>/i, (m) => m + ERROS) : ERROS + h; }
    return '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' + ERROS + '<style>' + s.css + '</style></head><body>' + s.html + '<script>' + s.js.replace(/<\/script>/gi, '<\\/script>') + '<\/script></body></html>';
  }
  function docReact(s) {
    return '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' + ERROS +
      '<script crossorigin src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"><\/script><script crossorigin src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"><\/script><script src="https://unpkg.com/@babel/standalone@7.26.4/babel.min.js"><\/script>' +
      '<style>*{box-sizing:border-box}body{margin:0;font-family:sans-serif}' + s.css + '</style></head><body><div id="root"></div><script type="text/babel" data-presets="react,typescript" data-filename="App.tsx">const { useState, useEffect, useRef, useCallback, useMemo, useContext, createContext, Fragment } = React;\n' +
      preJSX(s.jsx).replace(/<\/script>/gi, '<\\/script>') + '\ntry { ReactDOM.createRoot(document.getElementById("root")).render(<App />); } catch (e) { document.getElementById("root").innerHTML = "<pre style=\\"color:red;padding:16px;white-space:pre-wrap\\">Erro ao montar: " + e.message + "\\n\\nPrecisa ter um componente chamado App.</pre>"; }<\/script></body></html>';
  }
  function documento(s) { return s.mode === 'react' ? docReact(s) : docHTML(s); }
  // .zip → junta index.html + css + js do próprio zip num documento só
  async function doZip(f) {
    if (!window.JSZip) throw new Error('falta a peça de zip');
    const z = await JSZip.loadAsync(f); const arq = {}; const nomes = [];
    for (const [p, e] of Object.entries(z.files)) { if (e.dir || /node_modules\/|__MACOSX/.test(p)) continue; if (/\.(html?|css|m?js|jsx|tsx|py|txt|md|json|svg)$/i.test(p)) { arq[p] = await e.async('string'); nomes.push(p); } }
    const htmls = nomes.filter((p) => /\.html?$/i.test(p)).sort((a, b) => (/(^|\/)index\.html?$/i.test(b) ? 1 : 0) - (/(^|\/)index\.html?$/i.test(a) ? 1 : 0) || a.length - b.length);
    const pasta = (p) => p.replace(/[^/]*$/, '');
    const junta = (p) => { const base = pasta(p); let h = arq[p]; const achar = (rel) => { rel = rel.replace(/^\.\//, '').split('?')[0]; const tent = [base + rel, rel]; return tent.find((t) => arq[t] != null); };
      h = h.replace(/<link[^>]+href=["']([^"']+\.css)["'][^>]*>/gi, (m, href) => { const k = achar(href); return k ? '<style>/* ' + k + ' */\n' + arq[k] + '\n</style>' : m; });
      h = h.replace(/<script([^>]*)\ssrc=["']([^"']+\.m?js)["']([^>]*)><\/script>/gi, (m, a, src, b) => { const k = achar(src); return k ? '<script' + a + b + '>/* ' + k + ' */\n' + arq[k].replace(/<\/script>/gi, '<\\/script>') + '\n<\/script>' : m; });
      return h; };
    return { htmls, arq, junta, nomes };
  }
  function abrir(o) {
    o = o || {}; const A = o.armazem; const CH = 'pg-replit:' + (o.chave || 'app');
    let s = { mode: 'html', html: EXEMPLO, css: '', js: '', jsx: EX_REACT, python: EX_PY, titulo: 'Sem título', id: null };
    try { const g = JSON.parse(localStorage.getItem(CH) || 'null'); if (g) s = Object.assign(s, g); } catch (e) {}
    if (o.item) s = Object.assign(s, o.item);
    let aba = s.mode === 'react' ? 'jsx' : s.mode === 'python' ? 'python' : 'html', auto = true, verCodigo = true, timer = null, escuro = localStorage.getItem('pg-replit:escuro') === '1';
    const w = document.createElement('div'); w.className = 'pgr' + (escuro ? ' pgr-escuro' : ''); w.setAttribute('role', 'dialog'); w.setAttribute('aria-label', 'Playground');
    w.innerHTML = '<style>' + CSS + '</style><div class="pgr-topo"><span class="pgr-logo">&lt;/&gt;</span><div class="pgr-modos" role="tablist"><button data-modo="html">🌐 HTML</button><button data-modo="react">⚛ React</button><button data-modo="python">🐍 Python</button></div><input class="pgr-tit" aria-label="Nome do código"></div>' +
      '<div class="pgr-barra"><button class="pgr-b pgr-vc" data-a="codigo" title="Ver o código">&lt;/&gt;</button><button class="pgr-b pgr-vc" data-a="ver" title="Ver o resultado">👁</button><button class="pgr-b pgr-auto" data-a="auto" title="Resultado ao vivo">👁 Auto</button><button class="pgr-b" data-a="rodar" title="Executar">▶</button><span class="pgr-sep"></span>' +
      '<button class="pgr-b" data-a="importar" title="Importar arquivo ou .zip">⬆</button><button class="pgr-b" data-a="cheia" title="Tela cheia">⛶</button><button class="pgr-b" data-a="copiar" title="Copiar">📋</button><button class="pgr-b" data-a="baixar" title="Baixar">⤓</button><button class="pgr-b" data-a="salvar" title="Salvar em Meus códigos (vai para a nuvem)">💾</button><button class="pgr-b" data-a="abrir" title="Abrir um salvo">📂</button><span class="pgr-sep"></span><button class="pgr-b" data-a="exemplo" title="Voltar ao exemplo">↺</button><button class="pgr-b" data-a="limpar" title="Limpar">🗑</button>' +
      (o.mandarProChat ? '<button class="pgr-b" data-a="chat" title="Mandar este código para a IA">↩ Chat</button>' : '') + '<button class="pgr-b" data-a="tema" title="Claro/escuro">🌙</button><button class="pgr-b pgr-fechar" data-a="fechar" title="Fechar" aria-label="Fechar">✕</button></div>' +
      '<div class="pgr-corpo"><section class="pgr-ed"><div class="pgr-abas"></div><div class="pgr-info"></div><div class="pgr-area"><pre class="pgr-num" aria-hidden="true"></pre><textarea class="pgr-txt" spellcheck="false" autocapitalize="off" autocomplete="off" wrap="off"></textarea></div></section>' +
      '<section class="pgr-res"><div class="pgr-res-topo">👁 Resultado <span class="pgr-vivo">● ao vivo</span></div><iframe class="pgr-q" title="Resultado" sandbox="allow-scripts allow-forms allow-modals allow-popups allow-downloads"></iframe><pre class="pgr-saida" hidden></pre></section></div>' +
      '<input type="file" class="pgr-arq" hidden accept=".html,.htm,.js,.mjs,.jsx,.tsx,.py,.css,.svg,.txt,.md,.json,.zip,text/*">';
    document.body.appendChild(w);
    const $ = (q) => w.querySelector(q), txt = $('.pgr-txt'), num = $('.pgr-num'), q = $('.pgr-q'), saida = $('.pgr-saida');
    const aviso = (t) => { const d = document.createElement('div'); d.className = 'pgr-aviso'; d.textContent = t; w.appendChild(d); setTimeout(() => d.remove(), 3500); };
    const guardarLocal = () => { try { const c = JSON.stringify(s); if (c.length < 3e6) localStorage.setItem(CH, c); } catch (e) {} };
    function abas() {
      const l = s.mode === 'python' ? [['python', '🐍 Python']] : s.mode === 'react' ? [['jsx', '⚛ JSX'], ['css', '🎨 CSS']] : completo(s.html) ? [['html', '📄 HTML']] : [['html', '📄 HTML'], ['css', '🎨 CSS'], ['js', '{ } JS']];
      if (!l.some((x) => x[0] === aba)) aba = l[0][0];
      $('.pgr-abas').innerHTML = l.map((x) => '<button data-aba="' + x[0] + '"' + (x[0] === aba ? ' aria-selected="true"' : '') + '>' + x[1] + '</button>').join('');
      w.querySelectorAll('[data-modo]').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.modo === s.mode)));
      $('.pgr-auto').hidden = s.mode === 'python'; $('[data-a="rodar"]').hidden = auto && s.mode !== 'python';
      $('.pgr-auto').classList.toggle('on', auto); $('.pgr-vivo').hidden = !auto || s.mode === 'python';
      txt.value = s[aba] || ''; numeros(); info();
      q.hidden = s.mode === 'python'; saida.hidden = s.mode !== 'python';
    }
    function info() { const linhas = (s[aba] || '').split('\n').length; $('.pgr-info').innerHTML = (s.mode === 'html' && completo(s.html) ? '<b>Documento completo</b> · ' : '') + linhas + ' linhas' + (s.id ? ' · 💾 salvo' : ''); }
    function numeros() { const n = (txt.value.match(/\n/g) || []).length + 1; if (n > 20000) { num.textContent = ''; return; } let t = ''; for (let i = 1; i <= n; i++) t += i + '\n'; num.textContent = t; num.scrollTop = txt.scrollTop; }
    function mostrar() { if (s.mode === 'python') return; q.srcdoc = documento(s); }
    async function rodarPython() {
      saida.textContent = '⟳ Executando… (a 1ª vez baixa o Python, uns 10 MB)';
      try {
        if (!window.loadPyodide) await new Promise((ok, erro) => { const sc = document.createElement('script'); sc.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js'; sc.onload = ok; sc.onerror = () => erro(new Error('sem internet para baixar o Python')); document.head.appendChild(sc); });
        if (!window.__pyo) window.__pyo = loadPyodide(); const py = await window.__pyo; let out = '';
        py.setStdout({ batched: (t) => { out += t + '\n'; } }); py.setStderr({ batched: (t) => { out += '⚠ ' + t + '\n'; } });
        await py.runPythonAsync(s.python); saida.textContent = '$ python3 script.py\n' + (out || '(rodou sem imprimir nada)');
      } catch (e) { saida.textContent = '⚠ ' + (e.message || e); }
    }
    function mudouTexto() { s[aba] = txt.value; numeros(); info(); s.id = s.id; guardarLocal(); if (auto && s.mode !== 'python') { clearTimeout(timer); timer = setTimeout(mostrar, (s[aba] || '').length > 300000 ? 1500 : 500); } }
    function pegarSalvo(it) {
      const pg = it.pg || {}; const cod = it.codigo || '';
      const lang = String(it.lang || it.tipo || '').toLowerCase();
      const m = pg.mode || (/^(py|python)$/.test(lang) ? 'python' : /^(tsx|jsx|react)$/.test(lang) ? 'react' : detectar(cod) || 'html');
      s = Object.assign(s, { mode: m, html: m === 'html' ? (pg.html != null ? pg.html : cod) : s.html, css: pg.css || '', js: pg.js || '', jsx: m === 'react' ? (pg.jsx || cod) : s.jsx, python: m === 'python' ? (pg.python || cod) : s.python, titulo: it.nome || it.titulo || 'Sem título', id: it.id });
      aba = m === 'react' ? 'jsx' : m === 'python' ? 'python' : 'html'; $('.pgr-tit').value = s.titulo; abas(); mostrar(); guardarLocal();
    }
    function carregarTexto(nome, cod) {
      const ext = (nome.split('.').pop() || '').toLowerCase(); const titulo = nome.replace(/\.[^.]+$/, '') || 'Importado';
      if (ext === 'py') s = Object.assign(s, { mode: 'python', python: cod });
      else if (ext === 'jsx' || ext === 'tsx') s = Object.assign(s, { mode: 'react', jsx: cod });
      else if (ext === 'css') s = Object.assign(s, { mode: 'html', css: cod });
      else if ((ext === 'js' || ext === 'mjs') && !completo(cod)) { const d = detectar(cod); s = Object.assign(s, d === 'react' ? { mode: 'react', jsx: cod } : { mode: 'html', js: cod }); }
      else if (completo(cod)) s = Object.assign(s, { mode: 'html', html: limparDoc(cod), css: '', js: '' });
      else s = Object.assign(s, { mode: 'html', html: cod });
      s.titulo = titulo; s.id = null; $('.pgr-tit').value = titulo; aba = s.mode === 'react' ? 'jsx' : s.mode === 'python' ? 'python' : (ext === 'css' ? 'css' : ext === 'js' ? 'js' : 'html'); abas(); mostrar(); guardarLocal();
      aviso('⬆ "' + nome + '" carregado (' + Math.round(cod.length / 1024) + ' KB).');
    }
    async function importar(f) {
      if (/\.zip$/i.test(f.name)) {
        aviso('⏳ Abrindo o zip…'); const r = await doZip(f);
        if (!r.htmls.length) { const p = r.nomes[0]; if (!p) throw new Error('o zip não tem código'); return carregarTexto(p, r.arq[p]); }
        const esc = r.htmls.length === 1 ? r.htmls[0] : await escolher('Qual página abrir? (eu junto o CSS e o JS dela)', r.htmls);
        if (!esc) return;
        carregarTexto(esc.split('/').pop(), r.junta(esc)); s.titulo = f.name.replace(/\.zip$/i, '') + (r.htmls.length > 1 ? ' / ' + esc : ''); $('.pgr-tit').value = s.titulo; guardarLocal();
        if (A && r.htmls.length > 1 && confirm('Guardar também as ' + r.htmls.length + ' páginas desse zip em "Meus códigos"? (as repetidas são puladas)')) { let n = 0, rep = 0; for (const p of r.htmls) { const ok = await A.guardar({ nome: f.name.replace(/\.zip$/i, '') + ' / ' + p, lang: 'html', codigo: r.junta(p) }); if (ok === 'repetido') rep++; else n++; } aviso('💾 ' + n + ' guardada(s)' + (rep ? ', ' + rep + ' repetida(s) pulada(s)' : '') + '.'); }
        return;
      }
      carregarTexto(f.name, await f.text());
    }
    function escolher(titulo, lista) {
      return new Promise((ok) => {
        const d = document.createElement('div'); d.className = 'pgr-modal';
        d.innerHTML = '<div class="pgr-caixa"><b>' + ESC(titulo) + '</b>' + (lista.length > 8 ? '<input class="pgr-busca" placeholder="Procurar…">' : '') + '<div class="pgr-lista">' + lista.map((x, i) => '<button data-i="' + i + '">' + ESC(typeof x === 'string' ? x : x.rot) + '</button>').join('') + '</div><button class="pgr-b" data-x="1">Cancelar</button></div>';
        w.appendChild(d); const bu = d.querySelector('.pgr-busca'); if (bu) bu.oninput = () => d.querySelectorAll('[data-i]').forEach((b) => { b.hidden = !b.textContent.toLowerCase().includes(bu.value.toLowerCase()); });
        d.addEventListener('click', (e) => { const b = e.target.closest('[data-i],[data-x],[data-apagar]'); if (!b) { if (e.target === d) { d.remove(); ok(null); } return; } if (b.dataset.apagar != null) return; d.remove(); ok(b.dataset.x ? null : lista[+b.dataset.i]); });
      });
    }
    function paraGuardar() {
      const nome = ($('.pgr-tit').value || '').trim() || 'Sem título';
      if (s.mode === 'python') return { nome, lang: 'python', codigo: s.python, pg: { mode: 'python' } };
      if (s.mode === 'react') return { nome, lang: 'tsx', codigo: s.jsx, pg: { mode: 'react', jsx: s.jsx, css: s.css } };
      const cod = completo(s.html) || (!s.css && !s.js) ? s.html : docHTML(s).replace(ERROS, '');
      return { nome, lang: 'html', codigo: cod, pg: { mode: 'html', html: s.html, css: s.css, js: s.js } };
    }
    w.addEventListener('click', async (e) => {
      const m = e.target.closest('[data-modo]'); if (m) { s.mode = m.dataset.modo; aba = s.mode === 'react' ? 'jsx' : s.mode === 'python' ? 'python' : 'html'; abas(); mostrar(); guardarLocal(); return; }
      const ab = e.target.closest('[data-aba]'); if (ab) { aba = ab.dataset.aba; abas(); return; }
      const b = e.target.closest('[data-a]'); if (!b) return; const a = b.dataset.a;
      try {
        if (a === 'fechar') { guardarLocal(); w.remove(); document.removeEventListener('keydown', tecla); }
        if (a === 'codigo') { verCodigo = true; w.classList.remove('pgr-so-res'); }
        if (a === 'ver') { verCodigo = false; w.classList.add('pgr-so-res'); mostrar(); }
        if (a === 'auto') { auto = !auto; abas(); if (auto) mostrar(); }
        if (a === 'rodar') { if (s.mode === 'python') rodarPython(); else mostrar(); if (!verCodigo || matchMedia('(max-width: 899px)').matches) { w.classList.add('pgr-so-res'); verCodigo = false; } }
        if (a === 'importar') $('.pgr-arq').click();
        if (a === 'cheia') { const u = URL.createObjectURL(new Blob([s.mode === 'python' ? '<pre>' + ESC(saida.textContent) + '</pre>' : documento(s)], { type: 'text/html' })); window.open(u, '_blank'); }
        if (a === 'copiar') { await navigator.clipboard.writeText(paraGuardar().codigo); aviso('📋 Copiado.'); }
        if (a === 'baixar') { const g = paraGuardar(); const ext = { html: 'html', tsx: 'tsx', python: 'py' }[g.lang]; const l = document.createElement('a'); l.href = URL.createObjectURL(new Blob([g.codigo], { type: 'text/plain' })); l.download = g.nome.replace(/[\\/:*?"<>|]+/g, '-') + '.' + ext; l.click(); }
        if (a === 'salvar') { if (!A) return aviso('Aqui não tem onde guardar.'); const g = paraGuardar(); g.id = s.id; const r = await A.guardar(g); if (r === 'repetido') aviso('Esse código já estava guardado igualzinho.'); else { s.id = r; s.titulo = g.nome; guardarLocal(); info(); aviso('💾 Salvo em Meus códigos' + (A.nuvem && A.nuvem() ? ' (e vai para a nuvem)' : '') + '.'); } }
        if (a === 'abrir') { if (!A) return; const l = (await A.listar()).sort((x, y) => (y.atualizado || 0) - (x.atualizado || 0)); if (!l.length) return aviso('Nenhum código salvo ainda.'); const it = await escolher('📂 Abrir um código salvo (' + l.length + ')', l.map((x) => ({ rot: (x.nome || 'Sem nome') + '  · ' + String(x.codigo || '').split('\n').length + ' linhas', it: x }))); if (it) pegarSalvo(it.it); }
        if (a === 'exemplo') { if (!confirm('Voltar ao exemplo? (o que está aqui e não foi salvo some)')) return; Object.assign(s, { html: EXEMPLO, css: '', js: '', jsx: EX_REACT, python: EX_PY, titulo: 'Sem título', id: null }); $('.pgr-tit').value = s.titulo; abas(); mostrar(); guardarLocal(); }
        if (a === 'limpar') { if (!confirm('Limpar o editor? (os códigos salvos continuam guardados)')) return; s[aba] = ''; s.id = null; abas(); mostrar(); guardarLocal(); }
        if (a === 'chat' && o.mandarProChat) { o.mandarProChat(paraGuardar()); guardarLocal(); w.remove(); }
        if (a === 'tema') { escuro = !escuro; w.classList.toggle('pgr-escuro', escuro); try { localStorage.setItem('pg-replit:escuro', escuro ? '1' : '0'); } catch (er) {} }
      } catch (er) { aviso('⚠ ' + er.message); }
    });
    txt.addEventListener('input', mudouTexto);
    txt.addEventListener('scroll', () => { num.scrollTop = txt.scrollTop; });
    txt.addEventListener('paste', (e) => {
      const p = (e.clipboardData || window.clipboardData).getData('text'); if (!p || txt.value.trim()) return;
      const d = detectar(p);
      if (d && d !== s.mode) { e.preventDefault(); s.mode = d; s[d === 'react' ? 'jsx' : 'python'] = p; aba = d === 'react' ? 'jsx' : 'python'; abas(); mostrar(); guardarLocal(); aviso(d === 'react' ? '⚛ React detectado.' : '🐍 Python detectado.'); return; }
      if (s.mode === 'html' && completo(p)) { e.preventDefault(); s.html = limparDoc(p); s.css = ''; s.js = ''; aba = 'html'; abas(); mostrar(); guardarLocal(); aviso('📄 Documento completo detectado: CSS e JS separados foram limpos.'); }
    });
    txt.addEventListener('keydown', (e) => { if (e.key === 'Tab') { e.preventDefault(); txt.setRangeText('  ', txt.selectionStart, txt.selectionEnd, 'end'); mudouTexto(); } });
    const tecla = (e) => { if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); w.querySelector('[data-a="salvar"]').click(); } if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); w.querySelector('[data-a="rodar"]').click(); } };
    document.addEventListener('keydown', tecla);
    $('.pgr-arq').onchange = async (e) => { const f = e.target.files[0]; e.target.value = ''; if (f) try { await importar(f); } catch (er) { aviso('⚠ ' + er.message); } };
    $('.pgr-tit').value = s.titulo; $('.pgr-tit').oninput = () => { s.titulo = $('.pgr-tit').value; guardarLocal(); };
    abas(); mostrar();
    if (o.item && o.item.codigo != null) pegarSalvo(o.item);
    return { fechar: () => w.remove(), carregar: carregarTexto };
  }
  const CSS = '.pgr{position:fixed;inset:0;z-index:9600;display:flex;flex-direction:column;background:#f7f7f2;color:#1c1c1a;font:15px/1.4 system-ui,sans-serif;--pa:#e9e9e2;--li:#d4d4cc;--ac:#6b7c4b}' +
    '.pgr.pgr-escuro{background:#1b1b18;color:#ecece6;--pa:#26261f;--li:#3a3a33;--ac:#8fa36a}' +
    '.pgr-topo,.pgr-barra{display:flex;align-items:center;gap:6px;padding:6px 8px;flex-wrap:wrap;border-bottom:1px solid var(--li)}' +
    '.pgr-logo{font-weight:700;color:var(--ac);font-family:monospace}.pgr-modos{display:flex;background:var(--pa);border:1px solid var(--li);border-radius:10px;padding:3px}' +
    '.pgr-modos button,.pgr-abas button{background:none;border:0;color:inherit;font:inherit;padding:6px 12px;border-radius:8px;cursor:pointer;min-height:36px}' +
    '.pgr-modos button[aria-selected=true]{background:var(--ac);color:#fff}.pgr-abas button[aria-selected=true]{background:var(--pa);font-weight:700}' +
    '.pgr-tit{flex:1;min-width:120px;border:0;background:none;color:inherit;font:inherit;padding:6px}' +
    '.pgr-b{background:none;border:1px solid transparent;color:inherit;font:inherit;min-width:42px;min-height:42px;border-radius:10px;cursor:pointer;padding:0 8px}.pgr-b:hover{background:var(--pa)}' +
    '.pgr-auto.on{background:var(--ac);color:#fff}.pgr-sep{width:1px;height:24px;background:var(--li)}.pgr-fechar{margin-left:auto}' +
    '.pgr-corpo{flex:1;display:grid;grid-template-columns:1fr 1fr;min-height:0}.pgr-ed{display:flex;flex-direction:column;min-width:0;min-height:0;border-right:1px solid var(--li)}' +
    '.pgr-abas{display:flex;gap:4px;padding:6px;background:var(--pa)}.pgr-info{font-size:12px;opacity:.75;padding:2px 10px}' +
    '.pgr-area{flex:1;display:flex;min-height:0;overflow:hidden}.pgr-num{margin:0;padding:10px 6px;min-width:44px;text-align:right;opacity:.5;font:13px/1.55 ui-monospace,Consolas,monospace;overflow:hidden;user-select:none}' +
    '.pgr-txt{flex:1;border:0;outline:0;resize:none;padding:10px;background:transparent;color:inherit;font:13px/1.55 ui-monospace,Consolas,monospace;white-space:pre;overflow:auto;tab-size:2}' +
    '.pgr-res{display:flex;flex-direction:column;min-width:0;min-height:0}.pgr-res-topo{padding:6px 10px;font-size:13px;border-bottom:1px solid var(--li)}.pgr-vivo{color:#16a34a;margin-left:6px}' +
    '.pgr-q{flex:1;width:100%;border:0;background:#fff}.pgr-saida{flex:1;margin:0;padding:12px;background:#0d1117;color:#c9d1d9;font:13px/1.5 ui-monospace,monospace;white-space:pre-wrap;overflow:auto}' +
    '.pgr-vc{display:none}@media (max-width:899px){.pgr-corpo{grid-template-columns:1fr}.pgr-vc{display:inline-block}.pgr-res{display:none}.pgr.pgr-so-res .pgr-res{display:flex}.pgr.pgr-so-res .pgr-ed{display:none}}' +
    '.pgr-aviso{position:fixed;left:50%;bottom:20px;transform:translateX(-50%);background:#1c1c1a;color:#fff;padding:10px 16px;border-radius:12px;z-index:9700;max-width:90vw}' +
    '.pgr-modal{position:fixed;inset:0;background:#0007;z-index:9650;display:flex;align-items:center;justify-content:center;padding:16px}.pgr-caixa{background:var(--pa);color:inherit;border-radius:14px;padding:14px;width:min(560px,100%);max-height:85vh;display:flex;flex-direction:column;gap:8px}' +
    '.pgr-lista{overflow:auto;display:flex;flex-direction:column;gap:4px}.pgr-lista button{text-align:left;background:none;border:1px solid var(--li);color:inherit;font:inherit;padding:10px;border-radius:10px;cursor:pointer;word-break:break-all}.pgr-busca{padding:8px;border-radius:8px;border:1px solid var(--li);font:inherit}';
  window.PlaygroundReplit = { abrir, documento, detectar };
})();
