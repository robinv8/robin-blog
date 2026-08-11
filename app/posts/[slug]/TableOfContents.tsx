"use client";

import React from "react";
import { getPageTableOfContents } from "notion-utils";
import type { ExtendedRecordMap } from "notion-types";

export default function TableOfContents({
  recordMap,
  pageId,
}: {
  recordMap: ExtendedRecordMap;
  pageId: string;
}) {
  const page =
    (recordMap.block[pageId] as any)?.value ??
    (recordMap.block[pageId.replaceAll("-", "")] as any)?.value ??
    (Object.values(recordMap.block)[0] as any)?.value;
  if (!page) return null;

  const nodes = getPageTableOfContents(page, recordMap as any);
  if (!nodes.length) return null;

  const getHeaderLevel = (node: any) => {
    const block = (recordMap.block[node.id] as any)?.value;
    if (block?.type === "header") return 1;
    if (block?.type === "sub_header") return 2;
    if (block?.type === "sub_sub_header") return 3;
    return 1;
  };

  const levelStyles: Record<number, string> = {
    1: "pl-2 font-medium text-slate-700 dark:text-slate-300",
    2: "pl-6 text-slate-600 dark:text-slate-400",
    3: "pl-10 text-xs text-slate-500 dark:text-slate-500",
  };

  const scrollTo = (id: string) => {
    const target = document.querySelector(`.notion-block-${id.replaceAll("-", "")}`);
    if (!target) return;
    const top = document.documentElement.scrollTop + target.getBoundingClientRect().top - 80;
    document.documentElement.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <nav className="glass-card rounded-2xl p-4 max-h-[70vh] overflow-y-auto">
      <p className="px-2 pb-2 mb-2 text-xs font-semibold tracking-wide text-slate-400 border-b border-slate-200/60 dark:border-slate-700/60">
        目录
      </p>
      {nodes.map((node: any) => {
        const level = getHeaderLevel(node);
        return (
          <a
            key={node.id}
            onClick={() => scrollTo(node.id)}
            title={node.text}
            className={`block py-1.5 px-2 cursor-pointer rounded-lg text-sm truncate hover:bg-slate-500/10 hover:text-primary transition-colors ${levelStyles[level] ?? levelStyles[3]}`}
          >
            {node.text}
          </a>
        );
      })}
    </nav>
  );
}
