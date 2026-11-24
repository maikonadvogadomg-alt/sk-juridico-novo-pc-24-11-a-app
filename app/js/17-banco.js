/* =========================================================================
   SK Jurídico HTML — 17-banco.js · 🗄 BANCO (23/11) — igual ao painel do Neon
   Abre por ⚙️ Config → ☁️ Nuvem → 🗄 Banco. Mostra, sem ir no site do Supabase:
   • 📐 o ESQUEMA: cada tabela, para que serve e as colunas;
   • 🔎 CONFERIR: quais tabelas existem e quais faltam, e quantas linhas cada uma tem;
   • 🛠 CRIAR O QUE FALTA: copia o comando certo e abre o SQL Editor do SEU projeto;
   • 👁 VER AS LINHAS de cada tabela (toque numa para ver o conteúdo);
   • 🤖 PERGUNTAR À IA: ela recebe o esquema e a conferência e explica o que acrescentar ou corrigir.
   Só LÊ: daqui nada é apagado. Chaves secretas aparecem tapadas.
   ========================================================================= */
(function (J) {
  'use strict';
  const E = J.esc;
  const EXPLICA = {
    mc_itens: 'tabela única (modo antigo, junto com o Meu Chat): cada coisa tem um "tipo" (jur:documentos, jur:ementas…)',
    jur_config: 'seus dados (perfil), modelos do Word, robô de prazos (vistos e lidas), preferências',
    jur_chaves: 'chaves de IA TRANCADAS com a sua senha do login (ninguém lê, nem o Supabase)',
    jur_documentos: 'as peças que você gerou e salvou',
    jur_modelos: 'modelos de peça',
    jur_ementas: 'ementas e jurisprudência que você guardou',
    jur_historico: 'histórico do que foi feito',
    jur_conversas: 'conversas com a IA',
    jur_regras: 'regras do escritório (e o 📦 pacote)',
    jur_codigos: 'códigos guardados',
    jur_clientes: 'cadastro de clientes (nome, e-mails, telefones, processos)',
    jur_publicacoes: 'publicações achadas pelo 🤖 robô de prazos',
  };
  const COLUNAS = [['user_id', 'de quem é (o seu login) — cada um só vê o seu'], ['id', 'o número/nome da coisa'], ['titulo', 'o título, para você ler na tabela'], ['dados', 'o conteúdo completo (jsonb)'], ['apagado', 'se foi apagada (fica marcada)'], ['atualizado', 'quando mudou pela última vez']];
  const data = (n) => { try { return new Date(+n).toLocaleString('pt-BR'); } catch (e) { return ''; } };
  let ultimaConf = null;

  const tabelas = () => (J.nuvem.separado() ? J.nuvem.TAB_TODAS : ['mc_itens']);
  function linkSql() {
    const ref = ((J.nuvem.config().url || '').match(/https:\/\/([a-z0-9]+)\.supabase\.co/) || [])[1];
    return ref ? 'https://supabase.com/dashboard/project/' + ref + '/sql/new?content=' + encodeURIComponent(J.nuvem.sqlCerto()) : 'https://supabase.com/dashboard/projects';
  }

  async function abrir() {
    if (!J.nuvem || !J.nuvem.logado() || J.nuvem.ehNeon()) return J.aviso('Entre com o seu e-mail e senha primeiro (⚙️ Config → ☁️ Nuvem).');
    let w = J.$('#banco-jur'); if (w) w.remove();
    w = document.createElement('div'); w.id = 'banco-jur'; w.setAttribute('role', 'dialog'); w.setAttribute('aria-modal', 'true');
    w.style.cssText = 'position:fixed;inset:0;z-index:8500;background:var(--bg,#0f172a);color:var(--tx,inherit);overflow:auto;overscroll-behavior:none;padding:14px 16px 40px';
    const sep = J.nuvem.separado();
    w.innerHTML = '<div style="max-width:780px;margin:0 auto"><div class="linha" style="align-items:center"><h2 style="margin:0;flex:1">🗄 Banco do jurídico</h2><button class="bt" data-b="fechar" aria-label="Fechar">✕</button></div>' +
      '<p class="peq mut">Conta: <b>' + E((J.nuvem.sessao() || {}).email || '') + '</b> · ' + E(J.nuvem.config().url.replace('https://', '')) + ' · ' + (sep ? '<b>banco próprio do jurídico</b> (uma tabela para cada parte)' : 'banco <b>junto com o Meu Chat</b> (tabela única mc_itens)') + '</p>' +
      '<div class="linha"><button class="bt forte" data-b="conferir">🔎 Conferir as tabelas</button><button class="bt" data-b="criar">🛠 Criar o que falta</button><button class="bt" data-b="sql">📋 Copiar o SQL completo</button></div>' +
      '<div id="bj-conf" class="cartao"><p class="peq mut">Toque em 🔎 Conferir para ver quais tabelas existem e quantas linhas cada uma tem.</p></div>' +
      '<div class="cartao"><h3>📐 O esquema</h3>' + tabelas().map((t) => '<p style="margin:6px 0"><code>' + t + '</code> — ' + E(EXPLICA[t] || '') + '</p>').join('') +
      '<p class="peq mut" style="margin-top:8px">Colunas de cada tabela:</p><table class="peq" style="width:100%;border-collapse:collapse">' + (sep ? COLUNAS : [['user_id', 'de quem é'], ['tipo', 'a gaveta (jur:documentos…)'], ['id', 'o número da coisa'], ['dados', 'o conteúdo'], ['apagado', 'se foi apagada'], ['atualizado', 'quando mudou']]).map(([c, d]) => '<tr><td style="padding:4px 8px 4px 0"><code>' + c + '</code></td><td>' + d + '</td></tr>').join('') + '</table>' +
      '<p class="peq mut" style="margin-top:8px"><b>E-mail e senha</b> ficam na tabela própria do Supabase, <code>auth.users</code> (Authentication → Users). A senha fica embaralhada: ninguém lê.</p></div>' +
      '<div class="cartao"><h3 id="bj-linhas-tit">👁 Ver as linhas</h3><div class="linha">' + tabelas().filter((t) => t !== 'jur_chaves').map((t) => '<button class="bt mini" data-b="ver" data-t="' + t + '">' + t.replace('jur_', '') + '</button>').join('') + '</div><div id="bj-linhas"></div></div>' +
      '<div class="cartao"><h3>🤖 Perguntar à IA sobre o banco</h3><p class="peq mut">Ela recebe o esquema e o resultado da conferência (não recebe os seus dados nem as chaves).</p>' +
      '<textarea id="bj-pergunta" style="width:100%;min-height:80px" placeholder="Ex.: Está faltando alguma tabela? Preciso de uma tabela para guardar os prazos — como fica?"></textarea>' +
      '<div class="linha"><button class="bt forte" data-b="ia">🤖 Perguntar</button></div><div id="bj-resposta"></div></div></div>';
    document.body.appendChild(w);
    w.addEventListener('click', clique);
    conferir();
  }

  async function conferir() {
    const el = J.$('#bj-conf'); if (!el) return;
    el.innerHTML = '<p>⏳ Conferindo…</p>';
    const res = [];
    for (const t of tabelas()) {
      try { const l = await J.nuvem.rest0('GET', t + '?select=id&apagado=eq.false&limit=20000'); res.push({ t, ok: true, n: (l || []).length }); }
      catch (e) { res.push({ t, ok: false, erro: /tabela ainda não existe/i.test(e.message) ? 'não existe ainda' : e.message }); }
    }
    ultimaConf = res;
    const faltam = res.filter((r) => !r.ok);
    el.innerHTML = '<h3>' + (faltam.length ? '⚠ Falta(m) ' + faltam.length + ' tabela(s)' : '✅ Todas as tabelas existem') + '</h3><table style="width:100%;border-collapse:collapse">' +
      res.map((r) => '<tr style="border-bottom:1px solid var(--li,#2b3a5c)"><td style="padding:6px 0"><code>' + r.t + '</code></td><td>' + (r.ok ? '✅ ' + r.n + ' linha(s)' : '❌ ' + E(r.erro)) + '</td></tr>').join('') + '</table>' +
      (faltam.length ? '<p class="peq" style="margin-top:8px">Toque em <b>🛠 Criar o que falta</b>: eu copio o comando e abro o SQL Editor do seu projeto. Lá é só colar (se não aparecer) e tocar em <b>Run</b>. Não apaga nada.</p>' : '');
  }

  async function verLinhas(t) {
    J.$('#bj-linhas-tit').textContent = '👁 ' + t;
    const el = J.$('#bj-linhas'); el.innerHTML = '<p>⏳</p>';
    try {
      const sel = t === 'mc_itens' ? 'tipo,id,atualizado,dados' : 'id,titulo,atualizado';
      const l = (await J.nuvem.rest0('GET', t + '?select=' + sel + '&apagado=eq.false&order=atualizado.desc&limit=40' + (t === 'mc_itens' ? '&tipo=like.jur:*' : ''))) || [];
      el.innerHTML = l.length ? l.map((r) => '<div class="linha" style="border-bottom:1px solid var(--li,#2b3a5c);cursor:pointer" data-b="linha" data-t="' + t + '" data-id="' + E(r.id) + '"' + (r.tipo ? ' data-tipo="' + E(r.tipo) + '"' : '') + '><div style="flex:1;min-width:0"><b>' + E(String(r.titulo || (r.dados && (r.dados.titulo || r.dados.nome)) || r.id).slice(0, 90)) + '</b>' + (r.tipo ? ' <span class="peq mut">' + E(r.tipo) + '</span>' : '') + '<div class="peq mut">' + data(r.atualizado) + '</div></div><span>👁</span></div>').join('') : '<p class="peq mut">Vazia.</p>';
    } catch (e) { el.innerHTML = '<p>⚠ ' + E(e.message) + '</p>'; }
  }
  async function verConteudo(b) {
    const t = b.dataset.t;
    const q = t + '?select=dados&id=eq.' + encodeURIComponent(b.dataset.id) + (b.dataset.tipo ? '&tipo=eq.' + encodeURIComponent(b.dataset.tipo) : '') + '&limit=1';
    const l = await J.nuvem.rest0('GET', q);
    let txt = JSON.stringify(l && l[0] && l[0].dados, null, 2) || '(vazio)';
    if (window.Segredos) txt = Segredos.tampar(txt);
    const v = J.$('#bj-conteudo'); if (v) v.remove();
    const d = document.createElement('div'); d.id = 'bj-conteudo'; d.className = 'cartao';
    d.innerHTML = '<pre style="white-space:pre-wrap;word-break:break-word;max-height:55vh;overflow:auto;font-size:12px">' + E(txt.slice(0, 150000)) + '</pre>';
    b.after(d);
  }
  async function perguntar() {
    const q = J.$('#bj-pergunta').value.trim(); if (!q) return J.aviso('Escreva a pergunta.');
    if (!J.ia.temChave()) return J.aviso('Coloque uma chave de IA em ⚙️ Config primeiro.');
    const out = J.$('#bj-resposta'); out.innerHTML = '<p>⏳ Pensando…</p>';
    if (!ultimaConf) await conferir();
    const ctx = 'BANCO DO APP SK JURÍDICO (Supabase/PostgreSQL).\nModo: ' + (J.nuvem.separado() ? 'banco próprio, uma tabela por parte' : 'tabela única mc_itens com coluna tipo') + '.\n' +
      'Tabelas esperadas e para que servem:\n' + tabelas().map((t) => '- ' + t + ': ' + (EXPLICA[t] || '')).join('\n') +
      '\nConferência agora:\n' + (ultimaConf || []).map((r) => '- ' + r.t + ': ' + (r.ok ? 'existe, ' + r.n + ' linhas' : 'FALTA (' + r.erro + ')')).join('\n') +
      '\n\nSQL que o app usa para criar (pode rodar de novo, só cria o que falta):\n' + J.nuvem.sqlCerto();
    const sistema = 'Você ajuda um advogado (não programador, fala português, usa o celular) a cuidar do banco de dados do app dele no Supabase. Responda em português simples, com passos curtos. Quando sugerir SQL, use SEMPRE "create table if not exists" / "alter table ... add column if not exists" (nunca apague tabela nem coluna) e mantenha o padrão das tabelas do app (user_id, id, titulo, dados jsonb, apagado, atualizado, RLS "cada um ve o seu"). Diga claramente se a sugestão precisa também de mudança no app (aí o advogado pede ao Claude).';
    try {
      const md = await J.ia.gerar({ mensagens: [{ role: 'user', content: ctx + '\n\nPERGUNTA DO ADVOGADO: ' + q }], sistema });
      out.innerHTML = '<div class="cartao">' + (J.texto && J.texto.mdParaHtml ? J.texto.mdParaHtml(md) : '<pre style="white-space:pre-wrap">' + E(md) + '</pre>') + '</div><div class="linha"><button class="bt mini" data-b="copiar-resp">📋 Copiar a resposta</button></div>';
      out.dataset.md = md;
    } catch (e) { out.innerHTML = '<p>⚠ ' + E(e.message) + '</p>'; }
  }
  async function clique(e) {
    const b = e.target.closest('[data-b]'); if (!b) return;
    try {
      const a = b.dataset.b;
      if (a === 'fechar') return J.$('#banco-jur').remove();
      if (a === 'conferir') return conferir();
      if (a === 'sql') { await J.copiar(J.nuvem.sqlCerto()); return J.aviso('📋 SQL copiado. Cole no Supabase: SQL Editor → New query → Run.', 'ok'); }
      if (a === 'criar') { try { await J.copiar(J.nuvem.sqlCerto()); } catch (x) {} J.aviso('📋 Copiei o comando. Vou abrir o SQL Editor: se não aparecer escrito, segure e cole, e toque em Run.', 'ok'); setTimeout(() => window.open(linkSql(), '_blank'), 900); return; }
      if (a === 'ver') return verLinhas(b.dataset.t);
      if (a === 'linha') return verConteudo(b);
      if (a === 'ia') return perguntar();
      if (a === 'copiar-resp') return J.copiar(J.$('#bj-resposta').dataset.md || '');
    } catch (er) { J.aviso('⚠ ' + er.message, 'erro'); }
  }
  J.banco = { abrir, conferir };
})(window.J);
