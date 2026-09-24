"use client";

import { useMemo, useState } from "react";
import { Post } from "@/schema/post";
import { getTags } from "@/lib/tags";
import { postsForLang } from "@/lib/i18n";
import { useLang } from "../components/LangProvider";
import PostRow from "../components/PostRow";

export default function SearchClient({ posts }: { posts: Post[] }) {
  const [keyword, setKeyword] = useState("");
  const { lang } = useLang();
  const isEn = lang === "en";
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
    <div>
      <label className="mb-4 flex items-center gap-3 rounded-lg border border-bl-line bg-bl-panel px-5 py-4 font-mono text-[15px] transition-colors focus-within:border-bl-acc">
        <span className="shrink-0 whitespace-nowrap text-bl-acc">$ grep</span>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder={isEn ? "title, summary or tag…" : "标题、摘要或标签…"}
          aria-label={isEn ? "Search posts" : "搜索文章"}
          autoFocus
          className="w-full bg-transparent outline-none placeholder:text-bl-muted"
        />
      </label>

      <p className="mb-6 font-mono text-xs text-bl-muted">
        {results.length} {isEn ? "matches" : "篇匹配"}
      </p>

      <ul>
        {results.map((post, i) => (
          <li key={post.id}>
            <PostRow post={post} first={i === 0} />
          </li>
        ))}
      </ul>

      {results.length === 0 && (
        <p className="border-y border-bl-line py-16 text-center text-sm text-bl-muted">
          {isEn ? `No results for "${keyword}"` : `没有找到与「${keyword}」相关的文章`}
        </p>
      )}
    </div>
  );
}
