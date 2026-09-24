export interface TokenUsageAgent {
  name: string;
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  totalTokens: number;
  costUsd: number;
}

export interface TokenUsageMonth {
  period: string;
  inputTokens: number;
  outputTokens: number;
  cacheCreationTokens: number;
  cacheReadTokens: number;
  totalTokens: number;
  costUsd: number;
  agents: TokenUsageAgent[];
}

export interface TokenUsageFile {
  updatedAt: string;
  source: string;
  note?: string;
  months: TokenUsageMonth[];
}

export async function loadTokenUsage(): Promise<TokenUsageFile | null> {
  const { readFile } = await import("node:fs/promises");
  const { join } = await import("node:path");
  try {
    const raw = await readFile(join(process.cwd(), "public/data/token-usage.json"), "utf8");
    return JSON.parse(raw) as TokenUsageFile;
  } catch {
    return null;
  }
}
