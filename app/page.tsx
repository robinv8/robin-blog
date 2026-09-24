import { getAllPosts } from '@/lib/notion';
import HomeClient from './components/HomeClient';

export default async function Home() {
  const posts = (await getAllPosts({ onlyPost: true })) || [];
  return <HomeClient posts={posts} />;
}
