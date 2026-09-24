"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Toggles from "./Toggles";
import { useLang } from "./LangProvider";

const NAV = [
  { href: "/projects", zh: "作品", en: "work", match: ["/projects"] },
  { href: "/#log", zh: "经历", en: "log", match: [] },
  { href: "/posts", zh: "写作", en: "writing", match: ["/posts", "/tags"] },
  { href: "/about", zh: "关于", en: "about", match: ["/about"] },
  { href: "/search", zh: "搜索", en: "search", match: ["/search"] },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const { lang } = useLang();

  return (
    <header className="flex h-16 items-center justify-between border-b border-bl-line font-mono text-xs text-bl-muted">
      <Link href="/" className="font-bold text-bl-fg">
        robin<span className="text-bl-acc">.</span>ren
      </Link>
      <nav className="flex items-center gap-4 md:gap-7">
        {NAV.map((n) => {
          const active = n.match.some((m) => pathname === m || pathname.startsWith(`${m}/`));
          return (
            <Link
              key={n.href}
              href={n.href}
              aria-current={active ? "page" : undefined}
              className={`hidden sm:inline transition-colors ${active ? "text-bl-acc" : "hover:text-bl-fg"}`}
            >
              {lang === "en" ? n.en : n.zh}
            </Link>
          );
        })}
        <Toggles />
      </nav>
    </header>
  );
}
