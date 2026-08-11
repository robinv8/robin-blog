import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import { getAllPosts } from "@/lib/notion";
import { getTags, getAllTagsFromPosts } from "@/lib/tags";
import { Post } from "@/schema/post";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

type Props = {
  params: Promise<{ tag: string }>;
};

// 预渲染时非 ASCII 的动态参数会以 percent-encoded 形式传入，统一解码
function decodeTag(raw: string): string {
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag: rawTag } = await params;
  const tag = decodeTag(rawTag);
  return {
    title: `#${tag}`,
    description: `标签「${tag}」下的所有文章`,
  };
}

export async function generateStaticParams() {
  const posts = (await getAllPosts({ onlyPost: true })) as Post[];
  const tags = getAllTagsFromPosts(posts || []);
  return Object.keys(tags).map((tag) => ({ tag }));
}

export default async function TagPage({ params }: Props) {
  const { tag: rawTag } = await params;
  const tag = decodeTag(rawTag);
  const posts = (await getAllPosts({ onlyPost: true })) as Post[];
  const taggedPosts = (posts || []).filter((post) => getTags(post).includes(tag));

  if (taggedPosts.length === 0) {
    notFound();
  }

  return (
    <div className="font-sans antialiased text-slate-800 dark:text-slate-200 min-h-screen relative selection:bg-primary selection:text-white transition-colors duration-300">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="light-mesh dark:hidden w-full h-full absolute inset-0"></div>
        <div className="hidden dark:block w-full h-full absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Header />

        <main>
          <div className="mb-8">
            <Link
              href="/tags"
              className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-primary transition-colors mb-3"
            >
              <span className="material-icons-outlined text-sm">arrow_back</span>
              全部标签
            </Link>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
              #{tag}
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              共 {taggedPosts.length} 篇文章
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {taggedPosts.map((post) => (
              <Link key={post.id} href={`/posts/${post.slug}`} className="block group">
                <article className="glass-card p-6 rounded-2xl h-full relative overflow-hidden transition-all hover:border-primary/30 hover:bg-white/60 dark:hover:bg-slate-800/40">
                  <div className="absolute top-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="material-icons-outlined text-slate-300 dark:text-slate-600 text-3xl transform rotate-12">arrow_outward</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {getTags(post).slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                          t === tag
                            ? "bg-primary/10 text-primary"
                            : "bg-slate-500/10 text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                  <h4 className="text-base md:text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors mb-2 leading-snug">
                    {post.title}
                  </h4>
                  {post.summary && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4">
                      {post.summary}
                    </p>
                  )}
                  {post.date && (
                    <time className="text-xs text-slate-400 font-mono">
                      {dayjs(post.date).format("MMM D, YYYY")}
                    </time>
                  )}
                </article>
              </Link>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
