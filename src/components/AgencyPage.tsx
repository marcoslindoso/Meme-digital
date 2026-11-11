import Image from "next/image";
import { AwardsSlider } from "@/components/AwardsSlider";
import { LogoCarousel } from "@/components/LogoCarousel";
import { ModernEffects } from "@/components/ModernEffects";
import { ModernFooter } from "@/components/ModernFooter";
import { ModernHeader } from "@/components/ModernHeader";
import { InteractiveOfferings } from "@/components/InteractiveOfferings";
import { SolutionSwitcher } from "@/components/SolutionSwitcher";
import { getOfferingCopy } from "@/components/solution-copy";
import { SolutionCases } from "@/components/SolutionCases";

const logos = ["Background-2-2.jpg", "Background-3-2.jpg", "Background-4-2.jpg", "Background-5-2.jpg", "Background-6-2.jpg", "Background-7-2.jpg", "Background-8-2.jpg", "Background-9-2.jpg", "Background-10-2.jpg", "Background-11-2.jpg", "Background-12-2.jpg", "Background-13-2.jpg"];

const services = [
  { icon: "seo", title: "SEO", text: "Conteúdo e melhorias técnicas para ampliar a presença da sua marca nas buscas e atrair pessoas com interesse real no que você oferece.", tags: "Conteúdo · Busca orgânica · Técnica" },
  { icon: "performance", title: "Performance", text: "Campanhas e experiências digitais conectadas aos objetivos do negócio, com acompanhamento para transformar investimento em oportunidades.", tags: "Mídia · Conversão · Dados" },
  { icon: "growth", title: "Growth Hacking", text: "Experimentos e aprendizado contínuo para identificar oportunidades, melhorar jornadas e desenvolver novas possibilidades de crescimento.", tags: "Testes · Aprendizado · Crescimento" },
  { icon: "planning", title: "Digital Planning", text: "Planejamento que conecta objetivos, público, canais e ações em uma estratégia clara para cada etapa da jornada digital.", tags: "Estratégia · Canais · Jornada" },
  { icon: "copy", title: "Copywriter", text: "Textos e narrativas que traduzem a personalidade da marca, esclarecem sua proposta de valor e aproximam as pessoas do negócio.", tags: "Narrativa · Conteúdo · Mensagem" },
  { icon: "automation", title: "Automação de Marketing", text: "Jornadas automatizadas para organizar contatos, cultivar relacionamentos e apoiar o time comercial com informações relevantes.", tags: "CRM · Relacionamento · Automação" },
] as const;

const serviceImages = [
  "/assets/editorial/photo-1460925895917-afdab827c52f.webp",
  "/assets/editorial/photo-1551288049-bebda4e38f71.webp",
  "/assets/editorial/photo-1552664730-d307ca884978.webp",
  "/assets/editorial/photo-1454165804606-c3d57bc86b40.webp",
  "/assets/editorial/photo-1456324504439-367cee3b3c32.webp",
  "/assets/editorial/photo-1518770660439-4636190af475.webp",
];

const reviews = [
  { name: "Luiz Filipe", photo: "https://lh3.googleusercontent.com/a-/ALV-UjX1mYXw0d0fUdAmT3YZMPZasjLJ0sQoqFbi_1K5kOJoXUxNWR_MqQ=s120-c-rp-mo-ba3-br100", text: "Excelentes profissionais, extremamente competentes. Atendimento incrível. Recomendo." },
  { name: "Felipe Moraes", photo: "https://lh3.googleusercontent.com/a-/ALV-UjUHXrz4MhDW8pgaCO5XSNC6NyZ4RoRXShY3nSo6Ozs831R1os-Q=s120-c-rp-mo-br100", text: "Compromisso com e respeito com o cliente. Visão de mercado incrível." },
  { name: "Caroline Costa", photo: "https://lh3.googleusercontent.com/a-/ALV-UjXl89GVy4mvpfbFAtGsUzkAyQCQdhzASin5eMZPELxPlLjeYDVV=s120-c-rp-mo-br100", text: "Ótima prestação de serviço! Muito bem qualificados e dispostos a atender as demandas do cliente. Super indico!" },
];

export function AgencyPage() {
  return <div className="modern-site agency-page">
    <ModernHeader activeSolution="agencia" />
    <main id="conteudo">
      <section className="agency-hero"><div className="mh-shell agency-hero-grid">
        <div><span className="mh-eyebrow">Agência martech · estratégia & growth</span><h1>Ideias que encontram <em>seu próximo movimento.</em></h1><p>Negócios têm desafios únicos. Nossa equipe conecta estratégia, criatividade e tecnologia para desenhar experiências, testar caminhos e transformar boas ideias em oportunidades reais.</p><div className="agency-actions"><a className="mh-button mh-button-primary" href="#contato">Fale com um especialista <span>↗</span></a><a className="mh-button mh-button-quiet" href="#solucoes-agencia">Conheça as soluções <span>↓</span></a></div><div className="agency-hero-note"><span>✦</span> Estratégia, criação e tecnologia em movimento.</div></div>
        <div className="agency-hero-image"><div className="agency-hero-photo"><Image src="/agency/criacao-unsplash.jpg" alt="Profissionais em uma sessão de planejamento criativo" fill sizes="(max-width: 900px) 90vw, 48vw" priority /></div><div className="agency-photo-label"><span>✦</span><div><small>Ideias em movimento</small><strong>Estratégia + Criatividade</strong></div></div></div>
      </div></section>
      <section className="sp-brand-rail" aria-label="Marcas atendidas pela Meme"><LogoCarousel logos={logos} /></section>
      <section className="agency-intro mh-section"><div className="mh-shell"><div className="agency-intro-heading"><span className="mh-eyebrow">Nosso jeito de pensar</span><h2>Crescer começa com <em>perguntas melhores.</em></h2><p>O que sua marca precisa resolver agora? Onde estão as oportunidades para a próxima fase? Começamos pela conversa e conectamos as disciplinas certas para transformar respostas em ação.</p></div><div className="agency-feature"><div className="agency-feature-image"><Image src="/agency/colaboracao-unsplash.jpg" alt="Profissionais colaborando em projetos digitais" fill sizes="(max-width: 900px) 100vw, 50vw" /></div><div><span className="mh-eyebrow">Do insight à execução</span><h3>Um time, diferentes olhares, <em>um mesmo objetivo.</em></h3><p>Unimos visão de negócio com conteúdo, tecnologia e análise. O plano ganha forma em ações que podem ser acompanhadas, revistas e melhoradas junto com sua equipe.</p><ul><li><span>✦</span> Estratégia alinhada aos objetivos da empresa</li><li><span>◎</span> Dados e testes para orientar decisões</li><li><span>↗</span> Evolução contínua da experiência digital</li></ul><a className="mh-text-link" href="#contato">Vamos conversar <span>↗</span></a></div></div></div></section>
      <section id="solucoes-agencia" className="agency-services mh-section"><div className="mh-shell"><header><div><span className="mh-eyebrow">Agência · Soluções à disposição</span><h2>Uma estratégia, <em>várias possibilidades.</em></h2></div></header><SolutionSwitcher active="agencia" /><InteractiveOfferings solution="Agência" variant="agency" items={services.map((service, index) => ({ ...service, text: getOfferingCopy("agencia", service.title, service.text), image: serviceImages[index] }))} /></div></section>
      <section className="agency-process mh-section"><div className="mh-shell"><header><span className="mh-eyebrow">Como trabalhamos</span><h2>Crescimento é uma <em>construção conjunta.</em></h2></header><div className="agency-process-grid"><article><span>◉</span><h3>Entender</h3><p>Ouvimos sua equipe, conhecemos o negócio e identificamos os desafios e oportunidades da jornada.</p></article><article><span>◇</span><h3>Construir</h3><p>Definimos prioridades e conectamos estratégia, criação e tecnologia para colocar as ideias em prática.</p></article><article><span>↗</span><h3>Evoluir</h3><p>Acompanhamos as ações, compartilhamos aprendizados e ajustamos o caminho conforme os resultados.</p></article></div></div></section>
      <section className="agency-reviews mh-section"><div className="mh-shell"><header className="agency-section-head"><div><span className="mh-eyebrow">Quem recomenda</span><h2>Relações que deixam <em>boas histórias.</em></h2></div><p>Depoimentos publicados no Google</p></header><div className="agency-review-grid">{reviews.map((review) => <article className="mh-google-review" key={review.name}><header><Image className="mh-review-avatar" src={review.photo} alt={`Foto de ${review.name}`} width={42} height={42} /><div><strong>{review.name}</strong><small>Google</small></div><b className="mh-google-mark" aria-label="Google">G</b></header><div className="mh-review-stars" aria-label="5 estrelas">★★★★★</div><p>{review.text}</p></article>)}</div></div></section>
      <section className="mh-section mh-awards"><div className="mh-shell mh-awards-grid"><div className="mh-awards-copy"><span className="mh-eyebrow">Prêmios & conquistas</span><h2>Trabalho que gera resultado. <em>E reconhecimento.</em></h2><p>Projetos da Meme foram reconhecidos em design, web e branding nos principais festivais do interior paulista.</p><div className="mh-award-years"><div><strong>2018</strong><span>Branding · Bronze</span></div><div><strong>2019</strong><span>Web · Troféu</span></div><div><strong>2022</strong><span>Design · Ouro</span></div></div></div><AwardsSlider /></div></section>
      <SolutionCases />
      <section className="agency-contact" id="contato"><div className="mh-shell agency-contact-inner"><div><span className="mh-eyebrow">Bora conversar?</span><h2>Seu próximo passo começa com <em>uma boa conversa.</em></h2><p>Conte para a gente o que você quer construir. Vamos entender seu desafio e pensar juntos no caminho.</p></div><div><a className="mh-button mh-button-light" href="https://wa.me/5519997600063" target="_blank" rel="noreferrer">Conversar no WhatsApp <span>↗</span></a><a className="agency-contact-email" href="mailto:contato@memedigital.com.br">contato@memedigital.com.br</a></div></div></section>
    </main><ModernFooter /><ModernEffects />
  </div>;
}
