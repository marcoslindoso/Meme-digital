import fs from "node:fs";

const snapshots = JSON.parse(fs.readFileSync("src/data/wordpress-snapshots.json", "utf8"));
const routes = snapshots.routes ?? snapshots;
const slugs = ["aloia-aerospace", "baralho-voluta-medical", "bronte-imoveis", "cafe-cophi", "concept-lar", "icaro-rocks", "neto-ensina", "nur-eventos", "oticas-ipanema-2", "voluta-medical"];
const decode = (value) => value.replace(/<[^>]+>/g, " ")
  .replace(/&nbsp;|&#160;/g, " ").replace(/&amp;/g, "&")
  .replace(/&quot;/g, '"').replace(/&#0*39;|&apos;/g, "'")
  .replace(/&ndash;/g, "–").replace(/&mdash;/g, "—")
  .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
  .replace(/\s+/g, " ").trim();

const copy = {};
for (const slug of slugs) {
  const html = routes[`/${slug}/`]?.bodyHtml;
  if (!html) throw new Error(`Snapshot ausente: ${slug}`);
  const elements = [...html.replace(/<(script|style|noscript)\b[^>]*>[\s\S]*?<\/\1>/gi, "")
    .matchAll(/<(h2|h3|p)\b[^>]*>([\s\S]*?)<\/\1>/gi)]
    .map((match) => ({ tag: match[1].toLowerCase(), text: decode(match[2]) }));
  const start = elements.findIndex((item) => item.tag === "p" && item.text.length > 90 && !item.text.includes("Somos uma agência MARTECH"));
  const end = elements.findIndex((item, index) => index > start && item.tag === "h2" && item.text === "Mais cases para ver");
  if (start < 0 || end < 0) throw new Error(`Conteúdo incompleto: ${slug}`);
  const intro = elements[start].text;
  const sections = [];
  const creditLabels = new Set(["Web developer", "UX & designi", "Social Media", "Performance"]);
  const credits = [];
  let currentCredit = null;
  for (const item of elements.slice(0, end)) {
    if (item.tag !== "p") currentCredit = creditLabels.has(item.text) ? { role: item.text, names: [] } : null;
    else if (currentCredit && item.text.length < 80) {
      currentCredit.names.push(item.text);
      if (!credits.includes(currentCredit)) credits.push(currentCredit);
    }
  }
  for (const item of elements.slice(start + 1, end)) {
    if (item.tag !== "p" && item.text.length > 3) sections.push({ title: item.text, paragraphs: [] });
    else if (item.tag === "p" && item.text && sections.length) sections.at(-1).paragraphs.push(item.text);
  }
  const creditHeadings = new Set(["Web developer", "UX & designi", "Social Media", "Social Midia", "Performance"]);
  copy[slug] = { intro, credits, sections: sections
    .filter((section) => !creditHeadings.has(section.title))
    .map((section) => ({ ...section, paragraphs: section.paragraphs.filter((text) => text.length > 35) }))
    .filter((section) => section.paragraphs.length) };
}
fs.writeFileSync("src/data/original-case-copy.json", `${JSON.stringify(copy, null, 2)}\n`, "utf8");
console.log(`Conteúdo original de ${Object.keys(copy).length} cases exportado.`);
