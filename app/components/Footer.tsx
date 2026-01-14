"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 pt-8 pb-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex gap-6 text-sm text-slate-600 dark:text-slate-400">
                    <Link href="/about" className="hover:text-primary flex items-center gap-1 transition-colors">
                        <span className="material-icons-outlined text-base">person</span> 关于
                    </Link>
                    <Link href="/friends" className="hover:text-primary flex items-center gap-1 transition-colors">
                        <span className="material-icons-outlined text-base">group</span> 友链
                    </Link>
                    <Link href="/books" className="hover:text-primary flex items-center gap-1 transition-colors">
                        <span className="material-icons-outlined text-base">book</span> 书架
                    </Link>
                    <Link href="#" className="hover:text-primary flex items-center gap-1 transition-colors">
                        <span className="material-icons-outlined text-base">mail</span> 私信
                    </Link>
                </div>
                <div className="flex gap-4">
                    <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-icons-outlined text-lg">telegram</span></a>
                    <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-icons-outlined text-lg">alternate_email</span></a>
                    <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-icons-outlined text-lg">code</span></a>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center mt-8 text-xs text-slate-400 gap-2">
                <p>© 2018 - 2025 | robin</p>
                <p>本站原创内容基于 <a className="underline hover:text-primary" href="#">CC BY-SA 4.0</a> 共享，转载注明出处。</p>
            </div>
        </footer>
    );
}
