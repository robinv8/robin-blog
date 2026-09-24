import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "./components/Header";
import Footer from "./components/Footer";
import { PageShell } from "./components/Page";
import NotFoundPath from "./components/NotFoundPath";

export const metadata: Metadata = {
  title: "404",
};

export default function NotFound() {
  return (
    <PageShell>
      <SiteHeader />

      <main className="flex min-h-[60vh] flex-col justify-center py-20">
        <div className="max-w-2xl rounded-lg border border-bl-line bg-bl-panel p-6 font-mono text-[13px] leading-[2] md:p-8">
          <p className="text-bl-muted">
            ~/robin <span className="text-bl-acc">$</span> <span className="text-bl-fg">cd <NotFoundPath /></span>
          </p>
          <p className="text-bl-soft">cd: no such file or directory</p>
          <p className="text-bl-muted">
            ~/robin <span className="text-bl-acc">$</span> <span className="bl-cursor">▍</span>
          </p>
        </div>

        <h1 className="mt-12 text-4xl font-bold tracking-tight md:text-[52px]">404</h1>
        <p className="mt-4 max-w-xl text-[15px] leading-[1.8] text-bl-soft">
          页面不存在，或者已经移到了别处。
          <br />
          <span className="text-bl-muted">This page doesn&rsquo;t exist, or it has moved.</span>
        </p>
        <div className="mt-8 flex flex-wrap gap-6 font-mono text-xs">
          <Link href="/" className="text-bl-acc hover:underline">
            cd ~ →
          </Link>
          <Link href="/posts" className="text-bl-muted transition-colors hover:text-bl-acc">
            ls posts/
          </Link>
          <Link href="/search" className="text-bl-muted transition-colors hover:text-bl-acc">
            grep …
          </Link>
        </div>
      </main>

      <Footer />
    </PageShell>
  );
}
