import { notFound, permanentRedirect } from "next/navigation";
import { getAllPosts } from "@/lib/notion";
import { Post } from "@/schema/post";

/**
 * 旧版博客的文章 URL 是 /<slug>，新版迁移到了 /posts/<slug>。
 * 这个路由负责把旧链接 308 重定向到新地址，保住已收录的 SEO 和外链。
 */
// 预渲染时非 ASCII 的动态参数会以 percent-encoded 形式传入，统一解码
function decodeSlug(raw: string): string {
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

export default async function LegacySlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  const slug = decodeSlug(rawSlug);
  const posts = (await getAllPosts({ onlyPost: true })) as Post[];
  const post = posts?.find((t) => t.slug === slug);

  if (!post) {
    notFound();
  }

  permanentRedirect(`/posts/${post.slug}`);
}

export async function generateStaticParams() {
  const posts = (await getAllPosts({ onlyPost: true })) as Post[];
  return (
    posts?.map((post) => ({
      slug: post.slug,
    })) || []
  );
}
