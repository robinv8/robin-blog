import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Projects() {
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

                <section className="mb-12">
                    <div className="text-center md:text-left mb-10">
                        <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-slate-400">创意工坊</h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
                            这里展示了我的一些个人项目和实验性作品。从实用的开发工具到有趣的创意编程，每一个项目都是一次探索和学习的过程。
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <article className="glass-card rounded-2xl group cursor-pointer relative overflow-hidden flex flex-col h-full">
                            <div className="h-48 overflow-hidden relative bg-slate-200 dark:bg-slate-800">
                                <img alt="AI Code Companion" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVfbo3AYpAp4xBbFKDTi9R7nS5WeC10mmB8i2k9HC4HnBoeMYy_zKsgeaHME9EUR-lFtM9VVR7tYaA9DUwle1fsBrLUeD_EYFFqqDgXwQnSj1vgfPsKpoKolZkw8ghmAeIswOS6pGVRBrsqh3VrGqYl7nvxaG__1StZEKkQRj9k8p7A3o17a-ei1vUipaaTJ5qb4H_ePMm6q19GbByFuhegZhSvZAKlBniyitLoeDON6tRrttsOdl2OjXyX0hnjx85aja9CUHHFyI" />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                                <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                                    Open Source
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-icons-outlined text-primary text-xl">smart_toy</span>
                                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors">AI Code Companion</h3>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-grow line-clamp-3">
                                    一个基于 LLM 的本地代码辅助工具，旨在帮助开发者快速理解复杂代码库，提供智能重构建议，并支持自定义上下文。
                                </p>
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                                    <div className="flex gap-2">
                                        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded-md">Python</span>
                                        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded-md">React</span>
                                    </div>
                                    <span className="material-icons-outlined text-slate-400 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </div>
                            </div>
                        </article>

                        <article className="glass-card rounded-2xl group cursor-pointer relative overflow-hidden flex flex-col h-full">
                            <div className="h-48 overflow-hidden relative bg-slate-200 dark:bg-slate-800">
                                <img alt="Personal Finance App" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhZwkURWHTdNnYB6W7NEqwhhEQVZeR35THVQxPoP1giRHFXshvf-UpmVpzmPfvq75IDHyvrrZPYEPbFxmyvZ8rcy8yk1y1plcWVVWC-lGjwbt-HglXU05tzN_VShZt_O7r3RiXnPLMND9viNkitkr6IIm1lg5GLnlMvtAjYZTRLbppf0_baiIAyO52Yz1cahy6RD_XoLCahkoUfZyBEjBUDCS6mE5aUHO86XUXLX0swnsx4dPRHbqaqLJLF6H2_K5f8WBZlNkPnmI" />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                                <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-purple-600 shadow-sm">
                                    Beta
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-icons-outlined text-purple-500 text-xl">account_balance_wallet</span>
                                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors">PennyWise</h3>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-grow line-clamp-3">
                                    极简主义的个人记账应用，专注于快速记录和直观的数据可视化。支持多币种，自动同步银行交易（实验性功能）。
                                </p>
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                                    <div className="flex gap-2">
                                        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded-md">Flutter</span>
                                        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded-md">Firebase</span>
                                    </div>
                                    <span className="material-icons-outlined text-slate-400 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </div>
                            </div>
                        </article>

                        <article className="glass-card rounded-2xl group cursor-pointer relative overflow-hidden flex flex-col h-full">
                            <div className="h-48 overflow-hidden relative bg-slate-200 dark:bg-slate-800">
                                <img alt="Home NAS Dashboard" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsTGjHml95zNIa_H2FUWo2vGABMuIVvfeyELWXVtTjmpfmd7MA41esdUOD1Xggt5Lzi7Ua11FmPZtdf3RCZ_GJjHGxJfHaNWWUOMuEHv3CW2IbrgXP676-ct201L_T7ovPbUcKk7dXkx05SNGqTtUd-kmS8MpLKt9j64GJN3V70MtrKs9U0T8gkUCSmT7lkmTqQUGsVwMPHY8b11NxbsNrUA9g6GenK0E_B6Pk8T835IHtHAaJyG5yK2gHYnTtDUYpMcoo2WfLCNA" />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                                <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-green-600 shadow-sm">
                                    Live
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-icons-outlined text-green-500 text-xl">dns</span>
                                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors">MyNAS Dashboard</h3>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-grow line-clamp-3">
                                    为自建 NAS 设计的轻量级监控面板。实时显示 CPU、内存、磁盘温度和 Docker 容器状态，界面美观且资源占用极低。
                                </p>
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                                    <div className="flex gap-2">
                                        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded-md">Vue 3</span>
                                        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded-md">Go</span>
                                    </div>
                                    <span className="material-icons-outlined text-slate-400 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </div>
                            </div>
                        </article>

                        <article className="glass-card rounded-2xl group cursor-pointer relative overflow-hidden flex flex-col h-full">
                            <div className="h-48 overflow-hidden relative bg-slate-200 dark:bg-slate-800">
                                <img alt="Photography Portfolio" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlqSLuwevZKa921c6LooM60hZIfQIDGIGkgsAz0AaPE6Yu9P2N9PvrG0L39tDIminV-mwFPAd_Kyy_NqjuhjMwUHmsXvVLQfLNvyGl9WuC7p752A753NgR22reHm-JFAXddY-FAqYwYQ6_Z-f09ywqHsIVdGt1JajBeie6kfhSsquWkJj76uiPNRZKYemwHnvIGdO_PCAzfmCzToX3pfBk25qGral4kOvUM4bz_W9BUTTg6fUtdecbJQ6xR6oK0RzPFXEiKwk0mlg" />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-icons-outlined text-pink-500 text-xl">camera</span>
                                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors">Lens & Light</h3>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-grow line-clamp-3">
                                    一个沉浸式的摄影作品集网站模板。专注于大图展示和流畅的转场动画，适配各种移动设备，旨在还原照片最真实的质感。
                                </p>
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                                    <div className="flex gap-2">
                                        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded-md">Next.js</span>
                                        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded-md">Framer</span>
                                    </div>
                                    <span className="material-icons-outlined text-slate-400 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </div>
                            </div>
                        </article>

                        <article className="glass-card rounded-2xl group cursor-pointer relative overflow-hidden flex flex-col h-full">
                            <div className="h-48 overflow-hidden relative bg-slate-200 dark:bg-slate-800">
                                <img alt="Focus Timer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3NI6kAAk2NYiSSUsasD8ALkXQ1bQK083x95q2QFKYbuM7dtKO4DckP9w0CIXoKZzEjhnQbhPBGcd3TKziJoOBarpBX3l5yUXkDeIKpaX7HZ_WAa6Odb1Gg7P73pN3OP--cPN-bT8MUQLoAc7JJ9y34R4bZ480PuEP4tdE49pEN3-TC5MRP_92NBynnS8yhn04DMgr0ThAnnl4PY08HkBR2bkDmsRiurweGyT6aZbewTOnNj4gEdPGuYOQJLOpNZnxKX9JWu0VGyk" />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-icons-outlined text-indigo-500 text-xl">timer</span>
                                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors">FlowState</h3>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-grow line-clamp-3">
                                    结合了番茄工作法和白噪音的专注力应用。内置多种自然音效，帮助用户在嘈杂的环境中快速进入心流状态。
                                </p>
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                                    <div className="flex gap-2">
                                        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded-md">Electron</span>
                                        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded-md">Web Audio</span>
                                    </div>
                                    <span className="material-icons-outlined text-slate-400 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </div>
                            </div>
                        </article>

                        <article className="glass-card rounded-2xl group cursor-pointer relative overflow-hidden flex flex-col h-full border-dashed border-2 !border-slate-300 dark:!border-slate-700 !bg-transparent hover:!bg-white/10 dark:hover:!bg-slate-800/10 transition-colors">
                            <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center p-6">
                                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 text-slate-400 group-hover:text-primary transition-colors">
                                    <span className="material-icons-outlined text-3xl">add</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-600 dark:text-slate-300 mb-2">即将到来</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-500">
                                    正在孵化新的想法...<br />敬请期待更多有趣的项目
                                </p>
                            </div>
                        </article>
                    </div>
                </section>

                <Footer />
            </div>
        </div>
    );
}
