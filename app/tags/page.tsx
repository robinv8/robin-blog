import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/notion";
import { getAllTagsFromPosts } from "@/lib/tags";
import { Post } from "@/schema/post";
import Header from "../components/Header";
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
      <Header />
      <PageHero
        no="07"
        zh="标签"
        en="TAGS"
        desc={`共 ${sortedTags.length} 个标签。`}
        descEn={`${sortedTags.length} tags in total.`}
      />

      <main className="pb-12">
        {sortedTags.length > 0 ? (
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {sortedTags.map(([tag, count]) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="group inline-flex items-baseline gap-2"
              >
                <span className="font-serif-sc font-bold text-lg group-hover:text-[#FF4D00] transition-colors">
                  #{tag}
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-current/35 group-hover:text-[#FF4D00] transition-colors">
                  ({count})
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="font-mono text-xs tracking-[0.2em] text-current/50">暂无标签 / NO TAGS</p>
        )}
      </main>

      <Footer />
    </PageShell>
  );
}
