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

export default function Header() {
  const { language, setLanguage } = useLanguage();

  const currentLanguageName = getLanguageInfo(language)?.name || 'Language';

  return (
    <header className="bg-background/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold font-headline text-foreground">
          Co-Vibe
        </Link>
        
        <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  <span>{currentLanguageName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
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
