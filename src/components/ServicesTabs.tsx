"use client";

import { useState } from "react";

const services = [
  { title: "Agência", label: "Estratégia que conecta marca e crescimento.", body: "Planejamento, posicionamento, conteúdo e campanhas integradas para transformar objetivos de negócio em uma presença digital consistente.", items: ["Planejamento e branding", "Campanhas integradas", "Conteúdo e social"] },
  { title: "Tech & Web", label: "Tecnologia simples para desafios complexos.", body: "Sites, e-commerces, plataformas e produtos digitais rápidos, acessíveis e preparados para escalar junto com a operação.", items: ["Sites e landing pages", "E-commerce", "Apps e plataformas"] },
  { title: "Design", label: "Experiências que as pessoas querem usar.", body: "Pesquisa, UX/UI, direção criativa e sistemas visuais que deixam cada ponto de contato mais claro, útil e memorável.", items: ["UX research", "Interfaces e protótipos", "Identidade visual"] },
  { title: "Performance Ads", label: "Mídia orientada por dados e margem.", body: "Operação de mídia com leitura contínua de funil, testes criativos e decisões baseadas no que realmente movimenta o negócio.", items: ["Google e Meta Ads", "Growth e CRO", "Dashboards e dados"] },
  { title: "Produtos Digitais", label: "Conhecimento transformado em escala.", body: "Estratégia, lançamento e evolução de infoprodutos com jornada, oferta e experiência desenhadas para conversão.", items: ["Estratégia de produto", "Lançamentos", "Automação e CRM"] },
  { title: "Metaverso", label: "Novas camadas para experiências de marca.", body: "Gamificação, realidade aumentada e experiências interativas para engajar públicos de um jeito útil e surpreendente.", items: ["Gamificação", "Realidade aumentada", "Ativações interativas"] },
];

export function ServicesTabs() {
  const [active, setActive] = useState(0);
  const service = services[active];

  return (
    <div className="services-panel">
      <div className="service-tabs" role="tablist" aria-label="Áreas de atuação">
        {services.map((item, index) => (
          <button key={item.title} role="tab" aria-selected={active === index} className={active === index ? "active" : ""} onClick={() => setActive(index)}>{item.title}</button>
        ))}
      </div>
      <div className="service-content" role="tabpanel">
        <div><span className="service-index">0{active + 1}</span><h3>{service.label}</h3></div>
        <p>{service.body}</p>
        <ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
    </div>
  );
}
