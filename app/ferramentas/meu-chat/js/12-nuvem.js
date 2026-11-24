/* =========================================================================
   Meu Chat — 12-nuvem.js · ☁️ NUVEM (Supabase) — 17/11
   - O chat continua funcionando SEM internet: tudo fica no aparelho (IndexedDB).
   - Com a nuvem ligada, ele COPIA para o Supabase e traz de volta em qualquer aparelho
     (celular, PC, outro celular) entrando com o mesmo e-mail e senha.
   - Vai para a nuvem: conversas (as fotos ficam só no aparelho, para não encher), memória,
     configurações e contextos. As CHAVES DE IA não vão — só se você mandar, TRANCADAS com
     uma senha sua (o Supabase nunca vê a chave aberta).
   - Neon não dá direto do navegador (precisaria de um servidor no meio); o Supabase dá.
   ========================================================================= */
(function (MC) {
  'use strict';
  const E = MC.esc || ((s) => String(s == null ? '' : s));
  const K = { url: 'nuvem:url', anon: 'nuvem:anon', sessao: 'nuvem:sessao', ultimo: 'nuvem:ultimo', mod: 'nuvem:mod', ligada: 'nuvem:ligada' };
  const TABELA = 'mc_itens';
  // prefs que NÃO viajam (são deste aparelho)
  const PREF_LOCAL = /^(nuvem:|chaveAtiva$|motorVoz$|vozAparelhoNome$|vozVelocidade$|vozTom$|modelos:|ollama)/;

  const SQL = `-- ☁️ Meu Chat — rode UMA vez no Supabase: SQL Editor → New query → cole → Run
create table if not exists public.mc_itens (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  tipo text not null,
  id text not null,
  dados jsonb,
  apagado boolean not null default false,
  atualizado bigint not null,
  primary key (user_id, tipo, id)
);
create index if not exists mc_itens_atualizado on public.mc_itens (user_id, atualizado);
alter table public.mc_itens enable row level security;
drop policy if exists "cada um ve o seu" on public.mc_itens;
create policy "cada um ve o seu" on public.mc_itens for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);`;

  // ── sessão e pedidos ──
  // 17/11: Supabase EMBUTIDO (js/nuvem-embutida.js) — com ele, em qualquer aparelho é só e-mail e senha
  const EMB = window.NUVEM_EMBUTIDA || {};
  const temEmb = () => !!(EMB.url && EMB.anon);
  const cfg = () => (temEmb() ? { url: String(EMB.url).replace(/\/+$/, ''), anon: EMB.anon } : { url: String(MC.pref.get(K.url, '')).replace(/\/+$/, ''), anon: MC.pref.get(K.anon, '') });
  const sessao = () => MC.pref.get(K.sessao, null);
  // 🐘 ou ☁️ (a mesma escolha vale para o SK Jurídico HTML)
  const ehNeon = () => MC.pref.get('nuvem:tipo', 'supabase') === 'neon';
  const neonConn = () => MC.pref.get('nuvem:neon', '');
  const logado = () => (ehNeon() ? !!(neonConn() && MC.pref.get('nuvem:neonOk', false)) : !!(sessao() && cfg().url && cfg().anon));
  const ligada = () => logado() && MC.pref.get(K.ligada, true);

  async function auth(caminho, corpo) {
    const c = cfg(); if (!c.url || !c.anon) throw new Error('Cole o endereço (URL) e a chave pública (anon) do Supabase primeiro.');
    let r; try { r = await fetch(c.url + '/auth/v1/' + caminho, { method: 'POST', headers: { apikey: c.anon, 'content-type': 'application/json' }, body: JSON.stringify(corpo) }); }
    catch (e) { throw new Error('Sem conexão com o Supabase (internet ou endereço errado).'); }
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(traduzir(j.error_description || j.msg || j.message || j.error || ('erro ' + r.status)));
    return j;
  }
  function traduzir(m) {
    m = String(m);
    if (/invalid login/i.test(m)) return 'E-mail ou senha errados.';
    if (/email not confirmed/i.test(m)) return 'Falta confirmar o e-mail: abra o e-mail que o Supabase mandou e toque no link. Depois toque em Entrar.';
    if (/already registered|already exists/i.test(m)) return 'Esse e-mail já tem conta: toque em Entrar.';
    if (/password.*(6|short|weak)/i.test(m)) return 'A senha precisa de pelo menos 6 letras/números.';
    if (/invalid api key|no api key/i.test(m)) return 'A chave pública (anon) está errada.';
    return m;
  }
  function guardarSessao(j) {
    if (!j.access_token) return null;
    const s = { access: j.access_token, refresh: j.refresh_token, expira: Date.now() + (j.expires_in || 3600) * 1000, email: (j.user && j.user.email) || '', uid: (j.user && j.user.id) || '' };
    MC.pref.set(K.sessao, s); return s;
  }
  async function token() {
    let s = sessao(); if (!s) throw new Error('Entre na sua conta da nuvem primeiro.');
    if (Date.now() > s.expira - 60000) {
      try { s = guardarSessao(await auth('token?grant_type=refresh_token', { refresh_token: s.refresh })) || s; }
      catch (e) { if (/conex/i.test(e.message)) throw e; MC.pref.set(K.sessao, null); throw new Error('A sessão da nuvem venceu: entre de novo (⚙️ → ☁️ Nuvem).'); }
    }
    return s;
  }
  async function rest(metodo, caminho, corpo, prefer) {
    const c = cfg(), s = await token();
    const h = { apikey: c.anon, Authorization: 'Bearer ' + s.access, 'content-type': 'application/json' };
    if (prefer) h.Prefer = prefer;
    let r; try { r = await fetch(c.url + '/rest/v1/' + caminho, { method: metodo, headers: h, body: corpo ? JSON.stringify(corpo) : undefined }); }
    catch (e) { throw new Error('Sem conexão com o Supabase.'); }
    if (!r.ok) {
      const j = await r.json().catch(() => ({}));
      if (r.status === 404 || /relation .* does not exist|Could not find the table/i.test(j.message || '')) throw new Error('A tabela ainda não existe: toque em 📋 Copiar o SQL e rode no Supabase (SQL Editor → Run).');
      throw new Error(traduzir(j.message || j.hint || ('erro ' + r.status)));
    }
    return r.status === 204 ? null : r.json().catch(() => null);
  }

  // ── o que muda no aparelho fica marcado para subir ──
  const mod = () => MC.pref.get(K.mod, {});
  const sujos = new Set(); let timer = null;
  // 17/11: cada mudança ganha uma hora ÚNICA (antes várias ficavam com a mesma e algumas não desciam)
  let ultHora = 0; const horaUnica = () => { let t = Date.now(); if (t <= ultHora) t = ultHora + 1; ultHora = t; return t; };
  function marcar(tipo, id) { const m = mod(); m[tipo + ':' + id] = horaUnica(); MC.pref.set(K.mod, m); sujos.add(tipo + ':' + id); if (ligada()) { clearTimeout(timer); timer = setTimeout(() => subir().catch(aviso), 2500); } }
  let aplicando = false;
  function ganchos() {
    const b = MC.banco, salvar0 = b.salvar.bind(b), apagar0 = b.apagar.bind(b), kvSet0 = b.kvSet.bind(b);
    b._salvar0 = salvar0; b._kvSet0 = kvSet0;
    b.salvar = async (c) => { const r = await salvar0(c); if (!aplicando && !(MC.online && MC.online.ligado())) marcar('conversa', c.id); return r; };
    b.apagar = async (id) => { const r = await apagar0(id); if (!aplicando && !(MC.online && MC.online.ligado())) marcar('conversa', id); return r; };
    b.kvSet = async (k, v) => { const r = await kvSet0(k, v); if (!aplicando && k === 'memoria') marcar('memoria', 'memoria'); return r; };
    const set0 = MC.pref.set;
    MC.pref.set = (k, v) => { set0(k, v); if (!aplicando && !PREF_LOCAL.test(k)) marcarPrefs(); };
  }
  let tPrefs = null;
  function marcarPrefs() { clearTimeout(tPrefs); tPrefs = setTimeout(() => marcar('prefs', 'prefs'), 800); }
  function prefsViajam() {
    const o = {};
    for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && k.startsWith('meuchat:')) { const n = k.slice(8); if (!PREF_LOCAL.test(n)) o[n] = localStorage.getItem(k); } }
    return o;
  }
  const semFotos = (c) => Object.assign({}, c, { nMsgs: (c.msgs || []).length, msgs: (c.msgs || []).map((m) => (m.fotos && m.fotos.length ? Object.assign({}, m, { fotos: [], fotosNoAparelho: m.fotos.length }) : m)) });

  async function linha(chave) {
    const [tipo, id] = chave.split(/:(.*)/s); const quando = mod()[chave] || Date.now();
    if (tipo === 'conversa') { const c = await (MC.bancoLocal || MC.banco).pegar(id); return { tipo, id, dados: c ? semFotos(c) : null, apagado: !c, atualizado: quando }; }
    if (tipo === 'memoria') return { tipo, id, dados: { texto: await MC.banco.kv('memoria', '') }, apagado: false, atualizado: quando };
    if (tipo === 'prefs') return { tipo, id, dados: prefsViajam(), apagado: false, atualizado: quando };
    if (tipo === 'codigo') { const m = (await MC.banco.kv('codigos', {})) || {}; return { tipo, id, dados: m[id] || null, apagado: !m[id], atualizado: quando }; }
    return null;
  }

  // ⬆ sobe o que mudou
  let subindo = false;
  async function subir(tudo) {
    if (!logado() || subindo) return 0;
    subindo = true;
    try {
      const s = ehNeon() ? { uid: '' } : await token();
      let chaves = [...sujos];
      if (tudo) { chaves = (await (MC.bancoLocal || MC.banco).todas()).map((c) => 'conversa:' + c.id).concat(['memoria:memoria', 'prefs:prefs'], Object.keys((await MC.banco.kv('codigos', {})) || {}).map((id) => 'codigo:' + id)); const m = mod(); chaves.forEach((k) => { if (!m[k]) m[k] = horaUnica(); }); MC.pref.set(K.mod, m); }
      let n = 0;
      for (let i = 0; i < chaves.length; i += 20) {
        const lote = (await Promise.all(chaves.slice(i, i + 20).map(linha))).filter(Boolean).map((l) => Object.assign({ user_id: s.uid }, l));
        if (!lote.length) continue;
        if (ehNeon()) await NuvemNeon.upsert(neonConn(), lote);
        else await rest('POST', TABELA + '?on_conflict=user_id,tipo,id', lote, 'resolution=merge-duplicates,return=minimal');
        lote.forEach((l) => sujos.delete(l.tipo + ':' + l.id)); n += lote.length;
      }
      status('✅ Nuvem em dia · ' + new Date().toLocaleTimeString('pt-BR'));
      return n;
    } finally { subindo = false; }
  }

  // ⬇ traz o que mudou em outro aparelho
  async function descer() {
    if (!logado()) return 0;
    let desde = MC.pref.get(K.ultimo, 0), n = 0, mudouConv = false, maior = desde;
    const primeira = !desde; // aparelho novo na conta: o que está na nuvem vale (o que só existe aqui sobe depois)
    for (let volta = 0; volta < 40; volta++) {
      const l = ehNeon() ? await NuvemNeon.listar(neonConn(), { desde, depoisTipo: MC.pref.get('nuvem:ultTipo', ''), depoisId: MC.pref.get('nuvem:ultId', ''), limite: 200 }) : await rest('GET', TABELA + '?select=tipo,id,dados,apagado,atualizado&tipo=not.like.jur:*' + (MC.online && MC.online.ligado() ? '&tipo=neq.conversa' : '') + '&atualizado=gt.' + desde + '&order=atualizado.asc&limit=200');
      if (!l || !l.length) break;
      aplicando = true;
      try {
        for (const r of l) {
          const chave = r.tipo + ':' + r.id; const m = mod();
          if (!primeira && (m[chave] || 0) >= r.atualizado) continue; // a daqui é mais nova (ou é a mesma)
          if (r.tipo === 'conversa') {
            if (r.apagado || !r.dados) await (MC.bancoLocal || MC.banco).apagar(r.id);
            else {
              const local = await (MC.bancoLocal || MC.banco).pegar(r.id); const d = r.dados;
              if (local) { const fotos = new Map((local.msgs || []).filter((x) => x.fotos && x.fotos.length).map((x) => [x.quando, x.fotos])); d.msgs = (d.msgs || []).map((x) => (x.fotosNoAparelho && fotos.has(x.quando) ? Object.assign({}, x, { fotos: fotos.get(x.quando) }) : x)); }
              await (MC.bancoLocal || MC.banco).salvar(d);
            }
            mudouConv = true;
          } else if (r.tipo === 'memoria') { await MC.banco.kvSet('memoria', (r.dados && r.dados.texto) || ''); MC.emit('memoria'); }
          else if (r.tipo === 'codigo') { const cm = (await MC.banco.kv('codigos', {})) || {}; if (r.apagado || !r.dados) delete cm[r.id]; else cm[r.id] = r.dados; await MC.banco._kvSet0('codigos', cm); MC.emit('codigos'); }
          else if (r.tipo === 'prefs') { for (const [k, v] of Object.entries(r.dados || {})) if (!PREF_LOCAL.test(k)) try { localStorage.setItem('meuchat:' + k, v); } catch (e) {} MC.emit('contextos'); }
          m[chave] = r.atualizado; MC.pref.set(K.mod, m); n++;
        }
      } finally { aplicando = false; }
      maior = l[l.length - 1].atualizado; desde = maior; MC.pref.set(K.ultimo, maior); MC.pref.set('nuvem:ultTipo', l[l.length - 1].tipo); MC.pref.set('nuvem:ultId', l[l.length - 1].id);
      if (l.length < 200) break;
    }
    if (mudouConv) { MC.emit('nuvem-conversas'); try { if (MC.chat && MC.chat.recarregar) await MC.chat.recarregar(); if (MC.chat && MC.chat.pintar) MC.chat.pintar(); } catch (e) {} }
    return n;
  }

  async function sincronizar(tudo) {
    if (!logado()) throw new Error('Entre na sua conta da nuvem primeiro.');
    status('⏳ Sincronizando…');
    const desceu = await descer(); const subiu = await subir(tudo);
    status('✅ Nuvem em dia · ⬇ ' + desceu + ' · ⬆ ' + subiu + ' · ' + new Date().toLocaleTimeString('pt-BR'));
    return { desceu, subiu };
  }

  // 🔐 chaves trancadas (opcional)
  async function mandarChaves() {
    const s1 = prompt('Crie (ou repita) a SENHA DO COFRE para trancar as chaves antes de irem para a nuvem.\nAnote: sem ela, ninguém (nem você) abre as chaves.'); if (!s1) return;
    const s2 = prompt('Repita a senha do cofre:'); if (s2 !== s1) throw new Error('As senhas não são iguais.');
    const linhaC = { tipo: 'cofre', id: 'chaves', dados: { selado: await MC.cofre.selarTexto(s1) }, apagado: false, atualizado: Date.now() };
    if (ehNeon()) await NuvemNeon.upsert(neonConn(), [linhaC]);
    else { const s = await token(); await rest('POST', TABELA + '?on_conflict=user_id,tipo,id', [Object.assign({ user_id: s.uid }, linhaC)], 'resolution=merge-duplicates,return=minimal'); }
    status('🔐 Chaves trancadas guardadas na nuvem.');
  }
  async function trazerChaves() {
    const l = ehNeon() ? await NuvemNeon.listar(neonConn(), { tipo: 'cofre', id: 'chaves' }) : await rest('GET', TABELA + '?select=dados&tipo=eq.cofre&id=eq.chaves&limit=1');
    if (!l || !l.length || !l[0].dados) throw new Error('Ainda não tem chaves guardadas na nuvem (mande de um aparelho que já tem).');
    const senha = prompt('Senha do cofre:'); if (senha == null) return;
    await MC.cofre.trazerTexto(l[0].dados.selado, senha);
  }

  // 🔑 17/11: entrar (tela de login ou ⚙️) — e as CHAVES vão junto, trancadas com a MESMA senha do login
  async function entrar(email, senha, criar) {
    email = String(email || '').trim();
    if (!email || !senha) throw new Error('Escreva o e-mail e a senha.');
    const j = criar ? await auth('signup', { email, password: senha }) : await auth('token?grant_type=password', { email, password: senha });
    if (!guardarSessao(j)) return { confirmar: true };
    MC.pref.set('nuvem:tipo', 'supabase'); MC.pref.set(K.ultimo, 0); MC.pref.set('nuvem:ultTipo', ''); MC.pref.set('nuvem:ultId', '');
    let chaves = '';
    if (MC.pref.get('chavesNoLogin', true)) { try { chaves = await chavesComLogin(senha); } catch (e) { chaves = '⚠ chaves: ' + e.message; } }
    return { ok: true, chaves };
  }
  async function esqueci(email) { email = String(email || '').trim(); if (!email) throw new Error('Escreva o seu e-mail primeiro.'); await auth('recover', { email }); }
  // traz as chaves da nuvem (se tiver) e guarda de volta a soma das daqui + das de lá, trancada com a senha do login
  async function chavesComLogin(senha) {
    let trouxe = false;
    const l = await rest('GET', TABELA + '?select=dados&tipo=eq.cofre&id=eq.chaves&limit=1');
    if (l && l.length && l[0].dados && l[0].dados.selado) {
      try { await MC.cofre.trazerTexto(l[0].dados.selado, senha); trouxe = true; }
      catch (e) { return 'As chaves da nuvem estão trancadas com OUTRA senha (a antiga do cofre). Para trazer: ⚙️ → ☁️ Nuvem → 🔐 Trazer as chaves.'; }
    }
    const c = await MC.cofre.conteudo();
    if (CofreArquivo.contar(c) === 'nenhuma') return trouxe ? 'Chaves trazidas da nuvem.' : '';
    const s = await token();
    await rest('POST', TABELA + '?on_conflict=user_id,tipo,id', [{ user_id: s.uid, tipo: 'cofre', id: 'chaves', dados: { selado: await MC.cofre.selarTexto(senha), comLogin: true }, apagado: false, atualizado: Date.now() }], 'resolution=merge-duplicates,return=minimal');
    return trouxe ? '🔐 Chaves trazidas da nuvem e guardadas de novo (com as daqui).' : '🔐 Chaves deste aparelho guardadas na nuvem, trancadas com a sua senha.';
  }

  // ── tela (⚙️ → ☁️ Nuvem) ──
  let msg = '';
  function status(t) { msg = t; const el = MC.$('#nuvem-status'); if (el) el.textContent = t; const ch = MC.$('#chip-nuvem'); if (ch) ch.title = t; }
  function aviso(e) { status('⚠ ' + (e && e.message || e)); }
  function pintar() {
    const el = MC.$('#cartao-nuvem'); if (!el) return;
    const c = cfg(), s = sessao();
    const escolha = '<div style="margin:6px 0"><label class="pequeno" style="display:block"><input type="radio" name="nv-tipo" value="neon"' + (ehNeon() ? ' checked' : '') + '> 🐘 <b>Neon</b> — só você: cole o endereço e pronto (o app cria a tabela)</label>' +
      '<label class="pequeno" style="display:block"><input type="radio" name="nv-tipo" value="supabase"' + (ehNeon() ? '' : ' checked') + '> ☁️ <b>Supabase</b> — com login (vários aparelhos e, no futuro, clientes)</label></div>';
    if (ehNeon()) {
      el.innerHTML = '<h3>🐘 Nuvem pelo Neon — conversas em qualquer aparelho</h3>' + escolha +
        '<p class="mudo pequeno">O mesmo Neon do SK Jurídico HTML. Vão: conversas (sem as fotos), memória, configurações e contextos. As chaves de IA não vão (só trancadas, se você mandar).</p>' +
        (logado() ? '<p>✅ Conectado ao Neon.</p><label class="pequeno" style="display:block"><input type="checkbox" id="nv-ligada"' + (MC.pref.get(K.ligada, true) ? ' checked' : '') + '> Sincronizar sozinho</label>' +
          '<div class="linha"><button class="bt primario" id="nv-sinc">🔄 Sincronizar agora</button><button class="bt" id="nv-tudo">⬆ Mandar tudo deste aparelho</button><button class="bt" id="nv-trazer" title="Começa do zero e traz TUDO que está na nuvem para este aparelho (junta, não apaga)">⬇ Trazer TUDO da nuvem</button></div>' +
          '<div class="linha"><button class="bt" id="nv-chaves-up">🔐 Guardar as chaves trancadas</button><button class="bt" id="nv-chaves-down">🔐 Trazer as chaves</button><button class="bt" id="nv-neon-sair">🚪 Desconectar</button></div>'
        : '<ol class="pequeno"><li>Entre no <b>neon.tech</b> (a conta que você já tem) e abra o projeto.</li><li>Toque em <b>Connect</b>.</li><li>Copie o endereço que começa com <b>postgresql://</b> (toque no 👁 "show password" antes, para vir com a senha).</li><li>Cole aqui e toque em <b>🔌 Conectar</b>: o app cria a tabela sozinho.</li></ol>' +
          '<input class="campo" id="nv-neon" type="password" placeholder="postgresql://usuario:senha@ep-xxxx.neon.tech/neondb?sslmode=require" autocomplete="off">' +
          '<p class="mudo pequeno">⚠ Esse endereço tem a senha do banco: fica só neste aparelho. No outro aparelho, cole o mesmo.</p>' +
          '<div class="linha"><button class="bt primario" id="nv-neon-ligar">🔌 Conectar</button></div>') +
        '<p id="nuvem-status" class="pequeno">' + E(msg) + '</p>';
      cliques(el);
      return;
    }
    el.innerHTML = '<h3>☁️ Nuvem (Supabase) — conversas em qualquer aparelho</h3>' + escolha +
      '<p class="mudo pequeno">Sem nuvem, tudo fica só neste aparelho. Com ela, entre com o mesmo e-mail no celular e no PC: as conversas, a memória e as configurações vão junto. As fotos ficam no aparelho. As chaves de IA <b>não</b> vão (só trancadas, se você mandar).</p>' +
      (s ? '<p>✅ Conectado como <b>' + E(s.email) + '</b></p>' +
        '<label class="pequeno" style="display:block"><input type="checkbox" id="nv-ligada"' + (MC.pref.get(K.ligada, true) ? ' checked' : '') + '> Sincronizar sozinho (ao abrir e quando você muda algo — sem ficar baixando tudo)</label>' +
        '<div class="linha"><button class="bt primario" id="nv-sinc">🔄 Sincronizar agora</button><button class="bt" id="nv-tudo">⬆ Mandar tudo deste aparelho</button><button class="bt" id="nv-trazer" title="Começa do zero e traz TUDO que está na nuvem para este aparelho (junta, não apaga)">⬇ Trazer TUDO da nuvem</button></div>' +
        '<div class="linha"><button class="bt" id="nv-chaves-up">🔐 Guardar as chaves trancadas</button><button class="bt" id="nv-chaves-down">🔐 Trazer as chaves</button></div>' +
        '<label class="pequeno" style="display:block;margin-top:8px"><input type="checkbox" id="nv-online"' + (MC.pref.get('online', true) ? ' checked' : '') + '> ☁️ <b>Modo online (igual à Replit)</b>: as conversas ficam SÓ na nuvem; o aparelho não enche e não precisa enviar e puxar.</label>' +
        '<div class="linha"><button class="bt" id="nv-liberar">🧹 Liberar espaço do aparelho</button><span class="mudo pequeno" id="nv-ocupa"></span></div>' +
        '<div class="linha"><button class="bt" id="nv-sair">🚪 Sair da conta</button></div>'
      : (temEmb() ? '<p class="pequeno">✅ O Supabase <b>já vem configurado dentro do app</b>: é só o seu e-mail e a sua senha.</p>' : '<details' + (c.url ? '' : ' open') + '><summary class="pequeno"><b>1ª vez: criar o seu Supabase (grátis, 5 minutos)</b></summary><ol class="pequeno">' +
          '<li>Entre em <b>supabase.com</b> → Start your project → entre com o GitHub ou e-mail.</li>' +
          '<li><b>New project</b>: dê um nome (ex.: meu-chat), crie uma senha do banco (anote) e escolha a região <b>São Paulo</b>.</li>' +
          '<li>Quando abrir: <b>SQL Editor</b> → New query → toque em <b>📋 Copiar o SQL</b> aqui embaixo → cole lá → <b>Run</b>.</li>' +
          '<li><b>Project Settings → API</b> (ou "Connect"): copie a <b>Project URL</b> e a chave <b>anon public</b> e cole nos campos abaixo.</li>' +
          '<li>Toque em <b>Criar conta</b> com o seu e-mail e uma senha. Se pedir, confirme no e-mail e depois toque em <b>Entrar</b>.</li></ol>' +
          '<div class="linha"><button class="bt" id="nv-sql">📋 Copiar o SQL</button></div></details>' +
        '<input class="campo" id="nv-url" placeholder="Project URL (https://xxxx.supabase.co)" value="' + E(c.url) + '" autocomplete="off">' +
        '<input class="campo" id="nv-anon" placeholder="Chave anon public (começa com eyJ… ou sb_publishable_…)" value="' + E(c.anon) + '" autocomplete="off">') +
        '<input class="campo" id="nv-email" type="email" placeholder="Seu e-mail" autocomplete="username">' +
        '<input class="campo" id="nv-senha" type="password" placeholder="Senha (mínimo 6)" autocomplete="current-password">' +
        '<div class="linha"><button class="bt primario" id="nv-entrar">🔑 Entrar</button><button class="bt" id="nv-criar">✨ Criar conta</button></div>') +
      '<p id="nuvem-status" class="pequeno">' + E(msg) + '</p>';
    cliques(el);
  }
  function cliques(el) {
    el.onchange = (e) => { if (e.target.name === 'nv-tipo') { MC.pref.set('nuvem:tipo', e.target.value); MC.pref.set(K.ultimo, 0); MC.pref.set('nuvem:ultTipo', ''); MC.pref.set('nuvem:ultId', ''); pintar(); } };
    el.onclick = async (e) => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.id === 'nv-neon-ligar') { try { const c = MC.$('#nv-neon').value.trim(); status('⏳ Conectando e criando a tabela…'); await NuvemNeon.preparar(c); MC.pref.set('nuvem:neon', c); MC.pref.set('nuvem:neonOk', true); MC.pref.set(K.ultimo, 0); MC.pref.set('nuvem:ultTipo', ''); MC.pref.set('nuvem:ultId', ''); pintar(); await sincronizar(true); } catch (err) { aviso(err); } return; }
      if (b.id === 'nv-neon-sair') { MC.pref.set('nuvem:neonOk', false); MC.pref.set('nuvem:neon', ''); pintar(); status('Desconectado do Neon. Tudo continua neste aparelho.'); return; }
      const salvarCampos = () => { if (!MC.$('#nv-url')) return; MC.pref.set(K.url, MC.$('#nv-url').value.trim()); MC.pref.set(K.anon, MC.$('#nv-anon').value.trim()); };
      try {
        if (b.id === 'nv-sql') { await MC.copiar(SQL); status('📋 SQL copiado. Cole no Supabase: SQL Editor → New query → Run.'); }
        if (b.id === 'nv-entrar' || b.id === 'nv-criar') {
          salvarCampos();
          status('⏳ ' + (b.id === 'nv-criar' ? 'Criando a conta…' : 'Entrando…'));
          const r = await entrar(MC.$('#nv-email').value, MC.$('#nv-senha').value, b.id === 'nv-criar');
          if (r.confirmar) { status('📧 Conta criada. Abra o e-mail que o Supabase mandou, toque no link de confirmação e depois toque em 🔑 Entrar.'); return; }
          pintar(); status('✅ Entrou. Sincronizando…'); await sincronizar(true); if (r.chaves) MC.aviso(r.chaves, 'ok');
        }
        if (b.id === 'nv-sinc') await sincronizar();
        if (b.id === 'nv-trazer') { status('⏳ Trazendo tudo da nuvem…'); MC.pref.set(K.ultimo, 0); MC.pref.set('nuvem:ultTipo', ''); MC.pref.set('nuvem:ultId', ''); const r = await descer(); status('✅ Trouxe ' + r + ' item(ns) da nuvem.' + (r ? '' : ' (A nuvem está vazia para este app, ou é outro banco/conta.)')); }
        if (b.id === 'nv-tudo') { status('⏳ Mandando tudo…'); const n = await subir(true); status('✅ Mandei ' + n + ' item(ns).'); }
        if (b.id === 'nv-chaves-up') await mandarChaves();
        if (b.id === 'nv-chaves-down') await trazerChaves();
        if (b.id === 'nv-liberar') { await MC.online.liberar(); const o = MC.$('#nv-ocupa'); if (o) o.textContent = 'Este app ocupa ' + (await MC.online.ocupa()) + ' no aparelho'; }
        if (b.id === 'nv-sair') { MC.pref.set(K.sessao, null); MC.pref.set(K.ultimo, 0); MC.pref.set('nuvem:ultTipo', ''); MC.pref.set('nuvem:ultId', ''); pintar(); status('Saiu da conta. As conversas continuam neste aparelho.'); }
      } catch (err) { aviso(err); }
    };
    const lg = MC.$('#nv-ligada', el); if (lg) lg.onchange = () => MC.pref.set(K.ligada, lg.checked);
    const on = MC.$('#nv-online', el); if (on) on.onchange = () => { MC.pref.set('online', on.checked); MC.aviso(on.checked ? '☁️ Modo online ligado: as conversas vêm direto da nuvem.' : 'Modo online desligado: as conversas voltam a ficar no aparelho.'); if (MC.chat && MC.chat.recarregar) MC.chat.recarregar(); };
    const oc = MC.$('#nv-ocupa', el); if (oc && MC.online) MC.online.ocupa().then((t) => { oc.textContent = 'Este app ocupa ' + t + ' no aparelho'; });
  }

  document.addEventListener('DOMContentLoaded', () => {
    ganchos();
    // 19/11: ANTES sincronizava A CADA MINUTO com o app aberto — isso deixava o "motor" do Neon ligado o tempo todo
    // e estourou a cota. AGORA: só ao abrir, ao voltar para o app (no máximo 1 vez a cada 10 min) e,
    // quando você muda algo, sobe SÓ aquele item. Nada de baixar tudo de novo.
    const auto = () => { if (!ligada()) return; const k = 'mc-nuvem-ult-auto', agora = Date.now(); let u = 0; try { u = +localStorage.getItem(k) || 0; } catch (e) {} if (agora - u < 10 * 60000) return; try { localStorage.setItem(k, String(agora)); } catch (e) {} sincronizar().catch(aviso); };
    setTimeout(auto, 1500);
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') auto(); });
  });
  MC.nuvem = { rest, config: cfg, salvarConfig: (u, a) => { MC.pref.set(K.url, String(u || '').trim()); MC.pref.set(K.anon, String(a || '').trim()); }, pintar, sincronizar, subir, descer, logado, SQL, entrar, esqueci, temEmb, sessao, ehNeon, marcar: (t, id) => marcar(t, id) };
})(window.MC);
