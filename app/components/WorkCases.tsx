"use client";

import { works, type Bi } from "@/content/profile";
import { useLang } from "./LangProvider";
import { SectionLabel } from "./Page";

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2 md:grid-cols-[120px_1fr] md:gap-8">
      <p className="font-mono text-xs text-bl-muted">{label}</p>
      <div className="text-[15px] leading-[1.85] text-bl-soft">{children}</div>
    </div>
  );
}

export default function WorkCases() {
  const { lang } = useLang();
  const isEn = lang === "en";
  const t = (b: Bi) => (isEn ? b.en : b.zh);

  return (
    <section className="mb-24">
      <SectionLabel no="01" zh="作品案例" en="case studies" aside={<span>{works.length}</span>} />
      <div className="flex flex-col gap-6">
        {works.map((w, i) => (
          <article
            key={w.slug}
            id={w.slug}
            className="scroll-mt-8 rounded-lg border border-bl-line bg-bl-card p-6 md:p-10"
          >
            <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="mb-3 flex flex-wrap gap-x-3 font-mono text-xs text-bl-muted">
                  <span className="text-bl-acc">{String(i + 1).padStart(2, "0")}</span>
                  <span>{t(w.org)}</span>
                  {w.period && <span>· {t(w.period)}</span>}
                </p>
                <h3 className="text-2xl font-bold tracking-tight md:text-3xl">{t(w.name)}</h3>
              </div>
              <span className="rounded border border-bl-line px-2.5 py-1 font-mono text-xs text-bl-live">
                ● {t(w.status)}
              </span>
            </header>

            <div className="flex flex-col gap-7">
              <Block label={isEn ? "background" : "背景"}>
                <p>{t(w.case.background)}</p>
              </Block>
              <Block label={isEn ? "what I did" : "我做了什么"}>
                <ul className="flex flex-col gap-2">
                  {w.case.did.map((d) => (
                    <li key={d.en} className="flex gap-3">
                      <span className="text-bl-acc">›</span>
                      <span>{t(d)}</span>
                    </li>
                  ))}
                </ul>
              </Block>
              <Block label={isEn ? "results" : "结果"}>
                <ul className="flex flex-col gap-2">
                  {w.case.results.map((r) => (
                    <li key={r.en} className="flex gap-3">
                      <span className="text-bl-live">✓</span>
                      <span>{t(r)}</span>
                    </li>
                  ))}
                </ul>
              </Block>
            </div>

            <footer className="mt-9 flex flex-wrap items-end justify-between gap-6 border-t border-bl-line pt-6">
              <dl className="flex flex-wrap gap-x-10 gap-y-3">
                {w.stats.map((s) => (
                  <div key={s.label.en} className="flex flex-col-reverse">
                    <dt className="font-mono text-xs text-bl-muted">{t(s.label)}</dt>
                    <dd className="font-mono text-lg font-bold text-bl-fg">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-wrap gap-4 font-mono text-xs">
                {(w.links ?? [{ label: w.href.replace(/^https?:\/\//, ""), href: w.href }]).map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bl-muted transition-colors hover:text-bl-acc"
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
