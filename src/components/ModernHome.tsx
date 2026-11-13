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
  { title: "Agência", text: "Desenvolvimento de estratégias digitais e otimização para transformar sua marca com marketing, tecnologia e performance.", href: "/solucoes/agencia/", tags: ["SEO", "Growth", "Planning"], icon: "✦", image: "/assets/editorial/photo-1552664730-d307ca884978.webp" },
  { title: "Tech & Web", text: "Martech e e-commerce: desenvolvimento tecnológico e web design para impulsionar sua jornada digital.", href: "/solucoes/tech-web/", tags: ["Web", "Apps", "E-commerce"], icon: "⌘", image: "/assets/services/techweb.webp" },
  { title: "Design", text: "Design criativo e soluções visuais impactantes para sua marca brilhar online.", href: "/solucoes/design/", tags: ["Branding", "UX/UI", "Creative"], icon: "◇", image: "/assets/services/design.webp" },
  { title: "Performance Ads", text: "Anúncios estratégicos para atrair leads qualificados, impulsionar vendas e maximizar sua visibilidade online.", href: "/solucoes/performance-ads/", tags: ["Google", "Meta", "Dados"], icon: "◉", image: "/assets/services/performance.webp" },
  { title: "Produtos Digitais", text: "E-books, cursos, mentorias e mais para monetizar sua expertise online.", href: "/solucoes/produtos-digitais/", tags: ["Lançamento", "Conteúdo", "Vendas"], icon: "↗", image: "/assets/services/produtosdigitais.webp" },
  { title: "Metaverso", text: "Realidades virtuais e aumentadas para experiências digitais únicas.", href: "/solucoes/metaverso/", tags: ["AR", "VR", "Games"], icon: "◎", image: "/assets/services/metaverso.webp" },
  { title: "IA e Engenharia de Harness", text: "Agentes de IA com contexto, ferramentas e validação para apoiar processos reais.", href: "/solucoes/ia-engenharia-de-harness/", tags: ["Agentes", "Automação", "Avaliação"], icon: "✳", image: "/assets/editorial/photo-1518770660439-4636190af475.webp" },
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
    <div className="modern-site mh-home">
      <ModernHeader />
      <main id="conteudo">
        <section className="mh-hero">
          <div className="mh-hero-glow" aria-hidden />
          <div className="mh-shell mh-hero-grid">
            <div className="mh-hero-copy">
              <div className="mh-kicker"><span /> Agência de Marketing Digital em Campinas e São Paulo</div>
              <h1>Conectando pessoas e <em>lugares</em> de forma eficiente.</h1>
              <p>Somos uma agência MARTECH de marketing digital e tecnologia dedicada a proporcionar boas experiências de usuário e impulsionar altas taxas de conversão no B2B e B2C. Conte conosco para transformar sua visão em resultados notáveis. Escolha a Meme Digital e alcance o extraordinário em cada projeto.</p>
              <div className="mh-hero-actions">
                <a className="mh-button mh-button-primary" href="#contato">Fale com um especialista <span>↗</span></a>
                <a className="mh-button mh-button-quiet" href="#solucoes">Explorar soluções <span>↓</span></a>
              </div>
              <div className="mh-hero-proof">
                <div><strong>+1000</strong><span>projetos realizados</span></div>
                <div><strong>Desde 2015</strong><span>criando no digital</span></div>
                <div><strong>7 frentes</strong><span>em um único time</span></div>
              </div>
            </div>

            <div className="mh-hero-visual" aria-label="Marketing e tecnologia feitos por pessoas">
              <div className="mh-hero-frame">
                <Image src="/logos/hero-agencia-sem-valores.webp" alt="Profissional de marketing e tecnologia" width={1200} height={1112} sizes="(max-width: 900px) 100vw, 45vw" priority />
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
              <div><span className="mh-eyebrow">O que fazemos</span><h2>Crie algo que inspire <em>as pessoas.</em></h2></div>
              <p>Desenvolvimento web, design criativo e estratégias de performance para o sucesso online. Juntos, construímos a transformação digital.</p>
            </header>
            <div className="mh-service-tabs" aria-label="Frentes de atuação">
              {services.map((service) => <span key={service.title}>{service.title}</span>)}
            </div>
            <div className="mh-service-grid">
              {services.map((service, index) => (
                <Link className="mh-service-card mh-reveal" style={{ "--delay": `${index * 70}ms` } as CSSProperties} href={service.href.replace(/\/$/, "")} key={service.title}>
                  <div className="mh-service-front">
                    <Image className="mh-service-image" src={service.image} alt={`Imagem de apoio para ${service.title}`} fill sizes="(max-width: 900px) 100vw, 33vw" loading="eager" fetchPriority="low" unoptimized />
                    <div className="mh-service-content">
                      <div className="mh-service-icon" aria-hidden>{service.icon}</div><i aria-hidden>↗</i>
                      <div><h3>{service.title}</h3><p>{service.text}</p></div>
                      <div className="mh-tag-row">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    </div>
                  </div>
                    <div className="mh-service-slide" aria-hidden="true">
                      <span className="mh-service-slide-icon">{service.icon}</span>
                      <span className="mh-service-slide-label">Soluções Meme Digital</span>
                      <strong>{service.title}</strong>
                      <p>{service.text}</p>
                      <span className="mh-service-slide-action">Conheça a solução <span>↗</span></span>
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
              <p>Transforme sua loja física em um poderoso e-commerce e eleve o seu negócio a patamares de faturamento extraordinários. Trabalhamos com VTEX, Tray, Nuvemshop, Linx, Wake, WooCommerce, Wapstore, MercadoShops e Shopify. Nossa expertise está em lojas virtuais eficazes e de qualidade, com performance, SEO, growth hacking, segurança na compra, UX/UI e design criativo.</p>
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
              <div className="mh-story-media"><Image src="/assets/editorial/photo-1516321318423-f06f85e504b3.webp" alt="Profissionais construindo uma experiência digital" fill sizes="(max-width: 900px) 100vw, 50vw" loading="eager" fetchPriority="low" unoptimized /><span>Estratégia, dados e criação</span></div>
              <div className="mh-story-copy"><span className="mh-eyebrow">Aplicativos e experiências</span><h2>Desenvolvimento de apps, gamificação e <em>realidade aumentada.</em></h2><p>A Meme se destaca por seus serviços de desenvolvimento de aplicativos para iOS e Android, incluindo ReactJS, NodeJS, Flutter Flow e Java. Desenvolvemos projetos personalizados, de alto impacto e pensados para cada cliente. Também oferecemos realidade aumentada, AR/VR e gamificação para criar experiências imersivas e atraentes.</p><Link className="mh-text-link" href="/solucoes/metaverso/">Saiba mais <span>↗</span></Link></div>
            </article>
            <article className="mh-story mh-story-reversed mh-reveal">
              <div className="mh-story-media"><Image src="/assets/editorial/photo-1531482615713-2afd69097998.webp" alt="Equipe trabalhando em uma campanha digital" fill sizes="(max-width: 900px) 100vw, 50vw" loading="eager" fetchPriority="low" unoptimized /><span>Performance que evolui</span></div>
              <div className="mh-story-copy"><span className="mh-eyebrow">Produtos Digitais</span><h2>Maximizamos o lançamento de <em>infoprodutos em grande escala.</em></h2><p>Oferecemos serviços para infoprodutores, afiliados e lançamentos de produtos digitais. Criamos páginas de vendas, jornadas de compra e estratégias para transformar conhecimento em novas oportunidades de negócio.</p><Link className="mh-text-link" href="/solucoes/produtos-digitais/">Saiba mais <span>↗</span></Link></div>
            </article>
          </div>
        </section>

        <section className="mh-section mh-awards">
          <div className="mh-shell mh-awards-grid">
            <div className="mh-awards-copy mh-reveal">
              <span className="mh-eyebrow">Prêmios & conquistas</span>
              <h2>Prêmios & <em>Conquistas.</em></h2>
              <p>Agência premiada com o Troféu Ouro na categoria Design no maior festival do interior paulista, no Prêmio Recall de 2022. <Link href="/baralho-voluta-medical/">Veja o projeto premiado.</Link></p>
              <p>Conquista de mais um troféu na categoria Web, também no maior festival do interior paulista, no Prêmio Recall de 2019. <Link href="/neto-ensina/">Veja o projeto premiado.</Link></p>
              <p>Reconhecimento com o Galo de Bronze na categoria Branding – Design no Mídia Festival App de 2018. <Link href="/nur-eventos/">Veja o projeto premiado.</Link></p>
              <div className="mh-award-years"><div><strong>2018</strong><span>Branding · Bronze</span></div><div><strong>2019</strong><span>Web · Troféu</span></div><div><strong>2022</strong><span>Design · Ouro</span></div></div>
            </div>
            <AwardsSlider />
          </div>
        </section>

        <ModernGallery />

        <section className="mh-section mh-testimonials">
          <div className="mh-shell">
            <header className="mh-testimonial-head mh-reveal"><div><span className="mh-eyebrow">Quem recomenda o marketing digital da Meme</span><h2>+ de 1000 <em>projetos.</em></h2><p>Depoimentos</p></div><div className="mh-rating"><strong>5.0</strong><span>★★★★★</span><small>com base em avaliações do Google</small></div></header>
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

      </main>
      <ModernFooter />
      <ModernEffects />
    </div>
  );
}
