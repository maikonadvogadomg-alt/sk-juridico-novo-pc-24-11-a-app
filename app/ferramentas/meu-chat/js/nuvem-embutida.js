/* ☁️ SUPABASE EMBUTIDO (17/11)
   Estas duas informações são PÚBLICAS de propósito (todo site que usa Supabase tem elas dentro).
   Quem protege os seus dados é o LOGIN (e-mail e senha) e a regra "cada um vê o seu" da tabela.
   Com elas aqui dentro, em qualquer aparelho o app abre a tela de login: e-mail + senha e pronto.
   ⚠ NUNCA coloque aqui a chave "service_role" nem a senha do banco — essas são secretas.
   Deixe vazio ('') para não ter tela de login (aí vale o que estiver em ⚙️ Config → ☁️ Nuvem). */
window.NUVEM_EMBUTIDA = {
  url: '',   // Project URL — ex.: https://abcdxyz.supabase.co
  anon: '',  // chave "anon public" (começa com eyJ… ou sb_publishable_…)
};
