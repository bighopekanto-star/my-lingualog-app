'use client';

import Link from 'next/link';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';
import { allLanguages, getLanguageInfo } from '@/lib/languages';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  const currentLanguageName = getLanguageInfo(language)?.name || 'Language';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <header className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 dark:bg-gray-950/80 backdrop-blur-sm shadow-md" : "bg-transparent"
      )}>
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold font-headline text-foreground dark:text-white">
          Co-Vibe
        </Link>
        
        <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                    variant="outline" 
                    className={cn(
                        "flex items-center gap-2 transition-colors",
                         isScrolled ? "text-foreground bg-background/50" : "text-white border-white/50 bg-transparent hover:bg-white/10 hover:text-white"
                    )}
                >
                  <Globe className="h-5 w-5" />
                  <span>{currentLanguageName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup value={language} onValueChange={(value) => setLanguage(value as any)}>
                  {allLanguages.map((lang) => (
                    <DropdownMenuRadioItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}
