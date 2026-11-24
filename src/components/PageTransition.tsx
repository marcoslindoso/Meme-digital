"use client";

import { usePathname } from "next/navigation";
import { ViewTransition, type ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return <ViewTransition
    key={pathname}
    name="meme-page"
    default="none"
    enter="mh-page-in"
    exit="mh-page-out"
    share="mh-page-change"
    update="none"
  >{children}</ViewTransition>;
}
