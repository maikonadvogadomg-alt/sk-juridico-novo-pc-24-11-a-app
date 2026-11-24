# 🧬 Receita para recriar: Caça-Bug

_Gerada sem IA, lendo 179 arquivo(s). Serve para remontar este app como HTML modular — com qualquer IA, um arquivo por vez._

## 1. O que é

- **Nome:** Caça-Bug
- **Partes de código:** 140 (34 tela, 103 logica, 0 servidor, 0 dados, 3 estilo)
- **Tem servidor (rotas /api):** não — dá para ser só HTML
- **Peças de fora (bibliotecas):** @capacitor/cli, child_process, crypto, electron, fs, http, msedge-tts, net, os, path, ws

## 2. Estrutura modular proposta

```
index.html            ← a página; chama os módulos NA ORDEM
css/app.css           ← o visual
js/00-core.js         ← a "locomotiva": cria window.APP (registrar, guardar, avisar)
js/10-ai-code-studio.js← Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite a (era app/ferramentas/cacabug/ferramentas/ai-code-studio.js)
js/15-analisador-universal.js← Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite a (era app/ferramentas/cacabug/ferramentas/analisador-universal.js)
js/20-cirurgiao.js    ← Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite a (era app/ferramentas/cacabug/ferramentas/cirurgiao.js)
js/25-desembrulhar.js ← Ferramenta do Caça-Bug — vinda do Laboratório (16/11) (era app/ferramentas/cacabug/ferramentas/desembrulhar.js)
js/30-gerador-eas.js  ← Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite a (era app/ferramentas/cacabug/ferramentas/gerador-eas.js)
js/35-montar.js       ← Monta ferramentas/*.js do Caça-Bug a partir dos HTML originais (sem me (era app/ferramentas/cacabug/ferramentas/montar.py)
js/40-projeto-lab.js  ← Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite a (era app/ferramentas/cacabug/ferramentas/projeto-lab.js)
js/45-raiox.js        ← Ferramenta do Caça-Bug — vinda do Laboratório (16/11) (era app/ferramentas/cacabug/ferramentas/raiox.js)
js/50-triagem.js      ← Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite a (era app/ferramentas/cacabug/ferramentas/triagem.js)
js/55-zip.js          ← Caça-Bug — 20-zip.js (o mesmo do Mini SK) Lê e cria arquivos .zip SEM  (era app/ferramentas/cacabug/js/20-zip.js)
js/60-projeto.js      ← Caça-Bug — 30-projeto.js Projetos: importar (.zip, arquivos soltos ou  (era app/ferramentas/cacabug/js/30-projeto.js)
js/65-ferramentas.js  ← Caça-Bug — 40-ferramentas.js Abre cada ferramenta (Cirurgião, Projeto  (era app/ferramentas/cacabug/js/40-ferramentas.js)
js/70-organizar.js    ← Caça-Bug — 45-organizar.js Aba 🗂️ Organizar: pega o projeto em uso (a (era app/ferramentas/cacabug/js/45-organizar.js)
js/75-limpo.js        ← Caça-Bug 1.4 — 46-limpo.js · 🧼 ZIP LIMPO (16/11) Projeto baixado da R (era app/ferramentas/cacabug/js/46-limpo.js)
js/80-relatorios.js   ← Caça-Bug — 50-relatorios.js 📋 Relatórios guardados: cada análise fica (era app/ferramentas/cacabug/js/50-relatorios.js)
js/85-comparar.js     ← Caça-Bug — 60-comparar.js ⚖️ Comparar versões: escolha 2 ou mais proje (era app/ferramentas/cacabug/js/60-comparar.js)
js/90-ia.js           ← Caça-Bug — 70-ia.js · 🤖 IA O MEU CHAT aqui dentro: as suas chaves (Ge (era app/ferramentas/cacabug/js/70-ia.js)
js/91-terminal.js     ← Caça-Bug 1.4 — 80-terminal.js · 💻 TERMINAL DE VERDADE (16/11) O mesmo (era app/ferramentas/cacabug/js/80-terminal.js)
js/92-janela-pc.js    ← 🖥 JANELA DO PC (18/11) — igual ao Mini SK para PC: um botão para a ja (era app/ferramentas/cacabug/js/janela-pc.js)
js/93-expo-core.js    ← expo-core.js — ☁️ Consertar um projeto EXPO para gerar APK pelo EAS Us (era app/ferramentas/cacabug/js/lib/expo-core.js)
js/94-organizar-core.js← logica (era app/ferramentas/cacabug/js/lib/organizar-core.js)
js/95-plano-core.js   ← logica (era app/ferramentas/cacabug/js/lib/plano-core.js)
js/96-tema.js         ← 🎨 TEMA — trocar as cores do app (18/11). O mesmo arquivo em todos os  (era app/ferramentas/cacabug/js/tema.js)
js/97-base.js         ← Meu Chat — 00-base.js: peças comuns (MC) (era app/ferramentas/meu-chat/js/00-base.js)
js/98-banco.js        ← Meu Chat — 10-banco.js: onde tudo fica guardado (IndexedDB do aparelho (era app/ferramentas/meu-chat/js/10-banco.js)
js/98-online.js       ← Meu Chat — 11-online.js · ☁️ MODO ONLINE (IGUAL À REPLIT) (19/11) Ante (era app/ferramentas/meu-chat/js/11-online.js)
js/98-nuvem.js        ← Meu Chat — 12-nuvem.js · ☁️ NUVEM (Supabase) — 17/11 - O chat continua (era app/ferramentas/meu-chat/js/12-nuvem.js)
js/98-entrada.js      ← Meu Chat — 14-entrada.js · 🔑 TELA DE LOGIN NA ENTRADA (17/11) Igual à (era app/ferramentas/meu-chat/js/14-entrada.js)
js/98-provedores.js   ← Meu Chat — 20-provedores.js: conversar com as IAs (Gemini, Groq, OpenR (era app/ferramentas/meu-chat/js/20-provedores.js)
js/98-memoria.js      ← Meu Chat — 30-memoria.js: 🧠 a memória que vai junto em TODA conversa. (era app/ferramentas/meu-chat/js/30-memoria.js)
js/98-contextos.js    ← Meu Chat — 33-contextos.js: 📌 CONTEXTOS — "cartões" de assunto que vo (era app/ferramentas/meu-chat/js/33-contextos.js)
js/98-guia.js         ← 🧭 Painel do Guia (16/11): o que é cada app do Maikon, a versão atual  (era app/ferramentas/meu-chat/js/34-guia.js)
js/98-jeito.js        ← Meu Chat — 35-jeito.js: 🎭 O JEITO DE CADA IA. Para não ter "mudança d (era app/ferramentas/meu-chat/js/35-jeito.js)
js/98-gasto.js        ← Meu Chat — 36-gasto.js · 💰 QUANTO GASTOU (17/11) Igual ao da Monica:  (era app/ferramentas/meu-chat/js/36-gasto.js)
js/98-arquivos.js     ← Meu Chat — 37-arquivos.js · 📎 ARQUIVOS, 📦 ZIP e 🔤 ACENTOS (17/11) - (era app/ferramentas/meu-chat/js/37-arquivos.js)
js/98-codigos.js      ← Meu Chat — 38-codigos.js · 🧪 MEUS CÓDIGOS (17/11) Igual ao playground (era app/ferramentas/meu-chat/js/38-codigos.js)
js/98-qr.js           ← Meu Chat — 39-qr.js · 🔳 LER QR CODE (17/11) Aponta a câmera (ou escol (era app/ferramentas/meu-chat/js/39-qr.js)
js/98-voz.js          ← Meu Chat — 40-voz.js: 🎤 falar (ditado) e 🔊 ouvir a resposta. 🔊 DOIS (era app/ferramentas/meu-chat/js/40-voz.js)
js/98-pronto.js       ← Meu Chat — 41-pronto.js · 🔔 AVISO DE "RESPOSTA PRONTA" (18/11) Para o (era app/ferramentas/meu-chat/js/41-pronto.js)
js/98-testar.js       ← Meu Chat — 42-testar.js · 🧪 TESTAR O CÓDIGO AQUI DENTRO (a "sandbox") (era app/ferramentas/meu-chat/js/42-testar.js)
js/98-links.js        ← Meu Chat — 43-links.js · 🔗 LINKS E NAVEGADOR INTERNO (18/11) Um "cola (era app/ferramentas/meu-chat/js/43-links.js)
js/98-docs.js         ← Meu Chat — 44-docs.js · 📄 DOCUMENTAÇÃO DOS PROJETOS (18/11) Cada proj (era app/ferramentas/meu-chat/js/44-docs.js)
js/98-mesa.js         ← Meu Chat — 45-mesa.js · 🧰 MESA DO LADO (18/11) — para tela grande (co (era app/ferramentas/meu-chat/js/45-mesa.js)
js/98-internet.js     ← Meu Chat — 50-internet.js: 🌐 pesquisar e 🔗 ler links. - Gemini e Cla (era app/ferramentas/meu-chat/js/50-internet.js)
js/98-previa.js       ← Meu Chat — 60-previa.js: 👁 ver o código funcionando, na hora. - HTML: (era app/ferramentas/meu-chat/js/60-previa.js)
js/98-texto.js        ← Meu Chat — 70-texto.js: mostra a resposta da IA bonitinha (negrito, li (era app/ferramentas/meu-chat/js/70-texto.js)
js/98-chat.js         ← Meu Chat — 80-chat.js: a conversa (mensagens, fotos, mandar, parar, li (era app/ferramentas/meu-chat/js/80-chat.js)
js/98-config.js       ← Meu Chat — 85-config.js: ⚙️ chaves das IAs, modelo, busca, voz, instru (era app/ferramentas/meu-chat/js/85-config.js)
js/98-cofre.js        ← Meu Chat — 87-cofre.js: 🔐 Cofre de chaves. Mostra cada chave guardada (era app/ferramentas/meu-chat/js/87-cofre.js)
js/98-backup.js       ← Meu Chat — 90-backup.js: 💾 backup de tudo (conversas + memória + ajus (era app/ferramentas/meu-chat/js/90-backup.js)
js/98-restaurar.js    ← Meu Chat — 91-restaurar.js · ♻️ RESTAURAR QUALQUER BACKUP (18/11) O ⤒  (era app/ferramentas/meu-chat/js/91-restaurar.js)
js/98-ponte-lab.js    ← 🔬 Ponte com o Laboratório: quando o Meu Chat está DENTRO do Laboratór (era app/ferramentas/meu-chat/js/95-ponte-lab.js)
js/98-janela-pc.js    ← 🖥 JANELA DO PC (18/11) — igual ao Mini SK para PC: um botão para a ja (era app/ferramentas/meu-chat/js/janela-pc.js)
js/98-cofre-arquivo.js← 🔐 Arquivo de chaves do Maikon — o MESMO formato no Mini SK, no Meu Ch (era app/ferramentas/meu-chat/js/lib/cofre-arquivo.js)
js/98-ferramentas-lista.js← lista das ferramentas sem IA (20/11) — usada pela 🧰 Mesa (era app/ferramentas/meu-chat/js/lib/ferramentas-lista.js)
js/98-guia-maikon.js  ← 🧭 Guia das ferramentas do Maikon — o MESMO texto em todos os apps (Mi (era app/ferramentas/meu-chat/js/lib/guia-maikon.js)
js/98-guia-versoes.js ← 🧭 Guia das VERSÕES — o que é cada app do Maikon, qual a versão atual, (era app/ferramentas/meu-chat/js/lib/guia-versoes.js)
js/98-nuvem-neon.js   ← 🐘 Nuvem pelo NEON (17/11) — usada pelo Meu Chat e pelo SK Jurídico HT (era app/ferramentas/meu-chat/js/lib/nuvem-neon.js)
js/98-playground-replit.js← logica (era app/ferramentas/meu-chat/js/lib/playground-replit.js)
js/98-reconhecer.js   ← ♻️ RECONHECER (18/11) — a mesma peça no Meu Chat, no SK Jurídico HTML  (era app/ferramentas/meu-chat/js/lib/reconhecer.js)
js/98-nuvem-embutida.js← ☁️ SUPABASE EMBUTIDO (17/11) Estas duas informações são PÚBLICAS de pr (era app/ferramentas/meu-chat/js/nuvem-embutida.js)
js/98-ia.js           ← Assistente Jurídico — 10-ia.js Fala com a IA. Principal: Google Gemini (era app/js/10-ia.js)
js/98-online.js       ← SK Jurídico HTML — 12-online.js · ☁️ MODO ONLINE (IGUAL À REPLIT) (19/ (era app/js/12-online.js)
js/98-voz.js          ← Assistente Jurídico — 12-voz.js 🎤 Ditado (falar e virar texto) e 🔊 l (era app/js/12-voz.js)
js/98-nuvem.js        ← SK Jurídico HTML — 13-nuvem.js · ☁️ NUVEM (Supabase) — 17/11 - O MESMO (era app/js/13-nuvem.js)
js/98-entrada.js      ← SK Jurídico HTML — 14-entrada.js · 🔑 TELA DE LOGIN NA ENTRADA (17/11) (era app/js/14-entrada.js)
js/98-importar.js     ← Assistente Jurídico — 15-importar.js Lê arquivos: PDF, Word (.docx), T (era app/js/15-importar.js)
js/98-internet.js     ← Assistente Jurídico — 16-internet.js 🌐 Pesquisa na internet para QUAL (era app/js/16-internet.js)
js/98-banco.js        ← SK Jurídico HTML — 17-banco.js · 🗄 BANCO (23/11) — igual ao painel do (era app/js/17-banco.js)
js/98-texto.js        ← Assistente Jurídico — 18-texto.js Transforma o texto que a IA devolve  (era app/js/18-texto.js)
js/98-processar.js    ← Assistente Jurídico — 20-processar.js ⚡ Processar: cole/abra o texto d (era app/js/20-processar.js)
js/98-motor.js        ← SK Jurídico HTML — 21-motor.js · ⚙️ O MOTOR DO SEU JURÍDICO (17/11) Os (era app/js/21-motor.js)
js/98-drive.js        ← Assistente Jurídico — 22-drive.js ☁️ GOOGLE DRIVE DIRETO: manda e busc (era app/js/22-drive.js)
js/98-regras.js       ← Assistente Jurídico — 25-regras.js 📜 O "cérebro" do seu escritório, q (era app/js/25-regras.js)
js/98-editor.js       ← Assistente Jurídico — 30-editor.js ✏️ Editor com formatação de verdade (era app/js/30-editor.js)
js/98-docx.js         ← Assistente Jurídico — 35-docx.js ⬇ Word de VERDADE (.docx), feito aqui (era app/js/35-docx.js)
js/98-conversa.js     ← Assistente Jurídico — 40-conversa.js 💬 Conversa com a IA sobre o caso (era app/js/40-conversa.js)
js/98-documentos.js   ← Assistente Jurídico — 50-documentos.js 📁 Documentos salvos no aparelh (era app/js/50-documentos.js)
js/98-biblioteca.js   ← Assistente Jurídico — 55-biblioteca.js 📐 Modelos (peças prontas com [ (era app/js/55-biblioteca.js)
js/98-restaurar.js    ← SK Jurídico HTML — 56-restaurar.js · ♻️ RESTAURAR QUALQUER BACKUP (18/ (era app/js/56-restaurar.js)
js/98-codigos.js      ← Assistente Jurídico — 60-codigos.js 🧪 MEUS CÓDIGOS: playground que GU (era app/js/60-codigos.js)
js/98-ferramentas.js  ← Assistente Jurídico — 70-ferramentas.js 🧰 As ferramentas que já funci (era app/js/70-ferramentas.js)
js/98-config.js       ← Assistente Jurídico — 80-config.js ⚙️ Chave da IA (Gemini grátis + Gro (era app/js/80-config.js)
js/98-janela-pc.js    ← 🖥 JANELA DO PC (18/11) — igual ao Mini SK para PC: um botão para a ja (era app/js/janela-pc.js)
js/98-nuvem-neon.js   ← 🐘 Nuvem pelo NEON (17/11) — usada pelo Meu Chat e pelo SK Jurídico HT (era app/js/lib/nuvem-neon.js)
js/98-playground-replit.js← logica (era app/js/lib/playground-replit.js)
js/98-reconhecer.js   ← ♻️ RECONHECER (18/11) — a mesma peça no Meu Chat, no SK Jurídico HTML  (era app/js/lib/reconhecer.js)
js/98-segredos.js     ← 🛡 SEGREDOS (20/11) — reconhece CHAVES SECRETAS para elas não irem par (era app/js/lib/segredos.js)
js/98-nuvem-embutida.js← ☁️ SUPABASE EMBUTIDO — SK JURÍDICO NOVO (24/11) · banco PRÓPRIO do jur (era app/js/nuvem-embutida.js)
js/98-tema.js         ← 🎨 TEMA — trocar as cores do app (18/11). O mesmo arquivo em todos os  (era app/js/tema.js)
js/98-voz-francisco.js← !/usr/bin/env python3 -*- coding: utf-8 -*- (era app/kits/voz-francisco.py)
js/98-ponte.js        ← Ponte de arquivos do Mini SK — no PC, o próprio programa liga (no celu (era electron/ponte.cjs)
js/98-terminal.js     ← Terminal do computador para o Mini SK — fala o mesmo "idioma" do ttyd  (era electron/terminal.cjs)
js/98-saude.js        ← 🩺 Saúde do computador — para o Mini SK para PC. Mostra, em português  (era electron/saude.cjs)
js/98-voz.js          ← 🗣 voz.cjs — a voz Francisco GRÁTIS, já DENTRO do programa do PC (não  (era electron/voz.cjs)
js/98-preload-nav.js  ← 🌐 o Navegador do Mini SK só pode pedir uma coisa ao programa: abrir a (era electron/preload-nav.cjs)
js/98-preload.js      ← Conta para o Mini SK que ele está no PC (terminal e ponte já ligados p (era electron/preload.cjs)
js/98-banco-neon.js   ← Banco de Dados (Neon) — 🗄 Banco de Dados (Neon) v18/11 (era app/ferramentas/banco-neon.html)
js/98-cacabug.js      ← Caça-Bug (era app/ferramentas/cacabug/index.html)
js/98-calculadora-sentenca.js← Calculadora da Sentença — Memória de cálculo (era app/ferramentas/calculadora-sentenca.html)
js/98-colador.js      ← Colador de Links — 🔗 Colador de Links (era app/ferramentas/colador.html)
js/98-colecionador.js ← Colecionador de Comandos (era app/ferramentas/colecionador.html)
js/98-comparador.js   ← Comparador de Versões — ⚖️ Comparador de Versões (era app/ferramentas/comparador.html)
js/98-comunicacoes.js ← Comunicações Processuais — ⚖️ Comunicações Processuais (era app/ferramentas/comunicacoes.html)
js/98-desmontador-backup.js← Restaurador Universal — ♻️ Restaurador Universal v21/11-A (era app/ferramentas/desmontador-backup.html)
js/98-extrator.js     ← Extrator de Sites — 🛠️ Extrator de Sites (era app/ferramentas/extrator.html)
js/98-juntador.js     ← Juntador de Arquivos — 🧩 Juntador de Arquivos (era app/ferramentas/juntador.html)
js/98-laboratorio.js  ← Laboratório HTML — Advocacia Previdenciária (era app/ferramentas/laboratorio.html)
js/98-limpador.js     ← Limpador de Processos — Limpador de Processos (era app/ferramentas/limpador.html)
js/98-analisador-v2.js← Analisador Local de Projetos — V2 — Analisador Local de Projetos — V2 (era app/ferramentas/meu-chat/ferramentas/analisador-v2.html)
js/98-analisador.js   ← Analisador de Projetos — 🔍 Analisador (era app/ferramentas/meu-chat/ferramentas/analisador.html)
js/98-caca-sql.js     ← 🔍 Caça Esquema SQL — 🔍 Caça Esquema SQL (era app/ferramentas/meu-chat/ferramentas/caca-sql.html)
js/98-cofre-config.js ← ⚖️ Cofre de Configurações — 🔐 Cofre de Configurações (era app/ferramentas/meu-chat/ferramentas/cofre-config.html)
js/98-colecionador-codigo.js← Colecionador de Código — 📦 Colecionador de Código (era app/ferramentas/meu-chat/ferramentas/colecionador-codigo.html)
js/98-comandos-termux.js← 📦 Banco de Comandos Termux — 📦 Banco de Comandos Termux (era app/ferramentas/meu-chat/ferramentas/comandos-termux.html)
js/98-conversor-imagem.js← Conversor de Imagem Econômico — 🖼️ Conversor de Imagem Econômico (era app/ferramentas/meu-chat/ferramentas/conversor-imagem.html)
js/98-detector-api.js ← Detector e Corretor de API — 🔍 Detector de Problemas de API (era app/ferramentas/meu-chat/ferramentas/detector-api.html)
js/98-divisor-html.js ← Divisor de HTML — ✂️ Divisor de HTML Gigante (era app/ferramentas/meu-chat/ferramentas/divisor-html.html)
js/98-juntador.js     ← Juntador de Projetos HTML — 🔧 Juntador de Projetos HTML (era app/ferramentas/meu-chat/ferramentas/juntador.html)
js/98-leitor-universal.js← 📂 Leitor Universal de Arquivos — Leitor Universal de Arquivos (era app/ferramentas/meu-chat/ferramentas/leitor-universal.html)
js/98-monica-guia.js  ← API Monica — Guia Visual — 🤖 API Monica — Guia Visual (era app/ferramentas/meu-chat/ferramentas/monica-guia.html)
js/98-monica-passo.js ← Guia Monica API - Passo a Passo — 🔑 Guia Monica API (era app/ferramentas/meu-chat/ferramentas/monica-passo.html)
js/98-montador-modulos.js← 🧩 Montador de Módulos — PWA Jurídico — 🧩 Montador de Módulos PWA JUR (era app/ferramentas/meu-chat/ferramentas/montador-modulos.html)
js/98-procurar-substituir.js← Procurar e Substituir — 🔍 Procurar e Substituir (era app/ferramentas/meu-chat/ferramentas/procurar-substituir.html)
js/98-meu-chat.js     ← Meu Chat (era app/ferramentas/meu-chat/index.html)
js/98-organizador.js  ← Organizador de Documentos — 📑 Organizador de Documentos (era app/ferramentas/organizador.html)
js/98-perito.js       ← Perito de Metadados — Perito de Metadados (era app/ferramentas/perito.html)
js/98-transcrever.js  ← Transcrever Áudio — 🎙 Transcrever Áudio (era app/ferramentas/transcrever.html)
js/98-verificador-citacoes.js← Verificador de Citações (era app/ferramentas/verificador-citacoes.html)
js/98-app.js          ← SK Jurídico Novo (era app/index.html)
js/98-navegador.js    ← 🌐 Navegador — Mini SK (era electron/navegador.html)
js/99-app.js          ← o último: monta a tela com o que embarcou
```

## 3. As partes, uma por uma

| # | Era | Vira | Tipo | O que faz | Usa |
|---|---|---|---|---|---|
| 1 | `app/ferramentas/cacabug/ferramentas/ai-code-studio.js` | `js/10-ai-code-studio.js` | logica | Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite aqui; edite o origina | — |
| 2 | `app/ferramentas/cacabug/ferramentas/analisador-universal.js` | `js/15-analisador-universal.js` | logica | Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite aqui; edite o origina | — |
| 3 | `app/ferramentas/cacabug/ferramentas/cirurgiao.js` | `js/20-cirurgiao.js` | logica | Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite aqui; edite o origina | — |
| 4 | `app/ferramentas/cacabug/ferramentas/desembrulhar.js` | `js/25-desembrulhar.js` | logica | Ferramenta do Caça-Bug — vinda do Laboratório (16/11) | — |
| 5 | `app/ferramentas/cacabug/ferramentas/gerador-eas.js` | `js/30-gerador-eas.js` | logica | Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite aqui; edite o origina | — |
| 6 | `app/ferramentas/cacabug/ferramentas/montar.py` | `js/35-montar.js` | logica | Monta ferramentas/*.js do Caça-Bug a partir dos HTML originais (sem mexer neles). Uso: pyt | — |
| 7 | `app/ferramentas/cacabug/ferramentas/projeto-lab.js` | `js/40-projeto-lab.js` | logica | Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite aqui; edite o origina | — |
| 8 | `app/ferramentas/cacabug/ferramentas/raiox.js` | `js/45-raiox.js` | logica | Ferramenta do Caça-Bug — vinda do Laboratório (16/11) | — |
| 9 | `app/ferramentas/cacabug/ferramentas/triagem.js` | `js/50-triagem.js` | logica | Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite aqui; edite o origina | — |
| 10 | `app/ferramentas/cacabug/js/00-core.js` | css/app.css | logica | Caça-Bug — 00-core.js (a mesma base do Mini SK, com banco próprio) Base de tudo: atalhos,  | — |
| 11 | `app/ferramentas/cacabug/js/20-zip.js` | `js/55-zip.js` | logica | Caça-Bug — 20-zip.js (o mesmo do Mini SK) Lê e cria arquivos .zip SEM biblioteca externa ( | — |
| 12 | `app/ferramentas/cacabug/js/30-projeto.js` | `js/60-projeto.js` | logica | Caça-Bug — 30-projeto.js Projetos: importar (.zip, arquivos soltos ou pasta), guardar no a | — |
| 13 | `app/ferramentas/cacabug/js/40-ferramentas.js` | `js/65-ferramentas.js` | logica | Caça-Bug — 40-ferramentas.js Abre cada ferramenta (Cirurgião, Projeto Lab, Triagem, Perito | — |
| 14 | `app/ferramentas/cacabug/js/45-organizar.js` | `js/70-organizar.js` | logica | Caça-Bug — 45-organizar.js Aba 🗂️ Organizar: pega o projeto em uso (aquela pasta "embolad | — |
| 15 | `app/ferramentas/cacabug/js/46-limpo.js` | `js/75-limpo.js` | logica | Caça-Bug 1.4 — 46-limpo.js · 🧼 ZIP LIMPO (16/11) Projeto baixado da Replit vem com tudo:  | — |
| 16 | `app/ferramentas/cacabug/js/50-relatorios.js` | `js/80-relatorios.js` | logica | Caça-Bug — 50-relatorios.js 📋 Relatórios guardados: cada análise fica salva no aparelho,  | — |
| 17 | `app/ferramentas/cacabug/js/60-comparar.js` | `js/85-comparar.js` | logica | Caça-Bug — 60-comparar.js ⚖️ Comparar versões: escolha 2 ou mais projetos guardados e veja | — |
| 18 | `app/ferramentas/cacabug/js/70-ia.js` | `js/90-ia.js` | logica | Caça-Bug — 70-ia.js · 🤖 IA O MEU CHAT aqui dentro: as suas chaves (Gemini, Groq, OpenRout | — |
| 19 | `app/ferramentas/cacabug/js/80-terminal.js` | `js/91-terminal.js` | logica | Caça-Bug 1.4 — 80-terminal.js · 💻 TERMINAL DE VERDADE (16/11) O mesmo terminal do Laborat | — |
| 20 | `app/ferramentas/cacabug/js/99-app.js` | css/app.css | logica | Caça-Bug — 99-app.js Liga tudo: abas de baixo, tela de Projetos e tela de Diagnóstico | — |
| 21 | `app/ferramentas/cacabug/js/janela-pc.js` | `js/92-janela-pc.js` | logica | 🖥 JANELA DO PC (18/11) — igual ao Mini SK para PC: um botão para a janela ir de 📱 cara d | — |
| 22 | `app/ferramentas/cacabug/js/lib/expo-core.js` | `js/93-expo-core.js` | logica | expo-core.js — ☁️ Consertar um projeto EXPO para gerar APK pelo EAS Usado pelo Caça-Bug (D | app.json |
| 23 | `app/ferramentas/cacabug/js/lib/organizar-core.js` | `js/94-organizar-core.js` | logica | base, dir, ext, norm | — |
| 24 | `app/ferramentas/cacabug/js/lib/plano-core.js` | `js/95-plano-core.js` | logica | ext, uniq, normRota, arvore | — |
| 25 | `app/ferramentas/cacabug/js/tema.js` | `js/96-tema.js` | logica | 🎨 TEMA — trocar as cores do app (18/11). O mesmo arquivo em todos os apps do Maikon. Escu | — |
| 26 | `app/ferramentas/meu-chat/js/00-base.js` | `js/97-base.js` | logica | Meu Chat — 00-base.js: peças comuns (MC) | — |
| 27 | `app/ferramentas/meu-chat/js/10-banco.js` | `js/98-banco.js` | logica | Meu Chat — 10-banco.js: onde tudo fica guardado (IndexedDB do aparelho — não some ao fecha | — |
| 28 | `app/ferramentas/meu-chat/js/11-online.js` | `js/98-online.js` | logica | Meu Chat — 11-online.js · ☁️ MODO ONLINE (IGUAL À REPLIT) (19/11) Antes: cada aparelho gua | — |
| 29 | `app/ferramentas/meu-chat/js/12-nuvem.js` | `js/98-nuvem.js` | logica | Meu Chat — 12-nuvem.js · ☁️ NUVEM (Supabase) — 17/11 - O chat continua funcionando SEM int | — |
| 30 | `app/ferramentas/meu-chat/js/14-entrada.js` | `js/98-entrada.js` | logica | Meu Chat — 14-entrada.js · 🔑 TELA DE LOGIN NA ENTRADA (17/11) Igual à Replit: abriu o Meu | — |
| 31 | `app/ferramentas/meu-chat/js/20-provedores.js` | `js/98-provedores.js` | logica | Meu Chat — 20-provedores.js: conversar com as IAs (Gemini, Groq, OpenRouter, OpenAI, DeepS | — |
| 32 | `app/ferramentas/meu-chat/js/30-memoria.js` | `js/98-memoria.js` | logica | Meu Chat — 30-memoria.js: 🧠 a memória que vai junto em TODA conversa. A IA guarda sozinha | — |
| 33 | `app/ferramentas/meu-chat/js/33-contextos.js` | `js/98-contextos.js` | logica | Meu Chat — 33-contextos.js: 📌 CONTEXTOS — "cartões" de assunto que você LIGA e DESLIGA. D | — |
| 34 | `app/ferramentas/meu-chat/js/34-guia.js` | `js/98-guia.js` | logica | 🧭 Painel do Guia (16/11): o que é cada app do Maikon, a versão atual e COMO USAR, passo a | — |
| 35 | `app/ferramentas/meu-chat/js/35-jeito.js` | `js/98-jeito.js` | logica | Meu Chat — 35-jeito.js: 🎭 O JEITO DE CADA IA. Para não ter "mudança drástica" quando troc | — |
| 36 | `app/ferramentas/meu-chat/js/36-gasto.js` | `js/98-gasto.js` | logica | Meu Chat — 36-gasto.js · 💰 QUANTO GASTOU (17/11) Igual ao da Monica: embaixo de cada resp | — |
| 37 | `app/ferramentas/meu-chat/js/37-arquivos.js` | `js/98-arquivos.js` | logica | Meu Chat — 37-arquivos.js · 📎 ARQUIVOS, 📦 ZIP e 🔤 ACENTOS (17/11) - 🔤 Lê qualquer text | — |
| 38 | `app/ferramentas/meu-chat/js/38-codigos.js` | `js/98-codigos.js` | logica | Meu Chat — 38-codigos.js · 🧪 MEUS CÓDIGOS (17/11) Igual ao playground do jurídico origina | — |
| 39 | `app/ferramentas/meu-chat/js/39-qr.js` | `js/98-qr.js` | logica | Meu Chat — 39-qr.js · 🔳 LER QR CODE (17/11) Aponta a câmera (ou escolhe um print) e o tex | — |
| 40 | `app/ferramentas/meu-chat/js/40-voz.js` | `js/98-voz.js` | logica | Meu Chat — 40-voz.js: 🎤 falar (ditado) e 🔊 ouvir a resposta. 🔊 DOIS "motores" de voz (⚙ | — |
| 41 | `app/ferramentas/meu-chat/js/41-pronto.js` | `js/98-pronto.js` | logica | Meu Chat — 41-pronto.js · 🔔 AVISO DE "RESPOSTA PRONTA" (18/11) Para o Ollama (ou qualquer | — |
| 42 | `app/ferramentas/meu-chat/js/42-testar.js` | `js/98-testar.js` | logica | Meu Chat — 42-testar.js · 🧪 TESTAR O CÓDIGO AQUI DENTRO (a "sandbox") (18/11) Sandbox = u | — |
| 43 | `app/ferramentas/meu-chat/js/43-links.js` | `js/98-links.js` | logica | Meu Chat — 43-links.js · 🔗 LINKS E NAVEGADOR INTERNO (18/11) Um "colador de links" aqui d | — |
| 44 | `app/ferramentas/meu-chat/js/44-docs.js` | `js/98-docs.js` | logica | Meu Chat — 44-docs.js · 📄 DOCUMENTAÇÃO DOS PROJETOS (18/11) Cada projeto tem um README.md | — |
| 45 | `app/ferramentas/meu-chat/js/45-mesa.js` | `js/98-mesa.js` | logica | Meu Chat — 45-mesa.js · 🧰 MESA DO LADO (18/11) — para tela grande (computador, .exe, tabl | — |
| 46 | `app/ferramentas/meu-chat/js/50-internet.js` | `js/98-internet.js` | logica | Meu Chat — 50-internet.js: 🌐 pesquisar e 🔗 ler links. - Gemini e Claude pesquisam sozinh | — |
| 47 | `app/ferramentas/meu-chat/js/60-previa.js` | `js/98-previa.js` | logica | Meu Chat — 60-previa.js: 👁 ver o código funcionando, na hora. - HTML: abre a página como  | — |
| 48 | `app/ferramentas/meu-chat/js/70-texto.js` | `js/98-texto.js` | logica | Meu Chat — 70-texto.js: mostra a resposta da IA bonitinha (negrito, listas, links, blocos  | — |
| 49 | `app/ferramentas/meu-chat/js/80-chat.js` | `js/98-chat.js` | logica | Meu Chat — 80-chat.js: a conversa (mensagens, fotos, mandar, parar, lista de conversas). C | — |
| 50 | `app/ferramentas/meu-chat/js/85-config.js` | `js/98-config.js` | logica | Meu Chat — 85-config.js: ⚙️ chaves das IAs, modelo, busca, voz, instruções, tema | — |
| 51 | `app/ferramentas/meu-chat/js/87-cofre.js` | `js/98-cofre.js` | logica | Meu Chat — 87-cofre.js: 🔐 Cofre de chaves. Mostra cada chave guardada (👁 ver, 📋 copiar) | — |
| 52 | `app/ferramentas/meu-chat/js/90-backup.js` | `js/98-backup.js` | logica | Meu Chat — 90-backup.js: 💾 backup de tudo (conversas + memória + ajustes) e restaurar SEM | — |
| 53 | `app/ferramentas/meu-chat/js/91-restaurar.js` | `js/98-restaurar.js` | logica | Meu Chat — 91-restaurar.js · ♻️ RESTAURAR QUALQUER BACKUP (18/11) O ⤒ Restaurar agora ente | — |
| 54 | `app/ferramentas/meu-chat/js/95-ponte-lab.js` | `js/98-ponte-lab.js` | logica | 🔬 Ponte com o Laboratório: quando o Meu Chat está DENTRO do Laboratório (aba 🤖 IA), o La | — |
| 55 | `app/ferramentas/meu-chat/js/99-app.js` | css/app.css | logica | Meu Chat — 99-app.js: liga tudo quando abre | — |
| 56 | `app/ferramentas/meu-chat/js/janela-pc.js` | `js/98-janela-pc.js` | logica | 🖥 JANELA DO PC (18/11) — igual ao Mini SK para PC: um botão para a janela ir de 📱 cara d | — |
| 57 | `app/ferramentas/meu-chat/js/lib/cofre-arquivo.js` | `js/98-cofre-arquivo.js` | logica | 🔐 Arquivo de chaves do Maikon — o MESMO formato no Mini SK, no Meu Chat e no que vier dep | — |
| 58 | `app/ferramentas/meu-chat/js/lib/ferramentas-lista.js` | `js/98-ferramentas-lista.js` | logica | lista das ferramentas sem IA (20/11) — usada pela 🧰 Mesa | — |
| 59 | `app/ferramentas/meu-chat/js/lib/guia-maikon.js` | `js/98-guia-maikon.js` | logica | 🧭 Guia das ferramentas do Maikon — o MESMO texto em todos os apps (Mini SK, Meu Chat…). A | — |
| 60 | `app/ferramentas/meu-chat/js/lib/guia-versoes.js` | `js/98-guia-versoes.js` | logica | 🧭 Guia das VERSÕES — o que é cada app do Maikon, qual a versão atual, e COMO USAR (passo  | — |
| 61 | `app/ferramentas/meu-chat/js/lib/nuvem-neon.js` | `js/98-nuvem-neon.js` | logica | 🐘 Nuvem pelo NEON (17/11) — usada pelo Meu Chat e pelo SK Jurídico HTML. Você cola o ende | — |
| 62 | `app/ferramentas/meu-chat/js/lib/playground-replit.js` | `js/98-playground-replit.js` | logica | ESC, App, completo, limparDoc | — |
| 63 | `app/ferramentas/meu-chat/js/lib/reconhecer.js` | `js/98-reconhecer.js` | logica | ♻️ RECONHECER (18/11) — a mesma peça no Meu Chat, no SK Jurídico HTML e no 🗄 Banco. Receb | — |
| 64 | `app/ferramentas/meu-chat/js/nuvem-embutida.js` | `js/98-nuvem-embutida.js` | logica | ☁️ SUPABASE EMBUTIDO (17/11) Estas duas informações são PÚBLICAS de propósito (todo site q | — |
| 65 | `app/js/00-core.js` | css/app.css | logica | Assistente Jurídico — 00-core.js  (A LOCOMOTIVA: vem primeiro) Cria o "caixa comum" J que  | — |
| 66 | `app/js/10-ia.js` | `js/98-ia.js` | logica | Assistente Jurídico — 10-ia.js Fala com a IA. Principal: Google Gemini (chave grátis, AIza | — |
| 67 | `app/js/12-online.js` | `js/98-online.js` | logica | SK Jurídico HTML — 12-online.js · ☁️ MODO ONLINE (IGUAL À REPLIT) (19/11) Com a nuvem liga | — |
| 68 | `app/js/12-voz.js` | `js/98-voz.js` | logica | Assistente Jurídico — 12-voz.js 🎤 Ditado (falar e virar texto) e 🔊 leitura em voz NATURA | — |
| 69 | `app/js/13-nuvem.js` | `js/98-nuvem.js` | logica | SK Jurídico HTML — 13-nuvem.js · ☁️ NUVEM (Supabase) — 17/11 - O MESMO LOGIN e o MESMO Sup | — |
| 70 | `app/js/14-entrada.js` | `js/98-entrada.js` | logica | SK Jurídico HTML — 14-entrada.js · 🔑 TELA DE LOGIN NA ENTRADA (17/11) Igual à Replit: abr | — |
| 71 | `app/js/15-importar.js` | `js/98-importar.js` | logica | Assistente Jurídico — 15-importar.js Lê arquivos: PDF, Word (.docx), TXT, MD, RTF, HTML. P | — |
| 72 | `app/js/16-internet.js` | `js/98-internet.js` | logica | Assistente Jurídico — 16-internet.js 🌐 Pesquisa na internet para QUALQUER IA (Ollama, Gro | — |
| 73 | `app/js/17-banco.js` | `js/98-banco.js` | logica | SK Jurídico HTML — 17-banco.js · 🗄 BANCO (23/11) — igual ao painel do Neon Abre por ⚙️ Co | — |
| 74 | `app/js/18-texto.js` | `js/98-texto.js` | logica | Assistente Jurídico — 18-texto.js Transforma o texto que a IA devolve (com ##, **negrito** | — |
| 75 | `app/js/20-processar.js` | `js/98-processar.js` | logica | Assistente Jurídico — 20-processar.js ⚡ Processar: cole/abra o texto do processo → escolha | — |
| 76 | `app/js/21-motor.js` | `js/98-motor.js` | logica | SK Jurídico HTML — 21-motor.js · ⚙️ O MOTOR DO SEU JURÍDICO (17/11) Os textos abaixo viera | — |
| 77 | `app/js/22-drive.js` | `js/98-drive.js` | logica | Assistente Jurídico — 22-drive.js ☁️ GOOGLE DRIVE DIRETO: manda e busca arquivos na SUA co | — |
| 78 | `app/js/25-regras.js` | `js/98-regras.js` | logica | Assistente Jurídico — 25-regras.js 📜 O "cérebro" do seu escritório, que cresce com o temp | — |
| 79 | `app/js/30-editor.js` | `js/98-editor.js` | logica | Assistente Jurídico — 30-editor.js ✏️ Editor com formatação de verdade (folha A4, padrão A | — |
| 80 | `app/js/35-docx.js` | `js/98-docx.js` | logica | Assistente Jurídico — 35-docx.js ⬇ Word de VERDADE (.docx), feito aqui no aparelho, sem in | — |
| 81 | `app/js/40-conversa.js` | `js/98-conversa.js` | logica | Assistente Jurídico — 40-conversa.js 💬 Conversa com a IA sobre o caso — por texto ou por  | — |
| 82 | `app/js/50-documentos.js` | `js/98-documentos.js` | logica | Assistente Jurídico — 50-documentos.js 📁 Documentos salvos no aparelho + 🕐 histórico do  | — |
| 83 | `app/js/55-biblioteca.js` | `js/98-biblioteca.js` | logica | Assistente Jurídico — 55-biblioteca.js 📐 Modelos (peças prontas com [CAMPOS]) e 📚 Ementa | — |
| 84 | `app/js/56-restaurar.js` | `js/98-restaurar.js` | logica | SK Jurídico HTML — 56-restaurar.js · ♻️ RESTAURAR QUALQUER BACKUP (18/11) Escolha QUALQUER | — |
| 85 | `app/js/60-codigos.js` | `js/98-codigos.js` | logica | Assistente Jurídico — 60-codigos.js 🧪 MEUS CÓDIGOS: playground que GUARDA. Para os seus c | — |
| 86 | `app/js/70-ferramentas.js` | `js/98-ferramentas.js` | logica | Assistente Jurídico — 70-ferramentas.js 🧰 As ferramentas que já funcionam, cada uma no se | — |
| 87 | `app/js/80-config.js` | `js/98-config.js` | logica | Assistente Jurídico — 80-config.js ⚙️ Chave da IA (Gemini grátis + Groq de reserva), voz,  | — |
| 88 | `app/js/99-app.js` | css/app.css | logica | Assistente Jurídico — 99-app.js  (O ÚLTIMO VAGÃO: vem por último) Monta cada módulo na sua | — |
| 89 | `app/js/janela-pc.js` | `js/98-janela-pc.js` | logica | 🖥 JANELA DO PC (18/11) — igual ao Mini SK para PC: um botão para a janela ir de 📱 cara d | — |
| 90 | `app/js/lib/nuvem-neon.js` | `js/98-nuvem-neon.js` | logica | 🐘 Nuvem pelo NEON (17/11) — usada pelo Meu Chat e pelo SK Jurídico HTML. Você cola o ende | — |
| 91 | `app/js/lib/playground-replit.js` | `js/98-playground-replit.js` | logica | ESC, App, completo, limparDoc | — |
| 92 | `app/js/lib/reconhecer.js` | `js/98-reconhecer.js` | logica | ♻️ RECONHECER (18/11) — a mesma peça no Meu Chat, no SK Jurídico HTML e no 🗄 Banco. Receb | — |
| 93 | `app/js/lib/segredos.js` | `js/98-segredos.js` | logica | 🛡 SEGREDOS (20/11) — reconhece CHAVES SECRETAS para elas não irem parar no chat, na IA ne | — |
| 94 | `app/js/nuvem-embutida.js` | `js/98-nuvem-embutida.js` | logica | ☁️ SUPABASE EMBUTIDO — SK JURÍDICO NOVO (24/11) · banco PRÓPRIO do jurídico, uma tabela pa | — |
| 95 | `app/js/tema.js` | `js/98-tema.js` | logica | 🎨 TEMA — trocar as cores do app (18/11). O mesmo arquivo em todos os apps do Maikon. Escu | — |
| 96 | `app/kits/voz-francisco.py` | `js/98-voz-francisco.js` | logica | !/usr/bin/env python3 -*- coding: utf-8 -*- | — |
| 97 | `electron/ponte.cjs` | `js/98-ponte.js` | logica | Ponte de arquivos do Mini SK — no PC, o próprio programa liga (no celular, roda no Termux) | — |
| 98 | `electron/terminal.cjs` | `js/98-terminal.js` | logica | Terminal do computador para o Mini SK — fala o mesmo "idioma" do ttyd (o do Termux), então | — |
| 99 | `electron/saude.cjs` | `js/98-saude.js` | logica | 🩺 Saúde do computador — para o Mini SK para PC. Mostra, em português simples: espaço nos  | — |
| 100 | `electron/voz.cjs` | `js/98-voz.js` | logica | 🗣 voz.cjs — a voz Francisco GRÁTIS, já DENTRO do programa do PC (não precisa de Python).  | — |
| 101 | `electron/main.cjs` | css/app.css | logica | Mini SK para PC — abre o Mini SK numa janela própria e liga, por dentro: - o 💻 Terminal d | ponte.cjs, terminal.cjs, saude.cjs, voz.cjs |
| 102 | `electron/preload-nav.cjs` | `js/98-preload-nav.js` | logica | 🌐 o Navegador do Mini SK só pode pedir uma coisa ao programa: abrir a página no navegador | — |
| 103 | `electron/preload.cjs` | `js/98-preload.js` | logica | Conta para o Mini SK que ele está no PC (terminal e ponte já ligados pelo programa) | — |
| 104 | `app/ferramentas/banco-neon.html` | `js/98-banco-neon.js` | tela | Banco de Dados (Neon) — 🗄 Banco de Dados (Neon) v18/11 | — |
| 105 | `app/ferramentas/cacabug/css/app.css` | css/app.css | estilo | Caça-Bug — aparência. Cores do Mini SK (escuro), letras legíveis no celular | — |
| 106 | `app/ferramentas/cacabug/index.html` | `js/98-cacabug.js` | tela | Caça-Bug | manifest.json, icon-192.png, app.css, 00-core.js |
| 107 | `app/ferramentas/calculadora-sentenca.html` | `js/98-calculadora-sentenca.js` | tela | Calculadora da Sentença — Memória de cálculo | — |
| 108 | `app/ferramentas/colador.html` | `js/98-colador.js` | tela | Colador de Links — 🔗 Colador de Links | manifest.json |
| 109 | `app/ferramentas/colecionador.html` | `js/98-colecionador.js` | tela | Colecionador de Comandos | — |
| 110 | `app/ferramentas/comparador.html` | `js/98-comparador.js` | tela | Comparador de Versões — ⚖️ Comparador de Versões | — |
| 111 | `app/ferramentas/comunicacoes.html` | `js/98-comunicacoes.js` | tela | Comunicações Processuais — ⚖️ Comunicações Processuais | — |
| 112 | `app/ferramentas/desmontador-backup.html` | `js/98-desmontador-backup.js` | tela | Restaurador Universal — ♻️ Restaurador Universal v21/11-A | — |
| 113 | `app/ferramentas/extrator.html` | `js/98-extrator.js` | tela | Extrator de Sites — 🛠️ Extrator de Sites | — |
| 114 | `app/ferramentas/juntador.html` | `js/98-juntador.js` | tela | Juntador de Arquivos — 🧩 Juntador de Arquivos | — |
| 115 | `app/ferramentas/laboratorio.html` | `js/98-laboratorio.js` | tela | Laboratório HTML — Advocacia Previdenciária | — |
| 116 | `app/ferramentas/limpador.html` | `js/98-limpador.js` | tela | Limpador de Processos — Limpador de Processos | — |
| 117 | `app/ferramentas/meu-chat/ferramentas/analisador-v2.html` | `js/98-analisador-v2.js` | tela | Analisador Local de Projetos — V2 — Analisador Local de Projetos — V2 | — |
| 118 | `app/ferramentas/meu-chat/ferramentas/analisador.html` | `js/98-analisador.js` | tela | Analisador de Projetos — 🔍 Analisador | — |
| 119 | `app/ferramentas/meu-chat/ferramentas/caca-sql.html` | `js/98-caca-sql.js` | tela | 🔍 Caça Esquema SQL — 🔍 Caça Esquema SQL | — |
| 120 | `app/ferramentas/meu-chat/ferramentas/cofre-config.html` | `js/98-cofre-config.js` | tela | ⚖️ Cofre de Configurações — 🔐 Cofre de Configurações | — |
| 121 | `app/ferramentas/meu-chat/ferramentas/colecionador-codigo.html` | `js/98-colecionador-codigo.js` | tela | Colecionador de Código — 📦 Colecionador de Código | — |
| 122 | `app/ferramentas/meu-chat/ferramentas/comandos-termux.html` | `js/98-comandos-termux.js` | tela | 📦 Banco de Comandos Termux — 📦 Banco de Comandos Termux | — |
| 123 | `app/ferramentas/meu-chat/ferramentas/conversor-imagem.html` | `js/98-conversor-imagem.js` | tela | Conversor de Imagem Econômico — 🖼️ Conversor de Imagem Econômico | — |
| 124 | `app/ferramentas/meu-chat/ferramentas/detector-api.html` | `js/98-detector-api.js` | tela | Detector e Corretor de API — 🔍 Detector de Problemas de API | — |
| 125 | `app/ferramentas/meu-chat/ferramentas/divisor-html.html` | `js/98-divisor-html.js` | tela | Divisor de HTML — ✂️ Divisor de HTML Gigante | — |
| 126 | `app/ferramentas/meu-chat/ferramentas/juntador.html` | `js/98-juntador.js` | tela | Juntador de Projetos HTML — 🔧 Juntador de Projetos HTML | — |
| 127 | `app/ferramentas/meu-chat/ferramentas/leitor-universal.html` | `js/98-leitor-universal.js` | tela | 📂 Leitor Universal de Arquivos — Leitor Universal de Arquivos | — |
| 128 | `app/ferramentas/meu-chat/ferramentas/monica-guia.html` | `js/98-monica-guia.js` | tela | API Monica — Guia Visual — 🤖 API Monica — Guia Visual | — |
| 129 | `app/ferramentas/meu-chat/ferramentas/monica-passo.html` | `js/98-monica-passo.js` | tela | Guia Monica API - Passo a Passo — 🔑 Guia Monica API | — |
| 130 | `app/ferramentas/meu-chat/ferramentas/montador-modulos.html` | `js/98-montador-modulos.js` | tela | 🧩 Montador de Módulos — PWA Jurídico — 🧩 Montador de Módulos PWA JURÍDICO — MAIKON CALDE | — |
| 131 | `app/ferramentas/meu-chat/ferramentas/procurar-substituir.html` | `js/98-procurar-substituir.js` | tela | Procurar e Substituir — 🔍 Procurar e Substituir | — |
| 132 | `app/ferramentas/meu-chat/css/app.css` | css/app.css | estilo | — | — |
| 133 | `app/ferramentas/meu-chat/index.html` | `js/98-meu-chat.js` | tela | Meu Chat | manifest.json, icon-192.png, app.css, 00-base.js |
| 134 | `app/ferramentas/organizador.html` | `js/98-organizador.js` | tela | Organizador de Documentos — 📑 Organizador de Documentos | — |
| 135 | `app/ferramentas/perito.html` | `js/98-perito.js` | tela | Perito de Metadados — Perito de Metadados | — |
| 136 | `app/ferramentas/transcrever.html` | `js/98-transcrever.js` | tela | Transcrever Áudio — 🎙 Transcrever Áudio | — |
| 137 | `app/ferramentas/verificador-citacoes.html` | `js/98-verificador-citacoes.js` | tela | Verificador de Citações | — |
| 138 | `app/css/app.css` | css/app.css | estilo | 23/11: SEM "ESTICAR IGUAL CHICLETE" — o Android estica a tela quando passa da ponta (e às  | — |
| 139 | `app/index.html` | `js/98-app.js` | tela | SK Jurídico Novo | manifest.json, icon-192.png, app.css, jszip.min.js |
| 140 | `electron/navegador.html` | `js/98-navegador.js` | tela | 🌐 Navegador — Mini SK | — |

## 4. Montar passo a passo (cada bloco é um pedido pronto: 📋 Copiar → colar na IA)

### Passo 0 — combinar as regras com a IA

```text
Vamos recriar o app "Caça-Bug" como HTML MODULAR, que abre pelo index.html, sem servidor e sem nada da Replit.
Regras: (1) index.html chama os arquivos js/ na ordem, antes do </body>; (2) js/00-core.js cria window.APP com APP.registrar(modulo), APP.guardar(chave, valor) em IndexedDB/localStorage e APP.avisar(texto); (3) cada arquivo js/NN-nome.js cuida de UM assunto, começa com (function (APP) { e termina com })(window.APP); (4) js/99-app.js vem por último e monta a tela com os módulos registrados; (5) textos em português do Brasil.
Vou pedir UM arquivo por vez. Responda só com o arquivo completo, sem cortar nada. Primeiro: crie index.html, css/app.css e js/00-core.js.
```

### Passo 1 — `js/10-ai-code-studio.js` (era `app/ferramentas/cacabug/ferramentas/ai-code-studio.js`, 3 linhas)

```text
Crie js/10-ai-code-studio.js. Ele faz: Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite aqui; edite o original e rode montar.py).
No app original ele tinha estas funções/partes: est, uid, isMobile, escapeHtml, copyText, activeConv, MODULE_Storage, save, saveSoon, load, normMemory, stamp, download, exportAll, importBackup, handleImport, MODULE_Provider, models.
Ele chamava estes endereços: https://api.anthropic.com/v1/messages, https://api.anthropic.com/v1/models?limit=100, https://google.serper.dev/search. Em HTML, ligue cada um à função equivalente do módulo certo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 2 — `js/15-analisador-universal.js` (era `app/ferramentas/cacabug/ferramentas/analisador-universal.js`, 3 linhas)

```text
Crie js/15-analisador-universal.js. Ele faz: Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite aqui; edite o original e rode montar.py).
No app original ele tinha estas funções/partes: handleFileInput, importZip, handleFolderInput, tryDecodeText, renderTree, buildTree, renderNode, countFiles, toggleFolder, expandAll, collapseAll, filterFiles, getFileIcon, formatSize, openFile, closeTab, renderTabs, renderEditor.
O original usava as bibliotecas @capacitor/cli: em HTML puro, use a versão de CDN (ou faça sem ela, se for simples).
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 3 — `js/20-cirurgiao.js` (era `app/ferramentas/cacabug/ferramentas/cirurgiao.js`, 3 linhas)

```text
Crie js/20-cirurgiao.js. Ele faz: Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite aqui; edite o original e rode montar.py).
No app original ele tinha estas funções/partes: esc, fmtB, fmtN, usd, agora, pausa, tokensDe, extDe, decode, pareceBinario, inflate, lerZip, CRC, crc32, escreverZip, baixar, copiar, status.
Ele chamava estes endereços: ${c.base}/models/${encodeURIComponent(c.modelo)}:generateContent, ${c.base}/messages, ${c.base}/chat/completions, https://registry.npmjs.org/, https://registry.npmjs.org/-/v1/search?size=20&text=, https://pypi.org/pypi/. Em HTML, ligue cada um à função equivalente do módulo certo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 4 — `js/25-desembrulhar.js` (era `app/ferramentas/cacabug/ferramentas/desembrulhar.js`, 3 linhas)

```text
Crie js/25-desembrulhar.js. Ele faz: Ferramenta do Caça-Bug — vinda do Laboratório (16/11).
No app original ele tinha estas funções/partes: ehHTML, pareceB64, deB64, tituloDe, procurarNoJS, andar, procurar, rec, desembrulhar, add, tela, rodar.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 5 — `js/30-gerador-eas.js` (era `app/ferramentas/cacabug/ferramentas/gerador-eas.js`, 3 linhas)

```text
Crie js/30-gerador-eas.js. Ele faz: Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite aqui; edite o original e rode montar.py).
No app original ele tinha estas funções/partes: switchTab, autoId, atualizar, importarProjeto, preencherDados, gerarTudo, renderArquivos, copiar, exportarZip, fileIcon, esc, escHtml, loadJSZ.
O original usava as bibliotecas @capacitor/cli: em HTML puro, use a versão de CDN (ou faça sem ela, se for simples).
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 6 — `js/35-montar.js` (era `app/ferramentas/cacabug/ferramentas/montar.py`, 81 linhas)

```text
Crie js/35-montar.js. Ele faz: Monta ferramentas/*.js do Caça-Bug a partir dos HTML originais (sem mexer neles). Uso: python3 montar.py   (os originais ficam em /home/claude/cacabug-fontes e /home/claude).
No app original ele tinha estas funções/partes: fim_body, inserir_antes, libs_locais, importFiles.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 7 — `js/40-projeto-lab.js` (era `app/ferramentas/cacabug/ferramentas/projeto-lab.js`, 3 linhas)

```text
Crie js/40-projeto-lab.js. Ele faz: Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite aqui; edite o original e rode montar.py).
No app original ele tinha estas funções/partes: esc, tick, fmtSize, fmtDate, normPath, dirname, basename, extOf, joinPath, hex, inflate, mask, lineFinder, parseLenientJSON, langOf, sniff, zipEntries, parsePax.
Ele chamava estes endereços: https://api.anthropic.com/v1/messages, https://api.anthropic.com/v1/models?limit=100. Em HTML, ligue cada um à função equivalente do módulo certo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 8 — `js/45-raiox.js` (era `app/ferramentas/cacabug/ferramentas/raiox.js`, 3 linhas)

```text
Crie js/45-raiox.js. Ele faz: Ferramenta do Caça-Bug — vinda do Laboratório (16/11).
No app original ele tinha estas funções/partes: mascara, examinar, tam, tem, inflar, textoAscii, examinarExe, busca, temTexto, tela, mostrar.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 9 — `js/50-triagem.js` (era `app/ferramentas/cacabug/ferramentas/triagem.js`, 3 linhas)

```text
Crie js/50-triagem.js. Ele faz: Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite aqui; edite o original e rode montar.py).
No app original ele tinha estas funções/partes: renderLista, abrirConversa, conversaAtiva, renderMensagens, enviarMensagem, formatarHora, salvar, extOf, normPath, findPaths, compatible, sniffType, looksWindows, extForType, fnNames, computeSig, jaccard, speakerOf.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 10 — `js/55-zip.js` (era `app/ferramentas/cacabug/js/20-zip.js`, 120 linhas)

```text
Crie js/55-zip.js. Ele faz: Caça-Bug — 20-zip.js (o mesmo do Mini SK) Lê e cria arquivos .zip SEM biblioteca externa (funciona offline). Usa o descompactador que já vem no navegador (DecompressionStream).
No app original ele tinha estas funções/partes: CRC_TABLE, crc32, streamThrough, read, write.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 11 — `js/60-projeto.js` (era `app/ferramentas/cacabug/js/30-projeto.js`, 215 linhas)

```text
Crie js/60-projeto.js. Ele faz: Caça-Bug — 30-projeto.js Projetos: importar (.zip, arquivos soltos ou pasta), guardar no aparelho, escolher o projeto ativo e fazer o DIAGNÓSTICO RÁPIDO: - que tipo de projeto é (Replit, Vite/React, Expo, Capacitor, servidor, PWA);.
No app original ele tinha estas funções/partes: listar, pegar, entradasDe, guardar, escolher, apagar, arquivoZip, semExt, importarArquivos, texto, raizComum, mascara, examinarIndex, diagnostico, tem, consertarCaminhos.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 12 — `js/65-ferramentas.js` (era `app/ferramentas/cacabug/js/40-ferramentas.js`, 136 linhas)

```text
Crie js/65-ferramentas.js. Ele faz: Caça-Bug — 40-ferramentas.js Abre cada ferramenta (Cirurgião, Projeto Lab, Triagem, Perito…) DENTRO do app, sem mexer no jeito delas funcionarem: - entrega o projeto ativo automaticamente (não precisa importar de novo);.
No app original ele tinha estas funções/partes: REG, baixar, tenta, comKit, lista, porId, esperarHub, olha, criarFrame, noFrame, alimentar, abrir, abrirComparacao, guardarRelatorio, montarLista.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 13 — `js/70-organizar.js` (era `app/ferramentas/cacabug/js/45-organizar.js`, 54 linhas)

```text
Crie js/70-organizar.js. Ele faz: Caça-Bug — 45-organizar.js Aba 🗂️ Organizar: pega o projeto em uso (aquela pasta "embolada") e devolve tudo separado — usa js/lib/organizar-core.js.
No app original ele tinha estas funções/partes: montar, analisar, num, zipar.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 14 — `js/75-limpo.js` (era `app/ferramentas/cacabug/js/46-limpo.js`, 92 linhas)

```text
Crie js/75-limpo.js. Ele faz: Caça-Bug 1.4 — 46-limpo.js · 🧼 ZIP LIMPO (16/11) Projeto baixado da Replit vem com tudo: node_modules, .git, .cache, .local, .upm, restos da Replit, logs… e às vezes senhas (.env). Aqui você escolhe o que tirar e o Caça-Bug guarda uma CÓPIA limpa. O original NUNCA muda.
No app original ele tinha estas funções/partes: raizDe, medir, abrir, marcados, conta, gerar.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 15 — `js/80-relatorios.js` (era `app/ferramentas/cacabug/js/50-relatorios.js`, 50 linhas)

```text
Crie js/80-relatorios.js. Ele faz: Caça-Bug — 50-relatorios.js 📋 Relatórios guardados: cada análise fica salva no aparelho, com data, ferramenta e projeto. Não some quando você sai da ferramenta. Abrir · copiar · baixar · mandar (Drive/WhatsApp) · apagar.
No app original ele tinha estas funções/partes: guardar, listar, nomeArq, cabecalho, montar, zipTodos.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 16 — `js/85-comparar.js` (era `app/ferramentas/cacabug/js/60-comparar.js`, 244 linhas)

```text
Crie js/85-comparar.js. Ele faz: Caça-Bug — 60-comparar.js ⚖️ Comparar versões: escolha 2 ou mais projetos guardados e veja - a tabela de RECURSOS por versão (IA, voz, PDF, Word, DJEN…) ✓ / — - arquivos: só numa, só na outra, mudaram, iguais.
No app original ele tinha estas funções/partes: raizComum, indice, difLinhas, soEm, comparar, textoRelatorio, bloco, montar, html, det, ligar, verDiferenca, mostra.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 17 — `js/90-ia.js` (era `app/ferramentas/cacabug/js/70-ia.js`, 80 linhas)

```text
Crie js/90-ia.js. Ele faz: Caça-Bug — 70-ia.js · 🤖 IA O MEU CHAT aqui dentro: as suas chaves (Gemini, Groq, OpenRouter…), o 🦙 Ollama sozinho quando estiver ligado (no PC ou no Termux), voz, internet e fotos. Os botões 📎 colocam na caixa do chat o DIAGNÓSTICO, o PLANO, um RELATÓRIO.
No app original ele tinha estas funções/partes: quadro, mandar, esconderChaves, colar, precisaProjeto, acao, escolher, pintar, montar.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 18 — `js/91-terminal.js` (era `app/ferramentas/cacabug/js/80-terminal.js`, 471 linhas)

```text
Crie js/91-terminal.js. Ele faz: Caça-Bug 1.4 — 80-terminal.js · 💻 TERMINAL DE VERDADE (16/11) O mesmo terminal do Laboratório (o que não cai): ▶ Ligar tudo · 🚀 Rodar · ⏹ Parar · 🦙 Ollama · 🗣 Voz Francisco · 🧰 Verificar e instalar · 🩺 Terminal parado? + 🔎 Análise (git log/diff, achar lixo, arquivos grandes, pacotes sem uso) e 🧼 Zip limpo.
No app original ele tinha estas funções/partes: espera, status, pst, carregarScript, carregarCss, prepararTela, escreverTela, enviar, tamanho, ligado, conectar, desconectar, copiar, nome, dentro, responder, corpo, andar.
O original usava as bibliotecas http, fs, path, os: em HTML puro, use a versão de CDN (ou faça sem ela, se for simples).
Ele chamava estes endereços: ferramentas/meu-chat/voz-francisco.py. Em HTML, ligue cada um à função equivalente do módulo certo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 19 — `js/92-janela-pc.js` (era `app/ferramentas/cacabug/js/janela-pc.js`, 20 linhas)

```text
Crie js/92-janela-pc.js. Ele faz: 🖥 JANELA DO PC (18/11) — igual ao Mini SK para PC: um botão para a janela ir de 📱 cara de celular → 📟 média → 🖥 tela cheia, e voltar. Só aparece no programa .exe.
No app original ele tinha estas funções/partes: ler, por, botao.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 20 — `js/93-expo-core.js` (era `app/ferramentas/cacabug/js/lib/expo-core.js`, 192 linhas)

```text
Crie js/93-expo-core.js. Ele faz: expo-core.js — ☁️ Consertar um projeto EXPO para gerar APK pelo EAS Usado pelo Caça-Bug (Diagnóstico) e pelo Mini SK (painel ☁️ EAS). Junta o que os geradores antigos faziam separado (app.json, eas.json, autorizações, receita do GitHub) + limpeza da Replit, numa passada só.
No app original ele tinha estas funções/partes: json, raizDe, slugDe, ler, permissoes, tem, consertar, existe, tirarImg, limpa, base.
O original usava as bibliotecas fs: em HTML puro, use a versão de CDN (ou faça sem ela, se for simples).
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 21 — `js/94-organizar-core.js` (era `app/ferramentas/cacabug/js/lib/organizar-core.js`, 347 linhas)

```text
Crie js/94-organizar-core.js. Ele é uma parte de logica do app.
No app original ele tinha estas funções/partes: base, dir, ext, norm, slug, chaveConteudo, hash, assuntoDe, incompleto, ehModuloES, sintaxe, conversaColada, tentarConsertar, resumo, cortar, add, analisar, relatorio.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 22 — `js/95-plano-core.js` (era `app/ferramentas/cacabug/js/lib/plano-core.js`, 171 linhas)

```text
Crie js/95-plano-core.js. Ele é uma parte de logica do app.
No app original ele tinha estas funções/partes: ext, uniq, normRota, arvore, andar, gerar, chave, dedup, temRota, tem, markdown, tab.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 23 — `js/96-tema.js` (era `app/ferramentas/cacabug/js/tema.js`, 44 linhas)

```text
Crie js/96-tema.js. Ele faz: 🎨 TEMA — trocar as cores do app (18/11). O mesmo arquivo em todos os apps do Maikon. Escuro (o de sempre) · Claro · Alto contraste (letra bem branca no preto) · Papel (sépia, cansa menos a vista). Cada app diz quais são as cores dele (window.TEMA_APP) e onde fica o botão 🎨. Fica guardado neste aparelho. Não muda nada do projeto, só as cores da tela.
No app original ele tinha estas funções/partes: ler, aplicar, menu, fora, botao.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 24 — `js/97-base.js` (era `app/ferramentas/meu-chat/js/00-base.js`, 43 linhas)

```text
Crie js/97-base.js. Ele faz: Meu Chat — 00-base.js: peças comuns (MC).
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 25 — `js/98-banco.js` (era `app/ferramentas/meu-chat/js/10-banco.js`, 26 linhas)

```text
Crie js/98-banco.js. Ele faz: Meu Chat — 10-banco.js: onde tudo fica guardado (IndexedDB do aparelho — não some ao fechar).
No app original ele tinha estas funções/partes: abrir, req, loja.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 26 — `js/98-online.js` (era `app/ferramentas/meu-chat/js/11-online.js`, 104 linhas)

```text
Crie js/98-online.js. Ele faz: Meu Chat — 11-online.js · ☁️ MODO ONLINE (IGUAL À REPLIT) (19/11) Antes: cada aparelho guardava uma CÓPIA de todas as conversas (o app crescia e a nuvem gastava baixando tudo). AGORA, com a conta do Supabase ligada: • a lista de conversas vem da nuvem só com o NOME (leve);.
No app original ele tinha estas funções/partes: temFotos, semFotos, ligado, guardarSemInternet, subirPendentes, liberar, ocupa.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 27 — `js/98-nuvem.js` (era `app/ferramentas/meu-chat/js/12-nuvem.js`, 320 linhas)

```text
Crie js/98-nuvem.js. Ele faz: Meu Chat — 12-nuvem.js · ☁️ NUVEM (Supabase) — 17/11 - O chat continua funcionando SEM internet: tudo fica no aparelho (IndexedDB). - Com a nuvem ligada, ele COPIA para o Supabase e traz de volta em qualquer aparelho (celular, PC, outro celular) entrando com o mesmo e-mail e senha.
No app original ele tinha estas funções/partes: temEmb, cfg, sessao, ehNeon, neonConn, logado, ligada, auth, traduzir, guardarSessao, token, rest, mod, horaUnica, marcar, ganchos, marcarPrefs, prefsViajam.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 28 — `js/98-entrada.js` (era `app/ferramentas/meu-chat/js/14-entrada.js`, 84 linhas)

```text
Crie js/98-entrada.js. Ele faz: Meu Chat — 14-entrada.js · 🔑 TELA DE LOGIN NA ENTRADA (17/11) Igual à Replit: abriu o Meu Chat em qualquer lugar (celular, PC, PWA, APK) → e-mail + senha → as conversas, a memória, os códigos guardados E as chaves de IA aparecem. Ninguém cola endereço. 19/11: aparece sempre que você ainda não entrou (sem precisar embutir): na 1ª vez, ⚙ cola a URL e a chave anon do Supabase ali mesmo e 📋 copia o comando que cria a tabela.
No app original ele tinha estas funções/partes: dentroDeOutroApp, precisa, mostrar, msg, recuperacao.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 29 — `js/98-provedores.js` (era `app/ferramentas/meu-chat/js/20-provedores.js`, 249 linhas)

```text
Crie js/98-provedores.js. Ele faz: Meu Chat — 20-provedores.js: conversar com as IAs (Gemini, Groq, OpenRouter, OpenAI, DeepSeek, Claude). - Várias chaves; quando uma acaba (limite/cota), passa sozinho para a próxima ("revezar"). - Busca a lista de modelos de verdade na hora de testar a chave (nada de nome velho chumbado). - As chaves ficam SÓ neste aparelho.
No app original ele tinha estas funções/partes: detectar, procurarOllama, chaves, salvarChaves, pontoGemini, listarModelos, pontoLivre, geracao, modeloDe, testarChave, erroLegivel, corsAviso, ehLimite, cabAnthropic, lerSSE, estimar, pedir, parcial.
Ele chamava estes endereços: http://127.0.0.1:11434/api/tags. Em HTML, ligue cada um à função equivalente do módulo certo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 30 — `js/98-memoria.js` (era `app/ferramentas/meu-chat/js/30-memoria.js`, 77 linhas)

```text
Crie js/98-memoria.js. Ele faz: Meu Chat — 30-memoria.js: 🧠 a memória que vai junto em TODA conversa. A IA guarda sozinha o que for importante escrevendo [[lembrar: …]] no fim da resposta (o app tira isso do texto, guarda e mostra "🧠 guardei"). [[esquecer: …]] apaga.
No app original ele tinha estas funções/partes: texto, salvar, lembrar, esquecer, aplicarMarcas, guiaParaPergunta, tamanhoTexto, sistema, abrir.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 31 — `js/98-contextos.js` (era `app/ferramentas/meu-chat/js/33-contextos.js`, 178 linhas)

```text
Crie js/98-contextos.js. Ele faz: Meu Chat — 33-contextos.js: 📌 CONTEXTOS — "cartões" de assunto que você LIGA e DESLIGA. Diferente da 🧠 memória (que vale para sempre e vai em tudo): um contexto é o resumo de um assunto ou de uma conversa (por exemplo, o que você vinha fazendo com o Claude), para a IA não começar do zero. Ligado = vai junto em toda conversa. Desligado = fica guardado, sem gastar.
No app original ele tinha estas funções/partes: lista, gravar, semear, esconder, tokens, ligados, texto, pintarChip, pintar, novo, clique.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 32 — `js/98-guia.js` (era `app/ferramentas/meu-chat/js/34-guia.js`, 39 linhas)

```text
Crie js/98-guia.js. Ele faz: 🧭 Painel do Guia (16/11): o que é cada app do Maikon, a versão atual e COMO USAR, passo a passo. 🔊 lê em voz alta (voz Francisco ou a do aparelho) · 🤖 Perguntar: o chat explica aquele app.
No app original ele tinha estas funções/partes: textoDe, pintar, iniciar.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 33 — `js/98-jeito.js` (era `app/ferramentas/meu-chat/js/35-jeito.js`, 56 linhas)

```text
Crie js/98-jeito.js. Ele faz: Meu Chat — 35-jeito.js: 🎭 O JEITO DE CADA IA. Para não ter "mudança drástica" quando troca de IA: um jeito de conversar que vale para TODAS (parceiro, calmo, honesto) e, se quiser, um jeito só de uma (ex.: o Perplexity como pesquisador jurídico que sempre traz as fontes). Tudo editável em ⚙️ → 🎭 Jeito de cada IA.
No app original ele tinha estas funções/partes: geral, deUma, texto, pintar.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 34 — `js/98-gasto.js` (era `app/ferramentas/meu-chat/js/36-gasto.js`, 105 linhas)

```text
Crie js/98-gasto.js. Ele faz: Meu Chat — 36-gasto.js · 💰 QUANTO GASTOU (17/11) Igual ao da Monica: embaixo de cada resposta aparece quantos "tokens" foram e quanto custou, e o painel 💰 mostra o gasto de hoje, da semana e do mês, por IA. - "Entrada" = tudo que vai junto na pergunta: regras, memória, guia, contextos e o HISTÓRICO da conversa.
No app original ele tinha estas funções/partes: tabela, dolar, geminiPago, preco, custo, mil, reais, texto, dia, registrar, somar, pintar, linhaT, abrir.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 35 — `js/98-arquivos.js` (era `app/ferramentas/meu-chat/js/37-arquivos.js`, 100 linhas)

```text
Crie js/98-arquivos.js. Ele faz: Meu Chat — 37-arquivos.js · 📎 ARQUIVOS, 📦 ZIP e 🔤 ACENTOS (17/11) - 🔤 Lê qualquer texto com os acentos certos: tenta UTF-8 e, se não for, Windows-1252/Latin-1 (era o "negócio de UTF-8" que fazia outros sites não lerem o arquivo). - 📦 Projeto .zip: abre AQUI DENTRO, mostra a árvore, deixa ver cada arquivo e você marca.
No app original ele tinha estas funções/partes: lerTexto, textoDoArquivo, tokens, mil, item, abrirZip, abrirRepo, api, raw, janela, conta, pintar.
Ele chamava estes endereços: https://api.github.com/repos/. Em HTML, ligue cada um à função equivalente do módulo certo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 36 — `js/98-codigos.js` (era `app/ferramentas/meu-chat/js/38-codigos.js`, 71 linhas)

```text
Crie js/98-codigos.js. Ele faz: Meu Chat — 38-codigos.js · 🧪 MEUS CÓDIGOS (17/11) Igual ao playground do jurídico original: cada código que a IA fizer tem o botão 💾 Guardar. Ficam aqui, com nome, e vão para a nuvem (com o login, aparecem em qualquer aparelho). Abrir = abre no ▶ playground (ver funcionando e mexer). Nada some sem você confirmar.
No app original ele tinha estas funções/partes: todos, gravar, tituloDe, igual, guardar, pintar, clique, atualizar, abrir, playground.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 37 — `js/98-qr.js` (era `app/ferramentas/meu-chat/js/39-qr.js`, 69 linhas)

```text
Crie js/98-qr.js. Ele faz: Meu Chat — 39-qr.js · 🔳 LER QR CODE (17/11) Aponta a câmera (ou escolhe um print) e o texto do QR vai para a caixa de mensagem. Entende os QR em sequência do Colecionador ("1 de 5, 2 de 5…"): junta sozinho, em qualquer ordem.
No app original ele tinha estas funções/partes: carregar, descompactar, detector, parar, entregar, juntar, abrir, laco.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 38 — `js/98-voz.js` (era `app/ferramentas/meu-chat/js/40-voz.js`, 227 linhas)

```text
Crie js/98-voz.js. Ele faz: Meu Chat — 40-voz.js: 🎤 falar (ditado) e 🔊 ouvir a resposta. 🔊 DOIS "motores" de voz (⚙️ → Voz): - 📱 "Voz do aparelho" (o padrão): funciona com QUALQUER IA (Gemini, Groq, Claude, Ollama…), grátis e sem limite. Você escolhe a voz (as ⭐ são as naturais), a velocidade e o tom.
No app original ele tinha estas funções/partes: podeOuvir, ouvir, parar, marcar, paraFala, pedacos, noPC, motor, temAndroid, temNavegador, natural, vozesAparelho, cfgVoz, falarFrase, enfileirar, verificarFim, pararAparelho, fluxo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 39 — `js/98-pronto.js` (era `app/ferramentas/meu-chat/js/41-pronto.js`, 57 linhas)

```text
Crie js/98-pronto.js. Ele faz: Meu Chat — 41-pronto.js · 🔔 AVISO DE "RESPOSTA PRONTA" (18/11) Para o Ollama (ou qualquer IA lenta): você manda a pergunta, vai mexer em outra coisa, e quando a resposta termina o celular/PC APITA, VIBRA e mostra uma NOTIFICAÇÃO. 🔆 "Tela acesa": enquanto ela escreve, o aparelho não apaga a tela (assim o Android.
No app original ele tinha estas funções/partes: ligado, telaAcesa, pedirPermissao, apito, comecou, terminou.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 40 — `js/98-testar.js` (era `app/ferramentas/meu-chat/js/42-testar.js`, 75 linhas)

```text
Crie js/98-testar.js. Ele faz: Meu Chat — 42-testar.js · 🧪 TESTAR O CÓDIGO AQUI DENTRO (a "sandbox") (18/11) Sandbox = uma caixa FECHADA onde o código roda sem mexer em nada seu. - JavaScript: roda num "trabalhador" separado, com tempo máximo de 10 segundos (se travar num laço infinito, ele é desligado). Mostra o console.log e os erros.
No app original ele tinha estas funções/partes: ehJS, ehPy, podeTestar, trabalhadorJS, fmt, trabalhadorPy, rodar, testar, vai.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 41 — `js/98-links.js` (era `app/ferramentas/meu-chat/js/43-links.js`, 75 linhas)

```text
Crie js/98-links.js. Ele faz: Meu Chat — 43-links.js · 🔗 LINKS E NAVEGADOR INTERNO (18/11) Um "colador de links" aqui dentro, que NÃO gasta nada da IA: - guarde os seus links (versões dos apps, repositórios, sites de tribunal…); - 🌐 Abrir aqui: abre o site numa janela dentro do Meu Chat (alguns sites não deixam: aí use ↗ Abrir fora);.
No app original ele tinha estas funções/partes: todos, salvar, normal, pintar, navegador, atual, trazer, guardar, clique, abrir.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 42 — `js/98-docs.js` (era `app/ferramentas/meu-chat/js/44-docs.js`, 35 linhas)

```text
Crie js/98-docs.js. Ele faz: Meu Chat — 44-docs.js · 📄 DOCUMENTAÇÃO DOS PROJETOS (18/11) Cada projeto tem um README.md completo (o que é, recursos, onde ficam os dados, regras e o MAPA dos arquivos). Aqui você escolhe um e ele entra na conversa SÓ AGORA — não vai em toda mensagem. Serve para a IA (qualquer uma, inclusive o Claude) entender o projeto sem ler o código inteiro.
No app original ele tinha estas funções/partes: ler, abrir.
Ele chamava estes endereços: docs/. Em HTML, ligue cada um à função equivalente do módulo certo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 43 — `js/98-mesa.js` (era `app/ferramentas/meu-chat/js/45-mesa.js`, 123 linhas)

```text
Crie js/98-mesa.js. Ele faz: Meu Chat — 45-mesa.js · 🧰 MESA DO LADO (18/11) — para tela grande (computador, .exe, tablet deitado) No celular (20/11) a mesa abre por cima, na tela toda; o playground fica guardado; aba 🧰 com as ferramentas sem IA. O chat fica à esquerda, igual. À direita, uma MESA separada que NÃO gasta nada da IA: ▶ Playground  — o código que a IA fez vai para cá (botão ➡ Mesa nos blocos de código): mexa e veja funcionando.
No app original ele tinha estas funções/partes: LARGA, ligada, montar, guardarAtual, trocarAba, aplicar, cheia, alternar, pintarFerr, rodar, receber, pintarLinks, urlBoa, pintarCodigos, clique.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 44 — `js/98-internet.js` (era `app/ferramentas/meu-chat/js/50-internet.js`, 58 linhas)

```text
Crie js/98-internet.js. Ele faz: Meu Chat — 50-internet.js: 🌐 pesquisar e 🔗 ler links. - Gemini e Claude pesquisam sozinhos (a busca vem embutida neles). - As outras IAs: usa a SUA chave de busca (Serper, Tavily ou Brave), se tiver, e manda os resultados junto. - Link na mensagem: o app lê a página (pelo leitor r.jina.ai, grátis) e manda o texto para a IA.
No app original ele tinha estas funções/partes: buscar, lerLink, preparar.
Ele chamava estes endereços: https://google.serper.dev/search, https://api.tavily.com/search, https://api.search.brave.com/res/v1/web/search?count=8&country=BR&search_lang=pt-br&q=, https://r.jina.ai/. Em HTML, ligue cada um à função equivalente do módulo certo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 45 — `js/98-previa.js` (era `app/ferramentas/meu-chat/js/60-previa.js`, 88 linhas)

```text
Crie js/98-previa.js. Ele faz: Meu Chat — 60-previa.js: 👁 ver o código funcionando, na hora. - HTML: abre a página como ela é. - TSX / JSX (React): monta com React + Babel + Tailwind (pela internet) e mostra o componente. Os erros aparecem embaixo, em vermelho.
No app original ele tinha estas funções/partes: paginaHTML, paginaReact, falha, req, App, tipoDe, abrir.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 46 — `js/98-texto.js` (era `app/ferramentas/meu-chat/js/70-texto.js`, 48 linhas)

```text
Crie js/98-texto.js. Ele faz: Meu Chat — 70-texto.js: mostra a resposta da IA bonitinha (negrito, listas, links, blocos de código com 📋 copiar, ⤓ baixar e 👁 ver funcionando).
No app original ele tinha estas funções/partes: inline, render, ligar.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 47 — `js/98-chat.js` (era `app/ferramentas/meu-chat/js/80-chat.js`, 320 linhas)

```text
Crie js/98-chat.js. Ele faz: Meu Chat — 80-chat.js: a conversa (mensagens, fotos, mandar, parar, lista de conversas). Cada conversa fica guardada no aparelho. Vai para a IA: a memória + as últimas mensagens.
No app original ele tinha estas funções/partes: nova, abrirConversa, guardar, reduzir, tokFoto, anexar, pintarAnexos, carregar, juntarFotos, ocrFotos, htmlMsg, dedup, hora, pintar, mandar, responder, depois, comparar.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 48 — `js/98-config.js` (era `app/ferramentas/meu-chat/js/85-config.js`, 115 linhas)

```text
Crie js/98-config.js. Ele faz: Meu Chat — 85-config.js: ⚙️ chaves das IAs, modelo, busca, voz, instruções, tema.
No app original ele tinha estas funções/partes: opcoesVoz, pintar, clique, mudou, aplicarTema, abrir.
Ele chamava estes endereços: voz-francisco.py. Em HTML, ligue cada um à função equivalente do módulo certo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 49 — `js/98-cofre.js` (era `app/ferramentas/meu-chat/js/87-cofre.js`, 96 linhas)

```text
Crie js/98-cofre.js. Ele faz: Meu Chat — 87-cofre.js: 🔐 Cofre de chaves. Mostra cada chave guardada (👁 ver, 📋 copiar) e leva SÓ as chaves para outro app/aparelho num arquivo trancado com senha — o mesmo arquivo do Mini SK (js/lib/cofre-arquivo.js).
No app original ele tinha estas funções/partes: todas, pintar, status, conteudo, baixar, trazer, selarTexto, trazerTexto.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 50 — `js/98-backup.js` (era `app/ferramentas/meu-chat/js/90-backup.js`, 44 linhas)

```text
Crie js/98-backup.js. Ele faz: Meu Chat — 90-backup.js: 💾 backup de tudo (conversas + memória + ajustes) e restaurar SEM APAGAR NADA.
No app original ele tinha estas funções/partes: gerar, baixar, restaurar.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 51 — `js/98-restaurar.js` (era `app/ferramentas/meu-chat/js/91-restaurar.js`, 53 linhas)

```text
Crie js/98-restaurar.js. Ele faz: Meu Chat — 91-restaurar.js · ♻️ RESTAURAR QUALQUER BACKUP (18/11) O ⤒ Restaurar agora entende QUALQUER arquivo dos seus apps: backup do Meu Chat, do SK Jurídico, o ⬇ backup do 🗄 Banco/Neon (tabela mc_itens), o banco antigo do SK Jurídico 1.7… Reconhece sozinho, mostra o que achou, traz o que é do Meu Chat (junta, não apaga).
No app original ele tinha estas funções/partes: ler, trazerMeuChat, janela, abrirArquivo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 52 — `js/98-ponte-lab.js` (era `app/ferramentas/meu-chat/js/95-ponte-lab.js`, 20 linhas)

```text
Crie js/98-ponte-lab.js. Ele faz: 🔬 Ponte com o Laboratório: quando o Meu Chat está DENTRO do Laboratório (aba 🤖 IA), o Laboratório pode mandar texto para a caixa de escrever (o plano do projeto, a memória, a comparação A × B). Só aceita mensagens da própria página (mesmo endereço).
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 53 — `js/98-janela-pc.js` (era `app/ferramentas/meu-chat/js/janela-pc.js`, 20 linhas)

```text
Crie js/98-janela-pc.js. Ele faz: 🖥 JANELA DO PC (18/11) — igual ao Mini SK para PC: um botão para a janela ir de 📱 cara de celular → 📟 média → 🖥 tela cheia, e voltar. Só aparece no programa .exe.
No app original ele tinha estas funções/partes: ler, por, botao.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 54 — `js/98-cofre-arquivo.js` (era `app/ferramentas/meu-chat/js/lib/cofre-arquivo.js`, 61 linhas)

```text
Crie js/98-cofre-arquivo.js. Ele faz: 🔐 Arquivo de chaves do Maikon — o MESMO formato no Mini SK, no Meu Chat e no que vier depois. Guarda SÓ as chaves (IA, GitHub, Expo, pesquisa e "Minhas chaves"), trancadas com uma senha sua (AES-GCM 256 + PBKDF2 com 250 mil voltas — sem a senha, o arquivo não abre). Assim dá para levar as chaves de um app/aparelho para outro sem passar pelo WhatsApp.
No app original ele tinha estas funções/partes: b64, deB64, chaveDaSenha, normal, selar, abrir, contar, mascara.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 55 — `js/98-ferramentas-lista.js` (era `app/ferramentas/meu-chat/js/lib/ferramentas-lista.js`, 3 linhas)

```text
Crie js/98-ferramentas-lista.js. Ele faz: lista das ferramentas sem IA (20/11) — usada pela 🧰 Mesa.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 56 — `js/98-guia-maikon.js` (era `app/ferramentas/meu-chat/js/lib/guia-maikon.js`, 118 linhas)

```text
Crie js/98-guia-maikon.js. Ele faz: 🧭 Guia das ferramentas do Maikon — o MESMO texto em todos os apps (Mini SK, Meu Chat…). A IA de cada app lê isto sozinha: assim ela já sabe o que ele tem, para que serve cada coisa, e quando é melhor mandar para outra ferramenta ou "levar para o Claude". Para atualizar: troque este arquivo nos apps (o Claude manda a versão nova junto).
No app original ele tinha estas funções/partes: resumoParaClaude, esconder.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 57 — `js/98-guia-versoes.js` (era `app/ferramentas/meu-chat/js/lib/guia-versoes.js`, 179 linhas)

```text
Crie js/98-guia-versoes.js. Ele faz: 🧭 Guia das VERSÕES — o que é cada app do Maikon, qual a versão atual, e COMO USAR (passo a passo). Uma fonte só: o painel 🧭 do Meu Chat mostra isto para ele ler, e a IA recebe o mesmo texto (junto do guia-maikon.js) para saber explicar. Atualizado pelo Claude a cada versão nova.
No app original ele tinha estas funções/partes: texto.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 58 — `js/98-nuvem-neon.js` (era `app/ferramentas/meu-chat/js/lib/nuvem-neon.js`, 75 linhas)

```text
Crie js/98-nuvem-neon.js. Ele faz: 🐘 Nuvem pelo NEON (17/11) — usada pelo Meu Chat e pelo SK Jurídico HTML. Você cola o endereço do banco (a "connection string" postgresql://…) e pronto: o app cria a tabela SOZINHO (não precisa rodar nada em inglês no site do Neon). ⚠ Esse endereço tem a SENHA do banco: fica só no seu aparelho (como uma chave de IA),.
No app original ele tinha estas funções/partes: traduzir, preparar, upsert, listar, conv, consulta.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 59 — `js/98-playground-replit.js` (era `app/ferramentas/meu-chat/js/lib/playground-replit.js`, 198 linhas)

```text
Crie js/98-playground-replit.js. Ele é uma parte de logica do app.
No app original ele tinha estas funções/partes: ESC, App, completo, limparDoc, detectar, preJSX, docHTML, docReact, documento, doZip, pasta, junta, achar, abrir, aviso, guardarLocal, abas, info.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 60 — `js/98-reconhecer.js` (era `app/ferramentas/meu-chat/js/lib/reconhecer.js`, 108 linhas)

```text
Crie js/98-reconhecer.js. Ele faz: ♻️ RECONHECER (18/11) — a mesma peça no Meu Chat, no SK Jurídico HTML e no 🗄 Banco. Recebe QUALQUER coisa que veio dos seus apps e diz sozinho O QUE É e PARA ONDE VAI: - backup do Meu Chat (.json) · backup do SK Jurídico HTML / Assistente Jurídico (.json) - o "⬇ backup" do 🗄 Banco (todas as tabelas) ou o próprio banco lido direto (Neon).
No app original ele tinha estas funções/partes: vazio, quando, txtHtml, colunas, parse, deTabelas, detectar, formatoMarkdown.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 61 — `js/98-nuvem-embutida.js` (era `app/ferramentas/meu-chat/js/nuvem-embutida.js`, 11 linhas)

```text
Crie js/98-nuvem-embutida.js. Ele faz: ☁️ SUPABASE EMBUTIDO (17/11) Estas duas informações são PÚBLICAS de propósito (todo site que usa Supabase tem elas dentro). Quem protege os seus dados é o LOGIN (e-mail e senha) e a regra "cada um vê o seu" da tabela. Com elas aqui dentro, em qualquer aparelho o app abre a tela de login: e-mail + senha e pronto.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 62 — `js/98-ia.js` (era `app/js/10-ia.js`, 209 linhas)

```text
Crie js/98-ia.js. Ele faz: Assistente Jurídico — 10-ia.js Fala com a IA. Principal: Google Gemini (chave grátis, AIza… ou AQ.…). Reserva: Groq (grátis, chave gsk_…) — se o Gemini der "limite", troca sozinho. O modelo antigo (gemini-1.5-flash) foi desligado pelo Google: era um dos.
No app original ele tinha estas funções/partes: cfg, salvar, sistemaBase, textoDeErro, gFetch, corpoGemini, gemini, groq, ollama, ollamaInfo, compat, claude, modelosOpenRouter, gerar, modelos.
Ele chamava estes endereços: https://api.anthropic.com/v1/messages, https://openrouter.ai/api/v1/models. Em HTML, ligue cada um à função equivalente do módulo certo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 63 — `js/98-online.js` (era `app/js/12-online.js`, 102 linhas)

```text
Crie js/98-online.js. Ele faz: SK Jurídico HTML — 12-online.js · ☁️ MODO ONLINE (IGUAL À REPLIT) (19/11) Com a nuvem ligada (Supabase com login OU o seu Neon), os documentos, modelos, ementas, conversas, regras e códigos ficam SÓ na nuvem — o aparelho (PWA/APK) não enche, e não existe mais "enviar e puxar": abriu em outro aparelho, está lá.
No app original ele tinha estas funções/partes: ligado, neon, conn, limpaCache, nLista, nPega, nGrava, linhaDe, pendente, subirPendentes, liberar, ocupa.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 64 — `js/98-voz.js` (era `app/js/12-voz.js`, 167 linhas)

```text
Crie js/98-voz.js. Ele faz: Assistente Jurídico — 12-voz.js 🎤 Ditado (falar e virar texto) e 🔊 leitura em voz NATURAL. A voz é a do Gemini (gente de verdade, não robô) — usa a mesma chave grátis. Voz "de robô" do aparelho NUNCA é usada. No navegador Edge, as vozes.
No app original ele tinha estas funções/partes: noPC, cfg, audioFrancisco, francisco, limpar, pedacos, wav, audioGemini, parar, vozesNaturais, nat, falar, fim, ditar, botaoDitado.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 65 — `js/98-nuvem.js` (era `app/js/13-nuvem.js`, 386 linhas)

```text
Crie js/98-nuvem.js. Ele faz: SK Jurídico HTML — 13-nuvem.js · ☁️ NUVEM (Supabase) — 17/11 - O MESMO LOGIN e o MESMO Supabase do 💬 Meu Chat (entrou num, entrou no outro). - Tudo continua no aparelho (funciona sem internet); a nuvem COPIA e leva para o celular, o PC, outro aparelho.
No app original ele tinha estas funções/partes: MCK, lerMC, gravarMC, SQL_TABELAS, sqlCerto, temEmb, secreta, cfg, sessao, tipoNuvem, neonConn, ehNeon, logado, ligada, traduzir, auth, guardarSessao, token.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 66 — `js/98-entrada.js` (era `app/js/14-entrada.js`, 120 linhas)

```text
Crie js/98-entrada.js. Ele faz: SK Jurídico HTML — 14-entrada.js · 🔑 TELA DE LOGIN NA ENTRADA (17/11) Igual à Replit: abriu o app em qualquer aparelho (celular, PC, PWA, APK) → e-mail + senha → os seus processos aparecem. Ninguém cola endereço nenhum. 19/11: aparece sempre que você ainda não entrou (sem embutir nada): na 1ª vez.
No app original ele tinha estas funções/partes: conferirEmail, dentro, precisa, mostrar, msg, campos, recuperacao.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 67 — `js/98-importar.js` (era `app/js/15-importar.js`, 60 linhas)

```text
Crie js/98-importar.js. Ele faz: Assistente Jurídico — 15-importar.js Lê arquivos: PDF, Word (.docx), TXT, MD, RTF, HTML. PDF e Word usam bibliotecas que vêm da internet só na 1ª vez. Foto/escaneado (precisa de OCR): use a ferramenta 🧹 Limpador.
No app original ele tinha estas funções/partes: pdf, docx, rtf, htmlParaTexto, lerArquivo, escolher.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 68 — `js/98-internet.js` (era `app/js/16-internet.js`, 51 linhas)

```text
Crie js/98-internet.js. Ele faz: Assistente Jurídico — 16-internet.js 🌐 Pesquisa na internet para QUALQUER IA (Ollama, Groq, Claude, OpenAI…). O Gemini pesquisa sozinho. As outras usam a SUA chave de busca (Serper, Tavily ou Brave, todas com uso grátis) e recebem os resultados junto.
No app original ele tinha estas funções/partes: cfg, buscar, lerLink, preparar.
Ele chamava estes endereços: https://google.serper.dev/search, https://api.tavily.com/search, https://api.search.brave.com/res/v1/web/search?count=8&country=BR&search_lang=pt-br&q=, https://r.jina.ai/. Em HTML, ligue cada um à função equivalente do módulo certo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 69 — `js/98-banco.js` (era `app/js/17-banco.js`, 127 linhas)

```text
Crie js/98-banco.js. Ele faz: SK Jurídico HTML — 17-banco.js · 🗄 BANCO (23/11) — igual ao painel do Neon Abre por ⚙️ Config → ☁️ Nuvem → 🗄 Banco. Mostra, sem ir no site do Supabase: • 📐 o ESQUEMA: cada tabela, para que serve e as colunas; • 🔎 CONFERIR: quais tabelas existem e quais faltam, e quantas linhas cada uma tem;.
No app original ele tinha estas funções/partes: data, tabelas, linkSql, abrir, conferir, verLinhas, verConteudo, perguntar, clique.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 70 — `js/98-texto.js` (era `app/js/18-texto.js`, 77 linhas)

```text
Crie js/98-texto.js. Ele faz: Assistente Jurídico — 18-texto.js Transforma o texto que a IA devolve (com ##, **negrito**, listas) em texto formatado de verdade — para mostrar na tela e para o Editor/Word.
No app original ele tinha estas funções/partes: inline, mdParaHtml, cel, htmlParaTexto, limparHtml, andar, textoParaHtml.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 71 — `js/98-processar.js` (era `app/js/20-processar.js`, 139 linhas)

```text
Crie js/98-processar.js. Ele faz: Assistente Jurídico — 20-processar.js ⚡ Processar: cole/abra o texto do processo → escolha o que fazer → resultado formatado → Editor, Word, ouvir, salvar ou conversar sobre ele. As ações vieram do "Assistente Jurídico Pro" antigo (mesmos pedidos).
No app original ele tinha estas funções/partes: montar, pintarAcoes, conta, receber, executar, andamento, podar.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 72 — `js/98-motor.js` (era `app/js/21-motor.js`, 63 linhas)

```text
Crie js/98-motor.js. Ele faz: SK Jurídico HTML — 21-motor.js · ⚙️ O MOTOR DO SEU JURÍDICO (17/11) Os textos abaixo vieram PALAVRA POR PALAVRA do servidor do SK Jurídico 1.7.x (server/routes/ai.ts: SYSTEM_PROMPT_BASE, ACTION_PROMPTS e os níveis de esforço). Agora rodam aqui no aparelho, sem servidor: o texto vai direto para a IA que você escolheu.
No app original ele tinha estas funções/partes: montar.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 73 — `js/98-drive.js` (era `app/js/22-drive.js`, 87 linhas)

```text
Crie js/98-drive.js. Ele faz: Assistente Jurídico — 22-drive.js ☁️ GOOGLE DRIVE DIRETO: manda e busca arquivos na SUA conta do Drive, numa pasta "Assistente Jurídico", sem precisar do app do Drive. Precisa de um "ID do cliente" (Client ID) do Google — é de graça, faz uma.
No app original ele tinha estas funções/partes: cfg, salvar, configurado, conectar, api, pasta, enviar, listar, baixar.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 74 — `js/98-regras.js` (era `app/js/25-regras.js`, 125 linhas)

```text
Crie js/98-regras.js. Ele faz: Assistente Jurídico — 25-regras.js 📜 O "cérebro" do seu escritório, que cresce com o tempo, SEM mexer no código: - Regras: como a IA deve escrever e processar (cole quantas quiser; liga/desliga). - Memória: o que a IA deve saber (dados do escritório, preferências, casos).
No app original ele tinha estas funções/partes: adicionarPacote, tirarRepetidas, carregar, paraIA, montar, exportar, pintar, clique.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 75 — `js/98-editor.js` (era `app/js/30-editor.js`, 133 linhas)

```text
Crie js/98-editor.js. Ele faz: Assistente Jurídico — 30-editor.js ✏️ Editor com formatação de verdade (folha A4, padrão ABNT): negrito, itálico, sublinhado, títulos, citação recuada, alinhamento, recuo da 1ª linha, listas, fonte e tamanho. Baixa em Word (.docx) de verdade.
No app original ele tinha estas funções/partes: montar, voltarSelecao, estilizar, marcarMudou, html, texto, nomeArquivo, paginaHtml, abrir, salvar, iaNaSelecao.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 76 — `js/98-docx.js` (era `app/js/35-docx.js`, 196 linhas)

```text
Crie js/98-docx.js. Ele faz: Assistente Jurídico — 35-docx.js ⬇ Word de VERDADE (.docx), feito aqui no aparelho, sem internet. Folha A4, margens ABNT (3/3/2/2 cm), Times 12, espaçamento 1,5, recuo de 2,5 cm na 1ª linha, citação recuada 4 cm em 10 pt,.
No app original ele tinha estas funções/partes: tamanhoMeioPonto, run, runs, paragrafo, alinhamento, corpo, bloco, filhos, despeja, timbrados, gerarComModelo, gerar, parTimbre, escolher, baixar, importarModelo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 77 — `js/98-conversa.js` (era `app/js/40-conversa.js`, 128 linhas)

```text
Crie js/98-conversa.js. Ele faz: Assistente Jurídico — 40-conversa.js 💬 Conversa com a IA sobre o caso — por texto ou por VOZ. 📎 Contexto: o documento do Editor, o texto do Processar ou um arquivo. 🔁 Modo voz: você fala → a IA responde em voz natural → escuta de novo.
No app original ele tinha estas funções/partes: nova, montar, definirContexto, pintarContexto, listar, pintar, guardar, enviar, escutar, alternarModoVoz, pintarModo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 78 — `js/98-documentos.js` (era `app/js/50-documentos.js`, 81 linhas)

```text
Crie js/98-documentos.js. Ele faz: Assistente Jurídico — 50-documentos.js 📁 Documentos salvos no aparelho + 🕐 histórico do que a IA fez. Abrir no Editor, baixar em Word, mandar ao Drive, duplicar, apagar. 💾 Backup de tudo num arquivo só (e restaurar em outro aparelho).
No app original ele tinha estas funções/partes: nomeArq, montar, casa, pintar, item, acao, backup, restaurar.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 79 — `js/98-biblioteca.js` (era `app/js/55-biblioteca.js`, 87 linhas)

```text
Crie js/98-biblioteca.js. Ele faz: Assistente Jurídico — 55-biblioteca.js 📐 Modelos (peças prontas com [CAMPOS]) e 📚 Ementas (jurisprudência que VOCÊ guarda — a IA só usa as que você marcar; nada inventado). 🪄 Preencher modelo com o caso: a IA completa os [CAMPOS] com o texto do ⚡ Processar.
No app original ele tinha estas funções/partes: montar, pintarModelos, pintarEmentas, acao.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 80 — `js/98-restaurar.js` (era `app/js/56-restaurar.js`, 55 linhas)

```text
Crie js/98-restaurar.js. Ele faz: SK Jurídico HTML — 56-restaurar.js · ♻️ RESTAURAR QUALQUER BACKUP (18/11) Escolha QUALQUER arquivo dos seus apps (backup do SK Jurídico, do Meu Chat, o ⬇ backup do 🗄 Banco/Neon, o banco antigo do SK Jurídico 1.7 da Replit…). Ele RECONHECE sozinho o formato, mostra o que achou e traz para o lugar certo. Sempre JUNTA (não apaga nada do que já está aqui).
No app original ele tinha estas funções/partes: lerArquivo, janela, abrirArquivo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 81 — `js/98-codigos.js` (era `app/js/60-codigos.js`, 135 linhas)

```text
Crie js/98-codigos.js. Ele faz: Assistente Jurídico — 60-codigos.js 🧪 MEUS CÓDIGOS: playground que GUARDA. Para os seus códigos jurídicos (calculadoras, modelos em HTML, ferramentas antigas…). Cole ou importe (vários de uma vez, inclusive .zip), rode ao vivo.
No app original ele tinha estas funções/partes: humano, tipoDe, chaveDe, jaTem, tirarRepetidos, ant, playground, montar, guarda, carregar, pintar, abrir, modo, rodar, fechar.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 82 — `js/98-ferramentas.js` (era `app/js/70-ferramentas.js`, 64 linhas)

```text
Crie js/98-ferramentas.js. Ele faz: Assistente Jurídico — 70-ferramentas.js 🧰 As ferramentas que já funcionam, cada uma no seu arquivo (ferramentas/), abertas aqui dentro. Ficam "vivas": trocar de aba não apaga o que estava sendo feito nelas.
No app original ele tinha estas funções/partes: montar, passarChave, abrir.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 83 — `js/98-config.js` (era `app/js/80-config.js`, 210 linhas)

```text
Crie js/98-config.js. Ele faz: Assistente Jurídico — 80-config.js ⚙️ Chave da IA (Gemini grátis + Groq de reserva), voz, seus dados e regras do escritório (a IA segue sempre). Tudo fica só neste aparelho.
No app original ele tinha estas funções/partes: montar, pintarOutra, salvarO, pintarProv, salvarDr, preencherOl, olMsg, pintarCat, guardarChave, linkBusca, pintarVoz, guardarVoz, pintarTb.
Ele chamava estes endereços: kits/voz-francisco.py. Em HTML, ligue cada um à função equivalente do módulo certo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 84 — `js/98-janela-pc.js` (era `app/js/janela-pc.js`, 20 linhas)

```text
Crie js/98-janela-pc.js. Ele faz: 🖥 JANELA DO PC (18/11) — igual ao Mini SK para PC: um botão para a janela ir de 📱 cara de celular → 📟 média → 🖥 tela cheia, e voltar. Só aparece no programa .exe.
No app original ele tinha estas funções/partes: ler, por, botao.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 85 — `js/98-nuvem-neon.js` (era `app/js/lib/nuvem-neon.js`, 75 linhas)

```text
Crie js/98-nuvem-neon.js. Ele faz: 🐘 Nuvem pelo NEON (17/11) — usada pelo Meu Chat e pelo SK Jurídico HTML. Você cola o endereço do banco (a "connection string" postgresql://…) e pronto: o app cria a tabela SOZINHO (não precisa rodar nada em inglês no site do Neon). ⚠ Esse endereço tem a SENHA do banco: fica só no seu aparelho (como uma chave de IA),.
No app original ele tinha estas funções/partes: traduzir, preparar, upsert, listar, conv, consulta.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 86 — `js/98-playground-replit.js` (era `app/js/lib/playground-replit.js`, 198 linhas)

```text
Crie js/98-playground-replit.js. Ele é uma parte de logica do app.
No app original ele tinha estas funções/partes: ESC, App, completo, limparDoc, detectar, preJSX, docHTML, docReact, documento, doZip, pasta, junta, achar, abrir, aviso, guardarLocal, abas, info.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 87 — `js/98-reconhecer.js` (era `app/js/lib/reconhecer.js`, 108 linhas)

```text
Crie js/98-reconhecer.js. Ele faz: ♻️ RECONHECER (18/11) — a mesma peça no Meu Chat, no SK Jurídico HTML e no 🗄 Banco. Recebe QUALQUER coisa que veio dos seus apps e diz sozinho O QUE É e PARA ONDE VAI: - backup do Meu Chat (.json) · backup do SK Jurídico HTML / Assistente Jurídico (.json) - o "⬇ backup" do 🗄 Banco (todas as tabelas) ou o próprio banco lido direto (Neon).
No app original ele tinha estas funções/partes: vazio, quando, txtHtml, colunas, parse, deTabelas, detectar, formatoMarkdown.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 88 — `js/98-segredos.js` (era `app/js/lib/segredos.js`, 47 linhas)

```text
Crie js/98-segredos.js. Ele faz: 🛡 SEGREDOS (20/11) — reconhece CHAVES SECRETAS para elas não irem parar no chat, na IA nem na nuvem. Usado pelo Meu Chat e pelo SK Jurídico HTML. - ehSecreta(chave): true se for a chave "service_role", "sb_secret_…", token "sbp_…" etc. (A palavra "service_role" fica ESCONDIDA dentro da chave eyJ…: é preciso abrir a chave para ver.).
No app original ele tinha estas funções/partes: papelJwt, achar, tampar, ehSecreta.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 89 — `js/98-nuvem-embutida.js` (era `app/js/nuvem-embutida.js`, 9 linhas)

```text
Crie js/98-nuvem-embutida.js. Ele faz: ☁️ SUPABASE EMBUTIDO — SK JURÍDICO NOVO (24/11) · banco PRÓPRIO do jurídico, uma tabela para cada coisa. Coloque aqui o endereço e a chave PÚBLICA (publishable) do Supabase do jurídico. Enquanto estiver vazio, a tela de entrada pede os dois uma vez ("⚙ 1ª vez"). NUNCA a chave secreta.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 90 — `js/98-tema.js` (era `app/js/tema.js`, 44 linhas)

```text
Crie js/98-tema.js. Ele faz: 🎨 TEMA — trocar as cores do app (18/11). O mesmo arquivo em todos os apps do Maikon. Escuro (o de sempre) · Claro · Alto contraste (letra bem branca no preto) · Papel (sépia, cansa menos a vista). Cada app diz quais são as cores dele (window.TEMA_APP) e onde fica o botão 🎨. Fica guardado neste aparelho. Não muda nada do projeto, só as cores da tela.
No app original ele tinha estas funções/partes: ler, aplicar, menu, fora, botao.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 91 — `js/98-voz-francisco.js` (era `app/kits/voz-francisco.py`, 134 linhas)

```text
Crie js/98-voz-francisco.js. Ele faz: !/usr/bin/env python3 -*- coding: utf-8 -*-.
No app original ele tinha estas funções/partes: _listar, _falar, Voz, _cabecalhos, do_OPTIONS, _json, _pedido, do_GET, do_POST, _tratar, log_message.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 92 — `js/98-ponte.js` (era `electron/ponte.cjs`, 81 linhas)

```text
Crie js/98-ponte.js. Ele faz: Ponte de arquivos do Mini SK — no PC, o próprio programa liga (no celular, roda no Termux). Leva o projeto da árvore para ~/minisk/NOME e traz de volta o que o terminal criou (dist, arquivos novos…). Só o próprio celular enxerga (127.0.0.1) e só quem tem o código entra.
No app original ele tinha estas funções/partes: nomeProj, dentro, responder, corpo, andar.
O original usava as bibliotecas http, fs, path, os: em HTML puro, use a versão de CDN (ou faça sem ela, se for simples).
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 93 — `js/98-terminal.js` (era `electron/terminal.cjs`, 98 linhas)

```text
Crie js/98-terminal.js. Ele faz: Terminal do computador para o Mini SK — fala o mesmo "idioma" do ttyd (o do Termux), então o painel 📱/💻 do Mini SK funciona sem mudar nada. Cada linha que você digita roda como um comando (cmd no Windows). Ctrl+C para o comando que está rodando. "cd" muda de pasta.
No app original ele tinha estas funções/partes: matar, iniciarTerminal, mandar, curto, prompt, trocarLinha, parar, expandir, rodar, tecla.
O original usava as bibliotecas ws, child_process, path, fs, os: em HTML puro, use a versão de CDN (ou faça sem ela, se for simples).
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 94 — `js/98-saude.js` (era `electron/saude.cjs`, 159 linhas)

```text
Crie js/98-saude.js. Ele faz: 🩺 Saúde do computador — para o Mini SK para PC. Mostra, em português simples: espaço nos discos, memória, o que está usando as portas, as peças instaladas (Node, npm, Git, Ollama), o tamanho das pastas do Mini SK e o que dá para limpar. Também faz cópia de segurança (backup) dos projetos para outra pasta / HD externo.
No app original ele tinha estas funções/partes: rodar, tamanho, discos, nomesDosProgramas, portas, versao, analisar, apagarConteudo, limpar, backup, fecharPrograma.
O original usava as bibliotecas child_process, os, fs, path: em HTML puro, use a versão de CDN (ou faça sem ela, se for simples).
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 95 — `js/98-voz.js` (era `electron/voz.cjs`, 85 linhas)

```text
Crie js/98-voz.js. Ele faz: 🗣 voz.cjs — a voz Francisco GRÁTIS, já DENTRO do programa do PC (não precisa de Python). Liga sozinha junto com o programa, em http://127.0.0.1:7790 — o mesmo endereço do voz-francisco.py, então os apps (Meu Chat, Assistente Jurídico…) usam igualzinho: ⚙️ → Voz → 🗣 Francisco. Usa a voz do Microsoft Edge (pacote msedge-tts). Precisa de internet. Só aceita pedidos deste PC.
No app original ele tinha estas funções/partes: umAudio, falar, vozes, cabecalhos, json, ligar.
O original usava as bibliotecas http, msedge-tts: em HTML puro, use a versão de CDN (ou faça sem ela, se for simples).
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 96 — `js/98-preload-nav.js` (era `electron/preload-nav.cjs`, 4 linhas)

```text
Crie js/98-preload-nav.js. Ele faz: 🌐 o Navegador do Mini SK só pode pedir uma coisa ao programa: abrir a página no navegador do Windows.
O original usava as bibliotecas electron: em HTML puro, use a versão de CDN (ou faça sem ela, se for simples).
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 97 — `js/98-preload.js` (era `electron/preload.cjs`, 6 linhas)

```text
Crie js/98-preload.js. Ele faz: Conta para o Mini SK que ele está no PC (terminal e ponte já ligados pelo programa).
No app original ele tinha estas funções/partes: arg.
O original usava as bibliotecas electron: em HTML puro, use a versão de CDN (ou faça sem ela, se for simples).
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 98 — `js/98-banco-neon.js` (era `app/ferramentas/banco-neon.html`, 519 linhas)

```text
Crie js/98-banco-neon.js. Ele faz: Banco de Dados (Neon) — 🗄 Banco de Dados (Neon) v18/11.
No app original ele tinha estas funções/partes: vazio, quando, txtHtml, colunas, parse, deTabelas, detectar, formatoMarkdown, mostrarModelo, traduzir, listar, grade, cel, nomeSeguro, ver, baixar, csv, tudoDe.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 99 — `js/98-cacabug.js` (era `app/ferramentas/cacabug/index.html`, 85 linhas)

```text
Crie js/98-cacabug.js. Ele faz: Caça-Bug.
Ele usa o que já foi criado em: js/55-zip.js, js/60-projeto.js, js/20-cirurgiao.js, js/40-projeto-lab.js, js/15-analisador-universal.js, js/50-triagem.js, js/30-gerador-eas.js, js/10-ai-code-studio.js, js/45-raiox.js, js/25-desembrulhar.js, js/65-ferramentas.js, js/80-relatorios.js, js/85-comparar.js, js/95-plano-core.js, js/93-expo-core.js, js/94-organizar-core.js, js/70-organizar.js, js/75-limpo.js, js/90-ia.js, js/91-terminal.js, js/96-tema.js, js/92-janela-pc.js (pelo APP).
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 100 — `js/98-calculadora-sentenca.js` (era `app/ferramentas/calculadora-sentenca.html`, 514 linhas)

```text
Crie js/98-calculadora-sentenca.js. Ele faz: Calculadora da Sentença — Memória de cálculo.
No app original ele tinha estas funções/partes: num, brl, pct, ymDe, ymMais, ymLista, ymBR, dataBR, mesesEntre, esc, lerTela, porNaTela, salvar, carregar, mostrarCaixas, codigoJuros, pintarDados, periodo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 101 — `js/98-colador.js` (era `app/ferramentas/colador.html`, 797 linhas)

```text
Crie js/98-colador.js. Ele faz: Colador de Links — 🔗 Colador de Links.
No app original ele tinha estas funções/partes: uid, ler, gravar, nomeLista, nomeDe, pintar, fixar, tirar, mover, recarregar, pintarJanela, iniciar, montar, salvar, daLista, contar, pintarListas, caixaDe.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 102 — `js/98-colecionador.js` (era `app/ferramentas/colecionador.html`, 1672 linhas)

```text
Crie js/98-colecionador.js. Ele faz: Colecionador de Comandos.
No app original ele tinha estas funções/partes: req, QR8bitByte, QRBitBuffer, QRPolynomial, QRRSBlock, QRCode, esc, semAcento, uid, toast, ler, salvar, copiar, adivinhar, desenharFiltros, desenhar, cartao, lembrete.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 103 — `js/98-comparador.js` (era `app/ferramentas/comparador.html`, 389 linhas)

```text
Crie js/98-comparador.js. Ele faz: Comparador de Versões — ⚖️ Comparador de Versões.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 104 — `js/98-comunicacoes.js` (era `app/ferramentas/comunicacoes.html`, 362 linhas)

```text
Crie js/98-comunicacoes.js. Ele faz: Comunicações Processuais — ⚖️ Comunicações Processuais.
No app original ele tinha estas funções/partes: esc, PAI, carregarDados, iso, periodo, limpar, fData, parse, paraData, sessao, soDig, lerClientes, cols, contaCli, clienteDo, aviso, blocoRobo, chave.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 105 — `js/98-desmontador-backup.js` (era `app/ferramentas/desmontador-backup.html`, 624 linhas)

```text
Crie js/98-desmontador-backup.js. Ele faz: Restaurador Universal — ♻️ Restaurador Universal v21/11-A.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 106 — `js/98-extrator.js` (era `app/ferramentas/extrator.html`, 265 linhas)

```text
Crie js/98-extrator.js. Ele faz: Extrator de Sites — 🛠️ Extrator de Sites.
No app original ele tinha estas funções/partes: esc, LEITOR, hist, salvarHist, renderHist, status, buscar, absoluto, analisar, addRec, extrair, realce, conteudoAba, mostrar, copiar, baixar, nomeBase, CRC.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 107 — `js/98-juntador.js` (era `app/ferramentas/juntador.html`, 437 linhas)

```text
Crie js/98-juntador.js. Ele faz: Juntador de Arquivos — 🧩 Juntador de Arquivos.
No app original ele tinha estas funções/partes: esc, uid, toast, ext, lang, isTexto, bytesFmt, linhas, decode, pareceBinario, b64, unb64, inflate, lerZip, CRC, crc32, escreverZip, textoDocx.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 108 — `js/98-laboratorio.js` (era `app/ferramentas/laboratorio.html`, 823 linhas)

```text
Crie js/98-laboratorio.js. Ele faz: Laboratório HTML — Advocacia Previdenciária.
No app original ele tinha estas funções/partes: separar, ler, cssDosAjustes, regra, completo, guardar, caminho, limpo, info, marcar, pagina, quemE, hex, transparente, num, montar, carregar, enviar.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 109 — `js/98-limpador.js` (era `app/ferramentas/limpador.html`, 665 linhas)

```text
Crie js/98-limpador.js. Ele faz: Limpador de Processos — Limpador de Processos.
No app original ele tinha estas funções/partes: esc, fmt, linhasDaPagina, lerPdf, lerTxt, progresso, adicionar, regrasAtivas, minhasRegras, normLinha, acharRepetidas, limparPagina, processar, montarRegras, montarRepetidas, aplicar, faixas, verPagina.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 110 — `js/98-analisador-v2.js` (era `app/ferramentas/meu-chat/ferramentas/analisador-v2.html`, 1480 linhas)

```text
Crie js/98-analisador-v2.js. Ele faz: Analisador Local de Projetos — V2 — Analisador Local de Projetos — V2.
No app original ele tinha estas funções/partes: extension, normalize, setStatus, formatBytes, importFiles, renderFileList, openFile, updateEditorInfo, scheduleSave, saveProject, restoreProject, pasteCode, newFile, downloadCurrent, downloadBlob, createElement, heading, card.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 111 — `js/98-analisador.js` (era `app/ferramentas/meu-chat/ferramentas/analisador.html`, 1019 linhas)

```text
Crie js/98-analisador.js. Ele faz: Analisador de Projetos — 🔍 Analisador.
No app original ele tinha estas funções/partes: setupEventListeners, mudarPagina, carregarPagina, renderUpload, renderAnalise, renderPreview, renderEstrutura, renderExportar, analisarProjeto, gerarEstrutura, visualizar, remover, copiarEstrutura, exportarZip, exportarJSON, abrirModalNomeProjeto, confirmarNomeProjeto, abrirModal.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 112 — `js/98-caca-sql.js` (era `app/ferramentas/meu-chat/ferramentas/caca-sql.html`, 335 linhas)

```text
Crie js/98-caca-sql.js. Ele faz: 🔍 Caça Esquema SQL — 🔍 Caça Esquema SQL.
No app original ele tinha estas funções/partes: processarZip, criarBloco, copiar, escapar, escaparHTML, mostrarStatus.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 113 — `js/98-cofre-config.js` (era `app/ferramentas/meu-chat/ferramentas/cofre-config.html`, 634 linhas)

```text
Crie js/98-cofre-config.js. Ele faz: ⚖️ Cofre de Configurações — 🔐 Cofre de Configurações.
No app original ele tinha estas funções/partes: init, salvar, render, renderTabs, renderItems, renderStats, setAba, salvarAba, deletarAba, openModal, closeModal, preencherSelectAbas, salvarItem, editarItem, deletarItem, toggleOcultar, copiarValor, copiarExport.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 114 — `js/98-colecionador-codigo.js` (era `app/ferramentas/meu-chat/ferramentas/colecionador-codigo.html`, 586 linhas)

```text
Crie js/98-colecionador-codigo.js. Ele faz: Colecionador de Código — 📦 Colecionador de Código.
No app original ele tinha estas funções/partes: adicionarArquivos, renderLista, remover, setModo, setP, lerArquivo, analisar, gerarCompleto, gerarRapido, gerarFuncoes, gerarMapa, extrairFuncoes, extrairEventos, extrairAPIs, extrairVariaveis, extrairSeletores, tentarDescreverFuncao, copiar.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 115 — `js/98-comandos-termux.js` (era `app/ferramentas/meu-chat/ferramentas/comandos-termux.html`, 305 linhas)

```text
Crie js/98-comandos-termux.js. Ele faz: 📦 Banco de Comandos Termux — 📦 Banco de Comandos Termux.
No app original ele tinha estas funções/partes: copiar, filtrar.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 116 — `js/98-conversor-imagem.js` (era `app/ferramentas/meu-chat/ferramentas/conversor-imagem.html`, 474 linhas)

```text
Crie js/98-conversor-imagem.js. Ele faz: Conversor de Imagem Econômico — 🖼️ Conversor de Imagem Econômico.
No app original ele tinha estas funções/partes: carregarImagem, setModo, processar, fazerOCR, fazerComprimir, setProgresso, copiarTexto, baixarImagem, limpar, formatBytes.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 117 — `js/98-detector-api.js` (era `app/ferramentas/meu-chat/ferramentas/detector-api.html`, 657 linhas)

```text
Crie js/98-detector-api.js. Ele faz: Detector e Corretor de API — 🔍 Detector de Problemas de API.
No app original ele tinha estas funções/partes: analisarCodigo, mostrarResultados, corrigirUm, corrigirTudo, copiarResultado, analisarNovamente, limparTudo, escapeRegex, escapeHtml.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 118 — `js/98-divisor-html.js` (era `app/ferramentas/meu-chat/ferramentas/divisor-html.html`, 716 linhas)

```text
Crie js/98-divisor-html.js. Ele faz: Divisor de HTML — ✂️ Divisor de HTML Gigante.
No app original ele tinha estas funções/partes: estimarPartes, setModo, setProgresso, dividir, dividirAuto, dividirSoCSS, dividirSoJS, dividirSecoes, dividirLinhas, dividirHTMLporSecoes, gerarIndex, mostrarResultado, verPreview, baixarUma, baixarTodas, baixarZip, gerarCabecalho, getIconeTipo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 119 — `js/98-juntador.js` (era `app/ferramentas/meu-chat/ferramentas/juntador.html`, 455 linhas)

```text
Crie js/98-juntador.js. Ele faz: Juntador de Projetos HTML — 🔧 Juntador de Projetos HTML.
No app original ele tinha estas funções/partes: adicionarArquivos, renderLista, remover, getIcone, getTipo, lerArquivo, addLog, juntar, baixar, copiarCodigo, limparTudo, formatBytes.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 120 — `js/98-leitor-universal.js` (era `app/ferramentas/meu-chat/ferramentas/leitor-universal.html`, 1262 linhas)

```text
Crie js/98-leitor-universal.js. Ele faz: 📂 Leitor Universal de Arquivos — Leitor Universal de Arquivos.
No app original ele tinha estas funções/partes: processFile, detectFormat, renderAll, renderAIStudio, renderMsg, renderChatGPT, renderMessages, renderGenericJSON, renderText, renderRaw, showTab, toggleConv, resetApp, esc, escJS, fmtDate, formatBytes, infoBox.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 121 — `js/98-monica-guia.js` (era `app/ferramentas/meu-chat/ferramentas/monica-guia.html`, 343 linhas)

```text
Crie js/98-monica-guia.js. Ele faz: API Monica — Guia Visual — 🤖 API Monica — Guia Visual.
No app original ele tinha estas funções/partes: renderModelos, selecionarModelo, filtrar, atualizarSelectCalc, calcular, fmt, fmtBRL.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 122 — `js/98-monica-passo.js` (era `app/ferramentas/meu-chat/ferramentas/monica-passo.html`, 691 linhas)

```text
Crie js/98-monica-passo.js. Ele faz: Guia Monica API - Passo a Passo — 🔑 Guia Monica API.
No app original ele tinha estas funções/partes: trocarAba.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 123 — `js/98-montador-modulos.js` (era `app/ferramentas/meu-chat/ferramentas/montador-modulos.html`, 635 linhas)

```text
Crie js/98-montador-modulos.js. Ele faz: 🧩 Montador de Módulos — PWA Jurídico — 🧩 Montador de Módulos PWA JURÍDICO — MAIKON CALDEIRA.
No app original ele tinha estas funções/partes: getModules, setModules, getSelected, setSelected, showSection, showToast, saveModule, clearForm, renderModules, filterModules, deleteModule, copyModule, viewModule, editModule, renderBuildChecklist, toggleSelect, selectAll, deselectAll.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 124 — `js/98-procurar-substituir.js` (era `app/ferramentas/meu-chat/ferramentas/procurar-substituir.html`, 708 linhas)

```text
Crie js/98-procurar-substituir.js. Ele faz: Procurar e Substituir — 🔍 Procurar e Substituir.
No app original ele tinha estas funções/partes: trocarAba, preencherAtalho, contarOcorrencias, fazerSubstituicao, copiarResultado, copiarMulti, usarComoEntrada, limparTudo, adicionarPar, removerPar, fazerMultiplo, limparMultiplo, atualizarHistorico, limparHistorico, escapeRegex.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 125 — `js/98-meu-chat.js` (era `app/ferramentas/meu-chat/index.html`, 158 linhas)

```text
Crie js/98-meu-chat.js. Ele faz: Meu Chat.
Ele usa o que já foi criado em: js/97-base.js, js/98-banco.js, js/98-online.js, js/98-nuvem-embutida.js, js/98-nuvem-neon.js, js/98-nuvem.js, js/98-entrada.js, js/98-provedores.js, js/98-memoria.js, js/98-contextos.js, js/98-guia.js, js/98-jeito.js, js/98-gasto.js, js/98-arquivos.js, js/98-playground-replit.js, js/98-codigos.js, js/98-qr.js, js/98-pronto.js, js/98-testar.js, js/98-links.js, js/98-docs.js, js/98-ferramentas-lista.js, js/98-mesa.js, js/98-voz.js, js/98-internet.js, js/98-previa.js, js/98-texto.js, js/98-chat.js, js/98-cofre-arquivo.js, js/98-guia-versoes.js, js/98-guia-maikon.js, js/98-config.js, js/98-cofre.js, js/98-reconhecer.js, js/98-backup.js, js/98-restaurar.js, js/98-ponte-lab.js, js/98-janela-pc.js (pelo APP).
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 126 — `js/98-organizador.js` (era `app/ferramentas/organizador.html`, 558 linhas)

```text
Crie js/98-organizador.js. Ele faz: Organizador de Documentos — 📑 Organizador de Documentos.
No app original ele tinha estas funções/partes: esc, tipoDe, compDe, numDe, moedaPorData, lerPdf, organizar, deTexto, moldeDe, bate, aplicar, camposUsados, status, tudo, renderLinhas, escolherRegra, renderRegras, fmtComp.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 127 — `js/98-perito.js` (era `app/ferramentas/perito.html`, 1142 linhas)

```text
Crie js/98-perito.js. Ele faz: Perito de Metadados — Perito de Metadados.
No app original ele tinha estas funções/partes: EMBUTIDO, esc, latin1, deLatin1, juntar, utf8, decTexto, tamanhoTxt, sha256js, sha256, inflar, inflarZlib, mkData, dataPdf, dataExif, dataIso, difTxt, num.
Ele chamava estes endereços: https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=br&q=. Em HTML, ligue cada um à função equivalente do módulo certo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 128 — `js/98-transcrever.js` (era `app/ferramentas/transcrever.html`, 195 linhas)

```text
Crie js/98-transcrever.js. Ele faz: Transcrever Áudio — 🎙 Transcrever Áudio.
No app original ele tinha estas funções/partes: chavesDoApp, lerLocal, gravarLocal, chave, pintarChave, tamanho, relogio, sha256, duracao, tipoDe, pintar, transcrever, groq, gemini, texto, baixar.
Ele chamava estes endereços: https://api.groq.com/openai/v1/audio/transcriptions, https://generativelanguage.googleapis.com/v1beta/models/. Em HTML, ligue cada um à função equivalente do módulo certo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 129 — `js/98-verificador-citacoes.js` (era `app/ferramentas/verificador-citacoes.html`, 256 linhas)

```text
Crie js/98-verificador-citacoes.js. Ele faz: Verificador de Citações.
No app original ele tinha estas funções/partes: esc, linksPara, numeroEstranho, cnjConfere, verificar, add, temLinkPerto, pintar, aviso, carregarScript, tenta, lerDocx, lerPdf, rodar.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 130 — `js/98-app.js` (era `app/index.html`, 87 linhas)

```text
Crie js/98-app.js. Ele faz: SK Jurídico Novo.
Ele usa o que já foi criado em: js/98-ia.js, js/98-segredos.js, js/98-nuvem-embutida.js, js/98-nuvem-neon.js, js/98-reconhecer.js, js/98-online.js, js/98-nuvem.js, js/98-entrada.js, js/98-banco.js, js/98-voz.js, js/98-internet.js, js/98-drive.js, js/98-importar.js, js/98-texto.js, js/98-regras.js, js/98-motor.js, js/98-processar.js, js/98-editor.js, js/98-docx.js, js/98-conversa.js, js/98-documentos.js, js/98-biblioteca.js, js/98-restaurar.js, js/98-playground-replit.js, js/98-codigos.js, js/98-ferramentas.js, js/98-config.js, js/98-tema.js, js/98-janela-pc.js (pelo APP).
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 131 — `js/98-navegador.js` (era `electron/navegador.html`, 69 linhas)

```text
Crie js/98-navegador.js. Ele faz: 🌐 Navegador — Mini SK.
No app original ele tinha estas funções/partes: historico, guardar, arrumar, botoes.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 132 — `js/99-app.js` e conferir

```text
Crie js/99-app.js: ele olha APP.modulos e monta o menu/abas com um botão para cada módulo. Depois, me mande o index.html atualizado com todos os <script src="js/…"> na ordem certa: js/00-core.js, js/10-ai-code-studio.js, js/15-analisador-universal.js, js/20-cirurgiao.js, js/25-desembrulhar.js, js/30-gerador-eas.js, js/35-montar.js, js/40-projeto-lab.js, js/45-raiox.js, js/50-triagem.js, js/55-zip.js, js/60-projeto.js, js/65-ferramentas.js, js/70-organizar.js, js/75-limpo.js, js/80-relatorios.js, js/85-comparar.js, js/90-ia.js, js/91-terminal.js, js/92-janela-pc.js, js/93-expo-core.js, js/94-organizar-core.js, js/95-plano-core.js, js/96-tema.js, js/97-base.js, js/98-banco.js, js/98-online.js, js/98-nuvem.js, js/98-entrada.js, js/98-provedores.js, js/98-memoria.js, js/98-contextos.js, js/98-guia.js, js/98-jeito.js, js/98-gasto.js, js/98-arquivos.js, js/98-codigos.js, js/98-qr.js, js/98-voz.js, js/98-pronto.js, js/98-testar.js, js/98-links.js, js/98-docs.js, js/98-mesa.js, js/98-internet.js, js/98-previa.js, js/98-texto.js, js/98-chat.js, js/98-config.js, js/98-cofre.js, js/98-backup.js, js/98-restaurar.js, js/98-ponte-lab.js, js/98-janela-pc.js, js/98-cofre-arquivo.js, js/98-ferramentas-lista.js, js/98-guia-maikon.js, js/98-guia-versoes.js, js/98-nuvem-neon.js, js/98-playground-replit.js, js/98-reconhecer.js, js/98-nuvem-embutida.js, js/98-ia.js, js/98-online.js, js/98-voz.js, js/98-nuvem.js, js/98-entrada.js, js/98-importar.js, js/98-internet.js, js/98-banco.js, js/98-texto.js, js/98-processar.js, js/98-motor.js, js/98-drive.js, js/98-regras.js, js/98-editor.js, js/98-docx.js, js/98-conversa.js, js/98-documentos.js, js/98-biblioteca.js, js/98-restaurar.js, js/98-codigos.js, js/98-ferramentas.js, js/98-config.js, js/98-janela-pc.js, js/98-nuvem-neon.js, js/98-playground-replit.js, js/98-reconhecer.js, js/98-segredos.js, js/98-nuvem-embutida.js, js/98-tema.js, js/98-voz-francisco.js, js/98-ponte.js, js/98-terminal.js, js/98-saude.js, js/98-voz.js, js/98-preload-nav.js, js/98-preload.js, js/98-banco-neon.js, js/98-cacabug.js, js/98-calculadora-sentenca.js, js/98-colador.js, js/98-colecionador.js, js/98-comparador.js, js/98-comunicacoes.js, js/98-desmontador-backup.js, js/98-extrator.js, js/98-juntador.js, js/98-laboratorio.js, js/98-limpador.js, js/98-analisador-v2.js, js/98-analisador.js, js/98-caca-sql.js, js/98-cofre-config.js, js/98-colecionador-codigo.js, js/98-comandos-termux.js, js/98-conversor-imagem.js, js/98-detector-api.js, js/98-divisor-html.js, js/98-juntador.js, js/98-leitor-universal.js, js/98-monica-guia.js, js/98-monica-passo.js, js/98-montador-modulos.js, js/98-procurar-substituir.js, js/98-meu-chat.js, js/98-organizador.js, js/98-perito.js, js/98-transcrever.js, js/98-verificador-citacoes.js, js/98-app.js, js/98-navegador.js, js/99-app.js.
```

## 5. Conferir no final

- [ ] Abrir o index.html na prévia: aparece a tela sem erro (▤ console vazio)?
- [ ] Cada botão abre a sua parte?
- [ ] Fechar e abrir de novo: os dados continuam?
- [ ] Nada com "replit", "REPL_", "@workspace" no código (🏗️ Preparar confere).
- [ ] 📱 PWA → deixar instalável; 📦 APK ou 🖥️ .exe.
