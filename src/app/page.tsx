import { getAllPosts } from '@/lib/posts';
import ClientHomePage from '@/app/client-home-page';

export default async function Home() {
  const posts = getAllPosts();

  return <ClientHomePage posts={posts} />;
}
