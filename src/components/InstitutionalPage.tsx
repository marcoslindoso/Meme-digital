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
            <span className="mh-eyebrow">A Meme por dentro</span>
            <h1>Uma agência <em>humana</em> em tudo o que faz.</h1>
            <p>Juntos, somos um só. Simples, atentos, velozes e humanos. Unimos marketing digital, criação e tecnologia para aproximar pessoas, marcas e negócios.</p>
            <div className="ip-hero-actions"><a className="mh-button mh-button-primary" href="#o-time">Conheça os Memers <span>↗</span></a><a className="ip-text-link" href="#a-meme">Nossa história <span>↓</span></a></div>
            <div className="ip-hero-facts"><span><strong>Desde 2015</strong> criando no digital</span><span><strong>Sem fronteiras</strong> com equipes pelo Brasil</span></div>
          </div>
          <div className="ip-hero-visual mh-reveal"><div className="ip-hero-photo"><Image src="/wp-content/uploads/2024/05/IMG_6342.jpg" alt="Integrantes da equipe Meme Digital em um evento de tecnologia" fill priority sizes="(max-width: 900px) 100vw, 52vw" /></div><span className="ip-photo-note">Pessoas reais.<br /><strong>Ideias em movimento.</strong></span></div>
        </div>
      </section>

      <section className="ip-about ip-section" id="a-meme"><div className="mh-shell">
        <div className="ip-section-head mh-reveal"><span className="mh-eyebrow">A empresa</span><h2>Conectando <em>pessoas e lugares.</em></h2><p>Desde 2015, a Meme Digital combina uma abordagem abrangente de marketing e tecnologia com a proximidade de uma equipe que gosta de construir junto. Atendemos negócios em diferentes lugares, com a mesma atenção às pessoas por trás de cada projeto.</p></div>
        <div className="ip-principles">
          <article className="mh-reveal"><span className="ip-principle-mark" aria-hidden="true">◎</span><div><span className="mh-eyebrow">Conexões que importam</span><h3>Mais perto das pessoas.</h3><p>Valorizamos relações autênticas, histórias compartilhadas e experiências digitais que façam sentido para quem usa e para quem cria.</p></div></article>
          <article className="mh-reveal"><span className="ip-principle-mark" aria-hidden="true">✳</span><div><span className="mh-eyebrow">Numa boa & numa nice</span><h3>Criar junto move mais longe.</h3><p>O entusiasmo pelo trabalho em equipe se transforma em boas ideias, soluções claras e resultados que podemos celebrar com os clientes.</p></div></article>
        </div>
      </div></section>

      <section className="ip-awards ip-section" id="premios"><div className="mh-shell">
        <div className="ip-awards-layout"><div className="mh-reveal"><span className="mh-eyebrow">Prêmios & conquistas</span><h2>Reconhecimento que vem do <em>trabalho coletivo.</em></h2><p>Design, web e branding da Meme já receberam reconhecimento em festivais. Cada conquista representa uma equipe, um cliente e uma ideia levada até o fim.</p><div className="ip-award-years"><span>2018 <b>Branding</b></span><span>2019 <b>Web</b></span><span>2022 <b>Design</b></span></div></div><AwardsSlider /></div>
        <div className="ip-award-projects">{awardProjects.map((project) => <Link href={project.href} key={project.title}><small>{project.type}</small><strong>{project.title}</strong><span aria-hidden="true">↗</span></Link>)}</div>
      </div></section>

      <section className="ip-team ip-section" id="o-time"><div className="mh-shell">
        <header className="ip-team-head mh-reveal"><div><span className="mh-eyebrow">The MEMER&apos;s</span><h2>Conheça quem <em>faz acontecer.</em></h2></div><p>Designers, desenvolvedores, especialistas em mídia, marketing e criação. Diferentes talentos, trabalhando como um só time.</p></header>
        <TeamCarousel />
      </div></section>

      <InstitutionalShowcase />

      <section className="ip-careers ip-section" id="carreiras"><div className="mh-shell ip-careers-grid"><div className="mh-reveal"><span className="mh-eyebrow">Carreiras</span><h2>Seu próximo passo pode ser <em>com a gente.</em></h2></div><div className="mh-reveal"><p>Buscamos pessoas curiosas, proativas e apaixonadas pelo que fazem. Aqui, escritores, artistas, designers, desenvolvedores e especialistas em dados aprendem e crescem juntos.</p><a className="mh-button mh-button-light" href="mailto:contato@memedigital.com.br?subject=Quero%20ser%20um%20Memer" data-contact-trigger data-contact-topic="Carreiras">Quero ser um Memer <span>↗</span></a><Link className="ip-careers-culture" href="/cultura-meme/">Conheça a cultura da Meme <span>↗</span></Link></div></div></section>

      <section className="ip-contact ip-section" id="contato"><div className="mh-shell"><span className="mh-eyebrow">Vamos criar juntos?</span><h2>Boas relações começam com uma <em>boa conversa.</em></h2><Link className="mh-button mh-button-primary" href="/#contato">Fale com a Meme <span>↗</span></Link></div></section>
    </main>
    <ModernFooter />
    <ModernEffects />
  </div>;
}
