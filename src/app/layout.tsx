import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meme Digital",
  description: "Meme Digital",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" suppressHydrationWarning><body suppressHydrationWarning>{children}</body></html>;
}
