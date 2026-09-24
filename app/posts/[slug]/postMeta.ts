import { getPageTableOfContents, getTextContent } from "notion-utils";
import type { ExtendedRecordMap } from "notion-types";

export interface Heading {
  id: string;
  text: string;
  level: 1 | 2 | 3;
}

const LEVELS: Record<string, Heading["level"]> = { header: 1, sub_header: 2, sub_sub_header: 3 };

const TEXT_TYPES = new Set([
  "text",
  "header",
  "sub_header",
  "sub_sub_header",
  "bulleted_list",
  "numbered_list",
  "to_do",
  "toggle",
  "quote",
  "callout",
]);

/* eslint-disable @typescript-eslint/no-explicit-any */
// Newer notion-client responses nest the block one level deeper: { value: { value, role } }
function blockValue(entry: any): any {
  const outer = entry?.value;
  return outer && !("type" in outer) && "value" in outer ? outer.value : outer;
}

export function getHeadings(recordMap: ExtendedRecordMap, pageId: string): Heading[] {
  const page =
    blockValue(recordMap.block[pageId]) ??
    blockValue(recordMap.block[pageId.replaceAll("-", "")]) ??
    blockValue(Object.values(recordMap.block)[0]);
  if (!page) return [];
  return getPageTableOfContents(page, recordMap as any).map((node: any) => ({
    id: node.id as string,
    text: node.text as string,
    level: LEVELS[blockValue(recordMap.block[node.id])?.type] ?? 1,
  }));
}

export function getReadingStats(recordMap: ExtendedRecordMap) {
  let cjk = 0;
  let latin = 0;
  for (const entry of Object.values(recordMap.block)) {
    const block = blockValue(entry);
    if (!block || !TEXT_TYPES.has(block.type) || !block.properties?.title) continue;
    const text = getTextContent(block.properties.title);
    cjk += text.match(/[\u3400-\u9fff]/g)?.length ?? 0;
    latin += text.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g)?.length ?? 0;
  }
  return {
    words: cjk + latin,
    minutes: Math.max(1, Math.round(cjk / 400 + latin / 220)),
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */
