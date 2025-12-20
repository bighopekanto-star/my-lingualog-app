
import { getAllPosts } from '@/lib/posts';
import ClientLangHomePage from './[lang]/client-lang-home-page';

export default function HomePage() {
  const posts = getAllPosts();
  return <ClientLangHomePage posts={posts} lang="en" />;
}
