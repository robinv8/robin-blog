import { Post } from '@/schema/post';

export function getTags(post: Post): string[] {
    const t = post.tags ?? post.tag;
    if (Array.isArray(t)) return t.filter((x): x is string => typeof x === 'string' && x.length > 0);
    if (typeof t === 'string') return t.split(',').map((s) => s.trim()).filter(Boolean);
    return [];
}

/** Tag → number of distinct posts (language variants sharing a slug count once). */
export function getAllTagsFromPosts(posts: Post[]): Record<string, number> {
    const slugsByTag: Record<string, Set<string>> = {};
    posts.forEach((post) => {
        getTags(post).forEach((tag) => {
            (slugsByTag[tag] ??= new Set()).add(post.slug ?? post.id);
        });
    });
    return Object.fromEntries(Object.entries(slugsByTag).map(([tag, slugs]) => [tag, slugs.size]));
}
