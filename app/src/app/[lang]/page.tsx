import { notFound } from 'next/navigation';
import { getLanguageInfo } from '@/lib/languages';
import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import Image from 'next/image';
import type { Post } from '@/lib/posts';
import React from 'react';
import type { LanguageCode } from '@/lib/languages';

const pageContentData = {
    en: {
      title: "All Stories",
      description: "A collection of all articles and development logs.",
      postedOn: "Posted on",
    },
    ja: {
      title: "すべての記事",
      description: "開発日誌を含む、すべての記事一覧です。",
      postedOn: "投稿日",
    },
    es: {
      title: "Todas las historias",
      description: "Una colección de todos los artículos y registros de desarrollo.",
      postedOn: "Publicado el",
    },
    fr: {
      title: "Toutes les histoires",
      description: "Une collection de tous les articles et journaux de développement.",
      postedOn: "Publié le",
    },
    pt: {
      title: "Todas as histórias",
      description: "Uma coleção de todos os artigos e registos de desenvolvimento.",
      postedOn: "Publicado em",
    },
    ko: {
      title: "모든 이야기",
      description: "모든 기사와 개발 로그 모음입니다.",
      postedOn: "게시일",
    },
    de: {
        title: "Alle Geschichten",
        description: "Eine Sammlung aller Artikel und Entwicklungsprotokolle.",
        postedOn: "Veröffentlicht am",
    }
};

export default function LanguageHomePage({ params }: { params: { lang: string } }) {
  const langInfo = getLanguageInfo(params.lang);

  if (!langInfo) {
    notFound();
  }

  const posts = getAllPosts();
  const currentLang = params.lang as LanguageCode;
  const pageContent = pageContentData[currentLang] || pageContentData.en;

  return (
    <div className="bg-white dark:bg-gray-900 py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-foreground dark:text-white">
            {pageContent.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {pageContent.description}
          </p>
        </div>

        <div className="space-y-12">
            {posts.map((post) => (
              <Link href={`/${currentLang}/${post.slug}`} key={post.slug} className="group block">
                <Card className="w-full transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-2 overflow-hidden border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
                  <div className="md:flex">
                     <div className="md:w-2/5 xl:w-1/3">
                        {post.image && (
                          <div className="relative w-full aspect-[1.91/1] overflow-hidden">
                            <Image
                              src={post.image}
                              alt={post.content[currentLang]?.title || post.content['en'].title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        )}
                      </div>
                      <div className="md:w-3/5 xl:w-2/3 flex flex-col justify-center p-6 lg:p-8">
                        <h3 className="text-xl lg:text-2xl font-bold mb-2 text-foreground dark:text-white">{post.content[currentLang]?.title || post.content['en'].title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {pageContent.postedOn} {format(new Date(post.date), 'MMMM d, yyyy')}
                        </p>
                      </div>
                   </div>
                </Card>
              </Link>
            ))}
          </div>
      </div>
    </div>
  );
}