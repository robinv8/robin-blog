import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import { getAllPosts, getPostBlocks } from "@/lib/notion";
import { Post } from "@/schema/post";
import SiteHeader from "../../components/Header";
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
      <SiteHeader />

      <main className="mx-auto max-w-3xl pt-14 md:pt-20">
        <header className="mb-12 border-b border-bl-line pb-10">
          <Link href="/photography" className="font-mono text-xs text-bl-muted transition-colors hover:text-bl-acc">
            ← 全部摄影 / all photos
          </Link>
          <p className="mt-8 mb-5 font-mono text-xs text-bl-acc">{dayjs(post.date).format("YYYY.MM.DD")}</p>
          <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-[44px]">{post.title}</h1>
          {post.summary && <p className="mt-6 max-w-xl text-[15px] leading-[1.8] text-bl-soft">{post.summary}</p>}
        </header>

        <article className="notion-content pb-8">
          <NotionPageRenderer recordMap={blockMap} />
        </article>
      </main>

      <Footer />
    </PageShell>
  );
}
