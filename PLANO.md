# 📋 Plano do projeto: SK-Juridico-Novo-PC-24-11-A

_Gerado em 24/11/2026, 06:19:11 — sem IA, lendo os arquivos._

## 📊 Visão geral
| Item | Valor |
|---|---|
| Arquivos | 178 |
| Linhas | 33.665 |
| Telas/páginas | 34 |
| Rotas do backend | 0 |
| Chamadas do app | 3 |
| Tabelas do banco | 0 |
| Variáveis de ambiente | 9 |

**Linguagens:** JavaScript (109), HTML (34), Markdown (13), Imagem (7), Outros (5), JSON (4), CSS (3), Python (2), YAML (1)

## 💡 O que fazer (em ordem)
1. 🧹 Tirar a Replit de 34 arquivo(s) (🏗️ Preparar → Fazer tudo)
2. 🔐 Criar um .env.example com: BASE_PATH, DADOS_EM, GITHUB_STEP_SUMMARY, LOCALAPPDATA, PONTE_BASE, PONTE_CODIGO, PONTE_PORTA, PORT, TESTE_SAIR (os valores você coloca no servidor, nunca no código)

## 🚀 Por onde começa
- `app/ferramentas/cacabug/index.html`
- `app/ferramentas/meu-chat/index.html`
- `app/index.html`

## ⌨️ Comandos (package.json)
| Pasta | Comando | O que roda |
|---|---|---|
| . | `npm run programa` | `electron .` |
| . | `npm run exe` | `electron-builder --win nsis portable --x64 --publish never` |

## 📱 Telas e páginas
| Endereço | Arquivo |
|---|---|
| `app/ferramentas/banco-neon.html` | app/ferramentas/banco-neon.html |
| `app/ferramentas/cacabug/index.html` | app/ferramentas/cacabug/index.html |
| `app/ferramentas/calculadora-sentenca.html` | app/ferramentas/calculadora-sentenca.html |
| `app/ferramentas/colador.html` | app/ferramentas/colador.html |
| `app/ferramentas/colecionador.html` | app/ferramentas/colecionador.html |
| `app/ferramentas/comparador.html` | app/ferramentas/comparador.html |
| `app/ferramentas/comunicacoes.html` | app/ferramentas/comunicacoes.html |
| `app/ferramentas/desmontador-backup.html` | app/ferramentas/desmontador-backup.html |
| `app/ferramentas/extrator.html` | app/ferramentas/extrator.html |
| `app/ferramentas/juntador.html` | app/ferramentas/juntador.html |
| `app/ferramentas/laboratorio.html` | app/ferramentas/laboratorio.html |
| `app/ferramentas/limpador.html` | app/ferramentas/limpador.html |
| `app/ferramentas/meu-chat/ferramentas/analisador-v2.html` | app/ferramentas/meu-chat/ferramentas/analisador-v2.html |
| `app/ferramentas/meu-chat/ferramentas/analisador.html` | app/ferramentas/meu-chat/ferramentas/analisador.html |
| `app/ferramentas/meu-chat/ferramentas/caca-sql.html` | app/ferramentas/meu-chat/ferramentas/caca-sql.html |
| `app/ferramentas/meu-chat/ferramentas/cofre-config.html` | app/ferramentas/meu-chat/ferramentas/cofre-config.html |
| `app/ferramentas/meu-chat/ferramentas/colecionador-codigo.html` | app/ferramentas/meu-chat/ferramentas/colecionador-codigo.html |
| `app/ferramentas/meu-chat/ferramentas/comandos-termux.html` | app/ferramentas/meu-chat/ferramentas/comandos-termux.html |
| `app/ferramentas/meu-chat/ferramentas/conversor-imagem.html` | app/ferramentas/meu-chat/ferramentas/conversor-imagem.html |
| `app/ferramentas/meu-chat/ferramentas/detector-api.html` | app/ferramentas/meu-chat/ferramentas/detector-api.html |
| `app/ferramentas/meu-chat/ferramentas/divisor-html.html` | app/ferramentas/meu-chat/ferramentas/divisor-html.html |
| `app/ferramentas/meu-chat/ferramentas/juntador.html` | app/ferramentas/meu-chat/ferramentas/juntador.html |
| `app/ferramentas/meu-chat/ferramentas/leitor-universal.html` | app/ferramentas/meu-chat/ferramentas/leitor-universal.html |
| `app/ferramentas/meu-chat/ferramentas/monica-guia.html` | app/ferramentas/meu-chat/ferramentas/monica-guia.html |
| `app/ferramentas/meu-chat/ferramentas/monica-passo.html` | app/ferramentas/meu-chat/ferramentas/monica-passo.html |
| `app/ferramentas/meu-chat/ferramentas/montador-modulos.html` | app/ferramentas/meu-chat/ferramentas/montador-modulos.html |
| `app/ferramentas/meu-chat/ferramentas/procurar-substituir.html` | app/ferramentas/meu-chat/ferramentas/procurar-substituir.html |
| `app/ferramentas/meu-chat/index.html` | app/ferramentas/meu-chat/index.html |
| `app/ferramentas/organizador.html` | app/ferramentas/organizador.html |
| `app/ferramentas/perito.html` | app/ferramentas/perito.html |
| `app/ferramentas/transcrever.html` | app/ferramentas/transcrever.html |
| `app/ferramentas/verificador-citacoes.html` | app/ferramentas/verificador-citacoes.html |
| `app/index.html` | app/index.html |
| `electron/navegador.html` | electron/navegador.html |

## 🖥️ Rotas do backend
_Nenhum encontrado._

## 📡 O que o app pede ao servidor
| Método | Endereço | Onde |
|---|---|---|
| POST | `/models/${encodeURIComponent(c.modelo)}:generateContent` | app/ferramentas/cacabug/ferramentas/cirurgiao.js |
| POST | `/messages` | app/ferramentas/cacabug/ferramentas/cirurgiao.js |
| POST | `/chat/completions` | app/ferramentas/cacabug/ferramentas/cirurgiao.js |

## 🔌 O que falta no backend
✅ Tudo que o app chama tem rota no projeto (ou o app não usa servidor).

## 🗄️ Banco de dados
_Nenhuma tabela encontrada._

## 🔐 Variáveis de ambiente (configurar no servidor)
- `BASE_PATH`
- `DADOS_EM`
- `GITHUB_STEP_SUMMARY`
- `LOCALAPPDATA`
- `PONTE_BASE`
- `PONTE_CODIGO`
- `PONTE_PORTA`
- `PORT`
- `TESTE_SAIR`

_Só os nomes. Os valores (chaves, senhas) nunca vão no código nem no GitHub._

## 🤖 IA usada
- api.openai.com
- api.groq.com
- openrouter.ai
- generativelanguage.googleapis.com
- api.anthropic.com
- console.groq.com
- platform.openai.com
- console.anthropic.com

## 🌐 Serviços de fora que ele acessa
- abcdxyz.supabase.co
- accounts.google.com
- aistudio.google.com
- api-dashboard.search.brave.com
- api.anthropic.com
- api.deepseek.com
- api.github.com
- api.groq.com
- api.mistral.ai
- api.openai.com
- api.perplexity.ai
- api.search.brave.com
- api.tavily.com
- api.x.ai
- app.tavily.com
- assistente-juridico.local
- cdn.jsdelivr.net
- cdn.tailwindcss.com
- cdnjs.cloudflare.com
- console.anthropic.com
- console.groq.com
- console.neon.tech
- esm.sh
- expo.dev
- fonts.googleapis.com
- fonts.gstatic.com
- generativelanguage.googleapis.com
- github.com
- google.serper.dev
- meuchat.local
- ollama.com
- openapi.monica.im
- openrouter.ai
- platform.deepseek.com
- platform.monica.im
- platform.openai.com
- purl.org
- pypi.org
- r.jina.ai
- raw.github.com
- raw.githubusercontent.com
- registry.npmjs.org
- serper.dev
- seunome.github.io
- stuartk.com
- stuk.github.io
- supabase.com
- u.expo.dev
- unpkg.com
- www.googleapis.com
- www.npmjs.com
- www.perplexity.ai
- xxxx.supabase.co

## 📦 Peças principais (dependências)
`msedge-tts` · `ws`

## 🧹 Arquivos com coisa da Replit
- app/ferramentas/cacabug/ferramentas/analisador-universal.js
- app/ferramentas/cacabug/ferramentas/cirurgiao.js
- app/ferramentas/cacabug/ferramentas/montar.py
- app/ferramentas/cacabug/ferramentas/projeto-lab.js
- app/ferramentas/cacabug/ferramentas/raiox.js
- app/ferramentas/cacabug/js/30-projeto.js
- app/ferramentas/cacabug/js/46-limpo.js
- app/ferramentas/cacabug/js/60-comparar.js
- app/ferramentas/cacabug/js/80-terminal.js
- app/ferramentas/cacabug/js/99-app.js
- app/ferramentas/cacabug/js/lib/expo-core.js
- app/ferramentas/cacabug/js/lib/plano-core.js
- app/ferramentas/meu-chat/js/11-online.js
- app/ferramentas/meu-chat/js/12-nuvem.js
- app/ferramentas/meu-chat/js/14-entrada.js
- app/ferramentas/meu-chat/js/33-contextos.js
- app/ferramentas/meu-chat/js/38-codigos.js
- app/ferramentas/meu-chat/js/45-mesa.js
- app/ferramentas/meu-chat/js/lib/guia-maikon.js
- app/ferramentas/meu-chat/js/lib/guia-versoes.js
- app/ferramentas/meu-chat/js/lib/playground-replit.js
- app/ferramentas/meu-chat/js/lib/reconhecer.js
- app/ferramentas/meu-chat/sw.js
- app/js/12-online.js
- app/js/13-nuvem.js
- app/js/14-entrada.js
- app/js/50-documentos.js
- app/js/56-restaurar.js
- app/js/60-codigos.js
- app/js/70-ferramentas.js
- app/js/80-config.js
- app/js/lib/playground-replit.js
- app/js/lib/reconhecer.js
- app/sw.js

## 🔁 Roteiro para recriar fora da Replit
1. Importar o projeto no Mini SK e tocar em 🏗️ Preparar → ✅ Fazer tudo (tira a Replit, cria os arquivos que faltam).
2. Não tem backend: o site sozinho basta (Netlify ou GitHub Pages).
3. Variáveis: cadastrar 9 variável(is) no servidor (lista acima).
4. Testar a prévia; se der erro, 🤖 Mandar os erros para a IA.
5. App: 📲 Instalável (PWA), 📦 APK ou 🖥️ Desktop (.exe) pelo 🏗️ Preparar.

## 🌳 Árvore de arquivos
```
├─ 📁 .github/
│  └─ 📁 workflows/
│     └─ programa-exe.yml
├─ 📁 app/
│  ├─ 📁 css/
│  │  └─ app.css
│  ├─ 📁 ferramentas/
│  │  ├─ 📁 cacabug/
│  │  │  ├─ 📁 css/
│  │  │  │  └─ app.css
│  │  │  ├─ 📁 ferramentas/
│  │  │  │  ├─ ai-code-studio.js
│  │  │  │  ├─ analisador-universal.js
│  │  │  │  ├─ cirurgiao.js
│  │  │  │  ├─ desembrulhar.js
│  │  │  │  ├─ gerador-eas.js
│  │  │  │  ├─ montar.py
│  │  │  │  ├─ ordem.txt
│  │  │  │  ├─ projeto-lab.js
│  │  │  │  ├─ raiox.js
│  │  │  │  └─ triagem.js
│  │  │  ├─ 📁 icons/
│  │  │  │  ├─ icon-192.png
│  │  │  │  └─ icon-512.png
│  │  │  ├─ 📁 js/
│  │  │  │  ├─ 📁 lib/
│  │  │  │  │  ├─ expo-core.js
│  │  │  │  │  ├─ organizar-core.js
│  │  │  │  │  └─ plano-core.js
│  │  │  │  ├─ 00-core.js
│  │  │  │  ├─ 20-zip.js
│  │  │  │  ├─ 30-projeto.js
│  │  │  │  ├─ 40-ferramentas.js
│  │  │  │  ├─ 45-organizar.js
│  │  │  │  ├─ 46-limpo.js
│  │  │  │  ├─ 50-relatorios.js
│  │  │  │  ├─ 60-comparar.js
│  │  │  │  ├─ 70-ia.js
│  │  │  │  ├─ 80-terminal.js
│  │  │  │  ├─ 99-app.js
│  │  │  │  ├─ janela-pc.js
│  │  │  │  └─ tema.js
│  │  │  ├─ 📁 lib/
│  │  │  │  ├─ acorn.min.js
│  │  │  │  ├─ diff-LICENSE.txt
│  │  │  │  ├─ diff.min.js
│  │  │  │  ├─ jszip-LICENSE.md
│  │  │  │  └─ jszip.min.js
│  │  │  ├─ index.html
│  │  │  ├─ LEIA-ME.md
│  │  │  ├─ manifest.json
│  │  │  ├─ README.md
│  │  │  └─ sw.js
│  │  ├─ 📁 meu-chat/
│  │  │  ├─ 📁 css/
│  │  │  │  └─ app.css
│  │  │  ├─ 📁 docs/
│  │  │  │  ├─ cacabug.md
│  │  │  │  ├─ laboratorio.md
│  │  │  │  ├─ meuchat.md
│  │  │  │  ├─ minisk.md
│  │  │  │  └─ sk-juridico-html.md
│  │  │  ├─ 📁 ferramentas/
│  │  │  │  ├─ analisador-v2.html
│  │  │  │  ├─ analisador.html
│  │  │  │  ├─ caca-sql.html
│  │  │  │  ├─ cofre-config.html
│  │  │  │  ├─ colecionador-codigo.html
│  │  │  │  ├─ comandos-termux.html
│  │  │  │  ├─ conversor-imagem.html
│  │  │  │  ├─ detector-api.html
│  │  │  │  ├─ divisor-html.html
│  │  │  │  ├─ juntador.html
│  │  │  │  ├─ leitor-universal.html
│  │  │  │  ├─ monica-guia.html
│  │  │  │  ├─ monica-passo.html
│  │  │  │  ├─ montador-modulos.html
│  │  │  │  └─ procurar-substituir.html
│  │  │  ├─ 📁 icons/
│  │  │  │  ├─ icon-192.png
│  │  │  │  └─ icon-512.png
│  │  │  ├─ 📁 js/
│  │  │  │  ├─ 📁 lib/
│  │  │  │  │  ├─ cofre-arquivo.js
│  │  │  │  │  ├─ ferramentas-lista.js
│  │  │  │  │  ├─ guia-maikon.js
│  │  │  │  │  ├─ guia-versoes.js
│  │  │  │  │  ├─ jszip.min.js
│  │  │  │  │  ├─ nuvem-neon.js
│  │  │  │  │  ├─ playground-replit.js
│  │  │  │  │  └─ reconhecer.js
│  │  │  │  ├─ 00-base.js
│  │  │  │  ├─ 10-banco.js
│  │  │  │  ├─ 11-online.js
│  │  │  │  ├─ 12-nuvem.js
│  │  │  │  ├─ 14-entrada.js
│  │  │  │  ├─ 20-provedores.js
│  │  │  │  ├─ 30-memoria.js
│  │  │  │  ├─ 33-contextos.js
│  │  │  │  ├─ 34-guia.js
│  │  │  │  ├─ 35-jeito.js
│  │  │  │  ├─ 36-gasto.js
│  │  │  │  ├─ 37-arquivos.js
│  │  │  │  ├─ 38-codigos.js
│  │  │  │  ├─ 39-qr.js
│  │  │  │  ├─ 40-voz.js
│  │  │  │  ├─ 41-pronto.js
│  │  │  │  ├─ 42-testar.js
│  │  │  │  ├─ 43-links.js
│  │  │  │  ├─ 44-docs.js
│  │  │  │  ├─ 45-mesa.js
│  │  │  │  ├─ 50-internet.js
│  │  │  │  ├─ 60-previa.js
│  │  │  │  ├─ 70-texto.js
│  │  │  │  ├─ 80-chat.js
│  │  │  │  ├─ 85-config.js
│  │  │  │  ├─ 87-cofre.js
│  │  │  │  ├─ 90-backup.js
│  │  │  │  ├─ 91-restaurar.js
│  │  │  │  ├─ 95-ponte-lab.js
│  │  │  │  ├─ 99-app.js
│  │  │  │  ├─ janela-pc.js
│  │  │  │  └─ nuvem-embutida.js
│  │  │  ├─ index.html
│  │  │  ├─ LEIA-ME.txt
│  │  │  ├─ manifest.json
│  │  │  ├─ README.md
│  │  │  └─ sw.js
│  │  ├─ banco-neon.html
│  │  ├─ calculadora-sentenca.html
│  │  ├─ colador.html
│  │  ├─ colecionador.html
│  │  ├─ comparador.html
│  │  ├─ comunicacoes.html
│  │  ├─ desmontador-backup.html
│  │  ├─ extrator.html
│  │  ├─ juntador.html
│  │  ├─ laboratorio.html
│  │  ├─ limpador.html
│  │  ├─ organizador.html
│  │  ├─ perito.html
│  │  ├─ transcrever.html
│  │  └─ verificador-citacoes.html
│  ├─ 📁 icons/
│  │  ├─ icon-192.png
│  │  └─ icon-512.png
│  ├─ 📁 js/
│  │  ├─ 📁 lib/
│  │  │  ├─ nuvem-neon.js
│  │  │  ├─ playground-replit.js
│  │  │  ├─ reconhecer.js
│  │  │  └─ segredos.js
│  │  ├─ 00-core.js
│  │  ├─ 10-ia.js
│  │  ├─ 12-online.js
│  │  ├─ 12-voz.js
│  │  ├─ 13-nuvem.js
│  │  ├─ 14-entrada.js
│  │  ├─ 15-importar.js
│  │  ├─ 16-internet.js
│  │  ├─ 17-banco.js
│  │  ├─ 18-texto.js
│  │  ├─ 20-processar.js
│  │  ├─ 21-motor.js
│  │  ├─ 22-drive.js
│  │  ├─ 25-regras.js
│  │  ├─ 30-editor.js
│  │  ├─ 35-docx.js
│  │  ├─ 40-conversa.js
│  │  ├─ 50-documentos.js
│  │  ├─ 55-biblioteca.js
│  │  ├─ 56-restaurar.js
│  │  ├─ 60-codigos.js
│  │  ├─ 70-ferramentas.js
│  │  ├─ 80-config.js
│  │  ├─ 99-app.js
│  │  ├─ janela-pc.js
│  │  ├─ nuvem-embutida.js
│  │  └─ tema.js
│  ├─ 📁 kits/
│  │  └─ voz-francisco.py
│  ├─ 📁 lib/
│  │  ├─ jszip-LICENSE.md
│  │  └─ jszip.min.js
│  ├─ index.html
│  ├─ LEIA-ME.md
│  ├─ manifest.json
│  ├─ per1.png
│  ├─ README.md
│  └─ sw.js
├─ 📁 electron/
│  ├─ instalar.nsh
│  ├─ main.cjs
│  ├─ navegador.html
│  ├─ ponte.cjs
│  ├─ preload-nav.cjs
│  ├─ preload.cjs
│  ├─ saude.cjs
│  ├─ terminal.cjs
│  └─ voz.cjs
├─ .gitignore
├─ LEIA-ME.md
└─ package.json
```
