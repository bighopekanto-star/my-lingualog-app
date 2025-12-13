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
import { getAllPosts } from '@/lib/posts';
import { format } from 'date-fns';
import Image from 'next/image';

export default function LanguageHomePage({ params }: { params: { lang: string } }) {
  const lang = getLanguage(params.lang);

  if (!lang) {
    notFound();
  }

  const posts = getAllPosts(lang.code);

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link href={`/${lang.code}/${post.slug}`} key={post.slug} className="group flex">
            <Card className="flex flex-col w-full transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:-translate-y-1 group-hover:border-primary overflow-hidden">
              {post.image && (
                <div className="relative w-full aspect-video overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex flex-col flex-grow p-6">
                <CardHeader className="p-0">
                  <CardTitle className="mb-2">{post.title}</CardTitle>
                  <CardDescription>
                    Posted on {format(new Date(post.date), 'MMMM d, yyyy')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 mt-auto pt-4">
                  <div className="flex justify-end">
                     <ArrowRight className="w-6 h-6 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                </CardContent>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
