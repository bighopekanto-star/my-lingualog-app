import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getLanguage } from '@/lib/languages';
import { ArrowRight } from 'lucide-react';

export default function LanguageHomePage({ params }: { params: { lang: string } }) {
  const lang = getLanguage(params.lang);

  if (!lang) {
    notFound();
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-primary">
          {lang.name} Posts
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          A collection of posts and articles in {lang.name}.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="transition-shadow hover:shadow-lg">
          <CardHeader>
            <CardTitle>{lang.hello}</CardTitle>
            <CardDescription>Posted just now</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6">This is a sample post to demonstrate the language-specific section.</p>
            <Button asChild>
              <Link href={`/${lang.code}/hello-world`}>Read More <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
