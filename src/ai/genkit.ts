
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

/**
 * Очистка API ключа от возможных пробелов или кавычек.
 */
const rawKey = process.env.GOOGLE_GENAI_API_KEY || process.env.GEMINI_API_KEY || '';
const apiKey = rawKey.trim().replace(/^["']|["']$/g, '');

/**
 * Основная конфигурация Genkit.
 */
export const ai = genkit({
  plugins: [
    googleAI({ apiKey }),
  ],
});

/**
 * Экспорт моделей для использования в потоках.
 * Используем официальные идентификаторы моделей.
 * Gemini 2.0 Flash — самая современная и быстрая модель.
 */
export const geminiModel = 'googleai/gemini-2.0-flash';
