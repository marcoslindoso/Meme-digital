import content from "@/data/wordpress-content.json";
import snapshots from "@/data/wordpress-snapshots.json";

type RawPost = {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
};

export type BlogPost = {
  id: number;
  slug: string;
  href: string;
  title: string;
  excerpt: string;
  date: string;
  dateLabel: string;
  category: string;
  image: string;
  readingMinutes: number;
  html: string;
};

export type BlogSummary = Omit<BlogPost, "html">;

const routes = snapshots.routes as Record<string, { headHtml?: string }>;
const fallbackImage = "/agency/colaboracao-unsplash.jpg";

function decodeEntities(value: string) {
  return value
    .replace(/&#x([0-9a-f]+);?/gi, (_, code: string) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&#(\d+);?/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&(amp|quot|apos|lt|gt|nbsp|hellip|ndash|mdash|rsquo|lsquo|rdquo|ldquo);/gi, (_, entity: string) => ({
      amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " ", hellip: "…", ndash: "–", mdash: "—", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“",
    })[entity.toLowerCase() as "amp"] ?? "");
}

function plainText(html: string) {
  return decodeEntities(html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
}

function makeExcerpt(html: string, fallback: string) {
  const intro = plainText(html.match(/<p\b[^>]*>[\s\S]*?<\/p>/i)?.[0] ?? fallback).replace(/(?:\.{3}|…)\s*$/, "").trim();
  if (intro.length <= 190) return intro;
  const cut = intro.slice(0, 190);
  const sentenceEnd = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "), cut.lastIndexOf("? "));
  return sentenceEnd >= 100 ? cut.slice(0, sentenceEnd + 1) : `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

function categoryFor(title: string) {
  if (/\b(IA|GPT|ChatGPT)\b|inteligência artificial|agentes de ia|machine learning/i.test(title)) return "IA & Marketing";
  if (/landing page|conversão|checkout|vendas|funil/i.test(title)) return "Conversão";
  if (/anúncio|tráfego|ads|performance|mídia paga/i.test(title)) return "Performance";
  if (/design|branding|identidade visual|ux\b|ui\b/i.test(title)) return "Design";
  if (/PHP|segurança|tecnologia|aplicativo|app\b|web\b|e-commerce|site\b/i.test(title)) return "Tecnologia";
  return "Marketing";
}

function coverFor(slug: string, html: string) {
  const head = routes[`/${slug}/`]?.headHtml ?? "";
  const value = head.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)/i)?.[1]
    ?? html.match(/<img[^>]+src=["']([^"']+)/i)?.[1];
  if (!value) return fallbackImage;
  const local = value.replace(/^https?:\/\/(?:www\.)?memedigital\.com\.br/i, "").replace(/^http:\/\/localhost:8080/i, "");
  return local.startsWith("/wp-content/") ? local : fallbackImage;
}

function cleanArticleHtml(html: string) {
  return html
    .replace(/<(script|style|iframe|form|noscript)\b[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/\s+(src|href)\s*=\s*(["'])\s*javascript:[\s\S]*?\2/gi, "")
    .replace(/https?:\/\/(?:www\.)?memedigital\.com\.br/gi, "")
    .replace(/http:\/\/localhost:8080/gi, "");
}

const posts: BlogPost[] = (content.posts as RawPost[]).map((raw) => {
  const title = plainText(raw.title.rendered);
  const excerpt = makeExcerpt(raw.content.rendered, raw.excerpt.rendered);
  const bodyText = plainText(raw.content.rendered);
  return {
    id: raw.id,
    slug: raw.slug,
    href: `/${raw.slug}/`,
    title,
    excerpt,
    date: raw.date.slice(0, 10),
    dateLabel: new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${raw.date.slice(0, 10)}T12:00:00Z`)),
    category: categoryFor(title),
    image: coverFor(raw.slug, raw.content.rendered),
    readingMinutes: Math.max(2, Math.ceil(bodyText.split(/\s+/).length / 220)),
    html: cleanArticleHtml(raw.content.rendered),
  };
}).sort((a, b) => b.date.localeCompare(a.date));

export function getBlogPosts() { return posts; }
export function getBlogPost(slug: string) { return posts.find((post) => decodeURIComponent(post.slug) === decodeURIComponent(slug)); }
export function getBlogSummaries(): BlogSummary[] { return posts.map((post) => ({
  id: post.id,
  slug: post.slug,
  href: post.href,
  title: post.title,
  excerpt: post.excerpt,
  date: post.date,
  dateLabel: post.dateLabel,
  category: post.category,
  image: post.image,
  readingMinutes: post.readingMinutes,
})); }
