'use server';

/**
 * @fileOverview Generates book covers using AI based on a theme.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBookCoverInputSchema = z.object({
  theme: z.string().describe('Theme or description for the book cover.'),
});
export type GenerateBookCoverInput = z.infer<typeof GenerateBookCoverInputSchema>;

const GenerateBookCoverOutputSchema = z.object({
  coverDataUri: z
    .string()
    .describe(
      'The cover image as a data URI (Base64).'
    ),
});
export type GenerateBookCoverOutput = z.infer<typeof GenerateBookCoverOutputSchema>;

export async function generateBookCover(input: GenerateBookCoverInput): Promise<GenerateBookCoverOutput> {
  return generateBookCoverFlow(input);
}

const generateBookCoverFlow = ai.defineFlow(
  {
    name: 'generateBookCoverFlow',
    inputSchema: GenerateBookCoverInputSchema,
    outputSchema: GenerateBookCoverOutputSchema,
  },
  async input => {
    // Use Imagen 4 to generate covers
    const {media} = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: `A professional book cover design based on the following theme: ${input.theme}. High quality, artistic, suitable for publication.`,
    });

    if (!media || !media.url) {
      throw new Error('Failed to generate cover');
    }

    return {
      coverDataUri: media.url,
    };
  }
);