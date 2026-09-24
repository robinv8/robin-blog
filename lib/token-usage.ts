import { readFile } from "fs/promises";
import path from "path";
import { siteConfig } from "@/site.config";
import { notionGetPage, normalizeRecordMap } from "@/lib/notion/api";
import {
  parseTokenUsageFile,
  type TokenUsageFile,
} from "./token-usage-format";
import { parseTokenUsageFromRecordMap } from "./token-usage-record-map";

export type {
  TokenUsageAgent,
  TokenUsageMonth,
  TokenUsageFile,
} from "./token-usage-format";

export { parseTokenUsageFile } from "./token-usage-format";
export { parseTokenUsageFromRecordMap } from "./token-usage-record-map";

async function loadTokenUsageFromFile(): Promise<TokenUsageFile | null> {
  try {
    const file = path.join(process.cwd(), "public/data/token-usage.json");
    const raw = await readFile(file, "utf8");
    return parseTokenUsageFile(raw);
  } catch {
    return null;
  }
}

async function loadTokenUsageFromNotion(): Promise<TokenUsageFile | null> {
  const pageId = siteConfig.notionTokenUsePageId;
  if (!pageId) return null;

  try {
    const recordMap = normalizeRecordMap(await notionGetPage(pageId));
    return parseTokenUsageFromRecordMap(recordMap, pageId);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.warn(
      `[token-usage] Notion page ${pageId} failed: ${msg}; falling back to static file`
    );
    return null;
  }
}

/** Server-only. Notion page first; public/data/token-usage.json if missing/invalid. */
export async function loadTokenUsage(): Promise<TokenUsageFile | null> {
  const fromNotion = await loadTokenUsageFromNotion();
  if (fromNotion) return fromNotion;
  return loadTokenUsageFromFile();
}
