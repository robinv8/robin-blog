import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <div className="font-sans antialiased text-slate-800 dark:text-slate-200 min-h-screen relative selection:bg-primary selection:text-white transition-colors duration-300">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="light-mesh dark:hidden w-full h-full absolute inset-0"></div>
        <div className="hidden dark:block w-full h-full absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 flex flex-col items-center justify-center text-center py-20">
          <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            404
          </div>
          <h1 className="mt-6 text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">
            页面走丢了
          </h1>
          <p className="mt-3 text-slate-500 dark:text-slate-400">
            你要找的页面不存在，或者已经被移动到了别处。
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <span className="material-icons-outlined text-base">home</span>
            回到首页
          </Link>
        </main>

        <Footer />
      </div>
    </div>
  );
}
