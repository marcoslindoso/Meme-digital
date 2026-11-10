"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { BlogSummary } from "@/lib/blog";

const pageSize = 9;
const categories = ["Todos", "Marketing", "Tecnologia", "IA & Marketing", "Performance", "Conversão", "Design"];

export function BlogExplorer({ posts }: { posts: BlogSummary[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [visible, setVisible] = useState(pageSize);
  const filtered = useMemo(() => {
    const normalized = query.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    const list = category === "Todos" && !normalized ? posts.slice(3) : posts;
    return list.filter((post) => {
      if (category !== "Todos" && post.category !== category) return false;
      if (!normalized) return true;
      return `${post.title} ${post.excerpt} ${post.category}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(normalized);
    });
  }, [posts, query, category]);

  return <div className="blog-explorer">
    <div className="blog-explorer-tools">
      <div className="blog-filters" aria-label="Filtrar artigos por assunto">{categories.map((item) => <button type="button" className={category === item ? "is-active" : ""} aria-pressed={category === item} onClick={() => { setCategory(item); setVisible(pageSize); }} key={item}>{item}</button>)}</div>
      <label className="blog-search"><span className="sr-only">Buscar artigos</span><input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setVisible(pageSize); }} placeholder="Buscar um assunto" /><span aria-hidden="true">⌕</span></label>
    </div>
    <p className="blog-results" aria-live="polite">{filtered.length} {filtered.length === 1 ? "artigo encontrado" : "artigos encontrados"}</p>
    {filtered.length > 0 ? <div className="blog-archive-grid">{filtered.slice(0, visible).map((post) => <Link className="blog-archive-card" href={post.href} key={post.id}>
      <div className="blog-archive-image"><Image src={post.image} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 33vw" /></div>
      <div className="blog-card-meta"><span>{post.category}</span><time dateTime={post.date}>{post.dateLabel}</time></div>
      <h3>{post.title}</h3><p>{post.excerpt}</p><span className="blog-card-link">Ler artigo</span>
    </Link>)}</div> : <div className="blog-empty"><strong>Nenhum artigo encontrado.</strong><p>Tente buscar outro termo ou escolha um assunto diferente.</p></div>}
    {filtered.length > visible && <button className="blog-load-more" type="button" onClick={() => setVisible((count) => count + pageSize)}>Carregar mais artigos</button>}
  </div>;
}
