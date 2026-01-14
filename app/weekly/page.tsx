import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Weekly() {
    return (
        <div className="font-sans antialiased text-slate-800 dark:text-slate-200 min-h-screen relative selection:bg-primary selection:text-white transition-colors duration-300">
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="light-mesh dark:hidden w-full h-full absolute inset-0"></div>
                <div className="hidden dark:block w-full h-full absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black"></div>
                <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-60 dark:opacity-20 animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-3xl opacity-60 dark:opacity-10"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Header />

                <section className="mb-16 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-black text-white dark:bg-white dark:text-black p-1.5 rounded-lg">
                                <svg aria-hidden="true" className="h-5 w-5 fill-current" viewBox="0 0 24 24"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
                            </span>
                            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-slate-400">
                                X 见闻录 / Curations
                            </h2>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-xl leading-relaxed">
                            信息洪流中的淘金者。这里汇集了我在 X (Twitter) 上发现的高质量讨论、技术洞察和有趣观点。每周更新，帮你过滤噪音，直达精华。
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a className="group glass-card px-5 py-3 rounded-xl flex items-center gap-3 hover:border-black/30 dark:hover:border-white/30" href="#">
                                <div className="p-2 bg-slate-900/5 dark:bg-white/10 rounded-lg text-slate-800 dark:text-white group-hover:scale-110 transition-transform">
                                    <span className="material-icons-outlined text-xl">alternate_email</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Follow me</span>
                                    <span className="text-sm font-medium text-slate-800 dark:text-white">@robin_builds</span>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="relative group cursor-pointer hidden md:block">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/80 dark:border-white/10 shadow-xl">
                            <img alt="Robin Avatar" className="w-full h-full object-cover bg-[#E0F2FE]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQpjZqhf_Ltlapc9yYFHB5cpNBVBsb7tCd7ood7lXMbiJvNFnVgW34EVixnw2OkuFNiwF6Mr2bLwWeBfQ9Nwuoq5w9VRy6bqo_Qt9RQk2lcPE2dLU9gxeUruyT3z4WYSHqDEw8auF2ldUGm28h4-WruTCOt4hRtuYSCLpnqMvSkmjuQXZUbDBMAzOa313TVtVzoiYxJEYdnnaXdiqYX90GcEZ56YjdXU1qWF4hWj1Lx70Kjh4ZE7Y18bE7MlFiwO-8e2h1lZjI8sI" />
                        </div>
                    </div>
                </section>

                <main className="space-y-8">
                    <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
                        <span className="absolute left-[-5px] top-0 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                        </span>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
                            本周精选 <span className="text-xs font-normal text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">Week 04, 2026</span>
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <article className="glass-card p-0 rounded-2xl group cursor-pointer relative overflow-hidden flex flex-col h-full hover:ring-2 hover:ring-slate-200 dark:hover:ring-slate-700 transition-all">
                                <div className="p-6 pb-4 flex-grow">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-500">DL</div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">Dan Lowren</span>
                                                <span className="text-[10px] text-slate-500">@dan_lowren</span>
                                            </div>
                                        </div>
                                        <span className="material-icons-outlined text-sky-500 text-lg">verified</span>
                                    </div>
                                    <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                                        "The best engineers I know are actually great writers. Code is communication. If you can't explain your system design in a one-pager, you probably don't understand it well enough to code it."
                                        <br /><br />
                                        A thread on why writing is the highest leverage skill for senior devs. 🧵👇
                                    </p>
                                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 text-xs text-slate-500 italic border border-slate-100 dark:border-slate-700/50 mb-2">
                                        💡 Robin's Take: 这条推文再次印证了写作的重要性。最近在写设计文档时也深有体会，清晰的文档往往意味着清晰的思路。
                                    </div>
                                </div>
                                <div className="px-6 py-3 border-t border-slate-100 dark:border-slate-700/50 flex justify-between items-center bg-white/30 dark:bg-slate-800/30 mt-auto">
                                    <span className="text-xs text-slate-400 flex items-center gap-1">
                                        <span className="material-icons-outlined text-[14px]">favorite</span> 1.2k likes
                                    </span>
                                    <a className="text-xs font-medium text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1" href="#">
                                        View Original <span className="material-icons-outlined text-[14px]">open_in_new</span>
                                    </a>
                                </div>
                            </article>

                            <article className="glass-card p-0 rounded-2xl group cursor-pointer relative overflow-hidden flex flex-col h-full hover:ring-2 hover:ring-slate-200 dark:hover:ring-slate-700 transition-all">
                                <div className="p-6 pb-4 flex-grow">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-xs font-bold text-purple-600 dark:text-purple-300">JS</div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">Jane Smith</span>
                                                <span className="text-[10px] text-slate-500">@js_smith</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                                        Just discovered this neat CSS trick for creating performant, scroll-driven animations without any JavaScript! ✨
                                        <br /><br />
                                        `animation-timeline: scroll()` is a game changer for landing pages.
                                    </p>
                                    <div className="rounded-lg overflow-hidden mb-3 border border-slate-200 dark:border-slate-700">
                                        <div className="h-32 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                                            <span className="material-icons-outlined mr-2">image</span> Image Preview
                                        </div>
                                    </div>
                                </div>
                                <div className="px-6 py-3 border-t border-slate-100 dark:border-slate-700/50 flex justify-between items-center bg-white/30 dark:bg-slate-800/30 mt-auto">
                                    <span className="text-xs text-slate-400 flex items-center gap-1">
                                        <span className="material-icons-outlined text-[14px]">cached</span> 450 reposts
                                    </span>
                                    <a className="text-xs font-medium text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1" href="#">
                                        View Original <span className="material-icons-outlined text-[14px]">open_in_new</span>
                                    </a>
                                </div>
                            </article>

                            <article className="glass-card p-0 rounded-2xl group cursor-pointer relative overflow-hidden flex flex-col h-full hover:ring-2 hover:ring-slate-200 dark:hover:ring-slate-700 transition-all">
                                <div className="p-6 pb-4 flex-grow">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center text-xs font-bold text-orange-600 dark:text-orange-300">YC</div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">Y Combinator</span>
                                                <span className="text-[10px] text-slate-500">@ycombinator</span>
                                            </div>
                                        </div>
                                        <span className="material-icons-outlined text-sky-500 text-lg">verified</span>
                                    </div>
                                    <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                                        Request for Startups: Tools that help people learn faster. The education system hasn't changed in 100 years, but the way we access information has.
                                    </p>
                                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 text-xs text-slate-500 italic border border-slate-100 dark:border-slate-700/50 mb-2">
                                        💡 Robin's Take: 这是一个巨大的市场机会。结合 AI 的个性化学习路径可能是下一个风口。
                                    </div>
                                </div>
                                <div className="px-6 py-3 border-t border-slate-100 dark:border-slate-700/50 flex justify-between items-center bg-white/30 dark:bg-slate-800/30 mt-auto">
                                    <span className="text-xs text-slate-400 flex items-center gap-1">
                                        <span className="material-icons-outlined text-[14px]">favorite</span> 3.4k likes
                                    </span>
                                    <a className="text-xs font-medium text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1" href="#">
                                        View Original <span className="material-icons-outlined text-[14px]">open_in_new</span>
                                    </a>
                                </div>
                            </article>

                            <article className="glass-card p-0 rounded-2xl group cursor-pointer relative overflow-hidden flex flex-col h-full hover:ring-2 hover:ring-slate-200 dark:hover:ring-slate-700 transition-all">
                                <div className="p-6 pb-4 flex-grow">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-300">AI</div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">AI Daily</span>
                                                <span className="text-[10px] text-slate-500">@aidaily</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                                        New model release from Anthropic: Claude 3.5 Sonnet. It outperforms GPT-4o in coding benchmarks and has a 200k context window. The speed is incredible. 🚀
                                    </p>
                                </div>
                                <div className="px-6 py-3 border-t border-slate-100 dark:border-slate-700/50 flex justify-between items-center bg-white/30 dark:bg-slate-800/30 mt-auto">
                                    <span className="text-xs text-slate-400 flex items-center gap-1">
                                        <span className="material-icons-outlined text-[14px]">equalizer</span> 120k views
                                    </span>
                                    <a className="text-xs font-medium text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1" href="#">
                                        View Original <span className="material-icons-outlined text-[14px]">open_in_new</span>
                                    </a>
                                </div>
                            </article>
                        </div>
                    </div>

                    <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800 opacity-70">
                        <span className="absolute left-[-5px] top-0 flex h-3 w-3">
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-300 dark:bg-slate-600"></span>
                        </span>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
                            往期存档 <span className="text-xs font-normal text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">Week 03, 2026</span>
                        </h3>
                        <div className="space-y-4">
                            <a className="glass-card p-4 rounded-xl flex flex-col md:flex-row gap-4 items-start md:items-center justify-between group hover:border-sky-200 dark:hover:border-sky-900 transition-all" href="#">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                                        <span className="font-semibold text-slate-900 dark:text-white">@naval</span>
                                        <span>•</span>
                                        <span>Naval Ravikant</span>
                                    </div>
                                    <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2">
                                        "Wealth is assets that earn while you sleep. Money is how we transfer time and wealth." - A classic thread on wealth creation.
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 text-xs whitespace-nowrap text-slate-400 flex-shrink-0">
                                    <span className="hidden md:inline">Jan 15, 2026</span>
                                    <span className="text-sky-600 dark:text-sky-400 group-hover:underline flex items-center">Open <span className="material-icons-outlined text-sm ml-0.5">arrow_forward</span></span>
                                </div>
                            </a>

                            <a className="glass-card p-4 rounded-xl flex flex-col md:flex-row gap-4 items-start md:items-center justify-between group hover:border-sky-200 dark:hover:border-sky-900 transition-all" href="#">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                                        <span className="font-semibold text-slate-900 dark:text-white">@rauchg</span>
                                        <span>•</span>
                                        <span>Guillermo Rauch</span>
                                    </div>
                                    <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2">
                                        Next.js 15 introduces partial prerendering. This is a massive step forward for combining static and dynamic content.
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 text-xs whitespace-nowrap text-slate-400 flex-shrink-0">
                                    <span className="hidden md:inline">Jan 12, 2026</span>
                                    <span className="text-sky-600 dark:text-sky-400 group-hover:underline flex items-center">Open <span className="material-icons-outlined text-sm ml-0.5">arrow_forward</span></span>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="flex justify-between pt-8">
                        <button className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-400 cursor-not-allowed opacity-50" disabled>
                            <span className="material-icons-outlined text-sm transform rotate-180">arrow_forward_ios</span>
                            <span className="text-sm font-medium">Newer</span>
                        </button>
                        <a className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-primary text-slate-600 dark:text-slate-300 hover:text-primary transition-all shadow-sm" href="#">
                            <span className="text-sm font-medium">Older</span>
                            <span className="material-icons-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward_ios</span>
                        </a>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
