import React from "react";
import Link from "next/link";
import { getPostBlocks, getAllPosts } from "@/lib/notion";
import { Post } from "@/schema/post";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { PageShell } from "../../components/Page";
import PostView from "./PostView";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = (await getAllPosts({ onlyPost: true })) as Post[];
  // zh / en versions of an article share the same slug — collect all variants
  const variants = posts?.filter((t) => t.slug === slug) || [];

  if (variants.length === 0) {
    return (
      <PageShell>
        <Header />
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-6">
          <h1 className="font-serif-sc font-bold text-3xl">文章不存在 / Post not found.</h1>
          <Link href="/" className="u-link font-mono text-xs tracking-[0.25em] font-bold text-[#FF4D00]">
            ← BACK HOME
          </Link>
        </div>
        <Footer />
      </PageShell>
    );
  }

  const variantsWithBlocks = await Promise.all(
    variants.map(async (post) => ({
      post,
      recordMap: await getPostBlocks(post.id),
    }))
  );

  return <PostView variants={variantsWithBlocks} />;
}

// Generate static params for cleaner SSG (dedupe: zh/en share one slug)
export async function generateStaticParams() {
  const posts = (await getAllPosts({ onlyPost: true })) as Post[];
  const slugs = new Set<string>();
  posts?.forEach((post) => post.slug && slugs.add(post.slug));
  return Array.from(slugs).map((slug) => ({ slug }));
}
