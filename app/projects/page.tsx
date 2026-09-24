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
import WorksList from "./WorksList";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "作品",
  description: "brain.md、Apache Answer 与思否主站迁移 Next.js 的作品案例，以及在线的产品。",
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
        desc="把 AI 产品从 0 做到 1，也在开源社区里长期维护。下面是三个案例、在线的产品、一些笔记，以及正在进行的事。"
        descEn="Taking AI products from zero to one, and maintaining open source for the long haul. Three case studies, shipped products, some notes, and what I'm working on now."
      />

      <main>
        <WorkCases />
        <WorksList />

        {blockMap ? (
          <section className="mb-24">
            <SectionLabel no="03" zh="笔记" en="notes" />
            <article className="notion-content max-w-3xl">
              <NotionPageRenderer recordMap={blockMap} />
            </article>
          </section>
        ) : null}

        <ProjectsLog usage={usage} notesShown={Boolean(blockMap)} />
      </main>

      <Footer />
    </PageShell>
  );
}
