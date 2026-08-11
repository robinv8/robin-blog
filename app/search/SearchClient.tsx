"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { Post } from "@/schema/post";
import { getTags } from "@/lib/tags";
import { postsForLang } from "@/lib/i18n";
import { useLang } from "../components/LangProvider";

export default function SearchClient({ posts }: { posts: Post[] }) {
  const [keyword, setKeyword] = useState("");
  const { lang } = useLang();
  const langPosts = useMemo(() => postsForLang(posts, lang), [posts, lang]);

  const results = useMemo(() => {
    const k = keyword.trim().toLowerCase();
    if (!k) return langPosts;
    return langPosts.filter((post) => {
      const inTitle = post.title?.toLowerCase().includes(k);
      const inSummary = post.summary?.toLowerCase().includes(k);
      const inTags = getTags(post).some((t) => t.toLowerCase().includes(k));
      return inTitle || inSummary || inTags;
    });
  }, [keyword, langPosts]);

  return (
    <div className="pb-12">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder={lang === "en" ? "SEARCH TITLE, SUMMARY OR TAG…" : "搜索文章标题、摘要或标签…"}
        autoFocus
        className="w-full bg-transparent border-b-2 border-[#1B1B18] dark:border-[#E8E6DF] focus:border-[#FF4D00] dark:focus:border-[#FF4D00] outline-none font-serif-sc font-bold text-2xl md:text-3xl py-4 mb-4 placeholder:text-current/25 transition-colors"
      />

      <p className="font-mono text-[10px] tracking-[0.25em] text-current/40 mb-6">
        [ {results.length} {lang === "en" ? "POSTS" : "篇文章"} ]
      </p>

      {results.map((post) => (
        <Link
          key={post.id}
          href={`/posts/${post.slug}`}
          className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-4 md:gap-8 py-5 border-b border-[#1B1B18]/10 dark:border-[#E8E6DF]/10 -mx-3 px-3 transition-colors duration-200 hover:bg-[#FF4D00]"
        >
          <span className="font-mono text-[10px] tracking-[0.2em] text-current/40 group-hover:text-[#FAFAF6]/70 transition-colors">
            {dayjs(post.date).format("YYYY.MM.DD")}
          </span>
          <span className="min-w-0">
            <h4 className="font-serif-sc font-bold text-base md:text-xl leading-snug group-hover:text-[#FAFAF6] transition-colors truncate">
              {post.title}
            </h4>
            {post.summary && (
              <p className="text-xs text-current/45 group-hover:text-[#FAFAF6]/70 line-clamp-1 mt-1.5 transition-colors">
                {post.summary}
              </p>
            )}
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] text-current/30 group-hover:text-[#FAFAF6] transition-colors">
            →
          </span>
        </Link>
      ))}

      {results.length === 0 && (
        <p className="font-mono text-xs tracking-[0.2em] text-current/50 py-16 text-center">
          {lang === "en" ? `NO RESULTS FOR "${keyword}"` : `没有找到与「${keyword}」相关的文章`}
        </p>
      )}
    </div>
  );
}
