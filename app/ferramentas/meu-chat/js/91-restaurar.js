/* Meu Chat — 91-restaurar.js · ♻️ RESTAURAR QUALQUER BACKUP (18/11)
   O ⤒ Restaurar agora entende QUALQUER arquivo dos seus apps: backup do Meu Chat, do SK Jurídico,
   o ⬇ backup do 🗄 Banco/Neon (tabela mc_itens), o banco antigo do SK Jurídico 1.7…
   Reconhece sozinho, mostra o que achou, traz o que é do Meu Chat (junta, não apaga)
   e entrega a parte do jurídico num arquivo pronto para restaurar lá. */
(function (MC) {
  'use strict';
  const E = MC.esc;
  async function ler(f) {
    if (/\.zip$/i.test(f.name)) {
      const z = await JSZip.loadAsync(f); const js = Object.values(z.files).filter((x) => !x.dir && /\.json$/i.test(x.name));
      if (!js.length) throw new Error('o zip não tem nenhum .json dentro');
      if (js.length === 1) return JSON.parse(await js[0].async('string'));
      const tabelas = {}; for (const x of js) { try { const v = JSON.parse(await x.async('string')); tabelas[x.name.replace(/^.*\//, '').replace(/\.json$/i, '')] = Array.isArray(v) ? v : (v.tabelas || v); } catch (e) {} }
      return { tabelas };
    }
    try { return JSON.parse(await MC.arquivos.textoDoArquivo(f)); } catch (e) { throw new Error('este arquivo não é um backup (JSON)'); }
  }
  async function trazerMeuChat(p) {
    const d = { app: 'meu-chat', versao: 1, conversas: p.conversas, memoria: p.memoria, prefs: {} };
    await MC.backup.restaurar(new File([JSON.stringify(d)], 'restaurar.json'));
    const cods = Object.entries(p.codigos || {}); if (cods.length) { const m = (await MC.banco.kv('codigos', {})) || {}; let n = 0; for (const [id, c] of cods) if (!m[id]) { m[id] = c; n++; if (MC.nuvem && MC.nuvem.marcar) MC.nuvem.marcar('codigo', id); } await MC.banco.kvSet('codigos', m); if (n) MC.aviso('🧪 +' + n + ' código(s) em Meus códigos', 'ok'); }
  }
  function janela(r, nome) {
    const p = r.pacote;
    const w = document.createElement('div'); w.className = 'janela-fundo';
    w.innerHTML = '<div class="janela" role="dialog" aria-modal="true" aria-label="Restaurar"><div class="cab"><b>♻️ ' + E(nome) + '</b><button class="ic" data-r="fechar" aria-label="Fechar">✕</button></div>' +
      '<p><b>Reconheci:</b> ' + E(r.formato) + '</p><ul class="pequeno">' + r.achados.map((a) => '<li>' + (a.reconhecido ? '✅' : '❔') + ' <b>' + E(a.nome) + '</b> — ' + E(a.detalhe) + '</li>').join('') + '</ul>' +
      (r.nMC ? '<p><b>Para o Meu Chat (aqui):</b> ' + p.meuchat.conversas.length + ' conversa(s), ' + Object.keys(p.meuchat.codigos).length + ' código(s)' + (p.meuchat.memoria ? ', a memória' : '') + '.</p><button class="bt primario" data-r="trazer">📥 Trazer para o Meu Chat (juntar)</button>' : '<p class="mudo pequeno">Nada aqui é do Meu Chat.</p>') +
      (r.nJur ? '<p style="margin-top:10px"><b>Do SK Jurídico:</b> ' + Reconhecer.LOJAS_JUR.map((l) => p.juridico.lojas[l].length ? p.juridico.lojas[l].length + ' ' + l : '').filter(Boolean).join(' · ') + '.</p><button class="bt" data-r="jur">⬇ Baixar a parte do SK Jurídico (restaure lá em 📁 → ♻️ Restaurar)</button>' : '') +
      (p.outros.length ? '<p style="margin-top:10px"><b>Outras tabelas:</b></p>' + p.outros.map((o, i) => '<button class="bt peq" data-out="' + i + '">⬇ ' + E(o.nome) + ' (' + o.linhas.length + ')</button>').join(' ') : '') + '</div>';
    document.body.appendChild(w);
    w.addEventListener('click', async (e) => {
      const b = e.target.closest('[data-r],[data-out]'); if (!b && e.target !== w) return;
      if (!b || b.dataset.r === 'fechar') { w.remove(); return; }
      if (b.dataset.out != null) { const o = p.outros[+b.dataset.out]; MC.baixar(o.nome + '.json', JSON.stringify(o.linhas, null, 1), 'application/json'); return; }
      if (b.dataset.r === 'jur') { MC.baixar('para-o-sk-juridico-' + new Date().toISOString().slice(0, 10) + '.json', JSON.stringify({ app: 'assistente-juridico', versao: 1, criado: new Date().toISOString(), lojas: p.juridico.lojas, prefs: {} }), 'application/json'); return; }
      if (b.dataset.r === 'trazer') { b.disabled = true; try { await trazerMeuChat(p.meuchat); w.remove(); } catch (er) { b.disabled = false; MC.aviso('⚠ ' + er.message, 'erro'); } }
    });
  }
  async function abrirArquivo(f) {
    const obj = await ler(f);
    if (obj && obj.app === 'meu-chat') { await MC.backup.restaurar(new File([JSON.stringify(obj)], f.name)); if (obj.codigos) await trazerMeuChat({ conversas: [], memoria: '', codigos: obj.codigos }); return; }
    janela(Reconhecer.detectar(obj, f.name), f.name);
  }
  document.addEventListener('DOMContentLoaded', () => {
    const i = MC.$('#in-restaurar'); if (!i) return;
    i.accept = '.json,.zip,application/json';
    i.onchange = async (e) => { const f = e.target.files[0]; e.target.value = ''; if (f) try { await abrirArquivo(f); } catch (er) { MC.aviso('❌ ' + er.message, 'erro'); } };
  });
  MC.restaurar = { abrirArquivo, janela };
})(window.MC);
