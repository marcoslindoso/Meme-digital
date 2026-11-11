"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { src: "/assets/editorial/photo-1556742049-0cfed4f6a45d.webp", alt: "Experiência de e-commerce", label: "E-commerce & conversão" },
  { src: "/assets/editorial/photo-1551434678-e076c223a692.webp", alt: "Profissionais desenvolvendo tecnologia em computadores", label: "Tecnologia aplicada" },
  { src: "/assets/editorial/photo-1553877522-43269d4ea984.webp", alt: "Equipe trabalhando em interfaces digitais", label: "Produtos digitais" },
  { src: "/assets/editorial/photo-1521737711867-e3b97375f902.webp", alt: "Equipe reunida em um projeto", label: "Trabalho em equipe" },
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
            <button type="button" onClick={() => goTo(current + 1)} aria-label="Próxima foto">→</button>
          </div>
        </header>
        <div className="mh-gallery-window" role="region" aria-roledescription="carrossel" aria-label="Galeria de projetos">
          <div className="mh-gallery-track" style={{ transform: `translateX(-${current * 100}%)` }}>
            {slides.map((slide, index) => (
              <figure className={`mh-gallery-slide${index === current ? " is-active" : ""}`} key={slide.src} aria-hidden={index !== current}>
                <Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 900px) 100vw, 1180px" />
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
