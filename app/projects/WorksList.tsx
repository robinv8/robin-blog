"use client";

import Reveal from "../components/Reveal";
import { SectionLabel } from "../components/Page";
import { useLang } from "../components/LangProvider";
import { WORKS, WORK_STATUS, type Work } from "@/lib/projects";

function hostOf(url: string): string {
  try {
    return new URL(url).host;
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
}

function WorkRow({ work, index }: { work: Work; index: number }) {
  const { lang } = useLang();
  const isEn = lang === "en";
  const title = isEn ? work.en : work.zh;
  const label = isEn ? work.zh : work.en;
  const showLabel = work.zh !== work.en;
  const status = WORK_STATUS[work.status];
  const no = String(index + 1).padStart(2, "0");
  const body = (
    <>
      <span className="font-mono text-xs text-current/35 group-hover:text-[#FAFAF6]/70 transition-colors">
        {no}
      </span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h3 className="font-serif-sc font-bold text-xl md:text-2xl group-hover:text-[#FAFAF6] group-hover:translate-x-1 transition-all">
            {title}
          </h3>
          {showLabel && (
            <span className="font-mono text-[10px] tracking-[0.25em] text-current/35 group-hover:text-[#FAFAF6]/60 transition-colors">
              {label}
            </span>
          )}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-current/55 group-hover:text-[#FAFAF6]/75 transition-colors max-w-xl">
          {isEn ? work.descEn : work.descZh}
        </p>
        {work.url && (
          <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-current/40 group-hover:text-[#FAFAF6]/70 transition-colors">
            {hostOf(work.url)} ↗
          </p>
        )}
      </div>
      <span className="font-mono text-[10px] tracking-[0.2em] text-[#FF4D00] group-hover:text-[#FAFAF6] justify-self-end whitespace-nowrap transition-colors">
        {isEn ? status.en : status.zh}
      </span>
    </>
  );

  const rowClass =
    "group grid grid-cols-[3rem_1fr] md:grid-cols-[4rem_1fr_auto] items-baseline gap-4 md:gap-8 py-7 border-b border-[#1B1B18]/15 dark:border-[#E8E6DF]/15 -mx-3 px-3 transition-colors duration-200";

  if (work.url) {
    return (
      <a
        href={work.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${rowClass} hover:bg-[#FF4D00]`}
      >
        {body}
      </a>
    );
  }

  return <div className={rowClass}>{body}</div>;
}

export default function WorksList() {
  return (
    <section className="mb-20">
      <Reveal>
        <SectionLabel no="01" zh="在做的" en="WORKS" />
      </Reveal>
      <div className="border-t border-[#1B1B18]/15 dark:border-[#E8E6DF]/15">
        {WORKS.map((work, i) => (
          <Reveal key={work.id} delay={i * 50}>
            <WorkRow work={work} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
