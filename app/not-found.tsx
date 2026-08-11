import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { PageShell } from "./components/Page";

export default function NotFound() {
  return (
    <PageShell>
      <Header />

      <main className="min-h-[60vh] flex flex-col items-start justify-center py-20">
        <p className="font-mono text-[11px] tracking-[0.3em] text-[#FF4D00] mb-6">
          [ 404 — NOT FOUND ]
        </p>
        <h1 className="font-serif-sc font-black text-5xl md:text-7xl tracking-tight">
          页面走丢了<span className="text-[#FF4D00]">。</span>
        </h1>
        <p className="mt-6 text-sm leading-loose text-current/60 max-w-xl">
          你要找的页面不存在，或者已经被移动到了别处。
        </p>
        <Link
          href="/"
          className="u-link mt-10 font-mono text-[11px] tracking-[0.25em] font-bold text-[#FF4D00]"
        >
          ← 回到首页 / BACK HOME
        </Link>
      </main>

      <Footer />
    </PageShell>
  );
}
