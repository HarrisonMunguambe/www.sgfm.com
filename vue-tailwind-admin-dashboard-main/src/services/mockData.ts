export const MOCK_DEPARTMENTS = [
  { id: 1, name: 'Financeiro' },
  { id: 2, name: 'Recursos Humanos' },
  { id: 3, name: 'Tecnologia da Informação' },
  { id: 4, name: 'Operações' },
  { id: 5, name: 'Auditoria Interna' },
  { id: 6, name: 'Compras e Logística' },
  { id: 7, name: 'Direção Geral' },
]

export const MOCK_ROLES = [
  { id: 1, name: 'Gestor de Fundo' },
  { id: 2, name: 'Solicitante' },
  { id: 3, name: 'Aprovador' },
  { id: 4, name: 'Tesoureiro' },
  { id: 5, name: 'Auditor' },
  { id: 6, name: 'Administrador' },
]

export const MOCK_OTP_CODE = '123456'

export const MOCK_STATS = {
  totalManaged: 18_450_000,
  approvedRequests: 1_284,
  averageSavings: 12.4,
  activeUsers: 342,
}

export const MOCK_RECENT_MOVEMENTS = [
  { id: 1, description: 'Compra de material de escritório', amount: -45_800, type: 'out', dept: 'Operações', time: '2 min' },
  { id: 2, description: 'Reposição mensal do fundo', amount: 250_000, type: 'in', dept: 'Financeiro', time: '18 min' },
  { id: 3, description: 'Deslocação – Beira', amount: -32_400, type: 'out', dept: 'Comercial', time: '1 h' },
  { id: 4, description: 'Pagamento de combustível', amount: -18_700, type: 'out', dept: 'Logística', time: '3 h' },
  { id: 5, description: 'Reembolso – viagem aprovada', amount: 9_200, type: 'in', dept: 'RH', time: '5 h' },
]

export interface InsightChart {
  type: 'line' | 'bar' | 'area' | 'donut'
  title: string
  categories?: string[]
  series: { name: string; data: number[] }[]
  suffix?: string
}

export interface Insight {
  id: number
  slug: string
  tag: string
  category: 'Previsão' | 'Recomendação' | 'Mercado' | 'Benchmark' | 'Alerta'
  title: string
  snippet: string
  source: string
  time: string
  readMinutes: number
  body: string[]
  kpis: { label: string; value: string; trend: 'up' | 'down' | 'flat'; delta: string }[]
  charts: InsightChart[]
  recommendations: string[]
}

export const MOCK_INSIGHTS: Insight[] = [
  {
    id: 1,
    slug: 'indice-eficiencia-fundos-q2',
    tag: 'Previsão',
    category: 'Previsão',
    title: 'Índice de eficiência de fundos deve subir 2,3% este trimestre',
    snippet:
      'Modelo preditivo do SGFM analisou 340 empresas moçambicanas e indica aumento sustentado na velocidade de aprovação.',
    source: 'SGFM Insights',
    time: 'há 12 min',
    readMinutes: 4,
    body: [
      'O Índice de Eficiência de Fundo de Maneio (IEFM) agrega quatro métricas: tempo médio de aprovação, taxa de reposição atempada, cumprimento do limite orçamental e velocidade de conciliação. A análise histórica de 340 organizações moçambicanas mostra uma trajetória ascendente consistente desde o último trimestre de 2025.',
      'Os setores de serviços financeiros e telecomunicações lideram a melhoria, com reduções médias de 38% no tempo de aprovação. Este salto é explicado por automação de fluxos e adoção de aprovação em dispositivos móveis — ambas funcionalidades nativas do SGFM.',
      'A previsão do modelo aponta para um IEFM de 78,4 pontos no final do trimestre (contra 76,6 atuais), assumindo estabilidade macroeconómica. Uma revisão em alta dos juros de referência pode comprimir o índice em até 0,8 pontos.',
    ],
    kpis: [
      { label: 'IEFM projetado', value: '78,4', trend: 'up', delta: '+2,3%' },
      { label: 'Empresas analisadas', value: '340', trend: 'up', delta: '+12' },
      { label: 'Tempo médio aprovação', value: '3,2 h', trend: 'down', delta: '−38%' },
      { label: 'Confiança do modelo', value: '91%', trend: 'flat', delta: '±0' },
    ],
    charts: [
      {
        type: 'line',
        title: 'Evolução do IEFM (12 meses)',
        categories: ['Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr'],
        series: [{ name: 'IEFM', data: [71.2, 72.1, 72.8, 73.5, 74.1, 74.8, 75.3, 75.9, 76.1, 76.3, 76.6, 78.4] }],
      },
      {
        type: 'bar',
        title: 'Melhoria de eficiência por setor',
        categories: ['Serviços fin.', 'Telecom', 'Retalho', 'Indústria', 'ONG', 'Público'],
        series: [{ name: 'Melhoria (%)', data: [38, 34, 22, 19, 15, 9] }],
        suffix: '%',
      },
    ],
    recommendations: [
      'Ative aprovação mobile para reduzir tempo médio em 20-30%',
      'Configure limites automáticos por departamento para reduzir retrabalho',
      'Reveja mensalmente a taxa de reposição atempada',
    ],
  },
  {
    id: 2,
    slug: 'reposicoes-semanais-vs-mensais',
    tag: 'Recomendação',
    category: 'Recomendação',
    title: 'Reduza retenções em 18%: adote reposições semanais em vez de mensais',
    snippet:
      'Estudo interno mostra que empresas com reposições frequentes reduzem sobras improdutivas no caixa e melhoram rotação.',
    source: 'Assistente SGFM',
    time: 'há 38 min',
    readMinutes: 3,
    body: [
      'A frequência de reposição do fundo de maneio é uma das alavancas mais subestimadas na gestão de caixa. Organizações que adotam ciclos semanais mantêm 18% menos capital imobilizado em caixa pequena, libertando recursos para aplicação de curto prazo ou reforço de outras rubricas.',
      'Entre as 210 empresas SGFM analisadas, as que operam com ciclo semanal tiveram menor incidência de rupturas (+7% de cumprimento de requisições urgentes) e melhor aderência ao limite orçamental mensal.',
      'Passar de mensal para semanal não exige reestruturação de tesouraria — apenas a configuração correta do gatilho de reposição automática no SGFM, que alerta o tesoureiro com 48h de antecedência.',
    ],
    kpis: [
      { label: 'Redução retenções', value: '18%', trend: 'down', delta: 'menos capital parado' },
      { label: 'Cumprimento urgências', value: '+7%', trend: 'up', delta: 'vs. mensal' },
      { label: 'Empresas analisadas', value: '210', trend: 'flat', delta: '' },
      { label: 'Adoção recomendada', value: 'Semanal', trend: 'up', delta: '' },
    ],
    charts: [
      {
        type: 'area',
        title: 'Capital imobilizado em caixa pequena (MT, média)',
        categories: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'],
        series: [
          { name: 'Ciclo mensal', data: [480, 520, 540, 510, 495, 530, 545, 515] },
          { name: 'Ciclo semanal', data: [420, 410, 430, 415, 400, 425, 435, 410] },
        ],
        suffix: 'k MT',
      },
      {
        type: 'donut',
        title: 'Distribuição por ciclo de reposição (SGFM)',
        series: [{ name: 'Empresas', data: [42, 38, 15, 5] }],
        categories: ['Mensal', 'Semanal', 'Quinzenal', 'Diário'],
      },
    ],
    recommendations: [
      'Configure reposição automática com alerta de 48h',
      'Reveja o valor-alvo do fundo após 3 ciclos semanais',
      'Use o relatório "Rotação de fundo" para calibrar o limite',
    ],
  },
  {
    id: 3,
    slug: 'metical-estabilidade-2026',
    tag: 'Mercado',
    category: 'Mercado',
    title: 'Metical estável frente ao dólar favorece planeamento de fundos em 2026',
    snippet:
      'Analistas apontam janela de oportunidade para contratos de médio prazo nas próximas 6 semanas.',
    source: 'Economia Hoje',
    time: 'há 1 h',
    readMinutes: 5,
    body: [
      'Após 18 meses de volatilidade moderada, o Metical tem apresentado uma banda de variação inferior a 1,5% face ao dólar americano. Esta estabilidade — sustentada por reservas internacionais em máximos de 5 anos — abre espaço para renegociação de contratos indexados a moeda estrangeira.',
      'Empresas com exposição relevante a fornecedores internacionais podem beneficiar ao fixar condições para os próximos 60-90 dias. O SGFM permite etiquetar movimentações por moeda e auditar automaticamente o impacto cambial acumulado.',
      'Os analistas do Banco de Moçambique mantêm a projeção de inflação dentro do corredor alvo, o que reforça a previsibilidade do Metical a médio prazo.',
    ],
    kpis: [
      { label: 'Variação MZN/USD (30d)', value: '1,4%', trend: 'flat', delta: 'banda estreita' },
      { label: 'Reservas internacionais', value: '5 anos', trend: 'up', delta: 'máximos' },
      { label: 'Janela favorável', value: '6 sem', trend: 'up', delta: 'para contratos' },
      { label: 'Inflação projetada', value: '4,8%', trend: 'flat', delta: 'dentro do alvo' },
    ],
    charts: [
      {
        type: 'line',
        title: 'Taxa de câmbio MZN/USD (últimos 12 meses)',
        categories: ['Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr'],
        series: [{ name: 'MZN/USD', data: [63.8, 63.9, 63.6, 63.7, 63.8, 63.9, 63.7, 63.8, 63.6, 63.7, 63.9, 63.8] }],
      },
    ],
    recommendations: [
      'Reveja contratos indexados ao USD vincendos nos próximos 90 dias',
      'Ative o relatório "Exposição cambial" no SGFM',
      'Considere fixar condições com fornecedores estratégicos',
    ],
  },
  {
    id: 4,
    slug: 'anomalia-combustivel-q1',
    tag: 'Alerta',
    category: 'Alerta',
    title: 'Anomalia detetada: gastos com combustível 23% acima do padrão histórico',
    snippet:
      'Sistema identificou desvio relevante em requisições de combustível nos últimos 14 dias; 3 departamentos afetados.',
    source: 'Motor de anomalias SGFM',
    time: 'há 2 h',
    readMinutes: 2,
    body: [
      'O motor de deteção de anomalias do SGFM sinalizou um aumento de 23% nos gastos com combustível entre as últimas duas semanas e a média dos 12 meses anteriores. O desvio é estatisticamente significativo (z-score 2,8).',
      'Os departamentos Comercial, Logística e Assistência Técnica concentram 82% do aumento. O padrão sugere intensificação de deslocações, mas também se recomenda verificar possíveis duplicações em requisições recentes.',
      'Ação recomendada: rever as requisições sinalizadas no relatório "Anomalias" e confirmar justificativas antes do fecho do mês.',
    ],
    kpis: [
      { label: 'Desvio vs. média', value: '+23%', trend: 'up', delta: 'crítico' },
      { label: 'Z-score', value: '2,8', trend: 'up', delta: 'significativo' },
      { label: 'Departamentos', value: '3', trend: 'flat', delta: '82% do desvio' },
      { label: 'Requisições sinalizadas', value: '47', trend: 'up', delta: 'para revisão' },
    ],
    charts: [
      {
        type: 'bar',
        title: 'Gastos semanais com combustível (MT)',
        categories: ['S-5', 'S-4', 'S-3', 'S-2', 'S-1', 'Atual'],
        series: [{ name: 'Combustível', data: [42000, 44500, 43800, 48200, 52100, 57800] }],
      },
      {
        type: 'donut',
        title: 'Concentração por departamento',
        categories: ['Comercial', 'Logística', 'Assistência', 'Outros'],
        series: [{ name: '%', data: [35, 29, 18, 18] }],
      },
    ],
    recommendations: [
      'Reveja as 47 requisições sinalizadas no relatório "Anomalias"',
      'Confirme com chefes de departamento se houve campanha/rota extraordinária',
      'Ative alerta em tempo real para desvios > 15%',
    ],
  },
  {
    id: 5,
    slug: 'benchmark-setor-retalho',
    tag: 'Benchmark',
    category: 'Benchmark',
    title: 'Retalho: a sua empresa está 11% acima da média do setor em velocidade de reposição',
    snippet:
      'Comparativo com 62 empresas de retalho de Maputo e Matola mostra que o seu fundo roda mais rapidamente que a média.',
    source: 'SGFM Benchmark',
    time: 'há 3 h',
    readMinutes: 3,
    body: [
      'A análise comparativa anónima dentro da rede SGFM compara o seu indicador de rotação de fundo com outras 62 empresas do setor de retalho nas áreas de Maputo e Matola. A sua velocidade de reposição é 11% superior à mediana do grupo.',
      'Este resultado posiciona-o no terceiro quartil do setor — indicador positivo de maturidade operacional. Empresas no quarto quartil (top 25%) têm velocidade 26% superior à mediana, o que representa uma janela de melhoria acessível.',
      'Os drivers identificados nas empresas do topo incluem: (1) pré-aprovação de despesas recorrentes, (2) uso intensivo de categorias automáticas e (3) conciliação diária em vez de semanal.',
    ],
    kpis: [
      { label: 'Posição no setor', value: '3.º quartil', trend: 'up', delta: 'forte' },
      { label: 'Vs. mediana', value: '+11%', trend: 'up', delta: 'velocidade' },
      { label: 'Gap até top 25%', value: '15 p.p.', trend: 'up', delta: 'potencial' },
      { label: 'Empresas comparadas', value: '62', trend: 'flat', delta: 'retalho MZ' },
    ],
    charts: [
      {
        type: 'bar',
        title: 'Velocidade de reposição — quartis do setor (dias)',
        categories: ['1.º Q', '2.º Q', '3.º Q (você)', '4.º Q'],
        series: [{ name: 'Dias médios', data: [8.2, 6.4, 4.8, 3.6] }],
        suffix: 'd',
      },
      {
        type: 'line',
        title: 'Rotação mensal (você vs. mediana do setor)',
        categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        series: [
          { name: 'A sua empresa', data: [3.8, 4.1, 4.3, 4.2, 4.5, 4.8] },
          { name: 'Mediana retalho', data: [3.5, 3.6, 3.7, 3.8, 3.9, 4.1] },
        ],
      },
    ],
    recommendations: [
      'Pré-aprove despesas recorrentes (água, renda, serviços)',
      'Migre de conciliação semanal para diária',
      'Ative categorias automáticas para as 5 rubricas mais frequentes',
    ],
  },
  {
    id: 6,
    slug: 'ia-sazonalidade-feriados',
    tag: 'Previsão',
    category: 'Previsão',
    title: 'Padrão sazonal: fundo deve crescer 34% nas duas semanas antes de dezembro',
    snippet:
      'Modelo preditivo identifica pico sazonal típico do mercado moçambicano. Prepare reforço de fundo com 3 semanas de antecedência.',
    source: 'SGFM Insights',
    time: 'há 5 h',
    readMinutes: 3,
    body: [
      'A análise de 4 anos de dados históricos da rede SGFM revela um padrão sazonal consistente: nas duas semanas que antecedem dezembro, a procura por fundo de maneio aumenta em média 34%, puxada por reposições de stock, bónus de fim de ano e campanhas comerciais.',
      'Empresas que ajustam o valor-alvo do fundo com 3 semanas de antecedência reportam zero rupturas na janela crítica. Em contraste, as que reagem apenas quando o alerta dispara sofrem em média 2,3 dias de bloqueio operacional.',
      'O SGFM permite configurar "perfis sazonais" que ajustam automaticamente o limite do fundo durante janelas específicas, dispensando ação manual.',
    ],
    kpis: [
      { label: 'Aumento típico', value: '+34%', trend: 'up', delta: 'em 2 semanas' },
      { label: 'Antecedência ideal', value: '3 sem', trend: 'up', delta: 'preparação' },
      { label: 'Bloqueio sem preparação', value: '2,3d', trend: 'down', delta: 'em média' },
      { label: 'Dados analisados', value: '4 anos', trend: 'flat', delta: 'rede SGFM' },
    ],
    charts: [
      {
        type: 'line',
        title: 'Padrão sazonal médio — fundo de maneio (índice 100 = média anual)',
        categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        series: [{ name: 'Índice sazonal', data: [94, 92, 96, 99, 102, 104, 103, 105, 108, 112, 128, 134] }],
      },
    ],
    recommendations: [
      'Ative perfis sazonais para novembro-dezembro',
      'Reforce o limite em +30% a 3 semanas do pico',
      'Reveja com Tesouraria antes de 15 de novembro',
    ],
  },
]

// Back-compat: landing AI section continues to consume MOCK_AI_NEWS (first 3 items)
export const MOCK_AI_NEWS = MOCK_INSIGHTS.slice(0, 3).map((i) => ({
  id: i.id,
  slug: i.slug,
  tag: i.tag,
  title: i.title,
  snippet: i.snippet,
  source: i.source,
  time: i.time,
}))

export const MOCK_TESTIMONIALS = [
  {
    id: 1,
    name: 'Amélia Cossa',
    role: 'CFO – Grupo Horizonte',
    avatar: 'AC',
    text: 'Reduzimos o tempo de aprovação de requisições em 73%. O painel em tempo real é viciante.',
  },
  {
    id: 2,
    name: 'Nelson Matola',
    role: 'Diretor Financeiro – Vanguarda SA',
    avatar: 'NM',
    text: 'A IA do SGFM antecipou três desvios de orçamento antes de acontecerem. Poupou-nos milhões.',
  },
  {
    id: 3,
    name: 'Isabel Tivane',
    role: 'Tesoureira – Fundação Sol',
    avatar: 'IT',
    text: 'Finalmente uma ferramenta elegante para algo que era um pesadelo de Excel. Os auditores adoraram.',
  },
]

export const MOCK_USER = {
  id: 42,
  name: 'Utilizador SGFM',
  email: 'utilizador@sgfm.com',
  phone: '+258 84 000 0000',
  department: 'Financeiro',
  role: 'Gestor de Fundo',
}

export interface RegisterStep1 {
  email: string
  phone: string
  password: string
  password_confirmation: string
  terms: boolean
  security_question: string
}

export interface RegisterStep3 {
  full_name: string
  department_id: number | null
  role_id: number | null
  alt_phone?: string
}
