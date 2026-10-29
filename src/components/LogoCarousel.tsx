"use client";

import Image from "next/image";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

type LogoCarouselProps = { logos: string[] };

export function LogoCarousel({ logos }: LogoCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const railTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    const track = carousel?.querySelector<HTMLElement>(".mh-logo-track");
    if (!carousel || !track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      railTween.current = gsap.to(track, {
        x: -(track.scrollWidth / 2),
        duration: 52,
        ease: "none",
        repeat: -1,
      });

      gsap.to(".mh-logo-item", {
        y: (index) => index % 2 === 0 ? -5 : 5,
        rotation: (index) => index % 2 === 0 ? -1 : 1,
        duration: 1.9,
        ease: "sine.inOut",
        stagger: { each: 0.06, from: "random" },
        repeat: -1,
        yoyo: true,
      });
    }, carousel);

    return () => {
      railTween.current = null;
      context.revert();
    };
  }, []);

  const pause = () => railTween.current?.pause();
  const resume = () => railTween.current?.play();

  return (
    <div className="mh-logo-carousel" ref={carouselRef} aria-label="Logotipos de clientes" onPointerEnter={pause} onPointerLeave={resume}>
      <div className="mh-logo-track">
        {[...logos, ...logos].map((logo, index) => (
          <span className="mh-logo-item" key={`${logo}-${index}`} aria-hidden={index >= logos.length}>
            <Image src={`/logos/${logo}`} alt={index < logos.length ? "Marca parceira da Meme Digital" : ""} width={180} height={90} />
          </span>
        ))}
      </div>
    </div>
  );
}
