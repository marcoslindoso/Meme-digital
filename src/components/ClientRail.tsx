import Image from "next/image";

const logos = [
  "Background-25-1.jpg", "Background-23-1.jpg", "Background-20-1.jpg",
  "Background-6-2.jpg", "Background-28-1.jpg", "Background-17-2.jpg",
  "Background-26-1.jpg", "Background-16-2.jpg", "Background-21-1.jpg",
  "Background-9-2.jpg", "Background-15-2.jpg", "Background-5-2.jpg",
];

export function ClientRail() {
  return (
    <section className="client-rail" aria-label="Clientes e projetos">
      <div className="client-track">
        {[...logos, ...logos].map((logo, index) => (
          <div className="client-logo" key={`${logo}-${index}`}>
            <Image src={`/assets/clients/${logo}`} alt="Marca cliente da Meme Digital" width={160} height={80} />
          </div>
        ))}
      </div>
    </section>
  );
}
