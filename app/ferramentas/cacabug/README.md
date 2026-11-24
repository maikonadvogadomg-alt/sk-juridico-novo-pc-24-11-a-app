# Caça-Bug — documentação

> Versão **1.6** · documentação gerada em 18/11/2026. Feita para o dono LER e para QUALQUER IA entender o projeto sem ler o código inteiro (mais barato e com menos erro). Para mexer numa parte, a IA abre só o arquivo dela (veja o mapa no fim).

## 📌 O que é
Acha os **defeitos de verdade** num projeto (botão que não funciona, tela branca, erro), compara com quando funcionava e gera o zip limpo. Celular e PC (.exe, porta 7710). Também vem inteiro dentro do Laboratório e do SK Jurídico.

## ✨ Recursos
- **Projetos**: importar (.zip, arquivos soltos, pasta) e **🩺 Diagnóstico rápido**.
- **🧰 Ferramentas** (pasta `ferramentas/`, montadas pelo `montar.py` na ordem de `ordem.txt`): Cirurgião, Projeto Lab, Triagem, Raio-X, Analisador universal, Desembrulhar, Gerador EAS, AI Code Studio. Cada ferramenta recebe o projeto pelo `__hub.abrir(arquivo, 'A')`.
- **🗂 Organizar**, **🧼 Zip limpo** (tira node_modules, .git, restos da Replit, logs e **senhas**; o original não muda), **📋 Relatórios** guardados, **⚖️ Comparar versões**.
- **🤖 IA** (o Meu Chat aqui dentro; dentro do jurídico ele usa `../meu-chat`) e **💻 Terminal de verdade**.
- Recebe projeto do Laboratório por `window.__receber(arquivo)` (não duplica: mesmo nome e tamanho = só escolhe).

## 🗄 Onde ficam os dados
IndexedDB próprio: `projetos`, `relatorios`, `kv`.

## 🧩 Como é montado
Mesma base do Mini SK (objeto **`SK`**, banco próprio). `99-app.js` liga as abas.

## 🛡 Regras que NÃO podem quebrar (para qualquer IA que mexer aqui)
1. **Entregar o arquivo INTEIRO**, nunca "troque este pedaço" (o dono não programa).
2. **Nunca guardar nem pedir segredo** (chave de IA, token, senha) em arquivo do projeto. Chaves ficam só no aparelho (ou no cofre TRANCADO com senha). Nada de `.env` nem `local.config.json` no zip.
3. **Nunca apagar de vez**: o que apaga pede confirmação (ou CONFIRMO), e sempre que der vai para lixeira/quarentena.
4. **Voz**: só voz natural grátis (a do aparelho, como `pt-br-x-pte`, ou a "Francisco"). Nada de voz robótica.
5. **Português simples** em toda tela e mensagem. O dono não lê inglês.
6. Repositórios no GitHub: **sempre privados**.
7. **Toda versão nova muda o número de versão visível** (ex.: 18/11-A → 18/11-B).

## 🧰 Ferramentas que vêm dentro
- `ferramentas/ai-code-studio.js`
- `ferramentas/analisador-universal.js`
- `ferramentas/cirurgiao.js`
- `ferramentas/desembrulhar.js`
- `ferramentas/gerador-eas.js`
- `ferramentas/meu-chat/` — app inteiro aqui dentro
- `ferramentas/montar.py`
- `ferramentas/ordem.txt`
- `ferramentas/projeto-lab.js`
- `ferramentas/raiox.js`
- `ferramentas/triagem.js`

## 🗺 Mapa dos arquivos (tirado do cabeçalho de cada arquivo)
| Arquivo | O que faz |
|---|---|
| `js/00-core.js` | (a mesma base do Mini SK, com banco próprio) Base de tudo: atalhos, eventos, avisos, janelas de confirmação e o banco de dados do navegador (IndexedDB), onde os projetos ficam salvos. |
| `js/20-zip.js` | (o mesmo do Mini SK) Lê e cria arquivos .zip SEM biblioteca externa (funciona offline). Usa o descompactador que já vem no navegador (DecompressionStream). |
| `js/30-projeto.js` | Projetos: importar (.zip, arquivos soltos ou pasta), guardar no aparelho, escolher o projeto ativo e fazer o DIAGNÓSTICO RÁPIDO: - que tipo de projeto é (Replit, Vite/React, Expo, Capacitor, servidor, PWA); - quais apps existem dentro (ex.: pasta artifacts/ do Replit); - se ABRE PELO INDEX ou não, e por quê (a "barra" do /assets, código-fonte, módulo, servidor); - o "lacre" (COOP/COEP) do terminal real; - chaves/senh… |
| `js/40-ferramentas.js` | Abre cada ferramenta (Cirurgião, Projeto Lab, Triagem, Perito…) DENTRO do app, sem mexer no jeito delas funcionarem: - entrega o projeto ativo automaticamente (não precisa importar de novo); - faz "baixar" funcionar dentro delas (no celular e no APK); - "📌 Guardar relatório" guarda o resultado na aba 📋 Relatórios. Cada ferramenta fica em ferramentas/<nome>.js e se registra em window.CB_FERRAMENTAS (dá para acrescenta… |
| `js/45-organizar.js` | Aba 🗂️ Organizar: pega o projeto em uso (aquela pasta "embolada") e devolve tudo separado — usa js/lib/organizar-core.js. |
| `js/46-limpo.js` | 🧼 ZIP LIMPO (16/11) Projeto baixado da Replit vem com tudo: node_modules, .git, .cache, .local, .upm, restos da Replit, logs… e às vezes senhas (.env). Aqui você escolhe o que tirar e o Caça-Bug guarda uma CÓPIA limpa. O original NUNCA muda. Não precisa do terminal: roda aqui mesmo, no aparelho. |
| `js/50-relatorios.js` | 📋 Relatórios guardados: cada análise fica salva no aparelho, com data, ferramenta e projeto. Não some quando você sai da ferramenta. Abrir · copiar · baixar · mandar (Drive/WhatsApp) · apagar. "Baixar todos" junta tudo num .zip. |
| `js/60-comparar.js` | ⚖️ Comparar versões: escolha 2 ou mais projetos guardados e veja - a tabela de RECURSOS por versão (IA, voz, PDF, Word, DJEN…) ✓ / — - arquivos: só numa, só na outra, mudaram, iguais - funções, rotas e telas que existem numa versão e faltam na outra Serve para saber o que dá para APROVEITAR de cada versão. |
| `js/70-ia.js` | 🤖 IA O MEU CHAT aqui dentro: as suas chaves (Gemini, Groq, OpenRouter…), o 🦙 Ollama sozinho quando estiver ligado (no PC ou no Termux), voz, internet e fotos. Os botões 📎 colocam na caixa do chat o DIAGNÓSTICO, o PLANO, um RELATÓRIO guardado ou um ARQUIVO do projeto — aí é só perguntar "o que está errado?". |
| `js/80-terminal.js` | 💻 TERMINAL DE VERDADE (16/11) O mesmo terminal do Laboratório (o que não cai): ▶ Ligar tudo · 🚀 Rodar · ⏹ Parar · 🦙 Ollama · 🗣 Voz Francisco · 🧰 Verificar e instalar · 🩺 Terminal parado? + 🔎 Análise (git log/diff, achar lixo, arquivos grandes, pacotes sem uso) e 🧼 Zip limpo. - Celular: Termux (ttyd ws://127.0.0.1:7681/ws + ponte 7683) · Computador: Caça-Bug PC (liga sozinho). O projeto em uso vai para ~/laboratorio/N… |
| `js/99-app.js` | Liga tudo: abas de baixo, tela de Projetos e tela de Diagnóstico. |
| `js/tema.js` | 🎨 TEMA — trocar as cores do app (18/11). O mesmo arquivo em todos os apps do Maikon. Escuro (o de sempre) · Claro · Alto contraste (letra bem branca no preto) · Papel (sépia, cansa menos a vista). Cada app diz quais são as cores dele (window.TEMA_APP) e onde fica o botão 🎨. Fica guardado neste aparelho. Não muda nada do projeto, só as cores da tela. |
| `js/lib/expo-core.js` | expo-core.js — ☁️ Consertar um projeto EXPO para gerar APK pelo EAS Usado pelo Caça-Bug (Diagnóstico) e pelo Mini SK (painel ☁️ EAS). Junta o que os geradores antigos faziam separado (app.json, eas.json, autorizações, receita do GitHub) + limpeza da Replit, numa passada só. ExpoConserto.ler(arquivos) → dados atuais (para preencher o formulário) ExpoConserto.consertar(arquivos, cfg) → { arquivos, apagados, relato, avi… |
| `js/lib/organizar-core.js` | organizar-core.js — 🗂️ Organizar a bagunça (sem IA, sem internet) Recebe uma pilha de arquivos (pastas repetidas, versões, .md com vários códigos colados) e devolve tudo separado e explicado: - corta .md/.txt com várias páginas/códigos colados em PEÇAS separadas; - acha CÓPIAS iguais (mesmo conteúdo, nome ou pasta diferente); - agrupa VERSÕES do mesmo arquivo e escolhe a MELHOR (completa, maior); - avisa o que está I… |
| `js/lib/plano-core.js` | plano-core.js — 📋 Gerador de PLANO do projeto (sem IA, sem internet) Usado pelo Mini SK (🏗️ Preparar) e pelo Caça-Bug (Diagnóstico). Ideia do gerador de plano do DevMobile, mas completo: - telas/páginas (React Router, wouter, Expo Router, Next, páginas .html) - rotas do BACKEND (Express, Hono, Fastify, router.*) - chamadas que o APP faz (fetch, axios, apiRequest, useQuery) - CRUZAMENTO: o que o app pede e o backend n… |

## 🤖 Como pedir para uma IA mexer aqui
1. Mande ESTE documento e diga o que quer.
2. A IA diz QUAIS arquivos precisa ver (pelo mapa). Mande só esses.
3. Ela devolve os arquivos INTEIROS, muda o número da versão e diz o que fez, o que não fez e o próximo passo.
