import { Post } from '@/schema/post';

export default function filterPublishedPosts({
    posts,
    onlyNewsletter = false,
    onlyPost = false,
    onlyPhotography = false,
    onlyPage = false,
    onlyHidden = false
}: {
    posts: Post[] | null;
    onlyNewsletter?: boolean;
    onlyPost?: boolean;
    onlyPhotography?: boolean;
    onlyPage?: boolean;
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
        .filter((post) => {
            if (onlyPhotography) {
                const postType = post?.type?.[0]?.toLowerCase();
                return postType === 'photography';
            }
            return post;
        })
        .filter((post) =>
            onlyPage
                ? post?.type?.[0] === 'Page'
                : post
        )
        .filter((post) =>
            onlyHidden
                ? post?.type?.[0] === 'Hidden'
                : post?.type?.[0] !== 'Hidden'
        )
        .filter((post) => {
            const hasTitle = !!post.title;
            const hasSlug = !!post.slug;
            const isPublished = post?.status?.[0] === 'Published';
            // For photography, allow future dates (scheduled posts)
            // For other types, only show published posts with past dates
            const dateValid = onlyPhotography ? true : post.date <= Date.now();
            
            return hasTitle && hasSlug && isPublished && dateValid;
        });
}
