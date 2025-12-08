import { notFound } from 'next/navigation';
import { languages } from '@/lib/languages';
import type { Metadata } from 'next';

type Props = {
  params: { lang: string };
};

export async function generateStaticParams() {
  return languages.map((lang) => ({
    lang: lang.code,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const lang = languages.find(l => l.code === params.lang);
  
  return {
    title: `${lang?.name ?? 'Language'} - LinguaLog`,
    description: `Posts in ${lang?.name ?? 'a language'}.`,
  }
}


export default function LanguageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const isValidLang = languages.some(lang => lang.code === params.lang);
  if (!isValidLang) {
    notFound();
  }

  return <>{children}</>;
}
