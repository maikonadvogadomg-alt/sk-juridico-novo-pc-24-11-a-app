# ⚖️ SK Jurídico HTML — 17/11-B (sem servidor)

**Novo na 17/11-B: 🐘 Neon.** ⚙️ Config → ☁️ Nuvem → 🐘 Neon → cole o endereço do seu Neon (postgresql://…) → 🔌 Conectar. O app cria a tabela sozinho. O mesmo Neon do Meu Chat.

O seu jurídico em **HTML modular** (abre direto, sem "montar" nada, sem servidor), com o **motor do SK Jurídico 1.7.x**:
os textos do motor (as regras absolutas, a estrutura da peça, o máximo de 15 páginas, a jurisprudência só das ementas que você marcou,
os níveis de esforço) vieram **palavra por palavra** do servidor antigo (server/routes/ai.ts) para o arquivo `js/21-motor.js`.

## ⚡ Processar
1. Cole ou abra o processo (PDF, Word — lido aqui no aparelho, sem o corte do servidor).
2. Toque em **⚖️ Fazer a peça** — o motor descobre a peça certa pelo momento do processo (inicial, contestação, recurso…) — ou Resumir, Analisar, O que falta, Revisar, Refinar…
3. Ajuste: **💪 Esforço** (1 a 5), **📏 Tamanho** (Completa/Concisa), **📚 ementas marcadas** (ele escolhe as 2 mais fortes), **📜 Lembrar as 3 últimas**.
4. **🦙 Resumir antes (processo grande)**: passo 1 resume o processo inteiro (de graça com o Ollama do computador, se estiver ligado; senão com a mesma IA) e o passo 2 faz a peça com o resumo + o texto. Processo acima de 700 mil letras faz isso sozinho.

## 🔑 IA
⚙️ Config → escolha a IA (Gemini grátis, Groq, OpenRouter, Claude, Ollama…) e cole a SUA chave. Ela fica só no aparelho.

## ☁️ Nuvem: 🐘 Neon (só você, sem login) ou ☁️ Supabase (com login) — a mesma do 💬 Meu Chat
⚙️ Config → ☁️ Nuvem. Entre com o mesmo e-mail no celular e no PC: documentos, modelos, ementas, histórico, conversas, regras e os seus dados vão junto.
As chaves NÃO vão. Funciona sem internet (tudo fica no aparelho; a nuvem copia).

## 💬 Meu Chat dentro
Botão **💬 Meu Chat** no topo: o chat livre, separado do jurídico (não gasta o pedido das peças).

## 🧰 Ferramentas
Meu Chat, Verificador de Citações, Calculadora da Sentença, Perito, Comunicações (DJEN), Limpador, Organizador, Juntador, Extrator, Colador (📌 links fixos), Laboratório HTML, Colecionador, Caça-Bug 1.4.

## Ainda não (próximas etapas)
Pesquisa de jurisprudência pelo DataJud/DJEN dentro do Processar · prazos · login de escritório (gestor cria contas) · modo colaborativo · PJe/Drive.
