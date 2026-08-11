import { NotionAPI } from 'notion-client';
import { siteConfig } from '@/site.config';

/**
 * Shared NotionAPI factory.
 * Notion 的 Cloudflare 会拦截无浏览器 User-Agent 的请求（403 Attention Required），
 * 这里统一注入浏览器 UA 以绕过拦截。
 *
 * 构建期会并行预渲染大量页面，容易触发 Notion 429；因此：
 * 1. 进程内单例 API
 * 2. 全局请求队列（限制并发 + 最小间隔）
 * 3. 外层指数退避重试
 */
let apiInstance: NotionAPI | null = null;

export function createNotionApi() {
    if (!apiInstance) {
        apiInstance = new NotionAPI({
            authToken: siteConfig.notionAccessToken || undefined,
            ofetchOptions: {
                headers: {
                    'User-Agent':
                        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
                },
                // 内层轻量重试；重度 429 由外层队列 + 退避处理
                retry: 2,
                retryDelay: 1200,
                retryStatusCodes: [408, 409, 425, 429, 500, 502, 503, 504],
                timeout: 45000,
            },
        });
    }
    return apiInstance;
}

const MAX_CONCURRENT = 1;
const MIN_GAP_MS = 250;
const MAX_ATTEMPTS = 8;

let active = 0;
const waiters: Array<() => void> = [];
let lastStart = 0;

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function acquire() {
    if (active >= MAX_CONCURRENT) {
        await new Promise<void>((resolve) => {
            waiters.push(resolve);
        });
    }
    active += 1;
    const gap = MIN_GAP_MS - (Date.now() - lastStart);
    if (gap > 0) {
        await sleep(gap);
    }
    lastStart = Date.now();
}

function release() {
    active = Math.max(0, active - 1);
    const next = waiters.shift();
    if (next) next();
}

function isRetryable(error: unknown): boolean {
    const msg = error instanceof Error ? error.message : String(error);
    return /429|408|409|425|500|502|503|504|ECONNRESET|ETIMEDOUT|ECONNREFUSED|fetch failed|network|socket/i.test(
        msg
    );
}

/**
 * 带队列 + 退避的 getPage，构建期与运行期统一入口。
 */
export async function notionGetPage(pageId: string) {
    const api = createNotionApi();
    let lastError: unknown;

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        await acquire();
        try {
            return await api.getPage(pageId);
        } catch (error) {
            lastError = error;
            const retryable = isRetryable(error);
            if (!retryable || attempt === MAX_ATTEMPTS) {
                throw error;
            }
            // 1s, 2s, 4s, 8s... 上限 30s；429 时再多等一点
            const msg = error instanceof Error ? error.message : String(error);
            const base = Math.min(30000, 1000 * 2 ** (attempt - 1));
            const delay = /429/.test(msg) ? base + 1500 : base;
            console.warn(
                `[notion] getPage ${pageId} failed (attempt ${attempt}/${MAX_ATTEMPTS}): ${msg}; retry in ${delay}ms`
            );
            await sleep(delay);
        } finally {
            release();
        }
    }

    throw lastError;
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
