import { notFound } from 'next/navigation';
import { getLanguageInfo } from '@/lib/languages';
import { getAllPosts } from '@/lib/posts';
import ClientLangHomePage from './client-lang-home-page';
import { use } from 'react';

export default function LanguageHomePage({ params }: { params: { lang: string } }) {
  const safeParams = use(params);
  const langInfo = getLanguageInfo(safeParams.lang);

  if (!langInfo) {
    notFound();
  }

  const posts = getAllPosts();

  return <ClientLangHomePage posts={posts} lang={safeParams.lang} />;
}
