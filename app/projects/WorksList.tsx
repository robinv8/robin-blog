"use client";

import { SectionLabel } from "../components/Page";
import { useLang } from "../components/LangProvider";
import { WORKS, WORK_STATUS } from "@/lib/projects";

function hostOf(url: string): string {
  try {
    return new URL(url).host;
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
}

export default function WorksList() {
  const { lang } = useLang();
  const isEn = lang === "en";

  return (
    <section className="mb-24">
      <SectionLabel no="02" zh="在线产品" en="shipped" aside={<span>{WORKS.length}</span>} />
      <ul className="border-t border-bl-line">
        {WORKS.map((work, i) => {
          const status = WORK_STATUS[work.status];
          const alt = isEn ? work.zh : work.en;
          const body = (
            <>
              <span className="font-mono text-xs text-bl-muted">{String(i + 1).padStart(2, "0")}</span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-lg font-semibold tracking-tight text-bl-fg transition-colors group-hover:text-bl-acc">
                    {isEn ? work.en : work.zh}
                  </h3>
                  {(work.zh !== work.en || work.aka) && (
                    <span className="font-mono text-xs text-bl-muted">
                      {[work.zh !== work.en ? alt : null, work.aka].filter(Boolean).join(" · ")}
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-[14.5px] leading-[1.75] text-bl-soft">{isEn ? work.descEn : work.descZh}</p>
                {work.url && <p className="mt-1.5 font-mono text-xs text-bl-muted">{hostOf(work.url)} ↗</p>}
              </div>
              <span className="col-start-2 font-mono text-xs whitespace-nowrap text-bl-live md:col-start-auto md:justify-self-end">
                ● {isEn ? status.en.toLowerCase() : status.zh}
              </span>
            </>
          );
          const rowClass =
            "group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 gap-y-2 border-b border-bl-line py-6 md:grid-cols-[3.5rem_1fr_auto] md:gap-x-8";

          return (
            <li key={work.id}>
              {work.url ? (
                <a href={work.url} target="_blank" rel="noopener noreferrer" className={rowClass}>
                  {body}
                </a>
              ) : (
                <div className={rowClass}>{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
