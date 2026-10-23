import { WordPressSnapshot } from "@/components/WordPressSnapshot";
import { getWordPressPage } from "@/lib/wordpress-page";
import { notFound } from "next/navigation";

export default async function Home() {
  const snapshot = await getWordPressPage("/");
  if (!snapshot) notFound();

  return <WordPressSnapshot snapshot={snapshot} />;
}
