import Image from "next/image";
import Link from "next/link";

type CaseItem = {
  slug: string;
  title: string;
  category: string;
  project: string;
  intro: string;
  image: string;
};

export function CasesScroller({ items }: { items: ReadonlyArray<CaseItem> }) {
  return <section className="case-scroll" aria-label="Portfólio de projetos">
    <div className="case-scroll-head mh-shell">
      <div><span className="mh-eyebrow">Cases e portfólio</span><h2>Projetos que<br /><em>saem do papel.</em></h2></div>
      <p>{items.length} projetos selecionados</p>
    </div>
    <div className="case-scroll-grid mh-shell">
      {items.map((item, index) => <Link className="case-scroll-card" href={`/${item.slug}/`} key={item.slug}>
        <div className="case-scroll-image"><Image src={item.image} alt={`Projeto ${item.title}`} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" /><span>{String(index + 1).padStart(2, "0")}</span><b>Ver projeto ↗</b></div>
        <small>{item.category} · {item.project}</small><h3>{item.title}</h3><p>{item.intro}</p>
      </Link>)}
    </div>
  </section>;
}
