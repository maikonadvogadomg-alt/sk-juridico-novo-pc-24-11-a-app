/* Meu Chat — 42-testar.js · 🧪 TESTAR O CÓDIGO AQUI DENTRO (a "sandbox") (18/11)
   Sandbox = uma caixa FECHADA onde o código roda sem mexer em nada seu.
   - JavaScript: roda num "trabalhador" separado, com tempo máximo de 10 segundos
     (se travar num laço infinito, ele é desligado). Mostra o console.log e os erros.
   - Python: roda com o Pyodide (Python dentro do navegador). Na 1ª vez baixa ~10 MB (precisa de internet).
   - HTML/TSX: continua no ▶ Ver funcionando (o playground), que já mostra os erros.
   Depois: 💬 "Mandar o resultado para a IA" — ela vê o erro e conserta. Nada vai sozinho. */
(function (MC) {
  'use strict';
  const E = MC.esc;
  const PYODIDE = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/';
  const ehJS = (l) => /^(js|javascript|mjs|cjs|node)$/i.test(l || '');
  const ehPy = (l) => /^(py|python|python3)$/i.test(l || '');
  const podeTestar = (l) => ehJS(l) || ehPy(l);
  function trabalhadorJS() {
    return `self.onmessage = async (e) => {
      const saida = []; const fmt = (a) => a.map((x) => { try { return typeof x === 'string' ? x : JSON.stringify(x); } catch (er) { return String(x); } }).join(' ');
      self.console = { log: (...a) => saida.push(fmt(a)), info: (...a) => saida.push(fmt(a)), warn: (...a) => saida.push('⚠ ' + fmt(a)), error: (...a) => saida.push('❌ ' + fmt(a)) };
      try { const r = await (0, eval)('(async () => {\\n' + e.data + '\\n})()'); if (r !== undefined) saida.push('↩ ' + fmt([r])); postMessage({ ok: true, saida }); }
      catch (er) { postMessage({ ok: false, saida, erro: (er && er.stack) ? String(er.stack).split('\\n').slice(0, 4).join('\\n') : String(er) }); }
    };`;
  }
  function trabalhadorPy() {
    return `importScripts('${PYODIDE}pyodide.js'); let py = null;
    self.onmessage = async (e) => {
      const saida = [];
      try {
        if (!py) { postMessage({ carregando: true }); py = await loadPyodide({ indexURL: '${PYODIDE}' }); }
        py.setStdout({ batched: (t) => saida.push(t) }); py.setStderr({ batched: (t) => saida.push('❌ ' + t) });
        try { await py.loadPackagesFromImports(e.data); } catch (er) {}
        const r = await py.runPythonAsync(e.data); if (r !== undefined && r !== null) saida.push('↩ ' + String(r));
        postMessage({ ok: true, saida });
      } catch (er) { postMessage({ ok: false, saida, erro: String(er && er.message || er).split('\\n').slice(-6).join('\\n') }); }
    };`;
  }
  function rodar(lang, codigo, aoCarregar) {
    return new Promise((ok) => {
      const py = ehPy(lang);
      const w = new Worker(URL.createObjectURL(new Blob([py ? trabalhadorPy() : trabalhadorJS()], { type: 'text/javascript' })));
      const limite = setTimeout(() => { w.terminate(); ok({ ok: false, saida: [], erro: '⏱ Passou de ' + (py ? 60 : 10) + ' segundos: parei (pode ser um laço que nunca termina, ou ele espera algo que não existe aqui).' }); }, py ? 60000 : 10000);
      w.onmessage = (e) => { if (e.data.carregando) { aoCarregar && aoCarregar(); return; } clearTimeout(limite); w.terminate(); ok(e.data); };
      w.onerror = (e) => { clearTimeout(limite); w.terminate(); ok({ ok: false, saida: [], erro: e.message || 'erro ao rodar' }); };
      w.postMessage(codigo);
    });
  }
  async function testar(lang, codigo) {
    const w = document.createElement('div'); w.className = 'janela-fundo';
    w.innerHTML = '<div class="janela" role="dialog" aria-modal="true" aria-label="Testar código"><div class="cab"><b>🧪 Testando (' + E(lang) + ')</b><button class="ic" data-t="fechar" aria-label="Fechar">✕</button></div>' +
      '<p class="mudo pequeno">Roda numa caixa fechada, sem mexer em nada seu. Coisas de tela (botões, página) não aparecem aqui: para isso use ▶ Ver funcionando.</p>' +
      '<pre class="z-ver t-saida">⏳ Rodando…</pre><div class="linha"><button class="bt" data-t="denovo">🔁 Rodar de novo</button><button class="bt primario" data-t="ia" hidden>💬 Mandar o resultado para a IA</button></div></div>';
    document.body.appendChild(w);
    const out = w.querySelector('.t-saida'); let ultimo = null;
    const vai = async () => {
      out.textContent = '⏳ Rodando…';
      const r = await rodar(lang, codigo, () => { out.textContent = '⏳ Baixando o Python (só na primeira vez, uns 10 MB)…'; });
      ultimo = r;
      out.textContent = (r.ok ? '✅ Rodou sem erro.' : '❌ Deu erro.') + '\n\n' + (r.saida && r.saida.length ? '── o que ele escreveu ──\n' + r.saida.join('\n').slice(0, 8000) + '\n' : '(não escreveu nada)\n') + (r.erro ? '\n── erro ──\n' + r.erro : '');
      w.querySelector('[data-t="ia"]').hidden = false;
    };
    w.addEventListener('click', (e) => {
      const b = e.target.closest('[data-t]'); if (!b && e.target !== w) return;
      const a = b ? b.dataset.t : 'fechar';
      if (a === 'fechar') w.remove();
      if (a === 'denovo') vai();
      if (a === 'ia' && ultimo) {
        const ent = MC.$('#entrada');
        ent.value += (ent.value ? '\n\n' : '') + 'Rodei o código (' + lang + ') aqui na caixa de teste e deu ' + (ultimo.ok ? 'CERTO' : 'ERRO') + ':\n```\n' + ((ultimo.saida || []).join('\n') + (ultimo.erro ? '\nERRO: ' + ultimo.erro : '')).slice(0, 6000) + '\n```\n' + (ultimo.ok ? 'Confira se o resultado é o esperado.' : 'Conserte e me mande o código INTEIRO de novo.');
        ent.dispatchEvent(new Event('input')); w.remove(); ent.focus();
      }
    });
    vai();
  }
  MC.testar = { testar, podeTestar, rodar };
})(window.MC);
