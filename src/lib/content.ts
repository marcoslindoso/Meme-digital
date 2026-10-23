import content from "@/data/wordpress-content.json";

export type WordpressItem = {
  id: number;
  date: string;
  modified: string;
  slug: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string; protected?: boolean };
  featured_media: number;
  categories?: number[];
};

const decodeMap: Record<string, string> = { "&#8211;": "–", "&#8212;": "—", "&#8216;": "‘", "&#8217;": "’", "&#8220;": "“", "&#8221;": "”", "&amp;": "&", "&quot;": "\"", "&#038;": "&" };
export function plainTitle(value: string) {
  return value.replace(/&(?:#\d+|[a-z]+);/gi, (entity) => decodeMap[entity] ?? entity).replace(/<[^>]+>/g, "");
}

export const pages = content.pages as WordpressItem[];
export const posts = content.posts as WordpressItem[];
export const allContent = [...pages, ...posts];
export function findContent(slug: string) { return allContent.find((item) => item.slug === slug); }
