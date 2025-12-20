
import { NextResponse } from 'next/server';
import { translateFlow } from '@/ai/translate';
import { allLanguages } from '@/lib/languages';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sourceFilePath } = body;

    if (!sourceFilePath) {
      return NextResponse.json({ error: 'sourceFilePath is required' }, { status: 400 });
    }

    const projectRoot = process.cwd();
    const absoluteSourcePath = path.join(projectRoot, sourceFilePath);

    if (!fs.existsSync(absoluteSourcePath)) {
      return NextResponse.json({ error: `Source file not found: ${absoluteSourcePath}` }, { status: 404 });
    }

    console.log(`Translating ${sourceFilePath}...`);

    const sourceContent = fs.readFileSync(absoluteSourcePath, 'utf-8');
    const sourceLangCode = path.basename(path.dirname(absoluteSourcePath));
    const sourceLang = allLanguages.find(l => l.code === sourceLangCode);
    const slug = path.basename(absoluteSourcePath, '.md');

    if (!sourceLang) {
      return NextResponse.json({ error: `Unknown source language code: ${sourceLangCode}` }, { status: 400 });
    }
    
    const postsDir = path.join(projectRoot, 'src', 'posts');
    const targetLanguages = allLanguages.filter(lang => lang.code !== sourceLang.code);
    
    const results: Record<string, string> = {};

    for (const targetLang of targetLanguages) {
      console.log(`  -> Translating to ${targetLang.name} (${targetLang.code})`);
      try {
        const result = await translateFlow({
          content: sourceContent,
          sourceLang: sourceLang.name,
          targetLang: targetLang.name,
        });

        const targetDir = path.join(postsDir, targetLang.code);
        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true });
        }

        const targetFilePath = path.join(targetDir, `${slug}.md`);
        fs.writeFileSync(targetFilePath, result.translatedContent);
        const successMessage = `✓ Saved to ${targetFilePath}`;
        console.log(`     ${successMessage}`);
        results[targetLang.code] = successMessage;

      } catch (error: any) {
        const errorMessage = `✗ Failed to translate to ${targetLang.name}: ${error.message}`;
        console.error(`     ${errorMessage}`);
        results[targetLang.code] = errorMessage;
      }
    }

    return NextResponse.json({
      message: 'Translation process completed.',
      results,
    });

  } catch (error: any) {
    console.error('An unexpected error occurred in the translate API route:', error);
    return NextResponse.json({ error: 'An unexpected error occurred', details: error.message }, { status: 500 });
  }
}
