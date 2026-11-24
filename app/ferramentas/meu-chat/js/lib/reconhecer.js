/* ♻️ RECONHECER (18/11) — a mesma peça no Meu Chat, no SK Jurídico HTML e no 🗄 Banco.
   Recebe QUALQUER coisa que veio dos seus apps e diz sozinho O QUE É e PARA ONDE VAI:
   - backup do Meu Chat (.json) · backup do SK Jurídico HTML / Assistente Jurídico (.json)
   - o "⬇ backup" do 🗄 Banco (todas as tabelas) ou o próprio banco lido direto (Neon)
   - a tabela mc_itens (Meu Chat + jurídico na nuvem): separa por tipo
   - o banco ANTIGO do SK Jurídico 1.7 da Replit (ementas, doc_templates, custom_actions, ai_history, snippets, conversations/messages…)
   - qualquer outra tabela: mostra as colunas e quantas linhas tem (para você ou a IA entender o formato)
   Devolve um "pacote" já no formato de cada app. Nada é apagado: restaurar sempre JUNTA. */
(function () {
  'use strict';
  const LOJAS_JUR = ['documentos', 'modelos', 'ementas', 'historico', 'conversas', 'regras', 'codigos'];
  const vazio = () => ({ juridico: { lojas: Object.fromEntries(LOJAS_JUR.map((l) => [l, []])), prefs: {} }, meuchat: { conversas: [], memoria: '', codigos: {}, links: [] }, outros: [] });
  const quando = (v) => { const t = v ? Date.parse(v) : NaN; return isNaN(t) ? (typeof v === 'number' ? v : Date.now()) : t; };
  const txtHtml = (t) => '<p>' + String(t || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\n{2,}/g, '</p><p>').replace(/\n/g, '<br>') + '</p>';
  const colunas = (linhas) => { const s = new Set(); (linhas || []).slice(0, 50).forEach((r) => r && typeof r === 'object' && Object.keys(r).forEach((k) => s.add(k))); return [...s]; };
  const parse = (v) => { if (typeof v !== 'string') return v; try { return JSON.parse(v); } catch (e) { return v; } };

  // ── as tabelas do SK Jurídico 1.7 (Replit) → lojas do SK Jurídico HTML ──
  const ANTIGO = {
    ementas: (r) => ['ementas', { id: 'v17-' + r.id, titulo: r.titulo || 'Ementa', categoria: r.categoria || '', texto: r.texto || '', marcada: false, criado: Date.now() }],
    doc_templates: (r) => ['modelos', { id: 'v17-' + r.id, titulo: r.titulo || 'Modelo', html: /<\w/.test(r.conteudo || '') ? r.conteudo : txtHtml(r.conteudo), categoria: r.categoria || '', criado: Date.now() }],
    prompt_templates: (r) => ['regras', { id: 'v17p-' + r.id, tipo: 'regra', titulo: r.titulo || 'Modelo de pedido', texto: r.texto || '', ativa: false, criado: Date.now() }],
    custom_actions: (r) => ['regras', { id: 'v17a-' + r.id, tipo: 'regra', titulo: '⚡ Ação: ' + (r.label || 'sem nome'), texto: (r.description ? r.description + '\n\n' : '') + (r.prompt || ''), ativa: false, criado: Date.now() }],
    ai_history: (r) => ['historico', { id: 'v17-' + r.id, titulo: (r.action || 'IA') + ' — ' + String(r.input_preview || r.inputPreview || '').slice(0, 60), html: txtHtml(r.result), md: r.result || '', acao: r.action || '', pergunta: r.input_preview || r.inputPreview || '', criado: quando(r.created_at || r.createdAt) }],
    snippets: (r) => ['codigos', { id: 'v17-' + r.id, nome: r.title || 'Código', codigo: (r.mode === 'html' || !r.mode ? '<!doctype html>\n<style>\n' + (r.css || '') + '\n</style>\n' + (r.html || '') + '\n<script>\n' + (r.js || '') + '\n<\/script>' : r.js || r.html || ''), tipo: 'html', criado: Date.now() }],
  };
  const NOMES_ANTIGO = { ementas: 'ementas', doc_templates: 'modelos de documento', prompt_templates: 'modelos de pedido', custom_actions: 'ações personalizadas (o motor que você criou)', ai_history: 'histórico da IA', snippets: 'códigos (playground)', conversations: 'conversas', messages: 'mensagens' };

  function deTabelas(tabelas, p, achados) {
    for (const [nome, linhas0] of Object.entries(tabelas || {})) {
      const linhas = Array.isArray(linhas0) ? linhas0 : [];
      if (nome === 'mc_itens') {
        let c = { conv: 0, mem: 0, cod: 0, jur: 0, cofre: 0 };
        for (const r of linhas) {
          if (!r || r.apagado === true || r.apagado === 't') continue;
          const d = parse(r.dados); const tipo = String(r.tipo || '');
          if (tipo === 'conversa' && d && d.msgs) { p.meuchat.conversas.push(d); c.conv++; }
          else if (tipo === 'memoria' && d) { p.meuchat.memoria += (p.meuchat.memoria ? '\n' : '') + (d.texto || ''); c.mem++; }
          else if (tipo === 'codigo' && d) { p.meuchat.codigos[r.id] = d; c.cod++; }
          else if (tipo.startsWith('jur:') && tipo !== 'jur:prefs' && d) { const l = tipo.slice(4); if (p.juridico.lojas[l]) { p.juridico.lojas[l].push(d); c.jur++; } }
          else if (tipo === 'jur:prefs' && d) Object.assign(p.juridico.prefs, d);
          else if (tipo === 'cofre') c.cofre++;
        }
        achados.push({ nome: 'mc_itens (Meu Chat + SK Jurídico na nuvem)', reconhecido: true, linhas: linhas.length, detalhe: c.conv + ' conversa(s) e ' + c.cod + ' código(s) do Meu Chat' + (c.mem ? ', a memória' : '') + ' · ' + c.jur + ' item(ns) do SK Jurídico' + (c.cofre ? ' · 🔐 cofre das chaves (trancado: abra em ☁️ → Trazer as chaves)' : '') });
      } else if (ANTIGO[nome]) {
        for (const r of linhas) { const [l, it] = ANTIGO[nome](r); p.juridico.lojas[l].push(it); }
        achados.push({ nome: nome + ' (SK Jurídico 1.7 da Replit)', reconhecido: true, linhas: linhas.length, detalhe: linhas.length + ' ' + NOMES_ANTIGO[nome] + ' → SK Jurídico HTML' });
      } else if (nome === 'conversations' && tabelas.messages) {
        const msgs = tabelas.messages || [];
        for (const cv of linhas) {
          const m = msgs.filter((x) => String(x.conversation_id || x.conversationId) === String(cv.id)).sort((a, b) => quando(a.created_at || a.createdAt) - quando(b.created_at || b.createdAt));
          p.juridico.lojas.conversas.push({ id: 'v17-' + cv.id, titulo: cv.title || 'Conversa', criado: quando(cv.created_at || cv.createdAt), msgs: m.map((x) => ({ role: x.role === 'user' ? 'user' : 'assistant', content: x.content || '', t: quando(x.created_at || x.createdAt) })) });
        }
        achados.push({ nome: 'conversations + messages (SK Jurídico 1.7)', reconhecido: true, linhas: linhas.length, detalhe: linhas.length + ' conversa(s) com ' + msgs.length + ' mensagem(ns) → SK Jurídico HTML' });
      } else if (nome === 'messages' && tabelas.conversations) { /* já foi junto com conversations */ }
      else {
        p.outros.push({ nome, linhas });
        achados.push({ nome, reconhecido: false, linhas: linhas.length, detalhe: 'não é de nenhum app conhecido. Colunas: ' + (colunas(linhas).join(', ') || '(vazia)') });
      }
    }
  }

  // o principal: olha o que veio e diz o que é
  function detectar(obj, origem) {
    const p = vazio(), achados = [];
    let formato = 'desconhecido';
    if (obj && obj.app === 'meu-chat') {
      formato = 'Backup do Meu Chat';
      p.meuchat.conversas = obj.conversas || []; p.meuchat.memoria = obj.memoria || '';
      achados.push({ nome: 'Meu Chat', reconhecido: true, linhas: (obj.conversas || []).length, detalhe: (obj.conversas || []).length + ' conversa(s)' + (obj.memoria ? ' e a memória' : '') + ((obj.chaves || []).length ? ' · ⚠ tem ' + obj.chaves.length + ' chave(s) dentro' : '') });
      p.meuchat.original = obj;
    } else if (obj && obj.app === 'assistente-juridico') {
      formato = 'Backup do SK Jurídico HTML';
      for (const [l, itens] of Object.entries(obj.lojas || {})) if (p.juridico.lojas[l]) p.juridico.lojas[l] = itens;
      achados.push({ nome: 'SK Jurídico HTML', reconhecido: true, linhas: Object.values(obj.lojas || {}).reduce((t, x) => t + x.length, 0), detalhe: LOJAS_JUR.map((l) => (obj.lojas && obj.lojas[l] ? obj.lojas[l].length : 0) + ' ' + l).join(' · ') });
      p.juridico.prefs = obj.prefs || {};
    } else if (obj && obj.tabelas && typeof obj.tabelas === 'object') {
      formato = 'Banco de dados (' + Object.keys(obj.tabelas).length + ' tabela(s))';
      deTabelas(obj.tabelas, p, achados);
    } else if (Array.isArray(obj) && obj.length && obj[0] && 'tipo' in obj[0] && 'dados' in obj[0]) {
      formato = 'Tabela mc_itens (exportada)'; deTabelas({ mc_itens: obj }, p, achados);
    } else if (Array.isArray(obj)) {
      formato = 'Lista de ' + obj.length + ' item(ns)';
      const cols = colunas(obj);
      if (cols.includes('texto') && cols.includes('titulo')) { obj.forEach((r, i) => p.juridico.lojas.ementas.push({ id: 'imp-' + (r.id || i), titulo: r.titulo, categoria: r.categoria || '', texto: r.texto, marcada: false, criado: Date.now() })); achados.push({ nome: 'lista', reconhecido: true, linhas: obj.length, detalhe: 'parece EMENTAS (titulo + texto) → SK Jurídico HTML' }); }
      else { p.outros.push({ nome: origem || 'lista', linhas: obj }); achados.push({ nome: origem || 'lista', reconhecido: false, linhas: obj.length, detalhe: 'Colunas: ' + cols.join(', ') }); }
    } else if (obj && typeof obj === 'object') {
      // talvez um objeto de tabelas sem o "tabelas"
      const arrays = Object.entries(obj).filter(([, v]) => Array.isArray(v));
      if (arrays.length) { formato = 'Conjunto de ' + arrays.length + ' lista(s)'; deTabelas(Object.fromEntries(arrays), p, achados); }
    }
    const nJur = Object.values(p.juridico.lojas).reduce((t, x) => t + x.length, 0), nMC = p.meuchat.conversas.length + Object.keys(p.meuchat.codigos).length + (p.meuchat.memoria ? 1 : 0);
    return { formato, achados, pacote: p, nJur, nMC };
  }

  // 📐 o FORMATO de um banco: tabelas, colunas e o SQL para criar igual (para a IA e para você)
  function formatoMarkdown(colunasPorTabela, contagem) {
    let md = '# 📐 Formato do banco\n\nGerado em ' + new Date().toLocaleString('pt-BR') + '. Mande isto para a IA antes de pedir mudanças: assim ela não cria tabela no formato errado.\n\n';
    let sql = '';
    for (const [t, cols] of Object.entries(colunasPorTabela)) {
      md += '## ' + t + ' (' + (contagem[t] != null ? contagem[t] + ' linhas' : '?') + ')\n\n| coluna | tipo | vazio? | padrão |\n|---|---|---|---|\n' + cols.map((c) => '| ' + c.column_name + ' | ' + c.data_type + ' | ' + (c.is_nullable === 'YES' ? 'pode' : 'não') + ' | ' + (c.column_default || '') + ' |').join('\n') + '\n\n';
      sql += 'create table if not exists ' + t + ' (\n' + cols.map((c) => '  ' + c.column_name + ' ' + (c.data_type === 'character varying' ? 'text' : c.data_type) + (c.is_nullable === 'NO' ? ' not null' : '') + (c.column_default && !/nextval/.test(c.column_default) ? ' default ' + c.column_default : '')).join(',\n') + '\n);\n\n';
    }
    return md + '## SQL para criar igual\n\n```sql\n' + sql + '```\n';
  }
  window.Reconhecer = { detectar, formatoMarkdown, LOJAS_JUR };
})();
