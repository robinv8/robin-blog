import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Books() {
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

                <section className="mb-12 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-slate-400">我的精神角落</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-lg leading-relaxed">
                            阅读是成本最低的旅行。在这里记录我读过的书、正在读的书，以及一些个人的微小感悟。
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="glass-card px-5 py-3 rounded-xl flex items-center gap-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                                    <span className="material-icons-outlined text-xl">auto_stories</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">2025 阅读量</span>
                                    <span className="text-sm font-bold text-slate-800 dark:text-white">12 本书</span>
                                </div>
                            </div>
                            <div className="glass-card px-5 py-3 rounded-xl flex items-center gap-3">
                                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                                    <span className="material-icons-outlined text-xl">menu_book</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">正在阅读</span>
                                    <span className="text-sm font-bold text-slate-800 dark:text-white">置身事内</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative group cursor-pointer hidden md:block">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-orange-400 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/80 dark:border-white/10 shadow-xl">
                            <img alt="Robin Avatar" className="w-full h-full object-cover bg-[#E0F2FE]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQpjZqhf_Ltlapc9yYFHB5cpNBVBsb7tCd7ood7lXMbiJvNFnVgW34EVixnw2OkuFNiwF6Mr2bLwWeBfQ9Nwuoq5w9VRy6bqo_Qt9RQk2lcPE2dLU9gxeUruyT3z4WYSHqDEw8auF2ldUGm28h4-WruTCOt4hRtuYSCLpnqMvSkmjuQXZUbDBMAzOa313TVtVzoiYxJEYdnnaXdiqYX90GcEZ56YjdXU1qWF4hWj1Lx70Kjh4ZE7Y18bE7MlFiwO-8e2h1lZjI8sI" />
                        </div>
                    </div>
                </section>

                <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                    <button className="px-4 py-1.5 rounded-full bg-slate-800 text-white text-xs font-medium shadow-md">全部</button>
                    <button className="px-4 py-1.5 rounded-full bg-white/50 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-white/10 text-xs font-medium transition-colors">技术</button>
                    <button className="px-4 py-1.5 rounded-full bg-white/50 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-white/10 text-xs font-medium transition-colors">文学</button>
                    <button className="px-4 py-1.5 rounded-full bg-white/50 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-white/10 text-xs font-medium transition-colors">商业</button>
                    <button className="px-4 py-1.5 rounded-full bg-white/50 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-white/10 text-xs font-medium transition-colors">设计</button>
                </div>

                <main>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        <a href="#" className="group">
                            <div className="glass-card p-0 rounded-xl overflow-hidden relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
                                <div className="relative aspect-[2/3] overflow-hidden bg-slate-200">
                                    <img alt="Book Cover" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcwwCIDamUQzDG32hh6evVBP-cHpzvyYRlStzJNmbVzIV9zlQRIszfD0EW43gfYxiTTKXNYubCCQb_5e90-IseGUoq0rX24Px_yaQ3XB2_NCmVBPcIu7vM993Dsm2oOkz1PZJvFxIr0EYiN7GLwTqnoNKlwwkovLsRbu0-smwpUBiVjcovMVxfyOPOk9EesAEMNtJOuKPPP6Fq3xyu0kq9EP28hr49J5yg3i-NbcxEjckf9rVQbEvy2ekCdax7wAfaxDe26E9mxhI" />
                                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[10px] text-white font-medium border border-white/10">
                                        已读
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col flex-grow">
                                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1 leading-tight line-clamp-2 group-hover:text-primary transition-colors">设计心理学</h3>
                                    <p className="text-xs text-slate-500 mb-2">Donald A. Norman</p>
                                    <div className="mt-auto flex items-center gap-1">
                                        <span className="material-icons-outlined text-[14px] text-yellow-400">star</span>
                                        <span className="text-xs text-slate-400 font-mono pt-0.5">5.0</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <a href="#" className="group">
                            <div className="glass-card p-0 rounded-xl overflow-hidden relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
                                <div className="relative aspect-[2/3] overflow-hidden bg-slate-200">
                                    <img alt="Book Cover" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuClyds9Dbgyyg61I4X1V5_exD3FjBJ_V0CtI01tqFDxuvHeJLTEz7t_T9vGt1GmfuTbDGuqm9fC2i7RJ9jpTt4VTUBumkJOqV9l1ckuQfKAV_pYm4_JVOSWbXEtiqTCt6wb2q9aqNV6YTzOIPfyg1PijUnGNuWJJwPyMCaBGyzlsBifNSEBpITfBYTwoNMdVh5kepbDBoaN1cr22Mp9Os_LZ3ndP-EyX0gRMWW54pqiNVrBcA3_XIdwO8dxFyUZYybXlD2xXSd204o" />
                                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-green-600/80 backdrop-blur-md rounded text-[10px] text-white font-medium border border-white/10">
                                        在读
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col flex-grow">
                                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1 leading-tight line-clamp-2 group-hover:text-primary transition-colors">深度工作</h3>
                                    <p className="text-xs text-slate-500 mb-2">Cal Newport</p>
                                    <div className="mt-auto flex items-center gap-1">
                                        <span className="material-icons-outlined text-[14px] text-slate-300">star</span>
                                        <span className="text-xs text-slate-400 font-mono pt-0.5">-.-</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <a href="#" className="group">
                            <div className="glass-card p-0 rounded-xl overflow-hidden relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
                                <div className="relative aspect-[2/3] overflow-hidden bg-slate-200">
                                    <img alt="Book Cover" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOWCr1ZCTkTV9XaTl7Fvc1NLhZKax_AezMVg0rHpBKLHbEJkHSFf7fVIPYnxq4S09j-GRLkxYLpu35zCXaT0U2MnF8Gj_Z5MVPJjtVqrqT1lE4OhZjtk6oIcOeUujXH0UqReYppyVFC1XxB2D8fPoA4-7oOMnxjhajGFpqxrRWP3DK_gUtoAwGhLIG6_zvMIGqr_PhdJQKhizyV7z-e7UHIWBTZf-Fs9Kq3fn0oSME6-GbuG6RvdBs-OMbEnhHkVZ3U9WF7F4xBuE" />
                                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[10px] text-white font-medium border border-white/10">
                                        已读
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col flex-grow">
                                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1 leading-tight line-clamp-2 group-hover:text-primary transition-colors">史蒂夫·乔布斯传</h3>
                                    <p className="text-xs text-slate-500 mb-2">Walter Isaacson</p>
                                    <div className="mt-auto flex items-center gap-1">
                                        <span className="material-icons-outlined text-[14px] text-yellow-400">star</span>
                                        <span className="text-xs text-slate-400 font-mono pt-0.5">4.8</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <a href="#" className="group">
                            <div className="glass-card p-0 rounded-xl overflow-hidden relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
                                <div className="relative aspect-[2/3] overflow-hidden bg-slate-200">
                                    <img alt="Book Cover" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcTLdd8M52tXz6rn52ciHIdQTttMxPrw-TEkc4xUP-p-x6ZqNGq96vX5fmLsJENQmXS5rp3QuvaqlCapnFwbg93d0W1CbtmvPYDmHtkRwoKMw0G9-85SQWrywVq-KFdrwhYruD8timYzSHXAjfYOnN6hcfoA3N-hf6rg8_UCeP0XwkDVnVCaIjvSp58R1wKp08e3szUopWA0nFW2edqPTbM2iMnq-BgeA9czDJM1BD-NC6GS5zbBEbBnZqevWdMYir_ofXffWuP18" />
                                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[10px] text-white font-medium border border-white/10">
                                        已读
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col flex-grow">
                                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1 leading-tight line-clamp-2 group-hover:text-primary transition-colors">代码整洁之道</h3>
                                    <p className="text-xs text-slate-500 mb-2">Robert C. Martin</p>
                                    <div className="mt-auto flex items-center gap-1">
                                        <span className="material-icons-outlined text-[14px] text-yellow-400">star</span>
                                        <span className="text-xs text-slate-400 font-mono pt-0.5">5.0</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <a href="#" className="group">
                            <div className="glass-card p-0 rounded-xl overflow-hidden relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
                                <div className="relative aspect-[2/3] overflow-hidden bg-slate-200">
                                    <img alt="Book Cover" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD57GtxXUHPfewqwvUqiWyKGB8M5-dEgQEyJqJX1llYL7sekWYgcL9ZxogmCDAnbOx1mMnfnYXdDuXDeAFuZeiFWz6AXRHpCoEAtq1uQbBnRBxlEFkiOqLDM16b85KmSQhJs1H5KnIPos1Pr9F-NG9QVvielNDNROfJ6WnTiw_0P3unyktmGSDz7DiPCgiZcG7f3zifMqP6uvHV16MGvSS6uuTNqNzemzclGbLiWUivEY4lGicgejHVS17adaWaiyPFQX5vu0iDWgg" />
                                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-blue-500/80 backdrop-blur-md rounded text-[10px] text-white font-medium border border-white/10">
                                        想读
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col flex-grow">
                                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1 leading-tight line-clamp-2 group-hover:text-primary transition-colors">掌控习惯</h3>
                                    <p className="text-xs text-slate-500 mb-2">James Clear</p>
                                    <div className="mt-auto flex items-center gap-1">
                                        <span className="material-icons-outlined text-[14px] text-slate-300">star_outline</span>
                                        <span className="text-xs text-slate-400 font-mono pt-0.5">Wait</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <a href="#" className="group">
                            <div className="glass-card p-0 rounded-xl overflow-hidden relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
                                <div className="relative aspect-[2/3] overflow-hidden bg-slate-200">
                                    <img alt="Book Cover" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOWIdM1xb1D5n3RBeH3Psrya8_vhVualXG_QVzPk0uKbJaUq1XUlCJHzwOx8DjyckBtERmY64NOE85Exicwv49zJdVif6GORvB8X7W_mf7CGvDRWBSsOH8Tpxhw2mj879rl5ayANSjjocM-UaP15yk0i1bDjXzu9mR-qoQ7VKRKIj9B95AELrZqGbnL2xpQzuX8dl0v2suNcvUyOJskDTnV7toh8fV8W_InJTAhhVVFJZUBgwyEODc3C87QGUbKr9mxqIU2UuvKYA" />
                                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[10px] text-white font-medium border border-white/10">
                                        已读
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col flex-grow">
                                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1 leading-tight line-clamp-2 group-hover:text-primary transition-colors">人类简史</h3>
                                    <p className="text-xs text-slate-500 mb-2">Yuval Noah Harari</p>
                                    <div className="mt-auto flex items-center gap-1">
                                        <span className="material-icons-outlined text-[14px] text-yellow-400">star</span>
                                        <span className="text-xs text-slate-400 font-mono pt-0.5">4.7</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <a href="#" className="group">
                            <div className="glass-card p-0 rounded-xl overflow-hidden relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
                                <div className="relative aspect-[2/3] overflow-hidden bg-slate-200">
                                    <img alt="Book Cover" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1r2AxW2RB38U0jTQqJYhR4XyGiqIwJRAJIPi0h9oN1DteSn0quuo_-iZ-zS2VbDCE57jzrSVQWMYtpsLvKJO_oLtPDDxKkOvjojMRF5P2SRUN-I6n73cZI5TnDsaneGK5UezCobFY5v0aOm0y826rOD9K71OKsyseWb5XBd00ggpBvzjtkLeBcfEyQwvuAvIWAiiMFBFCcIfhQr96DeNRXdogp54ZYRnNI_Ju_UAuZk9ClhCvmE8t_WaJxv_AjOFEpfTDWu7dbRs" />
                                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[10px] text-white font-medium border border-white/10">
                                        已读
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col flex-grow">
                                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1 leading-tight line-clamp-2 group-hover:text-primary transition-colors">金钱心理学</h3>
                                    <p className="text-xs text-slate-500 mb-2">Morgan Housel</p>
                                    <div className="mt-auto flex items-center gap-1">
                                        <span className="material-icons-outlined text-[14px] text-yellow-400">star</span>
                                        <span className="text-xs text-slate-400 font-mono pt-0.5">4.5</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <a href="#" className="group">
                            <div className="glass-card p-0 rounded-xl overflow-hidden relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
                                <div className="relative aspect-[2/3] overflow-hidden bg-slate-200">
                                    <img alt="Book Cover" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMmjAjd-MIhfQCFag7SJZfKY0_cVYUJDl6eyL6Ub7iZfNT9cNAT_MTanNA2uy5JNcuhKszzYxHnIUtWbdJumBjflbt6V6lrDKZH8sXipCEuzfZ3af-J78Kl9VMFKFa1m_jlMhdqQGRVyIPac2zOmNVsy4oslQD0qqeFqFIXc6dNLYDuwYfQggsJvGZVMlbedBleUwMd5jBpqlVOdo7qlbXGr_npO2eYBbxtmIfC7l3ljxuBrF834OWawbLxD8odcXlDPpwmhq2syY" />
                                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[10px] text-white font-medium border border-white/10">
                                        已读
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col flex-grow">
                                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1 leading-tight line-clamp-2 group-hover:text-primary transition-colors">重构：改善既有代码的设计</h3>
                                    <p className="text-xs text-slate-500 mb-2">Martin Fowler</p>
                                    <div className="mt-auto flex items-center gap-1">
                                        <span className="material-icons-outlined text-[14px] text-yellow-400">star</span>
                                        <span className="text-xs text-slate-400 font-mono pt-0.5">5.0</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <a href="#" className="group">
                            <div className="glass-card p-0 rounded-xl overflow-hidden relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
                                <div className="relative aspect-[2/3] overflow-hidden bg-slate-200">
                                    <img alt="Book Cover" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5ScnAhn5EDZbV6hnNSp5YVYl70RNfoHDYNHUhcQBfl1Qcvr5sL7eUnT_2K66OAYSxKhmqwV18f8g7g1tK6ALKhC3U1gZlqhk6RB_1xB_nLzKSj2XQPy_0mbDre3e-Wg-vLKN0F9ucuXaIcjHomuY1FNxJYPbWNWLlx0z96wXgjpIpbD9t5jygF6bhmHumfo949JzDhxZB6ruUMbNMdBzEGfkSAa6GDgSPPHriGpVifqUPBQm4QnA6l-0lMTJXdDztbFhZirT0Gj8" />
                                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[10px] text-white font-medium border border-white/10">
                                        已读
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col flex-grow">
                                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1 leading-tight line-clamp-2 group-hover:text-primary transition-colors">三体全集</h3>
                                    <p className="text-xs text-slate-500 mb-2">刘慈欣</p>
                                    <div className="mt-auto flex items-center gap-1">
                                        <span className="material-icons-outlined text-[14px] text-yellow-400">star</span>
                                        <span className="text-xs text-slate-400 font-mono pt-0.5">5.0</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <a href="#" className="group">
                            <div className="glass-card p-0 rounded-xl overflow-hidden relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
                                <div className="relative aspect-[2/3] overflow-hidden bg-slate-200">
                                    <img alt="Book Cover" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZcLAAD8rzbRO0SnM8XV4kkJbkW6RtuuuwlwSwSgpL39MbwSRPap0HUMuOlLkX0_k_45GeLz7beyO5WDXVzyMAVGbebsIU3Gm03I1WjVJ07wP9RLO1LtcfSJSAHxkrKOlTCI-smLfiV9DqPwmHqkgnTgmFSTFUzyBSxy-pl8Be9XxKVcl7eJuuQ2GWpsREYtU5lnKCAklpONya_tDyfHkTyDbs4S1i69HNWintctheSIe8nLxuarPdP-e73UAshRewvHL9Q9V3PM4" />
                                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-blue-500/80 backdrop-blur-md rounded text-[10px] text-white font-medium border border-white/10">
                                        想读
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col flex-grow">
                                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1 leading-tight line-clamp-2 group-hover:text-primary transition-colors">精要主义</h3>
                                    <p className="text-xs text-slate-500 mb-2">Greg McKeown</p>
                                    <div className="mt-auto flex items-center gap-1">
                                        <span className="material-icons-outlined text-[14px] text-slate-300">star_outline</span>
                                        <span className="text-xs text-slate-400 font-mono pt-0.5">Wait</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="flex justify-center pt-12">
                        <a href="#" className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-primary text-slate-600 dark:text-slate-300 hover:text-primary transition-all shadow-sm">
                            <span className="text-sm font-medium">加载更多</span>
                            <span className="material-icons-outlined text-sm group-hover:rotate-180 transition-transform duration-500">sync</span>
                        </a>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
