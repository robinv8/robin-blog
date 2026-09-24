export type TokenUsageAgent = {
  name: string;
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  totalTokens: number;
  costUsd: number;
};

export type TokenUsageMonth = {
  period: string;
  inputTokens: number;
  outputTokens: number;
  cacheCreationTokens: number;
  cacheReadTokens: number;
  totalTokens: number;
  costUsd: number;
  agents: TokenUsageAgent[];
};

export type TokenUsageFile = {
  updatedAt: string;
  source: string;
  note?: string;
  months: TokenUsageMonth[];
};

function stripJsonFences(raw: string): string {
  const trimmed = raw.trim();
  const fenced = trimmed.match(/^```(?:json)?\s*\r?\n?([\s\S]*?)\r?\n?```$/i);
  return fenced ? fenced[1].trim() : trimmed;
}

/**
 * Accept a TokenUsageFile object or a JSON string (optionally fenced).
 * Same shape loadTokenUsage expects: an object with a months array.
 */
export function parseTokenUsageFile(raw: unknown): TokenUsageFile | null {
  let data: unknown = raw;
  if (typeof raw === "string") {
    try {
      data = JSON.parse(stripJsonFences(raw));
    } catch {
      return null;
    }
  }
  if (!data || typeof data !== "object") return null;
  if (!Array.isArray((data as { months?: unknown }).months)) return null;
  return data as TokenUsageFile;
}

/** Compact token counts: 182748 → 183K, 138266509 → 138M, 3308370680 → 3.31B */
export function formatTokens(n: number): string {
  const sign = n < 0 ? "-" : "";
  const abs = Math.abs(n);

  const trim = (value: number) => {
    const digits = value >= 100 ? 0 : value >= 10 ? 1 : 2;
    return value.toFixed(digits).replace(/\.0+$/, "").replace(/(\.\d*[1-9])0+$/, "$1");
  };

  if (abs >= 1e9) return `${sign}${trim(abs / 1e9)}B`;
  if (abs >= 1e6) return `${sign}${trim(abs / 1e6)}M`;
  if (abs >= 1e3) return `${sign}${trim(abs / 1e3)}K`;
  return `${n}`;
}

/** Public-price estimate, always two decimals: 72.9 → $72.90 */
export function formatCostUsd(n: number): string {
  return `$${n.toFixed(2)}`;
}

export function formatPeriod(period: string): string {
  return period.replace("-", ".");
}

export function formatUpdatedAt(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}
