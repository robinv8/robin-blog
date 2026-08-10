import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import { PageShell, PageHero } from '../components/Page';
import { T } from '../components/LangProvider';

const PROJECTS = [
  {
    name: 'AI Code Companion', status: 'OPEN SOURCE',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVfbo3AYpAp4xBbFKDTi9R7nS5WeC10mmB8i2k9HC4HnBoeMYy_zKsgeaHME9EUR-lFtM9VVR7tYaA9DUwle1fsBrLUeD_EYFFqqDgXwQnSj1vgfPsKpoKolZkw8ghmAeIswOS6pGVRBrsqh3VrGqYl7nvxaG__1StZEKkQRj9k8p7A3o17a-ei1vUipaaTJ5qb4H_ePMm6q19GbByFuhegZhSvZAKlBniyitLoeDON6tRrttsOdl2OjXyX0hnjx85aja9CUHHFyI',
    desc: '一个基于 LLM 的本地代码辅助工具，旨在帮助开发者快速理解复杂代码库，提供智能重构建议，并支持自定义上下文。',
    descEn: 'A local LLM-powered coding companion that helps developers quickly understand complex codebases, offers smart refactoring suggestions, and supports custom context.',
    stack: ['Python', 'React'],
  },
  {
    name: 'PennyWise', status: 'BETA',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhZwkURWHTdNnYB6W7NEqwhhEQVZeR35THVQxPoP1giRHFXshvf-UpmVpzmPfvq75IDHyvrrZPYEPbFxmyvZ8rcy8yk1y1plcWVVWC-lGjwbt-HglXU05tzN_VShZt_O7r3RiXnPLMND9viNkitkr6IIm1lg5GLnlMvtAjYZTRLbppf0_baiIAyO52Yz1cahy6RD_XoLCahkoUfZyBEjBUDCS6mE5aUHO86XUXLX0swnsx4dPRHbqaqLJLF6H2_K5f8WBZlNkPnmI',
    desc: '极简主义的个人记账应用，专注于快速记录和直观的数据可视化。支持多币种，自动同步银行交易（实验性功能）。',
    descEn: 'A minimalist personal finance app focused on quick logging and intuitive data visualization. Multi-currency support with automatic bank sync (experimental).',
    stack: ['Flutter', 'Firebase'],
  },
  {
    name: 'MyNAS Dashboard', status: 'LIVE',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsTGjHml95zNIa_H2FUWo2vGABMuIVvfeyELWXVtTjmpfmd7MA41esdUOD1Xggt5Lzi7Ua11FmPZtdf3RCZ_GJjHGxJfHaNWWUOMuEHv3CW2IbrgXP676-ct201L_T7ovPbUcKk7dXkx05SNGqTtUd-kmS8MpLKt9j64GJN3V70MtrKs9U0T8gkUCSmT7lkmTqQUGsVwMPHY8b11NxbsNrUA9g6GenK0E_B6Pk8T835IHtHAaJyG5yK2gHYnTtDUYpMcoo2WfLCNA',
    desc: '为自建 NAS 设计的轻量级监控面板。实时显示 CPU、内存、磁盘温度和 Docker 容器状态，界面美观且资源占用极低。',
    descEn: 'A lightweight monitoring dashboard for self-hosted NAS. Real-time CPU, memory, disk temperature and Docker container status — beautiful UI with minimal resource usage.',
    stack: ['Vue 3', 'Go'],
  },
  {
    name: 'Lens & Light', status: null,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlqSLuwevZKa921c6LooM60hZIfQIDGIGkgsAz0AaPE6Yu9P2N9PvrG0L39tDIminV-mwFPAd_Kyy_NqjuhjMwUHmsXvVLQfLNvyGl9WuC7p752A753NgR22reHm-JFAXddY-FAqYwYQ6_Z-f09ywqHsIVdGt1JajBeie6kfhSsquWkJj76uiPNRZKYemwHnvIGdO_PCAzfmCzToX3pfBk25qGral4kOvUM4bz_W9BUTTg6fUtdecbJQ6xR6oK0RzPFXEiKwk0mlg',
    desc: '一个沉浸式的摄影作品集网站模板。专注于大图展示和流畅的转场动画，适配各种移动设备，旨在还原照片最真实的质感。',
    descEn: 'An immersive photography portfolio template. Large imagery, smooth transitions, fully responsive — designed to honor the true texture of each photo.',
    stack: ['Next.js', 'Framer'],
  },
  {
    name: 'FlowState', status: null,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3NI6kAAk2NYiSSUsasD8ALkXQ1bQK083x95q2QFKYbuM7dtKO4DckP9w0CIXoKZzEjhnQbhPBGcd3TKziJoOBarpBX3l5yUXkDeIKpaX7HZ_WAa6Odb1Gg7P73pN3OP--cPN-bT8MUQLoAc7JJ9y34R4bZ480PuEP4tdE49pEN3-TC5MRP_92NBynnS8yhn04DMgr0ThAnnl4PY08HkBR2bkDmsRiurweGyT6aZbewTOnNj4gEdPGuYOQJLOpNZnxKX9JWu0VGyk',
    desc: '结合了番茄工作法和白噪音的专注力应用。内置多种自然音效，帮助用户在嘈杂的环境中快速进入心流状态。',
    descEn: 'A focus app combining the Pomodoro technique with white noise. Built-in nature soundscapes help you drop into flow state, even in noisy environments.',
    stack: ['Electron', 'Web Audio'],
  },
];

export default function Projects() {
  return (
    <PageShell>
      <Header />
      <PageHero
        no="03"
        zh="创意工坊"
        en="WORKS & EXPERIMENTS"
        desc="这里展示了我的一些个人项目和实验性作品。从实用的开发工具到有趣的创意编程，每一个项目都是一次探索和学习的过程。"
        descEn="A selection of personal projects and experiments — from practical developer tools to playful creative coding. Each one is an exploration and a lesson."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.name} delay={(i % 3) * 80}>
            <article className="group h-full flex flex-col cursor-pointer">
              <div className="relative border border-[#1B1B18]/20 dark:border-[#E8E6DF]/20 p-1.5 group-hover:border-[#FF4D00] transition-colors">
                <div className="h-44 overflow-hidden">
                  <img
                    alt={p.name}
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    src={p.img}
                  />
                </div>
                {p.status && (
                  <span className="absolute top-4 right-4 px-2 py-1 bg-[#FF4D00] text-[#FAFAF6] font-mono text-[9px] tracking-[0.2em] font-bold">
                    {p.status}
                  </span>
                )}
              </div>
              <div className="pt-5 flex flex-col flex-grow">
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="font-serif-sc font-bold text-lg group-hover:text-[#FF4D00] transition-colors">{p.name}</h3>
                  <span className="font-mono text-xs text-current/30 group-hover:text-[#FF4D00] group-hover:translate-x-1 transition-all">→</span>
                </div>
                <p className="text-xs leading-relaxed text-current/55 flex-grow line-clamp-3"><T zh={p.desc} en={p.descEn} /></p>
                <div className="flex gap-3 mt-4 pt-4 border-t border-[#1B1B18]/10 dark:border-[#E8E6DF]/10">
                  {p.stack.map((s) => (
                    <span key={s} className="font-mono text-[10px] tracking-wider text-current/40">{s}</span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}

        {/* Coming soon */}
        <Reveal delay={160}>
          <article className="group h-full min-h-[320px] border border-dashed border-[#1B1B18]/25 dark:border-[#E8E6DF]/25 flex flex-col items-center justify-center text-center p-6 hover:border-[#FF4D00] transition-colors cursor-pointer">
            <span className="font-serif-sc font-black text-6xl text-current/15 group-hover:text-[#FF4D00] transition-colors select-none">?</span>
            <h3 className="font-serif-sc font-bold text-lg mt-4"><T zh="即将到来" en="Coming Soon" /></h3>
            <p className="text-xs text-current/45 mt-2 leading-relaxed"><T zh={<>正在孵化新的想法...<br />敬请期待更多有趣的项目</>} en={<>New ideas incubating...<br />More fun projects on the way</>} /></p>
          </article>
        </Reveal>
      </div>

      <Footer />
    </PageShell>
  );
}
