import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { getLanguageInfo, allLanguages } from '@/lib/languages';
import { format } from 'date-fns';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

// This page will now show placeholder content.
// In the future, it will fetch posts from Firestore.
const mockPosts = [
    { slug: 'vol1', title: 'Blog Post 1', date: '2025-12-08', image: '/images/vol1-thumbnail.png' },
    { slug: 'vol2', title: 'Blog Post 2', date: '2025-12-09', image: '/images/vol2-thumbnail.png' },
    { slug: 'vol3', title: 'Blog Post 3', date: '2025-12-10', image: '/images/vol3-thumbnail.png' },
    { slug: 'vol4', title: 'Blog Post 4', date: '2025-12-18', image: '/images/vol4-thumbnail.png' },
]

export default function LanguageHomePage({ params }: { params: { lang: string } }) {
  const lang = getLanguageInfo(params.lang);

  if (!lang) {
    notFound();
  }

  const posts = mockPosts;
  
  const content = {
    en: {
      title: "All Stories",
      description: "A collection of all articles and development logs.",
      postedOn: "Posted on",
    },
    ja: {
      title: "すべての記事",
      description: "開発日誌を含む、すべての記事一覧です。",
      postedOn: "投稿日",
    },
    es: {
      title: "Todas las historias",
      description: "Una colección de todos los artículos y registros de desarrollo.",
      postedOn: "Publicado el",
    },
    fr: {
      title: "Toutes les histoires",
      description: "Une collection de tous les articles et journaux de développement.",
      postedOn: "Publié le",
    },
    pt: {
      title: "Todas as histórias",
      description: "Uma coleção de todos os artigos e registos de desenvolvimento.",
      postedOn: "Publicado em",
    },
    ko: {
      title: "모든 이야기",
      description: "모든 기사와 개발 로그 모음입니다.",
      postedOn: "게시일",
    },
    de: {
        title: "Alle Geschichten",
        description: "Eine Sammlung aller Artikel und Entwicklungsprotokolle.",
        postedOn: "Veröffentlicht am",
    }
  };
  
  const pageContent = content[params.lang as keyof typeof content] || content.en;


  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-foreground">
          {pageContent.title}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {pageContent.description}
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
                    {pageContent.postedOn} {format(new Date(post.date), 'MMMM d, yyyy')}
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
