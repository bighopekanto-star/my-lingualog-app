'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/language-context';
import Link from 'next/link';

// This is now a placeholder. In the future, this will be fetched from Firestore.
const manifestoContent = {
    en: {
        title: "If the 'language barrier' disappeared, would we be happy? - A development story of a complete amateur fighting the singularity",
        content: `Well, hello. It's nice to meet you. This is actually the very first post on this blog...`
    },
    ja: {
        title: "「言葉の壁」が消えたら、僕らは幸せになれるのか？ーシンギュラリティと戦うド素人の開発記",
        content: `どうも。はじめまして。 これ、実は記念すべきブログの初回なんですが...`
    },
    // Add other languages here
    es: { title: "", content: "" },
    fr: { title: "", content: "" },
    pt: { title: "", content: "" },
    ko: { title: "", content: "" },
    de: { title: "", content: "" },
}

export default function Home() {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const content = {
    en: {
      heroTitle: "The Despair of 'Couldn't AI Just Do This?'",
      leadText: "In an age of structural necessity, humans are becoming the bottleneck. What value remains for us? This is why I built an intentionally inconvenient app.",
      ctaButton: "Enter Co-Vibe / Connect",
      moreStories: "More Stories",
      manifesto: manifestoContent.en
    },
    ja: {
      heroTitle: "「これ、AIでよくない？」という絶望。",
      leadText: "構造的必然として人間が淘汰される時代。私たちが最後に残せる価値とは何か？ あえて「不便なアプリ」を作った理由。",
      ctaButton: "Co-Vibeを始める / 接続",
      moreStories: "他の記事を読む",
      manifesto: manifestoContent.ja
    },
    es: { heroTitle: "", leadText: "", ctaButton: "", moreStories: "", manifesto: manifestoContent.es},
    fr: { heroTitle: "", leadText: "", ctaButton: "", moreStories: "", manifesto: manifestoContent.fr},
    pt: { heroTitle: "", leadText: "", ctaButton: "", moreStories: "", manifesto: manifestoContent.pt},
    ko: { heroTitle: "", leadText: "", ctaButton: "", moreStories: "", manifesto: manifestoContent.ko},
    de: { heroTitle: "", leadText: "", ctaButton: "", moreStories: "", manifesto: manifestoContent.de},
  };

  const { heroTitle, leadText, ctaButton, moreStories, manifesto } = content[language];

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
            >
                <h2>{manifesto.title}</h2>
                <p>{manifesto.content}</p>
            </div>
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
