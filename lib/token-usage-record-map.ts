import { getTextContent, idToUuid } from "notion-utils";
import { parseTokenUsageFile, type TokenUsageFile } from "./token-usage-format";

type NotionBlock = {
  type?: string;
  properties?: { title?: unknown };
  content?: string[];
};

function getBlockValue(entry: unknown): NotionBlock | null {
  if (!entry || typeof entry !== "object") return null;
  const value = (entry as { value?: unknown }).value;
  if (!value || typeof value !== "object") return null;
  return value as NotionBlock;
}

function codeBlockText(block: NotionBlock): string {
  const title = block.properties?.title;
  if (typeof title === "string") return title;
  return getTextContent(title as Parameters<typeof getTextContent>[0]);
}

function resolveRootId(
  blockMap: Record<string, unknown>,
  pageId: string
): string | null {
  const compact = pageId.replace(/-/g, "");
  const uuid = compact.length === 32 ? idToUuid(compact) : pageId;
  if (blockMap[uuid]) return uuid;
  if (blockMap[pageId]) return pageId;
  if (blockMap[compact]) return compact;
  return null;
}

/** First code/JSON block in page order that parses as TokenUsageFile. */
export function parseTokenUsageFromRecordMap(
  recordMap: unknown,
  pageId: string
): TokenUsageFile | null {
  const blockMap = (recordMap as { block?: Record<string, unknown> })?.block;
  if (!blockMap || typeof blockMap !== "object") return null;

  const texts: string[] = [];
  const visited = new Set<string>();

  const collect = (block: NotionBlock) => {
    if (block.type !== "code") return;
    const text = codeBlockText(block);
    if (text.trim()) texts.push(text);
  };

  const walk = (id: string) => {
    if (!id || visited.has(id)) return;
    visited.add(id);
    const block = getBlockValue(blockMap[id]);
    if (!block) return;
    collect(block);
    for (const childId of block.content ?? []) {
      if (typeof childId === "string") walk(childId);
    }
  };

  const rootId = resolveRootId(blockMap, pageId);
  if (rootId) {
    walk(rootId);
  } else {
    for (const id of Object.keys(blockMap)) {
      const block = getBlockValue(blockMap[id]);
      if (block) collect(block);
    }
  }

  for (const text of texts) {
    const parsed = parseTokenUsageFile(text);
    if (parsed) return parsed;
  }
  return null;
}
