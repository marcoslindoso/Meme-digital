type OfferingIconName =
  | "seo" | "performance" | "growth" | "planning" | "copy" | "automation"
  | "web" | "app" | "commerce" | "design" | "launch" | "vr";

export function OfferingIcon({ name }: { name: OfferingIconName }) {
  const drawing = {
    seo: <><circle cx="13" cy="12" r="6" /><path d="m17.5 16.5 5 5M4 25h21M7 25v-4m5 4v-6m5 6v-4" /></>,
    performance: <><path d="M4 24h24M7 19l6-6 5 4 8-10M22 7h4v4" /><circle cx="7" cy="19" r="1.5" /></>,
    growth: <><path d="M5 26h22M8 26v-8h5v8m3 0V13h5v13m3 0V8h4v18M6 11l6-5 5 3 7-6" /></>,
    planning: <><rect x="5" y="6" width="22" height="21" rx="3" /><path d="M5 12h22M11 3v6m10-6v6m-11 9 2 2 4-4m3 3h4" /></>,
    copy: <><path d="m7 23-2 5 5-2L26 10l-3-3L7 23zM20 10l3 3M8 6h10M8 11h7M8 16h3" /></>,
    automation: <><rect x="3" y="12" width="8" height="8" rx="2" /><rect x="21" y="4" width="8" height="8" rx="2" /><rect x="21" y="21" width="8" height="8" rx="2" /><path d="M11 16h6a8 8 0 0 0 8-8M11 16h6a8 8 0 0 1 8 9" /></>,
    web: <><rect x="3" y="5" width="26" height="19" rx="3" /><path d="M3 11h26M12 28h8m-4-4v4m-6-12-3 2 3 2m12-4 3 2-3 2" /></>,
    app: <><rect x="9" y="3" width="14" height="26" rx="3" /><path d="M14 7h4m-3 18h2M5 10l-2 2 2 2m22-4 2 2-2 2" /></>,
    commerce: <><path d="M4 7h4l3 15h15l3-11H9M13 27h.01M24 27h.01" /><path d="M15 6h10m-5-5v10" /></>,
    design: <><path d="M16 3 29 16 16 29 3 16 16 3zM3 16h26M11 16l5 13 5-13M11 16l5-13 5 13" /></>,
    launch: <><path d="M11 22c1-8 6-14 15-18 2 9-2 17-10 20l-5-2zM11 22l-5 4 2-8 5-2m3 8-2 5 8-3 1-5M5 27l-2 3" /><circle cx="20" cy="11" r="2" /></>,
    vr: <><path d="M5 12h22a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-6l-3-4h-4l-3 4H5a3 3 0 0 1-3-3v-7a3 3 0 0 1 3-3zM10 17h3m-1.5-1.5v3M22 17h.01M25 19h.01" /></>,
  }[name];

  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{drawing}</svg>;
}

export type { OfferingIconName };
