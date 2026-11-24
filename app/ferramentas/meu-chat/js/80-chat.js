/* Meu Chat — 80-chat.js: a conversa (mensagens, fotos, mandar, parar, lista de conversas).
   Cada conversa fica guardada no aparelho. Vai para a IA: a memória + as últimas mensagens. */
(function (MC) {
  'use strict';
  const E = MC.esc;
  let conv = null, anexos = [], controle = null;

  function nova() { return { id: MC.uid(), titulo: 'Nova conversa', msgs: [], criado: Date.now(), atualizado: Date.now() }; }
  async function abrirConversa(id) {
    const c = id ? await MC.banco.pegar(id) : null;
    conv = c || nova(); MC.pref.set('conversaAberta', conv.id);
    pintar(); MC.fecharPaineis();
  }
  async function guardar() { conv.atualizado = Date.now(); await MC.banco.salvar(conv); }

  // ── fotos ──
  function reduzir(arquivo) {
    return new Promise((ok, erro) => {
      const img = new Image(); img.onload = () => {
        // 📷 18/11: economia — cada foto conta tokens pelo TAMANHO (mais pixels = mais caro). Média = 1024 (lê bem print de tela)
        const eco = MC.pref.get('fotoEconomia', 'media'); const max = eco === 'alta' ? 768 : eco === 'original' ? 1600 : 1024, k = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement('canvas'); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(img.src);
        let q = eco === 'alta' ? 0.6 : eco === 'original' ? 0.85 : 0.72, d = c.toDataURL('image/jpeg', q); while (d.length > 1.4e6 && q > 0.35) { q -= 0.15; d = c.toDataURL('image/jpeg', q); } ok({ tipo: 'image/jpeg', dados: d.split(',')[1], w: c.width, h: c.height, origW: img.width, origH: img.height });
      };
      img.onerror = () => erro(new Error('não consegui abrir a imagem')); img.src = URL.createObjectURL(arquivo);
    });
  }
  // quantos tokens a foto custa (aproximado, pela IA ativa): Gemini = 258 por quadrado de até 768×768; Claude ≈ largura×altura÷750; OpenAI ≈ 85 + 170 por quadrado de 512
  function tokFoto(a) {
    const p = provAtivo, w = a.w || 1024, h = a.h || 1024;
    if (p === 'claude') return Math.round(w * h / 750);
    if (p === 'openai' || p === 'openrouter') return 85 + 170 * Math.ceil(w / 512) * Math.ceil(h / 512);
    if (w <= 384 && h <= 384) return 258;
    return 258 * Math.ceil(w / 768) * Math.ceil(h / 768);
  }
  let provAtivo = 'gemini';
  async function anexar(arquivos) {
    try { const l = await MC.ia.chaves(); const at = l.find((c) => c.id === MC.pref.get('chaveAtiva')) || l[0]; if (at) provAtivo = at.provedor; } catch (e) {}
    for (const f of arquivos) { if (!/^image\//.test(f.type)) continue; try { anexos.push(await reduzir(f)); } catch (e) { MC.aviso(e.message, 'erro'); } }
    pintarAnexos();
  }
  function pintarAnexos() {
    const el = MC.$('#anexos'); el.hidden = !anexos.length;
    // 📷 18/11: mostra quanto a foto custa (tokens) — a IA "vê" a foto em quadradinhos; mais pixels = mais quadradinhos
    el.innerHTML = anexos.map((a, i) => '<div class="mini"><img src="data:' + a.tipo + ';base64,' + a.dados + '" alt="foto" data-ver-foto="' + i + '"><button data-tirar="' + i + '">✕</button>' + (a.w ? '<small class="mini-tok" title="' + (a.origW ? 'Original ' + a.origW + '×' + a.origH + ' → vai ' + a.w + '×' + a.h : '') + '">≈' + tokFoto(a) + ' tok</small>' : '') + '</div>').join('') +
      // 🧩 20/11: ferramentas das fotos ANTES de mandar (sem gastar IA)
      (anexos.length ? '<div class="anexos-acoes">' + (anexos.length > 1 ? '<button class="bt peq" data-foto="juntar" title="Junta todos os prints numa imagem só (a IA aceita poucas fotos por vez)">🧩 Juntar em 1</button>' : '') +
        '<button class="bt peq" data-foto="ocr" title="Lê o texto das fotos (de graça, aqui no aparelho) e manda só o texto — gasta muito menos">🔤 Virar texto</button><button class="bt peq" data-foto="tirar" title="Tira todas as fotos">🗑 Tirar todas</button></div>' : '');
  }
  function carregar(a) { return new Promise((ok, erro) => { const i = new Image(); i.onload = () => ok(i); i.onerror = () => erro(new Error('foto ilegível')); i.src = 'data:' + a.tipo + ';base64,' + a.dados; }); }
  async function juntarFotos() {
    const imgs = await Promise.all(anexos.map(carregar));
    const W = Math.min(1000, Math.max(...imgs.map((i) => i.width)));
    const alt = imgs.map((i) => Math.round(i.height * W / i.width)); const total = alt.reduce((a, b) => a + b, 0);
    const cols = total > 7000 ? 2 : 1; const cw = cols === 2 ? Math.round(W / 2) : W;
    const alts = imgs.map((i) => Math.round(i.height * cw / i.width));
    const colH = [0, 0]; const pos = alts.map((h) => { const c = cols === 2 && colH[1] < colH[0] ? 1 : 0; const y = colH[c]; colH[c] += h + 6; return { c, y }; });
    const c = document.createElement('canvas'); c.width = cw * cols + (cols - 1) * 6; c.height = Math.max(...colH);
    const g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height);
    imgs.forEach((i, k) => g.drawImage(i, pos[k].c * (cw + 6), pos[k].y, cw, alts[k]));
    let q = 0.72, d = c.toDataURL('image/jpeg', q); while (d.length > 2.5e6 && q > 0.35) { q -= 0.1; d = c.toDataURL('image/jpeg', q); }
    const n = anexos.length; anexos = [{ tipo: 'image/jpeg', dados: d.split(',')[1], w: c.width, h: c.height }]; pintarAnexos();
    MC.aviso('🧩 Juntei ' + n + ' fotos numa só.', 'ok');
  }
  let tess = null;
  async function ocrFotos(b) {
    b.disabled = true; b.textContent = '⏳ Lendo… (a 1ª vez baixa o leitor, ~10 MB)';
    try {
      if (!tess) tess = new Promise((ok, erro) => { const s = document.createElement('script'); s.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js'; s.onload = () => ok(window.Tesseract); s.onerror = () => { tess = null; erro(new Error('não consegui baixar o leitor de texto (precisa de internet)')); }; document.head.appendChild(s); });
      const T = await tess; const ent = MC.$('#entrada'); let txt = '';
      for (let k = 0; k < anexos.length; k++) { b.textContent = '⏳ Lendo foto ' + (k + 1) + ' de ' + anexos.length + '…'; const r = await T.recognize('data:' + anexos[k].tipo + ';base64,' + anexos[k].dados, 'por'); txt += (anexos.length > 1 ? '\n[Texto da foto ' + (k + 1) + ']\n' : '\n') + r.data.text.trim() + '\n'; }
      ent.value += (ent.value ? '\n' : '') + txt.trim(); ent.dispatchEvent(new Event('input'));
      anexos = []; pintarAnexos(); MC.aviso('🔤 Pronto: o texto das fotos está na caixa. Confira antes de mandar.', 'ok');
    } catch (e) { MC.aviso('⚠ ' + e.message, 'erro'); b.disabled = false; b.textContent = '🔤 Virar texto'; }
  }

  // ── desenhar ──
  function htmlMsg(m, i) {
    const fotos = (m.fotos || []).map((f) => '<img class="anexo" src="data:' + f.tipo + ';base64,' + f.dados + '" alt="foto">').join('');
    if (m.papel === 'eu') return '<div class="msg eu" data-i="' + i + '">' + fotos + (m.texto ? '<div class="bolha">' + E(m.texto) + '</div>' : '') +
      '<div class="info">' + hora(m.quando) + '<button data-m="copiar">📋</button><button data-m="memoria" title="Guardar na memória">🧠</button></div></div>';
    const r = MC.texto.render((m.texto || '').replace(/^\s*\**LEVAR PARA O CLAUDE\**\s*\.?\s*$/gim, ''));
    const fontes = (m.fontes || []).length ? '<div class="fontes">🔗 Fontes:' + dedup(m.fontes).slice(0, 12).map((f, k) => '<a href="' + E(f.url) + '" target="_blank" rel="noopener">[' + (k + 1) + '] ' + E(f.titulo || f.url) + '</a>').join('') + '</div>' : '';
    const feitos = (m.feitos || []).map((f) => '<div class="guardei">' + E(f) + '</div>').join('');
    const erro = m.erro ? '<div style="color:var(--er);white-space:pre-wrap">⚠ ' + E(m.erro) + '</div><div class="linha">' + (m.erro.includes('SEM_CHAVE') ? '' : '<button class="bt peq" data-m="denovo">↻ Tentar de novo</button>') + '<button class="bt peq" data-m="config">⚙️ Chaves</button></div>' : '';
    return '<div class="msg ia" data-i="' + i + '"><div class="bolha">' + r.html + erro + fontes + feitos + '</div>' +
      (m.uso && MC.gasto ? '<div class="gasto-linha" title="Entrada = o que foi junto (regras, memória, histórico). Saída = a resposta. Toque em 💰 lá em cima para ver tudo.">' + E(MC.gasto.texto(m)) + '</div>' : '') +
      '<div class="info">' + hora(m.quando) + (m.ia ? ' · ' + E(m.ia) : '') + '<button data-m="copiar">📋</button><button data-m="ouvir" title="Ouvir">🔊</button><button data-m="memoria" title="Guardar na memória">🧠</button><button data-m="contexto" title="Guardar esta resposta como 📌 contexto">📌</button>' + (i === conv.msgs.length - 1 ? '<button data-m="denovo" title="Responder de novo">↻</button><button data-m="claude" title="Copia um resumo desta conversa (sem as chaves) para colar no app do Claude">📋→Claude</button>' : '') + '</div>' +
      (/LEVAR PARA O CLAUDE/i.test(m.texto || '') ? '<div class="linha"><button class="bt primario peq" data-m="claude">📋 Levar para o Claude</button></div>' : '') + '</div>';
  }
  const dedup = (l) => { const s = new Set(); return l.filter((f) => f.url && !s.has(f.url) && s.add(f.url)); };
  const hora = (t) => t ? new Date(t).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '';
  function pintar() {
    const el = MC.$('#conversa');
    MC.$('#tit-conversa').textContent = conv.titulo || 'Meu Chat';
    if (!conv.msgs.length) {
      el.innerHTML = '<div class="vazio"><h2>💬 Meu Chat</h2><p>Escreva ou toque no 🎤 para falar.<br>📷 manda foto ou print · 🌐 pesquisa na internet · 🔗 cole um link para ela ler · 🧠 ela lembra de você.</p><p class="pequeno">Primeira vez? Toque em ⚙️ e cole uma chave <b>grátis</b> (Groq, Gemini ou OpenRouter — qualquer uma serve).<br>🔊 A voz é a do <b>seu celular</b> (grátis, sem chave). Gemini para voz é só opcional.</p></div>';
      return;
    }
    el.innerHTML = conv.msgs.map(htmlMsg).join('');
    conv.msgs.forEach((m, i) => { if (m.papel === 'ia') { const r = MC.texto.render(m.texto || ''); const b = el.querySelector('.msg[data-i="' + i + '"] .bolha'); if (b) MC.texto.ligar(b, r.blocos); } });
    el.scrollTop = el.scrollHeight;
  }

  // ── mandar ──
  async function mandar(textoForcado) {
    if (controle) { controle.abort(); return; }
    const ent = MC.$('#entrada');
    const texto = (textoForcado != null ? textoForcado : ent.value).trim();
    if (!texto && !anexos.length) return;
    MC.voz.pararFala();
    conv.msgs.push({ id: MC.uid(), papel: 'eu', texto, fotos: anexos.slice(), quando: Date.now() });
    if (conv.titulo === 'Nova conversa' && texto) conv.titulo = texto.slice(0, 48) + (texto.length > 48 ? '…' : '');
    ent.value = ''; ent.style.height = ''; anexos = []; pintarAnexos();
    await guardar(); pintar();
    await responder();
  }
  async function responder() {
    let voz = null;
    const busca = MC.$('#op-busca').checked;
    MC.pref.set('guiaLigado', MC.$('#op-guia').checked);
    const ia = { id: MC.uid(), papel: 'ia', texto: '', quando: Date.now() };
    conv.msgs.push(ia); pintar();
    const bolha = MC.$('#conversa .msg:last-child .bolha'); bolha.classList.add('digitando');
    const btE = MC.$('#bt-enviar'); btE.textContent = '⏹'; btE.title = 'Parar';
    controle = new AbortController();
    if (MC.pronto) MC.pronto.comecou();
    try {
      const lista = await MC.ia.chaves(); if (!lista.length) throw new Error('SEM_CHAVE');
      const ativa = lista.find((c) => c.id === MC.pref.get('chaveAtiva', '')) || lista[0];
      const ultimo = conv.msgs[conv.msgs.length - 2];
      const net = await MC.internet.preparar(ultimo.texto || '', ativa.provedor, busca);
      if (net.avisos.length) MC.aviso(net.avisos.join(' · '), 'erro');
      const max = MC.pref.get('contexto', 16);
      const resumoVelho = (conv.resumo && conv.msgs.length - 1 > max) ? 'RESUMO DO COMEÇO DESTA CONVERSA (são as mensagens antigas que não vão mais junto; use para não esquecer o que já foi dito):\n' + conv.resumo : '';
      const heranca = conv.heranca ? 'CONTINUAÇÃO: esta conversa continua uma anterior. Resumo do que já foi feito e combinado lá (use para não começar do zero):\n' + conv.heranca : '';
      const extraTxt = [net.extras ? 'INFORMAÇÕES DE AGORA (internet):\n' + net.extras : '', heranca, resumoVelho].filter(Boolean).join('\n\n');
      const sistema = await MC.memoria.sistema(extraTxt, '', ultimo.texto || '');
      // 📷 18/11: as fotos das mensagens ANTIGAS não vão de novo (cada pergunta pagava todas outra vez). Só a da pergunta de agora.
      const fotosAntigas = MC.pref.get('fotosHistorico', false);
      const hist = conv.msgs.slice(0, -1).filter((m) => !m.erro).slice(-max).map((m, k, arr) => ({ papel: m.papel, texto: (m.texto || '') + (!fotosAntigas && k < arr.length - 1 && (m.fotos || []).length ? '\n[(mandei ' + m.fotos.length + ' foto(s) aqui antes)]' : ''), fotos: (fotosAntigas ? k >= arr.length - 4 : k === arr.length - 1) ? (m.fotos || []) : [] }));
      // 🔊 com a "Voz do aparelho", ela começa a falar enquanto a resposta chega (frase por frase)
      if (MC.$('#op-comparar').checked) { await comparar(ia, bolha, lista, extraTxt, hist, busca, net); throw { comparou: true }; }
      voz = (MC.$('#op-falar').checked || MC.$('#op-maos').checked) ? MC.voz.fluxo() : null;
      const r = await MC.ia.conversar(sistema, hist, { busca, sinal: controle.signal },
        (parcial) => { if (voz) voz.empurrar(parcial); bolha.innerHTML = MC.texto.render(parcial).html; const c = MC.$('#conversa'); if (c.scrollHeight - c.scrollTop - c.clientHeight < 200) c.scrollTop = c.scrollHeight; },
        (c) => MC.aviso('🔁 Essa chave chegou no limite: passei para ' + (c.apelido || MC.ia.P[c.provedor].nome)));
      const m = await MC.memoria.aplicarMarcas(r.texto);
      Object.assign(ia, { texto: m.limpo, feitos: m.feitos, fontes: dedup((r.fontes || []).concat(net.fontes)), ia: r.apelido + ' · ' + r.modelo, quando: Date.now(), uso: r.uso, prov: r.provedor, modelo: r.modelo });
      if (MC.gasto) MC.gasto.registrar(ia).catch(() => {});
      MC.$('#tit-ia').textContent = r.apelido + ' · ' + r.modelo;
    } catch (e) {
      if (e && e.comparou) { /* já está pronto */ }
      else if (e.name === 'AbortError') { if (voz) { voz.cancelar(); voz = null; } ia.texto = (ia.texto || bolha.innerText || '') + '\n\n_(parei)_'; }
      else if (e.message === 'SEM_CHAVE') ia.erro = 'SEM_CHAVE: ainda não tem nenhuma chave de IA. Toque em ⚙️ Chaves e cole uma (a do Gemini é grátis).';
      else ia.erro = e.message;
    }
    controle = null; btE.textContent = '➤'; btE.title = 'Enviar';
    await guardar(); pintar();
    if (MC.pronto) MC.pronto.terminou(ia.erro || ia.texto, !ia.erro);
    resumirSePrecisar(conv).catch(() => {});
    const falar = MC.$('#op-falar').checked || MC.$('#op-maos').checked;
    const depois = () => { if (MC.$('#op-maos').checked) setTimeout(() => ouvirEMandar(), 300); };
    if (voz) { if (ia.texto && !ia.erro) voz.terminar(ia.texto, depois); else voz.cancelar(); }
    else if (falar && ia.texto && !ia.erro) MC.voz.falar(ia.texto, depois);
  }
  // ⚖️ COMPARAR: manda a MESMA pergunta para várias IAs ao mesmo tempo e mostra uma embaixo da outra
  async function comparar(ia, bolha, lista, extraTxt, hist, busca, net) {
    const marcadas = MC.pref.get('comparar:ids', null);
    let quais = lista.filter((c) => marcadas ? marcadas.includes(c.id) : true);
    if (!marcadas) { const vistos = new Set(); quais = quais.filter((c) => !vistos.has(c.provedor) && vistos.add(c.provedor)).slice(0, 3); }
    if (quais.length < 2) throw new Error('Para comparar, guarde pelo menos 2 chaves de IAs diferentes (⚙️) e escolha quais em ⚖️ (toque e segure o ⚖️ Comparar).');
    const partes = quais.map((c) => ({ c, nome: c.apelido || MC.ia.P[c.provedor].nome, texto: '', fontes: [], modelo: '' }));
    const juntar = () => partes.map((p) => '### ' + p.nome + (p.modelo ? ' · ' + p.modelo : '') + '\n\n' + (p.texto || (p.erro ? '⚠ ' + p.erro : '_(pensando…)_'))).join('\n\n⸻⸻⸻\n\n');
    const tela = () => { bolha.innerHTML = MC.texto.render(juntar()).html; };
    tela();
    await Promise.all(partes.map(async (p) => {
      try {
        p.modelo = await MC.ia.modeloDe(p.c.provedor);
        const sis = await MC.memoria.sistema(extraTxt, p.c.provedor, (hist[hist.length - 1] || {}).texto || ''); // cada IA com o jeito DELA
        const r = await MC.ia.pedir(p.c.provedor, p.c.chave, p.modelo, sis, hist, { busca: busca && MC.ia.P[p.c.provedor].busca, sinal: controle.signal }, (t) => { p.texto = t; tela(); });
        p.texto = (await MC.memoria.aplicarMarcas(r.texto)).limpo; p.fontes = r.fontes || [];
      } catch (e) { if (e.name === 'AbortError') throw e; p.erro = e.message; }
      tela();
    }));
    Object.assign(ia, { texto: juntar(), fontes: dedup([].concat(...partes.map((p) => p.fontes), net.fontes)), ia: '⚖️ ' + partes.map((p) => p.nome).join(' × '), quando: Date.now() });
  }
  async function escolherComparar() {
    const lista = await MC.ia.chaves(); const marc = MC.pref.get('comparar:ids', null);
    const txt = lista.map((c, k) => (k + 1) + ') ' + (c.apelido || MC.ia.P[c.provedor].nome) + (marc && marc.includes(c.id) ? ' ✔' : '')).join('\n');
    const r = prompt('⚖️ Quais IAs comparar? Escreva os números separados por vírgula (ex.: 1,3).\nEm branco = automático (até 3 IAs diferentes).\n\n' + txt, marc ? lista.map((c, k) => marc.includes(c.id) ? k + 1 : null).filter(Boolean).join(',') : '');
    if (r == null) return;
    const ids = r.split(/[^\d]+/).map(Number).filter((n) => n >= 1 && n <= lista.length).map((n) => lista[n - 1].id);
    MC.pref.set('comparar:ids', ids.length ? ids : null);
    MC.aviso(ids.length ? '⚖️ Vou comparar: ' + ids.map((id) => { const c = lista.find((x) => x.id === id); return c.apelido || MC.ia.P[c.provedor].nome; }).join(' × ') : '⚖️ Automático (até 3 IAs diferentes)', 'ok');
  }

  // 🧠 CONVERSA LONGA: quando as mensagens antigas saem da janela (⚙️ "Mensagens que vão junto"),
  // a IA faz um resumo delas e ele vai junto — assim ela não esquece o começo da conversa.
  let resumindo = false;
  async function resumirSePrecisar(c) {
    const max = MC.pref.get('contexto', 16), ate = c.resumoAte || 0, limite = c.msgs.length - max;
    if (resumindo || limite - ate < 6) return; // junta pelo menos 6 mensagens novas antes de resumir (gasta menos)
    resumindo = true;
    try {
      const velhas = c.msgs.slice(ate, limite).filter((m) => !m.erro).map((m) => (m.papel === 'eu' ? 'EU: ' : 'IA: ') + String(m.texto || '').slice(0, 3000)).join('\n\n');
      const pedido = 'Atualize o RESUMO desta conversa. Junte o resumo anterior com as mensagens novas. Guarde: o assunto, o que foi decidido, os fatos e números importantes, o que ficou combinado e o que ainda falta. Português simples, no máximo 350 palavras, sem chaves nem senhas.\n\n## Resumo anterior\n' + (c.resumo || '(nenhum)') + '\n\n## Mensagens novas\n' + velhas;
      const r = await MC.ia.conversar('Você resume conversas com fidelidade, sem inventar nada.', [{ papel: 'eu', texto: pedido }], {}, null);
      if (MC.gasto) MC.gasto.registrar({ uso: r.uso, prov: r.provedor, modelo: r.modelo, quando: Date.now() }).catch(() => {});
      const atual = await MC.banco.pegar(c.id) || c;
      atual.resumo = (r.texto || '').trim(); atual.resumoAte = limite; await MC.banco.salvar(atual);
      if (conv && conv.id === c.id) { conv.resumo = atual.resumo; conv.resumoAte = limite; }
    } finally { resumindo = false; }
  }

  // ✂️ 17/11: conversa ficou comprida (cara e a IA se perde)? A IA resume TUDO e abre uma conversa nova que começa desse resumo
  async function continuarEnxuto() {
    if (!conv || conv.msgs.length < 2) { MC.aviso('Esta conversa ainda é curta: não precisa.'); return; }
    if (!confirm('✂️ Continuar numa conversa nova?\n\nA IA faz um resumo de tudo desta conversa (o que foi decidido, o que falta, os códigos importantes) e abre uma conversa nova que começa dele. Esta conversa continua guardada.')) return;
    MC.aviso('⏳ Resumindo a conversa…');
    try {
      const tudo = (conv.resumo ? 'RESUMO DO COMEÇO:\n' + conv.resumo + '\n\n' : '') + conv.msgs.slice(conv.resumoAte || 0).filter((m) => !m.erro).map((m) => (m.papel === 'eu' ? 'EU: ' : 'IA: ') + String(m.texto || '').slice(0, 6000)).join('\n\n');
      const pedido = 'Faça um RESUMO para continuar este trabalho numa conversa nova. Guarde: o objetivo, o que já foi feito, as decisões, os nomes de arquivos e funções, os números e fatos importantes e o que ainda falta (próximos passos). Se houver um código principal em andamento, diga em que ponto ele está. Português simples, até 600 palavras, sem chaves nem senhas.\n\n' + tudo.slice(-120000);
      const r = await MC.ia.conversar('Você resume conversas de trabalho com fidelidade, sem inventar nada.', [{ papel: 'eu', texto: pedido }], {}, null);
      if (MC.gasto) MC.gasto.registrar({ uso: r.uso, prov: r.provedor, modelo: r.modelo, quando: Date.now() }).catch(() => {});
      const velho = conv;
      await abrirConversa(null);
      conv.titulo = (velho.titulo || 'Conversa') + ' (continuação)'; conv.heranca = (r.texto || '').trim(); conv.de = velho.id;
      conv.msgs.push({ id: MC.uid(), papel: 'ia', texto: '✂️ **Continuação de "' + (velho.titulo || 'conversa') + '"** — comecei enxuta, com este resumo (ele vai junto nas perguntas, no lugar da conversa inteira):\n\n' + conv.heranca, quando: Date.now() });
      await guardar(); pintar();
      MC.aviso('✂️ Pronto: conversa nova, mais barata. A antiga continua em ☰.', 'ok');
    } catch (e) { MC.aviso('⚠ Não consegui resumir: ' + e.message, 'erro'); }
  }

  function ouvirEMandar() { MC.voz.ouvir((t) => { if (t && MC.$('#op-maos').checked) mandar(t); }); }

  // 📋 resumo da conversa pronto para colar no app do Claude (sem as chaves)
  async function levarParaClaude() {
    if (!window.GuiaMaikon) return;
    const t = GuiaMaikon.resumoParaClaude({ app: 'Meu Chat', versao: 'v' + MC.versao, conversa: conv.msgs.map((m) => ({ quem: m.papel === 'eu' ? 'eu' : 'ia', texto: (m.texto || '') + (m.erro ? '\n⚠ ERRO: ' + m.erro : '') })) });
    try { await navigator.clipboard.writeText(t); } catch (e) {}
    if (confirm('📋 Copiei o resumo da conversa (sem as suas chaves). Abra o app do Claude e COLE.\n\nQuer baixar também como arquivo .md?')) MC.baixar('para-o-claude-' + new Date().toISOString().slice(0, 10) + '.md', t, 'text/markdown');
  }

  // ── ações das mensagens ──
  async function acao(e) {
    const b = e.target.closest('[data-m]'); if (!b) return; const el = b.closest('.msg'); const i = +el.dataset.i; const m = conv.msgs[i]; const a = b.dataset.m;
    if (a === 'copiar') MC.copiar(m.texto || '');
    if (a === 'ouvir') MC.voz.falar(m.texto || '');
    if (a === 'config') MC.config.abrir();
    if (a === 'memoria') { const t = prompt('Guardar na memória (uma frase curta):', (m.texto || '').slice(0, 200)); if (t && await MC.memoria.lembrar(t)) MC.aviso('🧠 Guardei na memória', 'ok'); }
    if (a === 'claude') return levarParaClaude();
    if (a === 'contexto') { const nome = prompt('Nome do contexto (para achar depois):', (conv.titulo || 'Conversa') + ' — onde parei'); if (nome == null) return; MC.contextos.novo(nome.trim() || 'Contexto', m.texto || ''); MC.aviso('📌 Guardei como contexto (ligado). Toque em 📌 lá em cima para ver, editar ou desligar.', 'ok'); }
    if (a === 'denovo') { if (conv.msgs[conv.msgs.length - 1].papel === 'ia') conv.msgs.pop(); await guardar(); pintar(); responder(); }
  }

  // ── lista de conversas ──
  async function pintarLista() {
    const q = (MC.$('#busca-conv').value || '').toLowerCase();
    const todas = await MC.banco.todas();
    const l = todas.filter((c) => !q || (c.titulo || '').toLowerCase().includes(q) || (c.msgs || []).some((m) => (m.texto || '').toLowerCase().includes(q)));
    MC.$('#lista-conv').innerHTML = l.length ? l.map((c) => '<div class="conv-item' + (conv && c.id === conv.id ? ' on' : '') + '" data-id="' + c.id + '"><div class="nome"><div>' + E(c.titulo || 'Conversa') + '</div><small class="mudo">' + new Date(c.atualizado).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) + ' · ' + (c.soNome ? c.nMsgs : c.msgs.length) + ' msg' + (c.soNome ? ' ☁️' : '') + '</small></div><button class="ic" data-c="renomear" title="Renomear">✏️</button><button class="ic" data-c="apagar" title="Apagar">🗑</button></div>').join('') : '<p class="mudo pequeno">' + (q ? 'Nada encontrado.' : 'Nenhuma conversa ainda.') + '</p>';
  }
  async function cliqueLista(e) {
    const it = e.target.closest('.conv-item'); if (!it) return; const id = it.dataset.id; const b = e.target.closest('[data-c]');
    if (!b) return abrirConversa(id);
    const c = await MC.banco.pegar(id);
    if (b.dataset.c === 'renomear') { const n = prompt('Nome da conversa:', c.titulo); if (n) { c.titulo = n; await MC.banco.salvar(c); if (conv.id === id) { conv.titulo = n; pintar(); } pintarLista(); } }
    if (b.dataset.c === 'apagar' && confirm('Apagar a conversa "' + c.titulo + '"?')) { await MC.banco.apagar(id); if (conv.id === id) await abrirConversa(null); pintarLista(); }
  }

  document.addEventListener('DOMContentLoaded', () => {
    try { const g = MC.$('#op-guia'); if (g) { g.checked = !!MC.pref.get('guiaLigado', false); g.onchange = () => MC.pref.set('guiaLigado', g.checked); } } catch (e) {}
    const ent = MC.$('#entrada');
    ent.addEventListener('input', () => { ent.style.height = ''; ent.style.height = Math.min(ent.scrollHeight, innerHeight * 0.4) + 'px'; });
    ent.addEventListener('keydown', (e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey || (!e.shiftKey && matchMedia('(pointer:fine)').matches))) { e.preventDefault(); mandar(); } });
    MC.$('#bt-enviar').onclick = () => mandar();
    MC.$('#bt-mic').onclick = () => { if (MC.voz.falando) { MC.voz.pararFala(); return; } MC.voz.ouvir((t) => { if (t && (MC.$('#op-maos').checked || MC.pref.get('mandarAoFalar', true))) mandar(t); }); };
    MC.$('#bt-foto').onclick = () => MC.$('#in-foto').click();
    // 15/11: 📎 arquivo de texto/código ou PROJETO .zip → vai para a caixa de texto (a IA lê); imagem → vira foto
    MC.$('#bt-arq').onclick = () => MC.$('#in-arq').click();
    MC.$('#in-arq').onchange = async (e) => {
      const fs = Array.from(e.target.files || []); e.target.value = '';
      const ent = MC.$('#entrada'); const TXT = /\.(html?|css|js|mjs|jsx|ts|tsx|json|md|txt|py|php|sql|xml|ya?ml|csv|ini|sh|bat|java|kt|c|cpp|cs|go|rs|vue)$/i;
      for (const f of fs) {
        try {
          if (/^image\//.test(f.type)) { await anexar([f]); continue; }
          let t = '';
          if (/\.zip$/i.test(f.name)) { await MC.arquivos.abrirZip(f); continue; } // 📦 17/11: abre aqui dentro e você escolhe o que vai
          if (f.size > 5e6) throw new Error('grande demais (máx. 5 MB) — mande em .zip');
          t = 'Arquivo: ' + f.name + '\n```\n' + (await MC.arquivos.textoDoArquivo(f)) + '\n```\n'; // 🔤 acentos certos (UTF-8 ou Windows)
          ent.value += (ent.value ? '\n\n' : '') + t; ent.dispatchEvent(new Event('input'));
          MC.aviso('📎 ' + f.name + ' anexado', 'ok');
        } catch (er) { MC.aviso('⚠️ ' + f.name + ': ' + er.message, 'erro'); }
      }
    };
    MC.$('#in-foto').onchange = (e) => { anexar(Array.from(e.target.files || [])); e.target.value = ''; };
    MC.$('#anexos').onclick = (e) => { const b = e.target.closest('[data-tirar]'); if (b) { anexos.splice(+b.dataset.tirar, 1); pintarAnexos(); return; } const f = e.target.closest('[data-foto]'); if (!f) return; if (f.dataset.foto === 'tirar') { anexos = []; pintarAnexos(); } if (f.dataset.foto === 'juntar') juntarFotos().catch((er) => MC.aviso('⚠ ' + er.message, 'erro')); if (f.dataset.foto === 'ocr') ocrFotos(f); };
    ent.addEventListener('paste', (e) => { const fs = Array.from((e.clipboardData && e.clipboardData.files) || []); if (fs.length) { e.preventDefault(); anexar(fs); } }); // colar print
    MC.$('#conversa').addEventListener('click', acao);
    MC.$('#bt-conversas').onclick = () => { pintarLista(); MC.abrirPainel('gaveta'); };
    MC.$('#bt-nova').onclick = () => abrirConversa(null);
    MC.$('#busca-conv').oninput = pintarLista;
    MC.$('#lista-conv').onclick = cliqueLista;
    { const bc = MC.$('#op-comparar').closest('label'); let t = 0; bc.addEventListener('contextmenu', (e) => { e.preventDefault(); escolherComparar(); }); bc.addEventListener('touchstart', () => { t = setTimeout(escolherComparar, 650); }, { passive: true }); ['touchend', 'touchmove'].forEach((ev) => bc.addEventListener(ev, () => clearTimeout(t))); }
    for (const id of ['op-busca', 'op-falar', 'op-maos', 'op-comparar']) { const c = MC.$('#' + id); c.checked = MC.pref.get(id, id === 'op-busca' ? false : false); c.onchange = () => { MC.pref.set(id, c.checked); if (id === 'op-maos' && c.checked) { MC.aviso('🙌 Mãos livres: fale depois do sinal; eu respondo falando e escuto de novo.'); ouvirEMandar(); } if (id === 'op-maos' && !c.checked) MC.voz.parar(); if (id === 'op-comparar' && c.checked) MC.aviso('⚖️ Comparar ligado: a próxima pergunta vai para várias IAs. Toque e segure o ⚖️ para escolher quais.'); }; }
  });
  // 🔍 18/11: tocar numa foto (da conversa ou do anexo) abre ela grande
  document.addEventListener('click', (e) => {
    const img = e.target.closest('.msg img.anexo, #anexos img'); if (!img) return;
    const w = document.createElement('div'); w.className = 'janela-fundo foto-grande';
    const idx = img.dataset.verFoto;
    w.innerHTML = '<div class="foto-caixa"><img src="' + img.src + '" alt="foto em tamanho grande"><div class="linha"><button class="bt" data-f="baixar">⤓ Baixar</button>' + (idx != null ? '<button class="bt" data-f="tirar">🗑 Tirar esta foto</button>' : '') + '<button class="bt primario" data-f="fechar">✕ Fechar</button></div></div>';
    w.addEventListener('click', (ev) => { const b = ev.target.closest('[data-f]'); if (b && b.dataset.f === 'tirar') { anexos.splice(+idx, 1); pintarAnexos(); w.remove(); return; } if (b && b.dataset.f === 'baixar') { const l = document.createElement('a'); l.href = img.src; l.download = 'foto-' + Date.now() + '.jpg'; l.click(); return; } if (!ev.target.closest('img')) w.remove(); });
    document.body.appendChild(w);
  });
  MC.chat = { abrirConversa, mandar, pintar, continuarEnxuto, esperando: () => !!controle, get conversa() { return conv; }, recarregar: async () => { if (conv) { const c = await MC.banco.pegar(conv.id); if (c) conv = c; } pintar(); } };
})(window.MC);
