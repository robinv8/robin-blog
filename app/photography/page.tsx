import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '../components/Header';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import { PageShell, PageHero } from '../components/Page';
import { T } from '../components/LangProvider';
import { getAllPosts } from '@/lib/notion';
import { Post } from '@/schema/post';
import dayjs from 'dayjs';

export const metadata: Metadata = {
  title: '摄影',
  description: '用镜头探索世界，把瞬间装订成册。',
};

export default async function Photography() {
  const posts = (await getAllPosts({ onlyPhotography: true })) || [];

  return (
    <PageShell>
      <SiteHeader />
      <PageHero
        zh="摄影"
        en="Photography"
        desc="用镜头探索世界，把瞬间装订成册。这里是光影的碎片与被时间冻结的记忆。"
        descEn="A collection of visual stories, fragments of light, and memories frozen in time."
      />

      <main className="columns-1 gap-6 space-y-6 sm:columns-2 md:columns-3">
        {posts.length === 0 && (
          <p className="py-20 text-center font-mono text-xs text-bl-muted">
            <T zh="暂无照片，请检查 Notion 配置" en="No photos found. Check the Notion config." />
          </p>
        )}

        {posts.map((post: Post, i: number) => (
          <Reveal key={post.id} delay={(i % 3) * 80} className="break-inside-avoid">
            <Link
              href={`/photography/${encodeURIComponent(post.slug ?? '')}`}
              className="group block overflow-hidden rounded-lg border border-bl-line bg-bl-card transition-colors hover:border-bl-acc"
            >
              {post.page_cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt={post.title || 'Photography'}
                  className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  src={post.page_cover}
                />
              ) : (
                <div className="flex h-48 w-full items-center justify-center font-mono text-xs text-bl-muted">no image</div>
              )}
              <div className="flex items-baseline justify-between gap-3 border-t border-bl-line px-4 py-3">
                <h3 className="truncate text-sm font-medium transition-colors group-hover:text-bl-acc">
                  {post.title || 'Untitled'}
                </h3>
                {post.date && (
                  <span className="shrink-0 font-mono text-xs text-bl-muted">{dayjs(post.date).format('YYYY.MM')}</span>
                )}
              </div>
            </Link>
          </Reveal>
        ))}
      </main>

      <Footer />
    </PageShell>
  );
}
