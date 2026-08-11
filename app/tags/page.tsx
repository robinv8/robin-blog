import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/notion";
import { getAllTagsFromPosts } from "@/lib/tags";
import { Post } from "@/schema/post";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "标签",
  description: "按标签浏览所有文章",
};

export default async function TagsPage() {
  const posts = (await getAllPosts({ onlyPost: true })) as Post[];
  const tags = getAllTagsFromPosts(posts || []);
  const sortedTags = Object.entries(tags).sort((a, b) => b[1] - a[1]);

  return (
    <div className="font-sans antialiased text-slate-800 dark:text-slate-200 min-h-screen relative selection:bg-primary selection:text-white transition-colors duration-300">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="light-mesh dark:hidden w-full h-full absolute inset-0"></div>
        <div className="hidden dark:block w-full h-full absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Header />

        <main>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
              <span className="material-icons-outlined text-primary text-3xl">sell</span>
              标签
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              共 {sortedTags.length} 个标签
            </p>
          </div>

          <div className="glass-card rounded-3xl p-8">
            {sortedTags.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {sortedTags.map(([tag, count]) => (
                  <Link
                    key={tag}
                    href={`/tags/${encodeURIComponent(tag)}`}
                    className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-500/10 hover:bg-primary/10 text-slate-600 dark:text-slate-300 hover:text-primary transition-all"
                  >
                    <span className="text-sm font-medium">#{tag}</span>
                    <span className="text-xs text-slate-400 group-hover:text-primary/70 font-mono">
                      {count}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 dark:text-slate-400 text-sm">暂无标签</p>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
