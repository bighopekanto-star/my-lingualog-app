'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const translateRequestSchema = z.object({
  content: z.string(),
  sourceLang: z.string(),
  targetLang: z.string(),
});

export const translateResponseSchema = z.object({
  translatedContent: z.string(),
});

export const translateFlow = ai.defineFlow(
  {
    name: 'translateFlow',
    inputSchema: translateRequestSchema,
    outputSchema: translateResponseSchema,
  },
  async (request) => {
    const prompt = `
      Translate the following markdown content from ${request.sourceLang} to ${request.targetLang}.
      Preserve the markdown formatting, including frontmatter.
      Only provide the translated markdown content.

      Content to translate:
      ---
      ${request.content}
      ---
    `;

    const llmResponse = await ai.generate({
      prompt: prompt,
      model: 'googleai/gemini-1.5-flash-001',
    });

    const translatedText = llmResponse.text;

    // Clean up response to ensure it's just the markdown.
    const cleanedContent = translatedText.replace(/```markdown/g, '').replace(/```/g, '').trim();

    return {
      translatedContent: cleanedContent,
    };
  }
);
