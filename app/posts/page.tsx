import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import dayjs from "dayjs";
import { getAllPosts } from "@/lib/notion";
import { Post } from "@/schema/post";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { PageShell, PageHero, SectionLabel } from "../components/Page";

export const metadata: Metadata = {
  title: "文章",
  description: "全部文章归档",
};

export default async function PostsPage() {
  const posts = ((await getAllPosts({ onlyPost: true })) || []) as Post[];

  const byYear = new Map<string, Post[]>();
  for (const post of posts) {
    const year = post.date ? dayjs(post.date).format("YYYY") : "----";
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year)!.push(post);
  }
  const years = [...byYear.entries()];

  return (
    <PageShell>
      <Header />
      <PageHero
        no="02"
        zh="文章"
        en="POSTS"
        desc={`共 ${posts.length} 篇，按年份归档。`}
        descEn={`${posts.length} posts, archived by year.`}
      />

      <main className="pb-16">
        {years.length > 0 ? (
          years.map(([year, yearPosts], yi) => (
            <section key={year} className="mb-14">
              <SectionLabel
                no={String(yi + 1).padStart(2, "0")}
                zh={`${year} 年`}
                en={`— ${year}`}
              />
              <div>
                {yearPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/posts/${post.slug}`}
                    className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-4 md:gap-8 py-5 border-b border-[#1B1B18]/10 dark:border-[#E8E6DF]/10 -mx-3 px-3 transition-colors duration-200 hover:bg-[#FF4D00]"
                  >
                    <span className="font-mono text-[10px] tracking-wider text-current/35 group-hover:text-[#FAFAF6]/70 w-20 shrink-0 transition-colors">
                      {post.date ? dayjs(post.date).format("MM.DD") : ""}
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-serif-sc font-bold text-base md:text-xl leading-snug group-hover:text-[#FAFAF6] transition-colors truncate">
                        {post.title}
                      </h4>
                      {post.summary && (
                        <p className="text-xs text-current/45 group-hover:text-[#FAFAF6]/70 line-clamp-1 mt-1.5 transition-colors">
                          {post.summary}
                        </p>
                      )}
                    </div>
                    <span className="font-mono text-xs text-current/30 group-hover:text-[#FAFAF6] group-hover:translate-x-1 transition-all shrink-0">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))
        ) : (
          <p className="font-mono text-xs tracking-[0.2em] text-current/50">暂无文章 / NO POSTS</p>
        )}
      </main>

      <Footer />
    </PageShell>
  );
}
