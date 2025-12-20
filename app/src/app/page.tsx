
import { getAllPosts } from '@/lib/posts';
import { LanguageCode } from '@/lib/languages';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
} from '@/components/ui/card';

// Content for the default English homepage
const content = {
  title: "All Stories",
  description: "A collection of all articles and development logs.",
  postedOn: "Posted on",
};

export default function HomePage() {
  const posts = getAllPosts();
  const lang = "en" as LanguageCode;

  return (
    <div className="bg-background py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-foreground">
            {content.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {content.description}
          </p>
        </div>

        <div className="space-y-12">
          {posts.map((post) => (
            <Link href={`/${lang}/${post.slug}`} key={post.slug} className="group block">
              <Card className="w-full transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-2 overflow-hidden border-gray-200 dark:border-gray-800 bg-card">
                <div className="md:flex">
                  <div className="md:w-2/5 xl:w-1/3">
                    {post.image && (
                      <div className="relative w-full h-full min-h-[200px] md:min-h-0 aspect-video md:aspect-[1.91/1] overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.content[lang]?.title || post.content['en'].title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                  </div>
                  <div className="md:w-3/5 xl:w-2/3 flex flex-col justify-center p-6 lg:p-8">
                    <h3 className="text-xl lg:text-2xl font-bold mb-2 text-foreground">{post.content[lang]?.title || post.content['en'].title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {content.postedOn} {format(new Date(post.date), 'MMMM d, yyyy')}
                    </p>
                    <p className="text-base text-muted-foreground line-clamp-2">{post.content[lang]?.description || post.content['en'].description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
