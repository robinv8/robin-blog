"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { Post } from "@/schema/post";
import { getTags } from "@/lib/tags";

export default function SearchClient({ posts }: { posts: Post[] }) {
  const [keyword, setKeyword] = useState("");

  const results = useMemo(() => {
    const k = keyword.trim().toLowerCase();
    if (!k) return posts;
    return posts.filter((post) => {
      const inTitle = post.title?.toLowerCase().includes(k);
      const inSummary = post.summary?.toLowerCase().includes(k);
      const inTags = getTags(post).some((t) => t.toLowerCase().includes(k));
      return inTitle || inSummary || inTags;
    });
  }, [keyword, posts]);

  return (
    <div>
      <div className="relative mb-8">
        <span className="material-icons-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
          search
        </span>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="搜索文章标题、摘要或标签…"
          autoFocus
          className="w-full glass-card rounded-full pl-14 pr-6 py-4 text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
        />
      </div>

      <p className="text-xs text-slate-400 mb-4 font-mono">
        {results.length} 篇文章
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map((post) => (
          <Link key={post.id} href={`/posts/${post.slug}`} className="block group">
            <article className="glass-card p-6 rounded-2xl h-full relative overflow-hidden transition-all hover:border-primary/30 hover:bg-white/60 dark:hover:bg-slate-800/40">
              <div className="flex flex-wrap gap-2 mb-3">
                {getTags(post).slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-full bg-slate-500/10 text-slate-500 dark:text-slate-400 text-[11px] font-medium"
                  >
                    #{t}
                  </span>
                ))}
              </div>
              <h4 className="text-base md:text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors mb-2 leading-snug">
                {post.title}
              </h4>
              {post.summary && (
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4">
                  {post.summary}
                </p>
              )}
              {post.date && (
                <time className="text-xs text-slate-400 font-mono">
                  {dayjs(post.date).format("MMM D, YYYY")}
                </time>
              )}
            </article>
          </Link>
        ))}
      </div>

      {results.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          <span className="material-icons-outlined text-5xl mb-4 block">search_off</span>
          <p className="text-sm">没有找到与「{keyword}」相关的文章</p>
        </div>
      )}
    </div>
  );
}
