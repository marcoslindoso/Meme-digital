import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ModernEffects } from "@/components/ModernEffects";
import { AwardsSlider } from "@/components/AwardsSlider";
import { LogoCarousel } from "@/components/LogoCarousel";
import { ModernFooter } from "@/components/ModernFooter";
import { ModernGallery } from "@/components/ModernGallery";
import { ModernHeader } from "@/components/ModernHeader";

const services = [
  { title: "Agência", text: "Estratégia digital, SEO, growth, conteúdo e automação para transformar atenção em demanda.", href: "/solucoes/agencia/", tags: ["SEO", "Growth", "Planning"], icon: "✦", image: "/wp-content/uploads/2024/03/agencia.png" },
  { title: "Tech & Web", text: "Sites, e-commerces e aplicativos rápidos, acessíveis e preparados para crescer com o negócio.", href: "/solucoes/tech-web/", tags: ["Web", "Apps", "E-commerce"], icon: "⌘", image: "/wp-content/uploads/2024/04/techweb.png" },
  { title: "Design", text: "Marcas, experiências e interfaces que aproximam pessoas e tornam cada interação memorável.", href: "/solucoes/design/", tags: ["Branding", "UX/UI", "Creative"], icon: "◇", image: "/wp-content/uploads/2024/04/design.png" },
  { title: "Performance Ads", text: "Mídia orientada por dados para atrair, converter e aprender continuamente com cada campanha.", href: "/solucoes/performance-ads/", tags: ["Google", "Meta", "Dados"], icon: "◉", image: "/wp-content/uploads/2024/04/performance.png" },
  { title: "Produtos Digitais", text: "Estratégia, criação e lançamento de infoprodutos com uma jornada de venda bem construída.", href: "/solucoes/produtos-digitais/", tags: ["Lançamento", "Conteúdo", "Vendas"], icon: "↗", image: "/wp-content/uploads/2024/04/produtosdigitais.png" },
  { title: "Metaverso", text: "Realidade aumentada, realidade virtual e gamificação para marcas que querem criar o inesperado.", href: "/solucoes/metaverso/", tags: ["AR", "VR", "Games"], icon: "◎", image: "/wp-content/uploads/2024/04/metaverso.png" },
];

const testimonials = [
  { name: "Luiz Filipe", age: "5 anos atrás", photo: "https://lh3.googleusercontent.com/a-/ALV-UjX1mYXw0d0fUdAmT3YZMPZasjLJ0sQoqFbi_1K5kOJoXUxNWR_MqQ=s120-c-rp-mo-ba3-br100", text: "Excelentes profissionais, extremamente competentes. Atendimento incrível. Recomendo." },
  { name: "Felipe Moraes", age: "7 anos atrás", photo: "https://lh3.googleusercontent.com/a-/ALV-UjUHXrz4MhDW8pgaCO5XSNC6NyZ4RoRXShY3nSo6Ozs831R1os-Q=s120-c-rp-mo-br100", text: "Compromisso com e respeito com o cliente. Visão de mercado incrível." },
  { name: "Raifran Índio", age: "7 anos atrás", photo: "https://lh3.googleusercontent.com/a-/ALV-UjUCGCnXGrujLsqjuNU7x39tsajwv0MVgpZ2PbFh1EdLlykXQpgu=s120-c-rp-mo-br100", text: "A empresa Meme Digital é séria e comprometida com seus clientes. Tive o privilégio de conhecer uma equipe super profissional." },
  { name: "Caroline Costa", age: "7 anos atrás", photo: "https://lh3.googleusercontent.com/a-/ALV-UjXl89GVy4mvpfbFAtGsUzkAyQCQdhzASin5eMZPELxPlLjeYDVV=s120-c-rp-mo-br100", text: "Ótima prestação de serviço! Muito bem qualificados e dispostos a atender as demandas do cliente. Super indico!" },
];

const clientLogos = [
  "Background-2-2.jpg", "Background-3-2.jpg", "Background-4-2.jpg", "Background-5-2.jpg", "Background-6-2.jpg", "Background-7-2.jpg", "Background-8-2.jpg", "Background-9-2.jpg", "Background-10-2.jpg", "Background-11-2.jpg", "Background-12-2.jpg", "Background-13-2.jpg", "Background-14-2.jpg", "Background-15-2.jpg", "Background-16-2.jpg", "Background-17-2.jpg", "Background-18-2.jpg", "Background-19-1.jpg", "Background-20-1.jpg", "Background-21-1.jpg", "Background-22-1.jpg", "Background-23-1.jpg", "Background-24-1.jpg", "Background-25-1.jpg", "Background-26-1.jpg", "Background-27-1.jpg", "Background-28-1.jpg",
];

const insights = [
  { tag: "Tecnologia", title: "Falha de segurança no PHP: o que muda para empresas e sites", href: "/falha-de-seguranca-no-php-2026/", image: "/wp-content/uploads/2026/10/falha-de-seguranca-no-php-20026.png" },
  { tag: "Mídia & IA", title: "GPT Ads: como a publicidade no ChatGPT entra na estratégia", href: "/gpt-ads-o-que-e-como-funciona-e-por-que-sua-empresa-deve-anunciar-no-chatgpt-em-2026/", image: "/wp-content/uploads/2026/09/GPT-Ads-O-que-e-como-funciona-e-por-que-sua-empresa-deve-anunciar-no-ChatGPT-em-2026.webp" },
  { tag: "Conversão", title: "Landing pages de alta conversão não dependem de sorte", href: "/criacao-de-landing-pages-alta-conversao/", image: "/wp-content/uploads/2026/08/criacao-landing-pages-caminho-conversao-scaled.jpg" },
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
              <div className="mh-kicker"><span /> Agência de Marketing Digital em Campinas e São Paulo</div>
              <h1>Conectando pessoas e <em>lugares</em> de forma eficiente.</h1>
              <p>Somos uma agência MARTECH de marketing digital e tecnologia dedicada a proporcionar boas experiências de usuário e impulsionar altas taxas de conversão no B2B e B2C.</p>
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
                <Image src="/wp-content/uploads/2024/03/agencia.png" alt="Profissional de marketing e tecnologia" width={998} height={923} priority />
              </div>
              <div className="mh-float-card mh-float-card-top"><span className="mh-live-dot" /> Estratégia em movimento</div>
              <div className="mh-float-card mh-float-card-bottom"><small>Uma equipe, ponta a ponta</small><strong>Marketing + Tech</strong></div>
              <div className="mh-orbit mh-orbit-one" aria-hidden /><div className="mh-orbit mh-orbit-two" aria-hidden />
            </div>
          </div>
        </section>

        <section className="mh-client-strip" aria-label="Algumas marcas atendidas">
          <div className="mh-shell mh-client-heading"><span>Marcas que já caminharam com a Meme</span></div>
          <LogoCarousel logos={clientLogos} />
        </section>

        <section className="mh-section mh-services" id="solucoes">
          <div className="mh-shell">
            <header className="mh-section-head mh-reveal">
              <div><span className="mh-eyebrow">O que fazemos</span><h2>Um ecossistema para<br /><em>fazer acontecer.</em></h2></div>
              <p>Do primeiro insight à última linha de código, reunimos disciplinas que trabalham juntas — sem silos, sem ruído e com intenção.</p>
            </header>
            <div className="mh-service-tabs" aria-label="Frentes de atuação">
              {services.map((service) => <span key={service.title}>{service.title}</span>)}
            </div>
            <div className="mh-service-grid">
              {services.map((service, index) => (
                <Link className="mh-service-card mh-reveal" style={{ "--delay": `${index * 70}ms` } as CSSProperties} href={service.href} key={service.title}>
                    <Image className="mh-service-image" src={service.image} alt={`Imagem de apoio para ${service.title}`} fill sizes="(max-width: 900px) 100vw, 33vw" />
                    <div className="mh-service-content">
                      <div className="mh-service-icon" aria-hidden>{service.icon}</div><i aria-hidden>↗</i>
                      <div><h3>{service.title}</h3><p>{service.text}</p></div>
                      <div className="mh-tag-row">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mh-section mh-martech-section">
          <div className="mh-shell mh-feature-grid">
            <div className="mh-feature-media mh-reveal">
              <div className="mh-feature-gradient" aria-hidden />
              <Image src="/wp-content/uploads/2024/04/woman-shopping-online-inserting-credit-card-number-2023-11-27-05-04-13-utc-2048x1365.jpg" alt="Compra online em uma experiência de e-commerce" width={2048} height={1365} />
              <div className="mh-feature-chip"><span>●</span> E-commerce, tecnologia e performance</div>
            </div>
            <div className="mh-feature-copy mh-reveal">
              <span className="mh-eyebrow">Estratégia de e-commerce</span>
              <h2>Venda no e-commerce e alcance <em>ganhos escaláveis.</em></h2>
              <p>Transforme sua loja online em uma potência de e-commerce e leve sua operação para um novo nível de resultados, conversão e recorrência.</p>
              <ul>
                <li><span className="mh-feature-icon" aria-hidden>↗</span><div><strong>Comércio de alto desempenho</strong><small>UX, tecnologia e estratégia que aproximam a marca de quem compra.</small></div></li>
                <li><span className="mh-feature-icon" aria-hidden>◎</span><div><strong>Dados que orientam decisões</strong><small>SEO, mídia e comportamento do usuário trabalhando juntos.</small></div></li>
                <li><span className="mh-feature-icon" aria-hidden>✦</span><div><strong>Evolução contínua</strong><small>Publicamos, medimos e aprimoramos a experiência com clareza.</small></div></li>
              </ul>
              <Link className="mh-text-link" href="/institucional/">Conheça a Meme <span>↗</span></Link>
            </div>
          </div>
        </section>

        <section className="mh-section mh-work mh-stories">
          <div className="mh-shell">
            <article className="mh-story mh-reveal">
              <div className="mh-story-media"><Image src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1300&q=85" alt="Profissionais construindo uma experiência digital" fill sizes="(max-width: 900px) 100vw, 50vw" /><span>Estratégia, dados e criação</span></div>
              <div className="mh-story-copy"><span className="mh-eyebrow">Tecnologia com propósito</span><h2>Produtos digitais que transformam <em>boas ideias em ação.</em></h2><p>Unimos pesquisa, design e desenvolvimento para criar jornadas simples de usar e preparadas para escalar.</p><Link className="mh-text-link" href="/solucoes/tech-web/">Conheça Tech & Web <span>↗</span></Link></div>
            </article>
            <article className="mh-story mh-story-reversed mh-reveal">
              <div className="mh-story-media"><Image src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1300&q=85" alt="Equipe trabalhando em uma campanha digital" fill sizes="(max-width: 900px) 100vw, 50vw" /><span>Performance que evolui</span></div>
              <div className="mh-story-copy"><span className="mh-eyebrow">Crescimento contínuo</span><h2>Campanhas que aprendem, otimizam e <em>movem negócios.</em></h2><p>Com dados claros e criatividade aplicada, aproximamos marcas das pessoas certas em cada etapa da decisão.</p><Link className="mh-text-link" href="/solucoes/performance-ads/">Explorar Performance Ads <span>↗</span></Link></div>
            </article>
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
            <AwardsSlider />
          </div>
        </section>

        <ModernGallery />

        <section className="mh-section mh-testimonials">
          <div className="mh-shell">
            <header className="mh-testimonial-head mh-reveal"><div><span className="mh-eyebrow">Quem recomenda</span><h2>Boas relações deixam <em>boas histórias.</em></h2></div><div className="mh-rating"><strong>5.0</strong><span>★★★★★</span><small>com base em avaliações do Google</small></div></header>
            <div className="mh-testimonial-grid">
              {testimonials.map((testimonial, index) => (
                <article className="mh-google-review mh-reveal" style={{ "--delay": `${index * 80}ms` } as CSSProperties} key={testimonial.name}>
                  <header><Image className="mh-review-avatar" src={testimonial.photo} alt={`Foto de ${testimonial.name}`} width={42} height={42} /><div><strong>{testimonial.name}</strong><small>{testimonial.age} · Google</small></div><b className="mh-google-mark" aria-label="Google">G</b></header>
                  <div className="mh-review-stars" aria-label="5 estrelas">★★★★★</div><p>{testimonial.text}</p>
                </article>
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
                  <div className={`mh-insight-art art-${index + 1}`}><Image src={insight.image} alt="" fill sizes="(max-width: 900px) 100vw, 33vw" /></div>
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
