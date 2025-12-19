import { notFound } from 'next/navigation';
import { allLanguages } from '@/lib/languages';
import type { Metadata } from 'next';

type Props = {
  params: { lang: string };
};

export async function generateStaticParams() {
  return allLanguages.map((lang) => ({
    lang: lang.code,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const lang = allLanguages.find(l => l.code === params.lang);
  
  return {
    title: `${lang?.name ?? 'Language'} - Co-Vibe`,
    description: `Stories in ${lang?.name ?? 'a language'}.`,
  }
}


export default function LanguageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const isValidLang = allLanguages.some(lang => lang.code === params.lang);
  if (!isValidLang) {
    notFound();
  }

  return <div className="bg-white dark:bg-gray-900">{children}</div>;
}
