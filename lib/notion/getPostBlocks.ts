import { notionGetPage, normalizeRecordMap } from './api';

export async function getPostBlocks(id: string) {
    try {
        const pageBlock = await notionGetPage(id);
        return normalizeRecordMap(pageBlock);
    } catch (error: any) {
        console.error(`Failed to get page blocks for ${id}:`, error.message);
        throw error;
    }
}
