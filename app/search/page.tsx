import React from "react";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/notion";
import { Post } from "@/schema/post";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { PageShell, PageHero } from "../components/Page";
import SearchClient from "./SearchClient";

export const metadata: Metadata = {
  title: "搜索",
  description: "搜索所有文章",
};

export default async function SearchPage() {
  const posts = ((await getAllPosts({ onlyPost: true })) || []) as Post[];

  return (
    <PageShell>
      <Header />
      <PageHero
        no="08"
        zh="搜索"
        en="SEARCH"
        desc="按标题、摘要或标签检索所有文章。"
        descEn="Search all posts by title, summary or tag."
      />

      <main>
        <SearchClient posts={posts} />
      </main>

      <Footer />
    </PageShell>
  );
}
