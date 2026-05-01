'use server';

/**
 * @fileOverview This file defines a Genkit flow for AI-assisted writing.
 */

import {ai, geminiModel} from '@/ai/genkit';
import {z} from 'genkit';

const AiCoWritingInputSchema = z.string().describe('Original text to be improved by AI.');
export type AiCoWritingInput = z.infer<typeof AiCoWritingInputSchema>;

const AiCoWritingOutputSchema = z.string().describe('Improved version of the text by AI.');
export type AiCoWritingOutput = z.infer<typeof AiCoWritingOutputSchema>;

const aiCoWritingPrompt = ai.definePrompt({
  name: 'aiCoWritingPrompt',
  model: geminiModel,
  input: {schema: AiCoWritingInputSchema},
  output: {schema: AiCoWritingOutputSchema},
  prompt: `You are an AI assistant for writers. Your task is to improve the provided text.
  Make it higher quality, clearer, and more engaging, while maintaining the author's original meaning and style.
  Work in English.

  Text:
  {{{input}}}`,
});

export async function aiCoWriting(input: AiCoWritingInput): Promise<AiCoWritingOutput> {
  const {output} = await aiCoWritingPrompt(input);
  return output!;
}