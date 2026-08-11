"use client";

import React from 'react';
import Link from 'next/link';
import Reveal from './Reveal';
import ThemeToggle from './ThemeToggle';
import CustomCursor from './CustomCursor';
import ScrollProgress from './ScrollProgress';
import { LangToggle, useLang } from './LangProvider';
import { getPostLang, postsForLang } from '@/lib/i18n';
import type { Post } from '@/schema/post';
import dayjs from 'dayjs';

const ACCENT = '#FF4D00';

const NAV = [
  { href: '/photography', zh: '摄影', en: 'PHOTOS' },
  { href: '/projects', zh: '项目', en: 'WORKS' },
  { href: '/about', zh: '关于', en: 'ABOUT' },
];

const SECTIONS = [
  { no: '01', href: '/photography', zh: '摄影', en: 'PHOTOGRAPHY', descZh: '光影与瞬间', descEn: 'Light & moments' },
  { no: '02', href: '/projects', zh: '项目', en: 'WORKS', descZh: '做点儿有趣的东西', descEn: 'Building fun things' },
  { no: '03', href: '/books', zh: '书架', en: 'BOOKSHELF', descZh: '读过的与在读的', descEn: 'Read & reading' },
  { no: '04', href: '/friends', zh: '友链', en: 'LINKS', descZh: '朋友们的站点', descEn: 'Friends of the site' },
  { no: '05', href: '/about', zh: '关于', en: 'ABOUT', descZh: '认识一下我', descEn: 'Get to know me' },
];

const MARQUEE = [
  ['智能体', 'AGENTS'], ['自动化', 'AUTOMATION'], ['工作流', 'WORKFLOW'],
  ['写作', 'WRITING'], ['摄影', 'PHOTOGRAPHY'], ['工具链', 'TOOLING'],
];

const DICT = {
  zh: {
    kicker: '[ AGENT ENGINEER — WRITER ]',
    titleA1: '编写', titleA2: 'Agent', titleA3: '，',
    titleB: '也编写生活', punct: '。',
    intro1: '白天构建 Agent，晚上写博客。对大模型、自动化与工具链有执念，相信好的智能体和好的文字一样——',
    introStrong: '克制、准确、留有余味',
    readPosts: '阅读文章 ↓',
    aboutMe: '关于我 →',
    meta: [
      ['ROLE', 'Agent 工程师'],
      ['FOCUS', 'Agent / 自动化 / 工作流'],
      ['STACK', 'LLM · TypeScript · Tools'],
      ['STATUS', '开放交流'],
    ] as [string, string][],
    now: '至今',
    writingLabel: '最新写作 WRITING',
    empty: '暂无文章。请检查 Notion 配置。',
    readMore: '阅读全文 →',
    figCaption: 'FIG.01 — 卷首',
    sectionsLabel: '栏目索引 INDEX',
    ctaKicker: '03 / 写在最后 END',
    ctaA: '保持热爱，', ctaB: '奔赴山海',
    sayHello: 'SAY HELLO →',
  },
  en: {
    kicker: '[ AGENT ENGINEER — WRITER ]',
    titleA1: 'Build ', titleA2: 'Agents', titleA3: ',',
    titleB: 'Write Life', punct: '.',
    intro1: 'I build agents by day and write by night. Obsessed with LLMs, automation and tooling — I believe good agents, like good prose, are ',
    introStrong: 'restrained, precise, and lingering',
    readPosts: 'READ POSTS ↓',
    aboutMe: 'ABOUT ME →',
    meta: [
      ['ROLE', 'Agent Engineer'],
      ['FOCUS', 'Agents / Automation / Workflows'],
      ['STACK', 'LLM · TypeScript · Tools'],
      ['STATUS', 'Open to chat'],
    ] as [string, string][],
    now: 'Now',
    writingLabel: 'LATEST WRITING',
    empty: 'No posts found. Please check your Notion configuration.',
    readMore: 'READ MORE →',
    figCaption: 'FIG.01 — FEATURED',
    sectionsLabel: 'SECTIONS INDEX',
    ctaKicker: '03 / OUTRO END',
    ctaA: 'Stay curious, ', ctaB: 'keep building',
    sayHello: 'SAY HELLO →',
  },
};

function getTags(post: Post): string[] {
  const t = (post as Record<string, unknown>)?.tags ?? (post as Record<string, unknown>)?.tag;
  if (Array.isArray(t)) return t.filter(Boolean) as string[];
  if (typeof t === 'string') return t.split(',').map((s) => s.trim()).filter(Boolean);
  return [];
}

function hueOf(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 360;
  return h;
}

/** Split text into individually hoverable characters */
function Chars({ text }: { text: string }) {
  return (
    <>
      {text.split('').map((c, i) => (
        <span key={i} className="char-lift">{c === ' ' ? '\u00A0' : c}</span>
      ))}
    </>
  );
}

export default function HomeClient({ posts, since }: { posts: Post[]; since: string }) {
  const { lang } = useLang();
  const S = DICT[lang];
  const langPosts = postsForLang(posts, lang);
  const featured = langPosts[0];
  const listPosts = langPosts.slice(1, 7);

  return (
    <div className="min-h-screen bg-[#FAFAF6] dark:bg-[#131311] text-[#1B1B18] dark:text-[#E8E6DF] antialiased transition-colors duration-300">
      <CustomCursor />
      <ScrollProgress />

      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* ============ TOP BAR ============ */}
        <header className="flex items-center justify-between py-5 border-b border-[#1B1B18]/15 dark:border-[#E8E6DF]/15">
          <Link href="/" className="font-mono text-xs tracking-[0.25em] font-bold">
            ROBIN<span style={{ color: ACCENT }}>®</span> BLOG
          </Link>
          <nav className="flex items-center gap-5 md:gap-7">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="u-link font-mono text-[11px] tracking-[0.2em] text-current/60 hover:text-current transition-colors"
              >
                {lang === 'en' ? n.en : n.zh}
              </Link>
            ))}
            <Link
              href="/search"
              className="u-link font-mono text-[11px] tracking-[0.2em] text-current/60 hover:text-current transition-colors"
            >
              {lang === 'en' ? 'SEARCH' : '搜索'}
            </Link>
            <LangToggle />
            <ThemeToggle />
          </nav>
        </header>

        {/* ============ HERO ============ */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-16 md:pt-24 pb-16">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="font-mono text-[11px] tracking-[0.3em] mb-8" style={{ color: ACCENT }}>
                {S.kicker}
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="font-serif-sc font-black text-5xl md:text-7xl xl:text-8xl leading-[1.15] tracking-tight select-none">
                <Chars text={S.titleA1} />
                <span className="char-lift" style={{ color: ACCENT }}>{S.titleA2}</span>
                <Chars text={S.titleA3} />
                <br />
                <Chars text={S.titleB} />
                <span className="char-lift" style={{ color: ACCENT }}>{S.punct}</span>
              </h1>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-8 max-w-md text-sm leading-loose text-current/60">
                {S.intro1}
                <span className="text-current font-medium">{S.introStrong}</span>
                {lang === 'zh' ? '。' : '.'}
              </p>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-10 flex items-center gap-8">
                <a href="#writing" className="u-link font-mono text-xs tracking-[0.25em] font-bold" style={{ color: ACCENT }}>
                  {S.readPosts}
                </a>
                <Link href="/about" className="u-link font-mono text-xs tracking-[0.25em] text-current/60 hover:text-current transition-colors">
                  {S.aboutMe}
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Meta panel */}
          <Reveal delay={200} className="lg:col-span-4 lg:pt-14">
            <dl className="font-mono text-[11px] tracking-wider">
              {S.meta.map(([k, v]) => (
                <div key={k} className="flex justify-between py-3 border-b border-[#1B1B18]/10 dark:border-[#E8E6DF]/10">
                  <dt className="text-current/40">{k}</dt>
                  <dd className="text-current/85">{v}</dd>
                </div>
              ))}
              <div className="flex justify-between py-3">
                <dt className="text-current/40">SINCE</dt>
                <dd className="text-current/85">{since} — {S.now}</dd>
              </div>
            </dl>
          </Reveal>
        </section>
      </div>

      {/* ============ ORANGE MARQUEE BAND ============ */}
      <div className="relative left-1/2 -translate-x-1/2 w-screen rotate-[-1.2deg] bg-[#FF4D00] text-[#FAFAF6] py-4 overflow-hidden select-none">
        <div className="flex w-max animate-marquee items-center gap-10 pr-10">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE].map(([zh, en], i) => (
            <span key={i} className="flex items-baseline gap-3 whitespace-nowrap">
              <span className="font-serif-sc font-black text-2xl md:text-4xl">{lang === 'en' ? en : zh}</span>
              <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] opacity-70">{lang === 'en' ? zh : en}</span>
              <span className="text-xl md:text-2xl opacity-60">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* ============ WRITING ============ */}
        <main id="writing" className="scroll-mt-20 pt-16 md:pt-20">
          <Reveal>
            <div className="flex items-baseline justify-between mb-10">
              <h2 className="font-mono text-[11px] tracking-[0.3em] text-current/50">
                <span style={{ color: ACCENT }}>01 /</span> {S.writingLabel}
              </h2>
              <span className="font-mono text-[10px] tracking-widest text-current/40">{langPosts.length} ENTRIES</span>
            </div>
          </Reveal>

          {langPosts.length === 0 && (
            <div className="text-center py-20 text-current/50">
              <p>{S.empty}</p>
            </div>
          )}

          {/* Featured — asymmetric 12-col */}
          {featured && (
            <Reveal>
              <Link href={`/posts/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-12 gap-8 pb-14 mb-4 border-b border-[#1B1B18]/15 dark:border-[#E8E6DF]/15">
                <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1">
                  <p className="font-mono text-[10px] tracking-[0.25em] text-current/40 mb-5">
                    {featured.date && dayjs(featured.date).format('YYYY.MM.DD')}
                    {getTags(featured).slice(0, 3).map((t) => ` — #${t}`).join('')}
                  </p>
                  <h3 className="font-serif-sc font-bold text-2xl md:text-4xl leading-snug group-hover:underline underline-offset-8 decoration-1">
                    {featured.title}
                  </h3>
                  {featured.summary && (
                    <p className="mt-5 text-sm leading-loose text-current/60 line-clamp-3 max-w-lg">{featured.summary}</p>
                  )}
                  <span className="u-link self-start mt-7 font-mono text-xs tracking-[0.25em] font-bold" style={{ color: ACCENT }}>
                    {S.readMore}
                  </span>
                </div>
                <div className="lg:col-span-5 order-1 lg:order-2">
                  <div className="border border-[#1B1B18]/20 dark:border-[#E8E6DF]/20 p-2 group-hover:border-[#FF4D00] transition-colors">
                    {featured.page_cover ? (
                      <img
                        src={featured.page_cover}
                        alt={featured.title}
                        className="w-full aspect-[4/3] object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                      />
                    ) : (
                      <div
                        className="w-full aspect-[4/3] flex items-center justify-center"
                        style={{ background: `linear-gradient(135deg, hsl(${hueOf(featured.title || 'p')}, 30%, 88%), hsl(${(hueOf(featured.title || 'p') + 40) % 360}, 25%, 78%))` }}
                      >
                        <span className="font-serif-sc font-black text-8xl text-white/70 select-none">{(featured.title || '·')[0]}</span>
                      </div>
                    )}
                  </div>
                  <p className="mt-2 font-mono text-[9px] tracking-[0.2em] text-current/35 text-right">{S.figCaption}</p>
                </div>
              </Link>
            </Reveal>
          )}

          {/* Post rows — hover floods orange */}
          <div>
            {listPosts.map((post: Post, idx: number) => (
              <Reveal key={post.id} delay={idx * 60}>
                <Link href={`/posts/${post.slug}`} className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-4 md:gap-8 py-5 border-b border-[#1B1B18]/10 dark:border-[#E8E6DF]/10 -mx-3 px-3 transition-colors duration-200 hover:bg-[#FF4D00]">
                  <span className="font-mono text-[10px] tracking-wider text-current/35 group-hover:text-[#FAFAF6]/70 w-20 shrink-0 transition-colors">
                    {post.date ? dayjs(post.date).format('YY.MM.DD') : ''}
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-serif-sc font-bold text-base md:text-xl leading-snug group-hover:text-[#FAFAF6] transition-colors truncate">
                      {post.title}
                    </h4>
                    {post.summary && (
                      <p className="text-xs text-current/45 group-hover:text-[#FAFAF6]/70 line-clamp-1 mt-1.5 transition-colors">{post.summary}</p>
                    )}
                  </div>
                  <span className="font-mono text-xs text-current/30 group-hover:text-[#FAFAF6] group-hover:translate-x-1 transition-all shrink-0">
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </main>

        {/* ============ SECTIONS INDEX ============ */}
        <section className="pt-16 md:pt-20 pb-20">
          <Reveal>
            <h2 className="font-mono text-[11px] tracking-[0.3em] text-current/50 mb-10">
              <span style={{ color: ACCENT }}>02 /</span> {S.sectionsLabel}
            </h2>
          </Reveal>

          <div className="border-t border-[#1B1B18]/15 dark:border-[#E8E6DF]/15">
            {SECTIONS.map((s, idx) => (
              <Reveal key={s.href} delay={idx * 50}>
                <Link href={s.href} className="group grid grid-cols-[3rem_1fr_auto] md:grid-cols-[4rem_1fr_auto_auto] items-baseline gap-4 md:gap-8 py-6 border-b border-[#1B1B18]/15 dark:border-[#E8E6DF]/15 -mx-3 px-3 transition-colors duration-200 hover:bg-[#FF4D00]">
                  <span className="font-mono text-xs text-current/35 group-hover:text-[#FAFAF6]/70 transition-colors">{s.no}</span>
                  <div className="flex items-baseline gap-4 min-w-0">
                    <span className="font-serif-sc font-bold text-xl md:text-2xl group-hover:text-[#FAFAF6] group-hover:translate-x-1 transition-all">
                      {lang === 'en' ? s.en : s.zh}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.25em] text-current/35 group-hover:text-[#FAFAF6]/60 hidden sm:inline transition-colors">
                      {lang === 'en' ? s.zh : s.en}
                    </span>
                  </div>
                  <span className="text-xs text-current/45 group-hover:text-[#FAFAF6]/70 hidden md:block transition-colors">
                    {lang === 'en' ? s.descEn : s.descZh}
                  </span>
                  <span className="font-mono text-xs text-current/30 group-hover:text-[#FAFAF6] group-hover:translate-x-1 transition-all justify-self-end">→</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </div>

      {/* ============ FULL-BLEED ORANGE CTA ============ */}
      <div className="relative left-1/2 -translate-x-1/2 w-screen bg-[#FF4D00] text-[#FAFAF6]" style={{ '--char-hover': '#1B1B18' } as React.CSSProperties}>
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.3em] opacity-70 mb-8">{S.ctaKicker}</p>
          </Reveal>
          <Reveal delay={100}>
            <Link href="/about" className="group block">
              <p className="font-serif-sc font-black text-4xl md:text-7xl leading-tight">
                <Chars text={S.ctaA} />
                <br className="md:hidden" />
                <Chars text={S.ctaB} />
                <span className="char-lift">{lang === 'zh' ? '。' : '.'}</span>
              </p>
              <p className="mt-8 font-mono text-xs tracking-[0.3em] opacity-70 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
                {S.sayHello}
              </p>
            </Link>
          </Reveal>
        </div>
        <div className="border-t border-[#FAFAF6]/20">
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row justify-between gap-2 font-mono text-[10px] tracking-[0.2em] opacity-70">
            <p>© {since} — 2026 ROBIN®</p>
            <p>DESIGNED & BUILT WITH AGENTS · CC BY-SA 4.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
