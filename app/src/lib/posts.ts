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
  let hasError = false;

  for (const lang of allLanguages) {
    const fullPath = path.join(postsDirectory, lang.code, `${slug}.md`);
    if (fs.existsSync(fullPath)) {
      found = true;
      try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        if (!postData.date) postData.date = data.date;
        if (!postData.image) postData.image = data.image;

        postData.content[lang.code] = {
          title: data.title,
          description: data.description,
          body: content,
        };
      } catch (e) {
        console.error(`Error parsing ${fullPath}:`, e);
        hasError = true;
        postData.content[lang.code] = {
          title: `(Error parsing ${lang.name})`,
          description: '',
          body: ''
        };
      }
    } else {
      postData.content[lang.code] = {
          title: `(No translation for ${lang.name})`,
          description: '',
          body: ''
      };
    }
  }

  if (hasError) {
    return null;
  }

  if (!found) {
    return null;
  }

  return postData as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => {
      const isPostValid = post !== null;
      return isPostValid;
    })
    // Sort posts by date in descending order
    .sort((post1, post2) => (new Date(post1.date) > new Date(post2.date) ? -1 : 1));
  
  return posts;
}
