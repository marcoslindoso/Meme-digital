import Link from "next/link";
import { Header } from "@/components/Header";

export default function NotFound() {
  return <><Header /><main className="not-found section-shell"><span>404</span><h1>Essa página mudou de lugar.</h1><p>Vamos levar você de volta para o começo.</p><Link className="button button-primary" href="/">Voltar para a home</Link></main></>;
}
