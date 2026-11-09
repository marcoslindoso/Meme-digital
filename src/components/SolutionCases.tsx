"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { caseProjects } from "@/components/case-projects";

export function SolutionCases() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(1);
  const items = caseProjects;

  function goTo(index: number, behavior: ScrollBehavior = "smooth") {
    const track = trackRef.current;
    const cards = track?.querySelectorAll<HTMLElement>(".solution-case");
    if (!track || !cards?.length) return;
    const next = Math.max(0, Math.min(index, cards.length - 1));
    track.scrollTo({ left: cards[next].offsetLeft - cards[0].offsetLeft, behavior });
    setActive(next);
  }

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>(".solution-case");
    if (cards.length > 1) track.scrollLeft = cards[1].offsetLeft - cards[0].offsetLeft;

    function handleWheel(event: WheelEvent) {
      if (!track || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      const atStart = track.scrollLeft <= 1 && event.deltaY < 0;
      const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 1 && event.deltaY > 0;
      if (atStart || atEnd) return;
      event.preventDefault();
      track.scrollLeft += event.deltaY;
    }

    track.addEventListener("wheel", handleWheel, { passive: false });
    return () => track.removeEventListener("wheel", handleWheel);
  }, []);

  function updateActive() {
    const track = trackRef.current;
    const first = track?.querySelector<HTMLElement>(".solution-case");
    if (!track || !first) return;
    const step = first.offsetWidth + 8;
    setActive(Math.max(0, Math.min(items.length - 1, Math.round(track.scrollLeft / step))));
  }

  return (
    <section className="solution-cases" id="cases" aria-labelledby="solution-cases-title">
      <div className="mh-shell solution-cases-heading">
        <div><span className="mh-eyebrow">Cases da Meme</span><h2 id="solution-cases-title">Projetos com <em>ideias em movimento.</em></h2></div>
        <Link href="/cases" className="solution-cases-all">Ver todos os cases <span aria-hidden="true">↗</span></Link>
      </div>
      <div className="solution-cases-track" ref={trackRef} onScroll={updateActive} aria-label="Galeria de cases">
        {items.map((project, index) => {
          return <article className="solution-case" key={project.slug}>
            <Image src={project.image} alt={`Projeto ${project.title}`} fill sizes="(max-width: 700px) 88vw, 72vw" unoptimized={project.image.startsWith("/cases/")} />
            <button className="solution-case-select" type="button" onClick={() => goTo(index === active ? active + 1 : index)} aria-label={`Selecionar case ${project.title}`} />
            <div className="solution-case-caption"><h3>{project.title}</h3><span>{project.category}</span><Link href={`/${project.slug}`} aria-label={`Ver projeto ${project.title}`}>Ver projeto <b aria-hidden="true">↗</b></Link></div>
          </article>;
        })}
      </div>
      <div className="mh-shell solution-cases-controls">
        <div className="solution-cases-count"><strong>{String(active + 1).padStart(2, "0")}</strong><span> / {String(items.length).padStart(2, "0")}</span></div>
        <div className="solution-cases-progress" aria-hidden="true"><span style={{ width: `${((active + 1) / items.length) * 100}%` }} /></div>
        <div className="solution-cases-buttons"><button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Case anterior">←</button><button type="button" onClick={() => goTo(active + 1)} disabled={active === items.length - 1} aria-label="Próximo case">→</button></div>
      </div>
    </section>
  );
}
