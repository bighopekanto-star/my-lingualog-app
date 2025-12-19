import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/header';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { LanguageProvider } from '@/context/language-context';

export const metadata: Metadata = {
  title: 'Co-Vibe',
  description: 'The Despair of "Couldn\'t AI Just Do This?"',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased')}>
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
