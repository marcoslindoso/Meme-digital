"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useLayoutEffect, useRef } from "react";

type CaseItem = {
  slug: string;
  title: string;
  category: string;
  project: string;
  intro: string;
  image: string;
};

export function CasesScroller({ items }: { items: ReadonlyArray<CaseItem> }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  const moveGallery = useCallback((direction: -1 | 1) => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const nextProgress = Math.max(0, Math.min(1, trigger.progress + direction * 0.22));
    const destination = trigger.start + (trigger.end - trigger.start) * nextProgress;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    window.scrollTo({ top: destination, behavior });
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(min-width: 901px)", () => {
      const travel = () => Math.max(0, track.scrollWidth - window.innerWidth + 48);
      const animation = gsap.to(track, { x: () => -travel(), ease: "none" });
      const trigger = ScrollTrigger.create({
        id: "meme-cases-gallery",
        trigger: section,
        animation,
        start: "top top",
        end: () => `+=${travel()}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      });
      triggerRef.current = trigger;

      const refresh = () => ScrollTrigger.refresh();
      const observer = new ResizeObserver(refresh);
      observer.observe(track);
      window.addEventListener("load", refresh, { once: true });
      requestAnimationFrame(refresh);

      return () => {
        observer.disconnect();
        window.removeEventListener("load", refresh);
        if (triggerRef.current === trigger) triggerRef.current = null;
        trigger.kill();
        animation.kill();
      };
    });

    return () => media.revert();
  }, []);

  return <section className="case-scroll" ref={sectionRef} aria-label="Portfólio de projetos">
    <div className="case-scroll-head mh-shell"><div><span className="mh-eyebrow">Cases e portfólio</span><h2>Projetos que<br /><em>saem do papel.</em></h2></div><p><b>01 / {String(items.length).padStart(2, "0")}</b> · role para descobrir</p></div>
    <div className="case-scroll-actions mh-shell" aria-label="Navegação da galeria">
      <span>Role a página ou use as setas para ver todos os projetos.</span>
      <div><button type="button" onClick={() => moveGallery(-1)} aria-label="Ver projetos anteriores">←</button><button type="button" onClick={() => moveGallery(1)} aria-label="Ver próximos projetos">→</button></div>
    </div>
    <div className="case-scroll-viewport"><div className="case-scroll-track" ref={trackRef}>
      {items.map((item, index) => <Link className="case-scroll-card" href={`/${item.slug}/`} key={item.slug}>
        <div className="case-scroll-image"><Image src={item.image} alt={`Projeto ${item.title}`} fill sizes="(max-width: 900px) 100vw, 70vw" onLoad={() => ScrollTrigger.refresh()} /><span>{String(index + 1).padStart(2, "0")}</span><b>Ver projeto ↗</b></div>
        <small>{item.category} · {item.project}</small><h3>{item.title}</h3><p>{item.intro}</p>
      </Link>)}
    </div></div>
  </section>;
}
