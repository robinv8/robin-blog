import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import { PageShell, PageHero, SectionLabel } from '../components/Page';
import { T } from '../components/LangProvider';

const AVATAR_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCQpjZqhf_Ltlapc9yYFHB5cpNBVBsb7tCd7ood7lXMbiJvNFnVgW34EVixnw2OkuFNiwF6Mr2bLwWeBfQ9Nwuoq5w9VRy6bqo_Qt9RQk2lcPE2dLU9gxeUruyT3z4WYSHqDEw8auF2ldUGm28h4-WruTCOt4hRtuYSCLpnqMvSkmjuQXZUbDBMAzOa313TVtVzoiYxJEYdnnaXdiqYX90GcEZ56YjdXU1qWF4hWj1Lx70Kjh4ZE7Y18bE7MlFiwO-8e2h1lZjI8sI';

const STACK = ['LLM / Agent', 'TypeScript', 'React / Next.js', 'Node.js', 'Tailwind CSS', 'Python', 'Figma', 'Git'];
const HOBBIES: [string, string][] = [['咖啡', 'Coffee'], ['摄影', 'Photography'], ['徒步', 'Hiking'], ['阅读', 'Reading']];
const SOCIALS = [
  { name: 'GitHub', handle: '@robinv8' },
  { name: 'Twitter / X', handle: '@robin_builds' },
  { name: 'Telegram', handle: '@robin' },
];

export default function About() {
  return (
    <PageShell>
      <Header />
      <PageHero
        no="06"
        zh="你好，我是 Robin"
        en="HELLO, I'M ROBIN"
        desc="Agent 工程师 / 摄影爱好者 / 终身学习者。我相信代码构建世界，而文字连接灵魂。"
        descEn="Agent engineer / photography enthusiast / lifelong learner. I believe code builds the world, while words connect souls."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: avatar + story */}
        <div className="lg:col-span-7">
          <Reveal>
            <div className="flex items-center gap-6 mb-10">
              <div className="border border-[#1B1B18]/20 dark:border-[#E8E6DF]/20 p-1.5 shrink-0">
                <img alt="Robin" className="w-24 h-24 md:w-28 md:h-28 object-cover" src={AVATAR_URL} />
              </div>
              <div className="font-mono text-[11px] tracking-wider">
                <p className="flex items-center gap-2 text-[#FF4D00] font-bold mb-2">
                  <span className="w-1.5 h-1.5 bg-[#FF4D00] animate-pulse"></span>
                  AVAILABLE FOR INTERESTING PROJECTS
                </p>
                <p className="text-current/50 leading-relaxed">
                  <T
                    zh={<>这个博客是我在互联网上的自留地，<br />记录成长、分享瞬间、安放思考。</>}
                    en={<>This blog is my own corner of the internet —<br />for growth, moments, and thought.</>}
                  />
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <SectionLabel no="01" zh="我的成长之旅" en="— THE JOURNEY" />
            <div className="space-y-6 text-sm leading-loose text-current/70">
              <T
                zh={
                  <>
                    <p>
                      故事开始于 2018 年，那一年我第一次在终端里打印出了「Hello World」。那种能够通过几行字符指挥计算机的感觉让我深深着迷。从最初的 HTML/CSS 静态页面，到后来接触 React、Node.js，再到如今探索 Agent 与大模型的无限可能——技术的每一个台阶都让我看到了更广阔的风景。
                    </p>
                    <p>
                      <strong className="text-current">为什么写博客？</strong>在碎片化信息泛滥的今天，我仍然坚持长文写作。博客不仅是知识的沉淀，更是对抗遗忘的方式。在这里，我不需要迎合算法，只需要真诚地面对自己和读者。
                    </p>
                    <p>
                      除了编程，我还热衷于<strong className="text-current">摄影</strong>和<strong className="text-current">咖啡</strong>。周末我通常会带着相机穿梭在城市的街巷，或者在家里手冲一杯耶加雪菲。技术追求理性的极致，而生活需要感性的温度来平衡。
                    </p>
                  </>
                }
                en={
                  <>
                    <p>
                      The story began in 2018, the year I first printed &ldquo;Hello World&rdquo; in a terminal. The feeling of commanding a computer with a few lines of text hooked me instantly. From static HTML/CSS pages, to React and Node.js, to today&rsquo;s exploration of agents and LLMs — every step up the ladder has opened a wider view.
                    </p>
                    <p>
                      <strong className="text-current">Why blog?</strong> In an age of fragmented information, I still believe in long-form writing. A blog is both a deposit of knowledge and a way to fight forgetting. Here I don&rsquo;t need to please algorithms — only to be honest with myself and my readers.
                    </p>
                    <p>
                      Beyond programming, I&rsquo;m passionate about <strong className="text-current">photography</strong> and <strong className="text-current">coffee</strong>. On weekends you&rsquo;ll find me wandering city streets with a camera, or hand-brewing a Yirgacheffe at home. Technology pursues rational extremes; life needs a little warmth to balance it out.
                    </p>
                  </>
                }
              />
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-10 p-6 border-l-2 border-[#FF4D00] bg-[#FF4D00]/[0.05]">
              <p className="font-serif-sc font-bold text-lg italic">「Stay hungry, stay foolish.」</p>
              <p className="font-mono text-[10px] tracking-[0.2em] text-current/40 mt-2">— STEVE JOBS</p>
            </div>
          </Reveal>
        </div>

        {/* Right: spec panels */}
        <div className="lg:col-span-5 space-y-12">
          <Reveal delay={120}>
            <section>
              <SectionLabel no="02" zh="技术栈" en="— STACK" />
              <div className="border-t border-[#1B1B18]/15 dark:border-[#E8E6DF]/15">
                {STACK.map((s, i) => (
                  <div key={s} className="flex justify-between py-3 border-b border-[#1B1B18]/10 dark:border-[#E8E6DF]/10 font-mono text-[11px] tracking-wider">
                    <span className="text-current/35">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-current/85">{s}</span>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal delay={180}>
            <section>
              <SectionLabel no="03" zh="兴趣爱好" en="— INTERESTS" />
              <div className="grid grid-cols-2 gap-px bg-[#1B1B18]/15 dark:bg-[#E8E6DF]/15 border border-[#1B1B18]/15 dark:border-[#E8E6DF]/15">
                {HOBBIES.map((h) => (
                  <div key={h[0]} className="bg-[#FAFAF6] dark:bg-[#131311] px-4 py-5 font-serif-sc font-bold text-center hover:text-[#FF4D00] transition-colors">
                    <T zh={h[0]} en={h[1]} />
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal delay={240}>
            <section>
              <SectionLabel no="04" zh="找到我" en="— CONTACT" />
              <div className="border-t border-[#1B1B18]/15 dark:border-[#E8E6DF]/15">
                {SOCIALS.map((s) => (
                  <a
                    key={s.name}
                    href="#"
                    className="group flex justify-between items-baseline py-3.5 border-b border-[#1B1B18]/10 dark:border-[#E8E6DF]/10 -mx-2 px-2 hover:bg-[#FF4D00]/[0.05] transition-colors"
                  >
                    <span className="font-mono text-[11px] tracking-wider text-current/85">{s.name}</span>
                    <span className="font-mono text-[10px] text-current/40 group-hover:text-[#FF4D00] transition-colors">{s.handle} ↗</span>
                  </a>
                ))}
                <a
                  href="mailto:contact@example.com"
                  className="group flex justify-between items-baseline py-3.5 border-b border-[#1B1B18]/10 dark:border-[#E8E6DF]/10 -mx-2 px-2 hover:bg-[#FF4D00]/[0.05] transition-colors"
                >
                  <span className="font-mono text-[11px] tracking-wider font-bold text-[#FF4D00]">EMAIL</span>
                  <span className="font-mono text-[10px] text-current/40 group-hover:text-[#FF4D00] transition-colors"><T zh="发送邮件 →" en="SEND EMAIL →" /></span>
                </a>
              </div>
            </section>
          </Reveal>
        </div>
      </div>

      <Footer />
    </PageShell>
  );
}
