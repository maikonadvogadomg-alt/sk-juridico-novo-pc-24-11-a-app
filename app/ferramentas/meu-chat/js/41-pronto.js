/* Meu Chat — 41-pronto.js · 🔔 AVISO DE "RESPOSTA PRONTA" (18/11)
   Para o Ollama (ou qualquer IA lenta): você manda a pergunta, vai mexer em outra coisa,
   e quando a resposta termina o celular/PC APITA, VIBRA e mostra uma NOTIFICAÇÃO.
   🔆 "Tela acesa": enquanto ela escreve, o aparelho não apaga a tela (assim o Android
   não pausa o app no meio). Funciona no PWA, no APK e no PC (Chrome/Edge).
   Limite honesto: se você FECHAR o app (arrastar para fora), ele para. Deixe aberto atrás. */
(function (MC) {
  'use strict';
  let trava = null;
  const ligado = () => !!MC.pref.get('avisoPronta', false);
  const telaAcesa = () => !!MC.pref.get('telaAcesa', false);
  async function pedirPermissao() {
    if (!('Notification' in window)) { MC.aviso('Este aparelho não deixa mostrar notificação aqui. Vou só apitar e vibrar.'); return false; }
    if (Notification.permission === 'granted') return true;
    if (Notification.permission === 'denied') { MC.aviso('As notificações estão bloqueadas para este app. Libere nas configurações do aparelho (Notificações → Meu Chat). Vou só apitar e vibrar.', 'erro'); return false; }
    return (await Notification.requestPermission()) === 'granted';
  }
  function apito() {
    try {
      const A = window.AudioContext || window.webkitAudioContext; if (!A) return;
      const c = new A(), t = c.currentTime;
      [880, 1175].forEach((f, i) => { const o = c.createOscillator(), g = c.createGain(); o.frequency.value = f; o.connect(g); g.connect(c.destination); g.gain.setValueAtTime(0.0001, t + i * 0.22); g.gain.exponentialRampToValueAtTime(0.3, t + i * 0.22 + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.22 + 0.2); o.start(t + i * 0.22); o.stop(t + i * 0.22 + 0.22); });
      setTimeout(() => c.close(), 800);
    } catch (e) {}
  }
  // começou a esperar
  async function comecou() {
    if (!telaAcesa() || !('wakeLock' in navigator)) return;
    try { trava = await navigator.wakeLock.request('screen'); } catch (e) { trava = null; }
  }
  // terminou (ok = respondeu; senão deu erro)
  async function terminou(texto, ok) {
    if (trava) { try { await trava.release(); } catch (e) {} trava = null; }
    if (!ligado()) return;
    const longe = document.hidden || !document.hasFocus();
    apito(); try { navigator.vibrate && navigator.vibrate([200, 100, 200]); } catch (e) {}
    if (!longe) return;
    const titulo = ok ? '💬 Meu Chat: resposta pronta' : '⚠ Meu Chat: deu erro';
    const corpo = String(texto || '').replace(/[#*`>_]/g, '').replace(/\s+/g, ' ').slice(0, 140);
    try {
      if ('Notification' in window && Notification.permission === 'granted') {
        const reg = navigator.serviceWorker && await navigator.serviceWorker.getRegistration();
        if (reg && reg.showNotification) await reg.showNotification(titulo, { body: corpo, tag: 'meuchat-pronta', renotify: true, icon: 'icons/icon-192.png', badge: 'icons/icon-192.png', vibrate: [200, 100, 200] });
        else new Notification(titulo, { body: corpo, icon: 'icons/icon-192.png' });
      }
    } catch (e) {}
  }
  // a trava da tela cai sozinha quando o app sai da frente; volta quando ele volta (se ainda estiver esperando)
  document.addEventListener('visibilitychange', () => { if (!document.hidden && MC.chat && MC.chat.esperando && MC.chat.esperando()) comecou(); });
  document.addEventListener('DOMContentLoaded', () => {
    const a = MC.$('#op-pronta'), t = MC.$('#op-tela');
    if (a) { a.checked = ligado(); a.onchange = async () => { MC.pref.set('avisoPronta', a.checked); if (a.checked) { const ok = await pedirPermissao(); MC.aviso(ok ? '🔔 Combinado: quando a resposta terminar, eu apito, vibro e mostro uma notificação. Deixe o app aberto atrás.' : '🔔 Vou apitar e vibrar quando terminar.', 'ok'); } }; }
    if (t) { t.checked = telaAcesa(); t.onchange = () => { MC.pref.set('telaAcesa', t.checked); MC.aviso(t.checked ? '🔆 Enquanto ela escreve, a tela fica acesa (o Android não pausa o app).' : '🔆 Tela volta ao normal.'); }; }
  });
  MC.pronto = { comecou, terminou, pedirPermissao };
})(window.MC);
