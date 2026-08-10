import { Post } from '@/schema/post';

export type Lang = 'zh' | 'en';

/**
 * Detect the language of a post.
 * Priority: Notion `Lang` select field (zh / en) → CJK heuristic on title.
 */
export function getPostLang(post: Post): Lang {
  const raw = (post as Record<string, unknown>).Lang ?? (post as Record<string, unknown>).lang;
  const v = Array.isArray(raw) ? raw[0] : raw;
  if (typeof v === 'string') {
    const s = v.trim().toLowerCase();
    if (s.startsWith('en')) return 'en';
    if (s.startsWith('zh')) return 'zh';
  }
  const title = typeof post.title === 'string' ? post.title : '';
  return /[\u4e00-\u9fff]/.test(title) ? 'zh' : 'en';
}

/** Filter posts for a given language. Falls back to all posts when none match. */
export function postsForLang(posts: Post[], lang: Lang): Post[] {
  const filtered = posts.filter((p) => getPostLang(p) === lang);
  return filtered.length > 0 ? filtered : posts;
}
