"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { src: "/logos/2018-premios-home.webp", alt: "Equipe da Meme em premiação de 2018", label: "Prêmio App · 2018" },
  { src: "/logos/2019-premios-home.webp", alt: "Equipe da Meme em premiação de 2019", label: "Prêmio Recall · 2019" },
  { src: "/logos/2022-premios-home.webp", alt: "Equipe da Meme recebendo reconhecimento em 2022", label: "Prêmio Recall · Ouro 2022" },
  { src: "/logos/2022-shortlist-premios-home.webp", alt: "Equipe da Meme entre os finalistas em 2022", label: "Shortlist · 2022" },
];

export function AwardsSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 5600);
    return () => window.clearInterval(timer);
  }, []);

  return <div className="mh-awards-slider mh-reveal" aria-label="Galeria de conquistas">
    <div className="mh-awards-slider-track" style={{ transform: `translateX(-${active * 100}%)` }}>
      {slides.map((slide, index) => <figure className="mh-awards-slide" aria-hidden={index !== active} key={slide.label}>
        <Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 900px) 100vw, 56vw" />
        <figcaption>{slide.label}</figcaption>
      </figure>)}
    </div>
    <div className="mh-awards-slider-nav"><span>0{active + 1} <i>/</i> 0{slides.length}</span><button type="button" onClick={() => setActive((active + slides.length - 1) % slides.length)} aria-label="Foto anterior">←</button><button type="button" onClick={() => setActive((active + 1) % slides.length)} aria-label="Próxima foto">→</button></div>
  </div>;
}
