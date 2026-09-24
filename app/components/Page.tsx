"use client";

import { type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useLang } from './LangProvider';

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-bl-bg text-bl-fg antialiased transition-colors duration-300 selection:bg-bl-acc selection:text-bl-bg">
      <div className="mx-auto max-w-6xl px-6 md:px-12">{children}</div>
    </div>
  );
}

function safeDecode(s: string) {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

/** Page masthead: shell prompt, title, alternate-language subtitle, description. */
export function PageHero({
  zh,
  en,
  desc,
  descEn,
}: {
  no?: string;
  zh: string;
  en: string;
  desc?: string;
  descEn?: string;
  punct?: string;
}) {
  const { lang } = useLang();
  const pathname = usePathname();
  const isEn = lang === 'en';
  const title = isEn ? en : zh;
  const alt = isEn ? zh : en;
  const description = isEn ? (descEn ?? desc) : desc;

  return (
    <section className="mb-14 border-b border-bl-line pt-14 pb-12 md:pt-20">
      <p className="mb-6 font-mono text-[13px] text-bl-muted">
        ~/robin <span className="text-bl-acc">$</span> cd {safeDecode(pathname)}
      </p>
      <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-[52px]">{title}</h1>
      {alt !== title && <p className="mt-3 font-mono text-base text-bl-muted">{alt}</p>}
      {description && <p className="mt-6 max-w-xl text-[15px] leading-[1.8] text-bl-soft">{description}</p>}
    </section>
  );
}

/** Mono section label, e.g. "01 selected work". */
export function SectionLabel({
  no,
  zh,
  en,
  aside,
  id,
}: {
  no: string;
  zh: string;
  en: string;
  aside?: ReactNode;
  id?: string;
}) {
  const { lang } = useLang();
  const enText = en.replace(/^—\s*/, '');
  return (
    <div id={id} className="mb-7 flex scroll-mt-8 items-baseline justify-between gap-4 font-mono text-xs text-bl-muted">
      <h2 className="text-bl-fg">
        <span className="mr-2.5 text-bl-acc">{no}</span>
        {lang === 'en' ? enText : zh}
      </h2>
      {aside}
    </div>
  );
}
