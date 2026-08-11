import type { Metadata } from "next";
import NotionContentPage from "../components/NotionContentPage";

export const metadata: Metadata = {
  title: "关于",
};

export default function AboutPage() {
  return <NotionContentPage slug="about" />;
}
