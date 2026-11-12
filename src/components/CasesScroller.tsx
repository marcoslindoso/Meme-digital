"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type CSSProperties } from "react";

type CaseItem = {
  slug: string;
  title: string;
  category: string;
  project: string;
  intro: string;
  image: string;
};

export function CasesScroller({ items }: { items: ReadonlyArray<CaseItem> }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [dragOffset, setDragOffset] = useState(0);
  const touchStart = useRef<number | null>(null);
  const mouseStart = useRef<number | null>(null);
  const suppressClick = useRef(false);
  const current = items[index];
  const previous = items[(index - 1 + items.length) % items.length];
  const next = items[(index + 1) % items.length];

  function go(direction: number) {
    setDirection(direction);
    setIndex((position) => (position + direction + items.length) % items.length);
  }

  function select(position: number) {
    setDirection(position >= index ? 1 : -1);
    setIndex(position);
  }

  return <>
    <section className="case-carousel" aria-label="Cases selecionados">
      <div className="case-carousel-heading mh-shell">
        <div><span className="mh-eyebrow">Nosso portfólio</span><h1><strong>CASES</strong> <span>SELECIONADOS.</span></h1></div>
        <div className="case-carousel-controls" aria-label="Navegação dos cases">
          <button type="button" onClick={() => go(-1)} aria-label="Case anterior">←</button>
          <button type="button" onClick={() => go(1)} aria-label="Próximo case">→</button>
        </div>
      </div>
      <div
        className="case-carousel-stage"
        role="region"
        aria-roledescription="carrossel"
        aria-label="Projetos da Meme Digital"
        tabIndex={0}
        onKeyDown={(event) => { if (event.target !== event.currentTarget) return; if (event.key === "ArrowRight") go(1); if (event.key === "ArrowLeft") go(-1); }}
        onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
        onTouchEnd={(event) => { if (touchStart.current === null) return; const delta = event.changedTouches[0].clientX - touchStart.current; touchStart.current = null; if (Math.abs(delta) > 45) go(delta < 0 ? 1 : -1); }}
      >
        <div className={`case-carousel-frame${dragOffset !== 0 ? " is-dragging" : ""}`} key={current.slug} style={{ "--case-enter-x": direction > 0 ? "70px" : "-70px", "--case-drag-x": `${dragOffset}px` } as CSSProperties}>
          <div className="case-carousel-copy case-carousel-side">
            <Image src={previous.image} alt="" fill sizes="22vw" loading="lazy" />
            <span className="case-carousel-category">Anterior</span>
            <button type="button" onClick={() => go(-1)} aria-label={`Selecionar case ${previous.title}`}><span className="case-carousel-next-title">{previous.title}</span></button>
          </div>
          <div className="case-carousel-center"><button
            className="case-carousel-media"
            type="button"
            onClick={() => { if (suppressClick.current) { suppressClick.current = false; return; } go(1); }}
            onPointerDown={(event) => { if (event.pointerType !== "mouse" || event.button !== 0) return; mouseStart.current = event.clientX; suppressClick.current = false; event.currentTarget.setPointerCapture(event.pointerId); }}
            onPointerMove={(event) => { if (mouseStart.current === null) return; setDragOffset(Math.max(-170, Math.min(170, event.clientX - mouseStart.current))); }}
            onPointerUp={(event) => { if (mouseStart.current === null) return; const distance = event.clientX - mouseStart.current; mouseStart.current = null; setDragOffset(0); if (Math.abs(distance) > 8) suppressClick.current = true; if (Math.abs(distance) > 70) go(distance < 0 ? 1 : -1); }}
            onPointerCancel={() => { mouseStart.current = null; setDragOffset(0); suppressClick.current = true; }}
            onDragStart={(event) => event.preventDefault()}
            aria-label={`Arraste para navegar ou clique para mostrar ${next.title}`}
          >
            <Image src={current.image} alt={`Prévia do projeto ${current.title}`} fill priority sizes="(max-width: 700px) 100vw, 60vw" />
          </button><div className="case-carousel-current"><span className="case-carousel-category">{current.category}</span><h2>{current.title}</h2><Link className="case-carousel-link" href={`/${current.slug}/`}><span className="case-carousel-link-icon">↗</span><span>Ver projeto</span></Link></div></div>
          <div className="case-carousel-next case-carousel-side">
            <Image src={next.image} alt="" fill sizes="22vw" loading="lazy" />
            <span className="case-carousel-category">Próximo</span>
            <button type="button" onClick={() => go(1)} aria-label={`Selecionar case ${next.title}`}><span className="case-carousel-next-title">{next.title}</span></button>
          </div>
        </div>
      </div>
      <div className="case-carousel-pagination" aria-label="Selecionar projeto">
        {items.map((item, position) => <button type="button" key={item.slug} className={position === index ? "is-active" : ""} onClick={() => select(position)} aria-label={`Mostrar case ${item.title}`} aria-current={position === index ? "true" : undefined} />)}
      </div>
    </section>
    <section className="case-method"><div className="mh-shell">
      <div className="case-method-heading"><span className="mh-eyebrow">Nosso jeito de fazer</span><h2>Uma boa ideia precisa <em>funcionar no mundo real.</em></h2><p>Os cases mostram marcas e desafios diferentes. Em cada projeto, conectamos o que a empresa oferece ao que as pessoas precisam encontrar.</p></div>
      <div className="case-method-grid">
        <article><span>✳</span><h3>Entender</h3><p>Começamos pela marca, pelo público e pelo caminho que o visitante precisa percorrer.</p></article>
        <article><span>◇</span><h3>Criar</h3><p>Transformamos conteúdo e identidade em uma experiência visual clara e memorável.</p></article>
        <article><span>↗</span><h3>Conectar</h3><p>Organizamos informação e pontos de contato para facilitar o próximo passo.</p></article>
      </div>
    </div></section>
  </>;
}
