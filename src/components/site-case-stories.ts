type SiteCaseStory = {
  client: string;
  scope: string;
  challengeTitle: string;
  challenge: string;
  solutionTitle: string;
  solution: string;
  outcome: string;
  credit: string;
};

// Descrições baseadas no conteúdo e na navegação pública de cada site.
// Evitamos métricas, datas e atribuições de funções que não foram confirmadas.
export const siteCaseStories: Record<string, SiteCaseStory> = {
  sotela: {
    client: "Sotela",
    scope: "Site institucional · Produtos · Contato",
    challengeTitle: "Uma indústria com muitas soluções para apresentar.",
    challenge: "Desde 2014, a Sotela atua com gradis, alambrados, divisórias, tapumes e portões para projetos residenciais, industriais e de construção civil. O desafio da presença digital é ajudar públicos diferentes a encontrar a linha certa e chegar facilmente à equipe comercial.",
    solutionTitle: "Produtos, aplicações e contato em uma jornada clara.",
    solution: "O site apresenta a empresa, o grupo e as categorias de produtos em uma navegação direta. Imagens de aplicações e páginas de cases mostram as soluções em contexto, enquanto os caminhos para cotação e atendimento permanecem próximos do conteúdo.",
    outcome: "Uma experiência responsiva que dá espaço ao portfólio técnico da marca e facilita a descoberta das soluções em telas grandes e pequenas.",
    credit: "Meme Digital",
  },
  sitela: {
    client: "Sitela",
    scope: "Site institucional · Linhas de gradil · Obras",
    challengeTitle: "Traduzir proteção e sustentabilidade em uma experiência simples.",
    challenge: "A Sitela apresenta gradis para obras, condomínios e empresas. Cada aplicação tem necessidades próprias de segurança, acabamento e durabilidade. O site precisa explicar essas diferenças sem perder a proposta ambiental da marca.",
    solutionTitle: "Uma narrativa visual para cada aplicação.",
    solution: "A navegação separa empresa, produtos, obras e contato. As linhas de gradil ganham destaque visual e descrições objetivas; a mensagem de sustentabilidade acompanha a apresentação dos materiais e dos setores atendidos.",
    outcome: "O visitante pode conhecer a marca, explorar usos do produto e seguir para o contato com uma visão mais clara da oferta.",
    credit: "Meme Digital",
  },
  vacinaone: {
    client: "VacinaOne",
    scope: "Site institucional · Vacinas · Agendamento",
    challengeTitle: "Falar de prevenção com clareza e acolhimento.",
    challenge: "A VacinaOne atende crianças, adultos e empresas em Campinas. Para uma clínica de vacinação, a experiência online precisa responder dúvidas práticas, transmitir segurança e tornar o agendamento fácil para famílias em diferentes momentos da vida.",
    solutionTitle: "Cuidado e informação no mesmo percurso.",
    solution: "O site reúne vacinas, unidades, atendimento, conteúdo e o serviço VacinaOne até Você. A apresentação usa imagens de pessoas e mensagens diretas para aproximar o cuidado da rotina do visitante, com acesso visível ao agendamento.",
    outcome: "Uma presença digital que comunica o atendimento humanizado da clínica e organiza os próximos passos de quem procura vacinação.",
    credit: "Meme Digital",
  },
  immf: {
    client: "Instituto de Medicina Materno Fetal",
    scope: "Site institucional · Conteúdo médico · Serviços",
    challengeTitle: "Tornar um tema especializado mais fácil de percorrer.",
    challenge: "O IMMF reúne profissionais, exames, procedimentos e informações sobre medicina materno fetal. Pacientes e profissionais chegam ao site com perguntas diferentes; a arquitetura precisa dar acesso ao conteúdo técnico sem dificultar o contato com o instituto.",
    solutionTitle: "Informação organizada para diferentes jornadas.",
    solution: "O menu distribui equipe, artigos, exames e procedimentos, calculadoras clínicas e calendários de vacinas em áreas identificáveis. O caminho para agendar um exame aparece junto à apresentação dos serviços.",
    outcome: "O conteúdo do instituto fica consultável no desktop e no celular, com percursos para informação, equipe e atendimento.",
    credit: "Meme Digital",
  },
  "oticas-ipanema-2": {
    client: "Óticas Ipanema",
    scope: "Site institucional · Coleções · Lojas",
    challengeTitle: "Unir moda, visão e presença de franquia.",
    challenge: "A Óticas Ipanema reúne coleções, marcas, lojas e oportunidades de franquia. A presença online precisa mostrar o estilo dos produtos e, ao mesmo tempo, oferecer caminhos rápidos para orçamento, teste de visão e contato.",
    solutionTitle: "Uma vitrine que também orienta.",
    solution: "O site leva o visitante das marcas e coleções às lojas e aos serviços. Fotografia, navegação por temas e chamadas de contato organizam uma vitrine digital útil para clientes e interessados na franquia.",
    outcome: "A experiência conecta descoberta de produtos e ações práticas em versões desktop e mobile.",
    credit: "Desenvolvimento creditado à Meme Digital no rodapé do site.",
  },
};
