'use client';

import Link from 'next/link';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';

export default function Header() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <header className="bg-background/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold font-headline text-foreground">
          Co-Vibe
        </Link>
        
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleLanguage} aria-label="Toggle language">
              <Globe className="h-5 w-5" />
            </Button>
            <span className="text-sm text-muted-foreground w-10">{language === 'en' ? 'EN' : 'JP'}</span>
        </div>
      </nav>
    </header>
  );
}
