import { getAllPosts } from '@/lib/posts';
import ClientLangHomePage from './[lang]/client-lang-home-page';

// This component will render the English version of the homepage at the root URL.
export default function RootPage() {
  const posts = getAllPosts();
  // We'll default the root page to English.
  return <ClientLangHomePage posts={posts} lang="en" />;
}
