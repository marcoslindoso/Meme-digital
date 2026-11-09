import Image from "next/image";
import Link from "next/link";
import type { CaseProject } from "@/components/case-projects";
import { siteCaseStories } from "@/components/site-case-stories";

const folder = "/wp-content/uploads/2024/08/";

const details: Record<string, { challenge: string; approach: string; images: [string, string] }> = {
  "aloia-aerospace": {
    challenge: "A Aloia Aerospace queria renovar sua presença online e apresentar a sofisticação de sua atuação aeroespacial também nos canais digitais.",
    approach: "A Meme criou uma linguagem visual para as redes e um site com navegação clara, design responsivo e atenção à visibilidade nas buscas.",
    images: ["/wp-content/uploads/2024/06/Retangulo-7.webp", "/wp-content/uploads/2024/06/Retangulo-9.webp"],
  },
  "baralho-voluta-medical": {
    challenge: "O Voluta buscava uma forma mais leve e acessível de apresentar seus exames sem perder a precisão da informação médica.",
    approach: "Transformamos os exames em cartas ilustradas. Naipes, cores, ícones e textos curtos aproximam o conteúdo dos pacientes.",
    images: [`${folder}Retangulo-50.webp`, `${folder}Retangulo-49.webp`],
  },
  "bronte-imoveis": {
    challenge: "A Bronte precisava levar ao digital a força e a credibilidade que já tinha no mercado imobiliário.",
    approach: "Site, redes sociais e conteúdo ganharam uma linguagem consistente, com navegação intuitiva e imagens que valorizam os imóveis.",
    images: [`${folder}Retangulo-7-2.webp`, `${folder}Retangulo-9-2.webp`],
  },
  "cafe-cophi": {
    challenge: "O Café Cophi precisava de uma identidade capaz de transmitir o acolhimento do espaço antes mesmo da primeira visita.",
    approach: "Criamos ilustrações e uma paleta calorosa que se estendem das embalagens às xícaras, mantendo a marca reconhecível em cada contato.",
    images: [`${folder}Retangulo-69.webp`, `${folder}Retangulo-9-6.webp`],
  },
  "concept-lar": {
    challenge: "A Concept Lar queria traduzir confiança, cuidado e profissionalismo em uma marca para seus serviços de higienização.",
    approach: "Uma identidade de cores fortes e comunicação direta organiza a marca em peças gráficas e aplicações do dia a dia.",
    images: [`${folder}Retangulo-16-1.webp`, `${folder}Retangulo-9-4.webp`],
  },
  "icaro-rocks": {
    challenge: "As joias e a gemologia do Ícaro Rocks pediam uma experiência digital à altura da exclusividade das peças.",
    approach: "O site combina uma apresentação visual sofisticada com navegação simples e responsiva para destacar as coleções em qualquer tela.",
    images: [`${folder}Retangulo-37.webp`, `${folder}Retangulo-38.webp`],
  },
  "neto-ensina": {
    challenge: "O Neto Ensina precisava tornar o aprendizado de tecnologia acessível a pessoas de diferentes idades e níveis de experiência.",
    approach: "A plataforma ganhou uma navegação simples e uma comunicação didática, conectando aulas, conteúdo e inclusão digital.",
    images: [`${folder}Retangulo-16.webp`, `${folder}Retangulo-9-3.webp`],
  },
  "nur-eventos": {
    challenge: "A NUR Eventos buscava uma identidade que expressasse a energia dos eventos com elegância e proximidade.",
    approach: "Desenvolvemos uma linguagem minimalista, com paleta monocromática, traços suaves e tipografia fluida para diferentes aplicações.",
    images: [`${folder}Retangulo-16-2.webp`, `${folder}Retangulo-9-5.webp`],
  },
  "oticas-ipanema-2": {
    challenge: "A Óticas Ipanema precisava de uma presença digital moderna, que refletisse seu estilo e ajudasse o público a conhecer a marca.",
    approach: "Site responsivo e comunicação nas redes aproximam design, desempenho e conteúdo em uma experiência clara para o visitante.",
    images: [`${folder}Retangulo-7-1.webp`, `${folder}Retangulo-9-1.webp`],
  },
  "voluta-medical": {
    challenge: "O Voluta Medical precisava comunicar sua precisão em diagnósticos e o cuidado humano presente em cada atendimento.",
    approach: "Identidade visual, site e campanhas digitais trabalham juntos para transmitir confiança e facilitar o contato com os pacientes.",
    images: [`${folder}Retangulo-60.webp`, `${folder}Retangulo-61.webp`],
  },
};

function CaseNavigation({ previous, next }: { previous: CaseProject; next: CaseProject }) {
  return <nav className="case-detail-nav" aria-label="Navegação entre cases"><div className="mh-shell"><Link href={`/${previous.slug}`}><span>← Case anterior</span><strong>{previous.title}</strong></Link><Link className="case-detail-nav-all" href="/cases">Todos os cases ↗</Link><Link href={`/${next.slug}`}><span>Próximo case →</span><strong>{next.title}</strong></Link></div></nav>;
}

export function CaseDetails({ project, previous, next }: { project: CaseProject; previous: CaseProject; next: CaseProject }) {
  if (project.mobileImage && project.website) {
    const domain = new URL(project.website).hostname.replace(/^www\./, "");
    const story = siteCaseStories[project.slug];
    return <>
      <section className="site-case-banner" aria-labelledby="case-title">
        <Image className="site-case-banner-image" src={project.image} alt="" fill priority sizes="100vw" unoptimized />
        <div className="site-case-banner-shade" />
        <div className="mh-shell site-case-banner-content">
          <Link className="case-detail-back" href="/cases">← Todos os cases</Link>
          <div><span className="mh-eyebrow">Case · {project.category}</span><h1 id="case-title">{project.title}</h1><p>{project.intro}</p><a className="site-case-visit" href={project.website} target="_blank" rel="noreferrer">Visitar site <span>↗</span></a></div>
        </div>
      </section>
      <section className="site-case-overview"><div className="mh-shell">
        <div className="site-case-meta"><span>Cliente <strong>{story.client}</strong></span><span>Projeto <strong>{project.project}</strong></span><span>Escopo <strong>{story.scope}</strong></span><span>Site <strong>{domain}</strong></span></div>
        <article className="case-detail-story"><span>01 / O desafio</span><h2>{story.challengeTitle}</h2><p>{story.challenge}</p></article>
      </div></section>
      <section className="site-case-gallery" aria-label={`Versões do site ${project.title}`}><div className="mh-shell">
        <div className="site-case-gallery-label"><span>02 / O projeto</span><p>Uma experiência em cada tela.</p></div>
        <div className="site-case-screens"><div className="site-case-desktop"><div className="site-case-browser"><i /><i /><i /><span>{domain}</span></div><Image src={project.image} alt={`Versão desktop do site ${project.title}`} width={1440} height={900} sizes="(max-width: 800px) 100vw, 72vw" unoptimized /></div><div className="site-case-mobile"><div className="site-case-phone-top" /><Image src={project.mobileImage} alt={`Versão mobile do site ${project.title}`} width={390} height={844} sizes="(max-width: 800px) 65vw, 24vw" unoptimized /></div></div>
      </div></section>
      <section className="site-case-outcome"><div className="mh-shell">
        <article className="case-detail-story"><span>03 / A solução</span><h2>{story.solutionTitle}</h2><div><p>{story.solution}</p><p>{story.outcome}</p></div></article>
        <div className="site-case-credits"><div><span>Cliente</span><strong>{story.client}</strong></div><div><span>Créditos</span><strong>{story.credit}</strong></div><a href={project.website} target="_blank" rel="noreferrer">Conhecer o site completo ↗</a></div>
      </div></section>
      <CaseNavigation previous={previous} next={next} />
    </>;
  }
  const detail = details[project.slug];

  return <>
    <section className="site-case-banner" aria-labelledby="case-title"><Image className="site-case-banner-image" src={project.image} alt="" fill priority sizes="100vw" /><div className="site-case-banner-shade" /><div className="mh-shell site-case-banner-content"><Link className="case-detail-back" href="/cases">← Todos os cases</Link><div><span className="mh-eyebrow">Case · {project.category}</span><h1 id="case-title">{project.title}</h1><p>{project.intro}</p></div></div></section>
    <section className="case-detail-body"><div className="mh-shell">
      <div className="case-detail-meta"><div><span>Cliente</span><strong>{project.title}</strong></div><div><span>Área</span><strong>{project.category}</strong></div><div><span>Projeto</span><strong>{project.project}</strong></div></div>
      <article className="case-detail-story"><span>01 / O desafio</span><h2>Uma ideia com um propósito claro.</h2><p>{detail.challenge}</p></article>
      <div className="case-detail-images"><div><Image src={detail.images[0]} alt={`Detalhe do projeto ${project.title}`} fill sizes="(max-width: 700px) 100vw, 50vw" /></div><div><Image src={detail.images[1]} alt={`Aplicação do projeto ${project.title}`} fill sizes="(max-width: 700px) 100vw, 50vw" /></div></div>
      <article className="case-detail-story case-detail-story-end"><span>02 / A solução</span><h2>Estratégia que ganha forma.</h2><p>{detail.approach}</p></article>
    </div></section>
    <CaseNavigation previous={previous} next={next} />
  </>;
}
