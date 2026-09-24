"use client";

import React from "react";
import Link from "next/link";
import SiteHeader from "../../components/Header";
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
  const isEn = lang === "en";

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
      <SiteHeader />

      <main className="mx-auto max-w-3xl pt-14 md:pt-20 xl:mx-0 xl:flex xl:max-w-none xl:items-start xl:gap-12">
        <div className="xl:mx-auto xl:min-w-0 xl:max-w-3xl xl:flex-1">
          <header className="mb-12 border-b border-bl-line pb-10">
            <Link href="/posts" className="font-mono text-xs text-bl-muted hover:text-bl-acc transition-colors">
              {isEn ? "← all posts" : "← 全部文章"}
            </Link>
            <p className="mt-8 mb-5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-bl-muted">
              <time className="text-bl-acc">{dayjs(post.date).format("YYYY.MM.DD")}</time>
              {tags.map((t) => (
                <Link key={t} href={`/tags/${encodeURIComponent(t)}`} className="hover:text-bl-acc transition-colors">
                  #{t}
                </Link>
              ))}
              {hasOtherLang && <span>· {isEn ? "中文版：切换语言" : "EN version: switch language"}</span>}
            </p>
            <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-[44px]">{post.title}</h1>
            {post.summary && <p className="mt-6 max-w-xl text-[15px] leading-[1.8] text-bl-soft">{post.summary}</p>}
          </header>

          <article className="notion-content pb-8">
            <NotionPageRenderer recordMap={recordMap} />
          </article>

          {(olderPost || newerPost) && (
            <nav className="mb-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-bl-line bg-bl-line sm:grid-cols-2">
              {olderPost ? (
                <Link href={`/posts/${encodeURIComponent(olderPost.slug)}`} className="group bg-bl-card p-6 transition-colors hover:bg-bl-card-hover">
                  <span className="font-mono text-xs text-bl-muted">{isEn ? "← older" : "← 上一篇"}</span>
                  <p className="mt-2 line-clamp-1 font-medium transition-colors group-hover:text-bl-acc">{olderPost.title}</p>
                </Link>
              ) : (
                <span className="hidden bg-bl-card sm:block" />
              )}
              {newerPost ? (
                <Link href={`/posts/${encodeURIComponent(newerPost.slug)}`} className="group bg-bl-card p-6 text-right transition-colors hover:bg-bl-card-hover">
                  <span className="font-mono text-xs text-bl-muted">{isEn ? "newer →" : "下一篇 →"}</span>
                  <p className="mt-2 line-clamp-1 font-medium transition-colors group-hover:text-bl-acc">{newerPost.title}</p>
                </Link>
              ) : (
                <span className="hidden bg-bl-card sm:block" />
              )}
            </nav>
          )}

          <Comments />
        </div>

        <aside className="sticky top-8 hidden w-64 shrink-0 xl:block">
          <TableOfContents recordMap={recordMap} pageId={post.id} />
        </aside>
      </main>

      <Footer />
    </PageShell>
  );
}
