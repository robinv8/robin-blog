import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import { PageShell, PageHero } from '../components/Page';
import { T } from '../components/LangProvider';

const BOOKS = [
  { title: '设计心理学', author: 'Donald A. Norman', status: '已读', rating: '5.0', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcwwCIDamUQzDG32hh6evVBP-cHpzvyYRlStzJNmbVzIV9zlQRIszfD0EW43gfYxiTTKXNYubCCQb_5e90-IseGUoq0rX24Px_yaQ3XB2_NCmVBPcIu7vM993Dsm2oOkz1PZJvFxIr0EYiN7GLwTqnoNKlwwkovLsRbu0-smwpUBiVjcovMVxfyOPOk9EesAEMNtJOuKPPP6Fq3xyu0kq9EP28hr49J5yg3i-NbcxEjckf9rVQbEvy2ekCdax7wAfaxDe26E9mxhI' },
  { title: '深度工作', author: 'Cal Newport', status: '在读', rating: null, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClyds9Dbgyyg61I4X1V5_exD3FjBJ_V0CtI01tqFDxuvHeJLTEz7t_T9vGt1GmfuTbDGuqm9fC2i7RJ9jpTt4VTUBumkJOqV9l1ckuQfKAV_pYm4_JVOSWbXEtiqTCt6wb2q9aqNV6YTzOIPfyg1PijUnGNuWJJwPyMCaBGyzlsBifNSEBpITfBYTwoNMdVh5kepbDBoaN1cr22Mp9Os_LZ3ndP-EyX0gRMWW54pqiNVrBcA3_XIdwO8dxFyUZYybXlD2xXSd204o' },
  { title: '史蒂夫·乔布斯传', author: 'Walter Isaacson', status: '已读', rating: '4.8', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOWCr1ZCTkTV9XaTl7Fvc1NLhZKax_AezMVg0rHpBKLHbEJkHSFf7fVIPYnxq4S09j-GRLkxYLpu35zCXaT0U2MnF8Gj_Z5MVPJjtVqrqT1lE4OhZjtk6oIcOeUujXH0UqReYppyVFC1XxB2D8fPoA4-7oOMnxjhajGFpqxrRWP3DK_gUtoAwGhLIG6_zvMIGqr_PhdJQKhizyV7z-e7UHIWBTZf-Fs9Kq3fn0oSME6-GbuG6RvdBs-OMbEnhHkVZ3U9WF7F4xBuE' },
  { title: '代码整洁之道', author: 'Robert C. Martin', status: '已读', rating: '5.0', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcTLdd8M52tXz6rn52ciHIdQTttMxPrw-TEkc4xUP-p-x6ZqNGq96vX5fmLsJENQmXS5rp3QuvaqlCapnFwbg93d0W1CbtmvPYDmHtkRwoKMw0G9-85SQWrywVq-KFdrwhYruD8timYzSHXAjfYOnN6hcfoA3N-hf6rg8_UCeP0XwkDVnVCaIjvSp58R1wKp08e3szUopWA0nFW2edqPTbM2iMnq-BgeA9czDJM1BD-NC6GS5zbBEbBnZqevWdMYir_ofXffWuP18' },
  { title: '掌控习惯', author: 'James Clear', status: '想读', rating: null, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD57GtxXUHPfewqwvUqiWyKGB8M5-dEgQEyJqJX1llYL7sekWYgcL9ZxogmCDAnbOx1mMnfnYXdDuXDeAFuZeiFWz6AXRHpCoEAtq1uQbBnRBxlEFkiOqLDM16b85KmSQhJs1H5KnIPos1Pr9F-NG9QVvielNDNROfJ6WnTiw_0P3unyktmGSDz7DiPCgiZcG7f3zifMqP6uvHV16MGvSS6uuTNqNzemzclGbLiWUivEY4lGicgejHVS17adaWaiyPFQX5vu0iDWgg' },
  { title: '人类简史', author: 'Yuval Noah Harari', status: '已读', rating: '4.7', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOWIdM1xb1D5n3RBeH3Psrya8_vhVualXG_QVzPk0uKbJaUq1XUlCJHzwOx8DjyckBtERmY64NOE85Exicwv49zJdVif6GORvB8X7W_mf7CGvDRWBSsOH8Tpxhw2mj879rl5ayANSjjocM-UaP15yk0i1bDjXzu9mR-qoQ7VKRKIj9B95AELrZqGbnL2xpQzuX8dl0v2suNcvUyOJskDTnV7toh8fV8W_InJTAhhVVFJZUBgwyEODc3C87QGUbKr9mxqIU2UuvKYA' },
  { title: '金钱心理学', author: 'Morgan Housel', status: '已读', rating: '4.5', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1r2AxW2RB38U0jTQqJYhR4XyGiqIwJRAJIPi0h9oN1DteSn0quuo_-iZ-zS2VbDCE57jzrSVQWMYtpsLvKJO_oLtPDDxKkOvjojMRF5P2SRUN-I6n73cZI5TnDsaneGK5UezCobFY5v0aOm0y826rOD9K71OKsyseWb5XBd00ggpBvzjtkLeBcfEyQwvuAvIWAiiMFBFCcIfhQr96DeNRXdogp54ZYRnNI_Ju_UAuZk9ClhCvmE8t_WaJxv_AjOFEpfTDWu7dbRs' },
  { title: '重构：改善既有代码的设计', author: 'Martin Fowler', status: '已读', rating: '5.0', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMmjAjd-MIhfQCFag7SJZfKY0_cVYUJDl6eyL6Ub7iZfNT9cNAT_MTanNA2uy5JNcuhKszzYxHnIUtWbdJumBjflbt6V6lrDKZH8sXipCEuzfZ3af-J78Kl9VMFKFa1m_jlMhdqQGRVyIPac2zOmNVsy4oslQD0qqeFqFIXc6dNLYDuwYfQggsJvGZVMlbedBleUwMd5jBpqlVOdo7qlbXGr_npO2eYBbxtmIfC7l3ljxuBrF834OWawbLxD8odcXlDPpwmhq2syY' },
  { title: '三体全集', author: '刘慈欣', status: '已读', rating: '5.0', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5ScnAhn5EDZbV6hnNSp5YVYl70RNfoHDYNHUhcQBfl1Qcvr5sL7eUnT_2K66OAYSxKhmqwV18f8g7g1tK6ALKhC3U1gZlqhk6RB_1xB_nLzKSj2XQPy_0mbDre3e-Wg-vLKN0F9ucuXaIcjHomuY1FNxJYPbWNWLlx0z96wXgjpIpbD9t5jygF6bhmHumfo949JzDhxZB6ruUMbNMdBzEGfkSAa6GDgSPPHriGpVifqUPBQm4QnA6l-0lMTJXdDztbFhZirT0Gj8' },
  { title: '精要主义', author: 'Greg McKeown', status: '想读', rating: null, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZcLAAD8rzbRO0SnM8XV4kkJbkW6RtuuuwlwSwSgpL39MbwSRPap0HUMuOlLkX0_k_45GeLz7beyO5WDXVzyMAVGbebsIU3Gm03I1WjVJ07wP9RLO1LtcfSJSAHxkrKOlTCI-smLfiV9DqPwmHqkgnTgmFSTFUzyBSxy-pl8Be9XxKVcl7eJuuQ2GWpsREYtU5lnKCAklpONya_tDyfHkTyDbs4S1i69HNWintctheSIe8nLxuarPdP-e73UAshRewvHL9Q9V3PM4' },
];

const STATUS_COLOR: Record<string, string> = {
  已读: 'bg-[#1B1B18] dark:bg-[#E8E6DF] text-[#FAFAF6] dark:text-[#131311]',
  在读: 'bg-[#FF4D00] text-[#FAFAF6]',
  想读: 'bg-transparent border border-current/40 text-current/60',
};

const STATUS_EN: Record<string, string> = {
  已读: 'READ',
  在读: 'READING',
  想读: 'WISHLIST',
};

export default function Books() {
  return (
    <PageShell>
      <Header />
      <PageHero
        no="04"
        zh="精神角落"
        en="BOOKSHELF"
        desc="阅读是成本最低的旅行。在这里记录我读过的书、正在读的书，以及一些个人的微小感悟。"
        descEn="Reading is the cheapest journey. Here I keep track of the books I've read, the ones I'm reading, and a few small thoughts along the way."
      />

      {/* Meta strip */}
      <Reveal>
        <div className="flex flex-wrap gap-x-10 gap-y-2 mb-12 font-mono text-[11px] tracking-[0.2em] text-current/50">
          <p><T zh="2026 已读" en="READ IN 2026" /> — <span className="text-current font-bold"><T zh="12 本" en="12" /></span></p>
          <p><T zh="正在阅读" en="READING" /> — <span className="text-[#FF4D00] font-bold"><T zh="置身事内" en="Embedded in China" /></span></p>
          <p><T zh="想读清单" en="WISHLIST" /> — <span className="text-current font-bold"><T zh="8 本" en="8" /></span></p>
        </div>
      </Reveal>

      <main className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
        {BOOKS.map((b, i) => (
          <Reveal key={b.title} delay={(i % 5) * 60}>
            <a href="#" className="group block">
              <div className="relative border border-[#1B1B18]/20 dark:border-[#E8E6DF]/20 p-1.5 group-hover:border-[#FF4D00] group-hover:-translate-y-1 transition-all duration-300">
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img
                    alt={b.title}
                    className="w-full h-full object-cover grayscale-[25%] group-hover:grayscale-0 transition-all duration-500"
                    src={b.img}
                  />
                  <span className={`absolute top-2 right-2 px-1.5 py-0.5 font-mono text-[9px] tracking-wider ${STATUS_COLOR[b.status]}`}>
                    <T zh={b.status} en={STATUS_EN[b.status] ?? b.status} />
                  </span>
                </div>
              </div>
              <h3 className="mt-3 font-serif-sc font-bold text-sm leading-snug line-clamp-2 group-hover:text-[#FF4D00] transition-colors">
                {b.title}
              </h3>
              <p className="mt-1 font-mono text-[10px] tracking-wider text-current/40 flex justify-between">
                <span className="truncate">{b.author}</span>
                <span className={b.rating ? 'text-[#FF4D00] font-bold' : ''}>{b.rating ?? '——'}</span>
              </p>
            </a>
          </Reveal>
        ))}
      </main>

      <Footer />
    </PageShell>
  );
}
