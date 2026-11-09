// Copy específica de cada especialidade, alinhada às soluções da Meme Digital.
const copy: Record<string, Record<string, string>> = {
  agencia: {
    SEO: "Faça sua marca aparecer quando o cliente já procura uma solução. Unimos conteúdo útil, estrutura técnica e intenção de busca para transformar visitas orgânicas em conversas qualificadas.",
    Performance: "Cada campanha precisa responder a uma meta de negócio. Planejamos mídia, criativos e páginas de destino, acompanhando os dados para investir com clareza e evoluir a conversão.",
    "Growth Hacking": "Crescimento pede aprendizado constante. Criamos hipóteses, testamos jornadas e usamos os dados para encontrar oportunidades que façam sentido para a sua operação.",
    "Digital Planning": "Antes de escolher canais, definimos a direção. Traduzimos objetivos, público e orçamento em um plano digital com prioridades claras e ações que podem ser ajustadas ao longo do caminho.",
    Copywriter: "A mensagem certa torna a escolha mais simples. Escrevemos páginas, anúncios e conteúdos com a voz da marca, argumentos relevantes e chamadas que convidam à ação.",
    "Automação de Marketing": "A conversa não termina no primeiro contato. Criamos fluxos e segmentações para nutrir relações, apoiar o time comercial e acompanhar cada oportunidade com mensagens no momento certo.",
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
