import { getAllPosts } from '@/lib/posts';
import ClientHomePage from '@/app/client-home-page';

export default function Home() {
  const posts = getAllPosts();
  console.log('[DEBUG] Home page received posts. Count:', posts.length);
  // console.log('[DEBUG] Full posts data:', JSON.stringify(posts, null, 2));
  return <ClientHomePage posts={posts} />;
}
