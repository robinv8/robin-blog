import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { siteConfig } from "../site.config";
import { LangProvider } from "./components/LangProvider";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.link),
  title: {
    default: "robin 的博客 | 记录生活，记录成长",
    template: "%s | robin 的博客",
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  alternates: {
    types: {
      "application/rss+xml": `${siteConfig.link}/feed`,
    },
  },
  openGraph: {
    title: "robin 的博客",
    description: siteConfig.description,
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
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&family=Noto+Serif+SC:wght@600;700;900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
      </head>
      <body
        className="antialiased bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200 min-h-screen relative selection:bg-primary selection:text-white transition-colors duration-300"
      >
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
