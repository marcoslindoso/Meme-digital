"use client";

import { useEffect } from "react";

export function ModernEffects() {
  useEffect(() => {
    // WordPress snapshots carry page-specific classes on <body>. Clear them when
    // navigating back to the native Next.js home without a full page reload.
    document.body.className = "";

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".mh-reveal"));
    let observer: IntersectionObserver | undefined;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            (entry.target as HTMLElement).classList.add("is-visible");
            observer?.unobserve(entry.target);
          });
        },
        { threshold: 0.14, rootMargin: "0px 0px -48px" },
      );
      elements.forEach((element) => observer?.observe(element));
    }

    const hero = document.querySelector<HTMLElement>(".mh-hero");
    const onPointerMove = (event: PointerEvent) => {
      if (!hero || reducedMotion) return;
      const rect = hero.getBoundingClientRect();
      hero.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
      hero.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
    };
    hero?.addEventListener("pointermove", onPointerMove, { passive: true });

    if (!document.querySelector('script[src*="cdn.leadster.com.br/neurolead"]')) {
      window.neuroleadId = "45pZEB7bj5x7KYoPVWdocmSxR";
      const script = document.createElement("script");
      script.src = "https://cdn.leadster.com.br/neurolead/neurolead.min.js";
      script.charset = "UTF-8";
      script.defer = true;
      document.head.appendChild(script);
    }

    return () => {
      observer?.disconnect();
      hero?.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return null;
}

declare global {
  interface Window {
    neuroleadId?: string;
  }
}
