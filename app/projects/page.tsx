import type { Metadata } from "next";
import NotionContentPage from "../components/NotionContentPage";

export const metadata: Metadata = {
  title: "项目",
};

export default function ProjectsPage() {
  return (
    <NotionContentPage
      slug="projects"
      no="03"
      zh="项目"
      en="WORKS"
      desc="做点儿有趣的东西。"
      descEn="Things I have built for fun."
    />
  );
}
