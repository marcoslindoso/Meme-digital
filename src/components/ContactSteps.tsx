"use client";

import { useState, type FormEvent } from "react";

const services = ["Agência", "Tech & Web", "Design", "Performance Ads", "Produtos Digitais", "Metaverso"];

export function ContactSteps() {
  const [step, setStep] = useState(0);
  const [channel, setChannel] = useState<"email" | "whatsapp">("email");
  const [values, setValues] = useState({ name: "", email: "", company: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  function update(key: keyof typeof values, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    setSent(false);
  }

  function next(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < 2) { setStep(step + 1); return; }
    const message = [
      "Olá, equipe Meme Digital!", "", `Nome: ${values.name.trim()}`, `E-mail: ${values.email.trim()}`,
      `Empresa: ${values.company.trim() || "Não informada"}`, `Solução: ${values.service || "A definir"}`,
      "", "Sobre o projeto:", values.message.trim(), "", "Enviado pelo site Meme Digital.",
    ].join("\n");
    setSent(true);
    if (channel === "whatsapp") {
      window.open(`https://wa.me/5519997600063?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = `mailto:contato@memedigital.com.br?subject=${encodeURIComponent("Novo projeto pelo site")}&body=${encodeURIComponent(message)}`;
    }
  }

  return <div className="mh-contact-form">
    <div className="mh-contact-form-top"><span>Conte seu projeto</span><span>Etapa {step + 1} de 3</span></div>
    <div className="mh-contact-progress" aria-hidden="true"><span style={{ width: `${((step + 1) / 3) * 100}%` }} /></div>
    <form onSubmit={next}>
      {step === 0 && <div className="mh-contact-step" key="person">
        <h3>Vamos nos conhecer?</h3><p>Comece com seus dados para conversarmos sobre a ideia.</p>
        <label>Seu nome <input required autoComplete="name" value={values.name} onChange={(event) => update("name", event.target.value)} placeholder="Como podemos chamar você?" /></label>
        <label>Seu e-mail <input required type="email" autoComplete="email" value={values.email} onChange={(event) => update("email", event.target.value)} placeholder="voce@empresa.com.br" /></label>
      </div>}
      {step === 1 && <div className="mh-contact-step" key="project">
        <h3>O que vamos criar juntos?</h3><p>Um resumo já ajuda nossa equipe a encontrar o próximo passo.</p>
        <label>Empresa <input autoComplete="organization" value={values.company} onChange={(event) => update("company", event.target.value)} placeholder="Nome da empresa (opcional)" /></label>
        <label>Solução <select value={values.service} onChange={(event) => update("service", event.target.value)}><option value="">Ainda não sei</option>{services.map((service) => <option key={service}>{service}</option>)}</select></label>
        <label>Sua ideia <textarea required minLength={10} rows={3} value={values.message} onChange={(event) => update("message", event.target.value)} placeholder="Conte o desafio ou objetivo do projeto" /></label>
      </div>}
      {step === 2 && <div className="mh-contact-step" key="send">
        <h3>Como prefere continuar?</h3><p>Você poderá revisar a mensagem antes de enviá-la.</p>
        <div className="mh-contact-summary"><strong>{values.name}</strong><span>{values.service || "Novo projeto"}</span><p>{values.message}</p></div>
        <fieldset><legend>Escolha o canal</legend><label className={channel === "email" ? "is-selected" : ""}><input type="radio" checked={channel === "email"} onChange={() => setChannel("email")} /> E-mail</label><label className={channel === "whatsapp" ? "is-selected" : ""}><input type="radio" checked={channel === "whatsapp"} onChange={() => setChannel("whatsapp")} /> WhatsApp</label></fieldset>
        {sent && <p role="status">Revise e envie a mensagem no aplicativo aberto.</p>}
      </div>}
      <div className="mh-contact-form-actions">
        {step > 0 && <button type="button" className="mh-contact-back" onClick={() => setStep(step - 1)}>Voltar</button>}
        <button type="submit" className="mh-button mh-button-primary">{step === 2 ? "Abrir mensagem" : "Continuar"} <span aria-hidden="true">↗</span></button>
      </div>
    </form>
  </div>;
}
