import { GoogleGenAI } from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn('Missing VITE_GEMINI_API_KEY environment variable. Chatbot will not function correctly.');
}

export const ai = new GoogleGenAI({ apiKey: apiKey || 'placeholder' });
