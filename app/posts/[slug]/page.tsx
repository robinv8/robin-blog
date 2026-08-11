import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NotionRenderer } from "react-notion-x";
import { getPostBlocks, getAllPosts } from "@/lib/notion";
import { getTags } from "@/lib/tags";
import { Post } from "@/schema/post";
import Header from "../../components/Header";
import { siteConfig } from "../../../site.config";
import Comments from "../../components/Comments";
import Footer from "../../components/Footer";
import dayjs from "dayjs";

// Styles for react-notion-x
// import 'react-notion-x/src/styles.css' // We might need to handle CSS imports globally or here if supported by Next.js App Router server components?
// Actually NotionRenderer is a client component usually? Or compatible?
// react-notion-x 7.x supports SSR but styles need to be imported.
// In App Router, we should likely create a Client Component wrapper for the Renderer if it uses interactive features or Context.
// For now, let's try direct import if it doesn't break, or move Renderer to a client component.

import { NotionPageRenderer } from "../../components/NotionPageRenderer";
import TableOfContents from "./TableOfContents";

type Props = {
  params: Promise<{ slug: string }>;
};

// 预渲染时非 ASCII 的动态参数会以 percent-encoded 形式传入，统一解码
function decodeSlug(raw: string): string {
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = decodeSlug(rawSlug);
  const posts = (await getAllPosts({ onlyPost: true })) as Post[];
  const post = posts?.find((t) => t.slug === slug);

  if (!post) {
    return { title: "Post not found" };
  }

  const url = `${siteConfig.link}/posts/${post.slug}`;
  const images = post.page_cover ? [post.page_cover] : undefined;

  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.summary,
      url,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug: rawSlug } = await params;
  const slug = decodeSlug(rawSlug);
  const posts = (await getAllPosts({ onlyPost: true })) as Post[];
  const post = posts?.find((t) => t.slug === slug);

  if (!post) {
    notFound();
  }

  const blockMap = await getPostBlocks(post.id);

  const postIndex = posts.findIndex((t) => t.slug === slug);
  const prevPost = postIndex > 0 ? posts[postIndex - 1] : null;
  const nextPost = postIndex < posts.length - 1 ? posts[postIndex + 1] : null;

  return (
    <div className="font-sans antialiased text-slate-800 dark:text-slate-200 min-h-screen relative selection:bg-primary selection:text-white transition-colors duration-300">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="light-mesh dark:hidden w-full h-full absolute inset-0"></div>
        <div className="hidden dark:block w-full h-full absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black"></div>
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-60 dark:opacity-20 animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-3xl opacity-60 dark:opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Header />

        <main className="max-w-4xl mx-auto xl:max-w-none xl:flex xl:gap-8 xl:items-start">
          <article className="glass-card p-6 md:p-10 rounded-3xl relative overflow-hidden mb-8 xl:flex-1 xl:min-w-0">
            <header className="mb-8 border-b border-slate-200/60 dark:border-slate-700/60 pb-8">
              <div className="flex items-center gap-3 mb-5">
                <span className="px-3 py-1 text-xs font-semibold tracking-wide text-blue-600 bg-blue-100/50 dark:bg-blue-500/20 dark:text-blue-300 rounded-full">
                  Post
                </span>
                <time className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <span className="material-icons-outlined text-sm">
                    calendar_today
                  </span>
                  {dayjs(post.date).format("MMM D, YYYY")}
                </time>
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 dark:text-slate-100 leading-tight">
                {post.title}
              </h1>
              {getTags(post).length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {getTags(post).map((t) => (
                    <Link
                      key={t}
                      href={`/tags/${encodeURIComponent(t)}`}
                      className="px-2.5 py-0.5 rounded-full bg-slate-500/10 hover:bg-primary/10 text-slate-500 dark:text-slate-400 hover:text-primary text-[11px] font-medium transition-colors"
                    >
                      #{t}
                    </Link>
                  ))}
                </div>
              )}
            </header>

            <div className="notion-content">
              {/* Notion Page Renderer */}
              <NotionPageRenderer recordMap={blockMap} />
            </div>

            {/* Prev / Next */}
            {(prevPost || nextPost) && (
              <nav className="mt-10 pt-8 border-t border-slate-200/60 dark:border-slate-700/60 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {nextPost ? (
                  <Link
                    href={`/posts/${nextPost.slug}`}
                    className="group glass-card rounded-2xl p-4 hover:border-primary/30 transition-all"
                  >
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <span className="material-icons-outlined text-sm">arrow_back</span>
                      上一篇
                    </span>
                    <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover:text-primary transition-colors line-clamp-1">
                      {nextPost.title}
                    </p>
                  </Link>
                ) : (
                  <span className="hidden sm:block" />
                )}
                {prevPost && (
                  <Link
                    href={`/posts/${prevPost.slug}`}
                    className="group glass-card rounded-2xl p-4 text-right hover:border-primary/30 transition-all"
                  >
                    <span className="text-xs text-slate-400 inline-flex items-center gap-1">
                      下一篇
                      <span className="material-icons-outlined text-sm">arrow_forward</span>
                    </span>
                    <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover:text-primary transition-colors line-clamp-1">
                      {prevPost.title}
                    </p>
                  </Link>
                )}
              </nav>
            )}

            {/* Comments */}
            <Comments />
          </article>

          <aside className="hidden xl:block w-64 shrink-0 sticky top-6">
            <TableOfContents recordMap={blockMap} pageId={post.id} />
          </aside>
        </main>

        <Footer />
      </div>
    </div>
  );
}

// Generate static params for cleaner SSG
export async function generateStaticParams() {
  const posts = (await getAllPosts({ onlyPost: true })) as Post[];
  return (
    posts?.map((post) => ({
      slug: post.slug,
    })) || []
  );
}
