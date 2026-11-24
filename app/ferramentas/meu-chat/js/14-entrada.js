/* Meu Chat — 14-entrada.js · 🔑 TELA DE LOGIN NA ENTRADA (17/11)
   Igual à Replit: abriu o Meu Chat em qualquer lugar (celular, PC, PWA, APK) → e-mail + senha →
   as conversas, a memória, os códigos guardados E as chaves de IA aparecem. Ninguém cola endereço.
   19/11: aparece sempre que você ainda não entrou (sem precisar embutir): na 1ª vez, ⚙ cola a URL e a chave anon do Supabase ali mesmo e 📋 copia o comando que cria a tabela.
   Dentro do SK Jurídico/Laboratório ela não aparece (lá quem cuida do login é o app de fora). */
(function (MC) {
  'use strict';
  function dentroDeOutroApp() { try { return window.parent !== window; } catch (e) { return true; } }
  function precisa() {
    const N = MC.nuvem; if (!N || dentroDeOutroApp()) return false;
    if (N.sessao()) return false;
    if (N.ehNeon() && N.logado()) return false;
    return !MC.pref.get('entrada:pular', false);
  }
  function mostrar() {
    if (MC.$('#entrada-login')) return;
    const w = document.createElement('div');
    w.id = 'entrada-login'; w.setAttribute('role', 'dialog'); w.setAttribute('aria-modal', 'true'); w.setAttribute('aria-label', 'Entrar no Meu Chat');
    w.innerHTML = '<div class="ent-caixa"><div class="ent-logo">💬</div><h1>Meu Chat</h1>' +
      '<p class="ent-sub">Entre para ter as suas conversas, a memória e as suas chaves em qualquer aparelho.</p>' +
      '<label class="ent-rot" for="ent-email">E-mail</label><input id="ent-email" type="email" autocomplete="username" inputmode="email" placeholder="seu@email.com">' +
      '<label class="ent-rot" for="ent-senha">Senha</label><div class="ent-senha"><input id="ent-senha" type="password" autocomplete="current-password" placeholder="mínimo 6"><button type="button" class="ent-olho" data-e="olho" aria-label="Mostrar a senha">👁</button></div>' +
      (MC.nuvem.temEmb() ? '' : '<details class="ent-cfg"' + (MC.nuvem.config().url ? '' : ' open') + '><summary>⚙ 1ª vez: ligar o seu Supabase (só uma vez por aparelho)</summary>' +
        '<ol class="ent-passos"><li>No <b>supabase.com</b>, abra o seu projeto.</li><li><b>SQL Editor</b> → <b>New query</b> → toque em <b>📋 Copiar o comando das tabelas</b> aqui → cole lá → <b>Run</b>. (Cria a tabela sozinho. Só uma vez.)</li><li><b>Project Settings → API</b>: copie a <b>Project URL</b> e a chave <b>anon public</b> e cole aqui embaixo.</li></ol>' +
        '<button type="button" class="bt ent-bt" data-e="sql">📋 Copiar o comando das tabelas</button>' +
        '<label class="ent-rot" for="ent-url">Project URL</label><input id="ent-url" autocomplete="off" placeholder="https://xxxx.supabase.co" value="' + MC.esc(MC.nuvem.config().url) + '">' +
        '<label class="ent-rot" for="ent-anon">Chave anon public</label><input id="ent-anon" autocomplete="off" placeholder="eyJ… ou sb_publishable_…" value="' + MC.esc(MC.nuvem.config().anon) + '">' +
        '<p class="ent-sub" style="font-size:12px">Essas duas são públicas (todo site com Supabase tem). Quem protege é o seu e-mail e senha. <b>Nunca</b> cole aqui a "service_role" nem a senha do banco.</p></details>') +
      '<button class="bt primario ent-bt" data-e="entrar">🔑 Entrar</button><button class="bt ent-bt" data-e="criar">✨ Criar conta (1ª vez)</button>' +
      '<p id="ent-msg" class="ent-msg" role="status"></p>' +
      '<div class="ent-rodape"><button class="ent-link" data-e="esqueci">Esqueci a senha</button><button class="ent-link" data-e="pular">Usar só neste aparelho, sem login</button></div></div>';
    document.body.appendChild(w);
    const msg = (t, ruim) => { const m = MC.$('#ent-msg'); m.textContent = t; m.className = 'ent-msg' + (ruim ? ' ruim' : ''); };
    setTimeout(() => { try { MC.$('#ent-email').focus(); } catch (e) {} }, 100);
    w.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target.id === 'ent-senha') w.querySelector('[data-e="entrar"]').click(); });
    w.addEventListener('click', async (e) => {
      const b = e.target.closest('[data-e]'); if (!b) return; const a = b.dataset.e;
      if (a === 'olho') { const s = MC.$('#ent-senha'); s.type = s.type === 'password' ? 'text' : 'password'; return; }
      if (a === 'sql') { try { await navigator.clipboard.writeText(MC.nuvem.SQL); msg('✅ Copiado. Cole no SQL Editor do Supabase e toque em Run.'); } catch (er) { prompt('Copie:', MC.nuvem.SQL); } return; }
      if (a === 'pular') { MC.pref.set('entrada:pular', true); w.remove(); MC.aviso('Tudo fica só neste aparelho. Para entrar depois: ⚙️ → ☁️ Nuvem.'); return; }
      const bts = [...w.querySelectorAll('button')]; bts.forEach((x) => { x.disabled = true; });
      try {
        if (MC.$('#ent-url')) { const u = MC.$('#ent-url').value.trim(), an = MC.$('#ent-anon').value.trim(); if (!/^https:\/\/[^ ]+$/.test(u) || an.length < 20) throw new Error('Primeiro cole a Project URL e a chave anon public (em ⚙ 1ª vez, aqui em cima).'); if (/service_role/.test(an)) throw new Error('Essa é a chave SECRETA (service_role). Cole a "anon public".'); MC.nuvem.salvarConfig(u, an); }
        const email = MC.$('#ent-email').value, senha = MC.$('#ent-senha').value;
        if (a === 'esqueci') { await MC.nuvem.esqueci(email); msg('📧 Mandei um e-mail para trocar a senha. Abra o e-mail e siga o link.'); return; }
        msg(a === 'criar' ? '⏳ Criando a sua conta…' : '⏳ Entrando…');
        const r = await MC.nuvem.entrar(email, senha, a === 'criar');
        if (r.confirmar) { msg('📧 Conta criada! Abra o e-mail do Supabase, toque no link de confirmação, volte aqui e toque em 🔑 Entrar.'); return; }
        msg('✅ Entrou! Trazendo as suas coisas…');
        try { const s = await MC.nuvem.sincronizar(true); MC.aviso('☁️ Pronto: ' + s.desceu + ' item(ns) chegaram, ' + s.subiu + ' foram daqui.' + (r.chaves ? ' ' + r.chaves : ''), 'ok'); }
        catch (err) { MC.aviso('Entrou, mas a nuvem respondeu: ' + err.message, 'erro'); }
        w.remove();
      } catch (err) { msg('⚠ ' + err.message, true); }
      finally { bts.forEach((x) => { x.disabled = false; }); }
    });
  }

  // 🔁 17/11: voltou do e-mail de "esqueci a senha" (o link traz #access_token=…&type=recovery): pede a senha nova
  function recuperacao() {
    const h = new URLSearchParams(String(location.hash || '').replace(/^#/, ''));
    if (h.get('type') !== 'recovery' || !h.get('access_token')) return false;
    const EMB = MC.nuvem ? MC.nuvem.config() : (window.NUVEM_EMBUTIDA || {}); if (!EMB.url || !EMB.anon) return false;
    const w = document.createElement('div'); w.id = 'entrada-login'; w.setAttribute('role', 'dialog'); w.setAttribute('aria-modal', 'true');
    w.innerHTML = '<div class="ent-caixa"><div class="ent-logo">🔁</div><h1>Nova senha</h1><p class="ent-sub">Escolha a senha nova (mínimo 6). Depois é só entrar com ela.</p>' +
      '<label class="ent-rot" for="ent-nova">Senha nova</label><input id="ent-nova" type="password" autocomplete="new-password">' +
      '<button class="ent-bt bt primario" data-r="ok">💾 Salvar a senha nova</button><p id="ent-msg" class="ent-msg" role="status"></p></div>';
    document.body.appendChild(w);
    w.querySelector('[data-r="ok"]').onclick = async () => {
      const s = w.querySelector('#ent-nova').value, m = w.querySelector('#ent-msg');
      if (!s || s.length < 6) { m.textContent = '⚠ A senha precisa de pelo menos 6 letras/números.'; m.className = 'ent-msg ruim'; return; }
      try {
        const r = await fetch(String(EMB.url).replace(/\/+$/, '') + '/auth/v1/user', { method: 'PUT', headers: { apikey: EMB.anon, Authorization: 'Bearer ' + h.get('access_token'), 'content-type': 'application/json' }, body: JSON.stringify({ password: s }) });
        if (!r.ok) throw new Error('o link venceu ou já foi usado — peça outro em "Esqueci a senha"');
        history.replaceState(null, '', location.pathname + location.search);
        m.textContent = '✅ Senha trocada! Agora entre com ela.'; m.className = 'ent-msg';
        setTimeout(() => { w.remove(); mostrar(); }, 1500);
      } catch (e) { m.textContent = '⚠ ' + e.message; m.className = 'ent-msg ruim'; }
    };
    return true;
  }
  document.addEventListener('DOMContentLoaded', () => setTimeout(() => { if (recuperacao()) return; if (precisa()) mostrar(); }, 50));
  MC.entrada = { mostrar, precisa };
})(window.MC);
