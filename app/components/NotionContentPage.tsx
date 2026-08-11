import React from "react";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBlocks } from "@/lib/notion";
import { Post } from "@/schema/post";
import Header from "./Header";
import Footer from "./Footer";
import { NotionPageRenderer } from "./NotionPageRenderer";

/**
 * 渲染 Notion 数据库中 type=Page 的条目（关于/项目/书架/友链）。
 * 页面内容完全由 Notion 管理，slug 与路由一一对应。
 */
export default async function NotionContentPage({ slug }: { slug: string }) {
  const pages = (await getAllPosts({ onlyPage: true })) as Post[];
  const page = pages?.find((p) => p.slug === slug);

  if (!page) {
    notFound();
  }

  const blockMap = await getPostBlocks(page.id);

  return (
    <div className="font-sans antialiased text-slate-800 dark:text-slate-200 min-h-screen relative selection:bg-primary selection:text-white transition-colors duration-300">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="light-mesh dark:hidden w-full h-full absolute inset-0"></div>
        <div className="hidden dark:block w-full h-full absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black"></div>
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-60 dark:opacity-20 animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-3xl opacity-60 dark:opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Header />

        <main className="max-w-4xl mx-auto">
          <article className="glass-card p-6 md:p-10 rounded-3xl relative overflow-hidden mb-8">
            <header className="mb-8 border-b border-slate-200/60 dark:border-slate-700/60 pb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 leading-tight">
                {page.title}
              </h1>
            </header>

            <div className="notion-content">
              <NotionPageRenderer recordMap={blockMap} />
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </div>
  );
}
