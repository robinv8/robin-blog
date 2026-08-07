import React from 'react';
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';
import { getAllPosts } from '@/lib/notion';
import dayjs from 'dayjs';

const AVATAR_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCQpjZqhf_Ltlapc9yYFHB5cpNBVBsb7tCd7ood7lXMbiJvNFnVgW34EVixnw2OkuFNiwF6Mr2bLwWeBfQ9Nwuoq5w9VRy6bqo_Qt9RQk2lcPE2dLU9gxeUruyT3z4WYSHqDEw8auF2ldUGm28h4-WruTCOt4hRtuYSCLpnqMvSkmjuQXZUbDBMAzOa313TVtVzoiYxJEYdnnaXdiqYX90GcEZ56YjdXU1qWF4hWj1Lx70Kjh4ZE7Y18bE7MlFiwO-8e2h1lZjI8sI';

const SECTIONS = [
  { href: '/weekly', icon: 'article', title: '周刊', desc: '每周记录与分享', accent: 'from-blue-500/15 to-cyan-400/10' },
  { href: '/photography', icon: 'photo_camera', title: '摄影', desc: '光影与瞬间', accent: 'from-purple-500/15 to-pink-400/10' },
  { href: '/projects', icon: 'auto_awesome', title: '项目', desc: '做点儿有趣的东西', accent: 'from-amber-500/15 to-orange-400/10' },
  { href: '/books', icon: 'book', title: '书架', desc: '读过的与在读的', accent: 'from-emerald-500/15 to-teal-400/10' },
  { href: '/friends', icon: 'group', title: '友链', desc: '朋友们的站点', accent: 'from-rose-500/15 to-red-400/10' },
  { href: '/about', icon: 'person', title: '关于', desc: '认识一下我', accent: 'from-indigo-500/15 to-violet-400/10' },
];

const MARQUEE_WORDS = ['写作', '摄影', '代码', '阅读', '旅行', '咖啡', '设计', '生活', '成长', '开源'];

function getTags(post: any): string[] {
  const t = post?.tags ?? post?.tag;
  if (Array.isArray(t)) return t.filter(Boolean);
  if (typeof t === 'string') return t.split(',').map((s) => s.trim()).filter(Boolean);
  return [];
}

export default async function Home() {
  const posts = (await getAllPosts({ onlyPost: true })) || [];

  const allTags = new Set<string>();
  posts.forEach((p: any) => getTags(p).forEach((t) => allTags.add(t)));

  const earliest = posts.length ? posts[posts.length - 1].date : null;
  const years = earliest ? Math.max(1, dayjs().diff(dayjs(earliest), 'year') + 1) : 1;

  const featured = posts[0];
  const gridPosts = posts.slice(1, 5);
  const restPosts = posts.slice(5);

  const stats = [
    { value: String(posts.length), label: '篇文章' },
    { value: String(allTags.size), label: '个标签' },
    { value: String(years), label: '年创作' },
    { value: '6', label: '个栏目' },
  ];

  return (
    <div className="font-sans antialiased text-slate-800 dark:text-slate-200 min-h-screen relative selection:bg-primary selection:text-white transition-colors duration-300">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="light-mesh dark:hidden w-full h-full absolute inset-0"></div>
        <div className="hidden dark:block w-full h-full absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black"></div>
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-60 dark:opacity-20 animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-3xl opacity-60 dark:opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Header />

        {/* ============ HERO ============ */}
        <section className="mb-14 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-slate-600 dark:text-slate-300 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              正在记录生活与成长
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-slate-400">
                你好，我是 Robin
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-purple-400">
                在这里安放我的日常。
              </span>
            </h2>

            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-md mb-8">
              写博客、拍照片、做项目。这个小小的角落收录了我对技术、生活与世界的观察，欢迎随便逛逛。
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <a
                href="#posts"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                开始阅读
                <span className="material-icons-outlined text-base group-hover:translate-y-0.5 transition-transform">arrow_downward</span>
              </a>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-primary/40 hover:text-primary transition-all"
              >
                关于我
                <span className="material-icons-outlined text-base">arrow_outward</span>
              </Link>
            </div>

            <div className="flex gap-3">
              {[
                { icon: 'telegram', label: 'Telegram' },
                { icon: 'alternate_email', label: 'Email' },
                { icon: 'code', label: 'GitHub' },
                { icon: 'rss_feed', label: 'RSS' },
              ].map((s) => (
                <a
                  key={s.icon}
                  href="#"
                  title={s.label}
                  className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-primary hover:border-primary/40 hover:-translate-y-0.5 transition-all"
                >
                  <span className="material-icons-outlined text-lg">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Avatar block */}
          <div className="relative justify-self-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 rounded-full blur-2xl opacity-40 animate-pulse"></div>
            <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full p-1.5 bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 shadow-2xl">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white/80 dark:border-white/10">
                <img alt="Robin Avatar" className="w-full h-full object-cover bg-[#E0F2FE]" src={AVATAR_URL} />
              </div>
            </div>

            <div className="absolute -left-16 top-2 glass-card rounded-xl px-3 py-2 flex items-center gap-2 animate-float shadow-lg">
              <span className="material-icons-outlined text-primary text-base">edit_note</span>
              <span className="text-xs font-semibold">{posts.length} 篇文章</span>
            </div>
            <div className="absolute -right-14 bottom-6 glass-card rounded-xl px-3 py-2 flex items-center gap-2 animate-float-delayed shadow-lg">
              <span className="material-icons-outlined text-purple-400 text-base">photo_camera</span>
              <span className="text-xs font-semibold">热爱生活</span>
            </div>
          </div>
        </section>

        {/* ============ MARQUEE ============ */}
        <div className="relative overflow-hidden mb-14 py-3 border-y border-slate-200/60 dark:border-white/5 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="flex w-max animate-marquee gap-8">
            {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
              <span key={i} className="flex items-center gap-8 text-sm font-medium tracking-widest text-slate-400 dark:text-slate-500 whitespace-nowrap">
                {w}
                <span className="text-primary/50">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ============ STATS ============ */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {stats.map((s) => (
            <div key={s.label} className="glass-card rounded-2xl px-5 py-6 text-center hover:border-primary/30 transition-all">
              <div className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                {s.value}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 tracking-wide">{s.label}</div>
            </div>
          ))}
        </section>

        {/* ============ SECTIONS NAV ============ */}
        <section className="mb-16">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">逛逛这里</h3>
              <p className="text-xs text-slate-400 mt-1">除了博客，还有这些角落</p>
            </div>
            <span className="material-icons-outlined text-slate-300 dark:text-slate-600">explore</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {SECTIONS.map((sec) => (
              <Link key={sec.href} href={sec.href} className="group">
                <div className={`glass-card rounded-2xl p-5 h-full bg-gradient-to-br ${sec.accent} hover:border-primary/40 transition-all`}>
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-2.5 rounded-xl bg-white/60 dark:bg-white/10 text-slate-700 dark:text-slate-200 group-hover:text-primary group-hover:scale-110 transition-all shadow-sm">
                      <span className="material-icons-outlined text-xl">{sec.icon}</span>
                    </div>
                    <span className="material-icons-outlined text-slate-300 dark:text-slate-600 text-lg opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                      arrow_outward
                    </span>
                  </div>
                  <div className="font-bold text-slate-800 dark:text-white">{sec.title}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{sec.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ============ POSTS ============ */}
        <main id="posts" className="scroll-mt-24">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">最新文章</h3>
              <p className="text-xs text-slate-400 mt-1">最近写的一些东西</p>
            </div>
            <span className="material-icons-outlined text-slate-300 dark:text-slate-600">history_edu</span>
          </div>

          {posts.length === 0 && (
            <div className="text-center py-20 text-slate-500">
              <p>No posts found. Please checking your Notion configuration.</p>
            </div>
          )}

          {/* Featured */}
          {featured && (
            <Link href={`/posts/${featured.slug}`} className="block group mb-6">
              <article className="glass-card rounded-3xl overflow-hidden transition-all hover:border-primary/30 hover:shadow-xl">
                <div className="grid md:grid-cols-2">
                  <div className="relative min-h-[200px] md:min-h-[260px] bg-gradient-to-br from-primary/30 via-blue-400/20 to-purple-400/30 overflow-hidden">
                    {featured.page_cover ? (
                      <img
                        src={featured.page_cover}
                        alt={featured.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="material-icons-outlined text-7xl text-white/40">auto_stories</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/30 backdrop-blur text-white text-[11px] font-semibold tracking-wide">
                      ✦ 最新发布
                    </div>
                  </div>
                  <div className="p-7 md:p-8 flex flex-col justify-center">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {getTags(featured).slice(0, 3).map((t) => (
                        <span key={t} className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-medium">
                          #{t}
                        </span>
                      ))}
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white group-hover:text-primary transition-colors mb-3 leading-snug">
                      {featured.title}
                    </h4>
                    {featured.summary && (
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 mb-5">
                        {featured.summary}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                      <span className="material-icons-outlined text-sm">schedule</span>
                      {featured.date && <time>{dayjs(featured.date).format('YYYY 年 M 月 D 日')}</time>}
                      <span className="mx-1">·</span>
                      <span className="text-primary font-semibold font-sans group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                        阅读全文 <span className="material-icons-outlined text-sm">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          )}

          {/* Grid */}
          {gridPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {gridPosts.map((post: any) => (
                <Link key={post.id} href={`/posts/${post.slug}`} className="block group">
                  <article className="glass-card p-6 rounded-2xl h-full relative overflow-hidden transition-all hover:border-primary/30 hover:bg-white/60 dark:hover:bg-slate-800/40">
                    <div className="absolute top-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="material-icons-outlined text-slate-300 dark:text-slate-600 text-3xl transform rotate-12">arrow_outward</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {getTags(post).slice(0, 2).map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-full bg-slate-500/10 text-slate-500 dark:text-slate-400 text-[11px] font-medium">
                          #{t}
                        </span>
                      ))}
                    </div>
                    <h4 className="text-base md:text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors mb-2 leading-snug">
                      {post.title}
                    </h4>
                    {post.summary && (
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4">{post.summary}</p>
                    )}
                    {post.date && (
                      <time className="text-xs text-slate-400 font-mono">{dayjs(post.date).format('MMM D, YYYY')}</time>
                    )}
                  </article>
                </Link>
              ))}
            </div>
          )}

          {/* Compact list */}
          {restPosts.map((post: any) => (
            <Link key={post.id} href={`/posts/${post.slug}`} className="block group">
              <article className="flex items-baseline justify-between gap-4 py-4 border-b border-slate-200/60 dark:border-white/5 transition-all hover:pl-2">
                <h4 className="text-sm md:text-base font-semibold text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors truncate">
                  {post.title}
                </h4>
                {post.date && (
                  <time className="text-xs text-slate-400 font-mono whitespace-nowrap">{dayjs(post.date).format('MMM D, YYYY')}</time>
                )}
              </article>
            </Link>
          ))}
        </main>

        <Footer />
      </div>
    </div>
  );
}
