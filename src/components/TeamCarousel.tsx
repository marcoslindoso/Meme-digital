"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const team = [
  { name: "Aline Mônaco", role: "Financeiro", image: "/wp-content/uploads/2024/07/aline.png" },
  { name: "Bruno Fischer", role: "Gestor de Tráfego", image: "/wp-content/uploads/2024/05/fischer.webp" },
  { name: "Bruno Vaz", role: "CEO", image: "/wp-content/uploads/2024/05/bruno.webp" },
  { name: "Francielly Hammerich", role: "Analista de Mídias Sociais", image: "/wp-content/uploads/2025/01/Fran-1.png" },
  { name: "Guilherme Pazzeti", role: "Redator", image: "/wp-content/uploads/2024/05/guilherme.webp" },
  { name: "Rubens Alves", role: "Dev", image: "/wp-content/uploads/2024/05/rubens.webp" },
  { name: "Samira Tanos", role: "Diretora de Arte", image: "/wp-content/uploads/2024/05/samira.webp" },
];

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/agenciamemedigital", icon: "instagram" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/meme-digital", icon: "linkedin-in" },
  { name: "Behance", href: "https://www.behance.net/agenciamemedigital", icon: "behance" },
];

export function TeamCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; scroll: number } | null>(null);
  const [progress, setProgress] = useState(0);

  function updateProgress() {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setProgress(max > 0 ? track.scrollLeft / max : 0);
  }

  function move(direction: number) {
    const track = trackRef.current;
    const first = track?.querySelector<HTMLElement>(".ip-team-card");
    if (!track || !first) return;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * (first.offsetWidth + gap), behavior: "smooth" });
  }

  function tilt(event: React.PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - .5;
    const y = (event.clientY - box.top) / box.height - .5;
    event.currentTarget.style.setProperty("--ip-tilt-x", `${(-y * 4).toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--ip-tilt-y", `${(x * 4).toFixed(2)}deg`);
  }

  return <div className="ip-team-carousel">
    <div className="ip-team-controls" aria-label="Navegar pelo time">
      <button type="button" onClick={() => move(-1)} disabled={progress <= .005} aria-label="Ver integrantes anteriores">←</button>
      <button type="button" onClick={() => move(1)} disabled={progress >= .995} aria-label="Ver próximos integrantes">→</button>
    </div>
    <div
      className="ip-team-track"
      ref={trackRef}
      role="region"
      aria-label="Equipe Meme Digital"
      tabIndex={0}
      onScroll={updateProgress}
      onKeyDown={(event) => { if (event.key === "ArrowRight") { event.preventDefault(); move(1); } if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); } }}
      onPointerDown={(event) => { if (event.pointerType !== "mouse" || event.button !== 0 || (event.target as HTMLElement).closest("a")) return; dragRef.current = { x: event.clientX, scroll: event.currentTarget.scrollLeft }; event.currentTarget.setPointerCapture(event.pointerId); }}
      onPointerMove={(event) => { if (!dragRef.current) return; event.currentTarget.scrollLeft = dragRef.current.scroll + dragRef.current.x - event.clientX; }}
      onPointerUp={() => { dragRef.current = null; }}
      onPointerCancel={() => { dragRef.current = null; }}
    >
      {team.map((member) => <article className="ip-team-card" key={member.name} onPointerMove={tilt} onPointerLeave={(event) => { event.currentTarget.style.removeProperty("--ip-tilt-x"); event.currentTarget.style.removeProperty("--ip-tilt-y"); }}>
        <div className="ip-team-photo"><Image src={member.image} alt={`Retrato de ${member.name}`} fill sizes="(max-width: 580px) 78vw, (max-width: 900px) 45vw, 24vw" /><span className="ip-team-stamp">MEME <span>✦</span></span><div className="ip-team-social" aria-label="Redes sociais da Meme Digital">{socialLinks.map((link) => <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={`Meme Digital no ${link.name}`} key={link.name}><span className={`ip-team-social-icon ip-team-social-icon-${link.icon}`} aria-hidden="true" /></a>)}</div></div>
        <div className="ip-team-caption"><span>{member.role}</span><h3>{member.name}</h3></div>
      </article>)}
    </div>
    <div className="ip-team-progress" aria-hidden="true"><span style={{ transform: `scaleX(${Math.max(.12, progress)})` }} /></div>
  </div>;
}
