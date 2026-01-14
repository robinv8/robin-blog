import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Friends() {
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

                <main className="space-y-12 min-h-[60vh]">
                    <section className="text-center md:text-left space-y-4">
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-slate-400">友情链接</h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed">
                            海内存知己，天涯若比邻。这里收录了一些优秀的技术博客、设计网站和有趣的朋友们。欢迎更多的朋友互换友链，共同交流。
                        </p>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500 dark:text-blue-400">
                                <span className="material-icons-outlined text-xl block">terminal</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">技术大佬</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            <a href="#" className="glass-card p-4 rounded-xl flex items-start gap-4 group hover:border-primary/50 transition-all">
                                <img alt="Dev" className="w-12 h-12 rounded-full bg-slate-200 object-cover ring-2 ring-white dark:ring-slate-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFQcxVrOZejPrE7QWsVDa6Mt_dN06ehwKB-CNtIJ3LwK0JlKyH1A3faapRxT1Qv8cvK0bAsAEQ1eRUlvxTwR_EgBqVqxaSC3VvfwWe2g5vStHOASMZtCzLXn4AuQjk2rbC9yKOjtg0HklWtFQvvR3JIpXsyctymUvET-uATapT27t4XNdSBdEvGvhFNAUm7MjJsYB809UEQWhe1NXRxJkQPN1S3LKqLEZsxU3cqi1MEoT3u60aOQPTY6iXUNY35xv8lQH64WvcWso" />
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors truncate">Alex's Code</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">专注前端开发与用户体验，分享 React 与 Vue 实战经验。</p>
                                </div>
                            </a>
                            <a href="#" className="glass-card p-4 rounded-xl flex items-start gap-4 group hover:border-primary/50 transition-all">
                                <img alt="Backend" className="w-12 h-12 rounded-full bg-slate-200 object-cover ring-2 ring-white dark:ring-slate-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB829cSxOSFY6XpAl1a4KlaeLwh7mTQrptym-rvCW2-N8f60AQGr3EZ5Rdl79V-3ZIT29REbnftI279jo9ETCTt7qBUZHmjYZTrhHbi0WlZVb2mxdvG--abCFkCWsCxIy27s_lqzEK3I4g3JlL57RrBmsNDGOQrNdGfb7nn3xOuh1W1od5iexm407QeDtOerIL1zJQXmxQdxOKkzH_oNzq-1YMpsVIvCfrchopkh2KOPMCVJsGvgkwGUZmUbTVeM4SVuBFmrxASpAk" />
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors truncate">后端架构笔记</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">深入理解分布式系统，Go 语言进阶之路。</p>
                                </div>
                            </a>
                            <a href="#" className="glass-card p-4 rounded-xl flex items-start gap-4 group hover:border-primary/50 transition-all">
                                <img alt="AI" className="w-12 h-12 rounded-full bg-slate-200 object-cover ring-2 ring-white dark:ring-slate-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUskarrXGlTgiY_eGiJJAzOaSfGDjGyFE6uUesXmKFSix6nFjkAouVkEdltx1lWrz2H90rnmLQKl5OfhRQgAXI1EpGO8wTYy1oVLqKKiTmhRP_E1wpaDZKSu7yvqbSvzmgtnFI3kmB7m-vF_0onocCe_el7HpGci4cNSBJEio-rPbqEiTYKqaw-yYCnP9ZlGDvFk_SKfmswJxAfpPTcKo-OANguY5apsVsIYCCMm77MeHWELskJjJaGqSnUMkNNOrRxA7IySrhFE8" />
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors truncate">AI 探索实验室</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">关注大模型应用落地，探索 AGI 的无限可能。</p>
                                </div>
                            </a>
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-pink-500/10 rounded-lg text-pink-500 dark:text-pink-400">
                                <span className="material-icons-outlined text-xl block">palette</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">设计与生活</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            <a href="#" className="glass-card p-4 rounded-xl flex items-start gap-4 group hover:border-primary/50 transition-all">
                                <img alt="Design" className="w-12 h-12 rounded-full bg-slate-200 object-cover ring-2 ring-white dark:ring-slate-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqJIWJlGUfeyFwm7rDFBRapYFl-tdAFwcrOk5MXA3k8RiNJ092Vdq-jl7AhQ-LzeK6GYnfAxfwAC7sLXH1aa60Q1Pjs69_BlToS0evBCjNvijSbAqmvuTP-HJaQLOkilW9fXzz1fVER4BllHMJ0E-hiz5F6gPnW0GyRjfiWnZ-raPUWEeW5NnIL-4bgpibHJ3m6HspGLelIvhrEA41-Rx5Onruq8GtmlJYBwEE_mJVTBoKei1PMSyz-vAmA4BvMtXQGLpeYcskEok" />
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors truncate">Mono Design</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">极简主义设计美学，探索 UI/UX 的边界。</p>
                                </div>
                            </a>
                            <a href="#" className="glass-card p-4 rounded-xl flex items-start gap-4 group hover:border-primary/50 transition-all">
                                <img alt="Photo" className="w-12 h-12 rounded-full bg-slate-200 object-cover ring-2 ring-white dark:ring-slate-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAk1Mrpy9VFTkjnUheNrLLjF8ZvxwuYRM6ZggnKPl-_ka9sYrLXa5dUa1BtSxyMSG3FMi9aTuxXKfGzIWiZaoU54ZVk-vLH3tBPAOZ6QaKtM17RnEQVrhTKgYgNcepV_v12YlH-TD8Mg0wIvZ2B3_AWG90pukHB0sPCqbTRpkkRhrlE-IUgQV8nI2-YB2HKuQBACo5XMA8ZtrPCaMAEXcG717tWykj0fto3tvdumgzzWNam1IYvuH9BltWiVE6yJJIZky3LM0w-DJg" />
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors truncate">光影日记</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">用镜头记录生活中的微小感动，胶片摄影爱好者。</p>
                                </div>
                            </a>
                            <a href="#" className="glass-card p-4 rounded-xl flex items-start gap-4 group hover:border-primary/50 transition-all">
                                <img alt="Reading" className="w-12 h-12 rounded-full bg-slate-200 object-cover ring-2 ring-white dark:ring-slate-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUOOP0TAJNLIdpakocaMrxjjqg_VQo_x6ScZuKkYqrw3sBektWneYVlh3Zn5Y7FLzuva3D_dBg0L1lSSOWMLH8b4d5vsP5Sla6_gpdxFljevIWGWtxdHRxR8yeSoqGCI0XtTvIzcqHxE1TxHybHAYHu8Tru8CcNC0jYQ3w28sVZ8p8X2z_BMla4TtrL_jXl158yCs6pB3MhXPui-kqPIhX5x66pnFwvlzRjPG6mfWomPEVvK8x6DD1GOiWX4Lw8Xskq6wHcHV7ujg" />
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors truncate">深夜书房</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">阅读、思考与写作，在喧嚣中寻找一片宁静。</p>
                                </div>
                            </a>
                            <a href="#" className="glass-card p-4 rounded-xl flex items-start gap-4 group hover:border-primary/50 transition-all">
                                <img alt="Coffee" className="w-12 h-12 rounded-full bg-slate-200 object-cover ring-2 ring-white dark:ring-slate-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKl19p8352yWxBKRCD5ACAcOvfy5IRUV3eRalF9k5-sAkk7-nc-m-WVzPYKyXMymYHvhLrInmelCnFG2Vsk3EQy8h3q1ru37Yw6rV4DIsFH5wooQ6xd6llc0YxSArQ4e53VF9qcOpmuFoCcBAeBtgwhqggGpSdRGZPVnfM-DDhEtjqPnJw3lEspDlc4VY13wtf0lJEqKlYgDIOaPfgSinkeo6xqeOselSLeqsIoa0AoKnZbaLb9fauCKGkHLuoIdvlK2mBDxkeY8U" />
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors truncate">半杯咖啡</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">咖啡豆测评分项，寻找城市里最好的独立咖啡馆。</p>
                                </div>
                            </a>
                        </div>
                    </section>

                    <section className="glass-card p-8 rounded-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="relative z-10 max-w-lg">
                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">申请友链</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                如果你拥有自己的个人博客，且内容健康、保持更新，欢迎与我交换友链。
                            </p>
                            <div className="bg-white/50 dark:bg-black/20 p-4 rounded-lg text-xs font-mono text-slate-600 dark:text-slate-400 border border-white/20 dark:border-white/5">
                                <p>name: "Site Name",</p>
                                <p>desc: "A short description...",</p>
                                <p>url: "https://your-site.com",</p>
                                <p>avatar: "https://your-site.com/logo.png"</p>
                            </div>
                        </div>
                        <div className="relative z-10 shrink-0">
                            <a href="mailto:contact@example.com" className="flex items-center gap-2 px-6 py-3 bg-primary text-slate-900 rounded-full font-bold hover:bg-yellow-400 transition-all shadow-lg shadow-primary/20 transform hover:-translate-y-0.5">
                                <span className="material-icons-outlined">send</span>
                                发送邮件
                            </a>
                        </div>
                        <div className="absolute right-0 top-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                    </section>
                </main>

                <Footer />
            </div>
        </div>
    );
}
