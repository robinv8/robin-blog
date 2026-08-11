import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/notion';
import { siteConfig } from '@/site.config';

export const dynamic = 'force-static';
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const { link } = siteConfig;

    const staticPages = ['', '/photography', '/projects', '/books', '/friends', '/about'].map(
        (path) => ({
            url: `${link}${path}`,
            lastModified: new Date(),
        })
    );

    const posts = (await getAllPosts({ onlyPost: true })) || [];
    const postPages = posts
        .filter((post) => post.slug)
        .map((post) => ({
            url: `${link}/posts/${post.slug}`,
            lastModified: new Date(post.date),
        }));

    const photographyPosts = (await getAllPosts({ onlyPhotography: true })) || [];
    const photographyPages = photographyPosts
        .filter((post) => post.slug)
        .map((post) => ({
            url: `${link}/photography/${post.slug}`,
            lastModified: new Date(post.date),
        }));

    return [...staticPages, ...postPages, ...photographyPages];
}
