import { WordPressSnapshot } from "@/components/WordPressSnapshot";
import { CasePage, HubPage, isCaseSlug, isHubSlug, isSolutionSlug, SolutionPage } from "@/components/SolutionPage";
import { getStaticWordPressRoutes, getWordPressPage } from "@/lib/wordpress-page";
import { notFound } from "next/navigation";
import { AgencyPage } from "@/components/AgencyPage";
import { caseProjects } from "@/components/case-projects";
import { CulturePage } from "@/components/CulturePage";
import { BlogArticlePage, BlogIndexPage } from "@/components/BlogPages";
import { getBlogPost } from "@/lib/blog";
import type { Metadata } from "next";

export const dynamicParams = false;

export function generateStaticParams() {
  return [...new Set([...getStaticWordPressRoutes(), ...caseProjects.map((project) => `/${project.slug}/`), "/solucoes/ia-engenharia-de-harness/"])]
    .filter((route) => route !== "/")
    .map((route) => ({ slug: route.split("/").filter(Boolean).map((part) => decodeURIComponent(part)) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug.length === 1 && slug[0] === "insights") return {
    title: "Insights | Blog da Meme Digital",
    description: "Artigos sobre marketing, tecnologia, design, inteligência artificial e performance da Meme Digital.",
    alternates: { canonical: "/insights/" },
  };
  if (slug.length === 2 && slug[0] === "solucoes" && slug[1] === "ia-engenharia-de-harness") return {
    title: "IA e Engenharia de Harness | Meme Digital",
    description: "Agentes de IA, automações e engenharia de harness com contexto, ferramentas, limites de ação e avaliação contínua.",
    alternates: { canonical: "/solucoes/ia-engenharia-de-harness/" },
  };
  const post = slug.length === 1 ? getBlogPost(slug[0]) : undefined;
  if (!post) return {};
  return {
    title: `${post.title} | Meme Digital`,
    description: post.excerpt,
    alternates: { canonical: post.href },
    openGraph: { title: post.title, description: post.excerpt, type: "article", images: [post.image], publishedTime: post.date },
  };
}

export default async function WordPressRoute({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  if (slug.length === 2 && slug[0] === "solucoes" && slug[1] === "agencia") return <AgencyPage />;
  if (slug.length === 2 && slug[0] === "solucoes" && isSolutionSlug(slug[1])) return <SolutionPage slug={slug[1]} />;
  if (slug.length === 1 && slug[0] === "insights") return <BlogIndexPage />;
  if (slug.length === 1 && isHubSlug(slug[0])) return <HubPage slug={slug[0]} />;
  if (slug.length === 1 && slug[0] === "cultura-meme") return <CulturePage />;
  if (slug.length === 1 && isCaseSlug(slug[0])) return <CasePage slug={slug[0]} />;
  const post = slug.length === 1 ? getBlogPost(slug[0]) : undefined;
  if (post) return <BlogArticlePage post={post} />;
  const snapshot = await getWordPressPage(`/${slug.join("/")}/`);
  if (!snapshot) notFound();

  return <WordPressSnapshot snapshot={snapshot} />;
}
