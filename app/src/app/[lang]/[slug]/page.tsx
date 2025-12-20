
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLanguageInfo, allLanguages, LanguageCode } from '@/lib/languages';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { format } from 'date-fns';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { marked } from 'marked';

type Props = {
  params: { lang: string, slug: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  const params = posts.flatMap(post => 
    allLanguages.map(lang => ({
      lang: lang.code,
      slug: post.slug,
    }))
  );
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  const lang = getLanguageInfo(params.lang) as { code: LanguageCode; name: string; };

  if (!post || !lang) {
    return {
      title: 'Post Not Found'
    }
  }

  const postContent = post.content[lang.code] || post.content.en;
  
  const imageUrl = post.image.startsWith('http') ? post.image : `https://${process.env.VERCEL_URL || 'localhost:9002'}${post.image}`;

  return {
    title: `${postContent.title} - LinguaLog`,
    description: postContent.description,
    openGraph: {
      title: postContent.title,
      description: postContent.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: postContent.title,
        },
      ],
    },
  }
}


export default async function PostPage({ params }: { params: { lang: LanguageCode, slug: string } }) {
  const langInfo = getLanguageInfo(params.lang);
  const post = getPostBySlug(params.slug);

  if (!langInfo || !post) {
    notFound();
  }

  const postContent = post.content[params.lang] || post.content.en;
  const parsedContent = await marked(postContent.body);


  return (
    <div className="container mx-auto py-12 px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        <Button variant="ghost" asChild className="mb-8">
          <Link href={`/${params.lang}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Stories
          </Link>
        </Button>
        <Card className="overflow-hidden">
          {post.image && (
             <div className="relative w-full aspect-video">
                <Image
                    src={post.image}
                    alt={postContent.title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl font-headline text-foreground">
              {postContent.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground pt-2">
              Posted on {format(new Date(post.date), 'MMMM d, yyyy')}
            </p>
          </CardHeader>
          <CardContent>
             <div
              className="prose dark:prose-invert max-w-none text-lg"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
             />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
