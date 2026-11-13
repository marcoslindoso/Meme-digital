// Copy específica de cada especialidade, alinhada às soluções da Meme Digital.
const copy: Record<string, Record<string, string>> = {
  agencia: {
    SEO: "Search Engine Optimization (SEO) é fundamental para destacar sua presença online de maneira orgânica em sites de busca como Google, Bing e Yahoo. Ao otimizar conteúdo e palavras-chave, aumentamos a visibilidade e atraímos tráfego qualificado.",
    Performance: "Aplicamos estratégias personalizadas e inovadoras para que sua marca não apenas participe, mas lidere o mercado online. Com foco em resultados, transformamos oportunidades estratégicas em crescimento e aumento nas vendas.",
    "Growth Hacking": "Acelere o crescimento da sua empresa com estratégias de Growth Hacking. Utilizamos inovação, testes e escalonamento para impulsionar estratégias digitais e conquistar o mercado de forma inteligente.",
    "Digital Planning": "O planejamento digital e de mídia é a espinha dorsal de uma estratégia eficaz online. Da definição de metas à execução tática, cada etapa é guiada por uma abordagem cuidadosa e orientada para resultados.",
    Copywriter: "Transformamos ideias em palavras envolventes. Cada palavra é escolhida para cativar, persuadir e contar histórias que ressoam. O copywriter constrói a narrativa que inspira ação.",
    "Automação de Marketing": "Simplifique e amplie o impacto da sua campanha. Automatize com plataformas como Leadlovers, RD Station, Ramper, Mautic, ActiveCampaign, Dinamize, E-notas, Voxuy e WhatsApp.",
  },
  "tech-web": {
    "E-commerce": "Sua loja precisa ser fácil de comprar e de operar. Projetamos navegação, catálogo, checkout e integrações à plataforma adequada para construir uma experiência de compra clara e preparada para crescer.",
    "Apps para iOS e Android": "Do primeiro toque à próxima visita, cada tela precisa fazer sentido. Desenvolvemos aplicativos para iOS e Android com jornadas intuitivas, integrações essenciais e tecnologia alinhada ao produto.",
    Web: "Seu site deve explicar, orientar e converter. Criamos sites institucionais, landing pages e páginas de venda em que conteúdo, design e desenvolvimento trabalham juntos em cada etapa da navegação.",
    Manutenções: "Plataformas digitais precisam de cuidado contínuo. Mantemos sites, lojas e aplicativos atualizados, corrigimos problemas e evoluímos funcionalidades conforme as necessidades do negócio e dos usuários mudam.",
  },
  design: {
    "E-branding / Naming": "Uma marca reconhecível começa com uma ideia clara. Criamos nome, identidade visual e brand book para expressar sua personalidade com consistência em todos os pontos de contato.",
    "UX / UI": "Uma interface bonita também precisa ser simples de usar. Estudamos jornadas, organizamos informações e desenhamos telas que ajudam as pessoas a encontrar o que precisam com menos esforço.",
    "Creative Design": "Transformamos estratégia em peças que merecem atenção. Criamos visuais para campanhas e canais digitais que comunicam a personalidade da marca com clareza em cada formato.",
  },
  "performance-ads": {
    "Meta Ads": "Entre no feed com uma mensagem relevante. Planejamos anúncios para Instagram e Facebook, testamos formatos e públicos e ajustamos campanhas a partir dos sinais de desempenho.",
    "Google Ads": "Apareça quando alguém demonstra interesse pelo que você oferece. Estruturamos campanhas de Pesquisa, Shopping, Display e YouTube, conectando anúncios a ofertas e páginas de destino coerentes.",
    "LinkedIn Ads": "Converse com quem participa da decisão de compra. Criamos campanhas B2B para públicos profissionais, com mensagens adequadas ao setor, à etapa da jornada e ao objetivo comercial.",
    "Mídia Nativa": "Leve seu conteúdo para além dos canais habituais. Planejamos a distribuição em redes de mídia nativa com peças e páginas alinhadas ao contexto de leitura do público.",
    "Waze / Amazon Ads": "Esteja presente quando o público procura um destino ou um produto. Escolhemos formatos no Waze e na Amazon de acordo com objetivos locais ou de venda e acompanhamos os dados da campanha.",
  },
  "produtos-digitais": {
    "Agência de Lançamentos": "Um lançamento começa antes da abertura das vendas. Planejamos oferta, conteúdo, páginas e automações para preparar a audiência e manter o produto relevante depois da campanha.",
    "Infoprodutos / Afiliados": "Conhecimento vira produto quando a experiência é bem desenhada. Estruturamos cursos, e-books e mentorias, da proposta de valor à plataforma e à jornada de compra.",
    "Influencer Digital": "Sua audiência já conhece a sua voz. Ajudamos a transformar essa relação em produtos e parcerias com posicionamento, narrativa e ofertas coerentes com a comunidade.",
  },
  metaverso: {
    "Realidade Aumentada (AR)": "Traga camadas digitais para o mundo real. Criamos experiências com objetos 3D, vídeos e interações que ajudam a apresentar produtos, explicar ideias ou envolver pessoas de outro jeito.",
    "Realidade Virtual (VR)": "Crie um espaço que o público possa explorar. Desenvolvemos experiências virtuais para apresentações, treinamentos e ativações que pedem mais imersão e participação do que uma tela comum.",
  },
};

export function getOfferingCopy(solution: string, title: string, fallback: string) {
  return copy[solution]?.[title] ?? fallback;
}
