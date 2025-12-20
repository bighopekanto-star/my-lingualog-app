
import { translateFlow } from '../ai/translate';
import { allLanguages } from '../lib/languages';
import fs from 'fs';
import path from 'path';

async function main() {
  const sourceFilePath = process.argv[2];
  if (!sourceFilePath) {
    console.error('Error: Please provide the source file path as an argument.');
    console.log('Usage: npm run translate -- <path/to/your/file.md>');
    process.exit(1);
  }

  try {
    const projectRoot = process.cwd();
    const absoluteSourcePath = path.join(projectRoot, sourceFilePath);

    if (!fs.existsSync(absoluteSourcePath)) {
      console.error(`Error: Source file not found at ${absoluteSourcePath}`);
      process.exit(1);
    }

    console.log(`Translating ${sourceFilePath}...`);

    const sourceContent = fs.readFileSync(absoluteSourcePath, 'utf-8');
    const sourceLangCode = path.basename(path.dirname(absoluteSourcePath));
    const sourceLang = allLanguages.find(l => l.code === sourceLangCode);
    const slug = path.basename(absoluteSourcePath, '.md');

    if (!sourceLang) {
      console.error(`Error: Unknown source language code: ${sourceLangCode}`);
      process.exit(1);
    }
    
    const postsDir = path.join(projectRoot, 'src', 'posts');
    const targetLanguages = allLanguages.filter(lang => lang.code !== sourceLang.code);
    
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
        console.log(`     ✓ Saved to ${targetFilePath}`);

      } catch (error: any) {
        console.error(`     ✗ Failed to translate to ${targetLang.name}:`, error.message || error);
      }
    }

    console.log('\nTranslation process completed.');

  } catch (error: any) {
    console.error('An unexpected error occurred:', error.message || error);
    process.exit(1);
  }
}

main();
