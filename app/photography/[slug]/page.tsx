import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import { getAllPosts, getPostBlocks } from "@/lib/notion";
import { Post } from "@/schema/post";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { NotionPageRenderer } from "../../components/NotionPageRenderer";

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
  const posts = (await getAllPosts({ onlyPhotography: true })) as Post[];
  const post = posts?.find((t) => t.slug === slug);

  if (!post) {
    return { title: "Album not found" };
  }

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: post.page_cover ? [post.page_cover] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const posts = (await getAllPosts({ onlyPhotography: true })) as Post[];
  return (
    posts?.map((post) => ({
      slug: post.slug,
    })) || []
  );
}

export default async function PhotographyDetail({ params }: Props) {
  const { slug: rawSlug } = await params;
  const slug = decodeSlug(rawSlug);
  const posts = (await getAllPosts({ onlyPhotography: true })) as Post[];
  const post = posts?.find((t) => t.slug === slug);

  if (!post) {
    notFound();
  }

  const blockMap = await getPostBlocks(post.id);

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

        <main className="max-w-4xl mx-auto">
          <Link
            href="/photography"
            className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-primary transition-colors mb-4"
          >
            <span className="material-icons-outlined text-sm">arrow_back</span>
            全部摄影
          </Link>

          <article className="glass-card p-6 md:p-10 rounded-3xl relative overflow-hidden mb-8">
            <header className="mb-8 border-b border-slate-200/60 dark:border-slate-700/60 pb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center gap-3 mt-4">
                <time className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <span className="material-icons-outlined text-sm">calendar_today</span>
                  {dayjs(post.date).format("MMM D, YYYY")}
                </time>
                {post.summary && (
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {post.summary}
                  </span>
                )}
              </div>
            </header>

            <div className="notion-content">
              <NotionPageRenderer recordMap={blockMap} />
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </div>
  );
}
