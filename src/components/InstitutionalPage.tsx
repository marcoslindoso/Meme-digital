import Image from "next/image";
import Link from "next/link";
import { AwardsSlider } from "@/components/AwardsSlider";
import { ModernEffects } from "@/components/ModernEffects";
import { ModernFooter } from "@/components/ModernFooter";
import { ModernHeader } from "@/components/ModernHeader";
import { InstitutionalShowcase } from "@/components/InstitutionalShowcase";
import { TeamCarousel } from "@/components/TeamCarousel";

const awardProjects = [
  { title: "Voluta Medical — Baralho", type: "Design · Saúde", href: "/baralho-voluta-medical/" },
  { title: "Neto Ensina — Website", type: "Tech & Web", href: "/neto-ensina/" },
  { title: "NUR Eventos — Branding", type: "Marca · Design", href: "/nur-eventos/" },
];

export function InstitutionalPage() {
  return <div className="modern-site ip-page">
    <ModernHeader />
    <main id="conteudo">
      <section className="ip-hero">
        <div className="mh-shell ip-hero-grid">
          <div className="ip-hero-copy mh-reveal">
            <span className="mh-eyebrow">The company · Agência humana</span>
            <h1>Juntos, somos <em>um só.</em></h1>
            <p>Simples, atentos, velozes e humanos. Com uma abordagem abrangente e diversificada para marketing digital e tecnologia, a Meme Digital é uma agência martech para empresas que buscam ampliar sua jornada digital e presença online. Desde 2015, atendemos clientes em diversos países, com equipes espalhadas pelo Brasil. Orgulhamo-nos da nossa cultura.</p>
            <div className="ip-hero-actions"><a className="mh-button mh-button-primary" href="#o-time">Conheça os Memers <span>↗</span></a><a className="ip-text-link" href="#a-meme">Nossa história <span>↓</span></a></div>
            <div className="ip-hero-facts"><span><strong>Desde 2015</strong> criando no digital</span><span><strong>Sem fronteiras</strong> com equipes pelo Brasil</span></div>
          </div>
          <div className="ip-hero-visual mh-reveal"><div className="ip-hero-photo"><Image src="/assets/equipe-evento.webp" alt="Integrantes da equipe Meme Digital em um evento de tecnologia" fill priority sizes="(max-width: 900px) 100vw, 52vw" /></div><span className="ip-photo-note">Pessoas reais.<br /><strong>Ideias em movimento.</strong></span></div>
        </div>
      </section>

      <section className="ip-about ip-section" id="a-meme"><div className="mh-shell">
        <div className="ip-section-head mh-reveal"><span className="mh-eyebrow">A empresa</span><h2>Conectando <em>pessoas e lugares.</em></h2><p>Essa ideia remete à criação de laços significativos entre indivíduos e comunidades, assim como à valorização dos espaços físicos que moldam nossas interações e experiências diárias. É sobre promover relações autênticas, compartilhar histórias e experiências enriquecedoras e criar um ambiente inclusivo e acolhedor onde todos se sintam parte de algo maior.</p></div>
        <div className="ip-principles">
          <article className="mh-reveal"><span className="ip-principle-mark" aria-hidden="true">◎</span><div><span className="mh-eyebrow">Conectando pessoas e lugares</span><h3>Relações autênticas.</h3><p>Promovemos relações autênticas, compartilhamos histórias e experiências enriquecedoras e criamos um ambiente inclusivo e acolhedor.</p></div></article>
          <article className="mh-reveal"><span className="ip-principle-mark" aria-hidden="true">✳</span><div><span className="mh-eyebrow">Numa boa & numa nice</span><h3>Criatividade e resultados.</h3><p>Nossa equipe se motiva ao trabalhar em conjunto, usando a criatividade para superar desafios e alcançar objetivos com entusiasmo e paixão pelo que faz.</p></div></article>
        </div>
      </div></section>

      <section className="ip-awards ip-section" id="premios"><div className="mh-shell">
        <div className="ip-awards-layout"><div className="mh-reveal"><span className="mh-eyebrow">Prêmios & conquistas</span><h2>Numa boa & <em>numa nice.</em></h2><p>A Meme Digital se orgulha ao testemunhar o sucesso dos clientes no cenário digital, com estratégias eficazes e resultados positivos. Os prêmios refletem nosso compromisso com qualidade, criatividade e resultados excepcionais.</p><div className="ip-award-years"><span>2018 <b>Branding</b></span><span>2019 <b>Web</b></span><span>2022 <b>Design</b></span></div></div><AwardsSlider /></div>
        <div className="ip-award-projects">{awardProjects.map((project) => <Link href={project.href} key={project.title}><small>{project.type}</small><strong>{project.title}</strong><span aria-hidden="true">↗</span></Link>)}</div>
      </div></section>

      <section className="ip-team ip-section" id="o-time"><div className="mh-shell">
        <header className="ip-team-head mh-reveal"><div><span className="mh-eyebrow">The MEMER&apos;s</span><h2>Conheça quem <em>faz acontecer.</em></h2></div><p>Designers, desenvolvedores, especialistas em mídia, marketing e criação. Diferentes talentos, trabalhando como um só time.</p></header>
        <TeamCarousel />
      </div></section>

      <InstitutionalShowcase />

      <section className="ip-careers ip-section" id="carreiras"><div className="mh-shell ip-careers-grid"><div className="mh-reveal"><span className="mh-eyebrow">Carreiras</span><h2>Se torne <em>um Memer.</em></h2></div><div className="mh-reveal"><p>Buscamos talentos que compartilhem desse amor pelo que fazem e estejam sempre dispostos a aprender e crescer. Nossa equipe é nossa família. Somos escritores, artistas, empreendedores, designers, desenvolvedores, publicitários, diretores, fotógrafos e entusiastas de dados, imersos na tecnologia e em constante evolução.</p><p>Oferecemos um sólido plano de carreira para pessoas proativas que se identificam com nossos projetos e desejam se dedicar à Meme.</p><div className="ip-careers-actions"><a className="mh-button mh-button-light" href="mailto:contato@memedigital.com.br?subject=Quero%20ser%20um%20Memer" data-contact-trigger data-contact-topic="Carreiras">Junte-se a nós <span>↗</span></a><Link className="ip-careers-culture" href="/cultura-meme/">Conheça a cultura da Meme <span>↗</span></Link></div></div></div></section>

    </main>
    <ModernFooter />
    <ModernEffects />
  </div>;
}
