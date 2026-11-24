/* =========================================================================
   Assistente Jurídico — 20-processar.js
   ⚡ Processar: cole/abra o texto do processo → escolha o que fazer →
   resultado formatado → Editor, Word, ouvir, salvar ou conversar sobre ele.
   As ações vieram do "Assistente Jurídico Pro" antigo (mesmos pedidos).
   ========================================================================= */
(function (J) {
  'use strict';
  const ACOES = J.motor.ACOES; // ⚙️ as ações e os textos do motor do SK Jurídico (21-motor.js)
  let painel, controle = null, ultimo = null; // ultimo = {acao, md, html, titulo}
  const $ = (s) => J.$(s, painel);

  function montar(el) {
    painel = el;
    el.innerHTML =
      '<div class="cartao">' +
      '  <h2>1. O texto</h2>' +
      '  <div class="linha" style="margin-bottom:8px"><button class="bt" id="pr-abrir">📂 Abrir arquivo</button><button class="bt" id="pr-ditar">🎤 Ditar</button><button class="bt" id="pr-do-editor">✏️ Pegar do Editor</button><button class="bt mini perigo" id="pr-limpar">🗑 Limpar</button></div>' +
      '  <textarea id="pr-texto" placeholder="Cole aqui o texto do processo, a decisão, a petição ou conte o caso. Ou toque em 📂 Abrir arquivo (PDF, Word)."></textarea>' +
      '  <div class="peq mut" id="pr-conta">0 caracteres</div>' +
      '</div>' +
      '<div class="cartao">' +
      '  <h2>2. O que fazer</h2>' +
      '  <div class="acoes-ia" id="pr-acoes"></div>' +
      '  <label class="campo" for="pr-extra">Seu pedido (opcional — vale junto com o botão, ou sozinho)</label>' +
      '  <div class="linha"><textarea id="pr-extra" class="cresce" style="min-height:60px" placeholder="Ex.: foque no tempo especial; peça tutela de urgência; use o modelo do escritório…"></textarea><button class="bt" id="pr-extra-ditar" title="Ditar o pedido">🎤</button></div>' +
      '  <div class="linha" style="margin-top:8px"><button class="bt forte" id="pr-livre">▶ Fazer só o meu pedido</button>' +
      '  <label class="peq"><input type="checkbox" id="pr-ementas"> usar as ementas marcadas (📚) — o motor escolhe as 2 mais fortes</label><label class="peq"><input type="checkbox" id="pr-internet"> 🌐 pesquisar na internet</label></div>' +
      '  <div class="linha" style="margin-top:8px;flex-wrap:wrap;gap:10px">' +
      '    <label class="peq">💪 Esforço <select id="pr-esforco"><option value="1">1 · rápido</option><option value="2">2 · básico</option><option value="3">3 · detalhado</option><option value="4">4 · profundo</option><option value="5">5 · exaustivo</option></select></label>' +
      '    <label class="peq">📏 Tamanho <select id="pr-tamanho"><option value="longa">Completa</option><option value="curta">Concisa</option></select></label>' +
      '    <label class="peq" title="Para processo grande: um passo antes resume tudo (de graça, com o Ollama do computador, ou com a mesma IA) e depois a IA forte faz a peça"><input type="checkbox" id="pr-2passos"> 🦙 Resumir antes (processo grande)</label>' +
      '    <label class="peq" title="Leva as suas 3 últimas respostas, para a IA manter a linha de raciocínio"><input type="checkbox" id="pr-hist"> 📜 Lembrar as 3 últimas</label>' +
      '  </div>' +
      '</div>' +
      '<div class="cartao" id="pr-saida" hidden>' +
      '  <div class="linha"><h2 class="cresce" id="pr-titulo">Resultado</h2><button class="bt mini" id="pr-parar" hidden>⏹ Parar</button></div>' +
      '  <div class="resultado" id="pr-resultado"></div>' +
      '  <div class="linha" style="margin-top:10px" id="pr-bts" hidden>' +
      '    <button class="bt forte" id="pr-editor">✏️ Abrir no Editor</button><button class="bt" id="pr-word">⬇ Word</button><button class="bt" id="pr-copiar">📋 Copiar</button>' +
      '    <button class="bt" id="pr-ouvir">🔊 Ouvir</button><button class="bt" id="pr-salvar">💾 Salvar</button><button class="bt" id="pr-conversar">💬 Conversar sobre isto</button><button class="bt" id="pr-refazer">↻ Refazer</button>' +
      '  </div>' +
      '</div>';
    const pintarAcoes = () => {
      const minhas = (J.regras ? J.regras.acoes() : []).map((a) => ({ id: 'minha:' + a.id, nome: '⭐ ' + a.titulo, dica: 'sua ação', p: a.texto }));
      $('#pr-acoes').innerHTML = ACOES.concat(minhas).map((a) => '<button class="bt" data-acao="' + a.id + '">' + J.esc(a.nome) + '<small>' + J.esc(a.dica) + '</small></button>').join('') +
        '<button class="bt" data-ir="regras" title="Criar um botão com o seu pedido">＋ Criar minha ação<small>vira um botão aqui</small></button>';
    };
    pintarAcoes(); J.on('regras', pintarAcoes);
    $('#pr-internet').checked = J.pref.get('internet', false); $('#pr-internet').onchange = (e) => J.pref.set('internet', e.target.checked);
    [['pr-esforco', 'esforco', '3'], ['pr-tamanho', 'tamanho', 'longa']].forEach(([id, k, d]) => { const el = $('#' + id); el.value = J.pref.get(k, d); el.onchange = () => J.pref.set(k, el.value); });
    [['pr-2passos', 'doisPassos', false], ['pr-hist', 'lembrarHist', false]].forEach(([id, k, d]) => { const el = $('#' + id); el.checked = J.pref.get(k, d); el.onchange = () => J.pref.set(k, el.checked); });
    const ta = $('#pr-texto');
    ta.value = J.pref.get('rascunhoProcessar', '');
    const conta = () => { $('#pr-conta').textContent = ta.value.length.toLocaleString('pt-BR') + ' caracteres' + (ta.value.length > 400000 ? ' — muito grande: use 🧹 Limpador antes' : ''); };
    let t = 0; ta.addEventListener('input', () => { conta(); clearTimeout(t); t = setTimeout(() => { if (ta.value.length < 900000) J.pref.set('rascunhoProcessar', ta.value); }, 600); });
    conta();
    // ➡ chegou texto de uma ferramenta (o 🧹 Limpador manda o texto limpo ou o resumo)
    const receber = (d) => {
      if (!d || !d.texto) return;
      ta.value = (ta.value.trim() ? ta.value + '\n\n' : '') + (d.titulo ? '=== ' + d.titulo + ' ===\n' : '') + d.texto; ta.dispatchEvent(new Event('input'));
      const q = document.querySelector('.quadro-ferr'); if (q) { q.hidden = true; document.body.style.overflow = ''; }
      J.abrirAba('processar'); J.aviso('➡ O texto chegou no ⚡ Processar. Agora escolha o que fazer.', 'ok');
    };
    window.addEventListener('message', (e) => { if (e.data && e.data.mjMandar) receber(e.data.mjMandar); });
    try { const g = localStorage.getItem('juridico:mandar'); if (g) { localStorage.removeItem('juridico:mandar'); receber(JSON.parse(g)); } } catch {}
    J.voz.botaoDitado($('#pr-ditar'), ta);
    J.voz.botaoDitado($('#pr-extra-ditar'), $('#pr-extra'));
    $('#pr-abrir').onclick = async () => {
      const fs = await J.importar.escolher(null, true); if (!fs.length) return;
      for (const f of fs) {
        try { J.aviso('Lendo ' + f.name + '…'); const r = await J.importar.lerArquivo(f, (i, n) => { $('#pr-conta').textContent = 'Lendo página ' + i + ' de ' + n + '…'; }); ta.value = (ta.value ? ta.value + '\n\n' : '') + '=== ' + f.name + ' ===\n' + r.texto; ta.dispatchEvent(new Event('input')); }
        catch (e) { J.aviso(f.name + ': ' + e.message, 'erro'); }
      }
    };
    $('#pr-do-editor').onclick = () => { const t2 = J.editor && J.editor.texto(); if (!t2) return J.aviso('O Editor está vazio.'); ta.value = t2; ta.dispatchEvent(new Event('input')); };
    $('#pr-limpar').onclick = () => { if (!ta.value || confirm('Apagar o texto?')) { ta.value = ''; ta.dispatchEvent(new Event('input')); } };
    $('#pr-acoes').onclick = (e) => { const b = e.target.closest('[data-acao]'); if (b) executar(b.dataset.acao); };
    $('#pr-livre').onclick = () => executar(null);
    $('#pr-parar').onclick = () => { if (controle) controle.abort(); };
    $('#pr-editor').onclick = () => { if (ultimo) { J.editor.abrir({ titulo: ultimo.titulo, html: ultimo.html }); J.abrirAba('editor'); } };
    $('#pr-word').onclick = () => { if (ultimo) J.docx.baixar(ultimo.titulo, ultimo.html); };
    $('#pr-copiar').onclick = () => { if (ultimo) J.copiar(ultimo.md); };
    $('#pr-ouvir').onclick = () => { if (!ultimo) return; if (J.voz.falando) J.voz.parar(); else J.voz.falar(ultimo.md); };
    J.on('voz', (f) => { const b = $('#pr-ouvir'); if (b) b.textContent = f ? '⏹ Parar voz' : '🔊 Ouvir'; });
    $('#pr-salvar').onclick = async () => { if (!ultimo) return; await J.db.guardar('documentos', { titulo: ultimo.titulo, html: ultimo.html, tipo: 'IA: ' + ultimo.nomeAcao, criado: Date.now() }); J.aviso('💾 Salvo em 📁 Documentos.', 'ok'); };
    $('#pr-conversar').onclick = () => { if (!ultimo) return; J.conversa.comContexto(ultimo.titulo, ultimo.md); J.abrirAba('conversa'); };
    $('#pr-refazer').onclick = () => { if (ultimo) executar(ultimo.acao); };
  }

  async function executar(acaoId) {
    const texto = $('#pr-texto').value.trim();
    const extra = $('#pr-extra').value.trim();
    let acao = ACOES.find((a) => a.id === acaoId);
    if (!acao && acaoId && acaoId.startsWith('minha:') && J.regras) { const m = J.regras.acoes().find((x) => 'minha:' + x.id === acaoId); if (m) acao = { id: acaoId, nome: '⭐ ' + m.titulo, p: m.texto + '\n\n{{textos}}' }; }
    if (!acao && !extra) return J.aviso('Escreva o seu pedido no campo "Seu pedido", ou toque num dos botões.');
    if (!texto && acao) return J.aviso('Cole ou abra o texto primeiro (parte 1).');
    if (!J.ia.temChave()) { J.aviso('Falta a chave da IA. Abrindo ⚙️ Config…', 'erro'); return J.abrirAba('config'); }
    if (!acao) acao = { id: 'livre', nome: '▶ Pedido livre', p: 'Atenda ao pedido do advogado abaixo, usando o texto (se houver).\n\nTEXTO:\n{{textos}}' };
    const nomeAcao = acao.nome.replace(/^\S+\s/, '');
    const ementas = $('#pr-ementas').checked && J.biblioteca ? await J.biblioteca.ementasMarcadas() : [];
    const historico = $('#pr-hist').checked ? (await J.db.todos('historico')).sort((a, b) => b.criado - a.criado).slice(0, 3).reverse() : [];
    const esforco = $('#pr-esforco').value, tamanho = $('#pr-tamanho').value;
    $('#pr-saida').hidden = false; $('#pr-bts').hidden = true; $('#pr-parar').hidden = false;
    $('#pr-titulo').textContent = nomeAcao;
    const andamento = (t) => { $('#pr-resultado').innerHTML = '<span class="carregando"></span> ' + J.esc(t); };
    andamento('A IA está trabalhando… (processo grande pode levar 1 a 3 minutos)');
    $('#pr-saida').scrollIntoView({ behavior: 'smooth', block: 'start' });
    controle = new AbortController();
    try {
      let base = texto;
      // ⚡ 2 passos: resume o processo antes (Ollama de graça, se estiver ligado; senão a mesma IA) e a peça usa o resumo + o texto
      const grande = texto.length > 700000;
      if ((($('#pr-2passos').checked) || grande) && acao.motor !== 'resumir' && texto) {
        andamento('Passo 1 de 2: resumindo o processo inteiro…');
        const r1 = J.motor.montar({ acao: { motor: 'resumir' }, texto, esforco: 3, tamanho: 'longa' });
        let usarOllama = false; try { const oi = J.ia.ollamaInfo && (await J.ia.ollamaInfo()); usarOllama = !!(oi && oi.modelos && oi.modelos.length); } catch (e) {}
        const resumo = await J.ia.gerar({ mensagens: [{ role: 'user', content: r1.usuario }], sistema: r1.sistema, sinal: controle.signal, opcoes: { maxTokens: 16384, provedor: usarOllama ? 'ollama' : undefined } });
        base = 'RESUMO ESTRUTURADO DO PROCESSO (feito no passo 1):\n' + resumo + (texto.length <= 600000 ? '\n\n=== TEXTO INTEGRAL DO PROCESSO ===\n' + texto : '\n\n(O processo é grande demais para ir inteiro: use o resumo acima e os trechos citados.)\n\n=== INÍCIO DO PROCESSO ===\n' + texto.slice(0, 200000) + '\n\n=== FINAL DO PROCESSO (as últimas decisões) ===\n' + texto.slice(-300000));
        andamento('Passo 2 de 2: fazendo ' + nomeAcao.toLowerCase() + '…');
      }
      const p = J.motor.montar({ acao, texto: base, pedidoExtra: extra, ementas, historico, esforco, tamanho });
      const md = await J.ia.gerar({ mensagens: [{ role: 'user', content: p.usuario }], sistema: p.sistema, sinal: controle.signal, opcoes: { internet: $('#pr-internet').checked, consulta: extra || undefined, maxTokens: p.maxTokens } });
      const html = J.texto.mdParaHtml(md);
      const titulo = nomeAcao + ' — ' + new Date().toLocaleDateString('pt-BR');
      ultimo = { acao: acaoId, nomeAcao, md, html, titulo };
      $('#pr-resultado').innerHTML = html;
      $('#pr-bts').hidden = false;
      J.db.guardar('historico', { titulo, html, md, acao: nomeAcao, pergunta: extra || nomeAcao, criado: Date.now() }).then(podar).catch(() => {});
    } catch (e) {
      $('#pr-resultado').innerHTML = e.name === 'AbortError' ? '<span class="mut">Parado.</span>' : '<div class="caixa ruim">❌ ' + J.esc(e.message) + '</div>';
    } finally { controle = null; $('#pr-parar').hidden = true; }
  }
  async function podar() { const h = (await J.db.todos('historico')).sort((a, b) => b.criado - a.criado); for (const x of h.slice(60)) await J.db.apagar('historico', x.id); }

  J.processar = { ACOES, colocarTexto(t) { const ta = $('#pr-texto'); ta.value = t; ta.dispatchEvent(new Event('input')); } };
  J.registrar({ aba: 'processar', montar });
})(window.J);
