/* 🐘 Nuvem pelo NEON (17/11) — usada pelo Meu Chat e pelo SK Jurídico HTML.
   Você cola o endereço do banco (a "connection string" postgresql://…) e pronto:
   o app cria a tabela SOZINHO (não precisa rodar nada em inglês no site do Neon).
   ⚠ Esse endereço tem a SENHA do banco: fica só no seu aparelho (como uma chave de IA),
   nunca vai para a nuvem nem para backup aberto. É para uso SEU; para clientes, o Supabase com login.
   Usa o driver oficial do Neon (@neondatabase/serverless), pela internet (CDN). */
(function () {
  'use strict';
  const CDN = 'https://cdn.jsdelivr.net/npm/@neondatabase/serverless@0.10.4/+esm';
  let modP = null;
  async function q(conn) {
    if (!/^postgres(ql)?:\/\//i.test(String(conn || '').trim())) throw new Error('Cole o endereço do Neon que começa com postgresql://');
    if (!modP) modP = import(CDN).catch((e) => { modP = null; throw new Error('Não consegui baixar a peça do Neon (precisa de internet).'); });
    const m = await modP;
    return m.neon(String(conn).trim(), { disableWarningInBrowsers: true, fullResults: false });
  }
  function traduzir(e) {
    const t = String((e && e.message) || e);
    if (/password authentication failed|28P01/i.test(t)) return new Error('A senha do endereço do Neon está errada (copie de novo em Connect).');
    if (/does not exist|3D000/i.test(t) && /database/i.test(t)) return new Error('Esse banco não existe no Neon (confira o nome no final do endereço).');
    if (/fetch|network|Failed/i.test(t)) return new Error('Sem conexão com o Neon (internet, ou o endereço está errado).');
    return e instanceof Error ? e : new Error(t);
  }
  async function preparar(conn) {
    try {
      const sql = await q(conn);
      await sql('create table if not exists mc_itens (tipo text not null, id text not null, dados jsonb, apagado boolean not null default false, atualizado bigint not null, primary key (tipo, id))', []);
      // 17/11: confere se a tabela é DESTE jeito (o erro das versões antigas era tabela com outro formato)
      const cols = (await sql("select column_name from information_schema.columns where table_schema = current_schema() and table_name = 'mc_itens'", [])).map((r) => r.column_name);
      const falta = ['tipo', 'id', 'dados', 'apagado', 'atualizado'].filter((c) => !cols.includes(c));
      if (falta.length) throw new Error('Já existe no seu Neon uma tabela "mc_itens" com OUTRO formato (falta: ' + falta.join(', ') + '). Não mexi nela. Abra 🗄 Banco de Dados, veja o que tem dentro e, se não servir, renomeie: alter table mc_itens rename to mc_itens_velha — depois toque em 🔌 Conectar de novo.');
      await sql('create index if not exists mc_itens_atualizado on mc_itens (atualizado)', []);
      return true;
    } catch (e) { if (/OUTRO formato/.test(e.message)) throw e; throw traduzir(e); }
  }
  // grava (só se a linha que chega for mais nova ou igual à que está lá)
  async function upsert(conn, linhas) {
    try {
      const sql = await q(conn);
      for (const r of linhas) {
        await sql('insert into mc_itens (tipo, id, dados, apagado, atualizado) values ($1, $2, $3::jsonb, $4, $5) on conflict (tipo, id) do update set dados = excluded.dados, apagado = excluded.apagado, atualizado = excluded.atualizado where mc_itens.atualizado <= excluded.atualizado',
          [r.tipo, r.id, JSON.stringify(r.dados == null ? null : r.dados), !!r.apagado, Number(r.atualizado)]);
      }
    } catch (e) { throw traduzir(e); }
  }
  // lista o que mudou depois do "cursor" (atualizado, tipo, id) — em pedaços de 25 linhas,
  // porque o Neon recusa resposta acima de 64 MB (códigos grandes enchem rápido).
  // prefixo: 'jur:' para o jurídico; sem prefixo = o que NÃO é do jurídico; tipo+id = um item só
  async function listar(conn, o) {
    o = o || {};
    try {
      const sql = await q(conn);
      const conv = (r) => ({ tipo: r.tipo, id: r.id, dados: typeof r.dados === 'string' ? JSON.parse(r.dados) : r.dados, apagado: !!r.apagado, atualizado: Number(r.atualizado) });
      if (o.tipo && o.id) return (await sql('select tipo, id, dados, apagado, atualizado from mc_itens where tipo = $1 and id = $2 limit 1', [o.tipo, o.id])).map(conv);
      const filtro = o.prefixo ? 'tipo like $4' : "tipo not like 'jur:%'";
      let a = Number(o.desde || 0), t = o.depoisTipo || '', i = o.depoisId || '';
      const fora = [], max = o.limite || 200; let PEDACO = 25;
      while (fora.length < max) {
        const p = [a, t, i]; if (o.prefixo) p.push(o.prefixo + '%');
        let l;
        try { l = await sql('select tipo, id, dados, apagado, atualizado from mc_itens where (atualizado, tipo, id) > ($1::bigint, $2::text, $3::text) and ' + filtro + ' order by atualizado, tipo, id limit ' + PEDACO, p); }
        catch (e) { if (/too large|67108864/i.test(String(e && e.message)) && PEDACO > 1) { PEDACO = Math.max(1, Math.floor(PEDACO / 4)); continue; } throw e; } // ainda grande? pega menos de cada vez
        if (!l || !l.length) break;
        l.forEach((r) => fora.push(conv(r)));
        const u = l[l.length - 1]; a = Number(u.atualizado); t = u.tipo; i = u.id;
        if (l.length < PEDACO) break;
      }
      return fora;
    } catch (e) { throw traduzir(e); }
  }
  // 19/11: pergunta livre (usada pelo Modo online: lê só o que a tela precisa)
  async function consulta(conn, texto, params) { try { const sql = await q(conn); return await sql(texto, params || []); } catch (e) { throw traduzir(e); } }
  window.NuvemNeon = { preparar, upsert, listar, consulta };
})();
