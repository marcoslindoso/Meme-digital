"use client";

import { useEffect, useRef } from "react";

export function HomeIntro() {
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intro = introRef.current;
    if (!intro) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const distance = Math.max(1, intro.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -intro.getBoundingClientRect().top / distance));
      // Finish early so the hero stays clear before the intro returns on upward scroll.
      const reveal = Math.min(1, progress / 0.6);
      const scale = 1 + 10 * reveal * reveal;
      const opacity = Math.min(1, Math.max(0, (0.98 - reveal) / 0.36));

      intro.style.setProperty("--mh-intro-scale", String(scale));
      intro.style.setProperty("--mh-intro-opacity", String(opacity));
      intro.style.setProperty("--mh-intro-ui-opacity", String(Math.min(1, Math.max(0, (0.45 - reveal) / 0.25))));
      intro.classList.toggle("is-complete", reveal >= 0.98);
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="mh-intro" ref={introRef} aria-hidden="true">
    <div className="mh-intro-sticky">
      <div className="mh-intro-ink" />
      <svg className="mh-intro-wall" width="100%" height="100%" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="mh-intro-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f0f4ff" />
            <stop offset="50%" stopColor="#fffafc" />
            <stop offset="100%" stopColor="#f5eefe" />
          </linearGradient>
          <mask id="mh-intro-letter-mask" x="0" y="0" width="100%" height="100%" maskUnits="userSpaceOnUse">
            <rect width="100%" height="100%" fill="white" />
            <text x="50%" y="44%" textAnchor="middle" fill="black">Marketing</text>
            <text x="50%" y="65%" textAnchor="middle" fill="black">Digital</text>
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#mh-intro-gradient)" mask="url(#mh-intro-letter-mask)" />
      </svg>
      <div className="mh-intro-ui">
        <div className="mh-intro-scroll">Role para entrar <span aria-hidden="true">↓</span></div>
      </div>
    </div>
  </div>;
}
