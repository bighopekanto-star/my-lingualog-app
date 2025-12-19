import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { allLanguages, type LanguageCode } from './languages';

const postsDirectory = path.join(process.cwd(), 'src/posts');

export type PostContent = {
  title: string;
  description: string;
  body: string;
};

export type Post = {
  slug: string;
  date: string;
  image: string;
  content: Record<LanguageCode, PostContent>;
};

function getPostSlugs() {
  // Assume all languages have the same slugs. Read from 'en' directory.
  const enDirectory = path.join(postsDirectory, 'en');
  try {
    const fileNames = fs.readdirSync(enDirectory);
    return fileNames.map((fileName) => fileName.replace(/\.md$/, ''));
  } catch (error) {
    console.error("Could not read 'en' posts directory:", error);
    return [];
  }
}

export function getPostBySlug(slug: string): Post | null {
  const postData: any = {
    slug,
    content: {},
  };

  let found = false;

  for (const lang of allLanguages) {
    const fullPath = path.join(postsDirectory, lang.code, `${slug}.md`);
    if (fs.existsSync(fullPath)) {
      found = true;
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      if (!postData.date) postData.date = data.date;
      if (!postData.image) postData.image = data.image;

      postData.content[lang.code] = {
        title: data.title,
        description: data.description,
        body: content,
      };
    } else {
        // Fallback content if a language is missing
        postData.content[lang.code] = {
            title: `(No translation for ${lang.name})`,
            description: '',
            body: ''
        }
    }
  }

  return found ? (postData as Post) : null;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    // Sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
