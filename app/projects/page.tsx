import type { Metadata } from "next";
import NotionContentPage from "../components/NotionContentPage";

export const metadata: Metadata = {
  title: "项目",
};

export default function ProjectsPage() {
  return <NotionContentPage slug="projects" />;
}
