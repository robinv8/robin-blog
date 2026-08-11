import { Post } from '@/schema/post';

export function getTags(post: Post): string[] {
    const t = post.tags ?? post.tag;
    if (Array.isArray(t)) return t.filter((x): x is string => typeof x === 'string' && x.length > 0);
    if (typeof t === 'string') return t.split(',').map((s) => s.trim()).filter(Boolean);
    return [];
}

export function getAllTagsFromPosts(posts: Post[]): Record<string, number> {
    const tagObj: Record<string, number> = {};
    posts.forEach((post) => {
        getTags(post).forEach((tag) => {
            tagObj[tag] = (tagObj[tag] ?? 0) + 1;
        });
    });
    return tagObj;
}
