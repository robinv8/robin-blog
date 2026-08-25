"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Reveal from "../components/Reveal";
import { SectionLabel } from "../components/Page";
import { useLang } from "../components/LangProvider";
import {
  formatCostUsd,
  formatPeriod,
  formatTokens,
  formatUpdatedAt,
  type TokenUsageAgent,
  type TokenUsageFile,
  type TokenUsageMonth,
} from "@/lib/token-usage-format";

const ACCENT = "#FF4D00";

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
    tokens: "Tokens",
    estCost: "估算费用",
    snapshot: "快照",
    mix: "构成",
    share: "智能体占比",
    detail: "明细",
    agents: "智能体",
    lead: (name: string, pct: string) => `${name} 占 ${pct} tokens`,
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
    tokens: "TOKENS",
    estCost: "EST. COST",
    snapshot: "SNAPSHOT",
    mix: "MIX",
    share: "AGENT SHARE",
    detail: "DETAIL",
    agents: "AGENTS",
    lead: (name: string, pct: string) => `${name} · ${pct} of tokens`,
  },
};

type Copy = (typeof COPY)[keyof typeof COPY];

function shareOf(part: number, total: number): number {
  if (total <= 0) return 0;
  return part / total;
}

function formatShare(part: number, total: number): string {
  const pct = shareOf(part, total) * 100;
  if (pct > 0 && pct < 0.1) return "<0.1%";
  return `${pct.toFixed(1)}%`;
}

function easeOutExpo(t: number): number {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduced;
}

function useInViewOnce<T extends HTMLElement>(): [
  (node: T | null) => void,
  boolean,
] {
  const [node, setNode] = useState<T | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!node || on) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [node, on]);

  return [setNode, on];
}

function CountUp({
  value,
  format,
  active,
  duration = 1600,
}: {
  value: number;
  format: (n: number) => string;
  active: boolean;
  duration?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(() => format(reduced ? value : 0));

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      if (reduced) {
        setDisplay(format(value));
        return;
      }
      const t = Math.min(1, (now - t0) / duration);
      const current = t === 1 ? value : value * easeOutExpo(t);
      setDisplay(format(current));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value, format, duration, reduced]);

  return <span className="tabular-nums">{display}</span>;
}

function DashKicker({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[10px] tracking-[0.28em] text-current/40">
      {children}
    </p>
  );
}

function MixLegend({
  label,
  value,
  total,
  swatch,
}: {
  label: string;
  value: number;
  total: number;
  swatch: string;
}) {
  return (
    <div className="flex items-baseline gap-2 min-w-0">
      <span
        className="inline-block h-1.5 w-1.5 shrink-0 translate-y-[-1px]"
        style={{ background: swatch }}
        aria-hidden
      />
      <span className="font-mono text-[10px] tracking-[0.18em] text-current/45 truncate">
        {label}
      </span>
      <span className="font-mono text-[10px] tabular-nums text-current/70">
        {formatShare(value, total)}
      </span>
      <span className="font-mono text-[10px] tabular-nums text-current/35">
        {formatTokens(value)}
      </span>
    </div>
  );
}

function AgentRow({
  agent,
  month,
  index,
  count,
}: {
  agent: TokenUsageAgent;
  month: TokenUsageMonth;
  index: number;
  count: number;
}) {
  const tokenShare = shareOf(agent.totalTokens, month.totalTokens);
  const costShare = shareOf(agent.costUsd, month.costUsd);
  const opacity = count <= 1 ? 1 : 1 - (index / (count - 1)) * 0.62;

  return (
    <div className="group grid grid-cols-1 md:grid-cols-[7.5rem_minmax(0,1fr)_auto] items-center gap-x-5 gap-y-2 py-3.5 border-b border-[#1B1B18]/10 dark:border-[#E8E6DF]/10 last:border-0">
      <p className="font-mono text-[11px] tracking-[0.22em] text-current/80 group-hover:text-[#FF4D00] transition-colors">
        {agent.name}
      </p>
      <div className="space-y-1.5 min-w-0">
        <div className="h-[3px] bg-current/[0.08] overflow-hidden">
          <div
            data-bar
            className="h-full"
            style={{
              width: `${Math.max(tokenShare * 100, tokenShare > 0 ? 0.4 : 0)}%`,
              background: ACCENT,
              opacity,
              animationDelay: `${160 + index * 70}ms`,
            }}
          />
        </div>
        <div className="h-px bg-current/[0.08] overflow-hidden">
          <div
            data-bar
            className="h-full bg-current/50"
            style={{
              width: `${Math.max(costShare * 100, costShare > 0 ? 0.4 : 0)}%`,
              animationDelay: `${220 + index * 70}ms`,
            }}
          />
        </div>
      </div>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-0.5 md:justify-end font-mono text-[11px] tabular-nums">
        <span className="text-current/40 tracking-wider">
          {formatShare(agent.totalTokens, month.totalTokens)}
        </span>
        <span className="text-current/80">{formatTokens(agent.totalTokens)}</span>
        <span className="text-[#FF4D00]">{formatCostUsd(agent.costUsd)}</span>
      </div>
    </div>
  );
}

function MonthTable({ month, S }: { month: TokenUsageMonth; S: Copy }) {
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
    <div className="overflow-x-auto border border-[#1B1B18]/10 dark:border-[#E8E6DF]/10">
      <table className="w-full min-w-[40rem] text-left font-mono text-[10px] tracking-wider">
        <thead>
          <tr className="border-b border-[#1B1B18]/10 dark:border-[#E8E6DF]/10 text-current/35">
            <th className="sticky left-0 z-10 bg-[#F6F6F2] dark:bg-[#151513] px-3 py-2.5 font-normal">
              {S.agent}
            </th>
            <th className="px-3 py-2.5 font-normal text-right">{S.input}</th>
            <th className="px-3 py-2.5 font-normal text-right">{S.output}</th>
            <th className="px-3 py-2.5 font-normal text-right">{S.cacheRead}</th>
            <th className="px-3 py-2.5 font-normal text-right">{S.total}</th>
            <th className="px-3 py-2.5 font-normal text-right">{S.cost}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.name}
              className="border-b border-[#1B1B18]/8 dark:border-[#E8E6DF]/8 last:border-0"
            >
              <td
                className={`sticky left-0 z-10 bg-[#F6F6F2] dark:bg-[#151513] px-3 py-2.5 ${
                  row.strong ? "text-[#FF4D00] font-bold" : "text-current/55"
                }`}
              >
                {row.name}
              </td>
              <td className="px-3 py-2.5 text-right tabular-nums text-current/45">
                {formatTokens(row.inputTokens)}
              </td>
              <td className="px-3 py-2.5 text-right tabular-nums text-current/45">
                {formatTokens(row.outputTokens)}
              </td>
              <td className="px-3 py-2.5 text-right tabular-nums text-current/45">
                {formatTokens(row.cacheReadTokens)}
              </td>
              <td className="px-3 py-2.5 text-right tabular-nums text-current/60">
                {formatTokens(row.totalTokens)}
              </td>
              <td
                className={`px-3 py-2.5 text-right tabular-nums ${
                  row.strong ? "text-[#FF4D00] font-bold" : "text-current/60"
                }`}
              >
                {formatCostUsd(row.costUsd)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MonthDashboard({ month, S }: { month: TokenUsageMonth; S: Copy }) {
  const [setRef, on] = useInViewOnce<HTMLElement>();
  const agents = useMemo(
    () => [...month.agents].sort((a, b) => b.totalTokens - a.totalTokens),
    [month.agents],
  );
  const lead = agents[0];
  const mix = [
    { key: "cache", label: S.cacheRead, value: month.cacheReadTokens, color: ACCENT },
    { key: "in", label: S.input, value: month.inputTokens, color: "color-mix(in srgb, currentColor 55%, transparent)" },
    { key: "out", label: S.output, value: month.outputTokens, color: "color-mix(in srgb, currentColor 28%, transparent)" },
    { key: "create", label: S.cacheCreate, value: month.cacheCreationTokens, color: "color-mix(in srgb, currentColor 16%, transparent)" },
  ].filter((part) => part.value > 0);

  return (
    <article
      ref={setRef}
      className={`token-dash relative mb-10 last:mb-0 overflow-hidden border border-[#1B1B18]/15 dark:border-[#E8E6DF]/15 bg-[#1B1B18]/[0.02] dark:bg-[#E8E6DF]/[0.025] ${
        on ? "is-on" : ""
      }`}
    >
      <div className="relative px-4 py-6 md:px-8 md:py-8">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-8">
          <p className="font-serif-sc font-bold text-2xl md:text-3xl">
            {formatPeriod(month.period)}
          </p>
          <div className="flex items-center gap-2">
            <span
              data-pulse
              className="inline-block h-1.5 w-1.5 bg-[#FF4D00]"
              aria-hidden
            />
            <p className="font-mono text-[10px] tracking-[0.28em] text-current/40">
              {S.snapshot}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-8">
          <div>
            <p
              className="font-serif-sc font-black text-5xl md:text-7xl tracking-tight leading-none"
              aria-label={`${S.tokens} ${formatTokens(month.totalTokens)}`}
            >
              <CountUp value={month.totalTokens} format={formatTokens} active={on} />
            </p>
            <div
              data-rule
              className="mt-4 h-px w-16 bg-[#FF4D00]"
              style={{ animationDelay: "80ms" }}
            />
            <DashKicker>
              {S.tokens}
              {lead
                ? `  ·  ${S.lead(lead.name, formatShare(lead.totalTokens, month.totalTokens))}`
                : ""}
            </DashKicker>
          </div>
          <div className="md:text-right">
            <p
              className="font-serif-sc font-black text-5xl md:text-7xl tracking-tight leading-none text-[#FF4D00]"
              aria-label={`${S.estCost} ${formatCostUsd(month.costUsd)}`}
            >
              <CountUp
                value={month.costUsd}
                format={formatCostUsd}
                active={on}
                duration={1800}
              />
            </p>
            <div
              data-rule
              className="mt-4 h-px w-16 bg-[#FF4D00] md:ml-auto"
              style={{ animationDelay: "160ms" }}
            />
            <DashKicker>{S.estCost}</DashKicker>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-10 font-mono text-[10px] tracking-[0.16em] text-current/45">
          <span>
            {S.input}{" "}
            <span className="text-current/75 tabular-nums">{formatTokens(month.inputTokens)}</span>
          </span>
          <span>
            {S.output}{" "}
            <span className="text-current/75 tabular-nums">{formatTokens(month.outputTokens)}</span>
          </span>
          <span>
            {S.cacheRead}{" "}
            <span className="text-current/75 tabular-nums">{formatTokens(month.cacheReadTokens)}</span>
          </span>
          <span>
            {S.cacheCreate}{" "}
            <span className="text-current/75 tabular-nums">
              {formatTokens(month.cacheCreationTokens)}
            </span>
          </span>
          <span>
            {S.agents}{" "}
            <span className="text-current/75 tabular-nums">{month.agents.length}</span>
          </span>
        </div>

        <div className="mb-10">
          <DashKicker>{S.mix}</DashKicker>
          <div className="mt-3 overflow-hidden">
            <div data-bar className="flex h-2 w-full" style={{ animationDelay: "120ms" }}>
              {mix.map((part) => (
                <div
                  key={part.key}
                  className="h-full min-w-px"
                  style={{
                    width: `${Math.max(shareOf(part.value, month.totalTokens) * 100, 0.25)}%`,
                    background: part.color,
                  }}
                  title={`${part.label} ${formatShare(part.value, month.totalTokens)}`}
                />
              ))}
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {mix.map((part) => (
              <MixLegend
                key={part.key}
                label={part.label}
                value={part.value}
                total={month.totalTokens}
                swatch={part.color}
              />
            ))}
          </div>
        </div>

        <div className="mb-10">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
            <DashKicker>{S.share}</DashKicker>
            <p className="font-mono text-[9px] tracking-[0.2em] text-current/30">
              {S.tokens} / {S.cost}
            </p>
          </div>
          <div>
            {agents.map((agent, i) => (
              <AgentRow
                key={agent.name}
                agent={agent}
                month={month}
                index={i}
                count={agents.length}
              />
            ))}
          </div>
        </div>

        <DashKicker>{S.detail}</DashKicker>
        <div className="mt-3">
          <MonthTable month={month} S={S} />
        </div>
      </div>
    </article>
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
          <MonthDashboard month={month} S={S} />
        </Reveal>
      ))}
      <Reveal delay={140}>
        <p className="mt-6 max-w-2xl text-xs leading-relaxed text-current/45">{S.caption}</p>
      </Reveal>
    </section>
  );
}
