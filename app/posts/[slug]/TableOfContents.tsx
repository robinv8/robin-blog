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
    1: "pl-3 font-bold",
    2: "pl-6",
    3: "pl-9 text-[10px]",
  };

  const scrollTo = (id: string) => {
    const target = document.querySelector(`.notion-block-${id.replaceAll("-", "")}`);
    if (!target) return;
    const top = document.documentElement.scrollTop + target.getBoundingClientRect().top - 80;
    document.documentElement.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <nav className="border border-[#1B1B18]/15 dark:border-[#E8E6DF]/15 p-4 max-h-[70vh] overflow-y-auto">
      <p className="font-mono text-[10px] tracking-[0.3em] text-[#FF4D00] pb-3 mb-2 border-b border-[#1B1B18]/15 dark:border-[#E8E6DF]/15">
        [ 目录 / TOC ]
      </p>
      {nodes.map((node: any) => {
        const level = getHeaderLevel(node);
        return (
          <a
            key={node.id}
            onClick={() => scrollTo(node.id)}
            title={node.text}
            className={`block py-1.5 cursor-pointer font-mono text-[11px] tracking-wide truncate text-current/60 hover:text-[#FF4D00] transition-colors ${levelStyles[level] ?? levelStyles[3]}`}
          >
            {node.text}
          </a>
        );
      })}
    </nav>
  );
}
