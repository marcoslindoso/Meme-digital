"use client";

import { useState, type FormEvent } from "react";

const services = ["Agência", "Tech & Web", "Design", "Performance Ads", "Produtos Digitais", "Metaverso", "IA e Engenharia de Harness"];
const totalSteps = 4;

export function ContactSteps() {
  const [step, setStep] = useState(0);
  const [channel, setChannel] = useState<"email" | "whatsapp">("email");
  const [values, setValues] = useState({ name: "", email: "", phone: "", company: "", revenue: "", segment: "", employees: "", start: "", budget: "", referral: "", service: "", message: "", accepted: false, newsletter: false });
  const [sent, setSent] = useState(false);

  function update<K extends keyof typeof values>(key: K, value: (typeof values)[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setSent(false);
  }

  function next(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < totalSteps - 1) { setStep(step + 1); return; }
    const message = [
      "Olá, equipe Meme Digital!", "",
      `Nome: ${values.name.trim()}`, `E-mail: ${values.email.trim()}`, `Telefone: ${values.phone.trim()}`,
      `Empresa: ${values.company.trim()}`, `Faturamento mensal aproximado: ${values.revenue || "Não informado"}`,
      `Segmento: ${values.segment.trim() || "Não informado"}`, `Colaboradores: ${values.employees || "Não informado"}`,
      `Início do projeto: ${values.start || "Não informado"}`, `Orçamento mensal para marketing: ${values.budget || "Não informado"}`,
      `Como conheceu a Meme: ${values.referral.trim() || "Não informado"}`, `Solução: ${values.service || "A definir"}`,
      "", "Sobre a empresa e o projeto:", values.message.trim(), "",
      `Deseja receber novidades por e-mail: ${values.newsletter ? "Sim" : "Não"}`,
      "Enviado pelo site Meme Digital.",
    ].join("\n");
    setSent(true);
    if (channel === "whatsapp") {
      window.open(`https://wa.me/5519997600063?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = `mailto:contato@memedigital.com.br?subject=${encodeURIComponent("Novo projeto pelo site")}&body=${encodeURIComponent(message)}`;
    }
  }

  return <div className="mh-contact-form">
    <div className="mh-contact-form-top"><span>Encontre o ideal para seu negócio</span><span>Etapa {step + 1} de {totalSteps}</span></div>
    <div className="mh-contact-progress" aria-hidden="true"><span style={{ width: `${((step + 1) / totalSteps) * 100}%` }} /></div>
    <form onSubmit={next}>
      {step === 0 && <div className="mh-contact-step" key="person">
        <h3>Antes de conectá-lo a um especialista, precisamos que se apresente.</h3><p>Complete as informações abaixo e responderemos em breve.</p>
        <label>Nome <input required autoComplete="name" value={values.name} onChange={(event) => update("name", event.target.value)} placeholder="Nome" /></label>
        <label>Email <input required type="email" autoComplete="email" value={values.email} onChange={(event) => update("email", event.target.value)} placeholder="Email" /></label>
        <label>Telefone <input required type="tel" autoComplete="tel" value={values.phone} onChange={(event) => update("phone", event.target.value)} placeholder="Telefone" /></label>
      </div>}
      {step === 1 && <div className="mh-contact-step" key="business">
        <h3>Fale sobre sua empresa</h3><p>Assim podemos compreender melhor o seu negócio.</p>
        <label>Nome da empresa <input required autoComplete="organization" value={values.company} onChange={(event) => update("company", event.target.value)} placeholder="Nome da empresa" /></label>
        <label>Qual é o faturamento mensal aproximado? <select value={values.revenue} onChange={(event) => update("revenue", event.target.value)}><option value="">Selecione</option><option>Até R$ 50 mil</option><option>De R$ 50 mil a R$ 200 mil</option><option>De R$ 200 mil a R$ 1 milhão</option><option>Acima de R$ 1 milhão</option><option>Prefiro não informar</option></select></label>
        <label>Qual é o segmento de atuação da sua empresa? <input value={values.segment} onChange={(event) => update("segment", event.target.value)} placeholder="Seu segmento" /></label>
        <label>Quantos colaboradores sua empresa possui atualmente? <select value={values.employees} onChange={(event) => update("employees", event.target.value)}><option value="">Selecione</option><option>Até 10</option><option>11 a 50</option><option>51 a 200</option><option>Mais de 200</option></select></label>
      </div>}
      {step === 2 && <div className="mh-contact-step" key="project">
        <h3>Conte-nos mais sobre sua empresa e como a Meme Digital pode apoiar seus objetivos.</h3>
        <label>Solução <select value={values.service} onChange={(event) => update("service", event.target.value)}><option value="">Ainda não sei</option>{services.map((service) => <option key={service}>{service}</option>)}</select></label>
        <label>Quando pretende iniciar este projeto? <select value={values.start} onChange={(event) => update("start", event.target.value)}><option value="">Selecione</option><option>Imediatamente</option><option>Em até 3 meses</option><option>Em até 6 meses</option><option>Ainda estou planejando</option></select></label>
        <label>Qual é o orçamento mensal planejado para marketing? <select value={values.budget} onChange={(event) => update("budget", event.target.value)}><option value="">Selecione</option><option>Até R$ 5 mil</option><option>De R$ 5 mil a R$ 20 mil</option><option>Acima de R$ 20 mil</option><option>A definir</option></select></label>
        <label>Como você ficou sabendo sobre a Meme Digital? <input value={values.referral} onChange={(event) => update("referral", event.target.value)} placeholder="Google, indicação, redes sociais..." /></label>
        <label>Mensagem <textarea required minLength={10} rows={3} value={values.message} onChange={(event) => update("message", event.target.value)} placeholder="Conte-nos sobre seus objetivos" /></label>
      </div>}
      {step === 3 && <div className="mh-contact-step" key="send">
        <h3>Como prefere continuar?</h3><p>Revise as informações e escolha o canal para enviar sua mensagem.</p>
        <div className="mh-contact-summary"><strong>{values.name}</strong><span>{values.company} · {values.service || "Novo projeto"}</span><p>{values.message}</p></div>
        <label><input required type="checkbox" checked={values.accepted} onChange={(event) => update("accepted", event.target.checked)} /> Declaro que li e aceito os termos de uso e a política de privacidade deste site.</label>
        <label><input type="checkbox" checked={values.newsletter} onChange={(event) => update("newsletter", event.target.checked)} /> Desejo receber novidades em meu email.</label>
        <fieldset><legend>Escolha o canal</legend><label className={channel === "email" ? "is-selected" : ""}><input type="radio" checked={channel === "email"} onChange={() => setChannel("email")} /> E-mail</label><label className={channel === "whatsapp" ? "is-selected" : ""}><input type="radio" checked={channel === "whatsapp"} onChange={() => setChannel("whatsapp")} /> WhatsApp</label></fieldset>
        {sent && <p role="status">Revise e envie a mensagem no aplicativo aberto.</p>}
      </div>}
      <div className="mh-contact-form-actions">
        {step > 0 && <button type="button" className="mh-contact-back" onClick={() => setStep(step - 1)}>Voltar</button>}
        <button type="submit" className="mh-button mh-button-primary">{step === totalSteps - 1 ? "Enviar" : "Continuar"} <span aria-hidden="true">↗</span></button>
      </div>
    </form>
  </div>;
}
