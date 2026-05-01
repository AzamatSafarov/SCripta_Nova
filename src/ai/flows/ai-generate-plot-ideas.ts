'use server';

/**
 * @fileOverview AI agent that generates plot ideas based on a prompt.
 */

import {ai, geminiModel} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePlotIdeasInputSchema = z.object({
  prompt: z.string().describe('Description of the idea or theme for plot generation.'),
});
export type GeneratePlotIdeasInput = z.infer<typeof GeneratePlotIdeasInputSchema>;

const GeneratePlotIdeasOutputSchema = z.object({
  plotIdeas: z.array(z.string()).describe('Array of plot ideas.'),
});
export type GeneratePlotIdeasOutput = z.infer<typeof GeneratePlotIdeasOutputSchema>;

const plotPrompt = ai.definePrompt({
  name: 'generatePlotIdeasPrompt',
  model: geminiModel,
  input: {schema: GeneratePlotIdeasInputSchema},
  output: {schema: GeneratePlotIdeasOutputSchema},
  prompt: `You are a creative writing assistant. Based on the provided idea description, generate 3-4 interesting and different plot variations in English.
Each variation should be concise (1-2 sentences) but captivating.

User Idea: {{{prompt}}}`,
});

export async function generatePlotIdeas(input: GeneratePlotIdeasInput): Promise<GeneratePlotIdeasOutput> {
  try {
    const {output} = await plotPrompt(input);
    if (!output) {
      throw new Error('AI returned an empty result.');
    }
    return output;
  } catch (error: any) {
    console.error('Genkit error in generatePlotIdeas:', error);
    
    const errorMessage = error.message || '';
    
    if (errorMessage.includes('API key not valid') || errorMessage.includes('403')) {
      throw new Error('Error: Your API key is invalid or does not have access to this model.');
    }
    
    if (errorMessage.includes('quota') || errorMessage.includes('429')) {
      throw new Error('Google AI quota exceeded. Please try again in a minute.');
    }

    throw new Error(`AI Error: ${errorMessage}`);
  }
}