import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-20 pt-5 pb-10 border-t border-[#1B1B18]/15 dark:border-[#E8E6DF]/15 flex flex-col md:flex-row justify-between gap-2 font-mono text-[10px] tracking-[0.2em] text-current/35">
      <p>© 2018 — 2026 ROBIN<span className="text-[#FF4D00]">®</span></p>
      <p className="flex gap-5">
        <a href="/feed" className="u-link hover:text-[#FF4D00] transition-colors">RSS</a>
        <a href="/sitemap.xml" className="u-link hover:text-[#FF4D00] transition-colors">SITEMAP</a>
        <span>DESIGNED & BUILT WITH AGENTS · CC BY-SA 4.0</span>
      </p>
    </footer>
  );
}
