
import React from 'react';
import { NotionRenderer } from 'react-notion-x';
import { getPostBlocks, getAllPosts } from '@/lib/notion';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { siteConfig } from '../../../site.config';
import Comments from '../../components/Comments';
import Footer from '../../components/Footer';
import dayjs from 'dayjs';

// Styles for react-notion-x
// import 'react-notion-x/src/styles.css' // We might need to handle CSS imports globally or here if supported by Next.js App Router server components? 
// Actually NotionRenderer is a client component usually? Or compatible? 
// react-notion-x 7.x supports SSR but styles need to be imported.
// In App Router, we should likely create a Client Component wrapper for the Renderer if it uses interactive features or Context.
// For now, let's try direct import if it doesn't break, or move Renderer to a client component.

import { NotionPageRenderer } from './NotionPageRenderer'; // We'll create this wrapper

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = await getAllPosts({ onlyPost: true }) as any[];
  const post = posts?.find(t => t.slug === slug);
  const relatedPosts = posts?.filter(p => p.slug !== slug).slice(0, 3) || [];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Post not found</h1>
      </div>
    );
  }

  const blockMap = await getPostBlocks(post.id);

  return (
    <div className="font-sans antialiased text-slate-800 dark:text-slate-200 min-h-screen relative selection:bg-primary selection:text-white transition-colors duration-300">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="light-mesh dark:hidden w-full h-full absolute inset-0"></div>
        <div className="hidden dark:block w-full h-full absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black"></div>
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-60 dark:opacity-20 animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-3xl opacity-60 dark:opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-8 items-start">
          <main className="min-w-0">
            <article className="glass-card p-6 md:p-10 rounded-3xl relative overflow-hidden mb-8">
              <header className="mb-8 border-b border-slate-200/60 dark:border-slate-700/60 pb-8">
                <div className="flex items-center gap-3 mb-5">
                  <span className="px-3 py-1 text-xs font-semibold tracking-wide text-blue-600 bg-blue-100/50 dark:bg-blue-500/20 dark:text-blue-300 rounded-full">
                    Post
                  </span>
                  <time className="text-xs text-slate-400 font-mono flex items-center gap-1">
                    <span className="material-icons-outlined text-sm">calendar_today</span>
                    {dayjs(post.date).format('MMM D, YYYY')}
                  </time>
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 dark:text-slate-100 leading-tight">
                  {post.title}
                </h1>
              </header>

              <div className="notion-content">
                {/* Notion Page Renderer */}
                <NotionPageRenderer recordMap={blockMap} />
              </div>

              {/* Comments */}
              <Comments />
            </article>

            {/* Comments and other sections can be re-added or made dynamic later */}
          </main>

          <Sidebar recordMap={blockMap} relatedPosts={relatedPosts} />
        </div>

        <Footer />
      </div>
    </div>
  );
}

// Generate static params for cleaner SSG
export async function generateStaticParams() {
  const posts = await getAllPosts({ onlyPost: true }) as any[];
  return posts?.map((post) => ({
    slug: post.slug,
  })) || [];
}
