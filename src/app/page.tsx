'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import type { Post } from '@/lib/posts';
import { useLanguage } from '@/context/language-context';
import Link from 'next/link';
import { getManifestoPost } from './actions';

const MANIFESTO_SLUG = 'vol1';

export default function Home() {
  const { language } = useLanguage();
  const [manifesto, setManifesto] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchManifesto() {
      setIsLoading(true);
      try {
        const postData = await getManifestoPost(language, MANIFESTO_SLUG);
        if (postData) {
          setManifesto({
            slug: postData.slug,
            title: postData.title,
            description: postData.description,
            date: postData.date,
            image: postData.image,
            content: postData.content,
          });
        } else {
          setManifesto(null);
        }
      } catch (error) {
        console.error('Failed to fetch manifesto:', error);
        setManifesto(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchManifesto();
  }, [language]);

  const content = {
    en: {
      heroTitle: "The Despair of 'Couldn't AI Just Do This?'",
      leadText: "In an age of structural necessity, humans are becoming the bottleneck. What value remains for us? This is why I built an intentionally inconvenient app.",
      ctaButton: "Enter Co-Vibe / Connect",
      moreStories: "More Stories",
    },
    ja: {
      heroTitle: "「これ、AIでよくない？」という絶望。",
      leadText: "構造的必然として人間が淘汰される時代。私たちが最後に残せる価値とは何か？ あえて「不便なアプリ」を作った理由。",
      ctaButton: "Co-Vibeを始める / 接続",
      moreStories: "他の記事を読む",
    },
  };

  const { heroTitle, leadText, ctaButton, moreStories } = content[language];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Hero Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-foreground">
            {heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {leadText}
          </p>
        </header>

        {/* CTA Button (optional, can be placed here) */}
        <div className="flex justify-center mb-16">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            {ctaButton}
          </Button>
        </div>

        {/* Main Content (The Manifesto) */}
        <article>
          {isLoading ? (
            <p>Loading...</p>
          ) : manifesto ? (
            <div
              className="prose dark:prose-invert max-w-none text-lg leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: manifesto.content }}
            />
          ) : (
            <p>Manifesto could not be loaded.</p>
          )}
        </article>
        
        {/* Footer / More Stories */}
        <footer className="mt-20 text-center">
            <Link href={`/${language}`} className="text-primary hover:underline text-lg">
                {moreStories} &rarr;
            </Link>
        </footer>
      </div>
    </div>
  );
}
