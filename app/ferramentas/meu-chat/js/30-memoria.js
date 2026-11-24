/* Meu Chat — 30-memoria.js: 🧠 a memória que vai junto em TODA conversa.
   A IA guarda sozinha o que for importante escrevendo [[lembrar: …]] no fim da resposta
   (o app tira isso do texto, guarda e mostra "🧠 guardei"). [[esquecer: …]] apaga. */
(function (MC) {
  'use strict';
  async function texto() { return (await MC.banco.kv('memoria', '')) || ''; }
  async function salvar(t) { await MC.banco.kvSet('memoria', String(t || '').trim()); MC.emit('memoria'); }
  async function lembrar(linha) {
    linha = String(linha || '').trim(); if (!linha) return false;
    const atual = await texto(); const linhas = atual.split('\n').map((x) => x.trim()).filter(Boolean);
    if (linhas.some((x) => x.toLowerCase() === linha.toLowerCase())) return false;
    linhas.push(linha); await salvar(linhas.join('\n')); return true;
  }
  async function esquecer(trecho) {
    trecho = String(trecho || '').trim().toLowerCase(); if (!trecho) return 0;
    const linhas = (await texto()).split('\n').filter(Boolean); const fica = linhas.filter((x) => !x.toLowerCase().includes(trecho));
    await salvar(fica.join('\n')); return linhas.length - fica.length;
  }
  // tira as marcas da resposta e aplica
  async function aplicarMarcas(resposta) {
    const guardei = [], esqueci = [];
    let limpo = resposta.replace(/\[\[\s*lembrar\s*:\s*([\s\S]*?)\]\]/gi, (m, t) => { guardei.push(t.trim()); return ''; })
      .replace(/\[\[\s*esquecer\s*:\s*([\s\S]*?)\]\]/gi, (m, t) => { esqueci.push(t.trim()); return ''; }).trim();
    const feitos = [];
    for (const g of guardei) if (await lembrar(g)) feitos.push('🧠 guardei: ' + g);
    for (const e of esqueci) { const n = await esquecer(e); if (n) feitos.push('🧠 esqueci: ' + e); }
    return { limpo, feitos };
  }
  const SOBRE_APPS = /(app|aplicativ|ferrament|vers[aã]o|laborat|mini ?sk|jur[ií]dic|colecionador|colador|ca[çc]a.?bug|termux|terminal|instal|guia|como (eu )?(uso|fa[çc]o|abro|ligo)|bot[aã]o|aba\b|meu chat|code studio|faxina|ollama|francisco|apk|\.exe|zip)/i;
  function guiaParaPergunta(pergunta) {
    if (!window.GuiaMaikon || !MC.pref.get('saberFerramentas', true) || MC.pref.get('chaveAtiva', '') === 'ollama') return '';
    if (MC.pref.get('guiaLigado', false) || SOBRE_APPS.test(pergunta || '')) return GuiaMaikon.texto;
    return 'GUIA: o usuário tem vários apps próprios (Meu Chat, SK Jurídico, Mini SK, Laboratório, Laboratório 2, Caça-Bug, Colecionador, Colador). Se ele perguntar de algum, o guia completo vem junto na próxima pergunta.';
  }
  function tamanhoTexto() {
    const t = MC.pref.get('tamanho', 'normal');
    return {
      curto: 'TAMANHO: responda CURTO (poucas frases), a não ser que ele peça mais.',
      normal: '',
      longo: 'TAMANHO: pode responder LONGO e completo quando o assunto pedir. Não corte a resposta no meio.',
      codigo: 'TAMANHO: modo CÓDIGO. Quando pedirem código, escreva o arquivo INTEIRO e completo, mesmo que seja grande. Nunca resuma nem deixe "o resto igual".',
    }[t] || '';
  }
  async function sistema(extra, provForcado, pergunta) {
    const mem = await texto();
    const instr = MC.pref.get('instrucoes', '');
    let prov = provForcado || ''; if (!prov) try { const l = await MC.ia.chaves(); const a = l.find((c) => c.id === MC.pref.get('chaveAtiva', '')) || l[0]; prov = a ? a.provedor : ''; } catch {}
    const hoje = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    return [
      'Você é a assistente pessoal do usuário, no app "Meu Chat". Responda sempre em português do Brasil, simples e direto.',
      'Hoje é ' + hoje + '.',
      // 🎭 o jeito de conversar (todas as IAs + o desta IA)
      MC.jeito ? MC.jeito.texto(prov) : '',
      'MEMÓRIA: abaixo está o que você sabe do usuário. Use quando ajudar, sem ficar repetindo.',
      'Quando o usuário disser algo que vale lembrar para sempre (quem ele é, preferências, projetos, decisões) ou pedir "lembra disso", escreva NO FIM da resposta, numa linha só: [[lembrar: o fato, curto]]. Para apagar algo da memória quando ele pedir: [[esquecer: palavra do fato]]. Não use isso para coisas passageiras.',
      'CÓDIGO: quando escrever código, mande o arquivo INTEIRO (nunca "troque o pedaço X"), num bloco com a linguagem: ```html, ```jsx, ```tsx, ```css, ```js, ```python. Uma página que funciona sozinha vai em um ```html só (CSS e JS dentro). Componente React vai em ```tsx ou ```jsx com "export default".',
      // 🧭 o guia das ferramentas dele (não vai para o Ollama do celular: pesado demais)
      // 17/11: o guia inteiro (~8 mil "pedaços" de texto) ia em TODA mensagem e estourava o limite grátis rápido.
      // Agora: só vai inteiro quando a pergunta é sobre os apps dele; nas outras, vai só um resumo de 1 linha.
      guiaParaPergunta(pergunta),
      tamanhoTexto(),
      instr ? 'INSTRUÇÕES DO USUÁRIO:\n' + instr : '',
      '--- MEMÓRIA DO USUÁRIO ---\n' + (mem || '(vazia por enquanto)'),
      // 📌 os contextos que ele ligou (assuntos em andamento)
      MC.contextos ? MC.contextos.texto() : '',
      extra || '',
    ].filter(Boolean).join('\n\n');
  }
  // painel
  async function abrir() { MC.$('#memoria-texto').value = await texto(); MC.$('#mem-status').textContent = ''; MC.abrirPainel('painel-memoria'); }
  document.addEventListener('DOMContentLoaded', () => {
    MC.$('#bt-memoria').onclick = abrir;
    MC.$('#bt-mem-salvar').onclick = async () => { await salvar(MC.$('#memoria-texto').value); MC.$('#mem-status').textContent = '✅ salva ' + new Date().toLocaleTimeString('pt-BR'); };
  });
  MC.memoria = { texto, salvar, lembrar, esquecer, aplicarMarcas, sistema, abrir };
})(window.MC);
