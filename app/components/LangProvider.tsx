"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import type { Lang } from "@/lib/i18n";

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "zh",
  setLang: () => {},
});

const STORAGE_KEY = "robin-lang";
const listeners = new Set<() => void>();
let memoryLang: Lang | null = null;

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot(): Lang {
  if (memoryLang) return memoryLang;
  try {
    return localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "zh";
  } catch {
    return "zh";
  }
}

const getServerSnapshot = (): Lang => "zh";

function setLang(l: Lang) {
  memoryLang = l;
  try {
    localStorage.setItem(STORAGE_KEY, l);
  } catch {}
  listeners.forEach((cb) => cb());
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

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
