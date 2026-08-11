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
import { PageShell, PageHero } from "../../components/Page";

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
    <PageShell>
      <Header />
      <PageHero
        no="07"
        zh={`#${tag}`}
        en={`#${tag}`}
        desc={`共 ${taggedPosts.length} 篇文章。`}
        descEn={`${taggedPosts.length} posts.`}
        punct=""
      />

      <main className="pb-12">
        <Link
          href="/tags"
          className="u-link inline-block font-mono text-[11px] tracking-[0.25em] text-current/50 hover:text-[#FF4D00] transition-colors mb-8"
        >
          ← 全部标签 / ALL TAGS
        </Link>

        {taggedPosts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.slug}`}
            className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-4 md:gap-8 py-5 border-b border-[#1B1B18]/10 dark:border-[#E8E6DF]/10 -mx-3 px-3 transition-colors duration-200 hover:bg-[#FF4D00]"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] text-current/40 group-hover:text-[#FAFAF6]/70 transition-colors">
              {dayjs(post.date).format("YYYY.MM.DD")}
            </span>
            <span className="min-w-0">
              <h4 className="font-serif-sc font-bold text-base md:text-xl leading-snug group-hover:text-[#FAFAF6] transition-colors truncate">
                {post.title}
              </h4>
              {post.summary && (
                <p className="text-xs text-current/45 group-hover:text-[#FAFAF6]/70 line-clamp-1 mt-1.5 transition-colors">
                  {post.summary}
                </p>
              )}
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-current/30 group-hover:text-[#FAFAF6] transition-colors">
              →
            </span>
          </Link>
        ))}
      </main>

      <Footer />
    </PageShell>
  );
}
