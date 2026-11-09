export type CaseProject = {
  slug: string;
  title: string;
  category: string;
  project: string;
  intro: string;
  image: string;
  mobileImage?: string;
  website?: string;
};

export const caseProjects: CaseProject[] = [
  {
    slug: "sotela",
    title: "Sotela",
    category: "Indústria · Website",
    project: "Site institucional",
    intro: "Soluções de fechamento, produtos e projetos industriais apresentados em uma experiência digital.",
    image: "/cases/sotela-desktop.webp",
    mobileImage: "/cases/sotela-mobile.webp",
    website: "https://www.sotela.com.br/",
  },
  {
    slug: "sitela",
    title: "Sitela",
    category: "Indústria · Website",
    project: "Site institucional",
    intro: "Gradis residenciais e industriais, com foco em segurança, durabilidade e sustentabilidade.",
    image: "/cases/sitela-desktop.webp",
    mobileImage: "/cases/sitela-mobile.webp",
    website: "https://sitela.com.br/",
  },
  {
    slug: "vacinaone",
    title: "VacinaOne",
    category: "Saúde · Website",
    project: "Site institucional",
    intro: "Uma experiência digital para apresentar vacinação, cuidado e atendimento em Campinas.",
    image: "/cases/vacinaone-desktop.webp",
    mobileImage: "/cases/vacinaone-mobile.webp",
    website: "https://www.vacinaone.com.br/",
  },
  {
    slug: "immf",
    title: "IMMF",
    category: "Saúde · Website",
    project: "Site institucional",
    intro: "Informações, profissionais e serviços do Instituto de Medicina Materno Fetal em uma única experiência.",
    image: "/cases/immf-desktop.webp",
    mobileImage: "/cases/immf-mobile.webp",
    website: "https://immf.med.br/",
  },
  {
    slug: "oticas-ipanema-2",
    title: "Óticas Ipanema",
    category: "Varejo · Website",
    project: "Site institucional",
    intro: "Coleções, lojas e informações da franquia reunidas na presença digital da marca.",
    image: "/cases/oticas-ipanema-desktop.webp",
    mobileImage: "/cases/oticas-ipanema-mobile.webp",
    website: "https://oticasipanema.com.br/",
  },
  {
    slug: "voluta-medical",
    title: "Voluta Medical",
    category: "Saúde · Website e marketing",
    project: "Website e marketing para Voluta Medical",
    intro: "Projeto de website e marketing para o Voluta Medical, com comunicação voltada a cuidado e confiança.",
    image: "/wp-content/uploads/2024/08/Retangulo-62.webp",
  },
];

// Mantém as páginas já usadas por outros links do site, fora da seleção atual de cases.
export const legacyCaseProjects: CaseProject[] = [
  { slug: "aloia-aerospace", title: "Aloia Aerospace", category: "Aviação", project: "Marketing para Aloia Aerospace", intro: "Presença digital e comunicação para a Aloia Aerospace.", image: "/wp-content/uploads/2024/06/Retangulo-8.webp" },
  { slug: "baralho-voluta-medical", title: "Voluta Medical — Baralho", category: "Saúde", project: "Material de divulgação", intro: "Design e informação médica apresentados em cartas ilustradas.", image: "/wp-content/uploads/2024/08/Retangulo-46-scaled.webp" },
  { slug: "bronte-imoveis", title: "Bronte Imóveis", category: "Imobiliário", project: "Marketing para Bronte Imóveis", intro: "Comunicação digital para a presença da Bronte no mercado imobiliário.", image: "/wp-content/uploads/2024/08/Retangulo-8-1.webp" },
  { slug: "cafe-cophi", title: "Café Cophi", category: "Branding", project: "Identidade visual para Café Cophi", intro: "Identidade visual para uma experiência acolhedora em cada contato com a marca.", image: "/wp-content/uploads/2024/08/Retangulo-17-3.webp" },
  { slug: "concept-lar", title: "Concept Lar", category: "Branding", project: "Identidade visual para Concept Lar", intro: "Marca e comunicação para os serviços de cuidado com ambientes da Concept Lar.", image: "/wp-content/uploads/2024/08/Retangulo-17-1.webp" },
  { slug: "icaro-rocks", title: "Icaro Rocks", category: "Website", project: "Website para Icaro Rocks", intro: "Uma experiência digital para apresentar joias, design e gemologia.", image: "/wp-content/uploads/2024/08/Retangulo-45-1024x576.webp" },
  { slug: "neto-ensina", title: "Neto Ensina", category: "Website", project: "Website para Neto Ensina", intro: "Plataforma digital com foco em ensino de tecnologia e acessibilidade.", image: "/wp-content/uploads/2024/08/Retangulo-17.webp" },
  { slug: "nur-eventos", title: "NUR Eventos", category: "Branding", project: "Identidade visual para NUR Eventos", intro: "Uma identidade visual para comunicar a energia e a elegância dos eventos.", image: "/wp-content/uploads/2024/08/Retangulo-17-2.webp" },
];

export const allCaseProjects = [...caseProjects, ...legacyCaseProjects];
