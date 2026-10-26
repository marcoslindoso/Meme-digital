import type { Metadata } from "next";
import "./globals.css";
import "./modern.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://meme-digital.vercel.app"),
  title: "Meme Digital | Agência Martech em Campinas e São Paulo",
  description: "Marketing, tecnologia, design e performance conectados para criar experiências digitais e impulsionar negócios B2B e B2C.",
  openGraph: {
    title: "Meme Digital | Marketing que move. Tecnologia que escala.",
    description: "Agência Martech em Campinas e São Paulo.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" suppressHydrationWarning><body suppressHydrationWarning>{children}</body></html>;
}
