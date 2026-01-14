import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Photography() {
    return (
        <div className="font-sans antialiased text-slate-800 dark:text-slate-200 min-h-screen relative selection:bg-primary selection:text-white transition-colors duration-300">
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="light-mesh dark:hidden w-full h-full absolute inset-0"></div>
                <div className="hidden dark:block w-full h-full absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black"></div>
                <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-60 dark:opacity-20 animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-3xl opacity-60 dark:opacity-10"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Header />

                <section className="mb-12 text-center md:text-left md:flex justify-between items-end">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-slate-400">
                            Captured Moments
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-xl text-sm md:text-base leading-relaxed">
                            A collection of visual stories, fragments of light, and memories frozen in time. Exploring the world through the lens.
                        </p>
                    </div>
                    <div className="mt-6 md:mt-0 flex gap-2 overflow-x-auto no-scrollbar pb-1">
                        <button className="px-4 py-1.5 rounded-full bg-white dark:bg-white/10 text-primary border border-primary/20 text-xs font-medium shadow-sm whitespace-nowrap">
                            All Photos
                        </button>
                        <button className="px-4 py-1.5 rounded-full bg-transparent hover:bg-white/50 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 text-xs font-medium transition-all whitespace-nowrap">
                            Landscape
                        </button>
                        <button className="px-4 py-1.5 rounded-full bg-transparent hover:bg-white/50 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 text-xs font-medium transition-all whitespace-nowrap">
                            Street
                        </button>
                        <button className="px-4 py-1.5 rounded-full bg-transparent hover:bg-white/50 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 text-xs font-medium transition-all whitespace-nowrap">
                            Film
                        </button>
                    </div>
                </section>

                <main className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6 pb-12">
                    {/* Static Photo Items from Design */}
                    <div className="break-inside-avoid relative group cursor-zoom-in">
                        <div className="glass-card p-1.5 rounded-2xl overflow-hidden transition-all duration-500 group-hover:shadow-2xl">
                            <div className="relative overflow-hidden rounded-xl">
                                <img alt="Misty Mountains" className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzbQA7SL-2KW2NllhH8hsLNagkv9onFs6PczAbxjr59MDd9QskeOPV_912iyHcIpgyL9YBEPiMb7oe6fardR4J1VHe9MIvG1KgPI-7S4tRUVxg8l2IiELXK0M6nH6UPV6zkgQTTI7Z-ykX5Rm3lwZBVHpGqCQqDQuF28EgybfxrqEgGDr2bDwqkEalaIxQyzHDOR_d-OItGnTy40QKXZPtBOEEHlq6ykKnntICpDCxWzBtyAiHqC8dnfpk0IQ5fplG3hneSEW-yHM" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                                    <h3 className="text-white font-medium text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Misty Mountains</h3>
                                    <div className="flex justify-between items-center mt-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                        <span className="text-white/80 text-xs font-mono">Fujifilm XT-4</span>
                                        <span className="text-white/80 text-xs">Oct 2025</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="break-inside-avoid relative group cursor-zoom-in">
                        <div className="glass-card p-1.5 rounded-2xl overflow-hidden transition-all duration-500 group-hover:shadow-2xl">
                            <div className="relative overflow-hidden rounded-xl">
                                <img alt="Analog Soul" className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1DQ-kPLhYRRpMzQCsHl0edjf80r7KGgsWAC5vifw42L0Hd_xIaI30iksGEoumeCfiuSV-yi4H90OzxzGVhLGEjOv9z9LvZVd6bCpISvF1UPhbHth-Fr6pA50i_Tr8D0e8SAl0LDlaGHkPR5qf1ofOQy_uvSa03OzRW_W7vNM8Y_BfKJbQ3LWWZPVy5ZjBYO7rXHh3UnTWT0fRqKg8ypp8a_hRiVB6piZWFEQimnj8KRLu16JlIpndD-a5y-aonOFRamFIU_R3IpA" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                                    <h3 className="text-white font-medium text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Analog Soul</h3>
                                    <div className="flex justify-between items-center mt-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                        <span className="text-white/80 text-xs font-mono">35mm</span>
                                        <span className="text-white/80 text-xs">Sep 2025</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="break-inside-avoid relative group cursor-zoom-in">
                        <div className="glass-card p-1.5 rounded-2xl overflow-hidden transition-all duration-500 group-hover:shadow-2xl">
                            <div className="relative overflow-hidden rounded-xl">
                                <img alt="Silent Forest" className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDtAsY0ysOp2wsk6APYgPGn0a7wnrNcTH6U5CX0u-J6YEgcF-cdADUtGVCckeDULm1ulLHButIp49kv0BhGLZNKWviPgX92_8LCBX_8neJzEFq2ErapC4DPMqTbUZqu69MSF18octf4y5cd6FV9kBg09csDS_AZN86akf5p3Q85hNdSl0s_H6yvm6g_c9ethCkG_d6Y_JE7AoH8BBkmDaNyYpFZBaLGOMq9E4kB79lt764nvY6U4Uu7YotebXQI9s9SgfConCfYws" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                                    <h3 className="text-white font-medium text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Silent Forest</h3>
                                    <div className="flex justify-between items-center mt-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                        <span className="text-white/80 text-xs font-mono">Sony A7IV</span>
                                        <span className="text-white/80 text-xs">Aug 2025</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="break-inside-avoid relative group cursor-zoom-in">
                        <div className="glass-card p-1.5 rounded-2xl overflow-hidden transition-all duration-500 group-hover:shadow-2xl">
                            <div className="relative overflow-hidden rounded-xl">
                                <img alt="Ready to Shoot" className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuASaidhgyevNyUwzby_tqslg7ZUIJ4GX_E6gmgOiacwn_LO2hOHCaUh1QbzQDk5X1rx_Z9F_Zl2-JIrY7e265oytYZ-dz3EZmgcMfcHIqpRGPMb0BTYrRLVt-ExwfhGDA7ZCCYuM0N6DZscL_vwUANK_-fPtWW3QB2o0_2tyxGedT5-eSM3YMMR6GuZ_D_mkjJyDddkBSetYqSZXDXOmXtlD1SRmuez_dUfYPBlmrw_SjwhfFMa12kJ4w5Dx3mEzFUwSyNJLLYrrKY" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                                    <h3 className="text-white font-medium text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Ready to Shoot</h3>
                                    <div className="flex justify-between items-center mt-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                        <span className="text-white/80 text-xs font-mono">iPhone 15 Pro</span>
                                        <span className="text-white/80 text-xs">Jul 2025</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="break-inside-avoid relative group cursor-zoom-in">
                        <div className="glass-card p-1.5 rounded-2xl overflow-hidden transition-all duration-500 group-hover:shadow-2xl">
                            <div className="relative overflow-hidden rounded-xl">
                                <img alt="Green Silence" className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqSFNWABhxK01GV-msIQIWkWaAunGsA_J1L4gyXTpX8IjFl8rT0VMy7_42ZVVnxdTVfesCXFT3XGVkU0BMHMirRuwVHrjDtxBZR2KXJhIg6gVVZ1IoIxFjBExe8h8TudfvWhJ3iF85m1aTZbjfniVU8ft_2ik8HVROTS5FlB6pFbwd6a2NsbUAJOadO_F8WbpeYxPp29U4XONhKjB2xbjxTDjcmSrD-o0-t3slpZ0mEKIIQNL8z7pR3pcU39yRYZZNWz3dXYTE274" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                                    <h3 className="text-white font-medium text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Green Silence</h3>
                                    <div className="flex justify-between items-center mt-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                        <span className="text-white/80 text-xs font-mono">Canon R5</span>
                                        <span className="text-white/80 text-xs">Jun 2025</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="break-inside-avoid relative group cursor-zoom-in">
                        <div className="glass-card p-1.5 rounded-2xl overflow-hidden transition-all duration-500 group-hover:shadow-2xl">
                            <div className="relative overflow-hidden rounded-xl">
                                <img alt="Daily Ritual" className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAesDQMs4EqBn9_4RVTxPAse5Sb1lpBtGBW5q8Hi21bEB4JNBETiyWmz6Pjs-F49lKwof9z93_YTW5FoXWNYVrW3RaeCl-0_x_BpxHgUo1BXqzZiemV4ZBv84QfJ_UxGASoJxIAFP90jMmeJLrEyedyyUU3NW1OhMpg6vmSXFVkiR6j_aXfynoEySe-FqcwYgelWZM46B4yFiYaW_BCWEaZFAi345fxYRugMhmosUoat_lEBKusn1qp8fM6CATnOZhdVg9jjEVChSA" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                                    <h3 className="text-white font-medium text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Daily Ritual</h3>
                                    <div className="flex justify-between items-center mt-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                        <span className="text-white/80 text-xs font-mono">Ricoh GRIII</span>
                                        <span className="text-white/80 text-xs">May 2025</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="break-inside-avoid relative group cursor-zoom-in">
                        <div className="glass-card p-1.5 rounded-2xl overflow-hidden transition-all duration-500 group-hover:shadow-2xl">
                            <div className="relative overflow-hidden rounded-xl">
                                <img alt="Golden Hour" className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_YIM1xVb9r6HOaUU2HXYVvph-9TV7KyIHJLO3z3EyOMpCltMwEEoFVWRr0wdEImkFNUBkQLzCk1SFih_bIicLt4ohMDCYZxq-upEK1WEuxTr-mHodbYWgn4ahbB7G_XK1mESJp0sC6lTQYYc1Sv2E76cryhbZ5WkwuBiOFWdB2KjU_8yLQGt1ScGDDiO5bQMCHS1fDWqXmwFl8dLI90mmOLUUwYg06XQDH7_DO5Ks4YC_jNDk-YD7AnZ-QdMKT4_hJ6Ew0HLlnok" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                                    <h3 className="text-white font-medium text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Golden Hour</h3>
                                    <div className="flex justify-between items-center mt-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                        <span className="text-white/80 text-xs font-mono">Sony A7C</span>
                                        <span className="text-white/80 text-xs">Apr 2025</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="break-inside-avoid relative group cursor-zoom-in">
                        <div className="glass-card p-1.5 rounded-2xl overflow-hidden transition-all duration-500 group-hover:shadow-2xl">
                            <div className="relative overflow-hidden rounded-xl">
                                <img alt="Night Out" className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTRO4BR9mo_lbRguG9-Jx-fiPnfkPUKTIE_HrPHEO2Ial3BtXq3PO897X4qqXKm9BdslRrKxmehDaFNcQ_5my6VXNZpQN1ySkWkha7fXavfW3jObEt0C5Hl5KtiutWrgacdQHuKFr8XEJcgP_cfnzgA9usIL1531vHEiI2ehPOsgvjmHFZ5H0NrqRk79_qWE2Ekih9V0zAGDPuXS_JjTCp6ykv0Ni4vPerE2AO3vyOH-tFTWG-6s-oRPscaHOxNNdQk9fzeL5qHRk" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                                    <h3 className="text-white font-medium text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Night Out</h3>
                                    <div className="flex justify-between items-center mt-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                        <span className="text-white/80 text-xs font-mono">iPhone 14</span>
                                        <span className="text-white/80 text-xs">Mar 2025</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </main>

                <div className="flex justify-center pb-8">
                    <button className="group flex items-center gap-2 px-8 py-3 rounded-full glass hover:bg-white/80 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 hover:text-primary transition-all shadow-sm">
                        <span className="text-sm font-medium">Load More Photos</span>
                        <span className="material-icons-outlined text-xl group-hover:rotate-180 transition-transform duration-500">expand_more</span>
                    </button>
                </div>

                <Footer />
            </div>
        </div>
    );
}
