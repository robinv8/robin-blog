import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { siteConfig } from "../site.config";
import { LangProvider } from "./components/LangProvider";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.link),
  title: {
    default: "任裕斌 Robin Ren — 创始工程师，把 AI 产品从 0 做到 1",
    template: "%s | Robin Ren",
  },
  description: "创始工程师，把 AI 产品从 0 做到 1。Apache Answer PMC 成员，前思否前端架构师。",
  keywords: siteConfig.keywords,
  alternates: {
    types: {
      "application/rss+xml": `${siteConfig.link}/feed`,
    },
  },
  openGraph: {
    title: "任裕斌 Robin Ren — Founding Engineer",
    description: "创始工程师，把 AI 产品从 0 做到 1。Apache Answer PMC 成员，前思否前端架构师。",
    url: siteConfig.link,
    siteName: siteConfig.title,
    locale: siteConfig.language,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="relative min-h-screen bg-bl-bg text-bl-fg antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LangProvider>{children}</LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
