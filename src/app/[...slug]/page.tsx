import { WordPressSnapshot } from "@/components/WordPressSnapshot";
import { getStaticWordPressRoutes, getWordPressPage } from "@/lib/wordpress-page";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return getStaticWordPressRoutes()
    .filter((route) => route !== "/")
    .map((route) => ({ slug: route.split("/").filter(Boolean) }));
}

export default async function WordPressRoute({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const snapshot = await getWordPressPage(`/${slug.join("/")}/`);
  if (!snapshot) notFound();

  return <WordPressSnapshot snapshot={snapshot} />;
}
