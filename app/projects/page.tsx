import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { PageShell, PageHero } from "../components/Page";
import { loadTokenUsage } from "@/lib/token-usage";
import WorksList from "./WorksList";
import TokenUseLog from "./TokenUseLog";

export const metadata: Metadata = {
  title: "项目",
  description: "做点儿有趣的东西。",
};

export default async function ProjectsPage() {
  const tokenUsage = await loadTokenUsage();

  return (
    <PageShell>
      <Header />
      <PageHero
        no="03"
        zh="项目"
        en="WORKS"
        desc="做点儿有趣的东西。"
        descEn="Things I have built for fun."
      />

      <main className="pb-16">
        <WorksList />
        <TokenUseLog data={tokenUsage} />
      </main>

      <Footer />
    </PageShell>
  );
}
