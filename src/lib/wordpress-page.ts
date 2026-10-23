import content from "@/data/wordpress-content.json";
import snapshotData from "@/data/wordpress-snapshots.json";

export type WordPressPageSnapshot = {
  bodyClass: string;
  bodyHtml: string;
  headHtml: string;
  title: string;
};

type ContentItem = {
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
};

const storedRoutes = snapshotData.routes as Record<string, WordPressPageSnapshot>;
const fallbackItems = [...content.pages, ...content.posts] as ContentItem[];
const emptyLogoLinkPattern = /(<div\b(?=[^>]*\belementor-widget-theme-site-logo\b)[^>]*>[\s\S]*?<a\b[^>]*\bhref=)(["'])\2/gi;

function pointLogoToHome(html: string) {
  return html.replace(
    emptyLogoLinkPattern,
    (_match, prefix: string, quote: string) => `${prefix}${quote}/${quote}`,
  );
}

function normalizeRoute(pathname: string) {
  const clean = pathname.split(/[?#]/, 1)[0] || "/";
  if (clean === "/") return clean;
  return `/${clean.replace(/^\/+|\/+$/g, "")}/`;
}

function decodeTitle(value: string) {
  return value
    .replaceAll("&#8211;", "–")
    .replaceAll("&#8212;", "—")
    .replaceAll("&#8216;", "‘")
    .replaceAll("&#8217;", "’")
    .replaceAll("&#8220;", "“")
    .replaceAll("&#8221;", "”")
    .replaceAll("&#038;", "&")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replace(/<[^>]+>/g, "");
}

function normalizeFallbackHtml(html: string) {
  return html
    .replaceAll("https://www.memedigital.com.br", "")
    .replaceAll("http://www.memedigital.com.br", "")
    .replaceAll("https://memedigital.com.br", "")
    .replaceAll("http://memedigital.com.br", "")
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<iframe\b[\s\S]*?<\/iframe>/gi, "")
    .replace(/<img\b[^>]*>/gi, "");
}

function fallbackSnapshot(item: ContentItem): WordPressPageSnapshot {
  const title = decodeTitle(item.title.rendered);
  return {
    title,
    bodyClass: "standalone-content",
    headHtml: "",
    bodyHtml: `<header class="standalone-header"><a href="/" aria-label="Meme Digital"><img src="/assets/logo.png" alt="Meme Digital"></a><nav><a href="/">Início</a><a href="/insights/">Insights</a><a href="/institucional/">Institucional</a></nav></header><main class="standalone-article"><a class="standalone-back" href="/insights/">← Voltar</a><h1>${title}</h1><article>${normalizeFallbackHtml(item.content.rendered)}</article></main>`,
  };
}

export async function getWordPressPage(pathname = "/"): Promise<WordPressPageSnapshot | null> {
  const route = normalizeRoute(pathname);
  const stored = storedRoutes[route];
  if (stored) {
    return {
      ...stored,
      bodyHtml: pointLogoToHome(stored.bodyHtml),
    };
  }

  const slug = route.split("/").filter(Boolean).at(-1);
  const item = fallbackItems.find((entry) => entry.slug === slug);
  return item ? fallbackSnapshot(item) : null;
}

export function getStaticWordPressRoutes() {
  const routes = new Set(Object.keys(storedRoutes));
  for (const item of fallbackItems) routes.add(`/${item.slug}/`);
  return [...routes];
}
