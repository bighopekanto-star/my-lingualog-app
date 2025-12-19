'use server';

import { getPostData } from '@/lib/posts';
import type { LanguageCode } from '@/lib/languages';

export async function getManifestoPost(language: LanguageCode, slug: string) {
  const post = await getPostData(language, slug);
  return post;
}
