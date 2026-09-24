"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { useLang } from "./LangProvider";

const noopSubscribe = () => () => {};

export function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <button
      onClick={() => setLang(lang === "zh" ? "en" : "zh")}
      className="hover:text-bl-fg transition-colors"
      title={lang === "zh" ? "Switch to English" : "切换到中文"}
    >
      <span className={lang === "zh" ? "text-bl-fg" : ""}>中</span> /{" "}
      <span className={lang === "en" ? "text-bl-fg" : ""}>EN</span>
    </button>
  );
}

export function ThemeSwitch() {
  const { lang } = useLang();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const isDark = mounted && resolvedTheme === "dark";
  const label = isDark ? (lang === "en" ? "◐ light" : "◐ 浅色") : lang === "en" ? "◐ dark" : "◐ 深色";

  return (
    <button onClick={() => setTheme(isDark ? "light" : "dark")} className="hover:text-bl-fg transition-colors" title={label}>
      {mounted ? label : "◐"}
    </button>
  );
}

export default function Toggles() {
  return (
    <>
      <LangSwitch />
      <ThemeSwitch />
    </>
  );
}
