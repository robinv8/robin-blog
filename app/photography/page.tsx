import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import { PageShell, PageHero } from '../components/Page';
import { T } from '../components/LangProvider';
import { getAllPosts } from '@/lib/notion';
import { Post } from '@/schema/post';
import dayjs from 'dayjs';

export default async function Photography() {
  const posts = (await getAllPosts({ onlyPhotography: true })) || [];

  return (
    <PageShell>
      <Header />
      <PageHero
        no="02"
        zh="光影集"
        en="PHOTOGRAPHY"
        desc="用镜头探索世界，把瞬间装订成册。这里是光影的碎片与被时间冻结的记忆。"
        descEn="A collection of visual stories, fragments of light, and memories frozen in time."
      />

      <main className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6 pb-12">
        {posts.length === 0 && (
          <div className="text-center py-20 text-current/50 col-span-full">
            <p className="font-mono text-xs tracking-[0.2em]"><T zh="暂无照片 — 请检查 NOTION 配置" en="NO PHOTOS FOUND — PLEASE CHECK NOTION CONFIG" /></p>
          </div>
        )}

        {posts.map((post: Post, i: number) => (
          <Reveal key={post.id} delay={(i % 3) * 80} className="break-inside-avoid">
            <Link href={`/photography/${encodeURIComponent(post.slug ?? '')}`} className="block group cursor-pointer border border-[#1B1B18]/20 dark:border-[#E8E6DF]/20 p-1.5 hover:border-[#FF4D00] transition-colors">
              <div className="relative overflow-hidden">
                {post.page_cover ? (
                  <img
                    alt={post.title || 'Photography'}
                    className="w-full h-auto object-cover grayscale-[25%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-500"
                    src={post.page_cover}
                  />
                ) : (
                  <div className="w-full h-48 bg-[#1B1B18]/5 dark:bg-[#E8E6DF]/5 flex items-center justify-center">
                    <span className="font-mono text-[10px] tracking-[0.3em] text-current/30">NO IMAGE</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <h3 className="font-serif-sc font-bold text-[#FAFAF6] text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {post.title || 'Untitled'}
                  </h3>
                  {post.summary && (
                    <p className="font-mono text-[10px] tracking-wider text-[#FAFAF6]/70 mt-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      {post.summary}
                    </p>
                  )}
                </div>
              </div>
            </Link>
            <p className="mt-2 font-mono text-[9px] tracking-[0.2em] text-current/35 flex justify-between">
              <span>FIG.{String(i + 1).padStart(2, '0')}</span>
              {post.date && <span>{dayjs(post.date).format('YYYY.MM.DD')}</span>}
            </p>
          </Reveal>
        ))}
      </main>

      <Footer />
    </PageShell>
  );
}
