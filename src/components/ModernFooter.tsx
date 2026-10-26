import Image from "next/image";
import Link from "next/link";

export function ModernFooter() {
  return (
    <footer className="mh-footer">
      <div className="mh-footer-top">
        <div className="mh-footer-brand">
          <Image
            src="/wp-content/uploads/2024/07/logotipo-completo-1-2.png"
            alt="Meme Digital"
            width={174}
            height={53}
          />
          <p>Marketing, tecnologia e experiências digitais feitas por pessoas para pessoas.</p>
        </div>
        <div className="mh-footer-links">
          <div><strong>Navegue</strong><Link href="/#solucoes">Soluções</Link><Link href="/cases/">Cases</Link><Link href="/insights/">Insights</Link><Link href="/institucional/">Institucional</Link></div>
          <div><strong>Converse</strong><a href="mailto:contato@memedigital.com.br">contato@memedigital.com.br</a><a href="https://wa.me/5519997600063" target="_blank" rel="noreferrer">(19) 99760-0063</a></div>
          <div><strong>Acompanhe</strong><a href="https://www.instagram.com/agenciamemedigital" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.linkedin.com/company/meme-digital" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://www.behance.net/agenciamemedigital" target="_blank" rel="noreferrer">Behance</a></div>
        </div>
      </div>
      <div className="mh-footer-bottom">
        <span>© {new Date().getFullYear()} Meme Digital.</span>
        <span>Campinas · São Paulo · Brasil</span>
      </div>
    </footer>
  );
}
