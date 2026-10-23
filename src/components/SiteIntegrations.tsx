"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

declare global {
  interface Window {
    neuroleadId?: string;
  }
}

const reviews = [
  {
    name: "Luiz Filipe",
    age: "5 anos atrás",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjX1mYXw0d0fUdAmT3YZMPZasjLJ0sQoqFbi_1K5kOJoXUxNWR_MqQ=s120-c-rp-mo-ba3-br100",
    text: "Excelentes profissionais, extremamente competentes. Atendimento incrível. Recomendo.",
  },
  {
    name: "Felipe Moraes",
    age: "7 anos atrás",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjUHXrz4MhDW8pgaCO5XSNC6NyZ4RoRXShY3nSo6Ozs831R1os-Q=s120-c-rp-mo-br100",
    text: "Compromisso com e respeito com o cliente. Visão de mercado incrível.",
  },
  {
    name: "Raifran Índio",
    age: "7 anos atrás",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjUCGCnXGrujLsqjuNU7x39tsajwv0MVgpZ2PbFh1EdLlykXQpgu=s120-c-rp-mo-br100",
    text: "A empresa Meme Digital é séria e comprometida com seus clientes. Tive o privilégio de conhecer uma equipe super profissional.",
  },
  {
    name: "Caroline Costa",
    age: "7 anos atrás",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjXl89GVy4mvpfbFAtGsUzkAyQCQdhzASin5eMZPELxPlLjeYDVV=s120-c-rp-mo-br100",
    text: "Ótima prestação de serviço! Muito bem qualificados e dispostos a atender as demandas do cliente. Super indico!",
  },
];

const mobileServices = [
  ["Agência", "/solucoes/agencia/"],
  ["Tech & Web", "/solucoes/agencia-2/"],
  ["Design", "/solucoes/design/"],
  ["Performance Ads", "/solucoes/performance-ads/"],
  ["Produtos Digitais", "/solucoes/produtos-digitais/"],
  ["Metaverso", "/solucoes/metaverso/"],
];

function GoogleMark() {
  return <span className="next-google-mark" aria-label="Google">G</span>;
}

function Testimonials() {
  const rail = useRef<HTMLDivElement>(null);
  const move = (direction: number) => {
    const container = rail.current;
    const firstCard = container?.querySelector<HTMLElement>(".next-review-card");
    if (!container || !firstCard) return;

    const gap = Number.parseFloat(window.getComputedStyle(container).columnGap) || 0;
    container.scrollBy({ left: direction * (firstCard.offsetWidth + gap), behavior: "smooth" });
  };

  return (
    <section className="next-testimonials" aria-label="Depoimentos de clientes">
      <div className="next-reviews-summary">
        <strong>EXCELENTE</strong>
        <div className="next-review-stars" aria-label="5 de 5 estrelas">★★★★★</div>
        <span>Com base em <b>40 avaliações</b></span>
        <div className="next-google-logo" aria-label="Google">
          <span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span>
        </div>
      </div>
      <div className="next-reviews-area">
        <div className="next-reviews-rail" ref={rail}>
          {reviews.map((review) => (
            <article className="next-review-card" key={review.name}>
              <header>
                {/* External Google profile photos are the original public review assets. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={review.photo} alt={`Foto de ${review.name}`} />
                <div><strong>{review.name}</strong><span>{review.age}</span></div>
                <GoogleMark />
              </header>
              <div className="next-review-stars next-review-stars-small">★★★★★ <i>✓</i></div>
              <p>{review.text}</p>
            </article>
          ))}
        </div>
        <button className="next-review-arrow next-review-prev" onClick={() => move(-1)} aria-label="Avaliação anterior">‹</button>
        <button className="next-review-arrow next-review-next" onClick={() => move(1)} aria-label="Próxima avaliação">›</button>
      </div>
    </section>
  );
}

function MobileNavigation({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div className={`next-mobile-nav${open ? " is-open" : ""}`} aria-hidden={!open}>
      <button className="next-mobile-nav-backdrop" type="button" aria-label="Fechar menu" onClick={onClose} />
      <div className="next-mobile-nav-panel" role="dialog" aria-modal="true" aria-label="Menu de navegação">
        <header>
          {/* This is the original local brand asset from the WordPress snapshot. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Link href="/" aria-label="Meme Digital — página inicial" onClick={onClose}><img src="/wp-content/uploads/2024/07/logotipo-completo-1-2.png" alt="Meme Digital" /></Link>
          <button type="button" onClick={onClose} aria-label="Fechar menu"><span /><span /></button>
        </header>
        <nav aria-label="Navegação móvel">
          <small>Soluções Martech</small>
          <div className="next-mobile-service-list">
            {mobileServices.map(([label, href], index) => (
              <Link href={href} onClick={onClose} key={href}><b>{String(index + 1).padStart(2, "0")}</b><span>{label}</span><i aria-hidden>→</i></Link>
            ))}
          </div>
          <div className="next-mobile-main-links">
            <Link href="/cases/" onClick={onClose}>Cases</Link>
            <Link href="/insights/" onClick={onClose}>Insights</Link>
            <Link href="/institucional/" onClick={onClose}>Institucional</Link>
          </div>
          <Link className="next-mobile-contact" href="/#contato" onClick={onClose}>Fale com um especialista <span>→</span></Link>
        </nav>
      </div>
    </div>
  );
}

export function SiteIntegrations({ bodyClass, pageTitle }: { bodyClass: string; pageTitle: string }) {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.className = bodyClass;
    document.title = pageTitle;

    const frame = window.requestAnimationFrame(() => {
      document.title = pageTitle;
      setPortalTarget(document.body);
      const testimonialsRoot = document.getElementById("next-testimonials-root");
      setTarget(testimonialsRoot);

      if (testimonialsRoot && window.location.hash === "#next-testimonials-root") {
        window.setTimeout(() => testimonialsRoot.scrollIntoView({ block: "center" }), 250);
      }
    });

    if (!document.querySelector('script[src*="cdn.leadster.com.br/neurolead"]')) {
      window.neuroleadId = "45pZEB7bj5x7KYoPVWdocmSxR";
      const script = document.createElement("script");
      script.src = "https://cdn.leadster.com.br/neurolead/neurolead.min.js";
      script.charset = "UTF-8";
      script.defer = true;
      document.head.appendChild(script);
    }

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [bodyClass, pageTitle]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.wp-snapshot-root [data-elementor-type="wp-page"] > .e-con.e-parent, .wp-snapshot-root .elementor-widget-posts article',
      ),
    ).filter((element) => element.getBoundingClientRect().height > 0);

    document.querySelectorAll<HTMLElement>(".wp-snapshot-root .elementor-invisible").forEach((element) => {
      element.classList.remove("elementor-invisible");
    });

    revealItems.forEach((element, index) => {
      element.classList.add("next-reveal");
      element.style.setProperty("--next-delay", `${Math.min(index % 4, 3) * 70}ms`);
    });

    let observer: IntersectionObserver | undefined;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach((element) => element.classList.add("is-visible"));
    } else {
      observer = new IntersectionObserver(
        (entries) => entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer?.unobserve(entry.target);
        }),
        { threshold: 0.08, rootMargin: "0px 0px -36px" },
      );
      revealItems.forEach((element) => observer?.observe(element));
    }

    const hero = document.querySelector<HTMLElement>("body.page-id-15 .elementor-element-0e16491");
    const onPointerMove = (event: PointerEvent) => {
      if (!hero || reducedMotion) return;
      const rect = hero.getBoundingClientRect();
      hero.style.setProperty("--next-pointer-x", `${event.clientX - rect.left}px`);
      hero.style.setProperty("--next-pointer-y", `${event.clientY - rect.top}px`);
    };
    hero?.addEventListener("pointermove", onPointerMove, { passive: true });

    const martechParagraph = Array.from(hero?.querySelectorAll("p") ?? []).find((paragraph) =>
      paragraph.textContent?.includes("MARTECH"),
    );
    if (martechParagraph && !martechParagraph.querySelector(".next-martech-word")) {
      martechParagraph.innerHTML = martechParagraph.innerHTML.replace(
        "MARTECH",
        '<span class="next-martech-word">MARTECH</span>',
      );
    }

    const onScroll = () => document.body.classList.toggle("next-header-scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer?.disconnect();
      hero?.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [bodyClass]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const element = event.target instanceof Element ? event.target : null;
      const trigger = element?.closest<HTMLElement>(
        'header[data-elementor-type="header"] a[href*="elementor-action"][href*="popup"]',
      );
      if (!trigger) return;
      event.preventDefault();
      setMobileMenuOpen(true);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (mobileMenuOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const menuSelector = ".e-n-menu-item";
    let resizeFrame = 0;

    const getDropdown = (item: Element) =>
      item.querySelector<HTMLElement>(":scope > .e-n-menu-content");

    const setOpen = (item: HTMLElement, open: boolean) => {
      const dropdown = getDropdown(item);
      if (!dropdown) return;

      dropdown.classList.toggle("e-active", open);
      dropdown.querySelector<HTMLElement>(":scope > .e-con")?.classList.toggle("e-active", open);
      item.classList.toggle("next-menu-open", open);
      item
        .querySelector<HTMLElement>(":scope > .e-n-menu-title .e-n-menu-dropdown-icon")
        ?.setAttribute("aria-expanded", String(open));
    };

    const closeAll = (except?: HTMLElement) => {
      document.querySelectorAll<HTMLElement>(menuSelector).forEach((item) => {
        if (item !== except && getDropdown(item)) setOpen(item, false);
      });
    };

    const syncMenuPositions = () => {
      const viewportWidth = document.documentElement.clientWidth;
      document.querySelectorAll<HTMLElement>(".elementor-widget-n-menu .e-n-menu").forEach((menu) => {
        if (menu.dataset.layout === "dropdown") return;
        const rect = menu.getBoundingClientRect();
        menu.style.setProperty("--stretch-left", `${-rect.left}px`);
        menu.style.setProperty("--stretch-right", "auto");
        menu.style.setProperty("--stretch-width", `${viewportWidth}px`);
      });
    };

    const schedulePositionSync = () => {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(syncMenuPositions);
    };

    const onMouseOver = (event: MouseEvent) => {
      const targetElement = event.target instanceof Element ? event.target : null;
      const item = targetElement?.closest<HTMLElement>(menuSelector);
      if (!item || !getDropdown(item)) return;
      if (event.relatedTarget instanceof Node && item.contains(event.relatedTarget)) return;

      syncMenuPositions();
      closeAll(item);
      setOpen(item, true);
    };

    const onMouseOut = (event: MouseEvent) => {
      const targetElement = event.target instanceof Element ? event.target : null;
      const item = targetElement?.closest<HTMLElement>(menuSelector);
      if (!item || !getDropdown(item)) return;
      if (event.relatedTarget instanceof Node && item.contains(event.relatedTarget)) return;
      setOpen(item, false);
    };

    const onClick = (event: MouseEvent) => {
      const targetElement = event.target instanceof Element ? event.target : null;
      if (!targetElement) return;

      const trigger = targetElement.closest<HTMLElement>(
        ".e-n-menu-title-container[href='#'], .e-n-menu-dropdown-icon",
      );
      if (!trigger) {
        if (!targetElement.closest(".e-n-menu-content")) closeAll();
        return;
      }

      const item = trigger.closest<HTMLElement>(menuSelector);
      const dropdown = item ? getDropdown(item) : null;
      if (!item || !dropdown) return;

      event.preventDefault();
      event.stopPropagation();
      syncMenuPositions();
      const hasHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const shouldOpen = hasHover || !dropdown.classList.contains("e-active");
      closeAll(item);
      setOpen(item, shouldOpen);
    };

    const onFocusIn = (event: FocusEvent) => {
      const targetElement = event.target instanceof Element ? event.target : null;
      const item = targetElement?.closest<HTMLElement>(menuSelector);
      if (!item || !getDropdown(item)) return;
      syncMenuPositions();
      closeAll(item);
      setOpen(item, true);
    };

    const onFocusOut = (event: FocusEvent) => {
      const targetElement = event.target instanceof Element ? event.target : null;
      const item = targetElement?.closest<HTMLElement>(menuSelector);
      if (!item || !getDropdown(item)) return;
      if (event.relatedTarget instanceof Node && item.contains(event.relatedTarget)) return;
      setOpen(item, false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAll();
    };

    syncMenuPositions();
    window.addEventListener("resize", schedulePositionSync);
    document.addEventListener("mouseover", onMouseOver, true);
    document.addEventListener("mouseout", onMouseOut, true);
    document.addEventListener("click", onClick, true);
    document.addEventListener("focusin", onFocusIn, true);
    document.addEventListener("focusout", onFocusOut, true);
    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      window.cancelAnimationFrame(resizeFrame);
      window.removeEventListener("resize", schedulePositionSync);
      document.removeEventListener("mouseover", onMouseOver, true);
      document.removeEventListener("mouseout", onMouseOut, true);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("focusin", onFocusIn, true);
      document.removeEventListener("focusout", onFocusOut, true);
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, []);

  return (
    <>
      {target ? createPortal(<Testimonials />, target) : null}
      {portalTarget ? createPortal(<MobileNavigation open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />, portalTarget) : null}
    </>
  );
}
