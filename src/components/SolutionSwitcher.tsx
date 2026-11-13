import Link from "next/link";

const solutions = [
  { slug: "agencia", label: "Agência" },
  { slug: "tech-web", label: "Tech & Web" },
  { slug: "design", label: "Design" },
  { slug: "performance-ads", label: "Performance Ads" },
  { slug: "produtos-digitais", label: "Produtos Digitais" },
  { slug: "metaverso", label: "Metaverso" },
  { slug: "ia-engenharia-de-harness", label: "IA e Engenharia de Harness" },
] as const;

export function SolutionSwitcher({ active }: { active: string }) {
  return <nav className="solution-switcher" aria-label="Escolher solução">
    {solutions.map((solution) => <Link
      key={solution.slug}
      href={`/solucoes/${solution.slug}`}
      className={solution.slug === active ? "is-current" : undefined}
      aria-current={solution.slug === active ? "page" : undefined}
    >
      {solution.label}
    </Link>)}
  </nav>;
}
