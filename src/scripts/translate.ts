import 'dotenv/config';
import { translateFlow } from '../ai/translate';
import { languages } from '../lib/languages';
import fs from 'fs';
import path from 'path';
import { run } from 'genkit';

async function main() {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    console.error('Usage: npm run translate -- <path/to/source-file.md>');
    process.exit(1);
  }

  const sourceFilePath = args[0];
  if (!fs.existsSync(sourceFilePath)) {
    console.error(`Source file not found: ${sourceFilePath}`);
    process.exit(1);
  }

  console.log(`Translating ${sourceFilePath}...`);

  const sourceContent = fs.readFileSync(sourceFilePath, 'utf-8');
  const sourceLangCode = path.basename(path.dirname(sourceFilePath));
  const sourceLang = languages.find(l => l.code === sourceLangCode);
  const slug = path.basename(sourceFilePath, '.md');

  if (!sourceLang) {
    console.error(`Unknown source language code: ${sourceLangCode}`);
    console.error(`Please ensure the source file is in a valid language directory (e.g., src/posts/ja).`);
    process.exit(1);
  }
  
  const postsDir = path.join(process.cwd(), 'src', 'posts');

  const targetLanguages = languages.filter(lang => lang.code !== sourceLang.code);

  for (const targetLang of targetLanguages) {
    console.log(`  -> Translating to ${targetLang.name} (${targetLang.code})`);
    
    try {
      const result = await run(translateFlow, {
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

    } catch (error) {
      console.error(`     ✗ Failed to translate to ${targetLang.name}:`, error);
    }
  }

  console.log('\nTranslation complete!');
}

main();
