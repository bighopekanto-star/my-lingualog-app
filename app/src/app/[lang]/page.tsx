
import { notFound } from 'next/navigation';
import { getLanguageInfo } from '@/lib/languages';
import { getAllPosts } from '@/lib/posts';
import ClientLangHomePage from './client-lang-home-page';

export default function LanguageHomePage({ params }: { params: { lang: string } }) {
  const langInfo = getLanguageInfo(params.lang);

  if (!langInfo) {
    notFound();
  }

  const posts = getAllPosts();

  return <ClientLangHomePage posts={posts} lang={params.lang} />;
}
