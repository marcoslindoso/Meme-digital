"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const services = [
  { name: "Agência", detail: "Estratégia, SEO e growth", href: "/solucoes/agencia", icon: "agency" },
  { name: "Tech & Web", detail: "Sites, apps e e-commerce", href: "/solucoes/tech-web", icon: "web" },
  { name: "Design", detail: "Branding, UX e interfaces", href: "/solucoes/design", icon: "design" },
  { name: "Performance Ads", detail: "Mídia, dados e conversão", href: "/solucoes/performance-ads", icon: "performance" },
  { name: "Produtos Digitais", detail: "Lançamentos e infoprodutos", href: "/solucoes/produtos-digitais", icon: "products" },
  { name: "Metaverso", detail: "AR, VR e experiências", href: "/solucoes/metaverso", icon: "metaverse" },
];

function ServiceIcon({ icon }: { icon: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icon === "agency" && <><path d="M5 11v4M8 9v8M11 7l8-3v16l-8-3z" /><path d="M8 17l1 4h3l-1-4M21 9v6" /></>}
      {icon === "web" && <><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 8h18M8 21h8M12 18v3M8 12l-2 2 2 2M16 12l2 2-2 2" /></>}
      {icon === "design" && <><path d="M12 3l8 8-8 10-8-10 8-8zM4 11h16M9 11l3 10 3-10M9 11l3-8 3 8" /></>}
      {icon === "performance" && <><path d="M4 19h16M5 16l5-5 3 3 6-7M15 7h4v4" /><circle cx="5" cy="16" r="1" /></>}
      {icon === "products" && <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 7h6M9 11h6M9 15h4" /></>}
      {icon === "metaverse" && <><path d="M4 9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-3l-2-2h-2l-2 2H6a2 2 0 0 1-2-2V9z" /><path d="M8 11h.01M16 11h.01M4 10H2M22 10h-2" /></>}
    </svg>
  );
}

export function ModernHeader({ activeSolution }: { activeSolution?: string }) {
  const router = useRouter();
  const activeService = services.find((service) => service.href === `/solucoes/${activeSolution}`);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (servicesOpen || mobileOpen) services.forEach((service) => router.prefetch(service.href));
  }, [router, servicesOpen, mobileOpen]);

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
          <div className="mh-services-trigger">
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-controls="mh-services-menu"
              onClick={() => setServicesOpen((open) => !open)}
            >
              Soluções {activeService && <strong className="mh-nav-current">{activeService.name}</strong>} <svg className="mh-nav-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 3 5 5-5 5" /></svg>
            </button>
            <div id="mh-services-menu" className={`mh-mega-menu${servicesOpen ? " is-open" : ""}`}>
              <div className="mh-mega-intro">
                <div className="mh-mega-photo"><Image src="/wp-content/uploads/2024/03/happy-creative-marketing-team-working-on-new-busin-2023-11-27-05-18-14-utc-768x512.jpg" alt="Equipe trabalhando em estratégia e criação" fill sizes="280px" /></div>
              </div>
              <div className="mh-mega-grid">
                {services.map((service) => (
                  <Link href={service.href} key={service.name} onClick={closeMenus} aria-current={service === activeService ? "page" : undefined} className={service === activeService ? "is-current" : undefined}>
                    <span className="mh-mega-icon"><ServiceIcon icon={service.icon} /></span>
                    <div><strong>{service.name}</strong><small>{service.detail}</small></div>
                    {service === activeService ? <em className="mh-menu-current">Atual</em> : <i aria-hidden>↗</i>}
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
          <span className="mh-eyebrow">Soluções{activeService ? ` · ${activeService.name}` : ""}</span>
          {services.map((service) => (
            <Link href={service.href} key={service.name} onClick={closeMenus} aria-current={service === activeService ? "page" : undefined} className={service === activeService ? "is-current" : undefined}>
              <b className="mh-mobile-service-icon"><ServiceIcon icon={service.icon} /></b>{service.name}<span aria-hidden>↗</span>
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
