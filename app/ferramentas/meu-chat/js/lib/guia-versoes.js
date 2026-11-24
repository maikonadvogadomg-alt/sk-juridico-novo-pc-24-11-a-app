/* 🧭 Guia das VERSÕES — o que é cada app do Maikon, qual a versão atual, e COMO USAR (passo a passo).
   Uma fonte só: o painel 🧭 do Meu Chat mostra isto para ele ler, e a IA recebe o mesmo texto
   (junto do guia-maikon.js) para saber explicar. Atualizado pelo Claude a cada versão nova. */
(function () {
  'use strict';
  const ATUALIZADO = '18/11/2026';

  const APPS = [
    {
      id: 'meuchat', icone: '💬', nome: 'Meu Chat', versao: '18/11-C', onde: 'Celular e computador (PWA, APK; também vem dentro do Laboratório, Laboratório 2 e SK Jurídico)',
      instalador: 'Instalador-Meu-Chat-18-11-C',
      oque: 'O seu chat principal e o seu GUIA. Conversa com qualquer IA (Gemini, Groq, OpenRouter, Claude, Ollama…), pesquisa na internet, vê fotos, abre .zip, guarda memória, fala com voz natural, mostra o gasto e guarda os seus códigos.',
      quando: 'Para conversar, fazer código com a IA, tirar dúvidas dos seus apps e pensar junto.',
      passos: [
        'Primeira vez: ⚙️ Configurar → cole uma chave grátis (a do Gemini serve). Com o login (Supabase) ligado: e-mail e senha e tudo aparece, até as chaves.',
        '🎤 fala, ➤ envia. 📷 foto/print. 📎 arquivo (lê os acentos certos) ou .zip — o zip abre numa janela e você marca só o que vai para a IA.',
        '🔳 Ler QR Code (câmera ou print), inclusive os QR em sequência do Colecionador.',
        '💾 nos blocos de código: guarda em 🧪 Meus códigos (vai para a nuvem). ▶ abre no playground para ver e mexer.',
        '💰 Gasto: quantos tokens e quantos reais cada resposta gastou, hoje, 7 e 30 dias. Ali escolhe quantas mensagens vão junto e tem ✂️ Continuar numa conversa nova (enxuta) quando a conversa fica comprida.',
        '🧭 Guia (botão embaixo): ligado = a IA sabe de todos os apps em toda mensagem (mais caro); desligado = só quando você pergunta de um app.',
        '☁️ Nuvem (⚙️): Neon (cole o endereço) ou Supabase (login com e-mail e senha, e esqueci a senha).',
        '🔔 Avisar + 🔆 Tela acesa (embaixo): quando a resposta terminar, apita, vibra e mostra notificação (bom para o Ollama). 🧪 Testar nos blocos de JS/Python. 🔗 Links e navegador interno. 🐙 cole o link de um repositório público. 📄 Docs: a documentação de um projeto só naquela pergunta.',
      ],
    },
    {
      id: 'skhtml', icone: '⚖️', nome: 'SK Jurídico HTML (o jurídico novo, sem servidor)', versao: '18/11-B', onde: 'Celular (PWA/APK) e computador (.exe)',
      instalador: 'Instalador-SK-Juridico-HTML-18-11-B · Instalador-SK-Juridico-HTML-PC-18-11-B',
      oque: 'O seu jurídico refeito em HTML, com o SEU motor (as mesmas regras e ações do 1.7.x), as ementas, os modelos, as 4 IAs e o banco na nuvem. Não precisa de servidor.',
      quando: 'Para trabalhar nos processos no dia a dia, no celular ou no PC.',
      passos: [
        '⚙️ → cole a chave da IA. ☁️ Nuvem: Neon (endereço) ou Supabase (login). Com o Supabase embutido aparece a tela de login na entrada.',
        'Importe o processo, escolha a ação e gere. O chat usa o motor.',
        '🧰 Ferramentas: Meu Chat, Colador, Caça-Bug (com terminal) e 🗄 Banco de Dados (com 🤖 Pedir à IA).',
      ],
    },
    {
      id: 'juridico176', icone: '⚖️', nome: 'SK Jurídico 1.7.6 (o modelo final)', versao: '1.7.6', onde: 'Computador (.exe) — e também roda no Mini SK / Laboratório do celular com o terminal',
      instalador: 'Instalador-SK-Juridico-1.7.6-PC',
      oque: 'O SEU JURÍDICO PRINCIPAL: é o 1.7.2 que você testou e funcionou, com os consertos. Tem duas partes: a TELA e o SERVIDOR (o "motor" que fala com a IA). No .exe o servidor liga sozinho.',
      quando: 'Para trabalhar nos processos: importar o PDF do processo (até 1 GB), gerar peças, refinar, pesquisar jurisprudência com fonte, auditoria e comparador.',
      passos: [
        'No computador: instale e abra o programa — ele liga o motor sozinho.',
        '🔑 Chave própria: cole a chave (Gemini AIza… ou a nova AQ.…, Claude sk-ant-…, Groq, OpenRouter, ChatGPT, ou escreva ollama).',
        '🔄 Ver modelos: mostra os modelos que existem hoje; toque no que quiser.',
        '✏️ Prefixos: se um dia mudarem o começo das chaves, cadastre o novo ali.',
        'Botões no topo: 💬 Meu Chat · 🔗 Links (Colador com 📌 links fixos) · 🧰 Ferramentas (Mini Jurídico, Caça-Bug, Montador, 🦙 Ollama, Verificador de Citações, Calculadora) · Auditoria · Comparador.',
        'Se der "falta o servidor": o motor não ligou. Feche e abra de novo; se continuar, mande o registro.txt (pasta SK-Juridico) para o Claude.',
      ],
    },
    {
      id: 'juridicominisk', icone: '⚖️', nome: 'Jurídico Mini SK', versao: '15/11-H', onde: 'Celular (dentro do Mini SK ou do Laboratório, com o Termux) e computador',
      instalador: 'Instalador-Juridico-MiniSK-15-11-H',
      oque: 'Outra versão do jurídico, feita para rodar dentro do Mini SK. Lê o PDF na própria tela (sem servidor). Para GERAR com a IA, precisa do servidor ligado.',
      quando: 'Quando estiver só com o celular. No computador, prefira o SK Jurídico 1.7.6.',
      passos: [
        'Abra no Mini SK → 📱 Termux → ▶ Ligar tudo → 🚀 Rodar o projeto.',
        'Mesmos botões novos: 💬 Meu Chat, 🔗 Links, 🧰 Ferramentas, 🔑 chave de qualquer IA com 🔄 Ver modelos.',
        'OCR (ler PDF escaneado) só roda se você aceitar — é lento no celular.',
      ],
    },
    {
      id: 'assistente', icone: '📄', nome: 'Assistente Jurídico / Jurídico modular', versao: '15/11 (modular 12/11-I)', onde: 'Celular e computador, HTML puro (não precisa de servidor)',
      instalador: 'Instalador-Assistente-Juridico-Celular-15-11 · Instalador-Assistente-Juridico-PC-15-11',
      oque: 'O jurídico em HTML puro: Limpador (com Ollama), Processar, Editor A4, conversa por voz, 📏 Regras (a primeira é NUNCA inventar jurisprudência).',
      quando: 'Quando quiser algo leve, sem servidor.',
      passos: ['Abra o index.html (ou instale como app).', 'Limpador → "Mandar para Processar".', '⚙️ → cole a chave da IA.'],
    },
    {
      id: 'minisk', icone: '🛠️', nome: 'Mini SK', versao: '18/11-A', onde: 'Celular (APK/PWA) e computador (.exe)',
      instalador: 'Instalador-Mini-SK-18-11-A · Instalador-Mini-SK-PC-18-11-A',
      oque: 'O EDITOR principal: abrir, mexer, consertar, rodar e PUBLICAR projetos grandes (APK, site, .exe). Tem terminal de verdade.',
      quando: 'Para EDITAR e PUBLICAR. (Para olhar, comparar e aprender: Laboratório.)',
      passos: [
        '🗂 Projetos → abrir o .zip do projeto.',
        '📱 Termux (celular) ou 💻 Terminal (PC) → ▶ Ligar tudo → 🚀 Rodar o projeto.',
        '🧰 Verificar e instalar o que falta: confere Node, Python, Git, Java 17, Flask e a voz, e instala só o que falta.',
        '🗣 Ligar a voz Francisco (celular; no PC liga sozinha). 🩺 Terminal parado?: manda Ctrl+C e um teste; se caiu, liga de novo.',
        '🧩 Montar: junta várias ferramentas HTML num app só. 🚀 Publicar: APK, site, .exe.',
        '🗄 Banco (barra de cima): conecta o Neon, mostra as tabelas e tem 🤖 Pedir à IA — você fala "quero uma tabela de clientes" e ela monta, explica, roda e corrige. O que apaga pede CONFIRMO.',
        '🧭 Guia sempre (barra da IA): desligado = econômico (o guia só vai quando você pergunta de um app).',
      ],
    },
    {
      id: 'lab', icone: '🔬', nome: 'Laboratório', versao: '18/11-B', onde: 'Celular e computador (.exe)',
      instalador: 'Instalador-Laboratorio-18-11-B · Instalador-Laboratorio-PC-18-11-B',
      oque: 'O lugar de ANALISAR, COMPARAR, APRENDER e JUNTAR pedaços de códigos. Abre bem os projetos TSX (como o jurídico) na 🧪 Prévia.',
      quando: 'Para entender um projeto, comparar versões, recuperar códigos de apps velhos, juntar pedaços de vários códigos.',
      passos: [
        '📂 Projetos: importe o .zip (ou pasta). Escolha o projeto lá em cima — todas as abas usam ele.',
        '🧪 Prévia: vê a tela do projeto. 🗺️ Plano macro: resumo do projeto para a IA. ⚖️ Comparar A × B: o que mudou entre duas versões.',
        '✂️ Fatiador: corta arquivo grande em pedaços para levar à IA (exporta .md). ♻️ Recuperar: tira os códigos de um backup .json de app velho.',
        '🧬 COMBINAR (juntar pedaços): escolha funções/peças de projetos diferentes → ele traz junto o que cada peça precisa → "Montar" cria um projeto NOVO (index.html + pecas.js + FICHA.md). Os originais não mudam.',
        '🧩 GRUPOS: junte várias ferramentas HTML num grupo. O que uma ferramenta baixa vai para a 🗄 mesa, e dali você entrega para a outra (ex.: o Limpador entrega o texto para o Processar).',
        '📦 DESEMBRULHAR: acha as ferramentas escondidas DENTRO de um HTML grande (montadores, bundles) e separa cada uma num arquivo.',
        '🔍 Raio-X APK/EXE/build: diz como foi feito e tira o que dá para aproveitar — 📖 frases da tela, 🧠 instruções da IA, 🗺 código original (se tiver .map), 🧹 desembolar, ⚖️ comparar duas versões (a que funciona × a que não funciona).',
        '💻 Terminal: ▶ Ligar tudo · 🚀 Rodar · 🦙 Ollama · 🗣 Voz · 🧰 Verificar e instalar · 🩺 Terminal parado?',
        '🧰 Ferramentas: Meu Chat, AI Code Studio, Colador, 🐞 Caça-Bug inteiro, 🔬 Laboratório 2 inteiro, 🗄 Banco e outras. 📥 Elas recebem sozinhas o projeto escolhido no topo (ou toque em 📥 Mandar o projeto).',
      ],
    },
    {
      id: 'lab2', icone: '🔬', nome: 'Laboratório 2', versao: '16/11-A', onde: 'Celular e computador (.exe, porta 7700 — abre junto com o Mini SK e o Laboratório)',
      instalador: 'Instalador-Laboratorio2-16-11-A · Instalador-Laboratorio2-PC-16-11-A',
      oque: 'O seu outro laboratório (que veio do ProjetoLens): importa o projeto e faz muita análise de uma vez — dependências, rotas de API, bugs, mapa — e manda para as 🧰 Ferramentas. Quebra menos.',
      quando: 'Para importar um projeto e ver tudo dele de uma vez; para testar no terminal de verdade; para usar as ferramentas de faxina, arrumador e numerador.',
      passos: [
        '📦 Importar Projeto: o .zip. Depois veja 📁 Explorador, 🧩 Dependências, 🔍 Analisador, 🛣️ Rotas de API.',
        '🔪 Desmontar HTML: separa um HTML único em partes. 💾 Exportar: baixa o projeto/relatório.',
        '💻 Terminal de verdade: igual ao do Laboratório (▶ Ligar tudo, 🚀 Rodar, 🦙, 🗣, 🧰, 🩺). No PC liga sozinho.',
        '🧸 Terminal de treino: só OLHA o projeto (ls, cat, grep, analyze). Não roda nada de verdade.',
        '🧰 Ferramentas: 💬 Meu Chat, 🔗 Colador, Faxina de Repetidos, Arrumador de Backups, Numerador, Preparador Universal…',
      ],
    },
    {
      id: 'aicode', icone: '🤖', nome: 'AI Code Studio', versao: '15/11-X', onde: 'Dentro do Laboratório (🧰 Ferramentas)',
      instalador: 'vem no Laboratório',
      oque: 'Chat de CÓDIGO HTML: a IA escreve o código e você vê a prévia na hora. Sabe o projeto que está aberto no Laboratório e lê este guia.',
      quando: 'Para criar ou consertar uma ferramenta HTML pequena.',
      passos: ['🧰 Ferramentas → AI Code Studio.', 'Cole a chave, peça o que quer. 📎 manda imagem, .zip ou arquivo.', '⤢ só a prévia: vê a tela grande.'],
    },
    {
      id: 'colecionador', icone: '🧰', nome: 'Colecionador de comandos', versao: '16/11-A', onde: 'Celular e computador',
      instalador: 'Instalador-Colecionador-16-11-A',
      oque: 'Guarda os comandos (Termux, PC, adb, Replit) com explicação e botão 📋 copiar. Os do seu colecionador antigo foram conferidos: são de verdade.',
      quando: 'Quando precisar de um comando e não lembrar.',
      passos: ['Escolha onde vai rodar (Termux, PC, adb…).', 'Toque em 📋 e cole no terminal.'],
    },
    {
      id: 'colador', icone: '🔗', nome: 'Colador de Links', versao: '15/11-c', onde: 'Sozinho, e dentro do Laboratório, Laboratório 2 e SK Jurídico',
      instalador: 'Colador-de-Links-15-11-c',
      oque: 'Guarda os links das suas versões e PWAs.',
      quando: 'Para achar rápido o link de cada app.',
      passos: ['🔗 Links → cole o link e o nome.', '📌 Fixar os links no arquivo: baixa um colador.html com os links DENTRO dele — mesmo se apagar tudo, eles voltam.'],
    },
    {
      id: 'cacabug', icone: '🐛', nome: 'Caça-Bug', versao: '1.5', onde: 'Celular e computador (.exe); também inteiro dentro do Laboratório e do SK Jurídico',
      instalador: 'Instalador-Caca-Bug-1-5 · Instalador-Caca-Bug-PC-1-5',
      oque: 'Acha os defeitos de verdade num projeto (botão que não funciona, tela branca, erro), compara com quando funcionava e gera o zip limpo.',
      quando: 'Quando algo quebrou e você não sabe onde.',
      passos: ['Importe o projeto (ou abra pelo Laboratório: ele já chega lá dentro).', '🩺 Diagnóstico, 🔍 Raio-X, Triagem, ⚖️ comparar com quando funcionava, 🧼 Zip limpo.', '💻 Terminal de verdade e 🤖 chat (o Meu Chat).'],
    },
    {
      id: 'calc', icone: '🧮', nome: 'Calculadora da Sentença · Verificador de Citações', versao: '13/11', onde: 'Celular e computador (e dentro do jurídico)',
      instalador: 'Calculadora-da-Sentenca.html · Verificador-de-Citacoes.html',
      oque: 'A Calculadora calcula SÓ pelo que a sentença manda (índices do BCB, tabela do TJMG). O Verificador confere se a jurisprudência citada existe e tem fonte.',
      quando: 'Cálculo de sentença; antes de usar qualquer julgado que uma IA citou.',
      passos: ['Cole o texto da sentença / a citação.', 'Confira sempre a fonte antes de usar.'],
    },
  ];

  const QUAL = [
    ['Trabalhar no processo (Leandro, seu pai)', 'SK Jurídico 1.7.6 no computador'],
    ['Só com o celular e precisa do jurídico', 'Jurídico Mini SK dentro do Mini SK, ou o Assistente Jurídico (HTML)'],
    ['Conversar, tirar dúvida, aprender a usar os apps', 'Meu Chat (🧭 Guia)'],
    ['Editar e publicar um projeto (APK, site, .exe)', 'Mini SK'],
    ['Entender, comparar, recuperar ou juntar pedaços de código', 'Laboratório (🧬 Combinar, 🧩 Grupos, 📦 Desembrulhar)'],
    ['Importar um projeto e ver tudo dele de uma vez', 'Laboratório 2'],
    ['Testar os três jurídicos lado a lado', 'No computador: Mini SK + Laboratório + Laboratório 2 abertos juntos'],
    ['Lembrar um comando', 'Colecionador'],
    ['Achar o link de um app', 'Colador de Links'],
    ['Algo quebrou e não sei onde', 'Caça-Bug'],
  ];

  function texto() {
    const L = ['══ VERSÕES ATUAIS E COMO USAR (atualizado ' + ATUALIZADO + ') — esta parte VALE MAIS que versões antigas citadas acima ══'];
    APPS.forEach((a) => {
      L.push('', a.icone + ' ' + a.nome + ' — versão ' + a.versao + ' · ' + a.onde + ' · instalador: ' + a.instalador);
      L.push('  O que é: ' + a.oque);
      L.push('  Quando usar: ' + a.quando);
      L.push('  Como usar: ' + a.passos.map((p, i) => (i + 1) + ') ' + p).join(' '));
    });
    L.push('', 'QUAL USAR PARA QUÊ:');
    QUAL.forEach((q) => L.push(' • ' + q[0] + ' → ' + q[1]));
    L.push('', 'Ele já disse que se acha "burro" quando não entende: NÃO é. O problema são muitas versões e nomes parecidos. Explique um passo de cada vez, com o NOME do botão e ONDE ele fica, sem pressa e sem julgamento.');
    return L.join('\n');
  }

  window.GuiaVersoes = { ATUALIZADO, APPS, QUAL, texto };
})();
