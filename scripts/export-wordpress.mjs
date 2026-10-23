import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const baseUrl = (process.env.WORDPRESS_URL || "http://localhost:8080").replace(/\/$/, "");
const output = resolve("src/data/wordpress-content.json");
const fields = "id,date,modified,slug,link,title,excerpt,content,featured_media,categories";

async function fetchCollection(type) {
  const first = await fetch(`${baseUrl}/wp-json/wp/v2/${type}?per_page=100&page=1&_fields=${fields}`);
  if (!first.ok) throw new Error(`WordPress ${type}: ${first.status} ${first.statusText}`);
  const totalPages = Number(first.headers.get("x-wp-totalpages") || 1);
  const items = await first.json();
  for (let page = 2; page <= totalPages; page += 1) {
    const response = await fetch(`${baseUrl}/wp-json/wp/v2/${type}?per_page=100&page=${page}&_fields=${fields}`);
    if (!response.ok) throw new Error(`WordPress ${type} page ${page}: ${response.status}`);
    items.push(...await response.json());
  }
  return items;
}

function normalize(value) {
  return JSON.parse(JSON.stringify(value)
    .replaceAll(`${baseUrl}/wp-content/`, "/wp-content/")
    .replaceAll("https://memedigital.com.br/wp-content/", "/wp-content/")
    .replaceAll("http://memedigital.com.br/wp-content/", "/wp-content/"));
}

const [pages, posts] = await Promise.all([fetchCollection("pages"), fetchCollection("posts")]);
const payload = normalize({ generatedAt: new Date().toISOString(), source: baseUrl, pages, posts });
await mkdir(dirname(output), { recursive: true });
await writeFile(output, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
console.log(`Exportado: ${pages.length} paginas e ${posts.length} posts -> ${output}`);
