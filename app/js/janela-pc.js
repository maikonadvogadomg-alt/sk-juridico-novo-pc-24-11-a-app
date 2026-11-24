/* 🖥 JANELA DO PC (18/11) — igual ao Mini SK para PC: um botão para a janela ir de
   📱 cara de celular → 📟 média → 🖥 tela cheia, e voltar. Só aparece no programa .exe. */
(function () {
  'use strict';
  const PC = window.miniskPC; if (!PC || typeof PC.tamanho !== 'function') return;
  const ORDEM = ['celular', 'tablet', 'grande'], ICONE = { celular: '📱', tablet: '📟', grande: '🖥' }, NOME = { celular: 'cara de celular', tablet: 'média', grande: 'tela cheia' };
  const chave = 'pcJanela:' + location.port;
  const ler = () => { try { return localStorage.getItem(chave) || 'grande'; } catch (e) { return 'grande'; } };
  function por(t) { try { PC.tamanho(t); localStorage.setItem(chave, t); } catch (e) {} const b = document.getElementById('bt-janela'); if (b) { b.textContent = ICONE[t]; b.title = 'Janela: ' + NOME[t] + ' (toque para trocar)'; } }
  function botao() {
    const barra = document.querySelector(window.JANELA_BARRA || 'header'); if (!barra || document.getElementById('bt-janela')) return;
    const b = document.createElement('button'); b.type = 'button'; b.id = 'bt-janela'; b.setAttribute('aria-label', 'Tamanho da janela');
    b.style.cssText = 'background:none;border:0;font-size:20px;min-width:40px;min-height:40px;cursor:pointer;color:inherit';
    b.onclick = () => { const i = ORDEM.indexOf(ler()); por(ORDEM[(i + 1) % ORDEM.length]); };
    const tema = document.getElementById('bt-tema'); if (tema && tema.parentNode === barra) barra.insertBefore(b, tema); else barra.appendChild(b);
    por(ler());
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(botao, 300)); else setTimeout(botao, 300);
})();
