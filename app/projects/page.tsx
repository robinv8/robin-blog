import type { Metadata } from "next";
import { getAllPosts, getPostBlocks } from "@/lib/notion";
import { loadTokenUsage } from "@/lib/token-usage";
import type { Post } from "@/schema/post";
import SiteHeader from "../components/Header";
import Footer from "../components/Footer";
import { PageShell, PageHero, SectionLabel } from "../components/Page";
import { NotionPageRenderer } from "../components/NotionPageRenderer";
import ProjectsLog from "../components/ProjectsLog";
import WorkCases from "../components/WorkCases";

export const metadata: Metadata = {
  title: "作品",
  description: "MindMux、brain.md、Apache Answer 与思否主站迁移 Next.js 的作品案例。",
};

export default async function ProjectsPage() {
  const usage = await loadTokenUsage();
  const pages = (await getAllPosts({ onlyPage: true })) as Post[] | null;
  const page = pages?.find((p) => p.slug === "projects");
  const blockMap = page ? await getPostBlocks(page.id) : null;

  return (
    <PageShell>
      <SiteHeader />
      <PageHero
        zh="作品"
        en="Work"
        desc="把 AI 产品从 0 做到 1，也在开源社区里长期维护。下面是四个案例、一些笔记，以及正在进行的事。"
        descEn="Taking AI products from zero to one, and maintaining open source for the long haul. Four case studies, some notes, and what I'm working on now."
      />

      <main>
        <WorkCases />

        {blockMap ? (
          <section className="mb-24">
            <SectionLabel no="02" zh="笔记" en="notes" />
            <article className="notion-content max-w-3xl">
              <NotionPageRenderer recordMap={blockMap} />
            </article>
          </section>
        ) : null}

        <ProjectsLog usage={usage} />
      </main>

      <Footer />
    </PageShell>
  );
}
