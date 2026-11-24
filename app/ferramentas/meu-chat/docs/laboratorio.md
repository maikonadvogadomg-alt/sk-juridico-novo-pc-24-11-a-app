# Laboratório — documentação

> Versão **18/11-B** · documentação gerada em 18/11/2026. Feita para o dono LER e para QUALQUER IA entender o projeto sem ler o código inteiro (mais barato e com menos erro). Para mexer numa parte, a IA abre só o arquivo dela (veja o mapa no fim).

## 📌 O que é
O lugar de **ANALISAR, COMPARAR, APRENDER e JUNTAR** pedaços de códigos. HTML puro: celular (PWA/APK) e PC (.exe Electron, porta 7690). Traz DENTRO, inteiros: o **Caça-Bug** e o **Laboratório 2**, além do Meu Chat.

## ✨ Recursos
- **📂 Projetos**: importa .zip, .tar.gz, pasta, um HTML só, vários arquivos ou código colado. O projeto escolhido no topo vale para TODAS as abas.
- **🔍 Análise**: arquivos, como cada página carrega, funções, quem chama quem. **🗺️ Plano macro** em .md para levar à IA.
- **⚖️ Comparar A × B**: o que funciona × o que não funciona.
- **🔍 Raio-X de APK / .EXE / build**: como foi feito, como importa arquivo, rotas `/api`, bibliotecas, chaves esquecidas (mascaradas). Parte 2: 📖 frases da tela, 🧠 instruções da IA, 🗺 código original pelo `.map`, 🧹 desembolar (com o acorn), ⚖️ comparar duas versões.
- **✂️ Fatiador**, **♻️ Recuperar backup**, **🧸 Brincar**, **🧬 Combinar** (montar código novo com peças de vários projetos), **📦 Desembrulhar**, **🧩 Grupos** (ferramentas trabalhando juntas com a 🗄 mesa).
- **🧰 Ferramentas**: as que recebem projeto (Faxina, Numerador, Preparador, Projeto Lab, Replicador, Juntador, Caça-Bug, Laboratório 2) **já abrem com o projeto escolhido** (📥, igual ao Caça-Bug; o Caça-Bug recebe por `window.__receber` sem duplicar). Kits para baixar: faxina do PC etc.
- **💻 Terminal de verdade** (Termux no celular via ttyd; PC direto): ▶ Ligar tudo · 🚀 Rodar · 🦙 Ollama · 🗣 Voz · 🧰 Verificar e instalar · 🩺 Terminal parado?
- **📒 Memória** por projeto. **🗄 Banco de Dados (Neon)** com 🤖 Pedir à IA (copiar o pedido).

## 🗄 Onde ficam os dados
IndexedDB, loja `projetos` (`{id, nome, criado, origem, arquivos: {caminho: {t: texto}}}` — binários só com o tamanho). Não sincroniza com a nuvem.

## 🧩 Como é montado
Objeto global **`LB`**; cada aba é um módulo em `js/`; `99-app.js` liga as telas. Versão visível no `index.html`.

## 🛡 Regras que NÃO podem quebrar (para qualquer IA que mexer aqui)
1. **Entregar o arquivo INTEIRO**, nunca "troque este pedaço" (o dono não programa).
2. **Nunca guardar nem pedir segredo** (chave de IA, token, senha) em arquivo do projeto. Chaves ficam só no aparelho (ou no cofre TRANCADO com senha). Nada de `.env` nem `local.config.json` no zip.
3. **Nunca apagar de vez**: o que apaga pede confirmação (ou CONFIRMO), e sempre que der vai para lixeira/quarentena.
4. **Voz**: só voz natural grátis (a do aparelho, como `pt-br-x-pte`, ou a "Francisco"). Nada de voz robótica.
5. **Português simples** em toda tela e mensagem. O dono não lê inglês.
6. Repositórios no GitHub: **sempre privados**.
7. **Toda versão nova muda o número de versão visível** (ex.: 18/11-A → 18/11-B).

## 🧰 Ferramentas que vêm dentro
- `ferramentas/ai-code-studio.html` — AI Code Studio
- `ferramentas/arrumador.html` — Arrumador de Backups
- `ferramentas/banco-neon.html` — Banco de Dados (Neon)
- `ferramentas/cacabug/` — app inteiro aqui dentro
- `ferramentas/colador.html` — Colador de Links
- `ferramentas/faxina.html` — 🧹 Faxina de Repetidos
- `ferramentas/iara-suite.html` — Iara Suite — Code Editor · APK Builder · Site Extractor
- `ferramentas/juntador.html` — Juntador de Arquivos
- `ferramentas/laboratorio2/` — app inteiro aqui dentro
- `ferramentas/meu-chat/` — app inteiro aqui dentro
- `ferramentas/montador.html` — Montador Universal
- `ferramentas/numerador.html` — Numerador de Códigos
- `ferramentas/picotador.html` — Picotador de Memória e Backup
- `ferramentas/preparador.html` — Preparador Universal
- `ferramentas/projeto-lab.html` — Projeto Lab
- `ferramentas/replicador.html` — Replicador de Projeto

## 🗺 Mapa dos arquivos (tirado do cabeçalho de cada arquivo)
| Arquivo | O que faz |
|---|---|
| `js/00-base.js` | peças comuns (LB). |
| `js/10-banco.js` | os projetos guardados no aparelho (IndexedDB), cada um SEPARADO e com nome. Projeto = { id, nome, criado, origem, arquivos: { caminho: { t: texto } / { b: tamanho-binário } } } |
| `js/20-importar.js` | traz um projeto (.zip, .tar.gz, pasta, um HTML só, vários arquivos, código colado). |
| `js/30-analise.js` | lê o projeto INTEIRO (vários arquivos ou um HTML só) e descobre: os arquivos, como cada página carrega, as funções (o que fazem, quem chama quem), as ligações entre arquivos, dependências, rotas, e os problemas. O "motor" das funções é o do 🔪 Desmontar. |
| `js/40-plano.js` | o PLANO MACRO do projeto, em .md (para ler aqui e para levar para a IA). |
| `js/50-comparar.js` | ⚖️ A (o que funciona) × B (o que não funciona), lado a lado. Mostra arquivos novos/sumidos/mudados, as funções que mudaram e os problemas que só existem em B. |
| `js/60-ferramentas.js` | 🧰 AS SUAS FERRAMENTAS NUM LUGAR SÓ. Cada ferramenta é um HTML que funciona sozinho (pasta ferramentas/). Abre aqui dentro e continua guardando os próprios dados. "↗ Tela própria" abre numa aba só dela. |
| `js/70-ia.js` | 🤖 IA — o MEU CHAT aqui dentro (chat livre, do jeito da última versão): as suas chaves (Gemini, Groq, OpenRouter…), o 🦙 Ollama sozinho quando estiver ligado, voz natural, memória, internet e fotos. Os botões 📎 colocam na caixa do chat o PLANO do projeto, a MEMÓRIA dele, a COMPARAÇÃO A × B ou um ARQUIVO — aí é só perguntar (escrevendo ou pelo 🎤). |
| `js/75-memoria.js` | 📒 MEMÓRIA — o caderno de cada projeto (e um caderno geral). O que é o projeto, o que já funciona, o que falta, as decisões e os erros já resolvidos. Salva sozinho enquanto você escreve (fica guardado neste aparelho, neste navegador). 📎 manda para a 🤖 IA junto com a pergunta, para ela não se perder. |
| `js/80-terminal.js` | 💻 TERMINAL DE VERDADE — com a MESMA lógica do Mini SK (a que não cai): 📱 TERMUX (celular): conecta no ttyd (ws://127.0.0.1:7681/ws), religa sozinho se cair, e liga a ponte de arquivos em PEDACINHOS (antes ia numa linha gigante e o Termux derrubava a conexão); se a ponte cair, religa sozinha. Instala o Node sozinho na 1ª vez. 💻 COMPUTADOR: quando o Laboratório é aberto PELO Mini SK do PC (botão "🌐 Abrir como app"), us… |
| `js/90-lab-ponte.js` | a "tomada" que deixa as ferramentas do Laboratório ANTIGO (19/10) — 🔪 Desmontar, 🗺️ Mapa e 🧪 Prévia de vários arquivos — funcionarem aqui dentro, sem mexer nelas. Elas pediam um "Shell" (o miolo do app antigo). Aqui o Shell é de mentirinha e conversa com o LB. |
| `js/91-lab-base.js` | 91-lab-base.js (veio do Laboratório antigo) — o que ele entende como "um arquivo chama o outro": - HTML: <script src>, <link href>, <img src>, <iframe src>, <a href="x.html"> - JS/TS: import … from 'x', import('x'), require('x'), export … from 'x' - CSS: @import 'x', url(x) Caminho do projeto ("./x", "../x", "/x", "@/x") vira arquivo; o resto ("react", "lodash") é PACOTE de fora (npm). |
| `js/92-lab-mapa.js` | js/12-lab-mapa.js |
| `js/93-lab-previa.js` | js/13-lab-previa.js |
| `js/94-lab-desmontar.js` | js/18-lab-desmontar.js |
| `js/95-fatiador.js` | ✂️ FATIADOR INTELIGENTE Pega um arquivo grande (HTML, JS, TS, TSX, JSX, CSS, Python, MD) e corta em FATIAS do tamanho que você escolher (50 a 500 linhas), SEM cortar no meio de uma função: ele só corta entre um bloco e outro (a leitura dos blocos é a mesma do Fatiador do Mini SK, que sabe pular textos, comentários e regex). - Cada fatia vem com o CONTEXTO (projeto, nº, linhas, o que tem dentro, de quais outras fatias… |
| `js/96-recuperar.js` | ♻️ RECUPERADOR DE BACKUP Abre os backups .json dos seus apps antigos (Exportar Backup, LocalStorage, playground, Iara, SK Editor, AI Code Studio…) e o snippets.csv da Replit, ACHA os códigos, páginas e conversas guardados lá dentro e transforma em ARQUIVOS de verdade: vira projeto do Laboratório, .zip ou .md. - Entende JSON dentro de JSON (o LocalStorage guarda tudo como texto). - Conversas (mensagens) viram .md legí… |
| `js/97-brincar.js` | 🧸 BRINCAR (o laboratório de brinquedo, para APRENDER) 📥 Caixa: joga todos os seus códigos (arquivos, .zip, backups .json/.csv, o projeto escolhido) num lugar só. 🔁 Repetidos: acha os iguais e os QUASE iguais (versão 1, versão 2…) e marca ⭐ a mais completa. "Ficar só com a ⭐" manda as outras para a pasta lixeira/ da caixa — nada é apagado. 🧩 Montar: escolhe 2 a 4 brinquedos e eles abrem lado a lado na MESA, cada um na… |
| `js/98-combinar.js` | 🧬 COMBINAR — pegar pedaços de códigos diferentes e montar um código novo. 1) Ele lê TODOS os seus projetos do Laboratório (inclusive o que o 🔪 Desmontar e o ✂️ Fatiador separaram) e lista cada pedaço: funções, variáveis, classes — com o que cada um faz, o que ele USA e de quais elementos da tela (ids) ele precisa. 2) Você marca os pedaços (de projetos diferentes, se quiser). 3) Ele traz SOZINHO o que esses pedaços pr… |
| `js/98w-desembrulhar.js` | 📦 DESEMBRULHAR — tira de volta os códigos HTML que um "montador" guardou DENTRO de um HTML só (cada um virava uma aba). Serve para recuperar ferramentas que você só tem nesse formato juntado (o original separado se perdeu). Procura em todo lugar onde um montador costuma esconder: - <iframe srcdoc="…"> · <template> · <script type="text/html/text/plain/text/template"> - textos dentro do JavaScript ('…', "…", `…`, lista… |
| `js/98x-raiox.js` | 🔍 RAIO-X DE APK e de .EXE (e de zip de projeto) Abre um .apk (ou .zip/.aab) SEM instalar, olha por dentro e faz um RELATÓRIO em português: - que tipo de app é (Capacitor, Cordova, React Native, Flutter, site embrulhado…); - se ele só abre um SITE da internet (server.url) — aí "funciona sem servidor" porque usa o servidor de lá; - endereços de internet e rotas /api que o app chama; bibliotecas que usa; - COMO ELE IMPO… |
| `js/98x2-raiox-mais.js` | 🔍 RAIO-X, parte 2 (17/11) — tirar informação de BUILD e de APK O build (a pasta dist, ou a tela dentro do APK) vem "embolado": tudo espremido numa linha só, às vezes num arquivo, às vezes em 50. Mesmo assim dá para tirar muita coisa: 📖 Frases em português — os textos da tela, as mensagens de erro e de aviso (ficam legíveis no build) 🧠 Instruções para a IA — os textos grandes que o app manda para a IA (o "motor"), se … |
| `js/98y-grupos.js` | 🧩 GRUPOS — seus códigos HTML trabalhando JUNTOS (a ideia do Caça-Bug, sem montar.py). - Crie um grupo (ex.: 🧹 Limpeza, 💾 Backup, ⚖️ Comparação) e ponha nele os seus códigos .html. - Cada grupo tem uma 🧺 MESA: os arquivos que circulam entre os códigos. - 📤 ENTREGAR: pega um arquivo da mesa e coloca DENTRO do código, como se você tivesse tocado em "abrir arquivo" nele (ou cola na caixa de texto dele). - 📥 GUARDAR SOZIN… |
| `js/98z-navegar.js` | barrinha NO TOPO (ao lado da versão) com ⬅ voltar · ➡ avançar (entre as abas que você abriu) e 🔍− 🔍+ (diminuir/aumentar a tela inteira). O tamanho escolhido fica guardado neste aparelho. |
| `js/99-app.js` | liga as telas. O projeto escolhido lá em cima vale para TODAS as abas. |

## 🤖 Como pedir para uma IA mexer aqui
1. Mande ESTE documento e diga o que quer.
2. A IA diz QUAIS arquivos precisa ver (pelo mapa). Mande só esses.
3. Ela devolve os arquivos INTEIROS, muda o número da versão e diz o que fez, o que não fez e o próximo passo.
