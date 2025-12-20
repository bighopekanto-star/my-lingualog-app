'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { getLanguageInfo, LanguageCode } from '@/lib/languages';
import { format } from 'date-fns';
import Image from 'next/image';
import type { Post } from '@/lib/posts';
import React from 'react';
import { OrganicWave } from '@/components/layout/organic-wave';

export default function ClientHomePage({ posts }: { posts: Post[] }) {
  const { language, setLanguage } = useLanguage();
  const currentLang = getLanguageInfo(language)?.code || 'en';

  const featuredPost = posts[0];
  const otherPosts = posts.slice(1, 5);

  const content = {
    en: {
      title: "Trust the Vibe, not the Logic.",
      description: "An experimental blog that explores the world through the raw, unfiltered lens of language. We intentionally push aside AI translation to rediscover the struggles and joys of genuine communication.",
      featuredPost: "Featured Story",
      latestPosts: "Latest Stories",
      readMore: "Read More",
      allStories: "View All Stories",
      postedOn: "Posted on",
    },
    ja: {
      title: "ロジックより、バイブスを信じて。",
      description: "AI翻訳をあえて使わず、言葉の生々しいレンズを通して世界を探求する実験的なブログ。本物のコミュニケーションの苦闘と喜びを再発見します。",
      featuredPost: "注目のストーリー",
      latestPosts: "最新のストーリー",
      readMore: "続きを読む",
      allStories: "すべてのストーリーを見る",
      postedOn: "投稿日",
    },
     es: {
      title: "Confía en la Vibra, no en la Lógica.",
      description: "Un blog experimental que explora el mundo a través de la lente cruda y sin filtros del lenguaje. Dejamos de lado intencionadamente la traducción por IA para redescubrir las luchas y alegrías de la comunicación genuina.",
      featuredPost: "Historia Destacada",
      latestPosts: "Últimas Historias",
      readMore: "Leer Más",
      allStories: "Ver Todas las Historias",
      postedOn: "Publicado el",
    },
    fr: {
      title: "Faites Confiance à l'Ambiance, pas à la Logique.",
      description: "Un blog expérimental qui explore le monde à travers le prisme brut et non filtré de la langue. Nous mettons intentionnellement de côté la traduction par l'IA pour redécouvrir les difficultés et les joies d'une communication authentique.",
      featuredPost: "Histoire en Vedette",
      latestPosts: "Dernières Histoires",
      readMore: "Lire la Suite",
      allStories: "Voir Toutes les Histoires",
      postedOn: "Publié le",
    },
     pt: {
      title: "Confie na Vibração, não na Lógica.",
      description: "Um blog experimental que explora o mundo através da lente crua e não filtrada da linguagem. Deixamos intencionalmente de lado a tradução por IA para redescobrir as lutas e alegrias da comunicação genuína.",
      featuredPost: "História em Destaque",
      latestPosts: "Últimas Histórias",
      readMore: "Ler Mais",
      allStories: "Ver Todas as Histórias",
      postedOn: "Publicado em",
    },
    ko: {
      title: "논리보다는 분위기를 믿으세요.",
      description: "AI 번역을 의도적으로 배제하고, 가공되지 않은 언어의 렌즈를 통해 세상을 탐험하는 실험적인 블로그. 진정한 소통의 어려움과 즐거움을 재발견합니다.",
      featuredPost: "주요 스토리",
      latestPosts: "최신 스토리",
      readMore: "더 보기",
      allStories: "모든 스토리 보기",
      postedOn: "게시일",
    },
    de: {
        title: "Vertraue dem Vibe, nicht der Logik.",
        description: "Ein experimenteller Blog, der die Welt durch die rohe, ungefilterte Linse der Sprache erkundet. Wir verzichten bewusst auf KI-Übersetzungen, um die Kämpfe und Freuden echter Kommunikation wiederzuentdecken.",
        featuredPost: "Empfohlene Geschichte",
        latestPosts: "Neueste Geschichten",
        readMore: "Weiterlesen",
        allStories: "Alle Geschichten ansehen",
        postedOn: "Veröffentlicht am",
    }
  };

  const pageContent = content[currentLang as keyof typeof content] || content.en;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-deep-black text-white py-20 sm:py-32 md:py-40 flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.07] [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
        <OrganicWave />
        <div className="container relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-headline tracking-tighter !leading-tight mb-4">
            {pageContent.title}
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-white/70">
            {pageContent.description}
          </p>
           <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href={`/${currentLang}/`}>{pageContent.allStories}</Link>
              </Button>
            </div>
        </div>
      </section>


      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16 sm:py-24 bg-background">
          <div className="container mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold font-headline mb-8 text-center">{pageContent.featuredPost}</h2>
            <Link href={`/${currentLang}/${featuredPost.slug}`} className="group">
              <Card className="w-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 border-border/50">
                <div className="md:flex">
                  <div className="md:w-1/2 xl:w-[55%]">
                    {featuredPost.image && (
                      <div className="relative w-full aspect-video sm:aspect-[1.91/1]">
                        <Image
                          src={featuredPost.image}
                          alt={featuredPost.content[currentLang as LanguageCode]?.title || featuredPost.content['en'].title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          priority
                        />
                      </div>
                    )}
                  </div>
                  <div className="md:w-1/2 xl:w-[45%] flex flex-col justify-center p-6 sm:p-8 md:p-12">
                    <CardHeader className="p-0">
                      <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold font-headline mb-3">
                        {featuredPost.content[currentLang as LanguageCode]?.title || featuredPost.content['en'].title}
                      </CardTitle>
                      <CardDescription className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                        {featuredPost.content[currentLang as LanguageCode]?.description || featuredPost.content['en'].description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="p-0 mt-6 flex-col items-start">
                      <p className="text-sm text-muted-foreground mb-4">
                        {pageContent.postedOn} {format(new Date(featuredPost.date), 'MMMM d, yyyy')}
                      </p>
                      <div className="text-primary font-semibold flex items-center">
                        {pageContent.readMore} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </section>
      )}


      {/* Latest Posts */}
      {otherPosts.length > 0 && (
        <section className="py-16 sm:py-24 bg-secondary/50 dark:bg-black/20">
          <div className="container mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold font-headline mb-12 text-center">{pageContent.latestPosts}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherPosts.map((post) => (
                <Link href={`/${currentLang}/${post.slug}`} key={post.slug} className="group">
                  <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1.5 border-border/50">
                     <div className="relative w-full aspect-video">
                        <Image
                          src={post.image}
                          alt={post.content[currentLang as LanguageCode]?.title || post.content['en'].title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl font-bold group-hover:text-primary">
                          {post.content[currentLang as LanguageCode]?.title || post.content['en'].title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground pt-2">
                          {pageContent.postedOn} {format(new Date(post.date), 'MMMM d, yyyy')}
                        </p>
                      </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}