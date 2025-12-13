import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLanguage, languages } from '@/lib/languages';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getPostData, getPostSlugs } from '@/lib/posts';
import { format } from 'date-fns';
import type { Metadata } from 'next';
import Image from 'next/image';

type Props = {
  params: { lang: string, slug: string }
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  const params = languages.flatMap(lang => 
    slugs.map(slug => ({ lang: lang.code, slug }))
  );
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostData(params.lang, params.slug);
  const lang = getLanguage(params.lang);

  if (!post || !lang) {
    return {
      title: 'Post Not Found'
    }
  }
  
  const imageUrl = post.image.startsWith('http') ? post.image : `${process.env.VERCEL_URL ? 'https' : 'http'}://${process.env.VERCEL_URL || 'localhost:3000'}${post.image}`;

  return {
    title: `${post.title} - ${lang.name}`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  }
}


export default async function PostPage({ params }: { params: { lang: string, slug: string } }) {
  const lang = getLanguage(params.lang);
  const post = await getPostData(params.lang, params.slug);

  if (!lang || !post) {
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
          {post.image && (
             <div className="relative w-full aspect-video">
                <Image
                    src={post.image}
                    alt={post.title}
                    width={1200}
                    height={630}
                    className="object-cover w-full"
                    priority
                />
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl font-headline text-primary">
              {post.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground pt-2">
              Posted on {format(new Date(post.date), 'MMMM d, yyyy')}
            </p>
          </CardHeader>
          <CardContent>
             <div
              className="prose dark:prose-invert max-w-none text-lg leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
