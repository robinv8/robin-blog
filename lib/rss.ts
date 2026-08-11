import { siteConfig } from '@/site.config';
import { Post } from '@/schema/post';

function escapeXml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

export function generateRss(posts: Post[]): string {
    const year = new Date().getFullYear();
    const { link, title, description, language, author, email } = siteConfig;

    const items = posts
        .map((post) => {
            const url = `${link}/posts/${post.slug}`;
            return `    <item>
      <title>${escapeXml(post.title ?? '')}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.summary ?? '')}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`;
        })
        .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${link}</link>
    <description>${escapeXml(description)}</description>
    <language>${language}</language>
    <copyright>All rights reserved ${year}, ${author}</copyright>
    <managingEditor>${email} (${author})</managingEditor>
    <generator>Notion</generator>
${items}
  </channel>
</rss>`;
}
