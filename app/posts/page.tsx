import type { Metadata } from "next";
import { getAllPosts } from "@/lib/notion";
import { Post } from "@/schema/post";
import SiteHeader from "../components/Header";
import Footer from "../components/Footer";
import PostList from "../components/PostList";
import { PageShell, PageHero } from "../components/Page";

export const metadata: Metadata = {
  title: "文章",
  description: "全部文章归档",
};

export default async function PostsPage() {
  const posts = ((await getAllPosts({ onlyPost: true })) || []) as Post[];
  const count = new Set(posts.map((p) => p.slug ?? p.id)).size;

  return (
    <PageShell>
      <SiteHeader />
      <PageHero
        zh="写作"
        en="Writing"
        desc={`共 ${count} 篇，按年份归档。`}
        descEn={`${count} posts, archived by year.`}
      />

      <main>
        <PostList posts={posts} byYear />
      </main>

      <Footer />
    </PageShell>
  );
}
