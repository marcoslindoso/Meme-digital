"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const cardSelector = ".mh-service-card, .mh-insight-card, .agency-service-card, .sp-offering-card, .blog-feature-card, .blog-archive-card, .cm-principles-grid > article, .cm-ways-grid > article, .ip-principles > article, .case-method-grid > article";
const imageSelector = ".mh-feature-media, .mh-story-media, .sp-feature-image, .agency-feature-image, .agency-growth-image, .offering-preview-card, .mh-awards-slider, .cm-purpose-image, .site-case-desktop, .site-case-mobile, .case-detail-images > div";
const blockSelector = ".mh-reveal, main h2, .mh-contact h2, .solution-cases-heading, .solution-cases-track, .ip-team-carousel, .blog-section-heading, .case-detail-story, .mh-contact-form, .sp-feature-grid > div:last-child";
const excludeSelector = ".mh-intro, .mh-header, .mh-footer, .blog-prose, .case-carousel-stage, .solution-cases-track > article, .ip-team-track, [role='dialog']";

export function ModernEffects() {
  const pathname = usePathname();
  useEffect(() => {
    // WordPress snapshots carry page-specific classes on <body>. Clear them when
    // navigating back to the native Next.js home without a full page reload.
    document.body.className = "";

    const root = document.querySelector<HTMLElement>(".modern-site");
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    let mutations: MutationObserver | undefined;
    let frame = 0;

    root?.querySelectorAll(".mh-reveal").forEach((element) => element.classList.add("is-visible"));
    if (root && !motionPreference.matches && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            (entry.target as HTMLElement).dataset.mhEnterState = "visible";
            observer?.unobserve(entry.target);
          });
        },
        { threshold: 0.06, rootMargin: "0px 0px -36px" },
      );
      const prepare = () => {
        frame = 0;
        if (motionPreference.matches) return;
        const candidates = Array.from(root.querySelectorAll<HTMLElement>(`${cardSelector}, ${imageSelector}, ${blockSelector}`));
        const candidateSet = new Set(candidates);
        candidates.forEach((element) => {
          if (element.dataset.mhEnter) {
            if (element.dataset.mhEnterState === "pending") observer?.observe(element);
            return;
          }
          if (element.closest(excludeSelector)) return;
          let parent = element.parentElement;
          while (parent && parent !== root) {
            if (candidateSet.has(parent)) return;
            parent = parent.parentElement;
          }
          const kind = element.matches(cardSelector) ? "card"
            : element.matches(imageSelector) ? "image"
              : element.matches("h2, header") ? "title" : "content";
          element.dataset.mhEnter = kind;
          const bounds = element.getBoundingClientRect();
          // Navigation opens with a ready first screen; only lower sections reveal on scroll.
          if (bounds.top < window.innerHeight * 0.96 || bounds.width === 0 || bounds.height === 0) {
            element.dataset.mhEnterState = "done";
            return;
          }
          if (kind === "card" && element.parentElement) {
            const siblings = Array.from(element.parentElement.children).filter((child) => child.matches(cardSelector));
            element.style.setProperty("--mh-enter-delay", `${Math.min(siblings.indexOf(element) % 4 * 110, 330)}ms`);
          }
          element.dataset.mhEnterState = "pending";
          observer?.observe(element);
        });
      };
      prepare();
      mutations = new MutationObserver((records) => {
        const hasNewContent = records.some((record) => record.addedNodes.length > 0 && !(record.target instanceof Element && record.target.closest(".mh-intro")));
        if (hasNewContent && !frame) frame = window.requestAnimationFrame(prepare);
      });
      mutations.observe(root, { childList: true, subtree: true });
    }

    const finish = (event: AnimationEvent) => {
      if (event.animationName.startsWith("mh-section-") && event.target instanceof HTMLElement && event.target.hasAttribute("data-mh-enter")) {
        event.target.dataset.mhEnterState = "done";
      }
    };
    const showFocused = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest<HTMLElement>('[data-mh-enter-state="pending"]');
      if (target) {
        target.dataset.mhEnterState = "done";
        observer?.unobserve(target);
      }
    };
    const reduceMotion = () => {
      if (!motionPreference.matches) return;
      observer?.disconnect();
      root?.querySelectorAll<HTMLElement>("[data-mh-enter]").forEach((element) => { element.dataset.mhEnterState = "done"; });
    };
    root?.addEventListener("animationend", finish);
    root?.addEventListener("focusin", showFocused);
    motionPreference.addEventListener("change", reduceMotion);

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
      mutations?.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      root?.removeEventListener("animationend", finish);
      root?.removeEventListener("focusin", showFocused);
      motionPreference.removeEventListener("change", reduceMotion);
    };
  }, [pathname]);

  return null;
}

declare global {
  interface Window {
    neuroleadId?: string;
  }
}
