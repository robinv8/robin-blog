import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBlocks, getAllPosts } from "@/lib/notion";
import { siteConfig } from "../../../site.config";
import { Post } from "@/schema/post";
import PostView from "./PostView";

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
  const variants = posts?.filter((t) => t.slug === slug) || [];
  const post = variants[0];

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
  // zh / en versions of an article share the same slug — collect all variants
  const variants = posts?.filter((t) => t.slug === slug) || [];

  if (variants.length === 0) {
    notFound();
  }

  const variantsWithBlocks = await Promise.all(
    variants.map(async (post) => ({
      post,
      recordMap: await getPostBlocks(post.id),
    }))
  );

  // prev / next 按去重后的 slug 序列计算（中英同 slug 视为同一篇）
  const uniqueSlugs = Array.from(
    new Set(posts.map((p) => p.slug).filter(Boolean))
  ) as string[];
  const idx = uniqueSlugs.indexOf(slug);
  const newerSlug = idx > 0 ? uniqueSlugs[idx - 1] : null;
  const olderSlug = idx >= 0 && idx < uniqueSlugs.length - 1 ? uniqueSlugs[idx + 1] : null;
  const summaryOf = (s: string | null) => {
    if (!s) return null;
    const p = posts.find((t) => t.slug === s);
    return p ? { slug: s, title: p.title ?? "" } : null;
  };

  return (
    <PostView
      variants={variantsWithBlocks}
      newerPost={summaryOf(newerSlug)}
      olderPost={summaryOf(olderSlug)}
    />
  );
}

// Generate static params for cleaner SSG (dedupe: zh/en share one slug)
export async function generateStaticParams() {
  const posts = (await getAllPosts({ onlyPost: true })) as Post[];
  const slugs = new Set<string>();
  posts?.forEach((post) => post.slug && slugs.add(post.slug));
  return Array.from(slugs).map((slug) => ({ slug }));
}
