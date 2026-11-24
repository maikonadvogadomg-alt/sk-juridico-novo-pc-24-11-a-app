/* 🗣 voz.cjs — a voz Francisco GRÁTIS, já DENTRO do programa do PC (não precisa de Python).
   Liga sozinha junto com o programa, em http://127.0.0.1:7790 — o mesmo endereço do voz-francisco.py,
   então os apps (Meu Chat, Assistente Jurídico…) usam igualzinho: ⚙️ → Voz → 🗣 Francisco.
   Usa a voz do Microsoft Edge (pacote msedge-tts). Precisa de internet. Só aceita pedidos deste PC.
   Se a porta 7790 já estiver ocupada (o voz-francisco.py aberto, ou outro programa seu), não faz nada. */
'use strict';
const http = require('http');

const PORTA = 7790;
const VOZ_PADRAO = 'pt-BR-FranciscoNeural';
const RESERVAS = ['pt-BR-AntonioNeural', 'pt-BR-FranciscaNeural', 'pt-BR-ThalitaNeural'];
let log = () => {};

async function umAudio(texto, voz, velocidade, tom) {
  const mod = await import('msedge-tts');
  const tts = new mod.MsEdgeTTS();
  await tts.setMetadata(voz, mod.OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
  let out;
  try { out = tts.toStream(texto, { rate: velocidade, pitch: tom }); } catch { out = tts.toStream(texto); }
  if (out && typeof out.then === 'function') out = await out;
  const stream = out && out.audioStream ? out.audioStream : out;
  const buf = await new Promise((ok, erro) => {
    const partes = []; const t = setTimeout(() => erro(new Error('tempo esgotado')), 60000);
    stream.on('data', (c) => partes.push(Buffer.from(c)));
    stream.on('end', () => { clearTimeout(t); ok(Buffer.concat(partes)); });
    stream.on('close', () => { clearTimeout(t); ok(Buffer.concat(partes)); });
    stream.on('error', (e) => { clearTimeout(t); erro(e); });
  });
  try { tts.close && tts.close(); } catch {}
  if (buf.length < 100) throw new Error('áudio vazio');
  return buf;
}
async function falar(texto, voz, velocidade, tom) {
  let ultimo;
  for (const v of [voz].concat(RESERVAS.filter((x) => x !== voz))) {
    try { return await umAudio(texto, v, velocidade, tom); } catch (e) { ultimo = e; }
  }
  throw new Error('não consegui gerar a voz: ' + (ultimo && ultimo.message));
}
async function vozes() {
  try {
    const mod = await import('msedge-tts'); const tts = new mod.MsEdgeTTS();
    const l = await tts.getVoices(); return l.map((v) => v.ShortName).filter((n) => /^pt-/.test(n));
  } catch { return [VOZ_PADRAO].concat(RESERVAS); }
}

function cabecalhos(res, codigo, tipo) {
  res.writeHead(codigo, {
    'Content-Type': tipo, 'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Private-Network': 'true',
  });
}
const json = (res, codigo, obj) => { cabecalhos(res, codigo, 'application/json; charset=utf-8'); res.end(JSON.stringify(obj)); };

function ligar(opcoes) {
  log = (opcoes && opcoes.log) || log;
  return new Promise((pronto) => {
    const srv = http.createServer((req, res) => {
      if (req.method === 'OPTIONS') { cabecalhos(res, 204, 'text/plain'); return res.end(); }
      const u = new URL(req.url, 'http://127.0.0.1');
      let corpo = '';
      req.on('data', (c) => { corpo += c; if (corpo.length > 20000) req.destroy(); });
      req.on('end', async () => {
        const q = Object.fromEntries(u.searchParams);
        try { if (corpo) Object.assign(q, JSON.parse(corpo)); } catch {}
        try {
          if (u.pathname === '/' || u.pathname === '/ping') return json(res, 200, { ok: true, app: 'voz-francisco', versao: 1, voz: VOZ_PADRAO, dentro: true });
          if (u.pathname === '/vozes') return json(res, 200, { vozes: await vozes() });
          if (u.pathname === '/falar') {
            const texto = String(q.texto || '').trim().slice(0, 3000);
            if (!texto) return json(res, 400, { erro: 'sem texto' });
            const audio = await falar(texto, q.voz || VOZ_PADRAO, q.velocidade || '+15%', q.tom || '-5Hz');
            cabecalhos(res, 200, 'audio/mpeg'); return res.end(audio);
          }
          json(res, 404, { erro: 'não existe' });
        } catch (e) { log('voz: ' + e.message); json(res, 500, { erro: e.message }); }
      });
    });
    srv.on('error', (e) => { log('voz: porta ' + PORTA + ' ocupada (' + e.code + ') — uso a que já está ligada'); pronto(false); });
    srv.listen(PORTA, '127.0.0.1', () => { log('voz Francisco ligada em ' + PORTA); pronto(true); });
  });
}
module.exports = { ligar, PORTA };
