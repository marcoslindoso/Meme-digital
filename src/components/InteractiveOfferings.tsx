"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { OfferingIcon, type OfferingIconName } from "@/components/OfferingIcon";

type Offering = {
  title: string;
  text: string;
  icon: OfferingIconName;
  image: string;
  tags?: string;
};

export function InteractiveOfferings({ items, solution, variant }: {
  items: Offering[];
  solution: string;
  variant: "agency" | "generic";
}) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return <div className={`interactive-offerings interactive-offerings-${variant}${items.length <= 2 ? " is-compact" : ""}`}>
    <div className="offering-preview-card" aria-label={`Imagem de ${current.title}`}>
      {items.map((item, index) => <Image
        key={item.title}
        className={`offering-preview-image${index === active ? " is-active" : ""}`}
        src={item.image}
        alt=""
        fill
        sizes="(max-width: 760px) 100vw, 42vw"
      />)}
      <div className="offering-preview-caption" aria-live="polite">
        <span>{solution} · Em destaque</span>
        <strong>{current.title}</strong>
      </div>
    </div>
    <div className={variant === "agency" ? "agency-service-grid" : "sp-offering-grid"}>
      {items.map((item, index) => <article
        key={item.title}
        className={`${variant === "agency" ? "agency-service-card" : "sp-offering-card"}${index === active ? " is-active" : ""}`}
        onMouseEnter={() => setActive(index)}
        onFocusCapture={() => setActive(index)}
      >
        <span className={variant === "agency" ? "agency-icon" : "sp-offering-icon"}><OfferingIcon name={item.icon} /></span>
        <h3><button type="button" onClick={() => setActive(index)} aria-pressed={index === active}>{item.title}</button></h3>
        <p>{item.text}</p>
        {item.tags && <small>{item.tags}</small>}
        <Link href="#contato">Fale com um especialista <span aria-hidden>↗</span></Link>
      </article>)}
    </div>
  </div>;
}
