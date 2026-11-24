# Meu Chat — documentação

> Versão **18/11-B** · documentação gerada em 18/11/2026. Feita para o dono LER e para QUALQUER IA entender o projeto sem ler o código inteiro (mais barato e com menos erro). Para mexer numa parte, a IA abre só o arquivo dela (veja o mapa no fim).

## 📌 O que é
O **chat principal** do Maikon: conversa com qualquer IA (grátis ou paga), lembra dele, fala com voz natural, faz e testa código, mostra quanto gasta. É **HTML puro** (sem servidor): roda como PWA no celular e no PC, como APK, e também vem DENTRO do SK Jurídico, do Laboratório, do Laboratório 2 e do Caça-Bug (pasta `ferramentas/meu-chat`).

## ✨ Recursos (o que ele faz)
- **IAs**: Gemini, Groq, OpenRouter, OpenAI, DeepSeek, Claude, Perplexity e **Ollama** (aparece sozinho quando está ligado no PC ou no Termux). Várias chaves; quando uma acaba, passa para a próxima.
- **⚖️ Comparar**: a mesma pergunta para várias IAs ao mesmo tempo.
- **🧠 Memória**: vai junto em toda conversa. A IA guarda sozinha o que for importante (`[[lembrar: …]]`).
- **📌 Contextos**: cartões de assunto que liga e desliga.
- **🎭 Jeito**: um jeito de conversar igual para todas as IAs.
- **🧭 Guia**: o que é cada app do Maikon e como usar. **Liga/desliga** (desligado = só vai quando a pergunta é sobre os apps, para economizar).
- **🌐 Internet**: pesquisa e lê links (leitor grátis r.jina.ai).
- **📷 Fotos**: vão reduzidas (💰 → Fotos: 768/1024/1600 px). As fotos ANTIGAS não são mandadas de novo.
- **📎 Arquivos**: lê com os **acentos certos** (UTF-8 ou Windows-1252). **📦 .zip abre numa janela**: árvore, ver cada arquivo, marcar só o que vai (mostra os tokens). `.env` e `node_modules` nunca vão marcados.
- **🐙 Repositório público do GitHub pelo link**: mostra a árvore e baixa só os arquivos marcados.
- **🔗 Links e navegador interno**: guarda links, abre o site aqui dentro, 📥 traz o texto da página para a caixa (não gasta IA).
- **🔳 Ler QR Code** (câmera ou print), inclusive os QR em sequência do Colecionador (`CQR1|id|i|n|…`).
- **👁 Playground**: HTML e TSX/JSX funcionando na hora; os erros têm 💬 "mandar para a IA".
- **🧪 Testar** (sandbox): JavaScript num Worker (10 s no máximo) e Python (Pyodide). Resultado → 💬 para a IA.
- **💾 → 🧪 Meus códigos**: guarda os códigos com nome; vão para a nuvem.
- **💰 Gasto**: tokens de entrada/saída e custo em R$ de cada resposta; hoje/7/30 dias; preços editáveis; quantas mensagens vão junto; **✂️ Continuar numa conversa nova (enxuta)**.
- **🔔 Avisar quando ficar pronta** (apito + vibração + notificação) e **🔆 Tela acesa** enquanto escreve. Feito para o Ollama, que demora.
- **🎤 / 🔊 / 🙌 Mãos livres**: falar, ouvir e conversar por voz sem tocar.
- **☁️ Nuvem**: Supabase (login com e-mail e senha; "esqueci a senha") ou Neon (endereço `postgresql://`).
- **🔐 Cofre**: as chaves viajam TRANCADAS com senha (arquivo ou nuvem). Com o login, vão junto trancadas com a senha do login.
- **💾 Backup** de tudo e restaurar sem apagar.

## 🗄 Onde ficam os dados
- **No aparelho (IndexedDB `meuchat`)**: loja `conversas` (uma por conversa: `{id, titulo, msgs[], resumo, resumoAte, heranca, …}`) e loja `kv` (memória, contextos, chaves, `codigos`, `links`, `gasto`…). Preferências em `localStorage` com o prefixo `meuchat:`.
- **Na nuvem (tabela única `mc_itens`)**: colunas `tipo, id, dados (jsonb), apagado, atualizado (bigint)`; no Supabase também `user_id` com a regra "cada um vê o seu" (RLS). Tipos do Meu Chat: `conversa`, `memoria`, `prefs`, `codigo`, `cofre`. O jurídico usa `jur:*` na MESMA tabela.
- Sincroniza sozinho: ao abrir, a cada minuto, ao voltar para o app e logo depois de cada mudança. Cada mudança ganha uma hora única; a descida usa cursor (atualizado, tipo, id) em pedaços de 25 linhas (o Neon recusa resposta acima de 64 MB).
- **Nunca vão para a nuvem**: fotos, as chaves abertas, o endereço do Neon aberto.
- Supabase embutido: `js/nuvem-embutida.js` (URL + chave anon PÚBLICA). Vazio = sem tela de login.

## 🧩 Como é montado
Cada arquivo em `js/` é uma peça; todas penduram funções no objeto global **`MC`** (`MC.ia`, `MC.chat`, `MC.nuvem`, `MC.memoria`, `MC.gasto`, `MC.codigos`…). A ordem de carregar está no `index.html`. O `sw.js` guarda os arquivos para abrir sem internet (lista `ARQS`: arquivo novo tem que entrar nela).

## 🛡 Regras que NÃO podem quebrar (para qualquer IA que mexer aqui)
1. **Entregar o arquivo INTEIRO**, nunca "troque este pedaço" (o dono não programa).
2. **Nunca guardar nem pedir segredo** (chave de IA, token, senha) em arquivo do projeto. Chaves ficam só no aparelho (ou no cofre TRANCADO com senha). Nada de `.env` nem `local.config.json` no zip.
3. **Nunca apagar de vez**: o que apaga pede confirmação (ou CONFIRMO), e sempre que der vai para lixeira/quarentena.
4. **Voz**: só voz natural grátis (a do aparelho, como `pt-br-x-pte`, ou a "Francisco"). Nada de voz robótica.
5. **Português simples** em toda tela e mensagem. O dono não lê inglês.
6. Repositórios no GitHub: **sempre privados**.
7. **Toda versão nova muda o número de versão visível** (ex.: 18/11-A → 18/11-B).

## 🧰 Ferramentas que vêm dentro
(nenhuma)

## 🗺 Mapa dos arquivos (tirado do cabeçalho de cada arquivo)
| Arquivo | O que faz |
|---|---|
| `js/00-base.js` | peças comuns (MC). |
| `js/10-banco.js` | onde tudo fica guardado (IndexedDB do aparelho — não some ao fechar). |
| `js/12-nuvem.js` | ☁️ NUVEM (Supabase) — 17/11 - O chat continua funcionando SEM internet: tudo fica no aparelho (IndexedDB). - Com a nuvem ligada, ele COPIA para o Supabase e traz de volta em qualquer aparelho (celular, PC, outro celular) entrando com o mesmo e-mail e senha. - Vai para a nuvem: conversas (as fotos ficam só no aparelho, para não encher), memória, configurações e contextos. As CHAVES DE IA não vão — só se você mandar, T… |
| `js/14-entrada.js` | 🔑 TELA DE LOGIN NA ENTRADA (17/11) Igual à Replit: abriu o Meu Chat em qualquer lugar (celular, PC, PWA, APK) → e-mail + senha → as conversas, a memória, os códigos guardados E as chaves de IA aparecem. Ninguém cola endereço. Só aparece quando o Supabase vem EMBUTIDO (js/nuvem-embutida.js) e você ainda não entrou aqui. Dentro do SK Jurídico/Laboratório ela não aparece (lá quem cuida do login é o app de fora). |
| `js/20-provedores.js` | conversar com as IAs (Gemini, Groq, OpenRouter, OpenAI, DeepSeek, Claude). - Várias chaves; quando uma acaba (limite/cota), passa sozinho para a próxima ("revezar"). - Busca a lista de modelos de verdade na hora de testar a chave (nada de nome velho chumbado). - As chaves ficam SÓ neste aparelho. |
| `js/30-memoria.js` | 🧠 a memória que vai junto em TODA conversa. A IA guarda sozinha o que for importante escrevendo [[lembrar: …]] no fim da resposta (o app tira isso do texto, guarda e mostra "🧠 guardei"). [[esquecer: …]] apaga. |
| `js/33-contextos.js` | 📌 CONTEXTOS — "cartões" de assunto que você LIGA e DESLIGA. Diferente da 🧠 memória (que vale para sempre e vai em tudo): um contexto é o resumo de um assunto ou de uma conversa (por exemplo, o que você vinha fazendo com o Claude), para a IA não começar do zero. Ligado = vai junto em toda conversa. Desligado = fica guardado, sem gastar. Ficam só neste aparelho (e vão no ⤓ Backup). Chaves e senhas escritas aqui vão esc… |
| `js/34-guia.js` | 🧭 Painel do Guia (16/11): o que é cada app do Maikon, a versão atual e COMO USAR, passo a passo. 🔊 lê em voz alta (voz Francisco ou a do aparelho) · 🤖 Perguntar: o chat explica aquele app. |
| `js/35-jeito.js` | 🎭 O JEITO DE CADA IA. Para não ter "mudança drástica" quando troca de IA: um jeito de conversar que vale para TODAS (parceiro, calmo, honesto) e, se quiser, um jeito só de uma (ex.: o Perplexity como pesquisador jurídico que sempre traz as fontes). Tudo editável em ⚙️ → 🎭 Jeito de cada IA. |
| `js/36-gasto.js` | 💰 QUANTO GASTOU (17/11) Igual ao da Monica: embaixo de cada resposta aparece quantos "tokens" foram e quanto custou, e o painel 💰 mostra o gasto de hoje, da semana e do mês, por IA. - "Entrada" = tudo que vai junto na pergunta: regras, memória, guia, contextos e o HISTÓRICO da conversa. Por isso conversa comprida fica mais cara a cada pergunta. - "Saída" = a resposta da IA. - Os preços são APROXIMADOS (dólar por 1 mi… |
| `js/37-arquivos.js` | 📎 ARQUIVOS, 📦 ZIP e 🔤 ACENTOS (17/11) - 🔤 Lê qualquer texto com os acentos certos: tenta UTF-8 e, se não for, Windows-1252/Latin-1 (era o "negócio de UTF-8" que fazia outros sites não lerem o arquivo). - 📦 Projeto .zip: abre AQUI DENTRO, mostra a árvore, deixa ver cada arquivo e você marca só o que vai para a IA (mostra quanto vai custar em tokens). Antes ia tudo e saía caro. |
| `js/38-codigos.js` | 🧪 MEUS CÓDIGOS (17/11) Igual ao playground do jurídico original: cada código que a IA fizer tem o botão 💾 Guardar. Ficam aqui, com nome, e vão para a nuvem (com o login, aparecem em qualquer aparelho). Abrir = abre no ▶ playground (ver funcionando e mexer). Nada some sem você confirmar. |
| `js/39-qr.js` | 🔳 LER QR CODE (17/11) Aponta a câmera (ou escolhe um print) e o texto do QR vai para a caixa de mensagem. Entende os QR em sequência do Colecionador ("1 de 5, 2 de 5…"): junta sozinho, em qualquer ordem. |
| `js/40-voz.js` | 🎤 falar (ditado) e 🔊 ouvir a resposta. 🔊 DOIS "motores" de voz (⚙️ → Voz): - 📱 "Voz do aparelho" (o padrão): funciona com QUALQUER IA (Gemini, Groq, Claude, Ollama…), grátis e sem limite. Você escolhe a voz (as ⭐ são as naturais), a velocidade e o tom (o seu jurídico usava 1.15 e 0.95). Ela COMEÇA A FALAR ENQUANTO O TEXTO AINDA ESTÁ CHEGANDO, frase por frase — não espera terminar de escrever. · No APK: usa as vozes d… |
| `js/41-pronto.js` | 🔔 AVISO DE "RESPOSTA PRONTA" (18/11) Para o Ollama (ou qualquer IA lenta): você manda a pergunta, vai mexer em outra coisa, e quando a resposta termina o celular/PC APITA, VIBRA e mostra uma NOTIFICAÇÃO. 🔆 "Tela acesa": enquanto ela escreve, o aparelho não apaga a tela (assim o Android não pausa o app no meio). Funciona no PWA, no APK e no PC (Chrome/Edge). Limite honesto: se você FECHAR o app (arrastar para fora), e… |
| `js/42-testar.js` | 🧪 TESTAR O CÓDIGO AQUI DENTRO (a "sandbox") (18/11) Sandbox = uma caixa FECHADA onde o código roda sem mexer em nada seu. - JavaScript: roda num "trabalhador" separado, com tempo máximo de 10 segundos (se travar num laço infinito, ele é desligado). Mostra o console.log e os erros. - Python: roda com o Pyodide (Python dentro do navegador). Na 1ª vez baixa ~10 MB (precisa de internet). - HTML/TSX: continua no ▶ Ver fun… |
| `js/43-links.js` | 🔗 LINKS E NAVEGADOR INTERNO (18/11) Um "colador de links" aqui dentro, que NÃO gasta nada da IA: - guarde os seus links (versões dos apps, repositórios, sites de tribunal…); - 🌐 Abrir aqui: abre o site numa janela dentro do Meu Chat (alguns sites não deixam: aí use ↗ Abrir fora); - 📥 Trazer o texto: pega o texto da página (leitor grátis) e coloca na caixa — VOCÊ decide se manda para a IA; - 📋 Copiar o link. Só gasta … |
| `js/44-docs.js` | 📄 DOCUMENTAÇÃO DOS PROJETOS (18/11) Cada projeto tem um README.md completo (o que é, recursos, onde ficam os dados, regras e o MAPA dos arquivos). Aqui você escolhe um e ele entra na conversa SÓ AGORA — não vai em toda mensagem. Serve para a IA (qualquer uma, inclusive o Claude) entender o projeto sem ler o código inteiro. |
| `js/50-internet.js` | 🌐 pesquisar e 🔗 ler links. - Gemini e Claude pesquisam sozinhos (a busca vem embutida neles). - As outras IAs: usa a SUA chave de busca (Serper, Tavily ou Brave), se tiver, e manda os resultados junto. - Link na mensagem: o app lê a página (pelo leitor r.jina.ai, grátis) e manda o texto para a IA. |
| `js/60-previa.js` | 👁 ver o código funcionando, na hora. - HTML: abre a página como ela é. - TSX / JSX (React): monta com React + Babel + Tailwind (pela internet) e mostra o componente. Os erros aparecem embaixo, em vermelho. |
| `js/70-texto.js` | mostra a resposta da IA bonitinha (negrito, listas, links, blocos de código com 📋 copiar, ⤓ baixar e 👁 ver funcionando). |
| `js/80-chat.js` | a conversa (mensagens, fotos, mandar, parar, lista de conversas). Cada conversa fica guardada no aparelho. Vai para a IA: a memória + as últimas mensagens. |
| `js/85-config.js` | ⚙️ chaves das IAs, modelo, busca, voz, instruções, tema. |
| `js/87-cofre.js` | 🔐 Cofre de chaves. Mostra cada chave guardada (👁 ver, 📋 copiar) e leva SÓ as chaves para outro app/aparelho num arquivo trancado com senha — o mesmo arquivo do Mini SK (js/lib/cofre-arquivo.js). |
| `js/90-backup.js` | 💾 backup de tudo (conversas + memória + ajustes) e restaurar SEM APAGAR NADA. |
| `js/95-ponte-lab.js` | 🔬 Ponte com o Laboratório: quando o Meu Chat está DENTRO do Laboratório (aba 🤖 IA), o Laboratório pode mandar texto para a caixa de escrever (o plano do projeto, a memória, a comparação A × B). Só aceita mensagens da própria página (mesmo endereço). |
| `js/99-app.js` | liga tudo quando abre. |
| `js/nuvem-embutida.js` | ☁️ SUPABASE EMBUTIDO (17/11) Estas duas informações são PÚBLICAS de propósito (todo site que usa Supabase tem elas dentro). Quem protege os seus dados é o LOGIN (e-mail e senha) e a regra "cada um vê o seu" da tabela. Com elas aqui dentro, em qualquer aparelho o app abre a tela de login: e-mail + senha e pronto. ⚠ NUNCA coloque aqui a chave "service_role" nem a senha do banco — essas são secretas. Deixe vazio ('') pa… |
| `js/lib/cofre-arquivo.js` | 🔐 Arquivo de chaves do Maikon — o MESMO formato no Mini SK, no Meu Chat e no que vier depois. Guarda SÓ as chaves (IA, GitHub, Expo, pesquisa e "Minhas chaves"), trancadas com uma senha sua (AES-GCM 256 + PBKDF2 com 250 mil voltas — sem a senha, o arquivo não abre). Assim dá para levar as chaves de um app/aparelho para outro sem passar pelo WhatsApp. |
| `js/lib/guia-maikon.js` | 🧭 Guia das ferramentas do Maikon — o MESMO texto em todos os apps (Mini SK, Meu Chat…). A IA de cada app lê isto sozinha: assim ela já sabe o que ele tem, para que serve cada coisa, e quando é melhor mandar para outra ferramenta ou "levar para o Claude". Para atualizar: troque este arquivo nos apps (o Claude manda a versão nova junto). |
| `js/lib/guia-versoes.js` | 🧭 Guia das VERSÕES — o que é cada app do Maikon, qual a versão atual, e COMO USAR (passo a passo). Uma fonte só: o painel 🧭 do Meu Chat mostra isto para ele ler, e a IA recebe o mesmo texto (junto do guia-maikon.js) para saber explicar. Atualizado pelo Claude a cada versão nova. |
| `js/lib/jszip.min.js` | ! JSZip v3.10.1 - A JavaScript class for generating and reading zip files <http://stuartk.com/jszip> (c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com> Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown. JSZip uses the library pako released under the MIT license : https://github.com/nodeca/pako/blob/main/LICENSE |
| `js/lib/nuvem-neon.js` | 🐘 Nuvem pelo NEON (17/11) — usada pelo Meu Chat e pelo SK Jurídico HTML. Você cola o endereço do banco (a "connection string" postgresql://…) e pronto: o app cria a tabela SOZINHO (não precisa rodar nada em inglês no site do Neon). ⚠ Esse endereço tem a SENHA do banco: fica só no seu aparelho (como uma chave de IA), nunca vai para a nuvem nem para backup aberto. É para uso SEU; para clientes, o Supabase com login. Us… |

## 🤖 Como pedir para uma IA mexer aqui
1. Mande ESTE documento e diga o que quer.
2. A IA diz QUAIS arquivos precisa ver (pelo mapa). Mande só esses.
3. Ela devolve os arquivos INTEIROS, muda o número da versão e diz o que fez, o que não fez e o próximo passo.
