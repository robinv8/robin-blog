"use client";

import Reveal from "../components/Reveal";
import { SectionLabel } from "../components/Page";
import { useLang } from "../components/LangProvider";
import {
  formatCostUsd,
  formatPeriod,
  formatTokens,
  formatUpdatedAt,
  type TokenUsageFile,
  type TokenUsageMonth,
} from "@/lib/token-usage";

const COPY = {
  zh: {
    source: "来源",
    updated: "更新",
    intro: "本地会话经 ccusage 汇总。尚未自动刷新。",
    caption:
      "费用为公开价估算，不是账单。Cache Read 计入合计。Grok 会话文件是累计值，ccusage 可能偏大。",
    agent: "智能体",
    input: "Input",
    output: "Output",
    cacheRead: "Cache Read",
    cacheCreate: "Cache Create",
    total: "合计",
    cost: "费用",
    monthTotal: "合计",
    empty: "暂无用量记录。",
  },
  en: {
    source: "SOURCE",
    updated: "UPDATED",
    intro: "Aggregated from local sessions via ccusage. Not auto-refreshed yet.",
    caption:
      "Cost is a public-price estimate, not an invoice. Cache reads are included in totals. Grok session files store cumulative usage, so ccusage may over-count.",
    agent: "AGENT",
    input: "INPUT",
    output: "OUTPUT",
    cacheRead: "CACHE READ",
    cacheCreate: "CACHE CREATE",
    total: "TOTAL",
    cost: "COST",
    monthTotal: "TOTAL",
    empty: "No usage log yet.",
  },
};

function MonthTable({ month, isEn }: { month: TokenUsageMonth; isEn: boolean }) {
  const S = isEn ? COPY.en : COPY.zh;
  const rows = [
    {
      name: S.monthTotal,
      inputTokens: month.inputTokens,
      outputTokens: month.outputTokens,
      cacheReadTokens: month.cacheReadTokens,
      totalTokens: month.totalTokens,
      costUsd: month.costUsd,
      strong: true,
    },
    ...month.agents.map((a) => ({ ...a, strong: false })),
  ];

  return (
    <div className="mb-10 last:mb-0">
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
        <p className="font-serif-sc font-bold text-2xl md:text-3xl">
          {formatPeriod(month.period)}
        </p>
        <p className="font-mono text-[10px] tracking-[0.2em] text-current/40">
          {S.cacheCreate} {formatTokens(month.cacheCreationTokens)}
        </p>
      </div>
      <div className="overflow-x-auto border border-[#1B1B18]/15 dark:border-[#E8E6DF]/15">
        <table className="w-full min-w-[40rem] text-left font-mono text-[11px] tracking-wider">
          <thead>
            <tr className="border-b border-[#1B1B18]/15 dark:border-[#E8E6DF]/15 text-current/40">
              <th className="px-4 py-3 font-normal">{S.agent}</th>
              <th className="px-4 py-3 font-normal text-right">{S.input}</th>
              <th className="px-4 py-3 font-normal text-right">{S.output}</th>
              <th className="px-4 py-3 font-normal text-right">{S.cacheRead}</th>
              <th className="px-4 py-3 font-normal text-right">{S.total}</th>
              <th className="px-4 py-3 font-normal text-right">{S.cost}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.name}
                className="border-b border-[#1B1B18]/10 dark:border-[#E8E6DF]/10 last:border-0"
              >
                <td
                  className={`px-4 py-3 ${
                    row.strong ? "text-[#FF4D00] font-bold" : "text-current/80"
                  }`}
                >
                  {row.name}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-current/70">
                  {formatTokens(row.inputTokens)}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-current/70">
                  {formatTokens(row.outputTokens)}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-current/70">
                  {formatTokens(row.cacheReadTokens)}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-current/85">
                  {formatTokens(row.totalTokens)}
                </td>
                <td
                  className={`px-4 py-3 text-right tabular-nums ${
                    row.strong ? "text-[#FF4D00] font-bold" : "text-current/85"
                  }`}
                >
                  {formatCostUsd(row.costUsd)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function TokenUseLog({ data }: { data: TokenUsageFile | null }) {
  const { lang } = useLang();
  const isEn = lang === "en";
  const S = isEn ? COPY.en : COPY.zh;

  if (!data || data.months.length === 0) {
    return (
      <section>
        <Reveal>
          <SectionLabel no="02" zh="用量" en="TOKEN-USE" />
        </Reveal>
        <p className="font-mono text-xs tracking-[0.2em] text-current/40">{S.empty}</p>
      </section>
    );
  }

  return (
    <section>
      <Reveal>
        <SectionLabel no="02" zh="用量" en="TOKEN-USE" />
      </Reveal>
      <Reveal delay={60}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 font-mono text-[11px] tracking-[0.2em] text-current/50">
          <p>
            {S.source} — {data.source.toUpperCase()}
          </p>
          <p>
            {S.updated} {formatUpdatedAt(data.updatedAt)}
          </p>
        </div>
        <p className="mb-8 max-w-2xl text-sm leading-loose text-current/60">{S.intro}</p>
      </Reveal>
      {data.months.map((month) => (
        <Reveal key={month.period} delay={100}>
          <MonthTable month={month} isEn={isEn} />
        </Reveal>
      ))}
      <Reveal delay={140}>
        <p className="mt-6 max-w-2xl text-xs leading-relaxed text-current/45">{S.caption}</p>
      </Reveal>
    </section>
  );
}
