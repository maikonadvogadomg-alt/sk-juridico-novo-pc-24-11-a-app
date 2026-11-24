# SK Jurídico HTML — documentação

> Versão **23/11-E** · documentação gerada em 23/11/2026. Feita para o dono LER e para QUALQUER IA entender o projeto sem ler o código inteiro (mais barato e com menos erro). Para mexer numa parte, a IA abre só o arquivo dela (veja o mapa no fim).

## 📌 O que é
O **jurídico do Maikon refeito em HTML**, sem servidor, com o **MESMO motor** do SK Jurídico 1.7.x (servidor Node da Replit). Roda como PWA no celular e no PC, como APK e como .exe (Electron). Advocacia em Minas Gerais, muito previdenciário (INSS).

## ⚙️ O motor (o valor do produto)
`js/21-motor.js` tem, **palavra por palavra**, o `SYSTEM_PROMPT_BASE`, os `ACTION_PROMPTS` e o `ESFORCO` que vieram de `server/routes/ai.ts` do 1.7.x. **Não reescrever o motor**: mudar só se o dono pedir.
Ações: ⚖️ Fazer a peça · 📝 Resumir · 🔎 Analisar · ❓ O que falta? · ✅ Revisar · 💪 Refinar · ✍️ Mais persuasivo · ✏️ Só corrigir · 🗣️ Linguagem simples · 📲 Mensagem ao cliente.
`J.motor.montar({acao, texto, pedidoExtra, ementas, historico, esforco, tamanho})` monta o pedido igual ao servidor fazia (`/ai/process`). Processar em 2 passos (resumo × peça), com Ollama quando houver.
**Regra de ouro: NUNCA inventar jurisprudência.** Só usa as ementas que o advogado guardou e marcou (📚). Sem ementa → diz que não tem, não inventa.

## ✨ Recursos
- **⚡ Processar**: cole/abra o texto do processo → escolha a ação → resultado formatado → Editor, Word, ouvir, salvar.
- **📎 Importar**: PDF, Word (.docx), TXT, MD, RTF, HTML (lido no próprio aparelho).
- **✏️ Editor A4 (ABNT)** e **⬇ Word de verdade** (.docx feito no aparelho).
- **💬 Conversa** sobre o caso (texto ou voz), com o motor.
- **📐 Modelos** com [CAMPOS] e **📚 Ementas** (as SUAS).
- **📜 Regras do escritório**: o "cérebro" que cresce sem mexer no código.
- **📁 Documentos** e **🕐 Histórico**. **☁️ Google Drive** direto (opcional).
- **🧪 Meus códigos** (playground que guarda).
- **🧰 Ferramentas** (pasta `ferramentas/`): Meu Chat, Colador, Colecionador, Caça-Bug (com terminal), 🗄 Banco de Dados (Neon, com 🤖 Pedir à IA), Calculadora da Sentença, Verificador de Citações, Comparador, Extrator, Limpador, Organizador, Perito, Juntador, Comunicações, Laboratório.
- **IAs**: Gemini (principal, grátis), Groq (reserva), Claude, OpenAI, OpenRouter, Ollama. Claude por padrão `claude-sonnet-5-5`.
- **☁️ Nuvem**: Supabase com **tela de login na entrada** (quando `js/nuvem-embutida.js` tem a URL e a chave anon) ou Neon.

## 🗄 Onde ficam os dados
- **No aparelho (IndexedDB)**: lojas `documentos`, `modelos`, `ementas`, `historico`, `conversas`, `regras`, `codigos`. Preferências em `J.pref` (localStorage).
- **Na nuvem**: a MESMA tabela `mc_itens` do Meu Chat, com tipos `jur:<loja>` (ex.: `jur:documentos`) e `jur:prefs`. O login e a nuvem são compartilhados com o Meu Chat (chaves `meuchat:nuvem:*` no localStorage).
- Prefs que viajam: perfil, esforco, tamanho, doisPassos, lembrarHist, internet, internetConversa, lerRespostas. **Nunca viajam**: `ia` (chaves), `busca`, `drive`.

## 🧩 Como é montado
"Trem" de módulos: `00-core.js` (a locomotiva) cria o objeto **`J`** (`J.$`, `J.esc`, `J.aviso`, `J.pref`, `J.db`); cada módulo pendura o seu (`J.ia`, `J.motor`, `J.nuvem`…); `99-app.js` (o último vagão) monta as abas. Versão visível em `js/00-core.js` ("SK HTML dd/mm-X").

## ⚠ Problemas conhecidos
- O SK Jurídico 1.7.x (com servidor) caía sem `DATABASE_URL` (erro "Failed to fetch" em settings/templates); desde 28/10 ele salva em arquivo quando não há banco. A importação do 1.7.21 manda o arquivo para o servidor (`/api/upload/extract-text`); a versão HTML lê no aparelho.

## 🛡 Regras que NÃO podem quebrar (para qualquer IA que mexer aqui)
1. **Entregar o arquivo INTEIRO**, nunca "troque este pedaço" (o dono não programa).
2. **Nunca guardar nem pedir segredo** (chave de IA, token, senha) em arquivo do projeto. Chaves ficam só no aparelho (ou no cofre TRANCADO com senha). Nada de `.env` nem `local.config.json` no zip.
3. **Nunca apagar de vez**: o que apaga pede confirmação (ou CONFIRMO), e sempre que der vai para lixeira/quarentena.
4. **Voz**: só voz natural grátis (a do aparelho, como `pt-br-x-pte`, ou a "Francisco"). Nada de voz robótica.
5. **Português simples** em toda tela e mensagem. O dono não lê inglês.
6. Repositórios no GitHub: **sempre privados**.
7. **Toda versão nova muda o número de versão visível** (ex.: 18/11-A → 18/11-B).

## 🧰 Ferramentas que vêm dentro
- `ferramentas/banco-neon.html` — Banco de Dados (Neon)
- `ferramentas/cacabug/` — app inteiro aqui dentro
- `ferramentas/calculadora-sentenca.html` — Calculadora da Sentença
- `ferramentas/colador.html` — Colador de Links
- `ferramentas/colecionador.html` — Colecionador de Comandos
- `ferramentas/comparador.html` — Comparador de Versões
- `ferramentas/comunicacoes.html` — Comunicações Processuais
- `ferramentas/desmontador-backup.html` — Restaurador Universal
- `ferramentas/extrator.html` — Extrator de Sites
- `ferramentas/juntador.html` — Juntador de Arquivos
- `ferramentas/laboratorio.html` — Laboratório HTML
- `ferramentas/limpador.html` — Limpador de Processos
- `ferramentas/meu-chat/` — app inteiro aqui dentro
- `ferramentas/organizador.html` — Organizador de Documentos
- `ferramentas/perito.html` — Perito de Metadados
- `ferramentas/transcrever.html` — Transcrever Áudio
- `ferramentas/verificador-citacoes.html` — Verificador de Citações

## 🗺 Mapa dos arquivos (tirado do cabeçalho de cada arquivo)
| Arquivo | O que faz |
|---|---|
| `js/00-core.js` | (A LOCOMOTIVA: vem primeiro) Cria o "caixa comum" J que todos os módulos usam: J.$ / J.esc / J.aviso / J.pref (preferências) / J.db (banco do aparelho) J.baixar / J.compartilhar (Drive, WhatsApp…) / J.abrirAba / J.on / J.emit |
| `js/10-ia.js` | Fala com a IA. Principal: Google Gemini (chave grátis, AIza… ou AQ.…). Reserva: Groq (grátis, chave gsk_…) — se o Gemini der "limite", troca sozinho. O modelo antigo (gemini-1.5-flash) foi desligado pelo Google: era um dos motivos do app antigo não responder. Aqui ele tenta os modelos atuais. |
| `js/12-online.js` | ☁️ MODO ONLINE (IGUAL À REPLIT) (19/11) Com a nuvem ligada (Supabase com login OU o seu Neon), os documentos, modelos, ementas, conversas, regras e códigos ficam SÓ na nuvem — o aparelho (PWA/APK) não enche, e não existe mais "enviar e puxar": abriu em outro aparelho, está lá. Cada lista é lida quando a tela pede (e guardada 1 minuto na memória, para não gastar). Sem internet: guarda aqui e sobe sozinho quando a inte… |
| `js/12-voz.js` | 🎤 Ditado (falar e virar texto) e 🔊 leitura em voz NATURAL. A voz é a do Gemini (gente de verdade, não robô) — usa a mesma chave grátis. Voz "de robô" do aparelho NUNCA é usada. No navegador Edge, as vozes "Natural" da Microsoft (ex.: Francisca, Antonio) podem ser escolhidas. |
| `js/13-nuvem.js` | ☁️ NUVEM (Supabase) — 17/11 - O MESMO LOGIN e o MESMO Supabase do 💬 Meu Chat (entrou num, entrou no outro). - Tudo continua no aparelho (funciona sem internet); a nuvem COPIA e leva para o celular, o PC, outro aparelho. - Vai: documentos, modelos, ementas, histórico, conversas, regras, códigos e os seus dados (perfil). - NÃO vai: as chaves de IA, de pesquisa e do Drive (ficam só no aparelho). - Mesma tabela do Meu Ch… |
| `js/14-entrada.js` | 🔑 TELA DE LOGIN NA ENTRADA (17/11) Igual à Replit: abriu o app em qualquer aparelho (celular, PC, PWA, APK) → e-mail + senha → os seus processos aparecem. Ninguém cola endereço nenhum. 19/11: aparece sempre que você ainda não entrou (sem embutir nada): na 1ª vez cola a URL e a chave anon ali mesmo e 📋 copia o comando que cria a tabela. O 🐘 Neon continua do mesmo jeito, por dentro. |
| `js/15-importar.js` | Lê arquivos: PDF, Word (.docx), TXT, MD, RTF, HTML. PDF e Word usam bibliotecas que vêm da internet só na 1ª vez. Foto/escaneado (precisa de OCR): use a ferramenta 🧹 Limpador. |
| `js/16-internet.js` | 🌐 Pesquisa na internet para QUALQUER IA (Ollama, Groq, Claude, OpenAI…). O Gemini pesquisa sozinho. As outras usam a SUA chave de busca (Serper, Tavily ou Brave, todas com uso grátis) e recebem os resultados junto. Link colado no pedido: o app lê a página (leitor r.jina.ai, grátis). |
| `js/17-banco.js` | 🗄 BANCO (23/11) — igual ao painel do Neon Abre por ⚙️ Config → ☁️ Nuvem → 🗄 Banco. Mostra, sem ir no site do Supabase: • 📐 o ESQUEMA: cada tabela, para que serve e as colunas; • 🔎 CONFERIR: quais tabelas existem e quais faltam, e quantas linhas cada uma tem; • 🛠 CRIAR O QUE FALTA: copia o comando certo e abre o SQL Editor do SEU projeto; • 👁 VER AS LINHAS de cada tabela (toque numa para ver o conteúdo); • 🤖 PERGUNTAR… |
| `js/18-texto.js` | Transforma o texto que a IA devolve (com ##, **negrito**, listas) em texto formatado de verdade — para mostrar na tela e para o Editor/Word. |
| `js/20-processar.js` | ⚡ Processar: cole/abra o texto do processo → escolha o que fazer → resultado formatado → Editor, Word, ouvir, salvar ou conversar sobre ele. As ações vieram do "Assistente Jurídico Pro" antigo (mesmos pedidos). |
| `js/21-motor.js` | ⚙️ O MOTOR DO SEU JURÍDICO (17/11) Os textos abaixo vieram PALAVRA POR PALAVRA do servidor do SK Jurídico 1.7.x (server/routes/ai.ts: SYSTEM_PROMPT_BASE, ACTION_PROMPTS e os níveis de esforço). Agora rodam aqui no aparelho, sem servidor: o texto vai direto para a IA que você escolheu. |
| `js/22-drive.js` | ☁️ GOOGLE DRIVE DIRETO: manda e busca arquivos na SUA conta do Drive, numa pasta "Assistente Jurídico", sem precisar do app do Drive. Precisa de um "ID do cliente" (Client ID) do Google — é de graça, faz uma vez só (o passo a passo está em ⚙️ Config → ☁️ Google Drive). O app só enxerga os arquivos que ELE MESMO criou (permissão drive.file): não mexe no resto do seu Drive. Sem o ID configurado, continua como antes (o … |
| `js/25-regras.js` | 📜 O "cérebro" do seu escritório, que cresce com o tempo, SEM mexer no código: - Regras: como a IA deve escrever e processar (cole quantas quiser; liga/desliga). - Memória: o que a IA deve saber (dados do escritório, preferências, casos). - Minhas ações: pedidos que viram BOTÕES no ⚡ Processar. Tudo exporta/importa num arquivo (para guardar no Drive ou levar a outro aparelho). |
| `js/30-editor.js` | ✏️ Editor com formatação de verdade (folha A4, padrão ABNT): negrito, itálico, sublinhado, títulos, citação recuada, alinhamento, recuo da 1ª linha, listas, fonte e tamanho. Baixa em Word (.docx) de verdade. 🪄 IA na seleção: selecione um trecho e peça para melhorar, corrigir… |
| `js/35-docx.js` | ⬇ Word de VERDADE (.docx), feito aqui no aparelho, sem internet. Folha A4, margens ABNT (3/3/2/2 cm), Times 12, espaçamento 1,5, recuo de 2,5 cm na 1ª linha, citação recuada 4 cm em 10 pt, negrito/itálico/sublinhado, títulos, listas, tabelas e alinhamento. (O app antigo dependia de uma biblioteca da internet — por isso falhava.) |
| `js/40-conversa.js` | 💬 Conversa com a IA sobre o caso — por texto ou por VOZ. 📎 Contexto: o documento do Editor, o texto do Processar ou um arquivo. 🔁 Modo voz: você fala → a IA responde em voz natural → escuta de novo. As conversas ficam salvas no aparelho. |
| `js/50-documentos.js` | 📁 Documentos salvos no aparelho + 🕐 histórico do que a IA fez. Abrir no Editor, baixar em Word, mandar ao Drive, duplicar, apagar. 💾 Backup de tudo num arquivo só (e restaurar em outro aparelho). |
| `js/55-biblioteca.js` | 📐 Modelos (peças prontas com [CAMPOS]) e 📚 Ementas (jurisprudência que VOCÊ guarda — a IA só usa as que você marcar; nada inventado). 🪄 Preencher modelo com o caso: a IA completa os [CAMPOS] com o texto do ⚡ Processar. |
| `js/56-restaurar.js` | ♻️ RESTAURAR QUALQUER BACKUP (18/11) Escolha QUALQUER arquivo dos seus apps (backup do SK Jurídico, do Meu Chat, o ⬇ backup do 🗄 Banco/Neon, o banco antigo do SK Jurídico 1.7 da Replit…). Ele RECONHECE sozinho o formato, mostra o que achou e traz para o lugar certo. Sempre JUNTA (não apaga nada do que já está aqui). O que é do Meu Chat sai num arquivo pronto para restaurar lá. |
| `js/60-codigos.js` | 🧪 MEUS CÓDIGOS: playground que GUARDA. Para os seus códigos jurídicos (calculadoras, modelos em HTML, ferramentas antigas…). Cole ou importe (vários de uma vez, inclusive .zip), rode ao vivo (celular ou largo), veja/mexa no código, copie tudo, baixe, abra em tela própria. Fica no aparelho e entra no 💾 Backup de tudo (📁 Documentos). |
| `js/70-ferramentas.js` | 🧰 As ferramentas que já funcionam, cada uma no seu arquivo (ferramentas/), abertas aqui dentro. Ficam "vivas": trocar de aba não apaga o que estava sendo feito nelas. |
| `js/80-config.js` | ⚙️ Chave da IA (Gemini grátis + Groq de reserva), voz, seus dados e regras do escritório (a IA segue sempre). Tudo fica só neste aparelho. |
| `js/99-app.js` | (O ÚLTIMO VAGÃO: vem por último) Monta cada módulo na sua aba, liga as abas e o indicador da chave. |
| `js/janela-pc.js` | 🖥 JANELA DO PC (18/11) — igual ao Mini SK para PC: um botão para a janela ir de 📱 cara de celular → 📟 média → 🖥 tela cheia, e voltar. Só aparece no programa .exe. |
| `js/nuvem-embutida.js` | ☁️ SUPABASE EMBUTIDO (17/11 · 20/11: projeto do Maikon, conta maikonmg1@hotmail.com, chave publishable) Estas duas informações são PÚBLICAS de propósito (todo site que usa Supabase tem elas dentro). Quem protege os seus dados é o LOGIN (e-mail e senha) e a regra "cada um vê o seu" da tabela. Com elas aqui dentro, em qualquer aparelho o app abre a tela de login: e-mail + senha e pronto. ⚠ NUNCA coloque aqui a chave "s… |
| `js/tema.js` | 🎨 TEMA — trocar as cores do app (18/11). O mesmo arquivo em todos os apps do Maikon. Escuro (o de sempre) · Claro · Alto contraste (letra bem branca no preto) · Papel (sépia, cansa menos a vista). Cada app diz quais são as cores dele (window.TEMA_APP) e onde fica o botão 🎨. Fica guardado neste aparelho. Não muda nada do projeto, só as cores da tela. |
| `js/lib/nuvem-neon.js` | 🐘 Nuvem pelo NEON (17/11) — usada pelo Meu Chat e pelo SK Jurídico HTML. Você cola o endereço do banco (a "connection string" postgresql://…) e pronto: o app cria a tabela SOZINHO (não precisa rodar nada em inglês no site do Neon). ⚠ Esse endereço tem a SENHA do banco: fica só no seu aparelho (como uma chave de IA), nunca vai para a nuvem nem para backup aberto. É para uso SEU; para clientes, o Supabase com login. Us… |
| `js/lib/playground-replit.js` | ▶ PLAYGROUND IGUAL AO DA REPLIT (20/11) — usado pelo Meu Chat e pelo SK Jurídico HTML. Feito a partir do playground do seu jurídico da Replit (o que funcionava no celular e no PC): • modos HTML / React / Python · abas HTML, CSS e JS · "Documento completo" detectado sozinho; • 👁 Auto = resultado AO VIVO enquanto digita (roda AQUI DENTRO, não precisa baixar); • no celular em pé: botão </> (código) e 👁 (resultado), igua… |
| `js/lib/reconhecer.js` | ♻️ RECONHECER (18/11) — a mesma peça no Meu Chat, no SK Jurídico HTML e no 🗄 Banco. Recebe QUALQUER coisa que veio dos seus apps e diz sozinho O QUE É e PARA ONDE VAI: - backup do Meu Chat (.json) · backup do SK Jurídico HTML / Assistente Jurídico (.json) - o "⬇ backup" do 🗄 Banco (todas as tabelas) ou o próprio banco lido direto (Neon) - a tabela mc_itens (Meu Chat + jurídico na nuvem): separa por tipo - o banco ANT… |
| `js/lib/segredos.js` | 🛡 SEGREDOS (20/11) — reconhece CHAVES SECRETAS para elas não irem parar no chat, na IA nem na nuvem. Usado pelo Meu Chat e pelo SK Jurídico HTML. - ehSecreta(chave): true se for a chave "service_role", "sb_secret_…", token "sbp_…" etc. (A palavra "service_role" fica ESCONDIDA dentro da chave eyJ…: é preciso abrir a chave para ver.) - achar(texto): lista o que parece segredo no texto. - tampar(texto): troca cada segre… |

## 🤖 Como pedir para uma IA mexer aqui
1. Mande ESTE documento e diga o que quer.
2. A IA diz QUAIS arquivos precisa ver (pelo mapa). Mande só esses.
3. Ela devolve os arquivos INTEIROS, muda o número da versão e diz o que fez, o que não fez e o próximo passo.
