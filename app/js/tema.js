/* 🎨 TEMA — trocar as cores do app (18/11). O mesmo arquivo em todos os apps do Maikon.
   Escuro (o de sempre) · Claro · Alto contraste (letra bem branca no preto) · Papel (sépia, cansa menos a vista).
   Cada app diz quais são as cores dele (window.TEMA_APP) e onde fica o botão 🎨.
   Fica guardado neste aparelho. Não muda nada do projeto, só as cores da tela. */
(function () {
  'use strict';
  const A = window.TEMA_APP; if (!A) return;
  const NOMES = { escuro: '🌙 Escuro', claro: '☀️ Claro', contraste: '⚫ Alto contraste', papel: '📜 Papel (sépia)' };
  const chave = 'tema:' + A.id;
  const ler = () => { try { return localStorage.getItem(chave) || A.padrao || 'escuro'; } catch (e) { return A.padrao || 'escuro'; } };
  let estilo = null;
  function aplicar(t) {
    const v = (A.cores && A.cores[t]) || null;
    if (!estilo) { estilo = document.createElement('style'); estilo.id = 'tema-estilo'; document.head.appendChild(estilo); }
    const claroSim = t === 'claro' || t === 'papel';
    estilo.textContent = v ? ':root, :root[data-theme] { ' + Object.entries(v).map(([k, c]) => k + ':' + c + ' !important').join(';') + '; color-scheme: ' + (claroSim ? 'light' : 'dark') + ' !important }\n' + ((A.extra && A.extra[t]) || '') : '';
    document.documentElement.setAttribute('data-tema', t);
    try { localStorage.setItem(chave, t); } catch (e) {}
    const b = document.getElementById('bt-tema'); if (b) b.title = 'Cores: ' + NOMES[t] + ' (toque para trocar)';
  }
  function menu(botao) {
    const velho = document.getElementById('tema-menu'); if (velho) { velho.remove(); return; }
    const m = document.createElement('div'); m.id = 'tema-menu'; m.setAttribute('role', 'menu');
    const r = botao.getBoundingClientRect();
    m.style.cssText = 'position:fixed;z-index:99999;top:' + Math.round(r.bottom + 6) + 'px;right:' + Math.max(8, Math.round(innerWidth - r.right)) + 'px;background:#fff;color:#111;border:1px solid #bbb;border-radius:12px;box-shadow:0 8px 30px rgba(0,0,0,.35);padding:6px;display:flex;flex-direction:column;min-width:190px;font:15px system-ui,sans-serif';
    const atual = ler();
    Object.entries(NOMES).forEach(([k, n]) => { if (A.cores && !A.cores[k] && k !== (A.padrao || 'escuro')) return; const i = document.createElement('button'); i.type = 'button'; i.setAttribute('role', 'menuitem'); i.textContent = (k === atual ? '✓ ' : '   ') + n; i.style.cssText = 'text-align:left;background:' + (k === atual ? '#e8f0ff' : 'none') + ';border:0;border-radius:8px;padding:10px 12px;min-height:44px;font:inherit;color:#111;cursor:pointer'; i.onclick = () => { aplicar(k); m.remove(); }; m.appendChild(i); });
    document.body.appendChild(m);
    setTimeout(() => document.addEventListener('click', function fora(e) { if (!m.contains(e.target) && e.target !== botao) { m.remove(); document.removeEventListener('click', fora); } }), 0);
  }
  function botao() {
    if (document.getElementById('bt-tema')) return;
    const onde = document.querySelector(A.barra); if (!onde) return;
    const b = document.createElement('button'); b.type = 'button'; b.id = 'bt-tema'; b.className = A.classe || ''; b.textContent = '🎨'; b.setAttribute('aria-label', 'Trocar as cores');
    if (!A.classe) b.style.cssText = 'background:none;border:0;font-size:20px;min-width:40px;min-height:40px;cursor:pointer;color:inherit';
    b.onclick = (e) => { e.stopPropagation(); menu(b); };
    if (A.antesDe && onde.querySelector(A.antesDe)) onde.insertBefore(b, onde.querySelector(A.antesDe)); else onde.appendChild(b);
    aplicar(ler());
  }
  aplicar(ler());
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', botao); else botao();
  window.TEMA = { aplicar, ler };
})();
