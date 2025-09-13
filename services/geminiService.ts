import { GoogleGenAI, Chat } from "@google/genai";
import { GameMode, Character } from '../types';
import { SYSTEM_PROMPTS } from '../constants';

// ضع مفتاح API الخاص بك هنا
const API_KEY = "YOUR_GEMINI_API_KEY_HERE";

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const startChatSession = (mode: GameMode, character: Character): Chat | null => {
  if (mode === GameMode.MENU) {
    return null;
  }
  
  const model = 'gemini-2.5-flash';
  const systemInstruction = SYSTEM_PROMPTS[mode](character);

  const chat: Chat = ai.chats.create({
    model: model,
    config: {
      systemInstruction: systemInstruction,
    },
  });

  return chat;
};