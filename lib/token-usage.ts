import { readFile } from "fs/promises";
import path from "path";
import type { TokenUsageFile } from "./token-usage-format";

export type {
  TokenUsageAgent,
  TokenUsageMonth,
  TokenUsageFile,
} from "./token-usage-format";

/** Server-only. Reads public/data/token-usage.json from cwd; null on miss. */
export async function loadTokenUsage(): Promise<TokenUsageFile | null> {
  try {
    const file = path.join(process.cwd(), "public/data/token-usage.json");
    const raw = await readFile(file, "utf8");
    const data = JSON.parse(raw) as TokenUsageFile;
    if (!data || !Array.isArray(data.months)) return null;
    return data;
  } catch {
    return null;
  }
}
