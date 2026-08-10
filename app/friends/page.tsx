import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import { PageShell, PageHero, SectionLabel } from '../components/Page';
import { T } from '../components/LangProvider';

const GROUPS = [
  {
    no: '01', name: '技术大佬', en: 'TECH',
    links: [
      { name: "Alex's Code", desc: '专注前端开发与用户体验，分享 React 与 Vue 实战经验。', descEn: 'Front-end development and UX, with hands-on React & Vue experience.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFQcxVrOZejPrE7QWsVDa6Mt_dN06ehwKB-CNtIJ3LwK0JlKyH1A3faapRxT1Qv8cvK0bAsAEQ1eRUlvxTwR_EgBqVqxaSC3VvfwWe2g5vStHOASMZtCzLXn4AuQjk2rbC9yKOjtg0HklWtFQvvR3JIpXsyctymUvET-uATapT27t4XNdSBdEvGvhFNAUm7MjJsYB809UEQWhe1NXRxJkQPN1S3LKqLEZsxU3cqi1MEoT3u60aOQPTY6iXUNY35xv8lQH64WvcWso' },
      { name: '后端架构笔记', desc: '深入理解分布式系统，Go 语言进阶之路。', descEn: 'Deep dives into distributed systems and the road to Go mastery.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB829cSxOSFY6XpAl1a4KlaeLwh7mTQrptym-rvCW2-N8f60AQGr3EZ5Rdl79V-3ZIT29REbnftI279jo9ETCTt7qBUZHmjYZTrhHbi0WlZVb2mxdvG--abCFkCWsCxIy27s_lqzEK3I4g3JlL57RrBmsNDGOQrNdGfb7nn3xOuh1W1od5iexm407QeDtOerIL1zJQXmxQdxOKkzH_oNzq-1YMpsVIvCfrchopkh2KOPMCVJsGvgkwGUZmUbTVeM4SVuBFmrxASpAk' },
      { name: 'AI 探索实验室', desc: '关注大模型应用落地，探索 AGI 的无限可能。', descEn: 'Tracking real-world LLM applications and exploring the possibilities of AGI.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUskarrXGlTgiY_eGiJJAzOaSfGDjGyFE6uUesXmKFSix6nFjkAouVkEdltx1lWrz2H90rnmLQKl5OfhRQgAXI1EpGO8wTYy1oVLqKKiTmhRP_E1wpaDZKSu7yvqbSvzmgtnFI3kmB7m-vF_0onocCe_el7HpGci4cNSBJEio-rPbqEiTYKqaw-yYCnP9ZlGDvFk_SKfmswJxAfpPTcKo-OANguY5apsVsIYCCMm77MeHWELskJjJaGqSnUMkNNOrRxA7IySrhFE8' },
    ],
  },
  {
    no: '02', name: '设计与生活', en: 'LIFE',
    links: [
      { name: 'Mono Design', desc: '极简主义设计美学，探索 UI/UX 的边界。', descEn: 'Minimalist design aesthetics, pushing the boundaries of UI/UX.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqJIWJlGUfeyFwm7rDFBRapYFl-tdAFwcrOk5MXA3k8RiNJ092Vdq-jl7AhQ-LzeK6GYnfAxfwAC7sLXH1aa60Q1Pjs69_BlToS0evBCjNvijSbAqmvuTP-HJaQLOkilW9fXzz1fVER4BllHMJ0E-hiz5F6gPnW0GyRjfiWnZ-raPUWEeW5NnIL-4bgpibHJ3m6HspGLelIvhrEA41-Rx5Onruq8GtmlJYBwEE_mJVTBoKei1PMSyz-vAmA4BvMtXQGLpeYcskEok' },
      { name: '光影日记', desc: '用镜头记录生活中的微小感动，胶片摄影爱好者。', descEn: 'Capturing small moments of life through a lens — a film photography lover.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAk1Mrpy9VFTkjnUheNrLLjF8ZvxwuYRM6ZggnKPl-_ka9sYrLXa5dUa1BtSxyMSG3FMi9aTuxXKfGzIWiZaoU54ZVk-vLH3tBPAOZ6QaKtM17RnEQVrhTKgYgNcepV_v12YlH-TD8Mg0wIvZ2B3_AWG90pukHB0sPCqbTRpkkRhrlE-IUgQV8nI2-YB2HKuQBACo5XMA8ZtrPCaMAEXcG717tWykj0fto3tvdumgzzWNam1IYvuH9BltWiVE6yJJIZky3LM0w-DJg' },
      { name: '深夜书房', desc: '阅读、思考与写作，在喧嚣中寻找一片宁静。', descEn: 'Reading, thinking and writing — finding quiet amid the noise.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUOOP0TAJNLIdpakocaMrxjjqg_VQo_x6ScZuKkYqrw3sBektWneYVlh3Zn5Y7FLzuva3D_dBg0L1lSSOWMLH8b4d5vsP5Sla6_gpdxFljevIWGWtxdHRxR8yeSoqGCI0XtTvIzcqHxE1TxHybHAYHu8Tru8CcNC0jYQ3w28sVZ8p8X2z_BMla4TtrL_jXl158yCs6pB3MhXPui-kqPIhX5x66pnFwvlzRjPG6mfWomPEVvK8x6DD1GOiWX4Lw8Xskq6wHcHV7ujg' },
      { name: '半杯咖啡', desc: '咖啡豆测评分享，寻找城市里最好的独立咖啡馆。', descEn: 'Coffee bean reviews and the hunt for the best indie cafés in town.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKl19p8352yWxBKRCD5ACAcOvfy5IRUV3eRalF9k5-sAkk7-nc-m-WVzPYKyXMymYHvhLrInmelCnFG2Vsk3EQy8h3q1ru37Yw6rV4DIsFH5wooQ6xd6llc0YxSArQ4e53VF9qcOpmuFoCcBAeBtgwhqggGpSdRGZPVnfM-DDhEtjqPnJw3lEspDlc4VY13wtf0lJEqKlYgDIOaPfgSinkeo6xqeOselSLeqsIoa0AoKnZbaLb9fauCKGkHLuoIdvlK2mBDxkeY8U' },
    ],
  },
];

export default function Friends() {
  return (
    <PageShell>
      <Header />
      <PageHero
        no="05"
        zh="友情链接"
        en="LINKS"
        desc="海内存知己，天涯若比邻。这里收录了一些优秀的技术博客、设计网站和有趣的朋友们。欢迎更多的朋友互换友链，共同交流。"
        descEn="A bosom friend afar brings a distant land near. A collection of great tech blogs, design sites and interesting friends — link exchange welcome."
      />

      {GROUPS.map((g) => (
        <section key={g.name} className="mb-16">
          <SectionLabel no={g.no} zh={g.name} en={`— ${g.en}`} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {g.links.map((l, i) => (
              <Reveal key={l.name} delay={i * 60}>
                <a
                  href="#"
                  className="group flex items-start gap-4 p-5 border border-[#1B1B18]/15 dark:border-[#E8E6DF]/15 hover:border-[#FF4D00] transition-colors"
                >
                  <div className="border border-[#1B1B18]/20 dark:border-[#E8E6DF]/20 p-0.5 shrink-0">
                    <img alt={l.name} className="w-10 h-10 object-cover grayscale-[30%] group-hover:grayscale-0 transition-all" src={l.img} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif-sc font-bold truncate group-hover:text-[#FF4D00] transition-colors">{l.name}</h4>
                    <p className="text-xs text-current/50 mt-1.5 leading-relaxed line-clamp-2"><T zh={l.desc} en={l.descEn} /></p>
                  </div>
                  <span className="font-mono text-xs text-current/25 group-hover:text-[#FF4D00] transition-colors">↗</span>
                </a>
              </Reveal>
            ))}
          </div>
        </section>
      ))}

      {/* Apply for link exchange */}
      <Reveal>
        <section className="mb-8 border border-[#1B1B18]/15 dark:border-[#E8E6DF]/15 grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-[#1B1B18]/15 dark:border-[#E8E6DF]/15">
            <h3 className="font-serif-sc font-bold text-xl mb-3"><T zh="申请友链" en="Exchange Links" /></h3>
            <p className="text-sm text-current/60 leading-relaxed mb-6">
              <T
                zh="如果你拥有自己的个人博客，且内容健康、保持更新，欢迎与我交换友链。"
                en="If you run a personal blog with healthy, regularly updated content, feel free to exchange links with me."
              />
            </p>
            <a href="mailto:contact@example.com" className="u-link font-mono text-xs tracking-[0.25em] font-bold text-[#FF4D00]">
              <T zh="发送邮件 →" en="SEND EMAIL →" />
            </a>
          </div>
          <div className="p-8 md:p-10 font-mono text-xs leading-loose text-current/60 bg-[#1B1B18]/[0.02] dark:bg-[#E8E6DF]/[0.02]">
            <p><span className="text-[#FF4D00]">name:</span> "Site Name",</p>
            <p><span className="text-[#FF4D00]">desc:</span> "A short description...",</p>
            <p><span className="text-[#FF4D00]">url:</span> "https://your-site.com",</p>
            <p><span className="text-[#FF4D00]">avatar:</span> "https://your-site.com/logo.png"</p>
          </div>
        </section>
      </Reveal>

      <Footer />
    </PageShell>
  );
}
