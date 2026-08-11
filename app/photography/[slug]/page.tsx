import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import { getAllPosts, getPostBlocks } from "@/lib/notion";
import { Post } from "@/schema/post";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { PageShell } from "../../components/Page";
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
    <PageShell>
      <Header />

      <main className="max-w-3xl mx-auto pt-14 md:pt-20">
        <header className="mb-12 pb-10 border-b border-[#1B1B18]/15 dark:border-[#E8E6DF]/15">
          <Link
            href="/photography"
            className="u-link font-mono text-[11px] tracking-[0.25em] text-current/50 hover:text-[#FF4D00] transition-colors"
          >
            ← 全部摄影
          </Link>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[#FF4D00] mt-8 mb-6">
            [ ALBUM — {dayjs(post.date).format("YYYY.MM.DD")} ]
          </p>
          <h1 className="font-serif-sc font-black text-3xl md:text-5xl leading-tight tracking-tight">
            {post.title}
          </h1>
          {post.summary && (
            <p className="mt-6 text-sm leading-loose text-current/60 max-w-xl">{post.summary}</p>
          )}
        </header>

        <article className="notion-content pb-8">
          <NotionPageRenderer recordMap={blockMap} />
        </article>
      </main>

      <Footer />
    </PageShell>
  );
}
