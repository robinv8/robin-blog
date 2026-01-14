import React from 'react';
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';
import { getAllPosts } from '@/lib/notion';
import dayjs from 'dayjs';

export default async function Home() {
  const posts = await getAllPosts({ onlyPost: true }) || [];

  return (
    <div className="font-sans antialiased text-slate-800 dark:text-slate-200 min-h-screen relative selection:bg-primary selection:text-white transition-colors duration-300">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="light-mesh dark:hidden w-full h-full absolute inset-0"></div>
        <div className="hidden dark:block w-full h-full absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black"></div>
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-60 dark:opacity-20 animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-3xl opacity-60 dark:opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Header />

        <section className="mb-16 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-slate-400">记录日常~</h2>
            <div className="flex gap-4 mb-8">
              <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-icons-outlined">telegram</span></a>
              <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-icons-outlined">alternate_email</span></a>
              <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-icons-outlined">code</span></a>
            </div>
            <div className="flex flex-wrap gap-4">
              <a className="group glass-card px-5 py-3 rounded-xl flex items-center gap-3 hover:border-primary/30" href="#">
                <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:scale-110 transition-transform">
                  <span className="material-icons-outlined text-xl">mail</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">快速与我联系</span>
                  <span className="text-sm font-medium text-slate-800 dark:text-white">一键私信</span>
                </div>
              </a>
              <a className="group glass-card px-5 py-3 rounded-xl flex items-center gap-3 hover:border-primary/30" href="#">
                <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:scale-110 transition-transform">
                  <span className="material-icons-outlined text-xl">rss_feed</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">任意 RSS 阅读器</span>
                  <span className="text-sm font-medium text-slate-800 dark:text-white">订阅博客</span>
                </div>
              </a>
            </div>
          </div>
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/80 dark:border-white/10 shadow-xl">
              <img alt="Robin Avatar" className="w-full h-full object-cover bg-[#E0F2FE]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQpjZqhf_Ltlapc9yYFHB5cpNBVBsb7tCd7ood7lXMbiJvNFnVgW34EVixnw2OkuFNiwF6Mr2bLwWeBfQ9Nwuoq5w9VRy6bqo_Qt9RQk2lcPE2dLU9gxeUruyT3z4WYSHqDEw8auF2ldUGm28h4-WruTCOt4hRtuYSCLpnqMvSkmjuQXZUbDBMAzOa313TVtVzoiYxJEYdnnaXdiqYX90GcEZ56YjdXU1qWF4hWj1Lx70Kjh4ZE7Y18bE7MlFiwO-8e2h1lZjI8sI" />
            </div>
          </div>
        </section>

        <main className="space-y-6">
          {posts.length === 0 && (
            <div className="text-center py-20 text-slate-500">
              <p>No posts found. Please checking your Notion configuration.</p>
            </div>
          )}

          {posts.map((post: any) => (
            <Link key={post.id} href={`/posts/${post.slug}`} className="block">
              <article className="glass-card p-6 rounded-2xl group cursor-pointer relative overflow-hidden transition-all hover:bg-white/60 dark:hover:bg-slate-800/40">
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="material-icons-outlined text-slate-300 dark:text-slate-600 text-4xl transform rotate-12">arrow_outward</span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors">{post.title}</h3>
                  {post.date && (
                    <time className="text-xs text-slate-400 font-mono whitespace-nowrap ml-4">{dayjs(post.date).format('MMM D, YYYY')}</time>
                  )}
                </div>
                {post.summary && (
                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 md:line-clamp-3">
                    {post.summary}
                  </p>
                )}
              </article>
            </Link>
          ))}

          <div className="pt-6 space-y-4">
            {/* Retaining static links or we could also fetch these from another collection */}
            {/* For now, hiding static hardcoded 'sidebar' links to focus on main blog feed */}
          </div>

          <div className="flex justify-end pt-8">
            <a className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-primary text-slate-600 dark:text-slate-300 hover:text-primary transition-all shadow-sm" href="#">
              <span className="text-sm font-medium">下一页</span>
              <span className="material-icons-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward_ios</span>
            </a>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

