"use client";

import React, { useEffect, useMemo, useState } from "react";
import { getPageTableOfContents } from "notion-utils";
import type { ExtendedRecordMap } from "notion-types";
import { useLang } from "../../components/LangProvider";

const levelStyles: Record<number, string> = {
  1: "pl-3",
  2: "pl-6",
  3: "pl-9 text-[11px]",
};

const blockSelector = (id: string) => `.notion-block-${id.replaceAll("-", "")}`;

export default function TableOfContents({
  recordMap,
  pageId,
}: {
  recordMap: ExtendedRecordMap;
  pageId: string;
}) {
  const { lang } = useLang();
  const [activeId, setActiveId] = useState<string | null>(null);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const nodes = useMemo(() => {
    const page =
      (recordMap.block[pageId] as any)?.value ??
      (recordMap.block[pageId.replaceAll("-", "")] as any)?.value ??
      (Object.values(recordMap.block)[0] as any)?.value;
    if (!page) return [];
    return getPageTableOfContents(page, recordMap as any).map((node: any) => {
      const type = (recordMap.block[node.id] as any)?.value?.type;
      const level = type === "sub_header" ? 2 : type === "sub_sub_header" ? 3 : 1;
      return { id: node.id as string, text: node.text as string, level };
    });
  }, [recordMap, pageId]);
  /* eslint-enable @typescript-eslint/no-explicit-any */

  useEffect(() => {
    if (!nodes.length) return;
    const onScroll = () => {
      let current: string | null = null;
      for (const node of nodes) {
        const el = document.querySelector(blockSelector(node.id));
        if (el && el.getBoundingClientRect().top <= 120) current = node.id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [nodes]);

  if (!nodes.length) return null;

  const scrollTo = (id: string) => {
    const target = document.querySelector(blockSelector(id));
    if (!target) return;
    const top = document.documentElement.scrollTop + target.getBoundingClientRect().top - 80;
    document.documentElement.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <nav className="max-h-[70vh] overflow-y-auto border-l border-bl-line font-mono text-xs">
      <p className="mb-3 pl-3 text-bl-muted">{lang === "en" ? "contents" : "目录"}</p>
      {nodes.map((node) => {
        const active = node.id === activeId;
        return (
          <button
            key={node.id}
            onClick={() => scrollTo(node.id)}
            title={node.text}
            className={`-ml-px block w-full truncate border-l py-1.5 text-left transition-colors ${
              active ? "border-bl-acc text-bl-acc" : "border-transparent text-bl-muted hover:text-bl-fg"
            } ${levelStyles[node.level] ?? levelStyles[3]}`}
          >
            {node.text}
          </button>
        );
      })}
    </nav>
  );
}
