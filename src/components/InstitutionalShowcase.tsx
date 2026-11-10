"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { OfferingIcon, type OfferingIconName } from "@/components/OfferingIcon";

type Initiative = { title: string; text: string; image: string; icon: OfferingIconName };

const groups: { label: string; title: string; intro: string; items: Initiative[] }[] = [
  {
    label: "Meme Social",
    title: "Criatividade que gera impacto.",
    intro: "Design e comunicação a serviço de iniciativas que aproximam pessoas e abrem caminhos.",
    items: [
      { title: "Cidadão Pró Mundo", text: "Apoiamos a comunicação de uma organização que promove integração social pelo ensino de inglês.", image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=82", icon: "design" },
      { title: "Instituto Padre Haroldo", text: "Contribuímos com projetos digitais ligados à transformação de pessoas em recuperação da dependência química.", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=82", icon: "growth" },
    ],
  },
  {
    label: "Startups da Meme",
    title: "Ideias que ganham vida própria.",
    intro: "Também incubamos projetos que nascem da vontade de resolver problemas de um jeito novo.",
    items: [
      { title: "ME.post", text: "Gestão e compartilhamento de conteúdo em um fluxo mais simples.", image: "/assets/startups/Me.-Post-1024x853.webp", icon: "planning" },
      { title: "CRMeme", text: "Métricas e resultados de campanhas reunidos para orientar decisões.", image: "/assets/startups/CR-Meme-1024x853.webp", icon: "performance" },
      { title: "Matchpay", text: "Uma plataforma pensada para a venda de cursos e produtos digitais.", image: "/assets/startups/Match-Pay-1024x853.webp", icon: "commerce" },
      { title: "Meme Ensina", text: "Conhecimento em marketing digital de ponta a ponta.", image: "/assets/startups/Meme-Ensina-1024x853.webp", icon: "copy" },
      { title: "Neto Ensina", text: "Tecnologia explicada de um jeito acessível para todos.", image: "/assets/startups/Neto-Ensina-1024x853.webp", icon: "app" },
    ],
  },
];

export function InstitutionalShowcase() {
  const [groupIndex, setGroupIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const group = groups[groupIndex];
  const current = group.items[activeIndex];

  function selectGroup(index: number) {
    setGroupIndex(index);
    setActiveIndex(0);
  }

  return <section className="ip-showcase ip-section" id="iniciativas">
    <div className="mh-shell">
      <header className="ip-showcase-head mh-reveal"><span className="mh-eyebrow">Além dos projetos</span><h2>O que nos move também <em>ganha forma fora da agência.</em></h2></header>
      <div className="ip-showcase-tabs" role="tablist" aria-label="Iniciativas da Meme Digital">
        {groups.map((item, index) => <button type="button" role="tab" id={`ip-tab-${index}`} aria-controls="ip-showcase-panel" aria-selected={index === groupIndex} className={index === groupIndex ? "is-active" : ""} onClick={() => selectGroup(index)} key={item.label}>{item.label}</button>)}
      </div>
      <div className="ip-showcase-panel" id="ip-showcase-panel" role="tabpanel" aria-labelledby={`ip-tab-${groupIndex}`}>
        <div className="ip-showcase-intro"><span className="mh-eyebrow">{group.label}</span><h3>{group.title}</h3><p>{group.intro}</p></div>
        <div className="ip-showcase-layout">
          <div className={`ip-showcase-preview${groupIndex === 1 ? " is-startup" : ""}`} aria-live="polite">
            <div className="ip-showcase-media"><Image key={current.image} src={current.image} alt={`Projeto ${current.title}`} fill sizes="(max-width: 900px) 100vw, 55vw" /></div>
            <div className="ip-showcase-preview-caption"><span>{group.label} · Em destaque</span><strong>{current.title}</strong></div>
          </div>
          <div className={`ip-showcase-cards${group.items.length === 2 ? " is-social" : ""}`}>
            {group.items.map((item, index) => <article className={`ip-showcase-card${index === activeIndex ? " is-active" : ""}`} key={item.title} onMouseEnter={() => setActiveIndex(index)} onFocusCapture={() => setActiveIndex(index)}>
              <span className="ip-showcase-icon"><OfferingIcon name={item.icon} /></span>
              <h4><button type="button" onClick={() => setActiveIndex(index)} aria-pressed={index === activeIndex}>{item.title}</button></h4>
              <p>{item.text}</p>
              <Link href="#contato">Fale com a Meme <span aria-hidden="true">↗</span></Link>
            </article>)}
          </div>
        </div>
      </div>
    </div>
  </section>;
}
