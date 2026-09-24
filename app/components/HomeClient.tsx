"use client";

import type { ReactNode } from 'react';
import Link from 'next/link';
import Reveal from './Reveal';
import SiteHeader from './Header';
import Footer from './Footer';
import PostRow from './PostRow';
import { PageShell, SectionLabel } from './Page';
import { useLang } from './LangProvider';
import { postsForLang } from '@/lib/i18n';
import { siteConfig } from '@/site.config';
import { profile, works, career } from '@/content/profile';
import type { Post } from '@/schema/post';

const DICT = {
  zh: {
    workMeta: `${works.length} 个项目 · 2020 — 至今`,
    allWork: '全部案例 →',
    allPosts: '全部文章 →',
    empty: '暂无文章。',
    more: [
      { href: '/photography', label: '摄影', hint: 'photos →' },
      { href: '/books', label: '书架', hint: 'books →' },
      { href: '/friends', label: '友链', hint: 'friends →' },
    ],
  },
  en: {
    workMeta: `${works.length} projects · 2020 — now`,
    allWork: 'case studies →',
    allPosts: 'all posts →',
    empty: 'No posts yet.',
    more: [
      { href: '/photography', label: 'Photography', hint: 'photos →' },
      { href: '/books', label: 'Bookshelf', hint: 'books →' },
      { href: '/friends', label: 'Friends', hint: 'links →' },
    ],
  },
};

export default function HomeClient({ posts }: { posts: Post[] }) {
  const { lang } = useLang();
  const S = DICT[lang];
  const latest = postsForLang(posts, lang).slice(0, 3);
  const headline = profile.headline[lang];

  const panel: [string, ReactNode][] = [
    ['status', <span key="s" className="text-bl-live before:mr-1.5 before:align-[1px] before:text-[9px] before:content-['●']">building</span>],
    ['now', <span key="n" className="whitespace-pre-line">{profile.now[lang]}</span>],
    ['shipping', profile.shipping],
    ['based', profile.based[lang]],
    ['mail', <a key="m" href={`mailto:${siteConfig.email}`} className="hover:text-bl-acc transition-colors">{siteConfig.email}</a>],
    [
      'links',
      <span key="l">
        <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-bl-acc transition-colors">github/robinv8</a>
        {' · '}
        <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-bl-acc transition-colors">linkedin</a>
      </span>,
    ],
  ];

  return (
    <PageShell>
      <SiteHeader />

      <section className="grid grid-cols-1 gap-12 border-b border-bl-line pt-16 pb-16 md:pt-24 md:pb-22 lg:grid-cols-[1fr_380px] lg:gap-16">
        <Reveal>
          <p className="mb-7 font-mono text-[13px] text-bl-muted">
            ~/robin <span className="text-bl-acc">$</span> whoami
            <span className="bl-cursor ml-1 inline-block h-[15px] w-2 bg-bl-acc align-[-2px]" />
          </p>
          <h1 className="text-5xl font-bold leading-[1.12] tracking-tight md:text-[64px]">
            {profile.name[lang]}
            <span className="mt-3.5 block font-mono text-base font-medium tracking-normal text-bl-muted md:text-lg">
              {profile.subtitle[lang]}
            </span>
          </h1>
          <p className="mt-9 text-xl font-medium leading-normal md:text-[26px]">
            {headline.before}
            <span className="text-bl-acc">{headline.accent}</span>
            {headline.after}
          </p>
          <p className="mt-3 text-base leading-[1.7] text-bl-muted">
            {profile.intro[lang][0]}
            <br />
            {profile.intro[lang][1]}
          </p>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {profile.tags.map((t) => (
              <li key={t.en} className="rounded border border-bl-line px-3 py-1.5 font-mono text-xs text-bl-soft">
                {t[lang]}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={150} className="self-end">
          <aside className="rounded-lg border border-bl-line bg-bl-panel font-mono text-[12.5px]">
            <div className="flex gap-1.5 border-b border-bl-line px-3.5 py-3">
              <i className="size-[9px] rounded-full bg-bl-line" />
              <i className="size-[9px] rounded-full bg-bl-line" />
              <i className="size-[9px] rounded-full bg-bl-line" />
            </div>
            <dl className="px-[18px] pt-2 pb-3.5">
              {panel.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-dashed border-bl-line py-2.5 last:border-0">
                  <dt className="text-bl-muted">{k}</dt>
                  <dd className="text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </Reveal>
      </section>

      <section id="work" className="scroll-mt-8 pt-20">
        <Reveal>
          <SectionLabel
            no="01"
            zh="精选作品"
            en="selected work"
            aside={<Link href="/projects" className="hover:text-bl-acc transition-colors">{S.allWork}</Link>}
          />
        </Reveal>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-bl-line bg-bl-line md:grid-cols-2">
          {works.map((w) => (
            <article key={w.slug} className="group relative flex flex-col gap-3.5 bg-bl-card p-7 transition-colors hover:bg-bl-card-hover md:p-8">
              <div className="flex justify-between gap-4 font-mono text-xs text-bl-muted">
                <span>{w.org[lang]}</span>
                <span className="shrink-0 text-bl-acc">● {w.status[lang]}</span>
              </div>
              <h3 className="text-2xl font-semibold tracking-tight">
                <Link href={`/projects#${w.slug}`} className="after:absolute after:inset-0">
                  {w.name[lang]}
                </Link>
              </h3>
              <p className="flex-1 text-[14.5px] leading-[1.75] text-bl-soft">{w.desc[lang]}</p>
              <div className="mt-1.5 flex border-t border-bl-line pt-4">
                {w.stats.map((s) => (
                  <div key={s.label.en} className="flex-1">
                    <b className="block font-mono text-xl font-bold">{s.value}</b>
                    <small className="font-mono text-[11px] text-bl-muted">{s.label[lang]}</small>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-mono text-xs text-bl-muted">
                <span className="transition-colors group-hover:text-bl-acc">{lang === 'en' ? 'read case →' : '查看案例 →'}</span>
                <a href={w.href} target="_blank" rel="noopener noreferrer" className="relative z-10 hover:text-bl-acc transition-colors">
                  {w.href.replace(/^https?:\/\//, '')} ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pt-20">
        <Reveal>
          <SectionLabel id="log" no="02" zh="经历" en="git log --career" aside={<span>2014 → HEAD</span>} />
        </Reveal>
        <Reveal>
          <ul className="rounded-lg border border-bl-line py-3 font-mono text-[13.5px]">
            {career.map((r) => (
              <li
                key={r.period.en}
                className="grid grid-cols-[28px_1fr] gap-y-1 px-5 py-3.5 transition-colors hover:bg-bl-panel md:grid-cols-[40px_190px_1fr] md:px-7"
              >
                <span className="text-bl-acc">*</span>
                <span className="text-bl-muted">{r.period[lang]}</span>
                <span className="col-start-2 font-sans text-[15px] md:col-start-auto">
                  {r.current && <span className="mr-1.5 font-mono text-[13.5px] text-bl-live">(HEAD)</span>}
                  {r.title[lang]}
                  <small className="mt-1 block text-[13.5px] leading-relaxed text-bl-muted">{r.note[lang]}</small>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="pt-20">
        <Reveal>
          <SectionLabel
            no="03"
            zh="最新写作"
            en="latest writing"
            aside={<Link href="/posts" className="hover:text-bl-acc transition-colors">{S.allPosts}</Link>}
          />
        </Reveal>
        {latest.length === 0 ? (
          <p className="border-y border-bl-line py-10 text-center text-sm text-bl-muted">{S.empty}</p>
        ) : (
          <ul>
            {latest.map((post, i) => (
              <Reveal key={post.id} delay={i * 60}>
                <li>
                  <PostRow post={post} first={i === 0} />
                </li>
              </Reveal>
            ))}
          </ul>
        )}
      </section>

      <section className="grid grid-cols-1 gap-4 pt-20 sm:grid-cols-3">
        {S.more.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className="flex items-baseline justify-between rounded-lg border border-bl-line px-6 py-5.5 text-[15px] transition-colors hover:border-bl-acc"
          >
            {m.label}
            <small className="font-mono text-xs text-bl-muted">{m.hint}</small>
          </Link>
        ))}
      </section>

      <Footer />
    </PageShell>
  );
}
