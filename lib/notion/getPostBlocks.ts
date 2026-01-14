import { siteConfig } from '@/site.config';
import { NotionAPI } from 'notion-client';

export async function getPostBlocks(id: string) {
    const authToken = siteConfig.notionAccessToken || undefined;
    const api = new NotionAPI({ authToken });

    try {
        const pageBlock = await api.getPage(id);
        // Preview images logic skipped for simplicity as per user request to just basic port first
        return pageBlock;
    } catch (error: any) {
        console.error(`Failed to get page blocks for ${id}:`, error.message);
        throw error;
    }
}
