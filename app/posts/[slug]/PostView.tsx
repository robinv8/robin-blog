"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import SiteHeader from "../../components/Header";
import Comments from "../../components/Comments";
import Footer from "../../components/Footer";
import { PageShell } from "../../components/Page";
import { NotionPageRenderer } from "../../components/NotionPageRenderer";
import TableOfContents from "./TableOfContents";
import { getHeadings, getReadingStats } from "./postMeta";
import { useLang } from "../../components/LangProvider";
import { getPostLang, type Lang } from "@/lib/i18n";
import { profile } from "@/content/profile";
import { siteConfig } from "@/site.config";
import type { Post } from "@/schema/post";
import dayjs from "dayjs";

export interface PostVariant {
  post: Post;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recordMap: any;
}

interface AdjacentPost {
  slug: string;
  title: Record<Lang, string>;
}

const ARTICLE_ID = "post-body";

function tagsOf(post: Post): string[] {
  const raw = (post as Record<string, unknown>).tags;
  if (Array.isArray(raw)) return raw as string[];
  if (typeof raw === "string") return raw.split(",").map((s) => s.trim()).filter(Boolean);
  return [];
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
  const { lang, setLang } = useLang();
  const isEn = lang === "en";

  const variant =
    variants.find((v) => getPostLang(v.post) === lang) ||
    variants.find((v) => getPostLang(v.post) === "zh") ||
    variants[0];

  const { post, recordMap } = variant;
  const postLang = getPostLang(post);
  const langs = new Set(variants.map((v) => getPostLang(v.post)));
  const hasOtherLang = langs.has("zh") && langs.has("en");
  const tags = tagsOf(post);

  const headings = useMemo(() => getHeadings(recordMap, post.id), [recordMap, post.id]);
  const stats = useMemo(() => getReadingStats(recordMap), [recordMap]);
  const topLevel = headings.length ? Math.min(...headings.map((h) => h.level)) : 1;

  const meta = [
    dayjs(post.date).format("YYYY.MM.DD"),
    postLang === "en" ? `${stats.minutes} min read` : `阅读约 ${stats.minutes} 分钟`,
    postLang === "en" ? `${stats.words.toLocaleString("en-US")} words` : `${stats.words.toLocaleString("en-US")} 字`,
  ];
  const headline = profile.headline[lang];

  return (
    <PageShell>
      <SiteHeader />

      <main className="pt-12 md:pt-16 xl:grid xl:grid-cols-[minmax(0,680px)_240px] xl:justify-between xl:gap-x-16">
        <div className="mx-auto max-w-[680px] xl:mx-0">
          <header className="mb-10">
            <p className="font-mono text-xs text-bl-muted">
              <Link href="/" className="transition-colors hover:text-bl-fg">~/robin</Link>
              <span className="text-bl-acc"> $ </span>
              cat{" "}
              <Link href="/posts" className="transition-colors hover:text-bl-fg">posts</Link>
              /{post.slug}.md
            </p>
            <h1 className="mt-7 text-[28px] font-bold leading-[1.35] tracking-tight md:text-[34px]">{post.title}</h1>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="flex flex-wrap gap-x-2 gap-y-1 font-mono text-xs text-bl-muted">
                {meta.map((m, i) => (
                  <span key={m} className={i === 0 ? "text-bl-acc" : ""}>
                    {i > 0 && <span className="mr-2 text-bl-line">·</span>}
                    {m}
                  </span>
                ))}
                {tags.map((t) => (
                  <Link key={t} href={`/tags/${encodeURIComponent(t)}`} className="transition-colors hover:text-bl-acc">
                    <span className="mr-2 text-bl-line">·</span>#{t}
                  </Link>
                ))}
              </p>
              {hasOtherLang && (
                <div role="group" aria-label={isEn ? "Article language" : "文章语言"} className="flex rounded-lg border border-bl-line p-0.5 font-mono text-[11px]">
                  {(["zh", "en"] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      aria-pressed={postLang === l}
                      className={`rounded-md px-3 py-1 transition-colors ${
                        postLang === l ? "bg-bl-panel font-semibold text-bl-fg" : "text-bl-muted hover:text-bl-fg"
                      }`}
                    >
                      {l === "zh" ? "中文" : "EN"}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {post.summary && <p className="mt-8 text-[17px] leading-[1.85] text-bl-soft">{post.summary}</p>}
          </header>

          <article id={ARTICLE_ID} data-top={topLevel} className="notion-content post-body border-t border-bl-line pt-4">
            <NotionPageRenderer recordMap={recordMap} />
          </article>

          <footer className="mt-14">
            <p className="font-mono text-xs text-bl-muted">
              <span className="font-semibold text-bl-acc">$</span> exit 0
            </p>
            <div className="mt-5 flex gap-4 rounded-lg border border-bl-line bg-bl-panel p-6">
              <span aria-hidden className="flex size-12 shrink-0 items-center justify-center rounded-full bg-bl-acc font-mono text-lg font-bold text-bl-bg">
                R
              </span>
              <div className="min-w-0">
                <p className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                  <Link href="/about" className="font-bold transition-colors hover:text-bl-acc">{profile.name[lang]}</Link>
                  <span className="font-mono text-xs text-bl-muted">Founding Engineer · {isEn ? "Hangzhou" : "杭州"}</span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-bl-soft">
                  {headline.before}
                  {headline.accent}
                  {headline.after}
                </p>
                <p className="mt-2.5 flex gap-2 font-mono text-xs text-bl-muted">
                  <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="text-bl-acc hover:underline">github</a>
                  ·
                  <Link href="/feed" className="text-bl-acc hover:underline">rss</Link>
                  ·
                  <a href={`mailto:${siteConfig.email}`} className="text-bl-acc hover:underline">mail</a>
                </p>
              </div>
            </div>
            {tags.length > 0 && (
              <p className="mt-5 flex flex-wrap gap-2 font-mono text-[11px]">
                {tags.map((t) => (
                  <Link
                    key={t}
                    href={`/tags/${encodeURIComponent(t)}`}
                    className="rounded-md border border-bl-line px-2.5 py-1 text-bl-muted transition-colors hover:border-bl-acc hover:text-bl-acc"
                  >
                    #{t}
                  </Link>
                ))}
              </p>
            )}
          </footer>
        </div>

        {headings.length > 0 && (
          <aside className="sticky top-24 hidden self-start pt-1 xl:block">
            <TableOfContents headings={headings} articleId={ARTICLE_ID} />
          </aside>
        )}
      </main>

      <section className="mt-20">
        {(olderPost || newerPost) && (
          <nav className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-bl-line bg-bl-line sm:grid-cols-2">
            {olderPost ? (
              <Link href={`/posts/${encodeURIComponent(olderPost.slug)}`} className="group bg-bl-card px-7 py-6 transition-colors hover:bg-bl-card-hover">
                <span className="font-mono text-[11px] text-bl-muted">{isEn ? "← prev" : "← 上一篇 prev"}</span>
                <p className="mt-2.5 line-clamp-1 font-semibold transition-colors group-hover:text-bl-acc">{olderPost.title[lang]}</p>
              </Link>
            ) : (
              <span className="hidden bg-bl-card sm:block" />
            )}
            {newerPost ? (
              <Link href={`/posts/${encodeURIComponent(newerPost.slug)}`} className="group bg-bl-card px-7 py-6 text-right transition-colors hover:bg-bl-card-hover">
                <span className="font-mono text-[11px] text-bl-muted">{isEn ? "next →" : "下一篇 next →"}</span>
                <p className="mt-2.5 line-clamp-1 font-semibold transition-colors group-hover:text-bl-acc">{newerPost.title[lang]}</p>
              </Link>
            ) : (
              <span className="hidden bg-bl-card sm:block" />
            )}
          </nav>
        )}

        {siteConfig.comment.giscusConfig.repo && (
          <div className="mt-14">
            <p className="mb-5 flex items-baseline gap-2.5">
              <span className="font-mono text-[13px] font-semibold text-bl-acc">›</span>
              <span className="text-xl font-bold">{isEn ? "Comments" : "评论"}</span>
              <span className="font-mono text-[11px] text-bl-muted">comments</span>
            </p>
            <Comments />
          </div>
        )}
      </section>

      <Footer />
    </PageShell>
  );
}
