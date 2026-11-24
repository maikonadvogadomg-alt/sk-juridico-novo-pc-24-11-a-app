/* =========================================================================
   Assistente Jurídico — 16-internet.js
   🌐 Pesquisa na internet para QUALQUER IA (Ollama, Groq, Claude, OpenAI…).
   O Gemini pesquisa sozinho. As outras usam a SUA chave de busca (Serper,
   Tavily ou Brave, todas com uso grátis) e recebem os resultados junto.
   Link colado no pedido: o app lê a página (leitor r.jina.ai, grátis).
   ========================================================================= */
(function (J) {
  'use strict';
  const BUSCAS = {
    serper: { nome: 'Serper (resultados do Google — 2.500 buscas grátis)', site: 'https://serper.dev/api-key' },
    tavily: { nome: 'Tavily (1.000 buscas grátis por mês)', site: 'https://app.tavily.com/home' },
    brave: { nome: 'Brave Search (plano grátis)', site: 'https://api-dashboard.search.brave.com/app/keys' },
  };
  const cfg = () => Object.assign({ tipo: '', chave: '' }, J.pref.get('busca', {}));
  async function buscar(q) {
    const { tipo, chave } = cfg(); if (!tipo || !chave) return null;
    let itens = [];
    if (tipo === 'serper') {
      const r = await fetch('https://google.serper.dev/search', { method: 'POST', headers: { 'X-API-KEY': chave, 'content-type': 'application/json' }, body: JSON.stringify({ q, gl: 'br', hl: 'pt-br', num: 8 }) });
      if (!r.ok) throw new Error('Serper respondeu ' + r.status);
      const j = await r.json(); itens = (j.organic || []).map((x) => ({ titulo: x.title, url: x.link, trecho: x.snippet }));
    } else if (tipo === 'tavily') {
      const r = await fetch('https://api.tavily.com/search', { method: 'POST', headers: { 'content-type': 'application/json', Authorization: 'Bearer ' + chave }, body: JSON.stringify({ api_key: chave, query: q, max_results: 8 }) });
      if (!r.ok) throw new Error('Tavily respondeu ' + r.status);
      const j = await r.json(); itens = (j.results || []).map((x) => ({ titulo: x.title, url: x.url, trecho: x.content }));
    } else if (tipo === 'brave') {
      const r = await fetch('https://api.search.brave.com/res/v1/web/search?count=8&country=BR&search_lang=pt-br&q=' + encodeURIComponent(q), { headers: { 'X-Subscription-Token': chave, Accept: 'application/json' } });
      if (!r.ok) throw new Error('Brave respondeu ' + r.status);
      const j = await r.json(); itens = ((j.web && j.web.results) || []).map((x) => ({ titulo: x.title, url: x.url, trecho: (x.description || '').replace(/<[^>]+>/g, '') }));
    }
    return itens;
  }
  async function lerLink(url) {
    const r = await fetch('https://r.jina.ai/' + url, { headers: { Accept: 'text/plain' } });
    if (!r.ok) throw new Error('não abriu (' + r.status + ')');
    const t = await r.text(); return t.length > 30000 ? t.slice(0, 30000) + '\n…(cortado)' : t;
  }
  // devolve o texto com os resultados, para ir junto com o pedido
  async function preparar(consulta, textoComLinks) {
    const partes = [], fontes = [];
    const links = [...new Set(((textoComLinks || '') + ' ' + consulta).match(/https?:\/\/[^\s)>\]]+/g) || [])].slice(0, 3);
    for (const u of links) { try { partes.push('CONTEÚDO DO LINK ' + u + ':\n' + await lerLink(u)); fontes.push(u); } catch (e) { J.aviso('🔗 ' + u + ': ' + e.message, 'erro'); } }
    const it = await buscar(consulta.slice(0, 300));
    if (it === null) J.aviso('🌐 Para esta IA pesquisar, coloque uma chave de busca em ⚙️ Config → 🌐 Pesquisa (Serper, Tavily ou Brave, todas grátis). Ou use o Gemini.');
    else if (it.length) { partes.push('RESULTADOS DA PESQUISA NA INTERNET (para: ' + consulta.slice(0, 200) + '):\n' + it.map((x, i) => (i + 1) + '. ' + x.titulo + ' — ' + x.url + '\n' + (x.trecho || '')).join('\n\n') + '\n\nUse só o que estes resultados dizem e cite os links. Não invente.'); it.forEach((x) => fontes.push(x.url)); }
    return { texto: partes.join('\n\n'), fontes };
  }
  J.internet = { BUSCAS, cfg, buscar, preparar };
})(window.J);
