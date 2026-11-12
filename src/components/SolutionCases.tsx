"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { caseProjects } from "@/components/case-projects";

export function SolutionCases() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(1);
  const activeRef = useRef(1);
  const wheelAt = useRef(0);
  const dragRef = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const items = caseProjects;

  function goTo(index: number, behavior: ScrollBehavior = "smooth") {
    const track = trackRef.current;
    const cards = track?.querySelectorAll<HTMLElement>(".solution-case");
    if (!track || !cards?.length) return;
    const next = Math.max(0, Math.min(index, cards.length - 1));
    track.scrollTo({ left: cards[next].offsetLeft - cards[0].offsetLeft, behavior });
    activeRef.current = next;
    setActive(next);
  }

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>(".solution-case");
    if (cards.length > 1) track.scrollLeft = cards[1].offsetLeft - cards[0].offsetLeft;

    function handleWheel(event: WheelEvent) {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX) || Math.abs(event.deltaY) < 8) return;
      const direction = Math.sign(event.deltaY);
      const next = activeRef.current + direction;
      if (next < 0 || next >= cards.length) return;
      event.preventDefault();
      if (Date.now() - wheelAt.current < 480) return;
      wheelAt.current = Date.now();
      goTo(next);
    }

    track.addEventListener("wheel", handleWheel, { passive: false });
    return () => track.removeEventListener("wheel", handleWheel);
  }, []);

  function updateActive() {
    const track = trackRef.current;
    const first = track?.querySelector<HTMLElement>(".solution-case");
    if (!track || !first) return;
    const step = first.offsetWidth + 8;
    const next = Math.max(0, Math.min(items.length - 1, Math.round(track.scrollLeft / step)));
    activeRef.current = next;
    setActive(next);
  }

  return (
    <section className="solution-cases" id="cases" aria-labelledby="solution-cases-title">
      <div className="mh-shell solution-cases-heading">
        <div><span className="mh-eyebrow">Cases da Meme</span><h2 id="solution-cases-title">Projetos com <em>ideias em movimento.</em></h2></div>
        <Link href="/cases" className="solution-cases-all">Ver todos os cases <span aria-hidden="true">↗</span></Link>
      </div>
      <div className="solution-cases-track" ref={trackRef} onScroll={updateActive} aria-label="Galeria de cases"
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse" || event.button !== 0 || (event.target as Element).closest("a")) return;
          const track = event.currentTarget;
          dragRef.current = { x: event.clientX, left: track.scrollLeft, moved: false };
          track.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const drag = dragRef.current;
          if (!drag) return;
          const distance = event.clientX - drag.x;
          if (Math.abs(distance) > 6) drag.moved = true;
          if (!drag.moved) return;
          event.currentTarget.classList.add("is-dragging");
          event.currentTarget.scrollLeft = drag.left - distance;
        }}
        onPointerUp={(event) => {
          suppressClick.current = Boolean(dragRef.current?.moved);
          dragRef.current = null;
          event.currentTarget.classList.remove("is-dragging");
          if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={(event) => { dragRef.current = null; event.currentTarget.classList.remove("is-dragging"); }}
        onClickCapture={(event) => { if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}>
        {items.map((project, index) => {
          return <article className={`solution-case${index === active ? " is-active" : ""}`} key={project.slug} aria-current={index === active ? "true" : undefined}>
            <Image src={project.image} alt={`Projeto ${project.title}`} fill sizes="(max-width: 700px) 88vw, 72vw" loading={Math.abs(index - active) <= 1 ? "eager" : "lazy"} unoptimized={project.image.startsWith("/cases/")} />
            <button className="solution-case-select" type="button" onClick={() => goTo(index === active ? active + 1 : index)} aria-label={`Selecionar case ${project.title}`} />
            <div className="solution-case-caption"><h3>{project.title}</h3><span>{project.category}</span><Link href={`/${project.slug}`} aria-label={`Ver projeto ${project.title}`}>Ver projeto <b aria-hidden="true">↗</b></Link></div>
          </article>;
        })}
      </div>
      <div className="mh-shell solution-cases-controls">
        <div className="solution-cases-progress" aria-hidden="true"><span style={{ width: `${((active + 1) / items.length) * 100}%` }} /></div>
        <div className="solution-cases-buttons"><button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Case anterior">←</button><button type="button" onClick={() => goTo(active + 1)} disabled={active === items.length - 1} aria-label="Próximo case">→</button></div>
      </div>
    </section>
  );
}
