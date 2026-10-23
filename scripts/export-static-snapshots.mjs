import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, extname, posix, resolve } from "node:path";

const projectRoot = process.cwd();
const wordpressRoot = resolve(projectRoot, "..", "site");
const wordpressUrl = (process.env.WORDPRESS_URL || "http://127.0.0.1:8080").replace(/\/$/, "");
const contentPath = resolve(projectRoot, "src/data/wordpress-content.json");
const outputPath = resolve(projectRoot, "src/data/wordpress-snapshots.json");
const publicRoot = resolve(projectRoot, "public");

const content = JSON.parse(await readFile(contentPath, "utf8"));
const priorityRoutes = [
  "/",
  "/cases/",
  "/cultura-meme/",
  "/insights/",
  "/institucional/",
  "/baralho-voluta-medical/",
  "/neto-ensina/",
  "/nur-eventos/",
  "/o-que-e-marketing-digital-martech-e-agencias-digitais/",
  "/solucoes/agencia/",
  "/solucoes/agencia-2/",
  "/solucoes/design/",
  "/solucoes/metaverso/",
  "/solucoes/performance-ads/",
  "/solucoes/produtos-digitais/",
  "/solucoes/tech-web/",
];

for (const item of [...content.pages, ...content.posts]) {
  priorityRoutes.push(new URL(item.link).pathname);
}

const routes = [...new Set(priorityRoutes.map(normalizeRoute))];
const snapshots = {};
const assetPaths = new Set();

for (const route of routes) {
  const response = await fetch(`${wordpressUrl}${route}`, {
    headers: { "User-Agent": "Meme-Digital-Static-Export" },
  });

  if (!response.ok) {
    console.warn(`Ignorado ${route}: HTTP ${response.status}`);
    continue;
  }

  const html = await response.text();
  const snapshot = createSnapshot(html);
  snapshots[route] = snapshot;
  collectAssets(`${snapshot.headHtml}\n${snapshot.bodyHtml}`, assetPaths);
  console.log(`Capturado: ${route}`);
}

await collectCssDependencies(assetPaths);

let copied = 0;
let bytes = 0;
for (const assetPath of [...assetPaths].sort()) {
  const cleanPath = assetPath.replace(/^\/+/, "");
  const source = resolve(wordpressRoot, cleanPath);
  const destination = resolve(publicRoot, cleanPath);
  if (!source.startsWith(wordpressRoot) || !destination.startsWith(publicRoot)) continue;

  try {
    const data = await readFile(source);
    await mkdir(dirname(destination), { recursive: true });
    await copyFile(source, destination);
    copied += 1;
    bytes += data.byteLength;
  } catch {
    console.warn(`Asset ausente: /${cleanPath}`);
  }
}

const payload = { generatedAt: new Date().toISOString(), routes: snapshots };
await writeFile(outputPath, `${JSON.stringify(payload)}\n`, "utf8");
console.log(`Exportado: ${Object.keys(snapshots).length} rotas e ${copied} assets (${(bytes / 1024 / 1024).toFixed(1)} MB).`);

function normalizeRoute(value) {
  const pathname = value.split(/[?#]/, 1)[0] || "/";
  if (pathname === "/") return pathname;
  return `/${pathname.replace(/^\/+|\/+$/g, "")}/`;
}

function match(html, expression) {
  return expression.exec(html)?.[1] ?? "";
}

function createSnapshot(html) {
  const bodyClass = match(html, /<body[^>]*class=["']([^"']*)["'][^>]*>/i);
  const bodyHtml = match(html, /<body[^>]*>([\s\S]*?)<\/body>/i);
  const headHtml = match(html, /<head[^>]*>([\s\S]*?)<\/head>/i);
  const title = match(html, /<title[^>]*>([\s\S]*?)<\/title>/i).replace(/<[^>]+>/g, "").trim();
  return { bodyClass, bodyHtml: pointToNext(bodyHtml), headHtml: pointToNext(headHtml), title };
}

function pointToNext(html) {
  return html
    .replaceAll("https://www.memedigital.com.br", "")
    .replaceAll("http://www.memedigital.com.br", "")
    .replaceAll("https://memedigital.com.br", "")
    .replaceAll("http://memedigital.com.br", "")
    .replaceAll("http://localhost:8080", "")
    .replaceAll("http://127.0.0.1:8080", "")
    .replaceAll("https:\\/\\/www.memedigital.com.br", "")
    .replaceAll("http:\\/\\/www.memedigital.com.br", "")
    .replaceAll("https:\\/\\/memedigital.com.br", "")
    .replaceAll("http:\\/\\/memedigital.com.br", "")
    .replaceAll("http:\\/\\/localhost:8080", "")
    .replaceAll("http:\\/\\/127.0.0.1:8080", "")
    .replaceAll("https%3A%2F%2Fwww.memedigital.com.br", "")
    .replaceAll("http%3A%2F%2Fwww.memedigital.com.br", "")
    .replaceAll("https%3A%2F%2Fmemedigital.com.br", "")
    .replaceAll("http%3A%2F%2Fmemedigital.com.br", "")
    .replaceAll("http%3A%2F%2Flocalhost%3A8080", "")
    .replaceAll("http%3A%2F%2F127.0.0.1%3A8080", "")
    .replace(
      /(<div\b(?=[^>]*\belementor-widget-theme-site-logo\b)[^>]*>[\s\S]*?<a\b[^>]*\bhref=)(["'])\2/gi,
      (_match, prefix, quote) => `${prefix}${quote}/${quote}`,
    )
    .replaceAll("[trustindex no-registration=google]", '<div id="next-testimonials-root"></div>')
    .replace(/<link\b[^>]*\/wp-content\/uploads\/elementor\/google-fonts\/css\/[^>]*>/gi, "")
    .replace(/<link\b[^>]*(?:\/wp-json\/|\/feed\/|xmlrpc\.php)[^>]*>/gi, "");
}

function collectAssets(text, target) {
  const normalized = text.replaceAll("\\/", "/").replaceAll("&amp;", "&").replaceAll("&#038;", "&");
  const pattern = /(?:https?:\/\/(?:www\.)?memedigital\.com\.br|https?:\/\/(?:localhost|127\.0\.0\.1):8080)?(\/wp-(?:content|includes)\/[^"'\s<>),;]+)/gi;
  for (const result of normalized.matchAll(pattern)) {
    const clean = result[1].split(/[?#]/, 1)[0];
    if (clean && !clean.includes("*") && /\.[a-z0-9]{2,6}$/i.test(clean)) {
      target.add(decodeURIComponent(clean));
    }
  }
}

async function collectCssDependencies(target) {
  const visited = new Set();
  const pending = [...target].filter((asset) => extname(asset).toLowerCase() === ".css");

  while (pending.length > 0) {
    const cssPath = pending.shift();
    if (!cssPath || visited.has(cssPath)) continue;
    visited.add(cssPath);

    const source = resolve(wordpressRoot, cssPath.replace(/^\/+/, ""));
    let css;
    try {
      css = await readFile(source, "utf8");
    } catch {
      continue;
    }

    for (const result of css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)) {
      const reference = result[1].split(/[?#]/, 1)[0];
      if (!reference || /^(?:data:|https?:\/\/)/i.test(reference)) continue;
      const resolved = reference.startsWith("/")
        ? reference
        : posix.resolve(posix.dirname(cssPath), reference);
      target.add(resolved);
      if (extname(resolved).toLowerCase() === ".css" && !visited.has(resolved)) pending.push(resolved);
    }
  }
}
