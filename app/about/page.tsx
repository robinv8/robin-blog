import type { Metadata } from "next";
import NotionContentPage from "../components/NotionContentPage";

export const metadata: Metadata = {
  title: "关于",
};

export default function AboutPage() {
  return (
    <NotionContentPage
      slug="about"
      no="05"
      zh="关于"
      en="ABOUT"
      desc="认识一下我。"
      descEn="A little bit about me."
    />
  );
}
