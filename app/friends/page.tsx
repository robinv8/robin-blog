import type { Metadata } from "next";
import NotionContentPage from "../components/NotionContentPage";

export const metadata: Metadata = {
  title: "友链",
};

export default function FriendsPage() {
  return <NotionContentPage slug="friends" />;
}
