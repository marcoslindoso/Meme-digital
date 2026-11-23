"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ServiceIcon } from "@/components/ModernHeader";

const titles = ["Marketing Digital", "Martech", "Tecnologia", "Performance", "Meme Digital"];
const serviceIcons = ["agency", "web", "design", "performance", "products", "metaverse", "harness"];

function Letters({ text, offset = 0 }: { text: string; offset?: number }) {
  return Array.from(text).map((letter, index) => <tspan className="mh-intro-letter" key={index} style={{ "--letter-index": index + offset } as CSSProperties}>{letter}</tspan>);
}

function IntroLettering({ index, mask }: { index: number; mask: boolean }) {
  if (index === titles.length - 1) {
    return <>
      <image className="mh-intro-logo" href="/icon.svg" x="14%" y="35%" width="16%" height="28%" preserveAspectRatio="xMidYMid meet" filter={`url(#mh-intro-${mask ? "black" : "pink"})`} />
      <text className="mh-intro-final-line-one" x="58%" y="47%" textAnchor="middle"><Letters text="MEME" /></text>
      <text className="mh-intro-final-line-two" x="58%" y="65%" textAnchor="middle"><Letters text="DIGITAL" offset={2} /></text>
    </>;
  }
  if (index === 0) {
    return <><text className="mh-intro-line-one" x="50%" y="44%" textAnchor="middle"><Letters text="Marketing" /></text><text className="mh-intro-line-two" x="50%" y="65%" textAnchor="middle"><Letters text="Digital" offset={3} /></text></>;
  }
  return <text className="mh-intro-single-word" x="50%" y="56%" textAnchor="middle"><Letters text={titles[index]} /></text>;
}

export function HomeIntro({ children }: { children: ReactNode }) {
  const introRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const revealedRef = useRef(false);
  const enteringRef = useRef(false);
  const [titleIndex, setTitleIndex] = useState(0);
  const [swapping, setSwapping] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let index = 0;
    let timer = 0;
    let swapTimer = 0;
    const beginSwap = () => {
      if (document.hidden || enteringRef.current || revealedRef.current) {
        timer = window.setTimeout(beginSwap, 400);
        return;
      }
      setSwapping(true);
      swapTimer = window.setTimeout(() => {
        if (!enteringRef.current) {
          index = (index + 1) % titles.length;
          setTitleIndex(index);
        }
        setSwapping(false);
        timer = window.setTimeout(beginSwap, 3800);
      }, 2200);
    };
    timer = window.setTimeout(beginSwap, 3800);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(swapTimer);
    };
  }, []);

  useEffect(() => {
    const intro = introRef.current;
    const hero = heroRef.current;
    if (!intro || !hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let portalScale = 128;
    const update = () => {
      frame = 0;
      // The sticky header changes height; its layout offset must not keep the intro paused at the top.
      const restingZone = 32;
      const progress = Math.min(1, Math.max(0, (window.scrollY - restingZone) / (window.innerHeight * 1.2 - restingZone)));
      const entering = progress > 0;
      if (entering && !enteringRef.current) {
        intro.querySelectorAll<SVGTSpanElement>(".mh-intro-solid .mh-intro-letter").forEach((letter) => {
          letter.style.setProperty("--mh-intro-frozen-color", getComputedStyle(letter).color);
        });
        // Aim into a solid stroke, rather than the empty space between the two lines.
        intro.classList.add("is-entering");
        const wall = intro.querySelector<SVGSVGElement>(".mh-intro-wall");
        const letter = intro.querySelector<SVGTSpanElement>(".mh-intro-solid .mh-intro-letter");
        if (wall && letter) {
          const wallBox = wall.getBoundingClientRect();
          const box = letter.getBoundingClientRect();
          const stem = letter.textContent === "T" ? 0.5 : 0.17;
          intro.style.setProperty("--mh-intro-origin-x", `${box.left - wallBox.left + box.width * stem}px`);
          intro.style.setProperty("--mh-intro-origin-y", `${box.top - wallBox.top + box.height * 0.55}px`);
          portalScale = Math.min(180, Math.max(48, window.innerWidth / Math.max(1, box.width * 0.13), window.innerHeight / Math.max(1, box.height * 0.45)) * 1.2);
        }
      } else if (!entering) {
        intro.classList.remove("is-entering");
      }
      enteringRef.current = entering;
      // Leave a clear stretch of the hero before the intro returns on upward scroll.
      const reveal = Math.min(1, progress / 0.6);
      intro.style.setProperty("--mh-intro-scale", String(Math.exp(Math.log(portalScale) * Math.pow(reveal, 1.8))));
      intro.style.setProperty("--mh-intro-opacity", String(Math.min(1, Math.max(0, (1 - reveal) / 0.06))));
      const inkOpacity = (1 - 0.42 * Math.min(1, reveal / 0.18)) * Math.min(1, Math.max(0, (1 - reveal) / 0.28));
      intro.style.setProperty("--mh-intro-ink-opacity", String(inkOpacity));
      intro.style.setProperty("--mh-intro-ui-opacity", String(Math.max(0, 1 - reveal / 0.24)));
      revealedRef.current = reveal >= 0.98;
      intro.classList.toggle("is-complete", revealedRef.current);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const measure = () => {
      intro.style.setProperty("--mh-intro-hero-height", `${hero.offsetHeight}px`);
      schedule();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(hero);
    measure();
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const intro = introRef.current;
    if (!intro) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      frame = 0;
      intro.style.setProperty("--mh-intro-pointer-x", `${x}px`);
      intro.style.setProperty("--mh-intro-pointer-y", `${y}px`);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(apply);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !finePointer.matches || reducedMotion.matches || enteringRef.current) return;
      x = (event.clientX / window.innerWidth * 2 - 1) * 28;
      y = (event.clientY / window.innerHeight * 2 - 1) * 22;
      schedule();
    };
    const reset = () => {
      x = 0;
      y = 0;
      schedule();
    };
    intro.addEventListener("pointermove", move, { passive: true });
    intro.addEventListener("pointerleave", reset);
    reducedMotion.addEventListener("change", reset);
    finePointer.addEventListener("change", reset);
    return () => {
      intro.removeEventListener("pointermove", move);
      intro.removeEventListener("pointerleave", reset);
      reducedMotion.removeEventListener("change", reset);
      finePointer.removeEventListener("change", reset);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const renderTitles = (mask = false) => [titleIndex, (titleIndex + 1) % titles.length].map((index, position) => <g
    key={titles[index]}
    className={`mh-intro-title is-active is-${position === 0 ? "current" : "next"}`}
    clipPath={`url(#mh-intro-${position === 0 ? "current" : "next"}-clip)`}
  ><IntroLettering index={index} mask={mask} /></g>);

  return <div className="mh-intro" ref={introRef}>
    <div className="mh-intro-sticky">
      <div className="mh-intro-home" ref={heroRef}>{children}</div>
      <svg className={`mh-intro-wall${swapping ? " is-swapping" : ""}`} width="100%" height="100%" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="mh-intro-current-clip"><rect className="mh-intro-clip-current" width="100%" height="100%" /></clipPath>
          <clipPath id="mh-intro-next-clip"><rect className="mh-intro-clip-next" width="0" height="100%" /></clipPath>
          <linearGradient id="mh-intro-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f0f4ff" />
            <stop offset="50%" stopColor="#fffafc" />
            <stop offset="100%" stopColor="#f5eefe" />
          </linearGradient>
          <filter id="mh-intro-black"><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" /></filter>
          <filter id="mh-intro-pink"><feFlood floodColor="#F22066" /><feComposite in2="SourceAlpha" operator="in" /></filter>
          <mask id="mh-intro-letter-mask" x="0" y="0" width="100%" height="100%" maskUnits="userSpaceOnUse" style={{ maskType: "luminance" }}>
            <rect width="100%" height="100%" fill="white" />
            <g className="mh-intro-mask-content" fill="black">{renderTitles(true)}</g>
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#mh-intro-gradient)" mask="url(#mh-intro-letter-mask)" />
        <g className="mh-intro-solid">{renderTitles()}</g>
      </svg>
      <div className="mh-intro-ui" aria-hidden="true">
        {serviceIcons.map((icon, index) => <div className={`mh-intro-service-icon mh-intro-service-icon-${index}`} key={icon}><ServiceIcon icon={icon} /></div>)}
        <div className="mh-intro-scroll">Role para entrar <span>↓</span></div>
      </div>
    </div>
  </div>;
}
