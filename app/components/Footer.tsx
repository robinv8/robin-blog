import Link from "next/link";
import Toggles from "./Toggles";
import { siteConfig } from "@/site.config";

export default function Footer() {
  return (
    <footer className="mt-24 flex flex-col justify-between gap-3 border-t border-bl-line pt-7 pb-16 font-mono text-xs text-bl-muted md:flex-row">
      <span>
        © 2014–{new Date().getFullYear()} Robin Ren ·{" "}
        <a href={`mailto:${siteConfig.email}`} className="hover:text-bl-fg transition-colors">
          {siteConfig.email}
        </a>
      </span>
      <div className="flex gap-5">
        <Toggles />
        <Link href="/feed" className="hover:text-bl-fg transition-colors">rss</Link>
        <a href="/sitemap.xml" className="hover:text-bl-fg transition-colors">sitemap</a>
      </div>
    </footer>
  );
}
