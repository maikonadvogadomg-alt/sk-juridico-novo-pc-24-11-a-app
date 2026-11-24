/* 🛡 SEGREDOS (20/11) — reconhece CHAVES SECRETAS para elas não irem parar no chat, na IA nem na nuvem.
   Usado pelo Meu Chat e pelo SK Jurídico HTML.
   - ehSecreta(chave): true se for a chave "service_role", "sb_secret_…", token "sbp_…" etc.
     (A palavra "service_role" fica ESCONDIDA dentro da chave eyJ…: é preciso abrir a chave para ver.)
   - achar(texto): lista o que parece segredo no texto.
   - tampar(texto): troca cada segredo por "[🔒 chave secreta tirada]". O resto do texto fica igual. */
(function () {
  'use strict';
  function papelJwt(t) {
    try {
      const p = String(t).split('.')[1]; if (!p) return '';
      const b = p.replace(/-/g, '+').replace(/_/g, '/'); const js = JSON.parse(decodeURIComponent(escape(atob(b + '==='.slice((b.length + 3) % 4)))));
      return js.role || '';
    } catch (e) { return ''; }
  }
  // cada regra: nome que aparece para você + o padrão
  const REGRAS = [
    { nome: 'chave service_role do Supabase', re: /eyJ[\w-]{8,}\.eyJ[\w-]{8,}\.[\w-]{8,}/g, so: (m) => papelJwt(m) === 'service_role' },
    { nome: 'chave secreta do Supabase (sb_secret)', re: /\bsb_secret_[\w-]{10,}/g },
    { nome: 'token da conta do Supabase (sbp_)', re: /\bsbp_(?:v\d+_)?[a-f0-9]{20,}/g },
    { nome: 'senha de login dentro de um link (access/refresh token)', re: /(?:access_token|refresh_token)=[\w.-]{8,}/g },
    { nome: 'endereço de banco com senha', re: /\bpostgres(?:ql)?:\/\/[^\s:@\/]+:[^\s@\/]+@[^\s'"]+/g },
    { nome: 'chave do OpenRouter', re: /\bsk-or-v1-[a-f0-9]{20,}/g },
    { nome: 'chave da Anthropic', re: /\bsk-ant-[\w-]{20,}/g },
    { nome: 'chave da OpenAI', re: /\bsk-(?:proj-)?[A-Za-z0-9_-]{30,}/g },
    { nome: 'chave do Google (Gemini)', re: /\bAIza[\w-]{30,}/g },
    { nome: 'token do GitHub', re: /\b(?:ghp_[A-Za-z0-9]{30,}|github_pat_[\w]{30,})/g },
  ];
  function achar(texto) {
    const s = String(texto || ''); const achou = [];
    for (const r of REGRAS) { r.re.lastIndex = 0; let m; while ((m = r.re.exec(s))) if (!r.so || r.so(m[0])) achou.push({ nome: r.nome, trecho: m[0] }); }
    return achou;
  }
  function tampar(texto) {
    let s = String(texto == null ? '' : texto);
    for (const r of REGRAS) s = s.replace(r.re, (m) => (!r.so || r.so(m) ? '[🔒 chave secreta tirada]' : m));
    return s;
  }
  function ehSecreta(chave) {
    const k = String(chave || '').trim(); if (!k) return false;
    if (/^sb_secret_|^sbp_/.test(k)) return true;
    if (/^eyJ/.test(k)) return papelJwt(k) === 'service_role';
    return false;
  }
  window.Segredos = { achar, tampar, ehSecreta, papelJwt };
})();
