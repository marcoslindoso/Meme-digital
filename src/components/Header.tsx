"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Meme Digital — início" onClick={() => setOpen(false)}>
          <Image src="/assets/logo.png" alt="Meme Digital" width={146} height={44} priority />
        </Link>
        <button className="menu-toggle" aria-label="Abrir menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
        <nav className={open ? "nav nav-open" : "nav"} aria-label="Navegação principal">
          <Link href="/#solucoes" onClick={() => setOpen(false)}>Soluções</Link>
          <Link href="/#agencia" onClick={() => setOpen(false)}>Agência</Link>
          <Link href="/insights" onClick={() => setOpen(false)}>Insights</Link>
          <Link href="/institucional" onClick={() => setOpen(false)}>Institucional</Link>
          <Link className="nav-cta" href="/#contato" onClick={() => setOpen(false)}>Contato <span>↗</span></Link>
        </nav>
      </div>
    </header>
  );
}
