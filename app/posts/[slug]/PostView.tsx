"use client";

import React from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Comments from "../../components/Comments";
import Footer from "../../components/Footer";
import { PageShell } from "../../components/Page";
import { NotionPageRenderer } from "../../components/NotionPageRenderer";
import TableOfContents from "./TableOfContents";
import { useLang } from "../../components/LangProvider";
import { getPostLang } from "@/lib/i18n";
import type { Post } from "@/schema/post";
import dayjs from "dayjs";

export interface PostVariant {
  post: Post;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recordMap: any;
}

interface AdjacentPost {
  slug: string;
  title: string;
}

export default function PostView({
  variants,
  newerPost,
  olderPost,
}: {
  variants: PostVariant[];
  newerPost?: AdjacentPost | null;
  olderPost?: AdjacentPost | null;
}) {
  const { lang } = useLang();

  const variant =
    variants.find((v) => getPostLang(v.post) === lang) ||
    variants.find((v) => getPostLang(v.post) === "zh") ||
    variants[0];

  const { post, recordMap } = variant;
  const hasOtherLang = variants.length > 1;

  const tags: string[] = Array.isArray((post as Record<string, unknown>).tags)
    ? ((post as Record<string, unknown>).tags as string[])
    : typeof (post as Record<string, unknown>).tags === "string"
      ? ((post as Record<string, unknown>).tags as string).split(",").map((s) => s.trim()).filter(Boolean)
      : [];

  return (
    <PageShell>
      <Header />

      <main className="max-w-3xl mx-auto pt-14 md:pt-20 xl:max-w-none xl:flex xl:gap-12 xl:items-start">
        <div className="xl:flex-1 xl:min-w-0 xl:max-w-3xl xl:mx-auto">
          {/* Article header */}
          <header className="mb-12 pb-10 border-b border-[#1B1B18]/15 dark:border-[#E8E6DF]/15">
            <Link href="/" className="u-link font-mono text-[11px] tracking-[0.25em] text-current/50 hover:text-[#FF4D00] transition-colors">
              {lang === "en" ? "← BACK" : "← 返回"}
            </Link>
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#FF4D00] mt-8 mb-6">
              [ POST — {dayjs(post.date).format("YYYY.MM.DD")} ]
            </p>
            <h1 className="font-serif-sc font-black text-3xl md:text-5xl leading-tight tracking-tight">
              {post.title}
            </h1>
            {post.summary && (
              <p className="mt-6 text-sm leading-loose text-current/60 max-w-xl">{post.summary}</p>
            )}
            <div className="flex flex-wrap items-center gap-4 mt-6">
              {tags.map((t) => (
                <Link
                  key={t}
                  href={`/tags/${encodeURIComponent(t)}`}
                  className="u-link font-mono text-[10px] tracking-[0.2em] text-current/40 hover:text-[#FF4D00] transition-colors"
                >
                  #{t}
                </Link>
              ))}
              {hasOtherLang && (
                <span className="font-mono text-[10px] tracking-[0.2em] text-current/40">
                  · {lang === "en" ? "中文版见右上角语言开关" : "EN version via the language switch above"}
                </span>
              )}
            </div>
          </header>

          {/* Notion content */}
          <article className="notion-content pb-8">
            <NotionPageRenderer recordMap={recordMap} />
          </article>

          {/* Prev / Next */}
          {(olderPost || newerPost) && (
            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#1B1B18]/15 dark:bg-[#E8E6DF]/15 border border-[#1B1B18]/15 dark:border-[#E8E6DF]/15 mb-10">
              {olderPost ? (
                <Link
                  href={`/posts/${encodeURIComponent(olderPost.slug)}`}
                  className="group bg-[#FAFAF6] dark:bg-[#131311] p-5"
                >
                  <span className="font-mono text-[10px] tracking-[0.25em] text-current/40 group-hover:text-[#FF4D00] transition-colors">
                    {lang === "en" ? "← OLDER" : "← 上一篇"}
                  </span>
                  <p className="mt-3 font-serif-sc font-bold text-sm group-hover:text-[#FF4D00] transition-colors line-clamp-1">
                    {olderPost.title}
                  </p>
                </Link>
              ) : (
                <span className="hidden sm:block bg-[#FAFAF6] dark:bg-[#131311]" />
              )}
              {newerPost && (
                <Link
                  href={`/posts/${encodeURIComponent(newerPost.slug)}`}
                  className="group bg-[#FAFAF6] dark:bg-[#131311] p-5 text-right"
                >
                  <span className="font-mono text-[10px] tracking-[0.25em] text-current/40 group-hover:text-[#FF4D00] transition-colors">
                    {lang === "en" ? "NEWER →" : "下一篇 →"}
                  </span>
                  <p className="mt-3 font-serif-sc font-bold text-sm group-hover:text-[#FF4D00] transition-colors line-clamp-1">
                    {newerPost.title}
                  </p>
                </Link>
              )}
            </nav>
          )}

          <div className="border-t border-[#1B1B18]/15 dark:border-[#E8E6DF]/15 pt-10">
            <Comments />
          </div>
        </div>

        <aside className="hidden xl:block w-64 shrink-0 sticky top-8">
          <TableOfContents recordMap={recordMap} pageId={post.id} />
        </aside>
      </main>

      <Footer />
    </PageShell>
  );
}
