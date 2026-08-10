"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { LangToggle, useLang } from "./LangProvider";

const NAV = [
  { href: "/", zh: "首页", en: "HOME" },
  { href: "/weekly", zh: "周刊", en: "WEEKLY" },
  { href: "/photography", zh: "摄影", en: "PHOTOS" },
  { href: "/projects", zh: "项目", en: "WORKS" },
  { href: "/about", zh: "关于", en: "ABOUT" },
];

export default function Header() {
  const pathname = usePathname();
  const { lang } = useLang();

  return (
    <header className="flex items-center justify-between py-5 border-b border-[#1B1B18]/15 dark:border-[#E8E6DF]/15">
      <Link href="/" className="font-mono text-xs tracking-[0.25em] font-bold">
        ROBIN<span className="text-[#FF4D00]">®</span> BLOG
      </Link>
      <nav className="flex items-center gap-5 md:gap-7">
        {NAV.map((n) => {
          const active = pathname === n.href;
          return (
            <Link
              key={n.href}
              href={n.href}
              className={`u-link font-mono text-[11px] tracking-[0.2em] transition-colors ${
                active ? "text-[#FF4D00] font-bold" : "text-current/60 hover:text-current"
              }`}
            >
              {lang === "en" ? n.en : n.zh}
            </Link>
          );
        })}
        <LangToggle />
        <ThemeToggle />
      </nav>
    </header>
  );
}
