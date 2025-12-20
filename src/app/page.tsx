import { getAllPosts } from '@/lib/posts';
import ClientHomePage from '@/app/client-home-page';

export default function Home() {
  const posts = getAllPosts();
  return <ClientHomePage posts={posts} />;
}
