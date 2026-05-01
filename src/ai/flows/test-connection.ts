'use server';

/**
 * @fileOverview Простой поток для проверки валидности API ключа.
 */

import {ai, geminiModel} from '@/ai/genkit';

export async function testAiConnection(): Promise<{success: boolean; message?: string; error?: string}> {
  try {
    const response = await ai.generate({
      model: geminiModel,
      prompt: 'Ответь одним словом "Готов".'
    });
    return { 
      success: true, 
      message: response.text 
    };
  } catch (err: any) {
    console.error('Connection test failed:', err);
    return { 
      success: false, 
      error: err.message 
    };
  }
}
