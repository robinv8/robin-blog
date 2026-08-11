import { getAllPosts } from '@/lib/notion';
import { generateRss } from '@/lib/rss';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function GET() {
    const posts = (await getAllPosts({ onlyPost: true })) || [];
    const xml = generateRss(posts.slice(0, 10));

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
        },
    });
}
