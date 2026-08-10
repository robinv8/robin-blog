import { NotionAPI } from 'notion-client';
import { siteConfig } from '@/site.config';

/**
 * Shared NotionAPI factory.
 * Notion 的 Cloudflare 会拦截无浏览器 User-Agent 的请求（403 Attention Required），
 * 这里统一注入浏览器 UA 以绕过拦截。
 */
export function createNotionApi() {
    return new NotionAPI({
        authToken: siteConfig.notionAccessToken || undefined,
        ofetchOptions: {
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
            },
            // 本地网络到 notion.so 偶发断连，加重试
            retry: 3,
            retryDelay: 800,
            retryStatusCodes: [408, 409, 425, 429, 500, 502, 503, 504],
            timeout: 30000
        }
    });
}

/**
 * 兼容新版 Notion API 的 recordMap 结构：
 * 部分响应的条目是双层包裹的 { value: { role, value: Block } }，
 * 而旧代码与 react-notion-x 期望标准结构 { role, value: Block }。
 * 这里统一拍平成标准结构。
 */
function normalizeEntry(entry: any, marker: 'type' | 'schema') {
    const inner = entry?.value;
    if (inner && inner[marker] === undefined && inner.value && inner.value[marker] !== undefined) {
        return { role: inner.role ?? entry?.role ?? 'reader', value: inner.value };
    }
    return entry;
}

export function normalizeRecordMap(recordMap: any): any {
    if (!recordMap) return recordMap;
    const normalized = { ...recordMap };
    if (recordMap.block) {
        const block: any = {};
        for (const [k, v] of Object.entries(recordMap.block)) {
            block[k] = normalizeEntry(v, 'type');
        }
        normalized.block = block;
    }
    if (recordMap.collection) {
        const collection: any = {};
        for (const [k, v] of Object.entries(recordMap.collection)) {
            collection[k] = normalizeEntry(v, 'schema');
        }
        normalized.collection = collection;
    }
    return normalized;
}
