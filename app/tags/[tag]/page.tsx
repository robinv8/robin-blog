import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/notion";
import { getTags, getAllTagsFromPosts } from "@/lib/tags";
import { Post } from "@/schema/post";
import SiteHeader from "../../components/Header";
import Footer from "../../components/Footer";
import PostList from "../../components/PostList";
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
  const count = new Set(taggedPosts.map((p) => p.slug ?? p.id)).size;

  return (
    <PageShell>
      <SiteHeader />
      <PageHero
        zh={`#${tag}`}
        en={`#${tag}`}
        desc={`共 ${count} 篇文章。`}
        descEn={`${count} posts.`}
      />

      <main>
        <Link href="/tags" className="mb-8 inline-block font-mono text-xs text-bl-muted hover:text-bl-acc transition-colors">
          ← 全部标签 / all tags
        </Link>
        <PostList posts={taggedPosts} />
      </main>

      <Footer />
    </PageShell>
  );
}
