import { WordPressSnapshot } from "@/components/WordPressSnapshot";
import { CasePage, HubPage, isCaseSlug, isHubSlug, isSolutionSlug, SolutionPage } from "@/components/SolutionPage";
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
  if (slug.length === 2 && slug[0] === "solucoes" && isSolutionSlug(slug[1])) return <SolutionPage slug={slug[1]} />;
  if (slug.length === 1 && isHubSlug(slug[0])) return <HubPage slug={slug[0]} />;
  if (slug.length === 1 && isCaseSlug(slug[0])) return <CasePage slug={slug[0]} />;
  const snapshot = await getWordPressPage(`/${slug.join("/")}/`);
  if (!snapshot) notFound();

  return <WordPressSnapshot snapshot={snapshot} />;
}
