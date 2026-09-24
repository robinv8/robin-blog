import Link from "next/link";
import dayjs from "dayjs";
import type { Post } from "@/schema/post";

export default function PostRow({
  post,
  first = false,
  dateFormat = "YYYY.MM.DD",
}: {
  post: Post;
  first?: boolean;
  dateFormat?: string;
}) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className={`group grid grid-cols-[1fr_24px] items-baseline gap-x-6 gap-y-1 border-b border-bl-line py-5.5 md:grid-cols-[120px_1fr_24px] ${first ? "border-t" : ""}`}
    >
      <time className="col-span-2 font-mono text-[12.5px] text-bl-muted md:col-span-1">
        {post.date ? dayjs(post.date).format(dateFormat) : ""}
      </time>
      <div className="min-w-0">
        <h3 className="text-lg font-medium transition-colors group-hover:text-bl-acc">{post.title}</h3>
        {post.summary && <p className="mt-1.5 line-clamp-1 text-sm text-bl-muted">{post.summary}</p>}
      </div>
      <span className="text-bl-muted transition-all group-hover:translate-x-1 group-hover:text-bl-acc">→</span>
    </Link>
  );
}
