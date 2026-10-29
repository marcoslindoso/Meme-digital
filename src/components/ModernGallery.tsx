"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=85", alt: "Experiência de e-commerce", label: "E-commerce & conversão" },
  { src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1600&q=85", alt: "Projeto digital em um computador", label: "Tecnologia aplicada" },
  { src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=85", alt: "Produtos digitais em destaque", label: "Produtos digitais" },
  { src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=85", alt: "Equipe celebrando uma conquista", label: "Reconhecimento" },
];

export function ModernGallery() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setCurrent((slide) => (slide + 1) % slides.length), 5200);
    return () => window.clearInterval(timer);
  }, []);

  const goTo = (slide: number) => setCurrent((slide + slides.length) % slides.length);

  return (
    <section className="mh-section mh-gallery" aria-labelledby="galeria-titulo">
      <div className="mh-shell">
        <header className="mh-gallery-head mh-reveal">
          <div><span className="mh-eyebrow">Em movimento</span><h2 id="galeria-titulo">Ideias que ganham <em>forma.</em></h2></div>
          <div className="mh-gallery-controls">
            <button type="button" onClick={() => goTo(current - 1)} aria-label="Foto anterior">←</button>
            <span>{String(current + 1).padStart(2, "0")} <i>/</i> {String(slides.length).padStart(2, "0")}</span>
            <button type="button" onClick={() => goTo(current + 1)} aria-label="Próxima foto">→</button>
          </div>
        </header>
        <div className="mh-gallery-window" role="region" aria-roledescription="carrossel" aria-label="Galeria de projetos">
          <div className="mh-gallery-track" style={{ transform: `translateX(-${current * 100}%)` }}>
            {slides.map((slide, index) => (
              <figure className="mh-gallery-slide" key={slide.src} aria-hidden={index !== current}>
                <Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 900px) 100vw, 1180px" priority={index === 0} />
                <figcaption>{slide.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="mh-gallery-dots" role="tablist" aria-label="Selecionar foto">
          {slides.map((slide, index) => <button key={slide.src} type="button" role="tab" aria-label={`Ver ${slide.label}`} aria-selected={index === current} onClick={() => goTo(index)} />)}
        </div>
      </div>
    </section>
  );
}
