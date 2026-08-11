import React from "react";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/notion";
import { Post } from "@/schema/post";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchClient from "./SearchClient";

export const metadata: Metadata = {
  title: "搜索",
  description: "搜索所有文章",
};

export default async function SearchPage() {
  const posts = ((await getAllPosts({ onlyPost: true })) || []) as Post[];

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
              <span className="material-icons-outlined text-primary text-3xl">search</span>
              搜索
            </h2>
          </div>

          <SearchClient posts={posts} />
        </main>

        <Footer />
      </div>
    </div>
  );
}
