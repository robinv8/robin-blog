"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <button
      title="切换主题"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`font-mono text-[11px] tracking-[0.2em] text-current/60 hover:text-[#FF4D00] transition-colors ${className}`}
    >
      {mounted && theme === "dark" ? "[ LIGHT ]" : "[ DARK ]"}
    </button>
  );
}
