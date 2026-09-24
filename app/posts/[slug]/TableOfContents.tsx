"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useLang } from "../../components/LangProvider";
import type { Heading } from "./postMeta";

const blockSelector = (id: string) => `.notion-block-${id.replaceAll("-", "")}`;

export default function TableOfContents({ headings, articleId }: { headings: Heading[]; articleId: string }) {
  const { lang } = useLang();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const topLevel = useMemo(() => Math.min(...headings.map((h) => h.level)), [headings]);
  const numbered = useMemo(() => {
    let n = 0;
    return headings.map((h) => ({ ...h, no: h.level === topLevel ? String(++n).padStart(2, "0") : null }));
  }, [headings, topLevel]);

  useEffect(() => {
    const onScroll = () => {
      let current: string | null = null;
      for (const h of headings) {
        const el = document.querySelector(blockSelector(h.id));
        if (el && el.getBoundingClientRect().top <= 120) current = h.id;
      }
      setActiveId(current);

      const article = document.getElementById(articleId);
      if (article) {
        const rect = article.getBoundingClientRect();
        const readable = rect.height - window.innerHeight * 0.6;
        const ratio = readable > 0 ? (window.innerHeight * 0.4 - rect.top) / readable : 1;
        setProgress(Math.round(Math.min(1, Math.max(0, ratio)) * 100));
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [headings, articleId]);

  const scrollTo = (id: string) => {
    const target = document.querySelector(blockSelector(id));
    if (!target) return;
    const top = document.documentElement.scrollTop + target.getBoundingClientRect().top - 80;
    document.documentElement.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <nav aria-label={lang === "en" ? "Table of contents" : "目录"} className="font-mono text-xs">
      <p className="mb-3 text-bl-muted">{lang === "en" ? "contents" : "目录 contents"}</p>
      {numbered.length > 0 && (
        <div className="max-h-[60vh] overflow-y-auto">
          {numbered.map((h) => {
            const active = h.id === activeId;
            return (
              <button
                key={h.id}
                onClick={() => scrollTo(h.id)}
                title={h.text}
                aria-current={active ? "location" : undefined}
                className={`flex w-full gap-2.5 border-l py-[7px] text-left transition-colors ${
                  active ? "border-bl-acc text-bl-fg" : "border-bl-line text-bl-muted hover:text-bl-fg"
                } ${h.no ? "pl-3" : "pl-8 text-[11px]"}`}
              >
                {h.no && <span className={active ? "text-bl-acc" : ""}>{h.no}</span>}
                <span className={`line-clamp-2 font-sans leading-snug ${h.no ? "text-[13px]" : "text-xs"} ${active ? "font-semibold" : ""}`}>{h.text}</span>
              </button>
            );
          })}
        </div>
      )}
      <div className="mt-5">
        <div className="h-0.5 overflow-hidden rounded-full bg-bl-line">
          <div className="h-full origin-left rounded-full bg-bl-acc transition-transform duration-150" style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
        <p className="mt-2 flex justify-between text-[11px] text-bl-muted">
          <span>{lang === "en" ? "progress" : "阅读进度"}</span>
          <span className="text-bl-acc tabular-nums">{progress}%</span>
        </p>
      </div>
    </nav>
  );
}
