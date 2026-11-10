"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

const emailAddress = "contato@memedigital.com.br";
const whatsappNumber = "5519997600063";
const services = ["Agência", "Tech & Web", "Design", "Performance Ads", "Produtos Digitais", "Metaverso", "Outro assunto"];
const routeServices: Record<string, string> = {
  agencia: "Agência", "tech-web": "Tech & Web", design: "Design", "performance-ads": "Performance Ads",
  "produtos-digitais": "Produtos Digitais", metaverso: "Metaverso",
};

type Fields = { name: string; email: string; phone: string; company: string; service: string; message: string };
const emptyFields: Fields = { name: "", email: "", phone: "", company: "", service: "", message: "" };

export function ContactPopup() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState("Novo projeto");
  const [channel, setChannel] = useState<"email" | "whatsapp">("email");
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [handoff, setHandoff] = useState(false);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a") : null;
      if (!link) return;
      const href = link.getAttribute("href");
      if (!link.hasAttribute("data-contact-trigger") && href !== "#contato" && href !== "/#contato") return;
      if (link.getAttribute("aria-label")?.startsWith("Ler ")) return;
      event.preventDefault();

      const route = window.location.pathname.split("/").filter(Boolean).at(-1) ?? "";
      const service = routeServices[route] ?? "";
      const cardTitle = link.closest("article")?.querySelector("h3, h4")?.textContent?.trim();
      setTopic(link.dataset.contactTopic || cardTitle || service || "Novo projeto");
      setFields({ ...emptyFields, service });
      setChannel("email");
      setHandoff(false);
      setOpen(true);
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    if (open && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => nameRef.current?.focus());
    } else if (!open && dialog.open) {
      dialog.close();
    }
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  function close() {
    dialogRef.current?.close();
    setOpen(false);
  }

  function update(field: keyof Fields, value: string) {
    setFields((current) => ({ ...current, [field]: value }));
    setHandoff(false);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = `Contato pelo site — ${topic}`;
    const message = [
      "Olá, equipe Meme Digital!", "", `Assunto: ${topic}`, `Interesse: ${fields.service || "A definir"}`,
      `Nome: ${fields.name.trim()}`, `E-mail: ${fields.email.trim()}`,
      `Telefone: ${fields.phone.trim() || "Não informado"}`, `Empresa: ${fields.company.trim() || "Não informada"}`,
      "", "Sobre o projeto:", fields.message.trim(), "", "Enviado a partir do site Meme Digital.",
    ].join("\n");
    setHandoff(true);
    if (channel === "whatsapp") {
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    }
  }

  return <dialog className="contact-popup" ref={dialogRef} onClose={() => setOpen(false)} onCancel={() => setOpen(false)} aria-labelledby="contact-popup-title">
    <div className="contact-popup-shell">
      <aside className="contact-popup-aside">
        <span className="contact-popup-kicker"><i /> Meme Digital · Vamos criar juntos</span>
        <div className="contact-popup-aside-copy"><span className="contact-popup-spark" aria-hidden="true">✳</span><h2>Boas ideias começam com uma <em>conversa.</em></h2><p>Conte seu desafio. Nossa equipe conecta estratégia, criatividade e tecnologia para encontrar o próximo passo.</p></div>
        <span className="contact-popup-signature">Marketing + Tech <span>↗</span></span>
      </aside>
      <div className="contact-popup-main">
        <button className="contact-popup-close" type="button" onClick={close} aria-label="Fechar formulário">×</button>
        <div className="contact-popup-heading"><span>VAMOS CONVERSAR</span><h2 id="contact-popup-title">Seu próximo projeto <em>começa aqui.</em></h2><p>Preencha os detalhes e escolha como prefere enviar sua mensagem.</p><div className="contact-popup-context">Sobre: <strong>{topic}</strong></div></div>
        <form onSubmit={submit}>
          <div className="contact-popup-fields">
            <label>Seu nome <b>*</b><input ref={nameRef} name="name" autoComplete="name" required value={fields.name} onChange={(event) => update("name", event.target.value)} placeholder="Como podemos chamar você?" /></label>
            <label>Seu e-mail <b>*</b><input name="email" type="email" autoComplete="email" required value={fields.email} onChange={(event) => update("email", event.target.value)} placeholder="voce@empresa.com.br" /></label>
            <label>WhatsApp <input name="tel" type="tel" autoComplete="tel" value={fields.phone} onChange={(event) => update("phone", event.target.value)} placeholder="(00) 00000-0000" /></label>
            <label>Empresa <input name="organization" autoComplete="organization" value={fields.company} onChange={(event) => update("company", event.target.value)} placeholder="Nome da empresa" /></label>
            <label className="contact-popup-wide">Área de interesse <select name="service" value={fields.service} onChange={(event) => update("service", event.target.value)}><option value="">Ainda não sei</option>{services.map((service) => <option key={service}>{service}</option>)}</select></label>
            <label className="contact-popup-wide">Conte sua ideia <b>*</b><textarea name="message" required minLength={10} value={fields.message} onChange={(event) => update("message", event.target.value)} placeholder="O que você quer criar, melhorar ou resolver?" rows={3} /></label>
          </div>
          <fieldset className="contact-popup-channels"><legend>Como deseja enviar?</legend><label className={channel === "email" ? "is-selected" : ""}><input type="radio" name="channel" value="email" checked={channel === "email"} onChange={() => setChannel("email")} /><span aria-hidden="true">✉</span><strong>E-mail</strong></label><label className={channel === "whatsapp" ? "is-selected" : ""}><input type="radio" name="channel" value="whatsapp" checked={channel === "whatsapp"} onChange={() => setChannel("whatsapp")} /><span aria-hidden="true">↗</span><strong>WhatsApp</strong></label></fieldset>
          <button className="contact-popup-submit" type="submit">{channel === "email" ? "Abrir e-mail com a mensagem" : "Continuar no WhatsApp"}<span aria-hidden="true">↗</span></button>
          <p className="contact-popup-note">{handoff ? "Revise e envie a mensagem no aplicativo que foi aberto." : "Você revisa a mensagem antes de enviá-la."}</p>
        </form>
      </div>
    </div>
  </dialog>;
}
