/* Meu Chat — 36-gasto.js · 💰 QUANTO GASTOU (17/11)
   Igual ao da Monica: embaixo de cada resposta aparece quantos "tokens" foram e quanto custou,
   e o painel 💰 mostra o gasto de hoje, da semana e do mês, por IA.
   - "Entrada" = tudo que vai junto na pergunta: regras, memória, guia, contextos e o HISTÓRICO da conversa.
     Por isso conversa comprida fica mais cara a cada pergunta.
   - "Saída" = a resposta da IA.
   - Os preços são APROXIMADOS (dólar por 1 milhão de tokens) e você pode mudar: confira no site de cada IA.
   - Fica só neste aparelho. */
(function (MC) {
  'use strict';
  const E = MC.esc;
  // [regra do modelo, entrada, saída] em US$ por 1 milhão de tokens — aproximado, editável no painel
  const PADRAO = {
    claude: [['opus', 5, 25], ['haiku', 1, 5], ['', 3, 15]],
    openai: [['gpt-4o-mini|4\\.1-mini|5-mini', 0.25, 2], ['gpt-4o', 2.5, 10], ['', 1.25, 10]],
    deepseek: [['', 0.28, 0.42]],
    perplexity: [['sonar-pro|reasoning-pro|deep', 3, 15], ['', 1, 1]],
    gemini: [['pro', 1.25, 10], ['lite', 0.1, 0.4], ['', 0.3, 2.5]],
    openrouter: [[':free', 0, 0], ['', 1, 4]],
    groq: [['', 0, 0]], ollama: [['', 0, 0]],
  };
  const GRATIS = { groq: 'grátis (com limite por minuto)', ollama: 'grátis (roda no seu aparelho)' };
  const tabela = () => Object.assign({}, PADRAO, MC.pref.get('gasto:precos', {}) || {});
  const dolar = () => +MC.pref.get('gasto:dolar', 5.5) || 5.5;
  const geminiPago = () => !!MC.pref.get('gasto:geminiPago', false);
  function preco(prov, modelo) {
    if (prov === 'gemini' && !geminiPago()) return [0, 0];
    const l = tabela()[prov]; if (!l) return [1, 4];
    for (const [re, a, b] of l) if (!re || new RegExp(re, 'i').test(modelo || '')) return [a, b];
    return [1, 4];
  }
  // custo em R$ (a parte que veio do "cache" do Claude/OpenAI paga ~10%)
  function custo(uso, prov, modelo) {
    if (!uso) return 0;
    const [a, b] = preco(prov, modelo), cache = uso.cache || 0;
    return (((uso.ent - cache) * a + cache * a * 0.1 + uso.sai * b) / 1e6) * dolar();
  }
  const mil = (n) => (n >= 1000 ? (n / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + ' mil' : String(n || 0));
  const reais = (v) => (v < 0.01 && v > 0 ? 'menos de R$ 0,01' : 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
  // a linha que aparece embaixo da resposta
  function texto(m) {
    const u = m && m.uso; if (!u) return '';
    const c = custo(u, m.prov, m.modelo);
    const gr = GRATIS[m.prov] || (m.prov === 'gemini' && !geminiPago() ? 'grátis (cota diária do Gemini)' : (/:free$/.test(m.modelo || '') ? 'grátis' : ''));
    return '🔢 ' + (u.estimado ? '≈' : '') + mil(u.ent) + ' entrada + ' + mil(u.sai) + ' saída · ' + (gr || reais(c));
  }
  const dia = (t) => new Date(t || Date.now()).toISOString().slice(0, 10);
  async function registrar(m) {
    if (!m || !m.uso) return;
    const g = (await MC.banco.kv('gasto', {})) || {}, d = dia(m.quando), k = (m.prov || '?') + '|' + (m.modelo || '?');
    const x = ((g[d] = g[d] || {})[k] = g[d][k] || { ent: 0, sai: 0, custo: 0, n: 0 });
    x.ent += m.uso.ent || 0; x.sai += m.uso.sai || 0; x.custo += custo(m.uso, m.prov, m.modelo); x.n++;
    // guarda só os últimos 120 dias
    Object.keys(g).sort().slice(0, -120).forEach((k2) => delete g[k2]);
    await MC.banco.kvSet('gasto', g);
  }
  async function somar(dias) {
    const g = (await MC.banco.kv('gasto', {})) || {}, limite = dia(Date.now() - (dias - 1) * 864e5), por = {};
    let t = { ent: 0, sai: 0, custo: 0, n: 0 };
    for (const [d, l] of Object.entries(g)) { if (d < limite) continue; for (const [k, x] of Object.entries(l)) { const p = (por[k] = por[k] || { ent: 0, sai: 0, custo: 0, n: 0 }); ['ent', 'sai', 'custo', 'n'].forEach((c) => { p[c] += x[c]; t[c] += x[c]; }); } }
    return { t, por };
  }
  async function pintar() {
    const el = MC.$('#gasto-corpo'); if (!el) return;
    const [h, s, mm] = [await somar(1), await somar(7), await somar(30)];
    const conv = MC.chat && MC.chat.conversa, ult = conv && [...(conv.msgs || [])].reverse().find((m) => m.uso);
    const linhaT = (n, x) => '<tr><td>' + n + '</td><td>' + x.n + '</td><td>' + mil(x.ent) + '</td><td>' + mil(x.sai) + '</td><td><b>' + reais(x.custo) + '</b></td></tr>';
    const porIA = Object.entries(mm.por).sort((a, b) => b[1].custo - a[1].custo).map(([k, x]) => linhaT(E(k.replace('|', ' · ')), x)).join('');
    el.innerHTML =
      '<div class="cartao"><h3>Quanto gastou</h3><table class="tab-gasto"><tr><th></th><th>perguntas</th><th>entrada</th><th>saída</th><th>custo</th></tr>' +
        linhaT('Hoje', h.t) + linhaT('7 dias', s.t) + linhaT('30 dias', mm.t) + '</table>' +
        (porIA ? '<details><summary class="pequeno"><b>Por IA (30 dias)</b></summary><table class="tab-gasto">' + porIA + '</table></details>' : '') + '</div>' +
      '<div class="cartao"><h3>📏 Esta conversa</h3>' +
        (ult ? '<p>A última pergunta levou <b>' + mil(ult.uso.ent) + ' tokens de entrada</b>' + (ult.uso.estimado ? ' (conta aproximada)' : '') + '. Isso inclui as regras, a memória, ' + (MC.pref.get('guiaLigado', false) ? '<b>o guia (ligado)</b>, ' : '') + 'e as últimas <b>' + MC.pref.get('contexto', 16) + ' mensagens</b>.</p>' : '<p class="mudo">Ainda sem perguntas nesta conversa.</p>') +
        '<p class="mudo pequeno">Conversa comprida = cada pergunta leva mais coisa junto = mais cara e a IA pode se perder. O Meu Chat já resume as mensagens antigas sozinho. Para economizar mais:</p>' +
        '<label class="pequeno" style="display:block">Mensagens que vão junto: <select id="g-ctx">' + [6, 10, 16, 24, 40].map((n) => '<option' + (n === MC.pref.get('contexto', 16) ? ' selected' : '') + '>' + n + '</option>').join('') + '</select> (menos = mais barato)</label>' +
        '<label class="pequeno" style="display:block">📷 Fotos: <select id="g-foto">' + [['alta', 'Economia alta (768 px — mais barato)'], ['media', 'Média (1024 px — lê bem print)'], ['original', 'Nítida (1600 px — mais cara)']].map(([v, n]) => '<option value="' + v + '"' + (MC.pref.get('fotoEconomia', 'media') === v ? ' selected' : '') + '>' + n + '</option>').join('') + '</select></label>' +
        '<label class="pequeno" style="display:block"><input type="checkbox" id="g-fotohist"' + (MC.pref.get('fotosHistorico', false) ? ' checked' : '') + '> Mandar de novo as fotos antigas da conversa (mais caro; desmarcado = só a foto da pergunta de agora)</label>' +
        '<div class="linha"><button class="bt primario" id="g-enxuto" title="A IA faz um resumo de tudo e abre uma conversa nova que começa desse resumo">✂️ Continuar numa conversa nova (enxuta)</button></div></div>' +
      '<div class="cartao"><h3>⚙️ Preços (aproximados)</h3><p class="mudo pequeno">Em dólar por 1 milhão de tokens. Os preços mudam: confira no site de cada IA e corrija aqui se precisar.</p>' +
        '<label class="pequeno" style="display:block">Dólar hoje: R$ <input id="g-dolar" type="number" step="0.01" min="1" value="' + dolar() + '" style="width:90px"></label>' +
        '<label class="pequeno" style="display:block"><input type="checkbox" id="g-gempago"' + (geminiPago() ? ' checked' : '') + '> Meu Gemini é PAGO (com cartão). Desmarcado = grátis com cota diária.</label>' +
        '<table class="tab-gasto"><tr><th>IA</th><th>modelo</th><th>entrada</th><th>saída</th></tr>' +
        Object.entries(tabela()).map(([p, l]) => l.map(([re, a, b], i) => '<tr><td>' + E(p) + '</td><td class="pequeno">' + E(re || '(os outros)') + '</td><td><input data-p="' + E(p) + '" data-i="' + i + '" data-c="1" type="number" step="0.01" value="' + a + '" style="width:70px"></td><td><input data-p="' + E(p) + '" data-i="' + i + '" data-c="2" type="number" step="0.01" value="' + b + '" style="width:70px"></td></tr>').join('')).join('') + '</table>' +
        '<div class="linha"><button class="bt" id="g-padrao">↺ Voltar os preços padrão</button></div></div>';
    el.onchange = (e) => {
      const t = e.target;
      if (t.id === 'g-ctx') { MC.pref.set('contexto', +t.value); MC.aviso('📏 Agora vão junto as últimas ' + t.value + ' mensagens.', 'ok'); }
      if (t.id === 'g-dolar') MC.pref.set('gasto:dolar', +t.value || 5.5);
      if (t.id === 'g-foto') { MC.pref.set('fotoEconomia', t.value); MC.aviso('📷 Fotos: ' + t.options[t.selectedIndex].text, 'ok'); }
      if (t.id === 'g-fotohist') MC.pref.set('fotosHistorico', t.checked);
      if (t.id === 'g-gempago') MC.pref.set('gasto:geminiPago', t.checked);
      if (t.dataset.p) { const tb = tabela(), p = t.dataset.p, l = tb[p].map((x) => x.slice()); l[+t.dataset.i][+t.dataset.c] = +t.value || 0; const meus = MC.pref.get('gasto:precos', {}) || {}; meus[p] = l; MC.pref.set('gasto:precos', meus); }
    };
    el.onclick = async (e) => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.id === 'g-padrao') { MC.pref.set('gasto:precos', {}); pintar(); }
      if (b.id === 'g-enxuto' && MC.chat && MC.chat.continuarEnxuto) { MC.fecharPaineis && MC.fecharPaineis(); MC.chat.continuarEnxuto(); }
    };
  }
  async function abrir() { await pintar(); MC.abrirPainel('painel-gasto'); }
  document.addEventListener('DOMContentLoaded', () => { const b = MC.$('#bt-gasto'); if (b) b.onclick = abrir; });
  MC.gasto = { texto, registrar, custo, pintar, abrir, preco };
})(window.MC);
