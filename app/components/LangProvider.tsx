"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Lang } from "@/lib/i18n";

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "zh",
  setLang: () => {},
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("zh");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("robin-lang");
      if (saved === "zh" || saved === "en") setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("robin-lang", l);
    } catch {}
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

/** Inline bilingual text: renders zh or en depending on current language. */
export function T({ zh, en }: { zh: React.ReactNode; en: React.ReactNode }) {
  const { lang } = useLang();
  return <>{lang === "en" ? en : zh}</>;
}

/** Header language switch, same mono style as ThemeToggle. */
export function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <button
      title={lang === "zh" ? "Switch to English" : "切换到中文"}
      onClick={() => setLang(lang === "zh" ? "en" : "zh")}
      className={`font-mono text-[11px] tracking-[0.2em] text-current/60 hover:text-[#FF4D00] transition-colors ${className}`}
    >
      [{" "}
      <span className={lang === "zh" ? "font-bold text-[#FF4D00]" : ""}>中</span>
      {" / "}
      <span className={lang === "en" ? "font-bold text-[#FF4D00]" : ""}>EN</span>
      {" ]"}
    </button>
  );
}
