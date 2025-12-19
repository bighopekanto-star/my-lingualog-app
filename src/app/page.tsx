'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';
import Link from 'next/link';
import {
  Card,
} from '@/components/ui/card';
import { format } from 'date-fns';
import Image from 'next/image';
import { OrganicWave } from '@/components/layout/organic-wave';
import { motion } from 'framer-motion';
import type { Post } from '@/lib/posts';
import React from 'react';

export default function Home() {
  const { language } = useLanguage();
  // TODO: This should be fetched from the client side.
  const posts: Post[] = [];

  const content = {
    en: {
      mainHeadline: "Trust the Vibe, not the Logic.",
      subHeadline: "AI gives perfect answers. Here is a place to get lost in unanswerable questions together.",
      ctaButton: "Connect Raw Voice",
      latestStories: "Latest Stories",
      postedOn: "Posted on",
    },
    ja: {
      mainHeadline: "「正しさ」よりも、「揺らぎ」を。",
      subHeadline: "AIは完璧な答えをくれる。ここは、答えのない問いに共に迷うための場所。",
      ctaButton: "生の声を繋ぐ",
      latestStories: "最新の記事",
      postedOn: "投稿日",
    },
     es: {
      mainHeadline: "Confía en la Vibra, no en la Lógica.",
      subHeadline: "La IA da respuestas perfectas. Este es un lugar para perderse juntos en preguntas sin respuesta.",
      ctaButton: "Conectar Voz Cruda",
      latestStories: "Últimas Historias",
      postedOn: "Publicado el",
    },
    fr: {
      mainHeadline: "Faites confiance à l'Ambiance, pas à la Logique.",
      subHeadline: "L'IA donne des réponses parfaites. Voici un endroit pour se perdre ensemble dans des questions sans réponse.",
      ctaButton: "Connecter la Voix Brute",
      latestStories: "Dernières Histoires",
      postedOn: "Publié le",
    },
    pt: {
      mainHeadline: "Confie na Vibração, não na Lógica.",
      subHeadline: "A IA dá respostas perfeitas. Aqui é um lugar para se perder em perguntas sem resposta juntos.",
      ctaButton: "Conectar Voz Crua",
      latestStories: "Últimas Histórias",
      postedOn: "Publicado em",
    },
    ko: {
      mainHeadline: "논리보다, 분위기를 믿으세요.",
      subHeadline: "AI는 완벽한 답을 제공합니다. 여기는 답 없는 질문에 함께 빠져들기 위한 장소입니다.",
      ctaButton: "날것의 목소리 연결",
      latestStories: "최신 기사",
      postedOn: "게시일",
    },
    de: {
        mainHeadline: "Vertraue dem Vibe, nicht der Logik.",
        subHeadline: "KI gibt perfekte Antworten. Hier ist ein Ort, um sich gemeinsam in unbeantwortbaren Fragen zu verlieren.",
        ctaButton: "Rohe Stimme verbinden",
        latestStories: "Neueste Geschichten",
        postedOn: "Veröffentlicht am",
    }
  };

  const pageContent = content[language];
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-[50vh] min-h-[400px] md:h-screen md:min-h-[600px] bg-deep-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
           <OrganicWave />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold max-w-4xl">
             {language === 'en' ? (
              <>Trust the <span className="text-primary italic">Vibe</span>, not the Logic.</>
            ) : (
              pageContent.mainHeadline
            )}
          </h1>
          <p className="mt-6 text-base md:text-xl text-gray-400 max-w-2xl">
            {pageContent.subHeadline}
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10"
          >
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground text-lg px-8 py-6 rounded-full transition-all duration-300"
            >
              {pageContent.ctaButton}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Article List Section */}
      <section className="flex-grow bg-white dark:bg-gray-900 py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground dark:text-white">{pageContent.latestStories}</h2>
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
                              alt={post.content[language as keyof typeof post.content]?.title || post.content['en'].title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        )}
                      </div>
                      <div className="md:w-3/5 xl:w-2/3 flex flex-col justify-center p-6 lg:p-8">
                        <h3 className="text-xl lg:text-2xl font-bold mb-2 text-foreground dark:text-white">{post.content[language as keyof typeof post.content]?.title || post.content['en'].title}</h3>
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
      </section>
    </div>
  );
}
