"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
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
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const isActive = (match: string[]) => match.some((m) => pathname === m || pathname.startsWith(`${m}/`));

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="border-b border-bl-line font-mono text-xs text-bl-muted">
      <div className="flex h-16 items-center justify-between">
        <Link href="/" onClick={() => setOpen(false)} className="font-bold text-bl-fg">
          robin<span className="text-bl-acc">.</span>ren
        </Link>
        <nav className="flex items-center gap-4 md:gap-7">
          {NAV.map((n) => {
            const active = isActive(n.match);
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
          <button
            type="button"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? (lang === "en" ? "Close menu" : "关闭菜单") : lang === "en" ? "Open menu" : "打开菜单"}
            onClick={() => setOpen((v) => !v)}
            className={`-mr-2 flex h-10 w-10 items-center justify-center transition-colors focus-visible:text-bl-acc focus-visible:outline-none sm:hidden ${
              open ? "text-bl-acc" : "hover:text-bl-fg"
            }`}
          >
            <span aria-hidden className="flex w-5 flex-col gap-1.5">
              <span className={`block h-px bg-current transition-transform duration-200 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
              <span className={`block h-px bg-current transition-transform duration-200 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </nav>
      </div>

      <nav id={menuId} hidden={!open} className="border-t border-bl-line pb-2 sm:hidden">
        {NAV.map((n, i) => {
          const active = isActive(n.match);
          return (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              aria-current={active ? "page" : undefined}
              className={`flex items-center justify-between border-b border-bl-line py-3.5 text-sm transition-colors last:border-b-0 ${
                active ? "text-bl-acc" : "text-bl-soft hover:text-bl-fg"
              }`}
            >
              <span>{lang === "en" ? n.en : n.zh}</span>
              <span className="text-xs text-bl-muted tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
