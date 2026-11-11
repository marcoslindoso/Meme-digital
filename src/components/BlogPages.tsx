import Image from "next/image";
import Link from "next/link";
import { BlogExplorer } from "@/components/BlogExplorer";
import { ModernEffects } from "@/components/ModernEffects";
import { ModernFooter } from "@/components/ModernFooter";
import { ModernHeader } from "@/components/ModernHeader";
import { getBlogPosts, getBlogSummaries, type BlogPost } from "@/lib/blog";

export function BlogIndexPage() {
  const posts = getBlogSummaries();
  const featured = posts.slice(0, 3);
  return <div className="modern-site blog-page">
    <ModernHeader />
    <main id="conteudo">
      <section className="blog-hero"><div className="mh-shell"><span className="mh-eyebrow">Insights · Blog da Meme</span><h1>Ideias para o <em>próximo movimento.</em></h1><p>Marketing, tecnologia, design e performance explicados por quem conecta estratégia e execução todos os dias.</p><a href="#artigos" className="blog-hero-link">Explorar artigos</a></div></section>
      <section className="blog-feature"><div className="mh-shell"><div className="blog-section-heading"><div><span className="mh-eyebrow">Em destaque</span><h2>Leituras para <em>começar.</em></h2></div><a href="#artigos">Ver todos os artigos</a></div><div className="blog-feature-grid">{featured.map((post, index) => <Link className="blog-feature-card" href={post.href} key={post.id}><div className="blog-feature-image"><Image src={post.image} alt="" fill priority={index === 0} sizes="(max-width: 700px) 100vw, 33vw" /></div><div className="blog-card-meta"><span>{post.category}</span><time dateTime={post.date}>{post.dateLabel}</time></div><h3>{post.title}</h3><p>{post.excerpt}</p><span className="blog-card-link">Ler artigo</span></Link>)}</div></div></section>
      <section className="blog-archive" id="artigos"><div className="mh-shell"><div className="blog-section-heading"><div><span className="mh-eyebrow">Arquivo de ideias</span><h2>Encontre a resposta para <em>sua próxima pergunta.</em></h2></div><p>Explore todos os artigos da Meme Digital por assunto ou faça uma busca.</p></div><BlogExplorer posts={posts} /></div></section>
      <section className="blog-cta"><div className="mh-shell"><span className="mh-eyebrow">Da ideia à prática</span><h2>Pronto para transformar conhecimento em <em>resultado?</em></h2><Link className="mh-button mh-button-light" href="/#contato">Fale com a Meme</Link></div></section>
    </main>
    <ModernFooter />
    <ModernEffects />
  </div>;
}

export function BlogArticlePage({ post }: { post: BlogPost }) {
  const related = getBlogPosts().filter((item) => item.id !== post.id && item.category === post.category).slice(0, 3);
  return <div className="modern-site blog-article-page">
    <ModernHeader />
    <main id="conteudo">
      <section className="blog-article-hero"><div className="mh-shell"><nav aria-label="Caminho"><Link href="/">Home</Link><span>/</span><Link href="/insights/">Insights</Link><span>/</span><span>{post.category}</span></nav><span className="mh-eyebrow">{post.category} · Blog da Meme</span><h1>{post.title}</h1><p>{post.excerpt}</p><div className="blog-article-byline"><span>Meme Digital</span><span aria-hidden="true">·</span><time dateTime={post.date}>{post.dateLabel}</time><span aria-hidden="true">·</span><span>{post.readingMinutes} min de leitura</span></div></div></section>
      <div className="blog-article-cover mh-shell"><Image src={post.image} alt={`Imagem de capa do artigo ${post.title}`} fill priority sizes="(max-width: 900px) 100vw, 1180px" /></div>
      <section className="blog-reading mh-shell"><aside><span className="mh-eyebrow">Meme Digital</span><strong>Insights para colocar ideias em movimento.</strong><Link href="/insights/">Voltar aos artigos</Link></aside><article className="blog-prose" dangerouslySetInnerHTML={{ __html: post.html }} /></section>
      {related.length > 0 && <section className="blog-related"><div className="mh-shell"><div className="blog-section-heading"><div><span className="mh-eyebrow">Continue explorando</span><h2>Mais ideias para <em>você.</em></h2></div><Link href="/insights/">Todos os artigos</Link></div><div className="blog-feature-grid">{related.map((item) => <Link className="blog-feature-card" href={item.href} key={item.id}><div className="blog-feature-image"><Image src={item.image} alt="" fill sizes="(max-width: 700px) 100vw, 33vw" /></div><div className="blog-card-meta"><span>{item.category}</span><time dateTime={item.date}>{item.dateLabel}</time></div><h3>{item.title}</h3><span className="blog-card-link">Ler artigo</span></Link>)}</div></div></section>}
    </main>
    <ModernFooter />
    <ModernEffects />
  </div>;
}
