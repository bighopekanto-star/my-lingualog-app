'use client'

import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { getLanguageInfo } from '@/lib/languages';
import { format } from 'date-fns';
import Image from 'next/image';
import { useLanguage } from '@/context/language-context';
import React, { useMemo } from 'react';
import { getAllPosts, type Post } from '@/lib/posts';

// This component now fetches posts on the client side for simplicity
// and to avoid issues with 'fs' module on the browser.
function AllPosts() {
    const posts: Post[] = useMemo(() => getAllPosts(), []);
    return posts;
}

export default function LanguageHomePage({ params }: { params: { lang: string } }) {
  const resolvedParams = React.use(params);
  const langInfo = getLanguageInfo(resolvedParams.lang);
  const { language } = useLanguage();

  if (!langInfo) {
    notFound();
  }

  const posts = AllPosts();
  
  const content = {
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
  
  const pageContent = content[resolvedParams.lang as keyof typeof content] || content.en;


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
              <Link href={`/${language}/${post.slug}`} key={post.slug} className="group block">
                <Card className="w-full transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-2 overflow-hidden border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
                  <div className="md:flex">
                     <div className="md:w-2/5 xl:w-1/3">
                        {post.image && (
                          <div className="relative w-full aspect-[1.91/1] overflow-hidden">
                            <Image
                              src={post.image}
                              alt={post.content[language]?.title || post.content['en'].title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        )}
                      </div>
                      <div className="md:w-3/5 xl:w-2/3 flex flex-col justify-center p-6 lg:p-8">
                        <h3 className="text-xl lg:text-2xl font-bold mb-2 text-foreground dark:text-white">{post.content[language]?.title || post.content['en'].title}</h3>
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
