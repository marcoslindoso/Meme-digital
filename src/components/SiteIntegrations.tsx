"use client";

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

export function SiteIntegrations() {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
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
  }, []);

  return (
    <>
      {target ? createPortal(<Testimonials />, target) : null}
    </>
  );
}
