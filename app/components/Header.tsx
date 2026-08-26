"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { LangToggle, useLang } from "./LangProvider";

const NAV = [
  { href: "/", zh: "首页", en: "HOME" },
  { href: "/photography", zh: "摄影", en: "PHOTOS" },
  { href: "/projects", zh: "项目", en: "WORKS" },
  { href: "/about", zh: "关于", en: "ABOUT" },
];

function linkClass(active: boolean) {
  return `u-link font-mono text-[11px] tracking-[0.2em] transition-colors ${
    active ? "text-[#FF4D00] font-bold" : "text-current/60 hover:text-current"
  }`;
}

export default function Header({ includeHome = true }: { includeHome?: boolean }) {
  const pathname = usePathname();
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const items = includeHome ? NAV : NAV.filter((n) => n.href !== "/");

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
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
    <header className="py-5 border-b border-[#1B1B18]/15 dark:border-[#E8E6DF]/15">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="shrink-0 whitespace-nowrap font-mono text-xs tracking-[0.25em] font-bold"
        >
          ROBIN<span className="text-[#FF4D00]">®</span> BLOG
        </Link>

        <nav className="hidden md:flex items-center gap-5 md:gap-7">
          {items.map((n) => {
            const active = pathname === n.href;
            return (
              <Link key={n.href} href={n.href} className={linkClass(active)}>
                {lang === "en" ? n.en : n.zh}
              </Link>
            );
          })}
          <Link
            href="/search"
            aria-label={lang === "en" ? "Search" : "搜索"}
            className="u-link font-mono text-[11px] tracking-[0.2em] text-current/60 hover:text-current transition-colors"
          >
            {lang === "en" ? "SEARCH" : "搜索"}
          </Link>
          <LangToggle />
          <ThemeToggle />
        </nav>

        <div className="flex md:hidden items-center">
          <button
            type="button"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={
              open
                ? lang === "en"
                  ? "Close menu"
                  : "关闭菜单"
                : lang === "en"
                  ? "Open menu"
                  : "打开菜单"
            }
            onClick={() => setOpen((v) => !v)}
            className={`relative flex h-10 w-10 items-center justify-center font-mono text-[11px] tracking-[0.2em] transition-colors ${
              open ? "text-[#FF4D00]" : "text-current/60 hover:text-current"
            }`}
          >
            <span aria-hidden className="flex w-5 flex-col items-stretch gap-1.5">
              <span
                className={`block h-px bg-current transition-transform duration-200 ${
                  open ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px bg-current transition-transform duration-200 ${
                  open ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <nav
        id={menuId}
        hidden={!open}
        className="md:hidden mt-4 border-t border-[#1B1B18]/15 dark:border-[#E8E6DF]/15"
      >
        {items.map((n, i) => {
          const active = pathname === n.href;
          return (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between py-3.5 border-b border-[#1B1B18]/10 dark:border-[#E8E6DF]/10 ${linkClass(active)}`}
            >
              <span>{lang === "en" ? n.en : n.zh}</span>
              <span className="text-current/30 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
            </Link>
          );
        })}
        <Link
          href="/search"
          aria-label={lang === "en" ? "Search" : "搜索"}
          onClick={() => setOpen(false)}
          className="flex items-center justify-between py-3.5 border-b border-[#1B1B18]/10 dark:border-[#E8E6DF]/10 u-link font-mono text-[11px] tracking-[0.2em] text-current/60 hover:text-current transition-colors"
        >
          <span>{lang === "en" ? "SEARCH" : "搜索"}</span>
          <span className="text-current/30 tabular-nums">
            {String(items.length + 1).padStart(2, "0")}
          </span>
        </Link>
        <div className="flex items-center justify-between pt-4">
          <LangToggle />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
