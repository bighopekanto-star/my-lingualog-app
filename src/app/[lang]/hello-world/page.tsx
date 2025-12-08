import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLanguage } from '@/lib/languages';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function HelloWorldPage({ params }: { params: { lang: string } }) {
  const lang = getLanguage(params.lang);

  if (!lang) {
    notFound();
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Button variant="ghost" asChild className="mb-8">
          <Link href={`/${lang.code}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to {lang.name} posts
          </Link>
        </Button>
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl font-headline text-primary">
              {lang.hello}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-lg leading-relaxed space-y-6">
            <p>
              This is the classic "Hello, World!" example, presented here as a sample blog post. 
              In programming, it's often the very first program developers write when learning a new language or setting up a new environment.
            </p>
            <p>
              Its purpose is simple: to verify that the system is operational and can correctly produce output. For LinguaLog, it serves to confirm that our multi-language routing and content structure are working as expected for the <strong>{lang.name}</strong> section.
            </p>
            <blockquote className="border-l-4 border-primary/50 pl-4 italic text-muted-foreground">
              The tradition of using the phrase "Hello, world!" as a test message was influenced by an example program in the seminal 1978 book <cite>The C Programming Language</cite>.
            </blockquote>
            <p>
              Thank you for visiting! You can navigate to other language sections using the globe icon in the header.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
