"use client";

import React, { ReactNode } from 'react';
import Reveal from './Reveal';
import { useLang } from './LangProvider';

/** Shared page background + container, Swiss editorial style */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAFAF6] dark:bg-[#131311] text-[#1B1B18] dark:text-[#E8E6DF] antialiased transition-colors duration-300 selection:bg-[#FF4D00] selection:text-white">
      <div className="max-w-6xl mx-auto px-6 md:px-10">{children}</div>
    </div>
  );
}

/** Shared page masthead: orange kicker + big serif title + description */
export function PageHero({
  no,
  zh,
  en,
  desc,
  descEn,
  punct,
}: {
  no: string;
  zh: string;
  en: string;
  desc?: string;
  descEn?: string;
  punct?: string;
}) {
  const { lang } = useLang();
  const isEn = lang === 'en';
  const title = isEn ? en : zh;
  const punctuation = punct ?? (isEn ? '.' : '。');
  const description = isEn ? (descEn ?? desc) : desc;

  return (
    <section className="pt-14 md:pt-20 pb-12 border-b border-[#1B1B18]/15 dark:border-[#E8E6DF]/15 mb-12">
      <Reveal>
        <p className="font-mono text-[11px] tracking-[0.3em] mb-6 text-[#FF4D00]">
          [ {no} — {isEn ? zh : en} ]
        </p>
      </Reveal>
      <Reveal delay={100}>
        <h1 className="font-serif-sc font-black text-4xl md:text-6xl tracking-tight">
          {title}
          <span className="text-[#FF4D00]">{punctuation}</span>
        </h1>
      </Reveal>
      {description && (
        <Reveal delay={200}>
          <p className="mt-6 max-w-xl text-sm leading-loose text-current/60">{description}</p>
        </Reveal>
      )}
    </section>
  );
}

/** Shared mono section label, e.g. "01 / 本周精选 FEATURED" */
export function SectionLabel({ no, zh, en }: { no: string; zh: string; en: string }) {
  const { lang } = useLang();
  const isEn = lang === 'en';
  const enText = en.replace(/^—\s*/, '');
  return (
    <h2 className="font-mono text-[11px] tracking-[0.3em] text-current/50 mb-8">
      <span className="text-[#FF4D00]">{no} /</span> {isEn ? enText : `${zh} ${en}`}
    </h2>
  );
}
