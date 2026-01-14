import { siteConfig } from '@/site.config';
import { NotionAPI } from 'notion-client';
import { idToUuid } from 'notion-utils';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import getAllPageIds from './getAllPageIds';
import getPageProperties from './getPageProperties';
import filterPublishedPosts from './filterPublishedPosts';

dayjs.extend(utc);
dayjs.extend(timezone);

export async function getAllPosts({
    onlyNewsletter = false,
    onlyPost = false,
    onlyHidden = false
}: {
    onlyNewsletter?: boolean;
    onlyPost?: boolean;
    onlyHidden?: boolean;
} = {}) {
    let id = siteConfig.notionPageId;

    if (!id) {
        console.error('NOTION_PAGE_ID is required but not set');
        return [];
    }

    const authToken = siteConfig.notionAccessToken || undefined;
    const api = new NotionAPI({ authToken });

    try {
        const response = await api.getPage(id);

        id = idToUuid(id);
        const collection = Object.values(response.collection)[0]?.value;
        const collectionQuery = response.collection_query;
        const block = response.block;
        const schema = collection?.schema;

        const rawMetadata = block[id].value;

        // Check Type
        if (
            rawMetadata?.type !== 'collection_view_page' &&
            rawMetadata?.type !== 'collection_view'
        ) {
            console.log(`pageId '${id}' is not a database`);
            return null;
        } else {
            // Construct Data
            const pageIds = getAllPageIds(collectionQuery);
            const data: any[] = [];
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

                    data.push(properties);
                }
            }

            // remove all the the items doesn't meet requirements
            const posts = filterPublishedPosts({
                posts: data,
                onlyNewsletter,
                onlyPost,
                onlyHidden
            });

            // Sort by date
            if (siteConfig.sortByDate) {
                posts.sort((a, b) => b.date - a.date);
            }
            return posts;
        }
    } catch (error: any) {
        console.error(`Failed to get posts from Notion:`, error.message);
        return [];
    }
}
