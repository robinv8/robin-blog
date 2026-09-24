"use client";

import dayjs from "dayjs";
import type { Post } from "@/schema/post";
import { postsForLang } from "@/lib/i18n";
import { useLang } from "./LangProvider";
import { SectionLabel } from "./Page";
import PostRow from "./PostRow";

function Rows({ posts, dateFormat }: { posts: Post[]; dateFormat?: string }) {
  return (
    <ul>
      {posts.map((post, i) => (
        <li key={post.id}>
          <PostRow post={post} first={i === 0} dateFormat={dateFormat} />
        </li>
      ))}
    </ul>
  );
}

/** Post list in the current language, optionally grouped by year. */
export default function PostList({ posts, byYear = false }: { posts: Post[]; byYear?: boolean }) {
  const { lang } = useLang();
  const list = postsForLang(posts, lang);

  if (list.length === 0) {
    return (
      <p className="border-y border-bl-line py-10 text-center text-sm text-bl-muted">
        {lang === "en" ? "No posts yet." : "暂无文章。"}
      </p>
    );
  }

  if (!byYear) return <Rows posts={list} />;

  const groups = new Map<string, Post[]>();
  for (const post of list) {
    const year = post.date ? dayjs(post.date).format("YYYY") : "----";
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year)!.push(post);
  }

  return (
    <>
      {[...groups.entries()].map(([year, yearPosts], i) => (
        <section key={year} className="mb-16">
          <SectionLabel
            no={String(i + 1).padStart(2, "0")}
            zh={`${year} 年`}
            en={year}
            aside={<span>{yearPosts.length}</span>}
          />
          <Rows posts={yearPosts} dateFormat="MM.DD" />
        </section>
      ))}
    </>
  );
}
