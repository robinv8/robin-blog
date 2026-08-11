import React from 'react';
import { getAllPosts } from '@/lib/notion';
import HomeClient from './components/HomeClient';
import dayjs from 'dayjs';

export default async function Home() {
  const posts = (await getAllPosts({ onlyPost: true })) || [];
  const earliest = posts.length ? posts[posts.length - 1].date : null;
  const since = earliest ? dayjs(earliest).format('YYYY') : '2018';

  return <HomeClient posts={posts} since={since} />;
}
