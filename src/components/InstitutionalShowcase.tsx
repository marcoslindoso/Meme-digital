"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { OfferingIcon, type OfferingIconName } from "@/components/OfferingIcon";

type Initiative = { title: string; text: string; image: string; icon: OfferingIconName };

const groups: { label: string; title: string; intro: string; items: Initiative[] }[] = [
  {
    label: "Meme Social",
    title: "Descubra como a Meme faz a diferença na sociedade.",
    intro: "Colaboramos em ações de design e comunicação para iniciativas que transformam vidas.",
    items: [
      { title: "Cidadão Pró Mundo", text: "Colaboramos em iniciativas de design e comunicação para a Cidadão Pró Mundo, que promove oportunidades de integração social no Brasil por meio do ensino de inglês.", image: "/assets/editorial/photo-1427504494785-3a9ca7044f45.webp", icon: "design" },
      { title: "Instituto Padre Haroldo", text: "Engajamo-nos em projetos digitais para auxiliar o IPH em sua missão de transformar a vida de homens e mulheres que enfrentam a dependência química.", image: "/assets/editorial/photo-1529156069898-49953e39b3ac.webp", icon: "growth" },
    ],
  },
  {
    label: "Startups da Meme",
    title: "Inovação de ponta a ponta.",
    intro: "A Meme é inovação de ponta a ponta e incubamos várias startups que surgem aqui.",
    items: [
      { title: "ME.post", text: "Simplifique a gestão de conteúdo com o Me.Post. Organize e compartilhe conteúdos com eficiência e rapidez. Em desenvolvimento.", image: "/assets/startups/Me.-Post-1024x853.webp", icon: "planning" },
      { title: "CRMeme", text: "Uma startup dedicada a fornecer métricas e resultados de campanhas de tráfego pago, orgânico e análise de dados para os clientes. Ativo.", image: "/assets/startups/CR-Meme-1024x853.webp", icon: "performance" },
      { title: "Matchpay", text: "A plataforma para vender cursos e produtos digitais de forma rápida, simples e segura. Em desenvolvimento.", image: "/assets/startups/Match-Pay-1024x853.webp", icon: "commerce" },
      { title: "Meme Ensina", text: "Curso completo de marketing digital End to End, de branding a SEO e análise de dados, para levar seu conhecimento ao próximo nível.", image: "/assets/startups/Meme-Ensina-1024x853.webp", icon: "copy" },
      { title: "Neto Ensina", text: "Um guia para desvendar o mundo da tecnologia, de contas digitais às configurações da TV, de forma simples e sem complicações.", image: "/assets/startups/Neto-Ensina-1024x853.webp", icon: "app" },
    ],
  },
];

export function InstitutionalShowcase() {
  const [groupIndex, setGroupIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const group = groups[groupIndex];
  const current = group.items[activeIndex];

  useEffect(() => {
    function syncFromHash() {
      if (window.location.hash === "#startups") {
        setGroupIndex(1);
        setActiveIndex(0);
      } else if (window.location.hash === "#meme-social") {
        setGroupIndex(0);
        setActiveIndex(0);
      }
    }
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  function selectGroup(index: number) {
    setGroupIndex(index);
    setActiveIndex(0);
  }

  return <section className="ip-showcase ip-section" id="iniciativas">
    <span id="meme-social" aria-hidden="true" /><span id="startups" aria-hidden="true" />
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
