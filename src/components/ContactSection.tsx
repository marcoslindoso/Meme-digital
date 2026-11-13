import { ContactSteps } from "@/components/ContactSteps";

export function ContactSection() {
  return <section className="mh-contact" id="contato">
    <div className="mh-contact-orb" aria-hidden="true" />
    <div className="mh-shell mh-contact-grid">
      <div className="mh-reveal">
        <span className="mh-eyebrow">Encontre o ideal para seu negócio</span>
        <h2>Complete as informações abaixo e <em>responderemos em breve.</em></h2>
      </div>
      <ContactSteps />
    </div>
  </section>;
}
