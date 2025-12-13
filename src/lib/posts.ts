import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { languages } from './languages';

const postsDirectory = path.join(process.cwd(), 'src', 'posts');

export function getPostSlugs() {
  const allSlugs = new Set<string>();
  for (const lang of languages) {
    const langDir = path.join(postsDirectory, lang.code);
    if (fs.existsSync(langDir)) {
      const fileNames = fs.readdirSync(langDir);
      fileNames.forEach(fileName => {
        allSlugs.add(fileName.replace(/\.md$/, ''));
      });
    }
  }
  return Array.from(allSlugs);
}

export async function getPostData(lang: string, slug: string) {
  const fullPath = path.join(postsDirectory, lang, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const htmlContent = await marked(content);

  return {
    slug,
    ...data as { title: string; date: string; image: string; description: string },
    content: htmlContent,
  };
}

export function getAllPosts(lang: string) {
    const langDir = path.join(postsDirectory, lang);
    if (!fs.existsSync(langDir)) {
      return [];
    }

    const fileNames = fs.readdirSync(langDir);
    const allPostsData = fileNames.map(fileName => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(langDir, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);

        return {
            slug,
            ...data as { title: string; date: string; image: string; description: string },
        };
    });

    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}
