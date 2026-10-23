"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const services = [
  { name: "Agência", detail: "Estratégia, SEO e growth", href: "/solucoes/agencia/", mark: "01" },
  { name: "Tech & Web", detail: "Sites, apps e e-commerce", href: "/solucoes/tech-web/", mark: "02" },
  { name: "Design", detail: "Branding, UX e interfaces", href: "/solucoes/design/", mark: "03" },
  { name: "Performance Ads", detail: "Mídia, dados e conversão", href: "/solucoes/performance-ads/", mark: "04" },
  { name: "Produtos Digitais", detail: "Lançamentos e infoprodutos", href: "/solucoes/produtos-digitais/", mark: "05" },
  { name: "Metaverso", detail: "AR, VR e experiências", href: "/solucoes/metaverso/", mark: "06" },
];

export function ModernHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setServicesOpen(false);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const closeMenus = () => {
    setMobileOpen(false);
    setServicesOpen(false);
  };

  return (
    <header className={`mh-header${scrolled ? " is-scrolled" : ""}`}>
      <a className="mh-skip" href="#conteudo">Ir para o conteúdo</a>
      <div className="mh-header-inner">
        <Link href="/" className="mh-logo" aria-label="Meme Digital — página inicial" onClick={closeMenus}>
          <Image
            src="/wp-content/uploads/2024/07/logotipo-completo-1-2.png"
            alt="Meme Digital"
            width={164}
            height={50}
            priority
          />
        </Link>

        <nav className="mh-desktop-nav" aria-label="Navegação principal">
          <div
            className="mh-services-trigger"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-controls="mh-services-menu"
              onClick={() => setServicesOpen((open) => !open)}
            >
              Soluções <span aria-hidden>⌄</span>
            </button>
            <div id="mh-services-menu" className={`mh-mega-menu${servicesOpen ? " is-open" : ""}`}>
              <div className="mh-mega-intro">
                <span className="mh-eyebrow">Ecossistema Meme</span>
                <strong>Estratégia, criação e tecnologia em um só time.</strong>
                <Link href="/#solucoes" onClick={closeMenus}>Ver todas as soluções <span>↗</span></Link>
              </div>
              <div className="mh-mega-grid">
                {services.map((service) => (
                  <Link href={service.href} key={service.name} onClick={closeMenus}>
                    <span>{service.mark}</span>
                    <div><strong>{service.name}</strong><small>{service.detail}</small></div>
                    <i aria-hidden>↗</i>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link href="/cases/">Cases</Link>
          <Link href="/insights/">Insights</Link>
          <Link href="/institucional/">Institucional</Link>
        </nav>

        <Link className="mh-header-cta" href="/#contato" onClick={closeMenus}>Vamos conversar <span aria-hidden>↗</span></Link>
        <button
          className={`mh-menu-toggle${mobileOpen ? " is-open" : ""}`}
          type="button"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span /><span />
        </button>
      </div>

      <div className={`mh-mobile-panel${mobileOpen ? " is-open" : ""}`}>
        <nav aria-label="Navegação móvel">
          <span className="mh-eyebrow">Soluções</span>
          {services.map((service) => (
            <Link href={service.href} key={service.name} onClick={closeMenus}>
              <b>{service.mark}</b>{service.name}<span aria-hidden>↗</span>
            </Link>
          ))}
          <div className="mh-mobile-main-links">
            <Link href="/cases/" onClick={closeMenus}>Cases</Link>
            <Link href="/insights/" onClick={closeMenus}>Insights</Link>
            <Link href="/institucional/" onClick={closeMenus}>Institucional</Link>
          </div>
          <Link className="mh-button mh-button-primary" href="/#contato" onClick={closeMenus}>Fale com a Meme</Link>
        </nav>
      </div>
    </header>
  );
}
