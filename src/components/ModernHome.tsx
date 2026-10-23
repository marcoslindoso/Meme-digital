import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ModernEffects } from "@/components/ModernEffects";
import { ModernFooter } from "@/components/ModernFooter";
import { ModernHeader } from "@/components/ModernHeader";

const services = [
  { number: "01", title: "Agência", text: "Estratégia digital, SEO, growth, conteúdo e automação para transformar atenção em demanda.", href: "/solucoes/agencia/", tags: ["SEO", "Growth", "Planning"] },
  { number: "02", title: "Tech & Web", text: "Sites, e-commerces e aplicativos rápidos, acessíveis e preparados para crescer com o negócio.", href: "/solucoes/tech-web/", tags: ["Web", "Apps", "E-commerce"] },
  { number: "03", title: "Design", text: "Marcas, experiências e interfaces que aproximam pessoas e tornam cada interação memorável.", href: "/solucoes/design/", tags: ["Branding", "UX/UI", "Creative"] },
  { number: "04", title: "Performance Ads", text: "Mídia orientada por dados para atrair, converter e aprender continuamente com cada campanha.", href: "/solucoes/performance-ads/", tags: ["Google", "Meta", "Dados"] },
  { number: "05", title: "Produtos Digitais", text: "Estratégia, criação e lançamento de infoprodutos com uma jornada de venda bem construída.", href: "/solucoes/produtos-digitais/", tags: ["Lançamento", "Conteúdo", "Vendas"] },
  { number: "06", title: "Experiências", text: "Realidade aumentada, realidade virtual e gamificação para marcas que querem criar o inesperado.", href: "/solucoes/metaverso/", tags: ["AR", "VR", "Games"] },
];

const testimonials = [
  { initials: "LF", name: "Luiz Filipe", text: "Excelentes profissionais, extremamente competentes. Atendimento incrível. Recomendo." },
  { initials: "FM", name: "Felipe Moraes", text: "Compromisso e respeito com o cliente. Visão de mercado incrível." },
  { initials: "RI", name: "Raifran Índio", text: "A Meme Digital é séria e comprometida com seus clientes. Uma equipe super profissional." },
];

const insights = [
  { tag: "Tecnologia", title: "Falha de segurança no PHP: o que muda para empresas e sites", href: "/falha-de-seguranca-no-php-2026/" },
  { tag: "Mídia & IA", title: "GPT Ads: como a publicidade no ChatGPT entra na estratégia", href: "/gpt-ads-o-que-e-como-funciona-e-por-que-sua-empresa-deve-anunciar-no-chatgpt-em-2026/" },
  { tag: "Conversão", title: "Landing pages de alta conversão não dependem de sorte", href: "/criacao-de-landing-pages-alta-conversao/" },
];

export function ModernHome() {
  return (
    <div className="modern-site">
      <ModernHeader />
      <main id="conteudo">
        <section className="mh-hero">
          <div className="mh-hero-glow" aria-hidden />
          <div className="mh-shell mh-hero-grid">
            <div className="mh-hero-copy">
              <div className="mh-kicker"><span /> Agência Martech · Campinas + São Paulo</div>
              <h1>Marketing que <em>move.</em><br />Tecnologia que <em>escala.</em></h1>
              <p>Estratégia, design e desenvolvimento conectados para criar experiências digitais que aproximam marcas, pessoas e resultados.</p>
              <div className="mh-hero-actions">
                <a className="mh-button mh-button-primary" href="#contato">Fale com um especialista <span>↗</span></a>
                <a className="mh-button mh-button-quiet" href="#solucoes">Explorar soluções <span>↓</span></a>
              </div>
              <div className="mh-hero-proof">
                <div><strong>+1000</strong><span>projetos realizados</span></div>
                <div><strong>Desde 2015</strong><span>criando no digital</span></div>
                <div><strong>6 frentes</strong><span>em um único time</span></div>
              </div>
            </div>

            <div className="mh-hero-visual" aria-label="Marketing e tecnologia feitos por pessoas">
              <div className="mh-hero-frame">
                <Image src="/assets/hero.webp" alt="Pessoa em um ambiente visual contemporâneo" width={1016} height={859} priority />
              </div>
              <div className="mh-float-card mh-float-card-top"><span className="mh-live-dot" /> Estratégia em movimento</div>
              <div className="mh-float-card mh-float-card-bottom"><small>Uma equipe, ponta a ponta</small><strong>Marketing + Tech</strong></div>
              <div className="mh-orbit mh-orbit-one" aria-hidden /><div className="mh-orbit mh-orbit-two" aria-hidden />
            </div>
          </div>
        </section>

        <section className="mh-client-strip" aria-label="Algumas marcas atendidas">
          <div className="mh-shell mh-client-row">
            <span>Marcas que já caminharam com a Meme</span>
            <div className="mh-client-list"><b>ECOVIS</b><b>ÓTICAS IPANEMA</b><b>MEDALI</b><b>VOLUTA</b><b>NORTEL</b><b>BRONTË</b></div>
          </div>
        </section>

        <section className="mh-section mh-services" id="solucoes">
          <div className="mh-shell">
            <header className="mh-section-head mh-reveal">
              <div><span className="mh-eyebrow">O que fazemos</span><h2>Um ecossistema para<br /><em>fazer acontecer.</em></h2></div>
              <p>Do primeiro insight à última linha de código, reunimos disciplinas que trabalham juntas — sem silos, sem ruído e com intenção.</p>
            </header>
            <div className="mh-service-grid">
              {services.map((service, index) => (
                <Link className="mh-service-card mh-reveal" style={{ "--delay": `${index * 70}ms` } as CSSProperties} href={service.href} key={service.title}>
                  <div className="mh-service-top"><span>{service.number}</span><i aria-hidden>↗</i></div>
                  <h3>{service.title}</h3><p>{service.text}</p>
                  <div className="mh-tag-row">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mh-section mh-martech-section">
          <div className="mh-shell mh-feature-grid">
            <div className="mh-feature-media mh-reveal">
              <div className="mh-feature-gradient" aria-hidden />
              <Image src="/assets/technology.png" alt="Projeto de comércio digital exibido em um computador" width={828} height={757} />
              <div className="mh-feature-chip"><span>●</span> Produto, conteúdo e performance conectados</div>
            </div>
            <div className="mh-feature-copy mh-reveal">
              <span className="mh-eyebrow">Martech de verdade</span>
              <h2>Estratégia encontra execução. <em>E não se perde no caminho.</em></h2>
              <p>Negócios digitais crescem quando marca, mídia, produto e tecnologia falam a mesma língua. É por isso que nosso trabalho começa no contexto e termina em uma experiência que funciona.</p>
              <ul>
                <li><span>01</span><div><strong>Diagnóstico antes da ferramenta</strong><small>Entendemos o desafio, a jornada e o dado que realmente importa.</small></div></li>
                <li><span>02</span><div><strong>Times multidisciplinares</strong><small>Estratégia, criação e desenvolvimento trabalhando lado a lado.</small></div></li>
                <li><span>03</span><div><strong>Evolução contínua</strong><small>Publicamos, medimos e melhoramos com clareza e velocidade.</small></div></li>
              </ul>
              <Link className="mh-text-link" href="/institucional/">Conheça a Meme <span>↗</span></Link>
            </div>
          </div>
        </section>

        <section className="mh-section mh-work">
          <div className="mh-shell">
            <header className="mh-section-head mh-reveal">
              <div><span className="mh-eyebrow">Ideias em prática</span><h2>Digital bonito.<br /><em>Negócio bem resolvido.</em></h2></div>
              <p>Cada entrega nasce de uma pergunta real e ganha forma com estratégia, tecnologia e uma dose saudável de inquietação.</p>
            </header>
            <div className="mh-work-grid">
              <article className="mh-work-card mh-work-card-wide mh-reveal">
                <div className="mh-work-image"><Image src="/assets/ecommerce.webp" alt="Experiência de e-commerce" fill sizes="(max-width: 800px) 100vw, 65vw" /></div>
                <div className="mh-work-copy"><span>E-commerce · UX · Performance</span><h3>Lojas digitais pensadas para transformar navegação em compra.</h3></div>
              </article>
              <article className="mh-work-card mh-reveal">
                <div className="mh-work-image"><Image src="/assets/digital-products.webp" alt="Produtos digitais e conteúdo" fill sizes="(max-width: 800px) 100vw, 35vw" /></div>
                <div className="mh-work-copy"><span>Conteúdo · Lançamento</span><h3>Produtos que encontram sua audiência.</h3></div>
              </article>
            </div>
            <div className="mh-center-action mh-reveal"><Link className="mh-button mh-button-dark" href="/cases/">Conheça nossos cases <span>↗</span></Link></div>
          </div>
        </section>

        <section className="mh-section mh-awards">
          <div className="mh-shell mh-awards-grid">
            <div className="mh-awards-copy mh-reveal">
              <span className="mh-eyebrow">Prêmios & conquistas</span>
              <h2>Trabalho que gera resultado. <em>E reconhecimento.</em></h2>
              <p>Projetos da Meme foram reconhecidos em design, web e branding nos principais festivais do interior paulista.</p>
              <div className="mh-award-years"><div><strong>2018</strong><span>Branding · Bronze</span></div><div><strong>2019</strong><span>Web · Troféu</span></div><div><strong>2022</strong><span>Design · Ouro</span></div></div>
            </div>
            <div className="mh-awards-photo mh-reveal"><Image src="/assets/awards/2022-premios-home.webp" alt="Equipe Meme Digital recebendo o Prêmio Recall 2022" width={1600} height={1066} /><span>Prêmio Recall · 2022</span></div>
          </div>
        </section>

        <section className="mh-section mh-testimonials">
          <div className="mh-shell">
            <header className="mh-testimonial-head mh-reveal"><div><span className="mh-eyebrow">Quem recomenda</span><h2>Boas relações deixam <em>boas histórias.</em></h2></div><div className="mh-rating"><strong>5.0</strong><span>★★★★★</span><small>com base em avaliações do Google</small></div></header>
            <div className="mh-testimonial-grid">
              {testimonials.map((testimonial, index) => (
                <blockquote className="mh-quote mh-reveal" style={{ "--delay": `${index * 80}ms` } as CSSProperties} key={testimonial.name}>
                  <div className="mh-quote-mark">“</div><p>{testimonial.text}</p><footer><span>{testimonial.initials}</span><div><strong>{testimonial.name}</strong><small>Avaliação no Google</small></div></footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="mh-section mh-insights">
          <div className="mh-shell">
            <header className="mh-section-head mh-reveal"><div><span className="mh-eyebrow">Insights</span><h2>Ideias para o<br /><em>próximo movimento.</em></h2></div><Link className="mh-text-link" href="/insights/">Ver todos os artigos <span>↗</span></Link></header>
            <div className="mh-insight-grid">
              {insights.map((insight, index) => (
                <Link className="mh-insight-card mh-reveal" style={{ "--delay": `${index * 70}ms` } as CSSProperties} href={insight.href} key={insight.title}>
                  <div className={`mh-insight-art art-${index + 1}`}><span>{String(index + 1).padStart(2, "0")}</span></div>
                  <small>{insight.tag}</small><h3>{insight.title}</h3><span className="mh-read-more">Ler artigo <b>↗</b></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mh-contact" id="contato">
          <div className="mh-contact-orb" aria-hidden />
          <div className="mh-shell mh-contact-grid">
            <div className="mh-reveal"><span className="mh-eyebrow">Bora crescer?</span><h2>Seu próximo grande projeto pode começar com uma <em>boa conversa.</em></h2></div>
            <div className="mh-contact-actions mh-reveal">
              <a className="mh-button mh-button-light" href="https://wa.me/5519997600063" target="_blank" rel="noreferrer">Conversar no WhatsApp <span>↗</span></a>
              <a href="mailto:contato@memedigital.com.br">contato@memedigital.com.br</a>
              <small>R. Luiz Otávio, 2565 · Parque Taquaral · Campinas/SP</small>
            </div>
          </div>
        </section>
      </main>
      <ModernFooter />
      <ModernEffects />
    </div>
  );
}
