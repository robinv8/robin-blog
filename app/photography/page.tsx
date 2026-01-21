import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAllPosts } from "@/lib/notion";
import { Post } from "@/schema/post";

export default async function Photography() {
  const posts = await getAllPosts({ onlyPhotography: true }) || [];

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

        <section className="mb-12 text-center md:text-left md:flex justify-between items-end">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-slate-400">
              Captured Moments
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl text-sm md:text-base leading-relaxed">
              A collection of visual stories, fragments of light, and memories
              frozen in time. Exploring the world through the lens.
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex gap-2 overflow-x-auto no-scrollbar pb-1">
            <button className="px-4 py-1.5 rounded-full bg-white dark:bg-white/10 text-primary border border-primary/20 text-xs font-medium shadow-sm whitespace-nowrap">
              All Photos
            </button>
          </div>
        </section>

        <main className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6 pb-12">
          {posts.length === 0 && (
            <div className="text-center py-20 text-slate-500 col-span-full">
              <p>No photos found. Please check your Notion configuration.</p>
            </div>
          )}

          {posts.map((post: Post) => (
            <div key={post.id} className="break-inside-avoid relative group cursor-zoom-in">
              <div className="glass-card p-1.5 rounded-2xl overflow-hidden transition-all duration-500 group-hover:shadow-2xl">
                <div className="relative overflow-hidden rounded-xl">
                  {post.page_cover ? (
                    <img
                      alt={post.title || "Photography"}
                      className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
                      src={post.page_cover}
                    />
                  ) : (
                    <div className="w-full h-48 bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                      <span className="material-icons-outlined text-4xl text-slate-400">image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <h3 className="text-white font-medium text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {post.title || "Untitled"}
                    </h3>
                    <div className="flex justify-between items-center mt-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      {post.summary && (
                        <span className="text-white/80 text-xs font-mono">
                          {post.summary}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </main>

        {posts.length > 0 && (
          <div className="flex justify-center pb-8">
            <button className="group flex items-center gap-2 px-8 py-3 rounded-full glass hover:bg-white/80 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 hover:text-primary transition-all shadow-sm">
              <span className="text-sm font-medium">Load More Photos</span>
              <span className="material-icons-outlined text-xl group-hover:rotate-180 transition-transform duration-500">
                expand_more
              </span>
            </button>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}
