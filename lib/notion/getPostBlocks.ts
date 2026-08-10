import { siteConfig } from '@/site.config';
import { createNotionApi, normalizeRecordMap } from './api';

export async function getPostBlocks(id: string) {
    const api = createNotionApi();

    try {
        const pageBlock = await api.getPage(id);
        return normalizeRecordMap(pageBlock);
    } catch (error: any) {
        console.error(`Failed to get page blocks for ${id}:`, error.message);
        throw error;
    }
}
