import type { Metadata } from "next";
import NotionContentPage from "../components/NotionContentPage";

export const metadata: Metadata = {
  title: "书架",
};

export default function BooksPage() {
  return <NotionContentPage slug="books" />;
}
