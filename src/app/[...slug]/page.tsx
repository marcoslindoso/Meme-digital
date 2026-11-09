import { WordPressSnapshot } from "@/components/WordPressSnapshot";
import { CasePage, HubPage, isCaseSlug, isHubSlug, isSolutionSlug, SolutionPage } from "@/components/SolutionPage";
import { getStaticWordPressRoutes, getWordPressPage } from "@/lib/wordpress-page";
import { notFound } from "next/navigation";
import { AgencyPage } from "@/components/AgencyPage";
import { caseProjects } from "@/components/case-projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return [...new Set([...getStaticWordPressRoutes(), ...caseProjects.map((project) => `/${project.slug}/`)])]
    .filter((route) => route !== "/")
    .map((route) => ({ slug: route.split("/").filter(Boolean) }));
}

export default async function WordPressRoute({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  if (slug.length === 2 && slug[0] === "solucoes" && slug[1] === "agencia") return <AgencyPage />;
  if (slug.length === 2 && slug[0] === "solucoes" && isSolutionSlug(slug[1])) return <SolutionPage slug={slug[1]} />;
  if (slug.length === 1 && isHubSlug(slug[0])) return <HubPage slug={slug[0]} />;
  if (slug.length === 1 && isCaseSlug(slug[0])) return <CasePage slug={slug[0]} />;
  const snapshot = await getWordPressPage(`/${slug.join("/")}/`);
  if (!snapshot) notFound();

  return <WordPressSnapshot snapshot={snapshot} />;
}
