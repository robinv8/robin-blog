export interface Post {
    id: string;
    date: number;
    title?: string;
    slug?: string;
    status?: string[];
    type?: string[];
    summary?: string;
    fullWidth?: boolean;
    [key: string]: any;
}

export default function filterPublishedPosts({
    posts,
    onlyNewsletter = false,
    onlyPost = false,
    onlyHidden = false
}: {
    posts: Post[] | null;
    onlyNewsletter?: boolean;
    onlyPost?: boolean;
    onlyHidden?: boolean;
}) {
    if (!posts || !posts.length) return [];
    return posts
        .filter((post) =>
            onlyNewsletter
                ? post?.type?.[0] === 'Newsletter'
                : post
        )
        .filter((post) =>
            onlyPost
                ? post?.type?.[0] === 'Post'
                : post
        )
        .filter((post) =>
            onlyHidden
                ? post?.type?.[0] === 'Hidden'
                : post?.type?.[0] !== 'Hidden'
        )
        .filter((post) => {
            return (
                post.title &&
                post.slug &&
                post?.status?.[0] === 'Published' &&
                post.date <= Date.now()
            );
        });
}
