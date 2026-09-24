import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/notion";
import { getAllTagsFromPosts } from "@/lib/tags";
import { Post } from "@/schema/post";
import SiteHeader from "../components/Header";
import Footer from "../components/Footer";
import { PageShell, PageHero } from "../components/Page";

export const metadata: Metadata = {
  title: "标签",
  description: "按标签浏览所有文章",
};

export default async function TagsPage() {
  const posts = (await getAllPosts({ onlyPost: true })) as Post[];
  const tags = getAllTagsFromPosts(posts || []);
  const sortedTags = Object.entries(tags).sort((a, b) => b[1] - a[1]);

  return (
    <PageShell>
      <SiteHeader />
      <PageHero
        zh="标签"
        en="Tags"
        desc={`共 ${sortedTags.length} 个标签。`}
        descEn={`${sortedTags.length} tags in total.`}
      />

      <main>
        {sortedTags.length > 0 ? (
          <ul className="flex flex-wrap gap-2.5">
            {sortedTags.map(([tag, count]) => (
              <li key={tag}>
                <Link
                  href={`/tags/${encodeURIComponent(tag)}`}
                  className="group inline-flex items-baseline gap-2 rounded border border-bl-line px-3.5 py-2 font-mono text-[13px] transition-colors hover:border-bl-acc"
                >
                  <span className="transition-colors group-hover:text-bl-acc">#{tag}</span>
                  <span className="text-xs text-bl-muted">{count}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="border-y border-bl-line py-10 text-center text-sm text-bl-muted">暂无标签 / No tags yet.</p>
        )}
      </main>

      <Footer />
    </PageShell>
  );
}
