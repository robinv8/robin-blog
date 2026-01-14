"use client";

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export default function Header() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/50 dark:ring-white/10 shadow-sm">
                    <img alt="Avatar" className="w-full h-full object-cover bg-slate-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-3g1EhDHkHHxg5uqtvwsBV3PmqA384USWeo6jxTSUodH06Fc7VXIAQvmdbIO-IqUZ9FnWpKbNNI9n80uP_tNuNQTctUp3fWj9M0RshYLuHNJH6_JEBUZi49lhiKHs7oaLnIz-QT7tsl6Z9YxcutbWMikVyftZ2PmcvIq04_yCfLdwBZ-FkDaayYS0H2Jw_20R8u2aMdsQh_dcLyHQYB89SRDFOBWomrAMn_KTCa6wluCQKPK8og7QfKJC_znNNnx8Fx_YPX_EuxU" />
                    <img alt="Avatar" className="w-full h-full object-cover bg-slate-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-3g1EhDHkHHxg5uqtvwsBV3PmqA384USWeo6jxTSUodH06Fc7VXIAQvmdbIO-IqUZ9FnWpKbNNI9n80uP_tNuNQTctUp3fWj9M0RshYLuHNJH6_JEBUZi49lhiKHs7oaLnIz-QT7tsl6Z9YxcutbWMikVyftZ2PmcvIq04_yCfLdwBZ-FkDaayYS0H2Jw_20R8u2aMdsQh_dcLyHQYB89SRDFOBWomrAMn_KTCa6wluCQKPK8og7QfKJC_znNNnx5Fx_YPX_EuxU" />
                </div>
                <h1 className="text-sm font-medium tracking-wide text-slate-700 dark:text-slate-300">
                    robin 的博客 <span className="mx-2 text-slate-400">|</span> <span className="text-slate-500 dark:text-slate-400">记录生活，记录成长</span>
                </h1>
            </div>
            <nav className="glass rounded-full px-1 py-1 flex items-center shadow-sm">
                <Link href="/" className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 bg-white/50 dark:bg-white/10 rounded-full shadow-sm hover:text-primary transition-colors flex items-center gap-2">
                    <span className="material-icons-outlined text-base">home</span> 首页
                </Link>
                <Link href="/weekly" className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-white/30 dark:hover:bg-white/5 rounded-full hover:text-primary transition-all flex items-center gap-2">
                    <span className="material-icons-outlined text-base">article</span> 周刊
                </Link>
                <Link href="/photography" className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-white/30 dark:hover:bg-white/5 rounded-full hover:text-primary transition-all flex items-center gap-2">
                    <span className="material-icons-outlined text-base">photo_camera</span> 摄影
                </Link>
                <Link href="/projects" className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-white/30 dark:hover:bg-white/5 rounded-full hover:text-primary transition-all flex items-center gap-2">
                    <span className="material-icons-outlined text-base">auto_awesome</span> 项目
                </Link>
                <Link href="/about" className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 bg-white/50 dark:bg-white/10 rounded-full shadow-sm hover:text-primary transition-colors flex items-center gap-2">
                    <span className="material-icons-outlined text-base">person</span> 关于
                </Link>
                <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1"></div>
                <button className="p-2 text-slate-500 hover:text-primary rounded-full hover:bg-white/30 dark:hover:bg-white/5 transition-all">
                    <span className="material-icons-outlined text-base">search</span>
                </button>
                <button className="p-2 text-slate-500 hover:text-primary rounded-full hover:bg-white/30 dark:hover:bg-white/5 transition-all" onClick={toggleTheme}>
                    {mounted && (
                        <>
                            {theme === 'dark' ? (
                                <span className="material-icons-outlined text-base">light_mode</span>
                            ) : (
                                <span className="material-icons-outlined text-base">dark_mode</span>
                            )}
                        </>
                    )}
                    {!mounted && <span className="material-icons-outlined text-base">dark_mode</span>}
                </button>
            </nav>
        </header>
    );
}
