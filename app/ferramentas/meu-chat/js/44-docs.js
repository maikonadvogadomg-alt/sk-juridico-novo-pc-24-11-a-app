/* Meu Chat — 44-docs.js · 📄 DOCUMENTAÇÃO DOS PROJETOS (18/11)
   Cada projeto tem um README.md completo (o que é, recursos, onde ficam os dados, regras e o MAPA dos
   arquivos). Aqui você escolhe um e ele entra na conversa SÓ AGORA — não vai em toda mensagem.
   Serve para a IA (qualquer uma, inclusive o Claude) entender o projeto sem ler o código inteiro. */
(function (MC) {
  'use strict';
  const E = MC.esc;
  const DOCS = [
    ['meuchat', '💬 Meu Chat'], ['sk-juridico-html', '⚖️ SK Jurídico HTML'], ['minisk', '🛠️ Mini SK'],
    ['laboratorio', '🔬 Laboratório'], ['cacabug', '🐞 Caça-Bug'],
  ];
  async function ler(id) { const r = await fetch('docs/' + id + '.md'); if (!r.ok) throw new Error('não achei a documentação ' + id); return r.text(); }
  async function abrir() {
    const w = document.createElement('div'); w.className = 'janela-fundo';
    w.innerHTML = '<div class="janela" role="dialog" aria-modal="true" aria-label="Documentação"><div class="cab"><b>📄 Documentação dos projetos</b><button class="ic" data-d="fechar" aria-label="Fechar">✕</button></div>' +
      '<p class="mudo pequeno">Escolha um projeto: a documentação vai para a caixa de texto <b>só nesta pergunta</b> (não fica indo em toda mensagem). Depois escreva o que você quer, por exemplo: <i>"onde eu mudo a cor do botão?"</i></p>' +
      '<div class="d-lista">' + DOCS.map(([id, n]) => '<div class="cod-item"><div style="flex:1"><b>' + n + '</b><div class="pequeno mudo" data-tam="' + id + '">…</div></div><button class="ic" data-d="ver" data-id="' + id + '" title="Ler aqui">👁</button><button class="ic" data-d="baixar" data-id="' + id + '" title="Baixar o README.md">⤓</button><button class="bt peq primario" data-d="usar" data-id="' + id + '">📎 Usar</button></div>').join('') + '</div>' +
      '<pre class="z-ver d-ver" hidden></pre></div>';
    document.body.appendChild(w);
    DOCS.forEach(async ([id]) => { try { const t = await ler(id); w.querySelector('[data-tam="' + id + '"]').textContent = '≈ ' + Math.round(t.length / 4).toLocaleString('pt-BR') + ' tokens'; } catch (e) { w.querySelector('[data-tam="' + id + '"]').textContent = '⚠ ' + e.message; } });
    w.addEventListener('click', async (e) => {
      const b = e.target.closest('[data-d]'); if (!b && e.target !== w) return;
      const a = b ? b.dataset.d : 'fechar'; if (a === 'fechar') { w.remove(); return; }
      try {
        const t = await ler(b.dataset.id);
        if (a === 'ver') { const v = w.querySelector('.d-ver'); v.hidden = false; v.textContent = t; v.scrollIntoView({ block: 'nearest' }); }
        if (a === 'baixar') MC.baixar('README-' + b.dataset.id + '.md', t, 'text/markdown');
        if (a === 'usar') { const ent = MC.$('#entrada'); ent.value = 'DOCUMENTAÇÃO DO PROJETO (leia antes de responder; para mexer, diga quais arquivos precisa ver):\n"""\n' + t + '\n"""\n\n' + ent.value; ent.dispatchEvent(new Event('input')); w.remove(); ent.focus(); MC.aviso('📄 Documentação na caixa. Agora escreva a sua pergunta embaixo e envie.', 'ok'); }
      } catch (er) { MC.aviso('⚠ ' + er.message, 'erro'); }
    });
  }
  document.addEventListener('DOMContentLoaded', () => { const b = MC.$('#bt-docs'); if (b) b.onclick = abrir; });
  MC.docs = { abrir, DOCS };
})(window.MC);
