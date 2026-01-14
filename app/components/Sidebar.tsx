
"use client";

import React, { useMemo } from 'react';
import Link from 'next/link';
import { getPageTableOfContents } from 'notion-utils';
import { ExtendedRecordMap, PageBlock } from 'notion-types';
import dayjs from 'dayjs';

interface SidebarProps {
    recordMap: ExtendedRecordMap;
    relatedPosts?: any[];
}

export default function Sidebar({ recordMap, relatedPosts = [] }: SidebarProps) {
    // Generate Table of Contents
    const toc = useMemo(() => {
        if (!recordMap) return [];
        const pageId = Object.keys(recordMap.block)[0];
        const block = recordMap.block[pageId]?.value;

        if (!block) return [];

        return getPageTableOfContents(block as PageBlock, recordMap);
    }, [recordMap]);

    return (
        <aside className="hidden lg:block space-y-8 sticky top-6">
            {/* Table of Contents */}
            {toc && toc.length > 0 && (
                <div className="glass-card p-5 rounded-2xl">
                    <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                        <span className="material-icons-outlined text-lg">list</span>
                        目录
                    </h3>
                    <nav className="text-sm">
                        <ul className="space-y-2">
                            {toc.map((item) => (
                                <li
                                    key={item.id}
                                    style={{ paddingLeft: `${(item.indentLevel || 0) * 16} px` }}
                                >
                                    <a
                                        href={`#${item.id.replace(/-/g, '')} `}
                                        className="block text-slate-600 dark:text-slate-400 hover:text-primary transition-colors line-clamp-1"
                                    >
                                        {item.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            )}

            {/* Related Posts */}
            {relatedPosts && relatedPosts.length > 0 && (
                <div className="glass-card p-5 rounded-2xl">
                    <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                        <span className="material-icons-outlined text-lg">auto_awesome</span>
                        相关推荐
                    </h3>
                    <div className="space-y-4">
                        {relatedPosts.map((post) => (
                            <Link href={`/ posts / ${post.slug} `} key={post.id} className="block group">
                                <h4 className="font-medium text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors line-clamp-2 text-sm leading-snug mb-1">
                                    {post.title}
                                </h4>
                                <time className="text-xs text-slate-400 font-mono">
                                    {dayjs(post.date).format('MMM D, YYYY')}
                                </time>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </aside>
    );
}
