import type { Metadata } from "next";
import NotionContentPage from "../components/NotionContentPage";

export const metadata: Metadata = {
  title: "友链",
};

export default function FriendsPage() {
  return (
    <NotionContentPage
      slug="friends"
      no="06"
      zh="友链"
      en="FRIENDS"
      desc="朋友们的站点。"
      descEn="Sites of my friends."
    />
  );
}
