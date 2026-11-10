import Image from "next/image";
import Link from "next/link";
import { ModernEffects } from "@/components/ModernEffects";
import { ModernFooter } from "@/components/ModernFooter";
import { ModernHeader } from "@/components/ModernHeader";

const principles = [
  { icon: "✳", title: "Missão", text: "Ser uma agência Martech referência em criatividade, design e performance de alto impacto. Nosso objetivo é impulsionar negócios, aumentar o faturamento e fortalecer a presença das marcas. Queremos ser a Martech mais desejada e competitiva, ousando sempre na inovação e valorizando tanto o coletivo quanto a individualidade de cada Memer." },
  { icon: "◈", title: "Visão", text: "Ser a agência digital líder no mercado nacional e internacional, com um time talentoso e comprometido em entregar resultados. Nossa meta é encantar a cada projeto, gerar crescimento para os clientes e construir conexões duradouras." },
  { icon: "✦", title: "Valores", text: "Simplicidade, respeito, reconhecimento e liberdade. Aqui, você é livre para ser quem realmente é, sem julgamentos. O que importa é a excelência em cada entrega e o compromisso contínuo de oferecer sempre o melhor – para o cliente e para o próximo." },
];

const ways = [
  { title: "A Essência", text: "Quando você vê, sabe: foi a Meme quem fez! Nosso estilo é ousado, moderno e voltado para performance. Cada cliente é único, e tratamos cada projeto como uma oportunidade de elevar o jogo e entregar resultados que falam por si." },
  { title: "Bem-estar", text: "Priorizamos o equilíbrio entre vida profissional e pessoal, respeitando rigorosamente os horários comerciais e evitando horas extras. Incentivamos a adoção de práticas que promovem saúde e bem-estar, como meditação, esportes, música e até um bom momento de lazer. Para a gente, sucesso começa com felicidade e bem-estar." },
  { title: "Meritocracia", text: "Aqui, a meritocracia é o pilar do nosso crescimento. Valorizamos o talento, o esforço e o desempenho individual, reconhecendo aqueles que se destacam e contribuem de forma significativa para o time. Ser um Memer é ser reconhecido pela sua habilidade em saber exatamente quando entrar em ação e fazer a diferença. Acreditamos que o esforço e a dedicação devem ser recompensados, criando um ambiente onde todos têm a oportunidade de crescer, evoluir e conquistar seu espaço com base no seu mérito." },
];

const work = [
  { icon: "◎", title: "Gestão", text: "Adotamos uma estrutura de liderança horizontal, onde a proximidade com os projetos é valorizada, especialmente pelo fundador, Bruno Vaz, que se envolve ativamente, sempre respeitando a autonomia da equipe. A proatividade é um diferencial que buscamos desde o processo de contratação, com o objetivo de capacitar nossa equipe a tomar decisões e conduzir projetos de forma independente e eficiente, garantindo agilidade e resultados consistentes." },
  { icon: "✳", title: "Liberdade", text: "Acreditamos que a liberdade individual é um valor fundamental e inegociável. Cada Memer possui a autonomia necessária para gerenciar suas atividades de forma eficaz, desde que respeite prazos e compromissos. A entrega de um trabalho de qualidade será sempre reconhecida e valorizada, pois sabemos que a confiança e a responsabilidade são essenciais para o sucesso coletivo." },
];

export function CulturePage() {
  return <div className="modern-site cm-page">
    <ModernHeader />
    <main id="conteudo">
      <section className="cm-hero"><div className="mh-shell cm-hero-grid">
        <div className="cm-hero-copy mh-reveal"><span className="mh-eyebrow">Cultura Meme</span><h1>Juntos Somos <em>Um Só!</em></h1><p>Sonho que se sonha só, é só um sonho que se sonha só... Mas sonho que se sonha junto, é realidade!</p><div className="cm-hero-actions"><a className="mh-button mh-button-primary" href="#proposito">Conheça nosso jeito <span>↓</span></a><Link className="cm-text-link" href="/institucional/#o-time">Conheça os Memers</Link></div></div>
        <div className="cm-hero-visual mh-reveal"><div className="cm-hero-image"><Image src="/wp-content/uploads/2024/05/IMG_6342.jpg" alt="Equipe Meme Digital reunida em um evento" fill priority sizes="(max-width: 900px) 100vw, 52vw" /></div><span className="cm-image-note">Pessoas reais. <strong>Conexões que movem.</strong></span></div>
      </div></section>

      <section className="cm-purpose cm-section" id="proposito"><div className="mh-shell cm-purpose-grid">
        <div className="cm-purpose-image mh-reveal"><Image src="/wp-content/uploads/2025/12/agencia-de-marketing-em-campinas-equipe-meme-digital-1024x559.png" alt="Equipe colaborando em um projeto de marketing e tecnologia" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
        <div className="cm-purpose-copy mh-reveal"><span className="mh-eyebrow">Nosso propósito</span><h2>Impulsionar negócios, <em>transformar trajetórias</em></h2><p>Ajudamos empreendedores a crescerem e a faturarem mais por meio de estratégias de marketing e tecnologia. Nosso compromisso vai além da entrega: queremos gerar resultados sustentáveis e transformar negócios.</p></div>
      </div></section>

      <section className="cm-culture cm-section"><div className="mh-shell cm-culture-grid"><div className="mh-reveal"><span className="mh-eyebrow">Cultura Meme</span><h2>Uma cultura feita de <em>pessoas reais</em></h2></div><div className="mh-reveal"><p>A cultura da Meme Digital é baseada no respeito e na colaboração entre os Memers. Valorizamos a evolução individual e coletiva, incentivamos um ambiente leve e equilibrado e acreditamos que trabalhar bem também significa viver bem.</p><p>A comunicação é simples e objetiva, sem rodeios ou linguagem complicada. Queremos que todo mundo entenda o que estamos fazendo e, mais importante, por que estamos fazendo.</p></div></div></section>

      <section className="cm-manifesto"><div className="mh-shell"><span className="mh-eyebrow">Por dentro da Meme</span><p>O que nos move e guia <em>cada passo</em></p></div></section>

      <section className="cm-principles cm-section"><div className="mh-shell"><header className="cm-section-head mh-reveal"><span className="mh-eyebrow">Por dentro da Meme</span><h2>Missão, visão <em>e valores.</em></h2></header><div className="cm-principles-grid">{principles.map((item) => <article className="mh-reveal" key={item.title}><span className="cm-principle-icon" aria-hidden="true">{item.icon}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div></section>

      <section className="cm-method cm-section"><div className="mh-shell cm-method-grid"><div className="mh-reveal"><span className="mh-eyebrow">Nosso método</span><h2>Estratégia que gera <em>resultados reais.</em></h2><p>Entregue ao seu cliente o que você consideraria imbatível, sem questionamentos. Qualidade não se discute, ela é essencial. O Método MEME7 não é só um conjunto de estratégias validadas — é o caminho para impulsionar vendas, fortalecer marcas e garantir conversões reais. Aqui, a gente não aposta: a gente tem certeza.</p><Link className="mh-button mh-button-light" href="/#contato">Vamos conversar</Link></div><div className="cm-method-mark mh-reveal" aria-label="Método MEME7"><span>M</span><span>E</span><span>M</span><span>E</span><strong>7</strong></div></div></section>

      <section className="cm-ways cm-section"><div className="mh-shell"><header className="cm-section-head mh-reveal"><span className="mh-eyebrow">Nosso jeito de ser</span><h2>Essência, bem-estar e meritocracia que guiam <em>cada passo</em></h2></header><div className="cm-ways-grid">{ways.map((item) => <article className="mh-reveal" key={item.title}><small>Nosso jeito de ser</small><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div></section>

      <section className="cm-ideas cm-section"><div className="mh-shell cm-ideas-grid">
        <article className="mh-reveal"><span className="mh-eyebrow">Nossa comunicação</span><h2>Clareza e objetividade <em>em cada mensagem.</em></h2><p>Adotamos uma abordagem de comunicação direta e objetiva, com relatórios claros e explicações simples, sem jargões ou complicações desnecessárias. Acreditamos que a verdadeira comunicação deve ser acessível e compreensível para todos, pois entendemos que um bom entendimento mútuo é a chave para o sucesso em qualquer relação.</p></article>
        <article className="mh-reveal"><span className="mh-eyebrow">Espírito empreendedor</span><h2>Criatividade que gera <em>resultados.</em></h2><p>Na nossa agência, todos os projetos e ideias são compartilhados. Incentivamos o time e nossos franqueados a trazer soluções inovadoras, sempre ouvindo e aplicando as melhores contribuições. Valorizamos a criatividade e o espírito empreendedor para transformar ideias em resultados.</p></article>
        <article className="mh-reveal"><span className="mh-eyebrow">Franqueado</span><h2>Cresça com suporte e <em>metodologia comprovada.</em></h2><p>Dentro da nossa cultura, acreditamos em transformação e crescimento constante. Com nossa metodologia e suporte contínuo, você terá tudo o que precisa para alcançar o sucesso em uma agência Martech. Junte-se a nós e comece sua jornada!</p></article>
      </div></section>

      <section className="cm-work cm-section"><div className="mh-shell cm-work-grid"><div className="cm-work-lead mh-reveal"><span className="mh-eyebrow">Nosso jeito de trabalhar</span><h2>Gestão e liberdade que impulsionam <em>resultados</em></h2></div><div className="cm-work-list">{work.map((item) => <article className="mh-reveal" key={item.title}><span aria-hidden="true">{item.icon}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></div></section>

      <section className="cm-close"><div className="mh-shell"><span className="mh-eyebrow">Bora ser Memer?</span><h2>This is Meme Digital! <em>Let&apos;s go, Memers!</em></h2><div><Link className="mh-button mh-button-light" href="/institucional/#o-time">Conheça o time</Link><Link className="cm-close-link" href="/#contato" data-contact-topic="Carreiras">Converse com a Meme</Link></div></div></section>
    </main>
    <ModernFooter />
    <ModernEffects />
  </div>;
}
