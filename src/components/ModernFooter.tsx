import Image from "next/image";
import Link from "next/link";
import { OfferingIcon, type OfferingIconName } from "@/components/OfferingIcon";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const solutions: { title: string; description: string; href: string; icon: OfferingIconName }[] = [
  { title: "Agência", description: "Estratégia digital, SEO e crescimento para sua marca.", href: "/solucoes/agencia", icon: "growth" },
  { title: "Tech & Web", description: "Sites, aplicativos e e-commerce para o seu negócio.", href: "/solucoes/tech-web", icon: "web" },
  { title: "Design", description: "Marcas e interfaces que aproximam pessoas.", href: "/solucoes/design", icon: "design" },
  { title: "Performance Ads", description: "Mídia e dados para gerar tráfego, leads e vendas.", href: "/solucoes/performance-ads", icon: "performance" },
  { title: "Produtos Digitais", description: "Criação e lançamento de infoprodutos.", href: "/solucoes/produtos-digitais", icon: "launch" },
  { title: "Metaverso", description: "Experiências com realidade aumentada e virtual.", href: "/solucoes/metaverso", icon: "vr" },
];

const institutional: { title: string; description: string; href: string; icon: OfferingIconName }[] = [
  { title: "Prêmios", description: "Reconhecimento em design, web e branding.", href: "/institucional#premios", icon: "growth" },
  { title: "A Empresa", description: "Nossa história, as pessoas e o que nos move.", href: "/institucional#a-meme", icon: "planning" },
  { title: "O Time", description: "Conheça os Memers que fazem acontecer.", href: "/institucional#o-time", icon: "design" },
  { title: "Meme Social", description: "Design e comunicação para gerar impacto.", href: "/institucional#meme-social", icon: "growth" },
  { title: "Startups", description: "Ideias da Meme que ganham vida própria.", href: "/institucional#startups", icon: "launch" },
  { title: "Carreiras", description: "Venha crescer com a gente.", href: "/institucional#carreiras", icon: "app" },
];

function FooterList({ items }: { items: typeof solutions }) {
  return <ul className="mh-footer-list">{items.map((item) => <li key={item.title}>
    <Link href={item.href} className="mh-footer-item">
      <span className="mh-footer-icon"><OfferingIcon name={item.icon} /></span>
      <span><strong>{item.title}</strong><small>{item.description}</small></span>
      <span className="mh-footer-arrow" aria-hidden="true">↗</span>
    </Link>
  </li>)}</ul>;
}

const socials = [
  { name: "WhatsApp", href: "https://wa.me/5519997600063", icon: "/assets/social-icons/whatsapp.svg" },
  { name: "Behance", href: "https://www.behance.net/agenciamemedigital", icon: "/assets/social-icons/behance.svg" },
  { name: "Instagram", href: "https://www.instagram.com/agenciamemedigital", icon: "/assets/social-icons/instagram.svg" },
  { name: "Facebook", href: "https://www.facebook.com/agenciamemedigital", icon: "/assets/social-icons/facebook-f.svg" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/meme-digital", icon: "/assets/social-icons/linkedin-in.svg" },
];

export function ModernFooter() {
  return <footer className="mh-footer" id="rodape">
    <div className="mh-footer-inner">
      <div className="mh-footer-top">
        <div className="mh-footer-brand">
          <Link href="/" aria-label="Meme Digital — página inicial"><Image src="/wp-content/uploads/2024/07/logotipo-completo-1-2.png" alt="Meme Digital" width={174} height={53} /></Link>
          <p>Somos uma agência MARTECH de marketing e tecnologia dedicada a criar boas experiências digitais e impulsionar negócios B2B e B2C.</p>
          <h2>Contato</h2>
          <ul className="mh-footer-contact">
            <li><span aria-hidden="true">✆</span><a href="https://wa.me/5519997600063" target="_blank" rel="noreferrer">(19) 99760-0063</a></li>
            <li><span aria-hidden="true">✉</span><a href="mailto:contato@memedigital.com.br">contato@memedigital.com.br</a></li>
            <li><span aria-hidden="true">⌖</span><a href="https://maps.google.com/?q=R.+Luiz+Otávio,+2565,+Parque+Taquaral,+Campinas,+SP" target="_blank" rel="noreferrer">R. Luiz Otávio, 2565 · Parque Taquaral<br />Campinas, SP · 13087-018</a></li>
            <li><span aria-hidden="true">✳</span><Link href="/cultura-meme">Cultura da Meme<small>Entenda o que torna nosso time tão único.</small></Link></li>
          </ul>
        </div>
        <nav className="mh-footer-column" aria-label="Soluções no rodapé"><h2>Soluções</h2><FooterList items={solutions} /></nav>
        <nav className="mh-footer-column" aria-label="Institucional no rodapé"><h2>Institucional</h2><FooterList items={institutional} /></nav>
      </div>
      <div className="mh-footer-trust">
        <LanguageSwitcher />
        <div className="mh-footer-payments"><span>Aceitamos</span><Image src="/assets/brand-icons/bitcoin.svg" alt="Bitcoin" width={23} height={23} /><Image src="/assets/brand-icons/paypal.svg" alt="PayPal" width={21} height={23} /></div>
        <div className="mh-footer-partners" aria-label="Google e Meta"><Image src="/wp-content/uploads/2024/03/Google__G__logo.svg-1.png" alt="Google" width={35} height={35} /><span className="mh-footer-meta"><Image src="/wp-content/uploads/2024/03/Meta_Inc._logo.jpg" alt="Meta" width={128} height={72} /></span></div>
        <div className="mh-footer-social" aria-label="Redes sociais">{socials.map((social) => <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.name} key={social.name}><Image src={social.icon} alt="" width={16} height={16} /></a>)}</div>
      </div>
      <div className="mh-footer-bottom"><span>© {new Date().getFullYear()} Meme Digital · Todos os direitos reservados.</span><Link href="/insights">Insights ↗</Link></div>
    </div>
  </footer>;
}
