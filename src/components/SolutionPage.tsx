import Image from "next/image";
import Link from "next/link";
import { ModernEffects } from "@/components/ModernEffects";
import { ModernFooter } from "@/components/ModernFooter";
import { ModernHeader } from "@/components/ModernHeader";
import type { OfferingIconName } from "@/components/OfferingIcon";
import { InteractiveOfferings } from "@/components/InteractiveOfferings";
import { SolutionSwitcher } from "@/components/SolutionSwitcher";
import { LogoCarousel } from "@/components/LogoCarousel";
import { CasesScroller } from "@/components/CasesScroller";
import { getOfferingCopy } from "@/components/solution-copy";
import { SolutionCases } from "@/components/SolutionCases";
import { CaseDetails } from "@/components/CaseDetails";
import { allCaseProjects, caseProjects, legacyCaseProjects } from "@/components/case-projects";

const solutions = {
  agencia: { label: "Estratégia & growth", title: "Agência", summary: "Nossa agência é especializada em impulsionar a presença online com estratégias de marketing e tecnologia feitas para aumentar ROI e LTV.", image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1500&q=85", featureImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=85", featureTitle: "Growth with Meme", featureDescription: "Estratégia, criatividade e tecnologia trabalhando juntas para proporcionar boas experiências e altas taxas de conversão.", services: [{ title: "SEO", text: "Conteúdo, técnica e palavras-chave para conquistar visibilidade orgânica e tráfego qualificado." }, { title: "Performance", text: "Estratégias de mídia e conversão para transformar investimento em crescimento consistente." }, { title: "Growth Hacking", text: "Testes, inovação e escala para identificar as oportunidades que aceleram o negócio." }, { title: "Digital Planning", text: "Planejamento conectado à realidade da empresa, do primeiro insight à execução." }, { title: "Copywriter", text: "Mensagens claras que traduzem valor e aproximam sua marca das pessoas certas." }, { title: "Automação de Marketing", text: "Jornadas que organizam relacionamento, dados e oportunidades comerciais." }] },
  "tech-web": { label: "Tecnologia & desenvolvimento", title: "Tech & Web", summary: "Criamos e-commerces, sites, aplicativos e integrações para tornar sua operação digital mais forte, atual e funcional.", image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1500&q=85", featureImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85", featureTitle: "Estamos na era digital", featureDescription: "Conhecimento, atualização constante e tecnologia aplicada para gerar resultados relevantes para as marcas.", services: [{ title: "E-commerce", text: "Lojas integradas a VTEX, Linx, Tray, Nuvemshop, WooCommerce e outras plataformas." }, { title: "Apps para iOS e Android", text: "Aplicativos em React Native, Node.js, Flutter Flow, Java e tecnologias adequadas ao seu desafio." }, { title: "Web", text: "Sites institucionais, landing pages e páginas de venda com estratégia e boa experiência." }, { title: "Manutenções", text: "Evolução contínua para sites, lojas e apps sempre funcionais e seguros." }] },
  design: { label: "Marca & experiência", title: "Design", summary: "Soluções criativas que elevam a conexão entre sua marca e seus clientes, com identidade, clareza e experiências memoráveis.", image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1500&q=85", featureImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1400&q=85", featureTitle: "UX / UI", featureDescription: "Experiências centradas nas pessoas para humanizar produtos, softwares, aplicativos e interfaces digitais.", services: [{ title: "E-branding / Naming", text: "Brand books, nomes e um DNA visual único para tornar sua marca reconhecível." }, { title: "UX / UI", text: "Interfaces envolventes, claras e fáceis de usar em cada ponto de contato." }, { title: "Creative Design", text: "Peças criativas e refinadas que colocam sua marca em evidência." }] },
  "performance-ads": { label: "Mídia & dados", title: "Performance Ads", summary: "Mídia paga para gerar tráfego, leads e vendas, com formatos e segmentações adequados aos objetivos do seu negócio.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1500&q=85", featureImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85", featureTitle: "Para se destacar no digital", featureDescription: "Relatórios, analytics, dashboards e análise de dados para maximizar conversões e encontrar oportunidades reais.", services: [{ title: "Meta Ads", text: "Campanhas segmentadas para Facebook e Instagram, com formatos orientados a objetivos." }, { title: "Google Ads", text: "Pesquisa, Shopping, Display, YouTube e outras frentes para alcançar quem procura." }, { title: "LinkedIn Ads", text: "Mídia B2B para conversar com profissionais e decisores qualificados." }, { title: "Mídia Nativa", text: "Taboola, Outbrain e MGID para distribuir conteúdo com contexto e relevância." }, { title: "Waze / Amazon Ads", text: "Presença onde o público decide para onde ir e o que comprar." }] },
  "produtos-digitais": { label: "Lançamento & escala", title: "Produtos Digitais", summary: "Transformamos habilidades e conhecimento em produtos digitais, com jornadas de venda fluidas e oportunidades de escala.", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1500&q=85", featureImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=85", featureTitle: "Equipe e ferramentas para infoprodutos", featureDescription: "Estratégia, tecnologia e experiência para transformar ideias em e-books, cursos, mentorias e lançamentos rentáveis.", services: [{ title: "Agência de Lançamentos", text: "Estruturas perpétuas e lançamentos para manter a oferta ativa e aumentar o alcance." }, { title: "Infoprodutos / Afiliados", text: "Coproduções, cursos, mentorias e plataformas como Hotmart, Kiwify, Eduzz e mais." }, { title: "Influencer Digital", text: "Estratégias para transformar audiência, influência e relacionamento em negócio." }] },
  metaverso: { label: "Experiências imersivas", title: "Metaverso", summary: "Realidade aumentada, realidade virtual e experiências interativas para aproximar tecnologia, pessoas e novas oportunidades.", image: "/logos/Retangulo-33-4.png", featureImage: "/logos/Prancheta-2b.webp", featureTitle: "Realidade aumentada × realidade virtual", featureDescription: "Tecnologias que ampliam o mundo real e constroem ambientes imersivos para vendas, treinamento, entretenimento e educação.", services: [{ title: "Realidade Aumentada (AR)", text: "Elementos virtuais, objetos 3D, vídeos, games e links que passam a fazer parte do ambiente real." }, { title: "Realidade Virtual (VR)", text: "Ambientes digitais envolventes para criar interações, treinamentos e experiências fora do comum." }] },
} as const;

const clientLogos = ["Background-2-2.jpg", "Background-3-2.jpg", "Background-4-2.jpg", "Background-5-2.jpg", "Background-6-2.jpg", "Background-7-2.jpg", "Background-8-2.jpg", "Background-9-2.jpg", "Background-10-2.jpg", "Background-11-2.jpg", "Background-12-2.jpg", "Background-13-2.jpg"];
type SolutionSlug = keyof typeof solutions;

const offeringIcons: Record<SolutionSlug, OfferingIconName[]> = {
  agencia: ["seo", "performance", "growth", "planning", "copy", "automation"],
  "tech-web": ["commerce", "app", "web", "automation"],
  design: ["design", "web", "copy"],
  "performance-ads": ["performance", "seo", "growth", "copy", "commerce"],
  "produtos-digitais": ["launch", "commerce", "app"],
  metaverso: ["vr", "design"],
};

const offeringImages: Record<SolutionSlug, string[]> = {
  agencia: [],
  "tech-web": [
    "photo-1556742049-0cfed4f6a45d", "photo-1556656793-08538906a9f8",
    "photo-1461749280684-dccba630e2f6", "photo-1581091226825-a6a2a5aee158",
  ],
  design: [
    "photo-1558655146-9f40138edfeb", "photo-1561070791-2526d30994b5",
    "photo-1545235617-9465d2a55698",
  ],
  "performance-ads": [
    "photo-1460925895917-afdab827c52f", "photo-1551288049-bebda4e38f71",
    "photo-1552664730-d307ca884978", "photo-1432888622747-4eb9a8efeb07",
    "photo-1499951360447-b19be8fe80f5",
  ],
  "produtos-digitais": [
    "photo-1556742049-0cfed4f6a45d", "photo-1516321318423-f06f85e504b3",
    "photo-1522071820081-009f0129c71c",
  ],
  metaverso: ["photo-1593508512255-86ab42a8e620", "photo-1518770660439-4636190af475"],
};

export function isSolutionSlug(slug: string): slug is SolutionSlug {
  return slug in solutions;
}

export function SolutionPage({ slug }: { slug: SolutionSlug }) {
  const solution = solutions[slug];
  return <div className="modern-site solution-page">
    <ModernHeader activeSolution={slug} />
    <main id="conteudo">
      <section className="sp-hero">
        <div className="mh-shell sp-hero-grid">
          <div className="sp-copy"><span className="mh-eyebrow">{solution.label}</span><h1>{solution.title} para <em>fazer acontecer.</em></h1><p>{solution.summary}</p><a className="mh-button mh-button-primary" href="#contato">Fale com um especialista <span>↗</span></a></div>
          <div className="sp-image"><Image src={solution.image} alt={`Solução ${solution.title} da Meme Digital`} fill priority sizes="(max-width: 900px) 100vw, 50vw" /><span>Meme Digital · Marketing + Tech</span></div>
        </div>
      </section>
      <section className="sp-brand-rail"><LogoCarousel logos={clientLogos} /></section>
      <section className="sp-feature"><div className="mh-shell sp-feature-grid"><div className="sp-feature-image"><Image src={solution.featureImage} alt={`Contexto para ${solution.title}`} fill sizes="(max-width: 900px) 100vw, 50vw" /></div><div><span className="mh-eyebrow">Meme Digital</span><h2>{solution.featureTitle}</h2><p>{solution.featureDescription}</p><Link className="mh-text-link" href="/#contato">Saiba mais <span>↗</span></Link></div></div></section>
      <section className="sp-offerings"><div className="mh-shell">
        <header className="mh-reveal"><span className="mh-eyebrow">{solution.title} · Soluções à disposição</span><h2>Especialidades que trabalham<br /><em>em um só time.</em></h2></header>
        <SolutionSwitcher active={slug} />
        <InteractiveOfferings
          solution={solution.title}
          variant="generic"
          items={solution.services.map((service, index) => ({
            ...service,
            text: getOfferingCopy(slug, service.title, service.text),
            icon: offeringIcons[slug][index] ?? "growth",
            image: offeringImages[slug][index]
              ? `https://images.unsplash.com/${offeringImages[slug][index]}?auto=format&fit=crop&w=1100&q=82`
              : solution.image,
          }))}
        />
      </div></section>
      <SolutionCases />
      <section className="sp-cta" id="contato"><div className="mh-shell"><span className="mh-eyebrow">Bora conversar?</span><h2>Seu próximo movimento começa com uma <em>boa estratégia.</em></h2><Link className="mh-button mh-button-light" href="/#contato">Falar com a Meme <span>↗</span></Link></div></section>
    </main>
    <ModernFooter />
    <ModernEffects />
  </div>;
}

const hubs = {
  cases: { label: "Cases", title: "Projetos que ganham vida na tela.", description: "Explore exemplos de sites e veja como cada projeto se apresenta nas versões desktop e mobile." },
  insights: { label: "Insights", title: "Ideias para o próximo movimento.", description: "Conteúdos sobre marketing, tecnologia, design e performance para ajudar negócios a tomar decisões melhores." },
  institucional: { label: "Institucional", title: "Uma agência martech para conectar pessoas e negócios.", description: "Somos uma equipe de estratégia, criação e tecnologia que trabalha de ponta a ponta para construir experiências digitais relevantes." },
} as const;

const caseCards = caseProjects;

const insightCards = [
  "Quanto custa uma agência de marketing digital em SP? 2026",
  "Como escolher Agência de Marketing Digital em 2025? Guia",
  "Agência de Marketing Digital em São Paulo: Estratégias e Resultados",
  "Agência de Marketing São Paulo: Escolha a Meme Digital",
  "Agência de Marketing em Campinas: Conheça a Meme Digital",
  "Melhores agências de marketing digital em Campinas: Guia 2025",
];

export function isHubSlug(slug: string): slug is keyof typeof hubs { return slug in hubs; }
export function isCaseSlug(slug: string): boolean { return allCaseProjects.some((item) => item.slug === slug); }

export function HubPage({ slug }: { slug: keyof typeof hubs }) {
  const hub = hubs[slug];
  return <div className="modern-site solution-page"><ModernHeader /><main id="conteudo">
    <section className="sp-hub"><div className="mh-shell"><span className="mh-eyebrow">{hub.label}</span><h1>{hub.title}</h1><p>{hub.description}</p><Link className="mh-button mh-button-primary" href="/#contato">Fale com um especialista <span>↗</span></Link></div></section>
    {slug === "cases" && <CasesScroller items={caseCards} />}
    {slug === "insights" && <section className="sp-archive sp-insights-archive"><div className="mh-shell"><header><span className="mh-eyebrow">Artigos</span><h2>Conteúdo para decidir o <em>próximo passo.</em></h2></header><div className="sp-insight-list">{insightCards.map((title, index) => <article key={title}><b>0{index + 1}</b><div><small>Meme Digital · Insights</small><h3>{title}</h3><p>Estratégias, tecnologia e marketing explicados de forma clara para apoiar decisões de negócio.</p></div><Link href="/#contato" aria-label={`Ler ${title}`}>↗</Link></article>)}</div></div></section>}
    {slug === "institucional" && <section className="sp-archive sp-company"><div className="mh-shell"><div className="sp-company-intro"><div><span className="mh-eyebrow">Agência humana</span><h2>Juntos, somos um só. <em>Simples, atentos e humanos.</em></h2></div><p>Desde 2015, a Meme Digital une marketing digital e tecnologia para ampliar a presença online de empresas no Brasil e além.</p></div><div className="sp-company-grid"><article><b>Conectando</b><h3>Pessoas e lugares</h3><p>Criamos laços significativos entre marcas, pessoas e experiências digitais.</p></article><article><b>Numa boa</b><h3>& numa nice</h3><p>Uma equipe que combina criatividade, entusiasmo e compromisso com resultados.</p></article><article><b>The MEMER&apos;s</b><h3>Uma família de especialistas</h3><p>Designers, desenvolvedores, mídia, marketing e criação trabalhando juntos.</p></article></div></div></section>}
  </main><ModernFooter /><ModernEffects /></div>;
}

export function CasePage({ slug }: { slug: string }) {
  const projects = caseProjects.some((item) => item.slug === slug) ? caseProjects : legacyCaseProjects;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index < 0) return null;
  const project = projects[index];
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return <div className="modern-site case-page"><ModernHeader /><main id="conteudo"><CaseDetails project={project} previous={previous} next={next} /></main><ModernFooter /><ModernEffects /></div>;
}
