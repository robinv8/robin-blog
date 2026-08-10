import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import { PageShell, PageHero, SectionLabel } from '../components/Page';
import { T } from '../components/LangProvider';

const FEATURED: {
  initials: string; name: string; handle: string; verified: boolean;
  text: string; take: string | null; takeEn: string | null; stat: string;
}[] = [
  {
    initials: 'DL', name: 'Dan Lowren', handle: '@dan_lowren', verified: true,
    text: '"The best engineers I know are actually great writers. Code is communication. If you can\'t explain your system design in a one-pager, you probably don\'t understand it well enough to code it."\n\nA thread on why writing is the highest leverage skill for senior devs. 🧵👇',
    take: '这条推文再次印证了写作的重要性。最近在写设计文档时也深有体会，清晰的文档往往意味着清晰的思路。',
    takeEn: 'This thread proves once again how much writing matters. I felt the same while drafting design docs recently — clear docs usually mean clear thinking.',
    stat: '♥ 1.2k likes',
  },
  {
    initials: 'JS', name: 'Jane Smith', handle: '@js_smith', verified: false,
    text: 'Just discovered this neat CSS trick for creating performant, scroll-driven animations without any JavaScript! ✨\n\n`animation-timeline: scroll()` is a game changer for landing pages.',
    take: null, takeEn: null,
    stat: '↻ 450 reposts',
  },
  {
    initials: 'YC', name: 'Y Combinator', handle: '@ycombinator', verified: true,
    text: 'Request for Startups: Tools that help people learn faster. The education system hasn\'t changed in 100 years, but the way we access information has.',
    take: '这是一个巨大的市场机会。结合 AI 的个性化学习路径可能是下一个风口。',
    takeEn: 'A huge market opportunity. AI-powered personalized learning paths could be the next big thing.',
    stat: '♥ 3.4k likes',
  },
  {
    initials: 'AI', name: 'AI Daily', handle: '@aidaily', verified: false,
    text: 'New model release from Anthropic: Claude 3.5 Sonnet. It outperforms GPT-4o in coding benchmarks and has a 200k context window. The speed is incredible. 🚀',
    take: null, takeEn: null,
    stat: '▤ 120k views',
  },
];

const ARCHIVE = [
  { handle: '@naval', name: 'Naval Ravikant', date: '2026.01.15', text: '"Wealth is assets that earn while you sleep. Money is how we transfer time and wealth." - A classic thread on wealth creation.' },
  { handle: '@rauchg', name: 'Guillermo Rauch', date: '2026.01.12', text: 'Next.js 15 introduces partial prerendering. This is a massive step forward for combining static and dynamic content.' },
];

export default function Weekly() {
  return (
    <PageShell>
      <Header />
      <PageHero
        no="01"
        zh="X 见闻录"
        en="WEEKLY CURATIONS"
        desc="信息洪流中的淘金者。这里汇集了我在 X (Twitter) 上发现的高质量讨论、技术洞察和有趣观点。每周更新，帮你过滤噪音，直达精华。"
        descEn="A gold miner in the information flood. High-quality discussions, technical insights and interesting takes I find on X (Twitter) — updated weekly, noise filtered, signal delivered."
      />

      {/* Follow strip */}
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-16 font-mono text-[11px] tracking-[0.2em]">
          <p className="text-current/50">SOURCE — X / TWITTER</p>
          <a href="#" className="u-link font-bold text-[#FF4D00]">FOLLOW @robin_builds →</a>
        </div>
      </Reveal>

      {/* Featured this week */}
      <SectionLabel no="02" zh="本周精选" en="— WEEK 04, 2026" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
        {FEATURED.map((t, i) => (
          <Reveal key={t.handle} delay={i * 80}>
            <article className="group h-full flex flex-col border border-[#1B1B18]/15 dark:border-[#E8E6DF]/15 hover:border-[#FF4D00] transition-colors">
              <div className="p-6 md:p-7 flex-grow">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#1B1B18] dark:bg-[#E8E6DF] text-[#FAFAF6] dark:text-[#131311] flex items-center justify-center font-mono text-xs font-bold">
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-xs font-bold">{t.name}</p>
                      <p className="font-mono text-[10px] text-current/40">{t.handle}</p>
                    </div>
                  </div>
                  {t.verified && <span className="font-mono text-[9px] tracking-[0.2em] text-[#FF4D00]">VERIFIED ✓</span>}
                </div>
                <p className="text-sm leading-relaxed text-current/75 whitespace-pre-line">{t.text}</p>
                {t.take && (
                  <div className="mt-5 p-4 bg-[#FF4D00]/[0.06] border-l-2 border-[#FF4D00] text-xs leading-relaxed text-current/70">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-[#FF4D00] block mb-1.5">ROBIN&rsquo;S TAKE</span>
                    <T zh={t.take} en={t.takeEn ?? t.take} />
                  </div>
                )}
              </div>
              <div className="px-6 md:px-7 py-3 border-t border-[#1B1B18]/10 dark:border-[#E8E6DF]/10 flex justify-between items-center font-mono text-[10px] tracking-wider text-current/40">
                <span>{t.stat}</span>
                <a href="#" className="u-link text-current/60 hover:text-[#FF4D00] transition-colors">VIEW ORIGINAL ↗</a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Archive */}
      <SectionLabel no="03" zh="往期存档" en="— ARCHIVE" />
      <div className="border-t border-[#1B1B18]/15 dark:border-[#E8E6DF]/15 mb-16">
        {ARCHIVE.map((a, i) => (
          <Reveal key={a.handle} delay={i * 60}>
            <a href="#" className="group grid grid-cols-1 md:grid-cols-[10rem_1fr_auto] items-baseline gap-2 md:gap-8 py-6 border-b border-[#1B1B18]/15 dark:border-[#E8E6DF]/15 -mx-3 px-3 hover:bg-[#FF4D00]/[0.05] transition-colors">
              <div>
                <p className="font-mono text-xs font-bold">{a.handle}</p>
                <p className="font-mono text-[10px] text-current/40 mt-0.5">{a.name}</p>
              </div>
              <p className="text-sm text-current/60 line-clamp-2">{a.text}</p>
              <span className="font-mono text-[10px] text-current/40 whitespace-nowrap">{a.date}</span>
            </a>
          </Reveal>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between font-mono text-[11px] tracking-[0.25em] mb-4">
        <span className="text-current/25 cursor-not-allowed">[ ← NEWER ]</span>
        <a href="#" className="u-link font-bold text-[#FF4D00]">[ OLDER → ]</a>
      </div>

      <Footer />
    </PageShell>
  );
}
