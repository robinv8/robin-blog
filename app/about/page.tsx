import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
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

                <main className="space-y-8">
                    <section className="glass-card p-8 md:p-10 rounded-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                            <span className="material-icons-outlined text-9xl text-slate-900 dark:text-white transform rotate-12">fingerprint</span>
                        </div>
                        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start relative z-10">
                            <div className="flex-shrink-0 group relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl blur-md opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                                <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-2xl overflow-hidden border-4 border-white/60 dark:border-white/10 shadow-xl">
                                    <img alt="Robin Large Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQpjZqhf_Ltlapc9yYFHB5cpNBVBsb7tCd7ood7lXMbiJvNFnVgW34EVixnw2OkuFNiwF6Mr2bLwWeBfQ9Nwuoq5w9VRy6bqo_Qt9RQk2lcPE2dLU9gxeUruyT3z4WYSHqDEw8auF2ldUGm28h4-WruTCOt4hRtuYSCLpnqMvSkmjuQXZUbDBMAzOa313TVtVzoiYxJEYdnnaXdiqYX90GcEZ56YjdXU1qWF4hWj1Lx70Kjh4ZE7Y18bE7MlFiwO-8e2h1lZjI8sI" />
                                </div>
                            </div>
                            <div className="flex-1 text-center md:text-left space-y-5">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                        Available for interesting projects
                                    </div>
                                    <h1 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                                        你好，我是 Robin 👋
                                    </h1>
                                    <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium">
                                        开发者 / 摄影爱好者 / 终身学习者
                                    </p>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto md:mx-0">
                                    我是一名热衷于探索数字世界的全栈开发者。这个博客是我在互联网上的自留地，用于记录技术成长的点滴、分享生活中的美好瞬间，以及那些稍纵即逝的思考。我相信代码构建世界，而文字连接灵魂。
                                </p>
                                <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
                                    <a className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 dark:bg-white text-white dark:text-slate-900 rounded-xl hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors shadow-lg shadow-slate-200/50 dark:shadow-none" href="#">
                                        <span className="material-icons-outlined text-sm">mail</span>
                                        <span className="text-sm font-medium">发送邮件</span>
                                    </a>
                                    <a className="flex items-center gap-2 px-5 py-2.5 glass border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 rounded-xl hover:bg-white/80 dark:hover:bg-white/10 transition-colors" href="#">
                                        <span className="material-icons-outlined text-sm">rss_feed</span>
                                        <span className="text-sm font-medium">RSS 订阅</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        <div className="md:col-span-8 space-y-8">
                            <section className="glass-card p-8 rounded-3xl">
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-800 dark:text-white">
                                    <span className="material-icons-outlined text-primary">auto_stories</span> 我的成长之旅
                                </h2>
                                <div className="prose prose-slate dark:prose-invert max-w-none prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-7 prose-a:text-primary hover:prose-a:underline">
                                    <p>
                                        故事开始于 2018 年，那一年我第一次在终端里打印出了 "Hello World"。那种能够通过几行字符指挥计算机的感觉让我深深着迷。从最初的 HTML/CSS 静态页面，到后来接触 React、Node.js，再到如今探索 AI 辅助开发的无限可能，技术的每一个台阶都让我看到了更广阔的风景。
                                    </p>
                                    <p>
                                        <strong>为什么写博客？</strong> 在碎片化信息泛滥的今天，我仍然坚持长文写作。我认为博客不仅是知识的沉淀，更是对抗遗忘的方式。在这里，我不需要迎合算法，只需要真诚地面对自己和读者。
                                    </p>
                                    <p>
                                        除了编程，我还热衷于<strong>摄影</strong>和<strong>咖啡</strong>。周末我通常会带着相机穿梭在城市的街巷，或者在家里手冲一杯耶加雪菲。我认为技术追求的是理性的极致，而生活需要感性的温度来平衡。
                                    </p>
                                    <div className="not-prose mt-6 p-4 bg-primary/5 rounded-2xl border border-primary/10 flex gap-4">
                                        <span className="material-icons-outlined text-primary text-2xl">format_quote</span>
                                        <div>
                                            <p className="text-slate-700 dark:text-slate-300 italic font-medium">"Stay hungry, stay foolish."</p>
                                            <p className="text-xs text-slate-400 mt-1">— Steve Jobs</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <aside className="md:col-span-4 space-y-6">
                            <div className="glass-card p-6 rounded-3xl">
                                <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-white flex items-center gap-2">
                                    <span className="material-icons-outlined text-slate-400">code</span> 技术栈
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full text-xs font-medium border border-blue-100 dark:border-blue-800">React</span>
                                    <span className="px-3 py-1 bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-300 rounded-full text-xs font-medium border border-sky-100 dark:border-sky-800">Tailwind CSS</span>
                                    <span className="px-3 py-1 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-300 rounded-full text-xs font-medium border border-yellow-100 dark:border-yellow-800">JavaScript</span>
                                    <span className="px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-300 rounded-full text-xs font-medium border border-green-100 dark:border-green-800">Node.js</span>
                                    <span className="px-3 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-full text-xs font-medium border border-purple-100 dark:border-purple-800">Next.js</span>
                                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 rounded-full text-xs font-medium border border-slate-200 dark:border-slate-600">Git</span>
                                    <span className="px-3 py-1 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300 rounded-full text-xs font-medium border border-orange-100 dark:border-orange-800">Figma</span>
                                </div>
                            </div>
                            <div className="glass-card p-6 rounded-3xl">
                                <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-white flex items-center gap-2">
                                    <span className="material-icons-outlined text-slate-400">favorite</span> 兴趣爱好
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-3 bg-white/40 dark:bg-white/5 rounded-xl flex items-center gap-3">
                                        <span className="material-icons-outlined text-amber-500">coffee</span>
                                        <span className="text-sm text-slate-600 dark:text-slate-300">咖啡</span>
                                    </div>
                                    <div className="p-3 bg-white/40 dark:bg-white/5 rounded-xl flex items-center gap-3">
                                        <span className="material-icons-outlined text-rose-500">camera_alt</span>
                                        <span className="text-sm text-slate-600 dark:text-slate-300">摄影</span>
                                    </div>
                                    <div className="p-3 bg-white/40 dark:bg-white/5 rounded-xl flex items-center gap-3">
                                        <span className="material-icons-outlined text-emerald-500">hiking</span>
                                        <span className="text-sm text-slate-600 dark:text-slate-300">徒步</span>
                                    </div>
                                    <div className="p-3 bg-white/40 dark:bg-white/5 rounded-xl flex items-center gap-3">
                                        <span className="material-icons-outlined text-indigo-500">menu_book</span>
                                        <span className="text-sm text-slate-600 dark:text-slate-300">阅读</span>
                                    </div>
                                </div>
                            </div>
                            <div className="glass-card p-6 rounded-3xl">
                                <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-white flex items-center gap-2">
                                    <span className="material-icons-outlined text-slate-400">share</span> 社交媒体
                                </h3>
                                <div className="flex flex-col gap-3">
                                    <a className="flex items-center justify-between p-3 rounded-xl hover:bg-white/50 dark:hover:bg-white/10 transition-colors group" href="#">
                                        <div className="flex items-center gap-3">
                                            <span className="material-icons-outlined text-slate-400 group-hover:text-[#1DA1F2]">flutter_dash</span>
                                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Twitter / X</span>
                                        </div>
                                        <span className="material-icons-outlined text-slate-300 text-sm">arrow_outward</span>
                                    </a>
                                    <a className="flex items-center justify-between p-3 rounded-xl hover:bg-white/50 dark:hover:bg-white/10 transition-colors group" href="#">
                                        <div className="flex items-center gap-3">
                                            <span className="material-icons-outlined text-slate-400 group-hover:text-black dark:group-hover:text-white">code</span>
                                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">GitHub</span>
                                        </div>
                                        <span className="material-icons-outlined text-slate-300 text-sm">arrow_outward</span>
                                    </a>
                                    <a className="flex items-center justify-between p-3 rounded-xl hover:bg-white/50 dark:hover:bg-white/10 transition-colors group" href="#">
                                        <div className="flex items-center gap-3">
                                            <span className="material-icons-outlined text-slate-400 group-hover:text-blue-600">send</span>
                                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Telegram</span>
                                        </div>
                                        <span className="material-icons-outlined text-slate-300 text-sm">arrow_outward</span>
                                    </a>
                                </div>
                            </div>
                        </aside>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
