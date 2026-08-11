import { siteConfig } from '@/site.config';
import { NotionAPI } from 'notion-client';
import { idToUuid } from 'notion-utils';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Post } from '@/schema/post';
import getAllPageIds from './getAllPageIds';
import getPageProperties from './getPageProperties';
import filterPublishedPosts from './filterPublishedPosts';
import { createNotionApi, normalizeRecordMap } from './api';

dayjs.extend(utc);
dayjs.extend(timezone);

// Generate slug from title if slug is missing
function generateSlugFromTitle(title: string): string {
    if (!title || typeof title !== 'string') {
        return '';
    }
    
    // For Chinese titles, use a simpler approach: keep Chinese characters and convert spaces to hyphens
    // For English titles, use standard slug format
    return title
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
        .toLowerCase() || 'untitled';
}

// Extract first image from Notion page blocks
// According to Notion official docs: https://developers.notion.com/reference/block
// Image blocks have image.file.url (for file type) or image.external.url (for external type)
async function getFirstImageFromPage(
    pageId: string,
    api: NotionAPI
): Promise<string | null> {
    try {
        const pageData = await api.getPage(pageId);
        const blocks = pageData.block;
        
        // Helper function to extract URL from file object
        // According to docs: file object has type "file" or "external"
        // For "file" type: use file.url
        // For "external" type: use external.url
        const extractUrlFromFileObject = (fileObj: unknown): string | null => {
            if (!fileObj || typeof fileObj !== 'object') return null;
            
            const file = fileObj as {
                type?: string;
                file?: { url?: string };
                external?: { url?: string };
            };
            
            if (file.type === 'file' && file.file?.url) {
                return file.file.url;
            }
            if (file.type === 'external' && file.external?.url) {
                return file.external.url;
            }
            
            return null;
        };
        
        // Iterate through all blocks to find the first image
        const blockEntries = Object.entries(blocks);
        
        for (const [, block] of blockEntries) {
            if (!block || typeof block !== 'object') continue;
            
            const blockValue = (block as { value?: unknown })?.value;
            if (!blockValue || typeof blockValue !== 'object') continue;
            
            const typedBlock = blockValue as {
                type?: string;
                properties?: unknown;
                format?: { display_source?: string };
            };
            
            // Check for image block
            // According to docs: image block has image.file.url or image.external.url
            if (typedBlock.type === 'image') {
                // First try format.display_source (usually the most reliable)
                if (typedBlock.format?.display_source) {
                    const displaySource = typedBlock.format.display_source;
                    if (typeof displaySource === 'string' && displaySource.length > 0) {
                        // If it's already a full URL, use it directly
                        if (displaySource.startsWith('http://') || displaySource.startsWith('https://')) {
                            return displaySource;
                        }
                        // If it starts with /, prepend Notion domain
                        if (displaySource.startsWith('/')) {
                            return `https://www.notion.so${displaySource}`;
                        }
                    }
                }
                
                // Try to get from properties (notion-client structure)
                const properties = typedBlock.properties as unknown;
                if (properties && typeof properties === 'object') {
                    const props = properties as Record<string, unknown>;
                    
                    // Try source property (common in notion-client)
                    if (Array.isArray(props.source) && props.source[0]?.[0]) {
                        const sourceValue = props.source[0][0];
                        // Check if it's a file object
                        const url = extractUrlFromFileObject(sourceValue);
                        if (url) return url;
                        // If it's a string, check if it's a valid URL
                        if (typeof sourceValue === 'string' && 
                            (sourceValue.startsWith('http://') || sourceValue.startsWith('https://'))) {
                            return sourceValue;
                        }
                    }
                    
                    // Try file property
                    if (Array.isArray(props.file) && props.file[0]?.[0]) {
                        const fileValue = props.file[0][0];
                        const url = extractUrlFromFileObject(fileValue);
                        if (url) return url;
                    }
                }
            }
            
            // Check for file block with image extension
            if (typedBlock.type === 'file') {
                const properties = typedBlock.properties as unknown;
                if (properties && typeof properties === 'object') {
                    const props = properties as Record<string, unknown>;
                    if (Array.isArray(props.source) && props.source[0]?.[0]) {
                        const sourceValue = props.source[0][0];
                        const url = extractUrlFromFileObject(sourceValue);
                        if (url) {
                            // Check if it's an image file by extension
                            const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i;
                            if (imageExtensions.test(url) || url.startsWith('http')) {
                                return url;
                            }
                        }
                    }
                }
            }
        }
        
        return null;
    } catch (error) {
        console.warn(`[getAllPosts] Failed to get first image for page ${pageId}:`, error);
        return null;
    }
}

// 进程内缓存：一次构建/运行周期内会调用 getAllPosts 几十次，
// 每次都全量拉 Notion 既慢又容易触发限流（偶发失败后会被静态化烘焙成 404）。
// 这里缓存未过滤的原始数据，过滤在内存中按需进行。
const CACHE_TTL = 5 * 60 * 1000;
let postsCache: { at: number; promise: Promise<Post[]> } | null = null;

async function fetchAllPosts(): Promise<Post[]> {
    let id = siteConfig.notionPageId;

    if (!id) {
        console.error('NOTION_PAGE_ID is required but not set');
        return [];
    }

    const api = createNotionApi();

    try {
        const response = normalizeRecordMap(await api.getPage(id));

        id = idToUuid(id);
        const collection: any = (Object.values(response.collection) as any[])[0]?.value;
        const collectionQuery = response.collection_query;
        const block: any = response.block;
        const schema = collection?.schema;

        const rawMetadata: any = block[id].value;

        // Check Type
        if (
            rawMetadata?.type !== 'collection_view_page' &&
            rawMetadata?.type !== 'collection_view'
        ) {
            console.log(`pageId '${id}' is not a database`);
            return [];
        } else {
            // Construct Data
            const pageIds = getAllPageIds(collectionQuery);
            const data: Post[] = [];
            for (let i = 0; i < pageIds.length; i++) {
                const id = pageIds[i];
                const properties = (await getPageProperties(id, block, schema)) || null;

                if (properties) {
                    // Add fullwidth to properties
                    properties.fullWidth = block[id].value?.format?.page_full_width ?? false;
                    // Convert date (with timezone) to unix milliseconds timestamp
                    properties.date = (
                        properties.date?.start_date
                            ? dayjs.tz(properties.date?.start_date)
                            : dayjs(block[id].value?.created_time)
                    ).valueOf();

                    // Generate slug from title if slug is missing
                    if (!properties.slug) {
                        // Handle title - it might be a string or array
                        const titleValue = Array.isArray(properties.title) 
                            ? properties.title[0] 
                            : properties.title;
                        
                        if (titleValue && typeof titleValue === 'string' && titleValue.trim()) {
                            const generatedSlug = generateSlugFromTitle(titleValue);
                            if (generatedSlug) {
                                properties.slug = generatedSlug;
                            } else {
                                // Fallback: use post ID as slug if title generation fails
                                properties.slug = id;
                            }
                        } else {
                            // Fallback: use post ID as slug if no title
                            properties.slug = id;
                        }
                    }

                    // For photography posts, get first image from page content if no cover image
                    const postType = properties.type?.[0]?.toLowerCase();
                    if (postType === 'photography' && !properties.page_cover) {
                        const firstImage = await getFirstImageFromPage(id, api);
                        if (firstImage) {
                            properties.page_cover = firstImage;
                            console.log(`[getAllPosts] Found first image for "${properties.title}": ${firstImage.substring(0, 100)}...`);
                        } else {
                            console.warn(`[getAllPosts] No image found for photography post "${properties.title}" (id: ${id})`);
                        }
                    }

                    data.push(properties);
                }
            }

            // Sort by date
            if (siteConfig.sortByDate) {
                data.sort((a, b) => b.date - a.date);
            }
            return data;
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(`Failed to get posts from Notion:`, errorMessage);
        return [];
    }
}

export async function getAllPosts({
    onlyNewsletter = false,
    onlyPost = false,
    onlyPhotography = false,
    onlyPage = false,
    onlyHidden = false
}: {
    onlyNewsletter?: boolean;
    onlyPost?: boolean;
    onlyPhotography?: boolean;
    onlyPage?: boolean;
    onlyHidden?: boolean;
} = {}): Promise<Post[] | null> {
    if (!postsCache || Date.now() - postsCache.at > CACHE_TTL) {
        postsCache = { at: Date.now(), promise: fetchAllPosts() };
    }

    const data = await postsCache.promise;
    // 缓存失败的结果会导致后续所有页面拿到空数据，遇到失败立即失效
    if (data.length === 0) {
        postsCache = null;
    }

    return filterPublishedPosts({
        posts: data,
        onlyNewsletter,
        onlyPost,
        onlyPhotography,
        onlyPage,
        onlyHidden
    });
}
