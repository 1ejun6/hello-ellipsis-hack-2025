import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  const { text } = await request.json();

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `
              You will be provided with a sentence. Your tasks are to:
              - Detect what language the sentence is in
              - Translate the sentence into singlish
              Do not return anything other than the translated sentence.
              The sentence to translate is: "${text}"
            `,
          },
        ],
      },
    ],
  });

  const translatedText =
    response.candidates?.[0]?.content?.parts?.[0]?.text ?? "Translation unavailable";

  return NextResponse.json({ text: translatedText });
}
