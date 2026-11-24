/* =========================================================================
   SK Jurídico HTML — 21-motor.js · ⚙️ O MOTOR DO SEU JURÍDICO (17/11)
   Os textos abaixo vieram PALAVRA POR PALAVRA do servidor do SK Jurídico 1.7.x
   (server/routes/ai.ts: SYSTEM_PROMPT_BASE, ACTION_PROMPTS e os níveis de esforço).
   Agora rodam aqui no aparelho, sem servidor: o texto vai direto para a IA que você escolheu.
   ========================================================================= */
(function (J) {
  'use strict';
  const SISTEMA = "Voce e uma assistente juridica especializada em Direito brasileiro. Produza documentos COMPLETOS, OBJETIVOS, INCISIVOS e PRONTOS PARA USO IMEDIATO. (13/11: regras do Dr. Maikon — nada inventado, no maximo 15 paginas, jurisprudencia so das ementas fornecidas.)\n\nREGRAS ABSOLUTAS:\n1. DOCUMENTO COMPLETO — nunca corte no meio, nunca omita pedido ou fato relevante, mas sem enrolacao. Escreva o documento inteiro do inicio ao fim. O advogado copia e cola direto no Word.\n2. ESTRUTURA OBRIGATORIA para peticoes e minutas: Endereçamento → Qualificação das partes → Dos Fatos (detalhado) → Do Direito (com fundamentacao legal) → Dos Pedidos → Local, data e assinatura.\n3. FUNDAMENTACAO ROBUSTA — cite artigos e numeros de lei e principios que voce tem CERTEZA que existem. NAO cite doutrina, autor, livro, julgado, sumula, tema ou precedente que nao esteja no texto fornecido ou nas EMENTAS DE REFERENCIA (citacao inventada prejudica o advogado e o cliente). Desenvolva cada argumento em paragrafos proprios.\n4. Base-se no texto fornecido. Nao invente fatos sobre o caso. Se faltar dado: [INFORMAR: descricao]. JURISPRUDENCIA: use SOMENTE as EMENTAS DE REFERENCIA fornecidas no prompt. Se vierem varias, escolha as 2 (DUAS) MAIS FORTES para este caso e use so elas na secao DA JURISPRUDENCIA: cite tribunal, numero do processo e data EXATAMENTE como vieram, resuma a ementa e transcreva em destaque o trecho principal. Se NAO houver ementas fornecidas, NAO cite nenhum julgado: escreva [INSERIR JURISPRUDENCIA: tema a pesquisar].\n5. MANTENHA nomes, CPFs, numeros, dados pessoais EXATAMENTE como estao. NAO altere nenhum dado.\n6. TEXTO PURO sem markdown. NAO use asteriscos (*), hashtags (#), tracos (---), nem nenhuma sintaxe markdown. Para titulos, escreva em CAIXA ALTA. Paragrafos separados por linha em branco. Cada paragrafo em uma unica linha continua (sem quebras no meio da frase).\n7. CADA PARAGRAFO maximo 5 linhas. Nunca junte varios argumentos num bloco so. Separe cada ideia em paragrafo proprio.\n8. TAMANHO: peca OBJETIVA e INCISIVA, com NO MAXIMO 15 PAGINAS (cerca de 7.500 palavras). Profundidade nos pontos principais do caso; nada de repeticao ou enchimento. Nunca um rascunho incompleto.\n9. FORMATACAO DO TEXTO:\n   - Titulos e subtitulos: CAIXA ALTA, justificado, sem recuo.\n   - Paragrafos do corpo: justificados, recuo de 4cm na primeira linha, espacamento 1.5.\n   - Citacoes (ementas, artigos, sumulas): recuo 4cm dos dois lados, justificado, fonte 10pt, espacamento simples, italico.\n   - Assinatura do advogado: negrito, CAIXA ALTA, centralizado.\n   - \"Nestes termos, pede deferimento\": alinhado a esquerda, sem recuo.";
  const PROMPTS = {
    "resumir": "Elabore RESUMO ESTRUTURADO do documento com as seguintes secoes, CADA UMA em bloco separado por linha em branco:\n\n1. NATUREZA DA DEMANDA\n[descricao]\n\n2. FATOS PRINCIPAIS\n[datas, nomes, valores]\n\n3. FUNDAMENTOS JURIDICOS\n[bases legais e argumentos]\n\n4. CONCLUSAO E PEDIDO\n[resultado pretendido]\n\nNao omita detalhes. Cada topico deve iniciar em nova linha apos linha em branco.\n\nDOCUMENTO:\n{{textos}}",
    "revisar": "Analise erros gramaticais, concordancia, logica juridica. Sugira melhorias de redacao. Aponte omissoes/contradicoes.\n\nTEXTO:\n{{textos}}",
    "refinar": "Reescreva elevando linguagem para padrao de tribunais superiores. Melhore fluidez e vocabulario juridico.\n\nTEXTO:\n{{textos}}",
    "simplificar": "Traduza para linguagem simples e acessivel, mantendo rigor tecnico. Cliente leigo deve entender.\n\nTEXTO:\n{{textos}}",
    "minuta": "Leia o material e identifique a area e a PECA ADEQUADA ao momento processual (ex.: inicial, contestacao, replica, recurso, manifestacao). Elabore essa PECA COMPLETA, OBJETIVA e INCISIVA, com NO MAXIMO 15 PAGINAS. Use as secoes abaixo (adapte os titulos a peca), focando nos pontos principais:\n\nEXMO(A). SR(A). DR(A). JUIZ(A) DE DIREITO DA ... VARA DE ... DA COMARCA DE ...\n\n[QUALIFICACAO COMPLETA DAS PARTES com todos os dados]\n\nDOS FATOS\n[Narrativa objetiva e cronologica dos fatos que importam]\n\nDO DIREITO\n[Fundamentacao juridica robusta com artigos de lei e principios — sem doutrina ou julgado que nao veio no material]\n\nDA JURISPRUDENCIA\n[SOMENTE as 2 melhores EMENTAS DE REFERENCIA fornecidas; se nao houver, escreva: INSERIR JURISPRUDENCIA: tema a pesquisar]\n\nDOS PEDIDOS\n[Lista numerada de todos os pedidos necessarios ao caso]\n\nDO VALOR DA CAUSA\n[Fundamentacao do valor atribuido]\n\n[Data e assinatura]\n\nATENCAO: no maximo 15 paginas; nada inventado.\n\nINFORMACOES:\n{{textos}}",
    "analisar": "Elabore ANALISE JURIDICA com as seguintes secoes, CADA UMA separada por linha em branco:\n\n1. RISCOS PROCESSUAIS\n[analise dos riscos]\n\n2. TESES FAVORAVEIS E CONTRARIAS\n[argumentos pro e contra]\n\n3. JURISPRUDENCIA APLICAVEL\n[somente das ementas fornecidas; se nao houver, indique o tema a pesquisar — nao invente julgados]\n\n4. PROXIMOS PASSOS\n[recomendacoes de atuacao]\n\nCada secao deve iniciar em nova linha apos linha em branco.\n\nDOCUMENTO:\n{{textos}}",
    "modo-estrito": "Corrija APENAS erros gramaticais e de estilo. Nao altere estrutura ou conteudo.\n\nTEXTO:\n{{textos}}",
    "modo-redacao": "Melhore o texto tornando-o mais profissional e persuasivo, mantendo todos dados e fatos.\n\nTEXTO:\n{{textos}}",
    "modo-interativo": "Identifique lacunas e pontos que precisam complementacao pelo advogado.\n\nTEXTO:\n{{textos}}"
  };
  const ESFORCO = {"1": "ESFORCO: RAPIDO. Direto e objetivo.", "2": "ESFORCO: BASICO. Pontos principais.", "3": "ESFORCO: DETALHADO. Analise completa.", "4": "ESFORCO: PROFUNDO. Fundamentacao robusta, nuances, legislacao.", "5": "ESFORCO: EXAUSTIVO. Todos os angulos e teses (jurisprudencia so das ementas fornecidas)."};

  // botões (na ordem do jurídico) → prompt do motor
  const ACOES = [
    { id: 'minuta', nome: '⚖️ Fazer a peça', dica: 'lê tudo e faz a peça certa (máx. 15 págs.)', motor: 'minuta' },
    { id: 'resumir', nome: '📝 Resumir', dica: 'natureza, fatos, fundamentos, pedido', motor: 'resumir' },
    { id: 'analisar', nome: '🔎 Analisar', dica: 'riscos, teses, próximos passos', motor: 'analisar' },
    { id: 'interativo', nome: '❓ O que falta?', dica: 'lacunas para completar', motor: 'modo-interativo' },
    { id: 'revisar', nome: '✅ Revisar', dica: 'gramática e lógica jurídica', motor: 'revisar' },
    { id: 'refinar', nome: '💪 Refinar', dica: 'padrão de tribunal superior', motor: 'refinar' },
    { id: 'redacao', nome: '✍️ Mais persuasivo', dica: 'mantém dados e fatos', motor: 'modo-redacao' },
    { id: 'estrito', nome: '✏️ Só corrigir', dica: 'não muda o conteúdo', motor: 'modo-estrito' },
    { id: 'simplificar', nome: '🗣️ Linguagem simples', dica: 'para o cliente entender', motor: 'simplificar' },
    { id: 'cliente', nome: '📲 Mensagem ao cliente', dica: 'WhatsApp, curta e gentil', p: 'Com base no texto abaixo, escreva uma mensagem curta, gentil e clara para enviar ao cliente pelo WhatsApp, explicando a situação do processo em linguagem simples, sem jargões e sem prometer resultado.\n\nTEXTO:\n{{textos}}' },
  ];

  /** monta o pedido igual ao servidor fazia (/ai/process) */
  function montar({ acao, texto, pedidoExtra, ementas, historico, esforco, tamanho }) {
    const ef = Math.min(5, Math.max(1, +esforco || 3));
    const verbo = tamanho === 'curta' ? 'TAMANHO: CONCISO. Direto ao ponto.' : 'TAMANHO: COMPLETO. Desenvolva cada argumento.';
    let ementasTxt = '';
    if (ementas && ementas.length) ementasTxt = '\n\nJURISPRUDÊNCIA DE REFERÊNCIA SELECIONADA PELO ADVOGADO:\nUse-as como fundamentação.\n\n' + ementas.map((e, i) => 'EMENTA ' + (i + 1) + ' [' + (e.categoria || e.tribunal || 'geral') + '] - ' + (e.titulo || '') + ':\n' + (e.texto || '')).join('\n\n') + '\n';
    let hist = '';
    if (historico && historico.length) hist = '\n\n--- HISTÓRICO COMPLETO DO ADVOGADO ---\n' + historico.map((h, i) => '[' + (i + 1) + '] Ação: ' + (h.acao || 'consulta') + '\nPergunta: ' + String(h.pergunta || '').slice(0, 1500) + '\nResposta: ' + String(h.md || h.resposta || '').slice(0, 3000)).join('\n\n') + '\n--- FIM DO HISTÓRICO ---\n';
    const perfil = J.pref.get('perfil', {});
    let doAdvogado = '';
    if (perfil.nome) doAdvogado += '\n\nADVOGADO: ' + perfil.nome + (perfil.oab ? ' (OAB ' + perfil.oab + ')' : '') + '.';
    if (perfil.regras) doAdvogado += '\n\nREGRAS DO ESCRITÓRIO (siga sempre):\n' + perfil.regras;
    const minhas = (J.regras && J.regras.paraIA) ? J.regras.paraIA() : '';
    if (minhas) doAdvogado += '\n\n' + minhas;
    const sistema = SISTEMA + '\n\n' + (ESFORCO[ef] || ESFORCO[3]) + '\n' + verbo + hist + ementasTxt + doAdvogado;
    const modelo = acao.motor ? PROMPTS[acao.motor] : acao.p ? acao.p : 'Atenda ao pedido do advogado abaixo.\n\nTEXTO:\n{{textos}}';
    const corpo = (texto || '') + (pedidoExtra ? '\n\nPEDIDO DO ADVOGADO: ' + pedidoExtra : '');
    const seguro = corpo.length > 800000 ? corpo.slice(0, 800000) : corpo;
    const prefixo = ementasTxt ? '⚖️ EMENTAS SELECIONADAS PELO ADVOGADO — CITE-AS LITERALMENTE NA SEÇÃO DA JURISPRUDÊNCIA:\n' + ementasTxt + '\n---\n\n' : '';
    const usuario = prefixo + (modelo.includes('{{textos}}') ? modelo.replace('{{textos}}', seguro) : modelo + '\n\n' + seguro);
    const maxTokens = tamanho === 'curta' ? (ef <= 2 ? 8192 : 16384) : 65536;
    return { sistema, usuario, maxTokens };
  }

  J.motor = { SISTEMA, PROMPTS, ESFORCO, ACOES, montar };
})(window.J);
