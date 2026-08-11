import React from "react";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBlocks } from "@/lib/notion";
import { Post } from "@/schema/post";
import Header from "./Header";
import Footer from "./Footer";
import { PageShell, PageHero } from "./Page";
import { NotionPageRenderer } from "./NotionPageRenderer";

/**
 * 渲染 Notion 数据库中 type=Page 的条目（关于/项目/书架/友链）。
 * 页面内容完全由 Notion 管理，slug 与路由一一对应。
 */
export default async function NotionContentPage({
  slug,
  no,
  zh,
  en,
  desc,
  descEn,
}: {
  slug: string;
  no: string;
  zh: string;
  en: string;
  desc?: string;
  descEn?: string;
}) {
  const pages = (await getAllPosts({ onlyPage: true })) as Post[];
  const page = pages?.find((p) => p.slug === slug);

  if (!page) {
    notFound();
  }

  const blockMap = await getPostBlocks(page.id);

  return (
    <PageShell>
      <Header />
      <PageHero no={no} zh={zh} en={en} desc={desc} descEn={descEn} />

      <main className="max-w-3xl pb-12">
        <article className="notion-content">
          <NotionPageRenderer recordMap={blockMap} />
        </article>
      </main>

      <Footer />
    </PageShell>
  );
}
