"use client";

import { T, useLang } from "./LangProvider";
import { SectionLabel } from "./Page";
import { localProjects } from "@/content/projects/agent-token-usage";
import type { TokenUsageFile } from "@/lib/token-usage";

function formatTokens(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function formatUsd(n: number): string {
  return `$${n.toFixed(2)}`;
}

export default function ProjectsLog({ usage, notesShown }: { usage: TokenUsageFile | null; notesShown: boolean }) {
  const { lang } = useLang();
  const latest = usage?.months[0];

  return (
    <section className="mb-8">
      <SectionLabel no={notesShown ? "04" : "03"} zh="进行中" en="in progress" />
      <ul className="flex flex-col gap-6">
        {localProjects.map((project) => (
          <li key={project.slug} className="rounded-lg border border-bl-line bg-bl-card p-6 md:p-10">
            <p className="mb-3 font-mono text-xs text-bl-live">
              ● {lang === "en" ? project.statusEn : project.statusZh}
            </p>
            <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
              {lang === "en" ? project.en : project.zh}
            </h3>
            <p className="mt-3 max-w-xl text-[15px] leading-[1.85] text-bl-soft">
              {lang === "en" ? project.descEn : project.descZh}
            </p>
            {latest ? (
              <div className="mt-8 overflow-x-auto">
                <p className="mb-4 font-mono text-xs text-bl-muted">
                  $ ccusage --month {latest.period}
                  {usage?.updatedAt ? `  # ${usage.updatedAt.slice(0, 10)}` : ""}
                </p>
                <table className="w-full min-w-[32rem] text-left font-mono text-[13px]">
                  <thead className="text-xs text-bl-muted">
                    <tr className="border-b border-bl-line">
                      <th className="py-2 pr-4 font-normal">
                        <T zh="来源" en="agent" />
                      </th>
                      <th className="py-2 pr-4 text-right font-normal">
                        <T zh="合计" en="total" />
                      </th>
                      <th className="py-2 pr-4 text-right font-normal">
                        <T zh="输入" en="input" />
                      </th>
                      <th className="py-2 pr-4 text-right font-normal">
                        <T zh="输出" en="output" />
                      </th>
                      <th className="py-2 text-right font-normal">
                        <T zh="费用" en="cost" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {latest.agents.map((agent) => (
                      <tr key={agent.name} className="border-b border-bl-line text-bl-soft">
                        <td className="py-2.5 pr-4">{agent.name}</td>
                        <td className="py-2.5 pr-4 text-right">{formatTokens(agent.totalTokens)}</td>
                        <td className="py-2.5 pr-4 text-right">{formatTokens(agent.inputTokens)}</td>
                        <td className="py-2.5 pr-4 text-right">{formatTokens(agent.outputTokens)}</td>
                        <td className="py-2.5 text-right">{formatUsd(agent.costUsd)}</td>
                      </tr>
                    ))}
                    <tr className="text-bl-fg">
                      <td className="py-3 pr-4 font-bold">
                        <T zh="合计" en="all" />
                      </td>
                      <td className="py-3 pr-4 text-right font-bold text-bl-acc">{formatTokens(latest.totalTokens)}</td>
                      <td className="py-3 pr-4 text-right">{formatTokens(latest.inputTokens)}</td>
                      <td className="py-3 pr-4 text-right">{formatTokens(latest.outputTokens)}</td>
                      <td className="py-3 text-right font-bold">{formatUsd(latest.costUsd)}</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-4 max-w-xl font-mono text-xs leading-relaxed text-bl-muted">
                  <T
                    zh="费用为公开价估算，不是账单。Cache Read 计入合计。Grok 会话文件是累计值，ccusage 可能偏大。"
                    en="Cost is a public-price estimate, not an invoice. Cache reads are included in totals. Grok session files store cumulative usage, so ccusage may over-count."
                  />
                </p>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
