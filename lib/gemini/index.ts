import { GoogleGenAI } from "@google/genai";

const api_key = process.env.GOOGLE_GEMINI!;

const ai = new GoogleGenAI({ apiKey: api_key });

export async function askGem(data: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: {
      text: data,
    },
  });
  console.log(response.text);
  return response;
}

