import type { Metadata } from "next";
import NotionContentPage from "../components/NotionContentPage";

export const metadata: Metadata = {
  title: "书架",
};

export default function BooksPage() {
  return (
    <NotionContentPage
      slug="books"
      no="04"
      zh="书架"
      en="BOOKSHELF"
      desc="读过的与在读的。"
      descEn="Books I have read and am reading."
    />
  );
}
